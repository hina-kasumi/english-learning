import type { Answer, ExerciseType, Question } from '../types/content'
export function normalize(value: string, caseSensitive = false, ignoreEndPunctuation = false) {
  const trimmed = value.normalize('NFC').replace(/[‘’]/g, "'").replace(/\s+/g, ' ').trim()
  const punctuation = ignoreEndPunctuation ? trimmed.replace(/[.!?]+$/, '').trim() : trimmed
  return caseSensitive ? punctuation : punctuation.toLowerCase()
}
type Grader = (q: Question, answer: Answer) => boolean
const textGrade: Grader = (q, a) =>
  typeof a === 'string' &&
  !!q.answers?.some(
    (expected) =>
      normalize(expected, q.caseSensitive, q.ignoreEndPunctuation) ===
      normalize(a, q.caseSensitive, q.ignoreEndPunctuation),
  )
const choiceGrade: Grader = (q, a) => typeof a === 'string' && q.answers?.[0] === a
const itemsGrade: Grader = (q, a) =>
  typeof a === 'object' && !Array.isArray(a) && !!q.items?.every((i) => a[i.id] === i.answer)
export const graders: Record<ExerciseType, Grader> = {
  'multiple-choice': choiceGrade,
  'translation-choice': choiceGrade,
  'fill-blank-choice': choiceGrade,
  'true-false': choiceGrade,
  'fill-blank': textGrade,
  'verb-form': textGrade,
  transformation: textGrade,
  'sentence-completion': textGrade,
  'multiple-select': (q, a) =>
    Array.isArray(a) &&
    a.length === q.answers?.length &&
    new Set(a).size === a.length &&
    a.every((v) => q.answers?.includes(v)),
  'reorder-words': (q, a) => Array.isArray(a) && textGrade(q, a.join(' ')),
  'error-correction': (q, a) =>
    typeof a === 'object' &&
    !Array.isArray(a) &&
    a.index === String(q.errorIndex) &&
    textGrade(q, a.correction ?? ''),
  matching: itemsGrade,
  classify: itemsGrade,
  cloze: (q, a) =>
    typeof a === 'object' &&
    !Array.isArray(a) &&
    !!q.blanks?.every((b) =>
      b.answers.some(
        (expected) =>
          normalize(expected, q.caseSensitive) === normalize(a[b.id] ?? '', q.caseSensitive),
      ),
    ),
}
export const grade = (q: Question, answer: Answer) => graders[q.type](q, answer)
export function correctAnswer(q: Question) {
  if (q.items)
    return q.items
      .map((i) => `${i.text} → ${q.groups?.find((g) => g.id === i.answer)?.text}`)
      .join('; ')
  if (q.blanks) return q.blanks.map((b) => `${b.label}: ${b.answers.join(' / ')}`).join('; ')
  return q.answers?.map((a) => q.options?.find((o) => o.id === a)?.text ?? a).join(' / ') ?? ''
}
export function shuffle<T>(items: readonly T[], seed: number): T[] {
  const result = [...items]
  let state = seed >>> 0
  for (let i = result.length - 1; i > 0; i--) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    const j = Math.floor((state / 4294967296) * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
