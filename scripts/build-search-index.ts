import { readReferences } from './reference-utils'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { readContent, root } from './content-utils'
const { lessons } = readContent()
const order = ['L0', 'A1', 'A2', 'B1', 'B2', 'C1']
lessons.sort((a, b) => order.indexOf(a.level) - order.indexOf(b.level) || a.order - b.order)
mkdirSync(resolve(root, 'src/generated'), { recursive: true })
writeFileSync(
  resolve(root, 'src/generated/lessons.json'),
  JSON.stringify(
    lessons.map(({ body, file, ...meta }) => {
      void body
      return { ...meta, file }
    }),
    null,
    2,
  ),
)
const entries: {
  id: string
  title: string
  level: string
  summary: string
  text: string
  path: string
  kind: string
  category?: string
}[] = lessons.flatMap((l) => [
  {
    id: l.id,
    title: l.title,
    level: l.level,
    summary: l.summary,
    text: [...l.tags, ...l.rules.flatMap((r) => [r.label, ...(r.appendixCodes ?? [])])].join(' '),
    path: `/lesson/${l.id}`,
    kind: 'Bài học',
    category: l.rules.flatMap((r) => r.appendixCodes ?? [])[0]?.[0],
  },
  ...l.rules.map((r) => ({
    id: r.id,
    title: r.label,
    level: l.level,
    summary: l.title,
    text:
      l.body.split(`{#${r.id}}`)[1]?.split('\n## ')[0]?.split('### Phân tích cách lựa chọn')[0] ??
      r.label,
    path: `/lesson/${l.id}?rule=${r.id}`,
    kind: 'Điểm kiến thức',
    category: r.appendixCodes?.[0]?.[0],
  })),
])
const chapters = readReferences()
writeFileSync(
  resolve(root, 'src/generated/categories.json'),
  JSON.stringify(
    chapters.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      count: lessons.filter((l) =>
        l.rules.some((r) => r.appendixCodes?.some((code) => code.startsWith(c.id + '.'))),
      ).length,
      levels: [...new Set(c.topics.map((t) => t.level))],
    })),
    null,
    2,
  ),
)
writeFileSync(resolve(root, 'src/generated/search.json'), JSON.stringify(entries))
console.log(`✓ Tạo chỉ mục tìm kiếm: ${entries.length} mục`)
