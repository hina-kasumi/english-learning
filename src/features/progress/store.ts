import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import {
  dataSchema,
  initialData,
  migrateStorage,
  type Attempt,
  type LearningData,
} from '../../lib/storage'
import { scheduleReview, mastery } from '../../lib/srs'
import type { LessonMeta } from '../../types/content'
interface LearningStore extends LearningData {
  storageError: string | null
  setSettings: (settings: Partial<LearningData['settings']>) => void
  markRead: (id: string) => void
  visitLesson: (id: string) => void
  toggleBookmark: (id: string) => void
  saveNote: (id: string, note: string) => void
  recordAttempt: (attempt: Attempt) => void
  importData: (data: LearningData) => void
}
export const useLearning = create<LearningStore>()(
  persist(
    (set) => ({
      ...initialData(),
      storageError: null,
      setSettings: (settings) => set((s) => ({ settings: { ...s.settings, ...settings } })),
      markRead: (id) => set((s) => ({ readLessons: [...new Set([...s.readLessons, id])] })),
      visitLesson: (id) => set({ lastLesson: id }),
      toggleBookmark: (id) =>
        set((s) => ({
          bookmarks: s.bookmarks.includes(id)
            ? s.bookmarks.filter((v) => v !== id)
            : [...s.bookmarks, id],
        })),
      saveNote: (id, note) => set((s) => ({ notes: { ...s.notes, [id]: note } })),
      importData: (data) => set(dataSchema.parse(data)),
      recordAttempt: (attempt) =>
        set((s) => {
          if (s.attempts.some((a) => a.id === attempt.id)) return s
          const results = { ...s.results },
            review = { ...s.review },
            mistakes = { ...s.mistakes }
          for (const response of attempt.responses) {
            const key = `grammar:${response.questionId}`
            if (response.correct) delete mistakes[key]
            else
              mistakes[key] = {
                lessonId: attempt.lessonId,
                ruleIds: response.ruleIds,
                at: attempt.at,
              }
            for (const ruleId of response.ruleIds) {
              const ruleKey = `grammar:${ruleId}`
              results[ruleKey] = [
                ...(results[ruleKey] ?? []),
                { correct: response.correct, difficulty: response.difficulty, at: attempt.at },
              ].slice(-20)
            }
          }
          const touched = new Set(attempt.responses.flatMap((r) => r.ruleIds))
          for (const ruleId of touched) {
            const correct = attempt.responses
              .filter((r) => r.ruleIds.includes(ruleId))
              .every((r) => r.correct)
            review[`grammar:${ruleId}`] = scheduleReview(
              review[`grammar:${ruleId}`],
              correct,
              new Date(attempt.at),
            )
          }
          return { attempts: [...s.attempts, attempt], results, review, mistakes }
        }),
    }),
    {
      name: 'gramio-learning',
      version: 1,
      storage: createJSONStorage(() => ({
        getItem: (key) => localStorage.getItem(key),
        setItem: (key, value) => {
          try {
            localStorage.setItem(key, value)
          } catch {
            queueMicrotask(() => {
              const message =
                'Trình duyệt không lưu được tiến độ. Hãy xuất bản sao lưu trong Cài đặt.'
              if (useLearning.getState().storageError !== message)
                useLearning.setState({ storageError: message })
            })
          }
        },
        removeItem: (key) => localStorage.removeItem(key),
      })),
      partialize: (state) => dataSchema.parse(state),
      migrate: (state, version) => migrateStorage(state, version),
      onRehydrateStorage: () => (_state, error) => {
        if (error)
          queueMicrotask(() =>
            useLearning.setState({
              storageError:
                'Không đọc được tiến độ đã lưu. Bạn có thể khôi phục bản sao lưu trong Cài đặt.',
            }),
          )
      },
    },
  ),
)
export function lessonStatus(lesson: LessonMeta, data: LearningData) {
  if (lesson.practiceMode === 'self-check' && data.readLessons.includes(lesson.id))
    return 'completed'
  const records = lesson.rules.map((r) => data.results[`grammar:${r.id}`] ?? [])
  if (records.every((r) => r.length >= 4 && mastery(r) >= 80)) return 'mastered'
  if (
    data.readLessons.includes(lesson.id) &&
    data.attempts.some(
      (a) =>
        a.lessonId === lesson.id &&
        a.kind === 'practice' &&
        a.responses.filter((r) => r.correct).length / a.responses.length >= 0.7,
    )
  )
    return 'completed'
  if (data.readLessons.includes(lesson.id) || data.attempts.some((a) => a.lessonId === lesson.id))
    return 'in-progress'
  if (lesson.prerequisites.some((id) => !data.readLessons.includes(id))) return 'locked'
  return 'available'
}
export function localDay(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
export function currentStreak(attempts: Attempt[], now = new Date()) {
  const days = new Set(attempts.map((a) => localDay(new Date(a.at))))
  const cursor = new Date(now)
  let count = 0
  if (!days.has(localDay(cursor))) cursor.setDate(cursor.getDate() - 1)
  while (days.has(localDay(cursor))) {
    count++
    cursor.setDate(cursor.getDate() - 1)
  }
  return count
}
