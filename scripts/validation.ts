import { readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { readContent, root as contentRoot } from './content-utils'
export function validateContent(root = contentRoot) {
  const { lessons, exercises, roadmap } = readContent(root)
  const errors: string[] = []
  const check = (condition: unknown, message: string) => {
    if (!condition) errors.push(message)
  }
  const unique = (ids: string[], label: string) => {
    const seen = new Set<string>()
    ids.forEach((id) => {
      check(!seen.has(id), `${label} trùng: ${id}`)
      seen.add(id)
    })
  }
  const sets = exercises.flatMap((e) => e.sets)
  const questions = sets.flatMap((s) => s.questions)
  const rules = lessons.flatMap((l) => l.rules)
  const kbDir = resolve(root, 'content/grammar/kb/cheatsheets')
  const kb = readdirSync(kbDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => 'kb:' + f.replace('.md', ''))
  const known = new Set([...lessons.map((l) => l.id), ...kb])
  const referenceDir = resolve(root, 'content/grammar/kb/reference')
  const referenceIds = new Set(
    readdirSync(referenceDir)
      .filter((file) => /^[A-Q]\.json$/.test(file))
      .flatMap((file) => {
        const chapter = JSON.parse(readFileSync(resolve(referenceDir, file), 'utf8')) as {
          topics: { id: string }[]
        }
        return chapter.topics.map((topic) => topic.id)
      }),
  )
  unique(
    lessons.map((l) => l.id),
    'Lesson',
  )
  unique(
    rules.map((r) => r.id),
    'Rule',
  )
  unique(
    sets.map((s) => s.id),
    'Set',
  )
  unique(
    questions.map((q) => q.id),
    'Question',
  )
  unique(
    exercises.map((e) => e.lessonId),
    'Exercise file',
  )
  unique(
    questions.map((q) => q.prompt.trim().toLowerCase()),
    'Prompt',
  )
  unique(
    roadmap.levels.map((l) => l.id),
    'Level',
  )
  unique(
    roadmap.levels.flatMap((l) => l.units.map((u) => u.id)),
    'Unit',
  )
  unique(
    roadmap.tracks.map((t) => t.id),
    'Track',
  )
  for (const unit of roadmap.levels.flatMap((l) => l.units)) {
    for (const track of unit.tracks)
      check(
        roadmap.tracks.some((t) => t.id === track),
        `${unit.id}: track không tồn tại ${track}`,
      )
  }
  const minimum = Math.max(4, Number(process.env.MIN_RULE_QUESTIONS ?? 4))
  check(Number.isFinite(minimum), 'MIN_RULE_QUESTIONS phải là số')
  const headings = [
    'Mục tiêu bài học',
    'Khởi động',
    'Khái niệm',
    'Ngoại lệ',
    'Dấu hiệu nhận biết',
    'Lỗi thường gặp',
    'So sánh',
    'Phát âm',
    'Anh-Anh',
    'Tóm tắt',
    'Liên kết',
  ]
  for (const lesson of lessons) {
    const own = exercises.filter((e) => e.lessonId === lesson.id).flatMap((e) => e.sets)
    const qs = own.flatMap((s) => s.questions)
    if (lesson.practiceMode === 'graded') {
      check(qs.length >= (lesson.large ? 60 : 30), `${lesson.id}: thiếu số câu tối thiểu`)
      check(
        own.filter((s) => s.kind === 'practice').length >= 2 && own.some((s) => s.kind === 'mixed'),
        `${lesson.id}: cần 2 practice + mixed`,
      )
      check(
        !['L0', 'A1', 'A2'].includes(lesson.level) || qs.every((q) => !!q.translation),
        `${lesson.id}: câu hỏi thiếu bản dịch`,
      )
    }
    if (lesson.practiceMode === 'self-check')
      check(own.length === 0, `${lesson.id}: bài tự luyện không được ẩn bộ câu hỏi chấm điểm`)
    const anchors = [...lesson.body.matchAll(/^## .+\{#([^}]+)\}/gm)].map((m) => m[1])
    unique(anchors, `Anchor ${lesson.id}`)
    check(
      anchors.length === lesson.rules.length &&
        anchors.every((a) => lesson.rules.some((r) => r.id === a)),
      `${lesson.id}: anchor khác frontmatter`,
    )
    for (const rule of lesson.rules) {
      check(rule.id.startsWith(`${lesson.id}.`), `${rule.id}: sai namespace`)
      check(anchors.includes(rule.id), `${rule.id}: thiếu anchor`)
      const count = qs.filter((q) => q.ruleIds.length === 1 && q.ruleIds.includes(rule.id)).length
      if (lesson.practiceMode === 'graded')
        check(
          count >= (rule.important ? Math.max(8, minimum) : minimum),
          `${rule.id}: chỉ có ${count} câu`,
        )
      if (rule.important && lesson.practiceMode === 'graded')
        check(
          [1, 2, 3].every((d) => qs.some((q) => q.ruleIds.includes(rule.id) && q.difficulty === d)),
          `${rule.id}: thiếu mức độ khó`,
        )
      const section = lesson.body.split(`{#${rule.id}}`)[1]?.split('\n## ')[0] ?? ''
      if (lesson.practiceMode === 'self-check') {
        check((rule.appendixCodes?.length ?? 0) > 0, `${rule.id}: thiếu mã kiến thức`)
        check(section.includes('### Phân tích cách lựa chọn'), `${rule.id}: thiếu phân tích`)
        check(section.includes('### Tự luyện trước khi xem lời giải'), `${rule.id}: thiếu tự luyện`)
        check(/:::answer\n\S[\s\S]+?\n:::/.test(section), `${rule.id}: thiếu lời giải`)
        const examples = [...section.matchAll(/:::example\n([^\n]+)/g)].map((m) =>
          m[1].split(' | ')[0].trim().toLowerCase(),
        )
        check(new Set(examples).size >= 3, `${rule.id}: cần 3 ví dụ khác nhau`)
        check(section.split(/\s+/).length >= 200, `${rule.id}: nội dung quá ngắn`)
      }
      check((section.match(/^:::example$/gm) ?? []).length >= 3, `${rule.id}: cần 3 ví dụ song ngữ`)
      check((section.match(/^:::formula$/gm) ?? []).length >= 1, `${rule.id}: thiếu công thức`)
      for (const example of section.matchAll(/:::example\n([\s\S]*?)\n:::/g))
        check(example[1].includes(' | '), `${rule.id}: ví dụ chưa song ngữ`)
    }
    if (lesson.practiceMode === 'graded') {
      headings.forEach((h) => check(lesson.body.includes(`## ${h}`), `${lesson.id}: thiếu ${h}`))
      check((lesson.body.match(/❌/g) ?? []).length >= 3, `${lesson.id}: cần 3 lỗi thường gặp`)
    }
    check(
      lesson.body.includes(':::mistake') &&
        lesson.body.includes(':::recap') &&
        lesson.body.includes(':::compare'),
      `${lesson.id}: thiếu container bắt buộc`,
    )
    const objectives = lesson.body.split('## Mục tiêu bài học')[1]?.split('\n## ')[0] ?? ''
    const goalCount = (objectives.match(/^- /gm) ?? []).length
    check(goalCount >= 3 && goalCount <= 6, `${lesson.id}: cần 3–6 mục tiêu`)
    for (const id of [...lesson.prerequisites, ...lesson.related])
      check(known.has(id), `${lesson.id}: tham chiếu không tồn tại ${id}`)
    check(
      roadmap.levels.some((l) => l.units.some((u) => u.lessons.includes(lesson.id))),
      `${lesson.id}: bài mồ côi`,
    )
    check(
      roadmap.levels.some(
        (l) =>
          l.id === lesson.level &&
          l.units.some((u) => u.id === lesson.unit && u.lessons.includes(lesson.id)),
      ),
      `${lesson.id}: level/unit không khớp`,
    )
  }
  for (const e of exercises) {
    check(known.has(e.lessonId), `Exercise không có bài: ${e.lessonId}`)
    for (const q of e.sets.flatMap((s) => s.questions))
      for (const id of q.ruleIds)
        check(
          rules.some((r) => r.id === id) && id.startsWith(e.lessonId + '.'),
          `${q.id}: rule sai ${id}`,
        )
  }
  for (const level of roadmap.levels) {
    for (const step of level.steps) {
      unique(
        step.references.map((reference) => reference.id),
        `${level.id}: chủ đề bài học`,
      )
      for (const reference of step.references)
        check(referenceIds.has(reference.id), `${level.id}: chủ đề không tồn tại ${reference.id}`)
    }
    if (level.levelTest)
      check(
        sets.some(
          (s) => s.id === level.levelTest && s.kind === 'level-test' && s.questions.length >= 40,
        ),
        `${level.id}: level-test lỗi`,
      )
    for (const unit of level.units) {
      unit.lessons.forEach((id) => check(known.has(id), `${unit.id}: không có ${id}`))
      if (unit.unitTest)
        check(
          sets.some(
            (s) => s.id === unit.unitTest && s.kind === 'unit-test' && s.questions.length >= 20,
          ),
          `${unit.id}: unit-test lỗi`,
        )
      // Milestone 1 intentionally contains sample lessons, not completed units/levels.
      if (roadmap.stage >= 2 && ['L0', 'A1', 'A2'].includes(level.id))
        check(unit.unitTest && level.levelTest, `${unit.id}: thiếu bài thi`)
    }
  }
  function visit(id: string, stack: string[]) {
    if (stack.includes(id)) {
      errors.push(`Vòng lặp: ${[...stack, id].join(' → ')}`)
      return
    }
    lessons.find((l) => l.id === id)?.prerequisites.forEach((p) => visit(p, [...stack, id]))
  }
  lessons.forEach((l) => visit(l.id, []))
  const documents = [
    ...lessons.map((l) => ({ id: l.id, body: l.body })),
    ...kb.map((id) => ({ id, body: readFileSync(resolve(kbDir, id.slice(3) + '.md'), 'utf8') })),
  ]
  for (const doc of documents)
    for (const link of doc.body.matchAll(/\]\(([^)]+)\)/g)) {
      if (/^(https?:|mailto:)/.test(link[1])) continue
      const target = link[1]
      if (target.startsWith('/lesson/')) {
        const [id, params] = target.slice(8).split('?')
        check(known.has(id), `${doc.id}: link gãy ${target}`)
        const rule = new URLSearchParams(params).get('rule')
        if (rule)
          check(
            lessons.find((l) => l.id === id)?.rules.some((r) => r.id === rule),
            `${doc.id}: rule link gãy ${target}`,
          )
      } else if (target.startsWith('/knowledge/'))
        check(kb.includes('kb:' + target.slice(11)), `${doc.id}: KB link gãy ${target}`)
      else
        check(
          ['/roadmap', '/knowledge'].includes(target),
          `${doc.id}: link nội bộ không hỗ trợ ${target}`,
        )
    }
  return errors
}
