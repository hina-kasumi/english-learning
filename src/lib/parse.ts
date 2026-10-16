import { parse } from 'yaml'
import { lessonSchema } from '../types/content'
export function parseLesson(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) throw new Error('Bài học thiếu YAML frontmatter')
  return { ...lessonSchema.parse(parse(match[1])), body: match[2] }
}
export const fold = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
