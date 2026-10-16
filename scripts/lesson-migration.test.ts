import { describe, expect, it } from 'vitest'
import { readContent } from './content-utils'
import { readReferences } from './reference-utils'
import { checkLessonMigration } from './lesson-migration'
import search from '../src/generated/search.json'
const { lessons } = readContent()
const chapters = readReferences()

describe('lessons replace the full reference catalogue', () => {
  it('preserves every topic, source, original example and table in published lessons', () => {
    expect(checkLessonMigration(lessons, chapters)).toEqual([])
    expect(lessons.filter((l) => l.practiceMode === 'self-check')).toHaveLength(66)
    expect(search.every((entry) => entry.path.startsWith('/lesson/'))).toBe(true)
    for (const entry of search) {
      const [id, params] = entry.path.slice('/lesson/'.length).split('?')
      const lesson = lessons.find((l) => l.id === id)
      expect(lesson).toBeDefined()
      const rule = new URLSearchParams(params).get('rule')
      if (rule) expect(lesson?.rules.some((r) => r.id === rule)).toBe(true)
    }
  })
  it('rejects removed or duplicated destinations even when counts look complete', () => {
    const changed = structuredClone(lessons)
    const lesson = changed.find((l) => l.practiceMode === 'self-check')!
    const code = lesson.rules[0].appendixCodes![0]
    lesson.rules[0].appendixCodes = []
    expect(checkLessonMigration(changed, chapters).join('\n')).toContain(`${code}: cần đúng một`)
    lesson.rules[0].appendixCodes = [code]
    changed.push(structuredClone(lesson))
    expect(checkLessonMigration(changed, chapters).join('\n')).toContain(`${code}: cần đúng một`)
  })
  it('rejects loss of prose or table cells, not only missing topic IDs', () => {
    const changed = structuredClone(lessons)
    const topic = chapters[0].topics[0]
    const lesson = changed.find(
      (l) =>
        l.practiceMode === 'self-check' && l.rules.some((r) => r.appendixCodes?.includes(topic.id)),
    )!
    lesson.body = lesson.body.replaceAll(topic.explanation, '')
    expect(checkLessonMigration(changed, chapters).join('\n')).toContain(
      `${topic.id}: mất nội dung gốc`,
    )
    const table = chapters[0].tables[0]
    const owner = changed.find((l) => l.body.includes(`## ${table.title}\n`))!
    owner.body = owner.body.replace(`## ${table.title}\n`, '## Removed\n')
    expect(checkLessonMigration(changed, chapters).join('\n')).toContain(`mất bảng ${table.title}`)
  })
})
