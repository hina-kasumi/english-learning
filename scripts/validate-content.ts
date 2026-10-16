import { readReferences } from './reference-utils'
import { validateContent } from './validation'
import { readContent } from './content-utils'
const errors = validateContent()
try {
  const chapters = readReferences()
  console.log(
    `✓ ${chapters.length} chuyên đề · ${chapters.flatMap((c) => c.topics).length} mục tra cứu: schema, danh mục và liên kết hợp lệ.`,
  )
} catch (error) {
  errors.push(error instanceof Error ? error.message : String(error))
}
if (errors.length) {
  console.error(errors.join('\n'))
  process.exitCode = 1
} else {
  const { lessons, exercises, roadmap } = readContent()
  const sets = exercises.flatMap((e) => e.sets)
  console.log(
    `✓ Giai đoạn ${roadmap.stage}: ${lessons.length} bài · ${lessons.flatMap((l) => l.rules).length} rule · ${sets.flatMap((s) => s.questions).length} câu · ${sets.length} bộ. Schema, coverage, cấu trúc, liên kết và roadmap hợp lệ.`,
  )
}
