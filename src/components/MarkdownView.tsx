import { memo } from "react";
import { BookmarkButton } from "./BookmarkButton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Link } from "react-router-dom";
import { resolveMarkdownLink } from "../lib/content";
import type { Lesson } from "../types";
export const MarkdownView = memo(function MarkdownView({
  lesson,
}: {
  lesson: Lesson;
}) {
  return (
    <div className="markdown prose prose-slate dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ]}
        components={{
          a({ href = "", children }) {
            const route = resolveMarkdownLink(href, lesson.path);
            return route ? (
              <Link to={route}>{children}</Link>
            ) : (
              <a href={href} target="_blank" rel="noreferrer">
                {children}
              </a>
            );
          },
          table({ children }) {
            return (
              <div
                className="table-scroll"
                tabIndex={0}
                role="region"
                aria-label="Bảng kiến thức có thể cuộn ngang"
              >
                <table>{children}</table>
              </div>
            );
          },
          th({ children, node }) {
            const text =
              node?.children
                .filter((c) => c.type === "text")
                .map((c) => c.value)
                .join("") ?? "";
            return (
              <th
                data-tone={
                  text.includes("❌")
                    ? "wrong"
                    : text.includes("✅")
                      ? "right"
                      : undefined
                }
              >
                {children}
              </th>
            );
          },
          blockquote({ children }) {
            return <blockquote className="callout">{children}</blockquote>;
          },
          h2({ children, id }) {
            return (
              <h2 id={id}>
                {children}
                {lesson.chapterId && id && (
                  <BookmarkButton
                    compact
                    lessonId={lesson.id}
                    headingId={id}
                    label={lesson.headings.find((h) => h.id === id)?.text ?? id}
                  />
                )}
              </h2>
            );
          },
          h3({ children, id }) {
            return (
              <h3 id={id}>
                {children}
                {lesson.chapterId && id && (
                  <BookmarkButton
                    compact
                    lessonId={lesson.id}
                    headingId={id}
                    label={lesson.headings.find((h) => h.id === id)?.text ?? id}
                  />
                )}
              </h3>
            );
          },
          h1({ children, id }) {
            return <h1 id={id}>{children}</h1>;
          },
        }}
      >
        {lesson.markdown}
      </ReactMarkdown>
    </div>
  );
});
