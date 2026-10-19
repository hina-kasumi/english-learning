import type { Bookmark, LessonProgress, Progress } from "../types";
export const STORAGE_KEY = "goc-ngu-phap:v1";
export function emptyProgress(): Progress {
  return {
    version: 1,
    lessons: {},
    notes: {},
    bookmarks: [],
    activity: [],
    weeklyGoal: 3,
    roadmap: "full",
    theme: "system",
    fontSize: 17,
  };
}
export function dayKey(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function streak(activity: string[], today = new Date()): number {
  const days = new Set(activity);
  const cursor = new Date(today);
  if (!days.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let count = 0;
  while (days.has(dayKey(cursor))) {
    count++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}
export function weekStart(today = new Date()): string {
  const cursor = new Date(today);
  cursor.setDate(cursor.getDate() - ((cursor.getDay() + 6) % 7));
  cursor.setHours(0, 0, 0, 0);
  return cursor.toISOString();
}
function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
const validId = (value: string) =>
  /^\d+-[^/]+\/[^/]+$/.test(value) && value.length < 300;
const validDate = (value: unknown): value is string =>
  typeof value === "string" && Number.isFinite(Date.parse(value));
const fail = (): never => {
  throw new Error(
    "Tệp sao lưu không đúng định dạng hoặc phiên bản được hỗ trợ.",
  );
};
export function parseProgress(value: unknown): Progress {
  if (
    !record(value) ||
    value.version !== 1 ||
    !record(value.lessons) ||
    !record(value.notes) ||
    !Array.isArray(value.bookmarks) ||
    !Array.isArray(value.activity)
  )
    return fail();
  const result = emptyProgress();
  for (const [id, entry] of Object.entries(value.lessons)) {
    if (
      !validId(id) ||
      !record(entry) ||
      !["not-started", "in-progress", "completed"].includes(
        String(entry.status),
      ) ||
      typeof entry.scrollY !== "number" ||
      !Number.isFinite(entry.scrollY) ||
      entry.scrollY < 0 ||
      !validDate(entry.lastViewed) ||
      (entry.completedAt !== undefined && !validDate(entry.completedAt))
    )
      return fail();
    result.lessons[id] = {
      status: entry.status as LessonProgress["status"],
      scrollY: entry.scrollY,
      lastViewed: entry.lastViewed,
      ...(entry.completedAt
        ? { completedAt: entry.completedAt as string }
        : {}),
    };
  }
  for (const [id, note] of Object.entries(value.notes)) {
    if (!validId(id) || typeof note !== "string" || note.length > 100000)
      return fail();
    result.notes[id] = note;
  }
  const keys = new Set<string>();
  for (const entry of value.bookmarks) {
    if (
      !record(entry) ||
      typeof entry.lessonId !== "string" ||
      !validId(entry.lessonId) ||
      typeof entry.label !== "string" ||
      entry.label.length > 1000 ||
      !validDate(entry.createdAt) ||
      (entry.headingId !== undefined &&
        (typeof entry.headingId !== "string" || entry.headingId.length > 1000))
    )
      return fail();
    const bookmark: Bookmark = {
      lessonId: entry.lessonId,
      label: entry.label,
      createdAt: entry.createdAt,
      ...(entry.headingId ? { headingId: entry.headingId as string } : {}),
    };
    const key = `${bookmark.lessonId}#${bookmark.headingId ?? ""}`;
    if (!keys.has(key)) result.bookmarks.push(bookmark);
    keys.add(key);
  }
  if (
    !value.activity.every(
      (day: unknown) =>
        typeof day === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(day) &&
        validDate(day) &&
        new Date(day).toISOString().slice(0, 10) === day,
    )
  )
    return fail();
  result.activity = [...new Set(value.activity as string[])].sort();
  if (
    typeof value.weeklyGoal !== "number" ||
    !Number.isInteger(value.weeklyGoal) ||
    value.weeklyGoal < 1 ||
    value.weeklyGoal > 30 ||
    typeof value.fontSize !== "number" ||
    value.fontSize < 15 ||
    value.fontSize > 22 ||
    typeof value.roadmap !== "string" ||
    value.roadmap.length > 100 ||
    !["system", "light", "dark"].includes(String(value.theme))
  )
    return fail();
  return {
    ...result,
    weeklyGoal: value.weeklyGoal,
    fontSize: value.fontSize,
    roadmap: value.roadmap,
    theme: value.theme as Progress["theme"],
  };
}
