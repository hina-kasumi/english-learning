import { z } from 'zod'

export const levels = ['L0', 'A1', 'A2', 'B1', 'B2', 'C1'] as const
export const exerciseTypes = [
  'multiple-choice',
  'multiple-select',
  'fill-blank',
  'fill-blank-choice',
  'verb-form',
  'error-correction',
  'reorder-words',
  'transformation',
  'matching',
  'true-false',
  'classify',
  'cloze',
  'translation-choice',
  'sentence-completion',
] as const
const text = z.string().trim().min(1)
export const lessonSchema = z.object({
  id: text,
  moduleId: z.string().default('grammar'),
  title: text,
  titleEn: text,
  level: z.enum(levels),
  unit: text,
  order: z.number().int().positive(),
  estimatedMinutes: z.number().positive(),
  prerequisites: z.array(text),
  tags: z.array(text).min(1),
  summary: text,
  large: z.boolean().default(false),
  rules: z
    .array(
      z.object({
        id: text,
        label: text,
        important: z.boolean().default(false),
        appendixCodes: z.array(z.string().regex(/^[A-Q]\.\d{2}$/)).optional(),
      }),
    )
    .min(1),
  related: z.array(text),
})
const optionSchema = z.object({ id: text, text })
export const questionSchema = z
  .object({
    id: text,
    type: z.enum(exerciseTypes),
    difficulty: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    ruleIds: z.array(text).min(1),
    prompt: text,
    explanation: text,
    translation: text.optional(),
    answers: z.array(text).min(1).optional(),
    options: z.array(optionSchema).optional(),
    caseSensitive: z.boolean().default(false),
    ignoreEndPunctuation: z.boolean().default(false),
    wrongAnswerHints: z.record(z.string(), text).optional(),
    tokens: z.array(text).optional(),
    errorIndex: z.number().int().nonnegative().optional(),
    items: z.array(z.object({ id: text, text, answer: text })).optional(),
    groups: z.array(optionSchema).optional(),
    blanks: z
      .array(
        z.object({
          id: text,
          label: text,
          answers: z.array(text).min(1),
          options: z.array(text).optional(),
        }),
      )
      .optional(),
  })
  .superRefine((q, ctx) => {
    const fail = (message: string) => ctx.addIssue({ code: 'custom', message })
    const choice = [
      'multiple-choice',
      'fill-blank-choice',
      'translation-choice',
      'multiple-select',
      'true-false',
    ].includes(q.type)
    if (!['matching', 'classify', 'cloze'].includes(q.type) && !q.answers?.length)
      fail('Thiếu answers')
    if (q.answers && new Set(q.answers).size !== q.answers.length) fail('Trùng đáp án')
    if (choice) {
      if (q.type === 'true-false' && q.options?.length !== 2) fail('Đúng/sai cần đúng 2 lựa chọn')
      if (q.type === 'multiple-choice' && (q.options?.length ?? 0) > 4)
        fail('Trắc nghiệm có tối đa 4 lựa chọn')
      if (!q.options || q.options.length < (q.type === 'true-false' ? 2 : 3)) fail('Thiếu lựa chọn')
      if (q.type !== 'multiple-select' && q.answers?.length !== 1) fail('Cần đúng một đáp án')
      if (q.type === 'multiple-select' && (q.answers?.length ?? 0) < 2)
        fail('Cần ít nhất hai đáp án đúng')
      if (q.answers?.some((a) => !q.options?.some((o) => o.id === a)))
        fail('Đáp án không nằm trong lựa chọn')
      if (new Set(q.options?.map((o) => o.id)).size !== q.options?.length) fail('Trùng ID lựa chọn')
      if (new Set(q.options?.map((o) => o.text)).size !== q.options?.length)
        fail('Trùng nội dung lựa chọn')
    }
    if (q.type === 'reorder-words') {
      if (!q.tokens?.length) fail('Thiếu từ để sắp xếp')
      const sorted = (s: string[]) =>
        s
          .map((t) => t.toLowerCase())
          .sort()
          .join('|')
      if (q.answers?.some((a) => sorted(a.split(/\s+/)) !== sorted(q.tokens ?? [])))
        fail('Token không khớp đáp án')
    }
    if (
      q.type === 'error-correction' &&
      (!q.tokens?.length || q.errorIndex === undefined || q.errorIndex >= q.tokens.length)
    )
      fail('Vị trí lỗi không hợp lệ')
    if (q.type === 'matching' || q.type === 'classify') {
      if (!q.items?.length || !q.groups?.length) fail('Thiếu cặp hoặc nhóm')
      if (q.items?.some((i) => !q.groups?.some((g) => g.id === i.answer)))
        fail('Nhóm đáp án không tồn tại')
      if (new Set(q.items?.map((i) => i.id)).size !== q.items?.length) fail('Trùng ID mục')
      if (new Set(q.groups?.map((i) => i.id)).size !== q.groups?.length) fail('Trùng ID nhóm')
      if (q.type === 'matching' && new Set(q.items?.map((i) => i.answer)).size !== q.items?.length)
        fail('Cặp nối phải một-một')
    }
    if (q.type === 'cloze') {
      if (!q.blanks?.length) fail('Thiếu chỗ trống')
      if (new Set(q.blanks?.map((b) => b.id)).size !== q.blanks?.length) fail('Trùng ID chỗ trống')
      q.blanks?.forEach((b) => {
        if (b.options && b.answers.some((a) => !b.options?.includes(a)))
          fail('Đáp án cloze không nằm trong lựa chọn')
      })
    }
  })
export const setSchema = z.object({
  id: text,
  kind: z.enum(['practice', 'mixed', 'unit-test', 'level-test', 'placement']),
  title: text,
  instruction: text,
  questions: z.array(questionSchema).min(1),
})
export const exerciseFileSchema = z.object({
  lessonId: text,
  moduleId: z.string().default('grammar'),
  sets: z.array(setSchema).min(1),
})
export const roadmapSchema = z.object({
  stage: z.number().int().min(1).max(6),
  tracks: z.array(z.object({ id: text, title: text, available: z.boolean() })),
  levels: z.array(
    z.object({
      id: z.enum(levels),
      title: text,
      description: text,
      targetCEFR: text,
      estimatedHours: z.number().nonnegative(),
      levelTest: text.optional(),
      units: z.array(
        z.object({
          id: text,
          title: text,
          lessons: z.array(text),
          unitTest: text.optional(),
          goals: z.array(text),
          tracks: z.array(text),
        }),
      ),
    }),
  ),
})
export type LessonMeta = z.infer<typeof lessonSchema>
export type Lesson = LessonMeta & { body: string }
export type Question = z.infer<typeof questionSchema>
export type ExerciseSet = z.infer<typeof setSchema>
export type ExerciseFile = z.infer<typeof exerciseFileSchema>
export type Answer = string | string[] | Record<string, string>
export type ExerciseType = Question['type']
