import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { referenceSchema, type Reference } from '../src/types/reference'
import { readContent, root } from './content-utils'

export function checkReferences(chapters: Reference[], expected: string[], lessonIds: string[]) {
  const errors: string[] = []
  const ids = chapters.flatMap((chapter) => chapter.topics.map((topic) => topic.id))
  if (new Set(chapters.map((c) => c.id)).size !== chapters.length) errors.push('Trùng nhóm tra cứu')
  if (new Set(ids).size !== ids.length) errors.push('Trùng mã tra cứu')
  for (const id of expected) if (!ids.includes(id)) errors.push(`Thiếu mục tra cứu ${id}`)
  for (const chapter of chapters)
    for (const topic of chapter.topics) {
      if (!expected.includes(topic.id)) errors.push(`Mã tra cứu ngoài danh mục: ${topic.id}`)
      if (!topic.id.startsWith(`${chapter.id}.`)) errors.push(`Sai nhóm tra cứu: ${topic.id}`)
      for (const id of topic.relatedLessons)
        if (!lessonIds.includes(id)) errors.push(`Liên kết bài học không tồn tại: ${id}`)
    }
  return errors
}
export function readReferences(directory = root) {
  const base = resolve(directory, 'content/grammar/kb/reference')
  const chapters = readdirSync(base)
    .filter((f) => /^[A-Q]\.json$/.test(f))
    .sort()
    .map((file) => referenceSchema.parse(JSON.parse(readFileSync(resolve(base, file), 'utf8'))))
  const catalogue: { id: string }[] = JSON.parse(
    readFileSync(resolve(base, 'catalogue.json'), 'utf8'),
  )
  const errors = checkReferences(
    chapters,
    catalogue.map((c) => c.id),
    readContent(directory).lessons.map((l) => l.id),
  )
  if (errors.length) throw new Error(errors.join('\n'))
  return chapters
}
