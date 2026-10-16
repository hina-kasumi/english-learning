import { parseLesson } from './parse'
import { exerciseFileSchema } from '../types/content'
import metadata from '../generated/lessons.json'
import roadmapData from '../../content/grammar/roadmap.json'
import type { LessonMeta } from '../types/content'
export const lessonIndex: (LessonMeta & { file: string })[] = metadata as (LessonMeta & {
  file: string
})[]
export const roadmap = roadmapData
const lessonFiles = import.meta.glob('../../content/grammar/lessons/*.md', {
  query: '?raw',
  import: 'default',
})
const exerciseFiles = import.meta.glob('../../content/grammar/exercises/*.json')
const kbFiles = import.meta.glob('../../content/grammar/kb/cheatsheets/*.md', {
  query: '?raw',
  import: 'default',
})
export async function loadLesson(id: string) {
  const meta = lessonIndex.find((l) => l.id === id)
  const loader = meta && lessonFiles[`../../content/grammar/lessons/${meta.file}`]
  if (!loader) throw new Error('Không tìm thấy bài học này.')
  return parseLesson((await loader()) as string)
}
export async function loadExercises(id: string) {
  const loader = exerciseFiles[`../../content/grammar/exercises/${id}.json`]
  if (!loader) throw new Error('Bài học này chưa có bài tập.')
  const result = (await loader()) as { default: unknown }
  return exerciseFileSchema.parse(result.default)
}
export async function loadCheatsheet(id: string) {
  const loader = kbFiles[`../../content/grammar/kb/cheatsheets/${id}.md`]
  if (!loader) throw new Error('Không tìm thấy bảng tóm tắt này.')
  return (await loader()) as string
}

// Canonical destinations also keep previously saved reference links usable.
export function topicPath(code: string) {
  const lesson =
    lessonIndex.find(
      (l) =>
        l.practiceMode === 'self-check' && l.rules.some((r) => r.appendixCodes?.includes(code)),
    ) ?? lessonIndex.find((l) => l.rules.some((r) => r.appendixCodes?.includes(code)))
  const rule = lesson?.rules.find((r) => r.appendixCodes?.includes(code))
  return lesson && rule ? `/lesson/${lesson.id}?rule=${rule.id}` : '/knowledge'
}
