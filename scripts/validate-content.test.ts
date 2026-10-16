import { afterEach, describe, expect, it } from 'vitest'
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { validateContent } from './validation'
import { root } from './content-utils'
const fixtures: string[] = []
afterEach(() => {
  fixtures.splice(0).forEach((path) => rmSync(path, { recursive: true, force: true }))
})
function fixture() {
  const dir = mkdtempSync(resolve(tmpdir(), 'gramio-validate-'))
  fixtures.push(dir)
  cpSync(resolve(root, 'content'), resolve(dir, 'content'), { recursive: true })
  return dir
}
function validate(dir: string) {
  try {
    const errors = validateContent(dir)
    return { status: errors.length ? 1 : 0, stderr: errors.join('\n') }
  } catch (error) {
    return { status: 1, stderr: String(error) }
  }
}
function changeLesson(dir: string, fn: (raw: string) => string) {
  const file = resolve(dir, 'content/grammar/lessons/L0-01.md')
  writeFileSync(file, fn(readFileSync(file, 'utf8')))
}
function changeExercises(dir: string, fn: (file: ReturnType<typeof JSON.parse>) => void) {
  const path = resolve(dir, 'content/grammar/exercises/L0-01.json')
  const data = JSON.parse(readFileSync(path, 'utf8'))
  fn(data)
  writeFileSync(path, JSON.stringify(data))
}
describe('Build-gating content validator', () => {
  it('accepts the released sample milestone', () => expect(validate(root).status).toBe(0))
  it('rejects inadequate rule coverage', () => {
    const dir = fixture()
    changeExercises(dir, (file) => {
      file.sets[0].questions = file.sets[0].questions.filter(
        (q: { ruleIds: string[] }) => !q.ruleIds.includes('L0-01.01'),
      )
    })
    const result = validate(dir)
    expect(result.status).not.toBe(0)
    expect(result.stderr).toContain('L0-01.01')
  })
  it('rejects missing rule anchors and examples', () => {
    const dir = fixture()
    changeLesson(dir, (raw) =>
      raw.replace('{#L0-01.01}', '{#L0-01.99}').replace(':::example', ':::note'),
    )
    expect(validate(dir).status).not.toBe(0)
  })
  it('rejects a duplicate question ID', () => {
    const dir = fixture()
    changeExercises(dir, (file) => {
      file.sets[0].questions[1].id = file.sets[0].questions[0].id
    })
    expect(validate(dir).stderr).toContain('Question trùng')
  })
  it('rejects a dangling Markdown rule link', () => {
    const dir = fixture()
    changeLesson(dir, (raw) => raw + '\n[Broken](/lesson/A2-03?rule=A2-03.99)')
    expect(validate(dir).stderr).toContain('rule link gãy')
  })
  it('rejects circular prerequisites', () => {
    const dir = fixture()
    changeLesson(dir, (raw) => raw.replace('"prerequisites": []', '"prerequisites": ["A2-03"]'))
    expect(validate(dir).stderr).toContain('Vòng lặp')
  })
  it('rejects orphan lessons and missing unit tests in a declared completed milestone', () => {
    const dir = fixture()
    const path = resolve(dir, 'content/grammar/roadmap.json')
    const roadmap = JSON.parse(readFileSync(path, 'utf8'))
    roadmap.stage = 2
    roadmap.levels[0].units[0].lessons = []
    writeFileSync(path, JSON.stringify(roadmap))
    const result = validate(dir)
    expect(result.stderr).toContain('bài mồ côi')
    expect(result.stderr).toContain('thiếu bài thi')
  })
  it('rejects missing explanations, missing translations and wrong answer references', () => {
    const dir = fixture()
    changeExercises(dir, (file) => {
      file.sets[0].questions[0].explanation = ''
      file.sets[0].questions[0].answers = ['unknown']
    })
    expect(validate(dir).status).not.toBe(0)
  })
})
