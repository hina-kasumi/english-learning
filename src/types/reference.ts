import { z } from 'zod'
const text = z.string().trim().min(1)
export const referenceSchema = z.object({
  id: z.string().regex(/^[A-Q]$/),
  title: text,
  description: text,
  topics: z
    .array(
      z.object({
        id: z.string().regex(/^[A-Q]\.\d{2}$/),
        title: text,
        level: z.enum(['L0', 'A1', 'A2', 'B1', 'B2', 'C1']),
        form: text,
        explanation: text,
        examples: z.array(z.object({ en: text, vi: text })).min(1),
        pitfall: text,
        comparison: text,
        relatedLessons: z.array(text),
      }),
    )
    .min(1),
  tables: z.array(
    z
      .object({
        title: text,
        headers: z.array(text).min(2),
        rows: z.array(z.array(text)).min(1),
        note: text,
      })
      .refine(
        (table) => table.rows.every((row) => row.length === table.headers.length),
        'Số ô không khớp tiêu đề bảng',
      ),
  ),
  sources: z.array(z.object({ title: text, url: z.url().startsWith('https://') })),
})
export type Reference = z.infer<typeof referenceSchema>
