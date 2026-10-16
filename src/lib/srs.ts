export interface RuleResult {
  correct: boolean
  difficulty: number
  at: string
}
export interface ReviewCard {
  box: number
  due: string
}
export function mastery(results: RuleResult[]): number {
  const recent = results.slice(-20)
  if (!recent.length) return 0
  let earned = 0,
    total = 0
  recent.forEach((r, index) => {
    const weight = r.difficulty * (index + 1)
    total += weight
    earned += r.correct ? weight : 0
  })
  return Math.round((100 * earned) / total)
}
export function scheduleReview(
  previous: ReviewCard | undefined,
  correct: boolean,
  now = new Date(),
): ReviewCard {
  const box = correct ? Math.min((previous?.box ?? 0) + 1, 5) : 0
  const due = new Date(now)
  due.setUTCDate(due.getUTCDate() + [1, 2, 4, 7, 14, 30][box])
  return { box, due: due.toISOString() }
}
