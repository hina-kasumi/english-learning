import type { Lesson } from '../src/types/content'
import type { Reference } from '../src/types/reference'

// Keep topic preservation separate from exercise coverage: reading a topic is
// not evidence that its full graded question bank has been implemented.
export function checkLessonMigration(lessons: Lesson[], chapters: Reference[]) {
  const errors: string[] = []
  const migrated = lessons.filter((l) => l.practiceMode === 'self-check')
  const catalogue = new Set(chapters.flatMap((c) => c.topics.map((t) => t.id)))
  for (const lesson of lessons)
    for (const rule of lesson.rules)
      for (const code of rule.appendixCodes ?? [])
        if (!catalogue.has(code)) errors.push(`${rule.id}: mã ngoài danh mục ${code}`)
  for (const chapter of chapters) {
    for (const topic of chapter.topics) {
      const matches = migrated.flatMap((lesson) =>
        lesson.rules
          .filter((rule) => rule.appendixCodes?.includes(topic.id))
          .map((rule) => ({ lesson, rule })),
      )
      if (matches.length !== 1) {
        errors.push(`${topic.id}: cần đúng một bài học chuyển đổi, tìm thấy ${matches.length}`)
        continue
      }
      const { lesson, rule } = matches[0]
      const section = lesson.body.split(`{#${rule.id}}`)[1]?.split('\n## ')[0] ?? ''
      for (const text of [
        topic.explanation,
        topic.form,
        topic.pitfall,
        topic.comparison,
        ...topic.examples.flatMap((e) => [e.en, e.vi]),
      ])
        if (!section.includes(text)) errors.push(`${topic.id}: mất nội dung gốc trong ${lesson.id}`)
    }
    const family = migrated.filter((l) =>
      l.rules.some((r) => r.appendixCodes?.some((code) => code.startsWith(`${chapter.id}.`))),
    )
    for (const table of chapter.tables) {
      const owner = family.find((l) => l.body.includes(`## ${table.title}\n`))
      if (
        !owner ||
        ![table.note, ...table.headers, ...table.rows.flat()].every((cell) =>
          owner.body.includes(cell.replaceAll('|', '\\|')),
        )
      )
        errors.push(`${chapter.id}: mất bảng ${table.title}`)
    }
    for (const source of chapter.sources)
      if (!family.some((l) => l.body.includes(source.url)))
        errors.push(`${chapter.id}: mất nguồn ${source.title}`)
  }
  return errors
}
