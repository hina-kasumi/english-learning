import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { toString } from "mdast-util-to-string";
import GithubSlugger from "github-slugger";
import type { Chapter, Content, Heading, Lesson, Section } from "../types";

const sources = import.meta.glob<string>("/docs/grammar/**/*.md", {
  query: "?raw",
  import: "default",
  eager: false,
});
const ROOT = "/docs/grammar/";
const parser = unified().use(remarkParse).use(remarkGfm);
const fallbackTitle = (value: string) =>
  value.replace(/^\d+-/, "").replace(/-/g, " ");

export function parseLesson(
  path: string,
  markdown: string,
  reviewed = false,
): Lesson {
  const relative = path.replace(ROOT, "");
  const parts = relative.replace(/\.md$/, "").split("/");
  const file = parts.at(-1) ?? "";
  const tree = parser.parse(markdown);
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  const sections: Section[] = [];
  let current: Section = { id: "", heading: "", text: "" };
  let title = fallbackTitle(file);
  let description = "";
  let inOverview = false;
  for (const node of tree.children) {
    const text = toString(node);
    if (node.type === "heading") {
      const id = slugger.slug(text);
      if (node.depth === 1) {
        title = text;
        current.heading = text;
      }
      if (node.depth === 2 || node.depth === 3) {
        headings.push({ id, text, level: node.depth });
        if (current.text.trim()) sections.push(current);
        current = { id, heading: text, text: "" };
        inOverview = /tổng quan/i.test(text);
      }
    } else {
      current.text += `${text}\n`;
      if (
        !description &&
        node.type === "paragraph" &&
        (inOverview || parts.length === 1)
      )
        description = text;
    }
  }
  if (current.text.trim()) sections.push(current);
  return {
    id: parts.join("/"),
    path,
    slug: file.replace(/^\d+-/, ""),
    order: Number(file.match(/^\d+/)?.[0] ?? 0),
    chapterId: parts.length > 1 ? parts[0] : "",
    title,
    shortTitle: title.replace(/\s*\([^)]*\)\s*$/, ""),
    level: markdown.match(/\*\*Trình độ:\*\*\s*([^\n.]+)/)?.[1] ?? "",
    description,
    readingMinutes: Math.max(
      1,
      Math.ceil(toString(tree).split(/\s+/).length / 230),
    ),
    markdown,
    headings,
    sections,
    reviewed,
  };
}

export function buildContent(files: Record<string, string>): Content {
  const index = files[`${ROOT}00-index.md`] ?? "# Mục lục";
  const log = files[`${ROOT}_progress.md`] ?? "# Tiến độ biên soạn";
  const names = new Map(
    [...index.matchAll(/^### (\d+)\. (.+)$/gm)].map((m) => [
      Number(m[1]),
      m[2],
    ]),
  );
  const reviewed = new Set(
    [...log.matchAll(/^- \[x\] `([^`]+)`/gm)].map((m) => m[1]),
  );
  const lessons = Object.entries(files)
    .filter(([path]) =>
      /^\d+-[^/]+\/(?!_)[^/]+\.md$/.test(path.replace(ROOT, "")),
    )
    .map(([path, md]) =>
      parseLesson(path, md, reviewed.has(path.replace(ROOT, ""))),
    )
    .sort(
      (a, b) =>
        a.chapterId.localeCompare(b.chapterId, "en", { numeric: true }) ||
        a.order - b.order ||
        a.id.localeCompare(b.id),
    );
  const chapters: Chapter[] = [];
  for (const lesson of lessons) {
    let chapter = chapters.find((c) => c.id === lesson.chapterId);
    if (!chapter) {
      const order = Number(lesson.chapterId.match(/^\d+/)?.[0] ?? 0);
      chapter = {
        id: lesson.chapterId,
        slug: lesson.chapterId.replace(/^\d+-/, ""),
        order,
        title: names.get(order) ?? fallbackTitle(lesson.chapterId),
        lessons: [],
      };
      chapters.push(chapter);
    }
    chapter.lessons.push(lesson);
  }
  return {
    chapters,
    lessons,
    guide: parseLesson(`${ROOT}00-index.md`, index),
    editorialLog: parseLesson(`${ROOT}_progress.md`, log),
  };
}

let pending: Promise<Content> | undefined;
export function loadContent(): Promise<Content> {
  pending ??= Promise.all(
    Object.entries(sources).map(
      async ([path, load]) => [path, await load()] as const,
    ),
  ).then((entries) => buildContent(Object.fromEntries(entries)));
  return pending;
}
export const lessonUrl = (id: string, headingId?: string) => {
  const route =
    id === "00-index"
      ? "/guide"
      : id === "_progress"
        ? "/editorial-log"
        : `/lesson/${id}`;
  return `${route}${headingId ? `?section=${encodeURIComponent(headingId)}` : ""}`;
};
export function resolveMarkdownLink(
  href: string,
  sourcePath: string,
): string | null {
  if (/^(?:[a-z][\w+.-]*:|\/\/)/i.test(href)) return null;
  const url = new URL(href, `https://grammar.local${sourcePath}`);
  if (!url.pathname.startsWith(ROOT) || !url.pathname.endsWith(".md"))
    return null;
  let anchor = url.hash.slice(1);
  try {
    anchor = decodeURIComponent(anchor);
  } catch {
    /* Keep a malformed anchor readable. */
  }
  return lessonUrl(
    url.pathname.slice(ROOT.length).replace(/\.md$/, ""),
    anchor,
  );
}

// The glob is re-evaluated by Vite on add/remove; reload derived metadata on edits too.
if (import.meta.hot) {
  import.meta.hot.on("vite:beforeUpdate", ({ updates }) => {
    if (updates.some((update) => update.path.includes("/docs/grammar/")))
      window.location.reload();
  });
}
