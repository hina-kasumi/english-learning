import { z } from 'zod'
const ruleResultSchema = z.object({
  correct: z.boolean(),
  difficulty: z.number().int().min(1).max(3),
  at: z.string().datetime(),
})
export const settingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'auto']).default('light'),
  fontSize: z.enum(['small', 'medium', 'large']).default('medium'),
  translations: z.boolean().default(true),
  voice: z.enum(['en-GB', 'en-US']).default('en-GB'),
  rate: z.number().min(0.5).max(1.5).default(0.85),
  dailyGoal: z.number().int().min(5).max(100).default(10),
  sequential: z.boolean().default(false),
})
const responseSchema = z.object({
  questionId: z.string(),
  ruleIds: z.array(z.string()),
  correct: z.boolean(),
  difficulty: z.number().int().min(1).max(3),
})
export const attemptSchema = z.object({
  id: z.string(),
  lessonId: z.string(),
  setId: z.string(),
  kind: z.string(),
  at: z.string().datetime(),
  seconds: z.number().nonnegative(),
  responses: z.array(responseSchema),
})
export const dataSchema = z.object({
  settings: settingsSchema.default(() => settingsSchema.parse({})),
  readLessons: z.array(z.string()).default([]),
  bookmarks: z.array(z.string()).default([]),
  notes: z.record(z.string(), z.string()).default({}),
  attempts: z.array(attemptSchema).default([]),
  results: z.record(z.string(), z.array(ruleResultSchema)).default({}),
  review: z
    .record(
      z.string(),
      z.object({ box: z.number().int().min(0).max(5), due: z.string().datetime() }),
    )
    .default({}),
  mistakes: z
    .record(
      z.string(),
      z.object({ lessonId: z.string(), ruleIds: z.array(z.string()), at: z.string().datetime() }),
    )
    .default({}),
  lastLesson: z.string().default('L0-01'),
})
export type LearningData = z.infer<typeof dataSchema>
export type Attempt = z.infer<typeof attemptSchema>
export const initialData = () => dataSchema.parse({})
export function migrateStorage(value: unknown, version: number): LearningData {
  if (version > 1)
    throw new Error('Dữ liệu được tạo bằng phiên bản mới hơn. Hãy cập nhật ứng dụng.')
  // Version 0 used the name completedLessons for read markers.
  if (version === 0 && typeof value === 'object' && value) {
    const old = value as Record<string, unknown>
    return dataSchema.parse({ ...old, readLessons: old.readLessons ?? old.completedLessons ?? [] })
  }
  return dataSchema.parse(value)
}
export function parseBackup(raw: string): LearningData {
  const backup = z
    .object({
      app: z.literal('gramio'),
      version: z.number().int().min(0).max(1),
      data: z.unknown(),
    })
    .parse(JSON.parse(raw))
  return migrateStorage(backup.data, backup.version)
}
export const makeBackup = (data: unknown) =>
  JSON.stringify(
    {
      app: 'gramio',
      version: 1,
      exportedAt: new Date().toISOString(),
      data: dataSchema.parse(data),
    },
    null,
    2,
  )
