import { Link, useParams, useSearchParams } from "react-router-dom";
import { useContent } from "../lib/ContentContext";
import { MarkdownView } from "../components/MarkdownView";
import { BookmarkButton } from "../components/BookmarkButton";
import { LessonNotes } from "../components/LessonNotes";
import { Toc } from "../components/Toc";
import { lessonUrl } from "../lib/content";
import { useProgress } from "../store/ProgressContext";
import { useReadingPosition } from "../hooks/useReadingPosition";
import { Check, ChevronRight, Clock3 } from "lucide-react";
import type { Lesson as LessonType } from "../types";
export function Lesson({ document }: { document?: "guide" | "editorialLog" }) {
  const { chapter, slug } = useParams();
  const content = useContent();
  const [params] = useSearchParams();
  const lesson: LessonType | undefined = document
    ? content[document]
    : content.lessons.find((l) => l.id === `${chapter}/${slug}`);
  const section = params.get("section");
  const { progress, toggleComplete, update } = useProgress();
  useReadingPosition(lesson?.id, !document, section);
  if (!lesson)
    return (
      <div className="page">
        <h1>Không tìm thấy bài học</h1>
        <Link to="/">Về trang chủ</Link>
      </div>
    );
  const index = content.lessons.findIndex((l) => l.id === lesson.id);
  const chapterData = content.chapters.find((c) => c.id === lesson.chapterId);
  return (
    <main className="lesson-page">
      <div className="lesson-column">
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link>
          <ChevronRight size={14} />
          <Link to="/roadmap">{chapterData?.title ?? "Hướng dẫn"}</Link>
        </div>
        <div className="lesson-meta">
          <span className="badge">{lesson.level || "Tài liệu"}</span>
          <span>
            <Clock3 size={14} /> {lesson.readingMinutes} phút đọc
          </span>
        </div>
        <div className="reader-toolbar">
          <div className="font-controls" aria-label="Chỉnh cỡ chữ">
            <button
              aria-label="Giảm cỡ chữ"
              disabled={progress.fontSize <= 15}
              onClick={() =>
                update((old) => ({
                  ...old,
                  fontSize: Math.max(15, old.fontSize - 1),
                }))
              }
            >
              A−
            </button>
            <span>{progress.fontSize}</span>
            <button
              aria-label="Tăng cỡ chữ"
              disabled={progress.fontSize >= 22}
              onClick={() =>
                update((old) => ({
                  ...old,
                  fontSize: Math.min(22, old.fontSize + 1),
                }))
              }
            >
              A+
            </button>
          </div>
          {!document && (
            <BookmarkButton lessonId={lesson.id} label={lesson.shortTitle} />
          )}
        </div>
        <Toc lesson={lesson} collapsible />
        <div
          className="reading-content"
          style={{ fontSize: progress.fontSize }}
        >
          <MarkdownView lesson={lesson} />
        </div>
        {!document && <LessonNotes id={lesson.id} />}
        {!document && (
          <div className="completion-bar">
            <div>
              <h3>Thêm một bước tiến!</h3>
              <p>Đánh dấu khi bạn đã đọc và hiểu bài học này.</p>
            </div>
            <button
              className="button primary"
              onClick={() => toggleComplete(lesson.id)}
            >
              <Check size={17} />
              {progress.lessons[lesson.id]?.status === "completed"
                ? "Đã học · Bỏ đánh dấu"
                : "Đánh dấu đã học"}
            </button>
          </div>
        )}
        <div className="lesson-navigation">
          {content.lessons[index - 1] && (
            <Link
              className="card"
              to={lessonUrl(content.lessons[index - 1].id)}
            >
              <small>← Bài trước</small>
              {content.lessons[index - 1].shortTitle}
            </Link>
          )}
          {index >= 0 && content.lessons[index + 1] && (
            <Link
              className="card"
              to={lessonUrl(content.lessons[index + 1].id)}
            >
              <small>Bài sau →</small>
              {content.lessons[index + 1].shortTitle}
            </Link>
          )}
        </div>
      </div>
      <Toc lesson={lesson} />
    </main>
  );
}
