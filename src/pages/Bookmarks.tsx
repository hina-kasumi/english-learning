import { Link } from "react-router-dom";
import { Bookmark, ArrowRight, FileText, Trash2 } from "lucide-react";
import { useContent } from "../lib/ContentContext";
import { useProgress } from "../store/ProgressContext";
import { lessonUrl } from "../lib/content";
export function Bookmarks() {
  const { lessons } = useContent();
  const { progress, toggleBookmark } = useProgress();
  const bookmarks = progress.bookmarks.slice().reverse();
  const notes = lessons.filter((l) => progress.notes[l.id]?.trim());
  return (
    <main className="page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">GÓC NHỎ CỦA RIÊNG BẠN</div>
          <h1>Đã lưu & ghi chú</h1>
          <p>Những điều đáng nhớ, luôn ở đây khi bạn cần.</p>
        </div>
        <span className="badge">{bookmarks.length} mục đã lưu</span>
      </div>
      <section>
        <div className="section-heading">
          <h2>Bài học và mục đã lưu</h2>
        </div>
        {bookmarks.length ? (
          <div className="saved-list">
            {bookmarks.map((b) => {
              const lesson = lessons.find((l) => l.id === b.lessonId);
              return (
                <div
                  className="card saved-item"
                  key={`${b.lessonId}#${b.headingId ?? ""}`}
                >
                  <span className="stat-icon sage">
                    <Bookmark size={20} />
                  </span>
                  <div>
                    {lesson ? (
                      <Link to={lessonUrl(b.lessonId, b.headingId)}>
                        <h3>{b.label}</h3>
                        <p>
                          {b.headingId
                            ? lesson.shortTitle
                            : `${lesson.level} · ${lesson.readingMinutes} phút đọc`}
                        </p>
                      </Link>
                    ) : (
                      <>
                        <h3>{b.label}</h3>
                        <p>Bài này không còn trong kho kiến thức.</p>
                      </>
                    )}
                  </div>
                  <button
                    className="icon-button"
                    onClick={() => toggleBookmark(b)}
                    aria-label={`Bỏ lưu ${b.label}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card empty-state">
            <Bookmark size={35} />
            <h3>Giữ lại những điều hữu ích</h3>
            <p>
              Nhấn “Lưu bài” hoặc biểu tượng lưu bên cạnh tiêu đề mục trong bài
              học.
            </p>
            <Link to="/roadmap" className="button primary">
              Khám phá bài học <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </section>
      <section className="notes-list">
        <div className="section-heading">
          <h2>Ghi chú cá nhân</h2>
          <span className="muted text-xs">{notes.length} bài có ghi chú</span>
        </div>
        {notes.length ? (
          notes.map((l) => (
            <Link
              className="card note-preview"
              to={lessonUrl(l.id, "ghi-chu-ca-nhan")}
              key={l.id}
            >
              <h3>
                <FileText size={17} />
                {l.shortTitle}
                <ArrowRight size={16} />
              </h3>
              <p>{progress.notes[l.id]}</p>
            </Link>
          ))
        ) : (
          <p className="muted text-sm">
            Ghi chú ở cuối mỗi bài học sẽ được tập hợp tại đây.
          </p>
        )}
      </section>
    </main>
  );
}
