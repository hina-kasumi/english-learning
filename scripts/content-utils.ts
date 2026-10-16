import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { parseLesson } from '../src/lib/parse'
import { exerciseFileSchema, roadmapSchema } from '../src/types/content'
export const root = resolve(process.env.GRAMIO_CONTENT_ROOT ?? resolve(import.meta.dirname, '..'))
export function readContent(directory = root) {
  const lessons = readdirSync(resolve(directory, 'content/grammar/lessons'))
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({
      ...parseLesson(readFileSync(resolve(directory, 'content/grammar/lessons', f), 'utf8')),
      file: f,
    }))
  const exercises = readdirSync(resolve(directory, 'content/grammar/exercises'))
    .filter((f) => f.endsWith('.json'))
    .map((f) =>
      exerciseFileSchema.parse(
        JSON.parse(readFileSync(resolve(directory, 'content/grammar/exercises', f), 'utf8')),
      ),
    )
  const roadmap = roadmapSchema.parse(
    JSON.parse(readFileSync(resolve(directory, 'content/grammar/roadmap.json'), 'utf8')),
  )
  return { lessons, exercises, roadmap }
}
