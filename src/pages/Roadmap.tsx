import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Check, Circle, CircleDot, Sparkles } from "lucide-react";
import { useContent } from "../lib/ContentContext";
import { useProgress } from "../store/ProgressContext";
import {
  getRoadmap,
  nextLesson,
  roadmaps,
  statusLabel,
} from "../data/roadmaps";
import { lessonUrl } from "../lib/content";
import { ChapterIcon } from "../components/ChapterIcon";
import { ProgressBar } from "../components/ProgressBar";
export function Roadmap() {
  const { chapters } = useContent();
  const { progress, update } = useProgress();
  const [params, setParams] = useSearchParams();
  const chapterId = params.get("chapter");
  const selected = getRoadmap(progress.roadmap);
  const next = nextLesson(chapters, progress);
  const routeLessons = (chapterId ? roadmaps[0] : selected).select(chapters);
  const chapterIds = [...new Set(routeLessons.map((l) => l.chapterId))];
  useEffect(() => {
    if (chapterId)
      requestAnimationFrame(() =>
        document.getElementById(chapterId)?.scrollIntoView({ block: "start" }),
      );
  }, [chapterId]);
  return (
    <main className="page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">TỪ NỀN TẢNG ĐẾN TỰ TIN</div>
          <h1>Lộ trình học tập</h1>
          <p>Một hành trình rõ ràng, theo nhịp của riêng bạn.</p>
        </div>
      </div>
      <div className="roadmap-options" role="group" aria-label="Chọn lộ trình">
        {roadmaps.map((r) => (
          <button
            key={r.id}
            aria-pressed={selected.id === r.id}
            className={`card ${selected.id === r.id ? "selected" : ""}`}
            onClick={() => {
              update((old) => ({ ...old, roadmap: r.id }));
              setParams({});
            }}
          >
            <strong>{r.name}</strong>
            <p>{r.description}</p>
          </button>
        ))}
      </div>
      {next && (
        <Link to={lessonUrl(next.id)} className="roadmap-suggestion">
          <span className="stat-icon sage">
            <Sparkles size={22} />
          </span>
          <div>
            <small>BÀI TIẾP THEO NÊN HỌC</small>
            <h2>{next.shortTitle}</h2>
            <p>
              {next.readingMinutes} phút đọc · {next.level}
            </p>
          </div>
          <ArrowRight size={22} />
        </Link>
      )}
      {chapterId && (
        <p className="muted text-sm mb-6">
          Đang xem toàn bộ kho kiến thức.{" "}
          <Link className="text-link" to="/roadmap">
            Quay lại lộ trình đã chọn
          </Link>
        </p>
      )}
      <div className="roadmap-stages">
        {chapterIds.map((id, index) => {
          const chapter = chapters.find((c) => c.id === id)!;
          const lessons = routeLessons.filter((l) => l.chapterId === id);
          const done = lessons.filter(
            (l) => progress.lessons[l.id]?.status === "completed",
          ).length;
          return (
            <section key={id} id={id} className="roadmap-stage">
              <div className="stage-number">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="card stage-card">
                <div className="stage-heading">
                  <span className="stat-icon sage">
                    <ChapterIcon order={chapter.order} />
                  </span>
                  <div>
                    <small>CHẶNG {index + 1}</small>
                    <h2>{chapter.title}</h2>
                  </div>
                  <span className="muted">
                    {done}/{lessons.length} bài ·{" "}
                    {Math.round((done / lessons.length) * 100)}%
                  </span>
                </div>
                <ProgressBar value={(done / lessons.length) * 100} />
                <div className="stage-lessons">
                  {lessons.map((l) => {
                    const status = progress.lessons[l.id]?.status;
                    return (
                      <Link
                        to={lessonUrl(l.id)}
                        key={l.id}
                        className={status === "completed" ? "completed" : ""}
                      >
                        {status === "completed" ? (
                          <Check size={17} />
                        ) : status === "in-progress" ? (
                          <CircleDot size={17} />
                        ) : (
                          <Circle size={17} />
                        )}
                        <span>
                          {l.shortTitle}
                          <small>
                            {l.level} · {l.readingMinutes} phút đọc
                          </small>
                        </span>
                        <span className={`status ${status ?? ""}`}>
                          {statusLabel(status)}
                        </span>
                        <ArrowRight size={15} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
