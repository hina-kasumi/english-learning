import { readReferences } from './reference-utils'
import { mkdirSync, writeFileSync, readdirSync, readFileSync } from 'node:fs'
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
    text: l.body,
    path: `/lesson/${l.id}`,
    kind: 'Bài học',
  },
  ...l.rules.map((r) => ({
    id: r.id,
    title: r.label,
    level: l.level,
    summary: l.title,
    text: r.label,
    path: `/lesson/${l.id}?rule=${r.id}`,
    kind: 'Điểm kiến thức',
  })),
])
for (const file of readdirSync(resolve(root, 'content/grammar/kb/cheatsheets'))) {
  if (!file.endsWith('.md')) continue
  const body = readFileSync(resolve(root, 'content/grammar/kb/cheatsheets', file), 'utf8')
  entries.push({
    id: `kb:${file.slice(0, -3)}`,
    title: body.split('\n')[0].replace(/^# /, ''),
    level: '',
    summary: 'Bảng tóm tắt để tra cứu nhanh',
    text: body,
    path: `/knowledge/${file.slice(0, -3)}`,
    kind: 'Cheat sheet',
  })
}
const chapters = readReferences()
writeFileSync(
  resolve(root, 'src/generated/references.json'),
  JSON.stringify(
    chapters.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      count: c.topics.length,
      levels: [...new Set(c.topics.map((t) => t.level))],
    })),
    null,
    2,
  ),
)
for (const chapter of chapters) {
  entries.push({
    id: `reference:${chapter.id}`,
    title: chapter.title,
    level: '',
    summary: chapter.description,
    text: chapter.tables.map((t) => t.title + ' ' + t.rows.flat().join(' ')).join(' '),
    path: `/knowledge/reference/${chapter.id}`,
    kind: 'Chuyên đề',
    category: chapter.id,
  })
  for (const topic of chapter.topics)
    entries.push({
      id: `reference:${topic.id}`,
      title: topic.title,
      level: topic.level,
      summary: topic.explanation,
      text: [
        topic.id,
        topic.form,
        topic.pitfall,
        topic.comparison,
        ...topic.examples.flatMap((e) => [e.en, e.vi]),
      ].join(' '),
      path: `/knowledge/reference/${chapter.id}?topic=${topic.id}`,
      kind: 'Mục tra cứu',
      category: chapter.id,
    })
}
writeFileSync(resolve(root, 'src/generated/search.json'), JSON.stringify(entries))
console.log(`✓ Tạo chỉ mục tìm kiếm: ${entries.length} mục`)
