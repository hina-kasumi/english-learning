import Fuse, { type FuseResultMatch } from "fuse.js";
import type { Lesson } from "../types";
export interface SearchDocument {
  lessonId: string;
  title: string;
  headingId: string;
  heading: string;
  text: string;
}
export interface SearchHit {
  item: SearchDocument;
  matches: readonly FuseResultMatch[];
}
export function createSearch(lessons: Lesson[]) {
  const documents: SearchDocument[] = lessons.flatMap((lesson) =>
    lesson.sections.map((section) => ({
      lessonId: lesson.id,
      title: lesson.title,
      headingId: section.id,
      heading: section.heading,
      text: section.text,
    })),
  );
  const index = new Fuse(documents, {
    keys: [
      { name: "title", weight: 3 },
      { name: "heading", weight: 2 },
      { name: "text", weight: 1 },
    ],
    includeMatches: true,
    includeScore: true,
    ignoreLocation: true,
    ignoreDiacritics: true,
    threshold: 0.28,
    minMatchCharLength: 2,
  });
  return (query: string): SearchHit[] => {
    if (query.trim().length < 2) return [];
    const counts = new Map<string, number>();
    return index
      .search(query.trim(), { limit: 80 })
      .filter((hit) => {
        const count = counts.get(hit.item.lessonId) ?? 0;
        counts.set(hit.item.lessonId, count + 1);
        return count < 3;
      })
      .slice(0, 15)
      .map((hit) => ({ item: hit.item, matches: hit.matches ?? [] }));
  };
}
export function excerpt(
  text: string,
  matches: readonly (readonly [number, number])[],
  length = 160,
) {
  const first =
    matches.find(([start, end]) => end - start >= 2)?.[0] ??
    matches[0]?.[0] ??
    0;
  const start = Math.max(0, first - 45);
  const end = Math.min(text.length, start + length);
  return {
    text: text.slice(start, end),
    start,
    prefix: start > 0,
    suffix: end < text.length,
  };
}
