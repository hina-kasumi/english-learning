import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCheck,
  Clock3,
  Flame,
  Leaf,
  Target,
  Sparkles,
  Sprout,
  ChevronRight,
} from 'lucide-react'
import { PageHeading } from '../../app/Layout'
import { lessonIndex } from '../../lib/content'
import { useLearning, lessonStatus, currentStreak, localDay } from './store'
import copy from '../../../content/interface.json'
function BookGarden() {
  return (
    <svg className="book-garden" viewBox="0 0 350 245" aria-hidden="true">
      <circle cx="185" cy="118" r="99" fill="#e5ebdc" />
      <circle cx="273" cy="54" r="5" fill="#b3c1a0" />
      <path d="M61 72h12M67 66v12M276 151h14M283 144v14" stroke="#a3b893" strokeWidth="2" />
      <path d="M115 187l137 6 27 16-136 3-48-17z" fill="#c1cdb5" />
      <rect
        x="103"
        y="168"
        width="151"
        height="29"
        rx="5"
        fill="#9cae8c"
        transform="rotate(-6 103 168)"
      />
      <path d="M114 173l133-14v18l-133 14z" fill="#faf9ee" />
      <path d="M123 159l124 8 7 19-126-6z" fill="#e7e9d8" />
      <rect
        x="114"
        y="139"
        width="145"
        height="28"
        rx="5"
        fill="#d3b987"
        transform="rotate(5 114 139)"
      />
      <path d="M122 145l131 12v13l-131-12z" fill="#fffbef" />
      <path d="M112 127q32-15 71 5v49q-34-17-71-6z" fill="#fffdf3" />
      <path d="M183 132q34-24 71-15v51q-42-1-71 13z" fill="#f3f2e1" />
      <path
        d="M183 132v49M122 139q24-8 49 3m-49 5q24-8 49 3m-49 5q24-8 49 3m24-17q24-12 48-11m-48 20q24-12 48-11m-48 20q24-12 48-11"
        stroke="#d5dcc8"
        fill="none"
        strokeWidth="2"
      />
      <path d="M184 134C183 101 190 87 190 61" stroke="#55754d" strokeWidth="3" fill="none" />
      <path d="M187 107C154 111 141 94 143 77c24-3 43 12 44 30z" fill="#8ba47a" />
      <path d="M188 90c-6-28 10-46 31-48 7 24-8 43-31 48z" fill="#486a43" />
      <path d="M190 123c8-29 28-37 47-31-2 21-24 36-47 31z" fill="#6f8e61" />
      <path
        d="M157 88l28 20m5-20l20-32m-19 66l33-22"
        stroke="#d3ddc5"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M79 152l6-9 6 9-6 9z" fill="#c5ad77" />
      <circle cx="262" cy="99" r="3" fill="#a7b699" />
    </svg>
  )
}
export default function Dashboard() {
  const data = useLearning()
  const today = localDay(new Date())
  const todayAnswers = data.attempts
    .filter((a) => localDay(new Date(a.at)) === today)
    .reduce((n, a) => n + a.responses.length, 0)
  const allAnswers = data.attempts.flatMap((a) => a.responses)
  const completed = lessonIndex.filter((l) =>
    ['completed', 'mastered'].includes(lessonStatus(l, data)),
  ).length
  const active = lessonIndex.find((l) => l.id === data.lastLesson) ?? lessonIndex[0]
  const goalPercent = Math.min(100, Math.round((todayAnswers / data.settings.dailyGoal) * 100))
  const week = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    const day = (date.getDay() + 6) % 7
    date.setDate(date.getDate() - day + i)
    return {
      date,
      done: data.attempts.some((a) => localDay(new Date(a.at)) === localDay(date)),
      today: localDay(date) === today,
    }
  })
  return (
    <>
      <PageHeading
        title="Chào bạn, cùng học nhé!"
        description="Một chút tập trung hôm nay, một bước tự tin ngày mai."
        action={
          <span className="date-label">
            {new Intl.DateTimeFormat('vi-VN', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            }).format(new Date())}
          </span>
        }
      />
      <section className="welcome-banner">
        <div>
          <div className="eyebrow">
            <span className="tiny-line" /> HÀNH TRÌNH CỦA RIÊNG BẠN
          </div>
          <h2>
            Vững ngữ pháp.
            <br />
            <span>Tự tin mở lời.</span>
          </h2>
          <p>
            Không cần giỏi ngay từ đầu. Cùng xây nền tảng tiếng Anh
            <br className="desktop-break" /> thật vững, từ những điều đơn giản nhất.
          </p>
          <Link className="button" to={`/lesson/${active.id}`}>
            {data.readLessons.length ? 'Tiếp tục hành trình' : 'Bắt đầu học ngay'}
            <ArrowRight size={17} />
          </Link>
          <span className="hero-small">
            <Check size={14} />
            Theo nhịp độ của bạn · Không áp lực
          </span>
        </div>
        <BookGarden />
      </section>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon peach">
            <Flame size={22} />
          </span>
          <div>
            <span>Chuỗi ngày học</span>
            <strong>
              {currentStreak(data.attempts)} <small>ngày</small>
            </strong>
          </div>
          <span className="stat-mini">Đều đặn là đủ</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon sage">
            <BookOpen size={21} />
          </span>
          <div>
            <span>Bài đã hoàn thành</span>
            <strong>
              {completed} <small>/ {lessonIndex.length} bài</small>
            </strong>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon lavender">
            <CheckCheck size={22} />
          </span>
          <div>
            <span>Câu đã luyện tập</span>
            <strong>
              {allAnswers.length} <small>câu</small>
            </strong>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon sand">
            <Clock3 size={21} />
          </span>
          <div>
            <span>Thời gian luyện tập</span>
            <strong>
              {Math.round(data.attempts.reduce((n, a) => n + a.seconds, 0) / 60)}{' '}
              <small>phút</small>
            </strong>
          </div>
        </div>
      </div>
      <div className="dashboard-columns">
        <div className="dashboard-primary">
          <section>
            <div className="section-heading">
              <h2>{data.readLessons.length ? 'Tiếp tục học' : 'Bài học dành cho bạn'}</h2>
              <Link to="/roadmap">
                Xem lộ trình <ArrowRight size={15} />
              </Link>
            </div>
            <Link to={`/lesson/${active.id}`} className="continue-card">
              <div className="lesson-cover">
                <span>
                  Aa<span className="cover-dot">.</span>
                </span>
                <span className="cover-caption">THE FOUNDATION</span>
                <span className="cover-line" />
              </div>
              <div className="continue-content">
                <div className="inline-tags">
                  <span className="pill">
                    {active.level} · {active.level === 'L0' ? 'Nền tảng' : 'Tiền trung cấp'}
                  </span>
                  <span className="subtle">Bài {active.order.toString().padStart(2, '0')}</span>
                </div>
                <h3>{active.title}</h3>
                <p>{active.summary}</p>
                <div className="lesson-meta">
                  <span>
                    <Clock3 size={14} />
                    {active.estimatedMinutes} phút
                  </span>
                  <span>
                    <BookOpen size={14} />
                    {active.rules.length} điểm kiến thức
                  </span>
                </div>
                <div className="continue-bottom">
                  <span>{copy.statusLabels[lessonStatus(active, data)]}</span>
                  <span className="round-arrow">
                    <ArrowRight size={18} />
                  </span>
                </div>
              </div>
            </Link>
          </section>
          <section className="journey-section">
            <div className="section-heading">
              <h2>Từng bước, tiến xa hơn</h2>
              <span className="subtle">Lộ trình từ L0 đến C1</span>
            </div>
            <div className="level-strip">
              {['L0', 'A1', 'A2', 'B1', 'B2', 'C1'].map((level, i) => (
                <Link
                  to={`/roadmap?level=${level}`}
                  className={`level-step ${i === 0 ? 'current' : ''}`}
                  key={level}
                >
                  <span>{level}</span>
                  <small>
                    {
                      [
                        'Nền tảng',
                        'Sơ cấp',
                        'Tiền trung cấp',
                        'Trung cấp',
                        'Trung cao cấp',
                        'Thành thạo',
                      ][i]
                    }
                  </small>
                </Link>
              ))}
            </div>
            <div className="soft-note">
              <Leaf size={17} />
              <span>Các bài đã mở có thể học ngay. Chủ đề mới sẽ được bổ sung theo lộ trình.</span>
            </div>
          </section>
          <section>
            <div className="section-heading">
              <h2>Học theo cách của bạn</h2>
            </div>
            <div className="quick-grid">
              <Link className="quick-card" to="/knowledge">
                <span className="quick-icon sage">
                  <BookOpen size={21} />
                </span>
                <h3>Thư viện bài học</h3>
                <p>Bài học theo chủ đề với giải thích, ví dụ song ngữ và tự luyện có lời giải.</p>
                <span>
                  Khám phá kho kiến thức <ArrowUpRight size={15} />
                </span>
              </Link>
              <Link className="quick-card" to="/practice">
                <span className="quick-icon peach">
                  <Target size={21} />
                </span>
                <h3>Luyện để nhớ lâu</h3>
                <p>Thử sức, hiểu lỗi sai và tiến bộ qua từng câu.</p>
                <span>
                  Chọn bài luyện tập <ArrowUpRight size={15} />
                </span>
              </Link>
            </div>
          </section>
        </div>
        <aside className="dashboard-secondary">
          <section className="goal-card">
            <div className="section-heading">
              <h2>Mục tiêu hôm nay</h2>
              <Target size={19} />
            </div>
            <div
              className="goal-ring"
              style={{ background: `conic-gradient(var(--green) ${goalPercent}%, var(--line) 0)` }}
            >
              <div>
                <strong>
                  {todayAnswers}
                  <span>/{data.settings.dailyGoal}</span>
                </strong>
                <small>câu đã luyện</small>
              </div>
            </div>
            <p>
              {goalPercent === 100
                ? 'Bạn đã đạt mục tiêu hôm nay!'
                : 'Dành một khoảng nhỏ cho bản thân.'}
            </p>
            <div className="week-days">
              {week.map(({ date, done, today: isToday }, i) => (
                <div key={i}>
                  <span>{['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'][i]}</span>
                  <span
                    className={`day-dot ${done ? 'done' : ''} ${isToday ? 'today' : ''}`}
                    aria-label={`${date.toLocaleDateString('vi-VN')}: ${done ? 'đã học' : 'chưa học'}`}
                  >
                    {done ? <Check size={14} /> : isToday ? <span /> : '·'}
                  </span>
                </div>
              ))}
            </div>
            <Link to="/settings" className="goal-edit">
              Điều chỉnh mục tiêu <ChevronRight size={14} />
            </Link>
          </section>
          <section className="tip-card">
            <div className="tip-title">
              <Sparkles size={18} />
              {copy.dailyTip.title}
            </div>
            <blockquote>“{copy.dailyTip.english}”</blockquote>
            <p>{copy.dailyTip.translation}</p>
            <div className="tip-rule">{copy.dailyTip.explanation}</div>
            <Link to={copy.dailyTip.link}>
              Khám phá cách dùng <ArrowRight size={15} />
            </Link>
          </section>
          <div className="gentle-note">
            <span className="little-leaf">
              <Sprout size={22} />
            </span>
            <p>
              Bạn không cần học tất cả hôm nay.
              <br />
              Chỉ cần quay lại vào ngày mai.
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}
