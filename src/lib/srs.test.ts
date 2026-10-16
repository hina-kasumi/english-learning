import { describe, it, expect } from 'vitest'
import { mastery, scheduleReview, type RuleResult } from './srs'
const result = (correct: boolean, difficulty = 1): RuleResult => ({
  correct,
  difficulty,
  at: '2026-10-15T00:00:00.000Z',
})
describe('Mastery', () => {
  it('handles new, perfect and wholly incorrect rules', () => {
    expect(mastery([])).toBe(0)
    expect(mastery([result(true)])).toBe(100)
    expect(mastery([result(false)])).toBe(0)
  })
  it('weights newer responses and harder questions more', () => {
    expect(mastery([result(false), result(true)])).toBe(67)
    expect(mastery([result(true), result(false)])).toBe(33)
    expect(mastery([result(false), result(true, 3)])).toBe(86)
  })
  it('only considers the most recent 20 responses', () =>
    expect(mastery([result(false), ...Array.from({ length: 20 }, () => result(true))])).toBe(100))
})
describe('Leitner schedule', () => {
  const now = new Date('2026-10-16T10:00:00.000Z')
  it('advances correct cards, resets wrong ones and caps the final box', () => {
    expect(scheduleReview(undefined, true, now)).toEqual({
      box: 1,
      due: '2026-10-18T10:00:00.000Z',
    })
    expect(scheduleReview({ box: 4, due: '' }, false, now)).toEqual({
      box: 0,
      due: '2026-10-17T10:00:00.000Z',
    })
    expect(scheduleReview({ box: 5, due: '' }, true, now)).toEqual({
      box: 5,
      due: '2026-11-15T10:00:00.000Z',
    })
  })
  it('does not mutate input dates and crosses month boundaries', () => {
    const date = new Date('2026-01-31T10:00:00Z')
    scheduleReview(undefined, true, date)
    expect(date.toISOString()).toBe('2026-01-31T10:00:00.000Z')
    expect(scheduleReview(undefined, false, date).due).toBe('2026-02-01T10:00:00.000Z')
  })
})
