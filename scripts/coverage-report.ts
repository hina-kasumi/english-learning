import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { readContent, root } from './content-utils'
const { lessons, exercises } = readContent()
const reading = lessons.filter((l) => l.practiceMode === 'self-check')
const rows = lessons
  .filter((l) => l.practiceMode === 'graded')
  .map((l) => {
    const qs = exercises
      .filter((e) => e.lessonId === l.id)
      .flatMap((e) => e.sets.flatMap((s) => s.questions))
    return {
      lesson: l.id,
      rules: l.rules.length,
      questions: qs.length,
      missing:
        l.rules
          .filter(
            (r) =>
              qs.filter((q) => q.ruleIds.length === 1 && q.ruleIds.includes(r.id)).length <
              (r.important ? 8 : 4),
          )
          .map((r) => r.id)
          .join(', ') || '0',
      difficulty: [1, 2, 3]
        .map((d) => `${d}: ${qs.filter((q) => q.difficulty === d).length}`)
        .join(' / '),
      types: [...new Set(qs.map((q) => q.type))].join(', '),
    }
  })
console.table(rows)
writeFileSync(
  resolve(root, 'content/COVERAGE.md'),
  `# Báo cáo coverage\n\n${reading.length} bài tự luyện có ${reading.flatMap((l) => l.rules).length} câu tự kiểm tra kèm lời giải. Các câu này không được tính vào ngân hàng chấm điểm hoặc chuẩn coverage bài tập.\n\nBảng dưới chỉ tính bài có bài tập chấm điểm.\n\n| Bài | Rule | Câu | Rule thiếu | Độ khó 1/2/3 | Dạng bài |\n|---|---|---|---|---|---|\n` +
    rows
      .map(
        (r) =>
          `| ${r.lesson} | ${r.rules} | ${r.questions} | ${r.missing} | ${r.difficulty} | ${r.types} |`,
      )
      .join('\n') +
    '\n',
)
