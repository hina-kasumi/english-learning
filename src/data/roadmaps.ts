import type { Chapter, Lesson, Progress } from "../types";
interface Roadmap {
  id: string;
  name: string;
  description: string;
  select: (chapters: Chapter[]) => Lesson[];
}
// Rules select from the content tree, so new lessons automatically join matching chapters.
export const roadmaps: Roadmap[] = [
  {
    id: "full",
    name: "Đầy đủ",
    description: "Đi từ nền tảng đến nâng cao, từng chủ đề một.",
    select: (chapters) => chapters.flatMap((c) => c.lessons),
  },
  {
    id: "quick",
    name: "Nền tảng nhanh",
    description: "Nắm nền tảng, từ loại và các thì thường dùng.",
    select: (chapters) =>
      chapters.flatMap((c) =>
        c.order <= 2
          ? c.lessons
          : c.order === 3
            ? c.lessons.filter((l) => [1, 2, 3, 5, 6, 9, 13].includes(l.order))
            : [],
      ),
  },
  {
    id: "vietnamese",
    name: "Sửa lỗi cho người Việt",
    description: "Nhận diện lỗi quen thuộc, rồi củng cố kiến thức liên quan.",
    select: (chapters) =>
      [9, 1, 2, 3, 4, 8].flatMap(
        (order) => chapters.find((c) => c.order === order)?.lessons ?? [],
      ),
  },
];
export const getRoadmap = (id: string) =>
  roadmaps.find((r) => r.id === id) ?? roadmaps[0];
export function nextLesson(chapters: Chapter[], progress: Progress) {
  return getRoadmap(progress.roadmap)
    .select(chapters)
    .find((l) => progress.lessons[l.id]?.status !== "completed");
}
export const statusLabel = (status?: string) =>
  status === "completed"
    ? "Đã xong"
    : status === "in-progress"
      ? "Đang học"
      : "Chưa học";
