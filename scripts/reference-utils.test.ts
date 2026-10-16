import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { readReferences, checkReferences } from './reference-utils'
import { referenceSchema } from '../src/types/reference'
const chapters = readReferences()
const expected = chapters.flatMap((c) => c.topics.map((t) => t.id))
const lessonIds = ['L0-01', 'L0-12', 'A2-03']
describe('reference catalogue integrity', () => {
  it('covers every distinct appendix code, not only a self-reported count', () => {
    const appendix = readFileSync('docs/PHU-LUC-KIEN-THUC-NANG-CAO.md', 'utf8')
    const codes = [...appendix.matchAll(/^- ([A-Q]\.\d{2}) /gm)].map((m) => m[1]).sort()
    expect([...expected].sort()).toEqual(codes)
    expect(chapters).toHaveLength(17)
    expect(expected).toHaveLength(208)
  })
  it('rejects missing, duplicated and misplaced topics', () => {
    const changed = structuredClone(chapters)
    changed[0].topics.pop()
    changed[1].topics.push(changed[0].topics[0])
    const errors = checkReferences(changed, expected, lessonIds)
    expect(errors).toContain('Thiếu mục tra cứu A.12')
    expect(errors).toContain('Trùng mã tra cứu')
    expect(errors).toContain('Sai nhóm tra cứu: A.01')
  })
  it('rejects invented coverage and dead lesson links', () => {
    const changed = structuredClone(chapters)
    changed[0].topics[0].id = 'A.99'
    changed[0].topics[0].relatedLessons = ['L0-99']
    expect(checkReferences(changed, expected, lessonIds)).toContain(
      'Mã tra cứu ngoài danh mục: A.99',
    )
    expect(checkReferences(changed, expected, lessonIds)).toContain(
      'Liên kết bài học không tồn tại: L0-99',
    )
  })
  it('rejects malformed tables and missing bilingual examples', () => {
    const changed = structuredClone(chapters[0])
    changed.tables[0].rows[0].pop()
    expect(referenceSchema.safeParse(changed).success).toBe(false)
    const empty = structuredClone(chapters[0])
    empty.topics[0].examples = []
    expect(referenceSchema.safeParse(empty).success).toBe(false)
  })
})
