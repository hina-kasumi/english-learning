import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  BookOpen,
  LayoutDashboard,
  Route,
  Bookmark,
  Settings,
  ChevronDown,
  ArrowUpRight,
  X,
} from "lucide-react";
import { useContent } from "../lib/ContentContext";
import { lessonUrl } from "../lib/content";
import { ChapterIcon } from "./ChapterIcon";
import { ProgressBar } from "./ProgressBar";
import { useProgress } from "../store/ProgressContext";
export function Sidebar({ onClose }: { onClose: () => void }) {
  const { chapters, lessons } = useContent();
  const location = useLocation();
  const { progress } = useProgress();
  const doneCount = lessons.filter(
    (l) => progress.lessons[l.id]?.status === "completed",
  ).length;
  const [expanded, setExpanded] = useState<string[]>(() =>
    chapters.filter((c) => location.pathname.includes(c.id)).map((c) => c.id),
  );
  useEffect(() => {
    const active = chapters.find((c) => location.pathname.includes(c.id));
    if (active)
      setExpanded((old) =>
        old.includes(active.id) ? old : [...old, active.id],
      );
  }, [location.pathname, chapters]);
  return (
    <>
      <div className="sidebar-brand">
        <Link to="/" className="brand" onClick={onClose}>
          <span className="brand-icon">
            <BookOpen size={23} />
          </span>
          <span>
            Góc Ngữ Pháp<small>TIẾNG ANH, TỪNG CHÚT MỘT</small>
          </span>
        </Link>
        <button
          className="icon-button mobile-only"
          aria-label="Đóng điều hướng"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
      <nav className="primary-nav" aria-label="Điều hướng chính">
        <NavLink to="/" end onClick={onClose}>
          <LayoutDashboard size={19} /> Tổng quan
        </NavLink>
        <NavLink to="/roadmap" onClick={onClose}>
          <Route size={19} /> Lộ trình học
        </NavLink>
        <NavLink to="/bookmarks" onClick={onClose}>
          <Bookmark size={19} /> Đã lưu
        </NavLink>
      </nav>
      <div className="sidebar-library">
        <div className="sidebar-heading">
          <span>KHO KIẾN THỨC</span>
          <span>{lessons.length} bài</span>
        </div>
        <nav aria-label="Các nhóm kiến thức">
          {chapters.map((chapter) => {
            const open = expanded.includes(chapter.id);
            const percent = Math.round(
              (chapter.lessons.filter(
                (l) => progress.lessons[l.id]?.status === "completed",
              ).length /
                chapter.lessons.length) *
                100,
            );
            return (
              <div key={chapter.id} className="chapter-tree">
                <button
                  aria-expanded={open}
                  onClick={() =>
                    setExpanded((old) =>
                      old.includes(chapter.id)
                        ? old.filter((id) => id !== chapter.id)
                        : [...old, chapter.id],
                    )
                  }
                  className="chapter-toggle"
                >
                  <ChapterIcon order={chapter.order} size={18} />
                  <span>
                    {chapter.title}
                    <small>
                      {chapter.lessons.length} bài · {percent}% hoàn thành
                    </small>
                  </span>
                  <ChevronDown size={14} className={open ? "rotate-180" : ""} />
                </button>
                {open && (
                  <div className="chapter-children">
                    {chapter.lessons.map((l) => (
                      <NavLink
                        key={l.id}
                        to={lessonUrl(l.id)}
                        onClick={onClose}
                      >
                        <span
                          className={`lesson-dot ${progress.lessons[l.id]?.status === "completed" ? "done" : ""}`}
                        />
                        {l.shortTitle}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
      <div className="sidebar-bottom">
        <div className="sidebar-goal">
          <span>Chậm mà chắc 🌱</span>
          <p>
            {doneCount}/{lessons.length} bài học đã hoàn thành.
          </p>
          <ProgressBar
            value={(doneCount / Math.max(1, lessons.length)) * 100}
          />
        </div>
        <NavLink to="/settings" onClick={onClose}>
          <Settings size={18} /> Cài đặt
        </NavLink>
        <Link to="/guide" onClick={onClose}>
          Hướng dẫn học <ArrowUpRight size={15} />
        </Link>
      </div>
    </>
  );
}
