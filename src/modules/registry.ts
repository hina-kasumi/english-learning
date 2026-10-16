import { lazy, type ComponentType } from 'react'
export interface LearningModule {
  id: string
  title: string
  routes: { path: string; component: ComponentType }[]
  progressNamespace: string
  contentLoader: typeof import('../lib/content').loadLesson
}
export const modules: LearningModule[] = [
  {
    id: 'grammar',
    title: 'Ngữ pháp',
    progressNamespace: 'grammar',
    routes: [
      { path: '/lesson/:id', component: lazy(() => import('../features/grammar/LessonPage')) },
      {
        path: '/practice/:id/:setId',
        component: lazy(() => import('../features/grammar/PracticePage')),
      },
    ],
    contentLoader: async (id) => (await import('../lib/content')).loadLesson(id),
  },
]
