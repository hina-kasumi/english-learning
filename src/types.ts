export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}
export interface Section {
  id: string;
  heading: string;
  text: string;
}
export interface Lesson {
  id: string;
  slug: string;
  path: string;
  order: number;
  chapterId: string;
  title: string;
  shortTitle: string;
  level: string;
  description: string;
  readingMinutes: number;
  markdown: string;
  headings: Heading[];
  sections: Section[];
  reviewed: boolean;
}
export interface Chapter {
  id: string;
  slug: string;
  order: number;
  title: string;
  lessons: Lesson[];
}
export interface Content {
  chapters: Chapter[];
  lessons: Lesson[];
  guide: Lesson;
  editorialLog: Lesson;
}
export type LessonStatus = "not-started" | "in-progress" | "completed";
export interface LessonProgress {
  status: LessonStatus;
  scrollY: number;
  lastViewed: string;
  completedAt?: string;
}
export interface Bookmark {
  lessonId: string;
  headingId?: string;
  label: string;
  createdAt: string;
}
export type Theme = "system" | "light" | "dark";
export interface Progress {
  version: 1;
  lessons: Record<string, LessonProgress>;
  notes: Record<string, string>;
  bookmarks: Bookmark[];
  activity: string[];
  weeklyGoal: number;
  roadmap: string;
  theme: Theme;
  fontSize: number;
}
