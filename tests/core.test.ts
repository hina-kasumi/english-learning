import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { resolve, relative } from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import type { RootContent } from "mdast";
import {
  buildContent,
  parseLesson,
  resolveMarkdownLink,
  lessonUrl,
} from "../src/lib/content";
import { createSearch } from "../src/lib/search";
import {
  dayKey,
  emptyProgress,
  parseProgress,
  streak,
  weekStart,
} from "../src/lib/progress";
import { getRoadmap, nextLesson } from "../src/data/roadmaps";

const root = resolve("docs/grammar");
const paths = readdirSync(root, { recursive: true, encoding: "utf8" }).filter(
  (p) => p.endsWith(".md"),
);
const files = Object.fromEntries(
  paths.map((p) => [
    `/docs/grammar/${p}`,
    readFileSync(resolve(root, p), "utf8"),
  ]),
);
const content = buildContent(files);

describe("real grammar corpus", () => {
  it("loads all 63 lessons into 9 ordered chapters without editorial documents", () => {
    expect(content.lessons).toHaveLength(63);
    expect(content.chapters).toHaveLength(9);
    expect(content.chapters.map((c) => c.lessons.length)).toEqual([
      5, 9, 15, 8, 8, 5, 7, 4, 2,
    ]);
    expect(content.chapters[0].title).toBe("Nền tảng");
    expect(content.lessons.every((l) => l.reviewed)).toBe(true);
    expect(content.lessons[0].title).toContain("từ loại");
  });
  it("discovers added and deleted lessons without editing application code", () => {
    const path = "/docs/grammar/01-foundations/06-new-topic.md";
    const updated = buildContent({
      ...files,
      [path]: "# Chủ đề mới\n\n## Tổng quan\nNội dung mới.",
    });
    expect(updated.lessons).toHaveLength(64);
    expect(updated.chapters[0].lessons.at(-1)?.title).toBe("Chủ đề mới");
    expect(getRoadmap("full").select(updated.chapters)).toHaveLength(64);
    expect(
      getRoadmap("quick")
        .select(updated.chapters)
        .some((l) => l.slug === "new-topic"),
    ).toBe(true);
    const removed = { ...files };
    delete removed[content.lessons[0].path];
    expect(buildContent(removed).lessons).toHaveLength(62);
  });
  it("has valid destinations for every internal lesson link and heading", () => {
    const all = [...content.lessons, content.guide, content.editorialLog];
    const parser = unified().use(remarkParse);
    let checked = 0;
    const visit = (node: RootContent, path: string) => {
      if (node.type === "link") {
        const route = resolveMarkdownLink(node.url, path);
        if (route) {
          const [pathname, search = ""] = route.split("?");
          const lesson = all.find((l) => lessonUrl(l.id) === pathname);
          expect(
            lesson,
            `${relative(root, path)} -> ${node.url}`,
          ).toBeDefined();
          const anchor = new URLSearchParams(search).get("section");
          if (anchor)
            expect(
              lesson?.headings.some((h) => h.id === anchor),
              `${path} -> ${node.url}`,
            ).toBe(true);
          checked++;
        }
      }
      if ("children" in node)
        node.children.forEach((child) => visit(child, path));
    };
    for (const lesson of all)
      parser
        .parse(lesson.markdown)
        .children.forEach((node) => visit(node, lesson.path));
    expect(checked).toBeGreaterThan(900);
  });
  it("parses repeated headings, inline formatting and fallback titles", () => {
    const lesson = parseLesson(
      "/docs/grammar/01-foundations/99-example.md",
      "# **Tên bài**\n\n## Ví dụ\nOne\n## Ví dụ\nTwo\n### *Nội dung*\nThree",
    );
    expect(lesson.title).toBe("Tên bài");
    expect(lesson.headings.map((h) => h.id)).toEqual([
      "ví-dụ",
      "ví-dụ-1",
      "nội-dung",
    ]);
    expect(
      parseLesson("/docs/grammar/01-foundations/99-new-file.md", "Hello").title,
    ).toBe("new file");
    expect(
      resolveMarkdownLink("https://example.com/file.md", lesson.path),
    ).toBeNull();
  });
});

describe("full-text search", () => {
  const search = createSearch(content.lessons);
  it("finds title, Vietnamese without accents and content-only examples under 200ms per query", () => {
    const queries = [
      "Quá khứ đơn",
      "mao tu",
      "scanner",
      "look forward",
      "mệnh đề quan hệ",
    ];
    const timings: number[] = [];
    for (const query of queries) {
      const start = performance.now();
      const hits = search(query);
      timings.push(performance.now() - start);
      expect(hits.length, query).toBeGreaterThan(0);
    }
    expect(search("Quá khứ đơn")[0].item.lessonId).toContain("past-simple");
    expect(
      search("scanner").some(
        (h) => h.item.headingId && h.matches.some((m) => m.key === "text"),
      ),
    ).toBe(true);
    console.log(
      "Search timings (ms):",
      queries.map((q, i) => `${q}: ${timings[i].toFixed(1)}`).join(", "),
    );
    expect(Math.max(...timings)).toBeLessThan(200);
  });
});

describe("progress, backups and learning dates", () => {
  it("round-trips all user data and rejects malformed or unsafe input", () => {
    const progress = emptyProgress();
    const id = content.lessons[0].id;
    progress.lessons[id] = {
      status: "completed",
      scrollY: 800,
      lastViewed: "2026-10-18T07:00:00.000Z",
      completedAt: "2026-10-18T07:00:00.000Z",
    };
    progress.notes[id] = "Ghi chú tiếng Việt";
    progress.activity = ["2026-10-18"];
    progress.bookmarks.push({
      lessonId: id,
      headingId: "1-tổng-quan",
      label: "Tổng quan",
      createdAt: "2026-10-18T07:00:00.000Z",
    });
    expect(parseProgress(JSON.parse(JSON.stringify(progress)))).toEqual(
      progress,
    );
    expect(() => parseProgress({ ...progress, weeklyGoal: -1 })).toThrow();
    expect(() =>
      parseProgress({ ...progress, activity: ["2026-02-30"] }),
    ).toThrow();
    expect(() =>
      parseProgress({ ...progress, lessons: { "__proto__/x": {} } }),
    ).toThrow();
    expect(() => parseProgress({ ...progress, version: 2 })).toThrow();
    expect(() =>
      parseProgress({ ...progress, notes: { [id]: 123 } }),
    ).toThrow();
  });
  it("calculates streak across month boundaries, including yesterday before today is studied", () => {
    const today = new Date(2026, 10, 1, 9);
    expect(streak(["2026-10-30", "2026-10-31"], today)).toBe(2);
    expect(streak(["2026-10-30", "2026-10-31", "2026-11-01"], today)).toBe(3);
    expect(streak(["2026-10-29"], today)).toBe(0);
    expect(dayKey(today)).toBe("2026-11-01");
    const monday = new Date(weekStart(today));
    expect(monday.getDay()).toBe(1);
    expect(monday.getHours()).toBe(0);
  });
  it("suggests unfinished lessons in the selected roadmap", () => {
    const progress = emptyProgress();
    progress.roadmap = "vietnamese";
    expect(nextLesson(content.chapters, progress)?.chapterId).toBe(
      "09-common-errors",
    );
    progress.roadmap = "quick";
    for (const lesson of getRoadmap("quick").select(content.chapters))
      progress.lessons[lesson.id] = {
        status: "completed",
        scrollY: 0,
        lastViewed: new Date().toISOString(),
      };
    expect(nextLesson(content.chapters, progress)).toBeUndefined();
  });
});
