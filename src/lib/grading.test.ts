import { describe, expect, it } from 'vitest'
import { readContent } from '../../scripts/content-utils'
import { exerciseTypes, questionSchema, type Answer, type Question } from '../types/content'
import { grade, normalize, shuffle, correctAnswer } from './grading'
const { exercises } = readContent()
const questions = exercises.flatMap((e) => e.sets.flatMap((s) => s.questions))
function validAnswer(q: Question): Answer {
  if (q.type === 'error-correction')
    return { index: String(q.errorIndex), correction: q.answers![0] }
  if (q.type === 'reorder-words') return q.answers![0].split(' ')
  if (q.type === 'multiple-select') return [...q.answers!].reverse()
  if (q.items) return Object.fromEntries(q.items.map((i) => [i.id, i.answer]))
  if (q.blanks) return Object.fromEntries(q.blanks.map((b) => [b.id, b.answers[0]]))
  return q.answers![0]
}
describe('All published questions and all 14 graders', () => {
  it('has published examples of every required type', () =>
    expect([...new Set(questions.map((q) => q.type))].sort()).toEqual([...exerciseTypes].sort()))
  it.each(questions.map((q) => [q.id, q] as const))(
    '%s accepts its authored correct answer and rejects empty/wrong input',
    (_id, q) => {
      expect(grade(q, validAnswer(q))).toBe(true)
      expect(grade(q, '')).toBe(false)
      expect(grade(q, 'not a valid answer')).toBe(false)
      expect(correctAnswer(q).length).toBeGreaterThan(0)
    },
  )
  it('requires the exact selection set and disallows duplicate IDs', () => {
    const q = questions.find((q) => q.type === 'multiple-select')!
    expect(grade(q, [q.answers![0]])).toBe(false)
    expect(grade(q, [q.answers![0], q.answers![0]])).toBe(false)
    expect(grade(q, [...q.answers!, 'extra'])).toBe(false)
  })
  it('requires both the error location and correction', () => {
    const q = questions.find((q) => q.type === 'error-correction')!
    expect(grade(q, { index: String(q.errorIndex! + 1), correction: q.answers![0] })).toBe(false)
    expect(grade(q, { index: String(q.errorIndex), correction: 'incorrect' })).toBe(false)
  })
  it('does not give full marks to an incomplete cloze/matching/classification', () => {
    for (const type of ['cloze', 'matching', 'classify']) {
      const q = questions.find((q) => q.type === type)!
      const answer = validAnswer(q) as Record<string, string>
      delete answer[Object.keys(answer)[0]]
      expect(grade(q, answer)).toBe(false)
    }
  })
  it('only accepts contractions explicitly declared by the author', () => {
    const q = questionSchema.parse({
      id: 'x',
      type: 'fill-blank',
      difficulty: 1,
      ruleIds: ['r'],
      prompt: 'x',
      explanation: 'x',
      answers: ['does not'],
    })
    expect(grade(q, "doesn't")).toBe(false)
    expect(grade({ ...q, answers: ['does not', "doesn't"] }, 'doesn’t')).toBe(true)
  })
})
describe('Normalization and stable shuffle', () => {
  it('normalizes curly apostrophes, whitespace, unicode and case', () =>
    expect(normalize('  SHE’S   ready  ')).toBe("she's ready"))
  it('respects requested case and punctuation', () => {
    expect(normalize('I', true)).not.toBe(normalize('i', true))
    expect(normalize('Ready?', false, true)).toBe('ready')
    expect(normalize('Ready?')).toBe('ready?')
  })
  it('preserves internal punctuation and negation', () => {
    expect(normalize("don't")).not.toBe(normalize('dont'))
    expect(normalize('not ready')).not.toBe(normalize('ready'))
  })
  it('is reproducible, nonmutating and preserves duplicate tokens', () => {
    const input = ['the', 'cat', 'and', 'the', 'dog']
    expect(shuffle(input, 12)).toEqual(shuffle(input, 12))
    expect(shuffle(input, 12).sort()).toEqual([...input].sort())
    expect(input).toEqual(['the', 'cat', 'and', 'the', 'dog'])
    expect(shuffle(input, 12)).not.toEqual(shuffle(input, 13))
  })
})
describe('Question schemas reject unusable payloads', () => {
  it('rejects duplicate accepted options and invalid true-false choices', () => {
    const multi = questions.find((q) => q.type === 'multiple-select')!
    expect(
      questionSchema.safeParse({ ...multi, answers: [multi.answers![0], multi.answers![0]] })
        .success,
    ).toBe(false)
    const binary = questions.find((q) => q.type === 'true-false')!
    expect(
      questionSchema.safeParse({
        ...binary,
        options: [...binary.options!, { id: 'extra', text: 'Maybe' }],
      }).success,
    ).toBe(false)
  })
  it('rejects missing or dangling answer options', () => {
    const q = questions.find((q) => q.type === 'multiple-choice')!
    expect(questionSchema.safeParse({ ...q, answers: ['missing'] }).success).toBe(false)
    expect(questionSchema.safeParse({ ...q, answers: ['0', '1'] }).success).toBe(false)
  })
  it('rejects mismatched reorder tokens and out-of-range error positions', () => {
    const q = questions.find((q) => q.type === 'reorder-words')!
    expect(questionSchema.safeParse({ ...q, tokens: ['missing'] }).success).toBe(false)
    const correction = questions.find((q) => q.type === 'error-correction')!
    expect(questionSchema.safeParse({ ...correction, errorIndex: 999 }).success).toBe(false)
  })
  it('rejects dangling groups, duplicate IDs and empty explanation', () => {
    const q = questions.find((q) => q.type === 'matching')!
    expect(questionSchema.safeParse({ ...q, groups: [] }).success).toBe(false)
    expect(questionSchema.safeParse({ ...q, items: [q.items![0], q.items![0]] }).success).toBe(
      false,
    )
    expect(questionSchema.safeParse({ ...q, explanation: ' ' }).success).toBe(false)
  })
})
