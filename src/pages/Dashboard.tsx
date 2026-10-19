import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCheck,
  Clock3,
  Flame,
  MoveUpRight,
  Route,
  Target,
} from "lucide-react";
import { useContent } from "../lib/ContentContext";
import { useProgress } from "../store/ProgressContext";
import { dayKey, streak, weekStart } from "../lib/progress";
import { lessonUrl } from "../lib/content";
import { getRoadmap, nextLesson } from "../data/roadmaps";
import { ChapterIcon } from "../components/ChapterIcon";
import { ProgressBar } from "../components/ProgressBar";
export function Dashboard() {
  const { chapters, lessons } = useContent();
  const { progress } = useProgress();
  const completed = lessons.filter(
    (l) => progress.lessons[l.id]?.status === "completed",
  ).length;
  const recent = lessons
    .filter((l) => progress.lessons[l.id])
    .sort((a, b) =>
      progress.lessons[b.id].lastViewed.localeCompare(
        progress.lessons[a.id].lastViewed,
      ),
    );
  const continuing = recent.find(
    (l) => progress.lessons[l.id].status === "in-progress",
  );
  const next = nextLesson(chapters, progress);
  const featured = continuing ?? next;
  const weekly = lessons.filter(
    (l) => (progress.lessons[l.id]?.completedAt ?? "") >= weekStart(),
  ).length;
  const countStreak = streak(progress.activity);
  const percent = Math.round((completed / Math.max(1, lessons.length)) * 100);
  const today = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const days = Array.from({ length: 7 }, (_, index) => {
    const d = new Date();
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7) + index);
    return {
      key: dayKey(d),
      label: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"][index],
    };
  });
  return (
    <main className="page dashboard">
      <div className="page-heading">
        <div>
          <div className="eyebrow">MỘT CHÚT TIẾN BỘ MỖI NGÀY</div>
          <h1>
            Chào bạn, cùng học nhé <span className="greeting-leaf">🌿</span>
          </h1>
          <p>Không cần vội. Hiểu thêm một điều cũng là tiến bộ.</p>
        </div>
        <span className="date-label">{today}</span>
      </div>
      <section className="hero-card">
        <div className="hero-copy">
          <span className="hero-kicker">
            <span className="live-dot" />
            {continuing
              ? "TIẾP TỤC HÀNH TRÌNH"
              : "BẮT ĐẦU TỪ NHỮNG ĐIỀU CƠ BẢN"}
          </span>
          <h2>
            {featured
              ? continuing
                ? "Một chút mỗi ngày,"
                : "Vững nền tảng,"
              : "Bạn đã đi thật xa,"}
            <br />
            {featured
              ? continuing
                ? "tiến xa hơn mỗi tuần."
                : "tự tin với tiếng Anh."
              : "thật đáng tự hào!"}
          </h2>
          <p>
            {featured
              ? `${continuing ? "Bạn đang học" : "Bài đầu tiên dành cho bạn"}: ${featured.shortTitle}`
              : "Bạn đã hoàn thành lộ trình. Hãy quay lại những bài đã lưu để ôn kiến thức."}
          </p>
          <div className="hero-bottom">
            {featured ? (
              <Link to={lessonUrl(featured.id)} className="button light">
                {continuing ? "Tiếp tục học" : "Bắt đầu học"}
                <ArrowRight size={17} />
              </Link>
            ) : (
              <Link to="/bookmarks" className="button light">
                Xem bài đã lưu <ArrowRight size={17} />
              </Link>
            )}
            <span>
              {featured && (
                <>
                  <Clock3 size={14} />
                  {featured.readingMinutes} phút cho một bước tiến
                </>
              )}
            </span>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="art-spark spark-one">✦</div>
          <div className="art-spark spark-two">✧</div>
          <div className="floating-label label-one">a little, every day.</div>
          <div className="book book-back" />
          <div className="book book-front">
            <div className="book-spine" />
            <span>
              ENGLISH
              <br />
              GRAMMAR
            </span>
            <div className="book-line" />
            <span className="book-symbol">
              Aa<span>↗</span>
            </span>
            <small>GROW AT YOUR OWN PACE</small>
          </div>
          <div className="floating-label label-two">
            <Check size={13} /> Hiểu hơn mỗi ngày
          </div>
        </div>
      </section>
      <section className="stats-grid" aria-label="Thống kê học tập">
        <div className="card stat">
          <span className="stat-icon sage">
            <BookOpen size={20} />
          </span>
          <div>
            <small>Tiến độ tổng thể</small>
            <strong>
              {percent}
              <span>%</span>
            </strong>
            <p>
              {completed}/{lessons.length} bài đã hoàn thành
            </p>
          </div>
          <ProgressBar value={percent} />
        </div>
        <div className="card stat">
          <span className="stat-icon amber">
            <Flame size={20} />
          </span>
          <div>
            <small>Chuỗi ngày học</small>
            <strong>
              {countStreak}
              <span> ngày</span>
            </strong>
            <p>
              {countStreak
                ? "Giữ nhịp học, bạn nhé!"
                : "Bắt đầu chuỗi ngày hôm nay"}
            </p>
          </div>
          <span className="stat-note">Mỗi ngày một chút</span>
        </div>
        <div className="card stat">
          <span className="stat-icon lavender">
            <Target size={20} />
          </span>
          <div>
            <small>Mục tiêu tuần này</small>
            <strong>
              {weekly}
              <span> / {progress.weeklyGoal} bài</span>
            </strong>
            <p>
              {weekly >= progress.weeklyGoal
                ? "Bạn đã đạt mục tiêu tuần này!"
                : `Còn ${progress.weeklyGoal - weekly} bài để chạm mục tiêu`}
            </p>
          </div>
          <ProgressBar value={(weekly / progress.weeklyGoal) * 100} />
        </div>
      </section>
      <div className="dashboard-columns">
        <div>
          <section className="learning-path">
            <div className="section-heading">
              <h2>Lộ trình của bạn</h2>
              <Link to="/roadmap">
                Xem lộ trình <ArrowRight size={14} />
              </Link>
            </div>
            <div className="card path-card">
              <div className="path-title">
                <span className="stat-icon sage">
                  <Route size={21} />
                </span>
                <div>
                  <h3>{getRoadmap(progress.roadmap).name}</h3>
                  <p>{getRoadmap(progress.roadmap).description}</p>
                </div>
                <span className="badge">
                  {getRoadmap(progress.roadmap).select(chapters).length} bài
                </span>
              </div>
              {next ? (
                <Link className="next-lesson" to={lessonUrl(next.id)}>
                  <span className="next-number">
                    {String(next.order).padStart(2, "0")}
                  </span>
                  <div>
                    <small>BÀI TIẾP THEO NÊN HỌC</small>
                    <h3>{next.shortTitle}</h3>
                    <p>
                      {chapters.find((c) => c.id === next.chapterId)?.title}{" "}
                      <span>·</span> {next.readingMinutes} phút đọc
                    </p>
                  </div>
                  <span className="round-arrow">
                    <ArrowRight size={18} />
                  </span>
                </Link>
              ) : (
                <div className="next-lesson">
                  <CheckCheck /> Bạn đã hoàn thành lộ trình này.
                </div>
              )}
            </div>
          </section>
          <section className="knowledge-section">
            <div className="section-heading">
              <h2>Khám phá kho kiến thức</h2>
              <Link to="/guide">
                {chapters.length} nhóm chủ đề <MoveUpRight size={14} />
              </Link>
            </div>
            <div className="knowledge-grid">
              {chapters.map((c) => {
                const done = c.lessons.filter(
                  (l) => progress.lessons[l.id]?.status === "completed",
                ).length;
                return (
                  <Link
                    key={c.id}
                    to={`/roadmap?chapter=${c.id}`}
                    className="card knowledge-card"
                  >
                    <div className="knowledge-top">
                      <span
                        className={`chapter-icon color-${(c.order - 1) % 4}`}
                      >
                        <ChapterIcon order={c.order} />
                      </span>
                      <span className="chapter-number">
                        {String(c.order).padStart(2, "0")}
                      </span>
                    </div>
                    <h3>{c.title}</h3>
                    <p>
                      {c.lessons.length} bài học <span>·</span> {done} đã xong
                    </p>
                    <ProgressBar
                      value={(done / c.lessons.length) * 100}
                      label={`Tiến độ ${c.title}`}
                    />
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
        <aside className="dashboard-aside">
          <section className="card habit-card">
            <div className="section-heading">
              <h3>Một thói quen tốt</h3>
              <Flame size={19} className="text-amber-600" />
            </div>
            <p>
              Ghé lại mỗi ngày.
              <br />
              Kiến thức sẽ lớn dần cùng bạn.
            </p>
            <div className="week-days">
              {days.map((d) => (
                <div key={d.key}>
                  <small>{d.label}</small>
                  <span
                    title={d.key}
                    className={`${progress.activity.includes(d.key) ? "done" : ""} ${d.key === dayKey() ? "today" : ""}`}
                  >
                    {progress.activity.includes(d.key) ? (
                      <Check size={13} />
                    ) : (
                      "·"
                    )}
                  </span>
                </div>
              ))}
            </div>
            <div className="habit-caption">
              {progress.activity.includes(dayKey())
                ? "Hôm nay bạn đã dành thời gian học 🌱"
                : "Một bài học hôm nay, một bước tiến mới."}
            </div>
          </section>
          <section className="card recent-card">
            <div className="section-heading">
              <h3>Đã xem gần đây</h3>
              <Clock3 size={16} />
            </div>
            {recent.length ? (
              recent.slice(0, 4).map((l) => (
                <Link to={lessonUrl(l.id)} key={l.id}>
                  <span className="recent-dot" />
                  <div>
                    <h4>{l.shortTitle}</h4>
                    <small>
                      {progress.lessons[l.id].status === "completed"
                        ? "Đã hoàn thành"
                        : "Tiếp tục đọc"}{" "}
                      · {l.readingMinutes} phút
                    </small>
                  </div>
                  <ArrowRight size={14} />
                </Link>
              ))
            ) : (
              <div className="empty-small">
                <BookOpen size={27} />
                <p>Những bài bạn đọc sẽ xuất hiện ở đây.</p>
                <Link to={lessons[0] ? lessonUrl(lessons[0].id) : "/guide"}>
                  Khám phá bài đầu tiên →
                </Link>
              </div>
            )}
          </section>
          <div className="quote-card">
            <span>“</span>
            <p>
              Học một ngôn ngữ mới là mở thêm một cánh cửa nhìn ra thế giới.
            </p>
            <small>CỨ TÒ MÒ, CỨ TIẾP TỤC.</small>
            <div className="quote-leaf" aria-hidden="true">
              ✳
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
