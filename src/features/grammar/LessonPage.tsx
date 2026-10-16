import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronLeft,
  Clock3,
  Eye,
  EyeOff,
  List,
  Printer,
} from 'lucide-react'
import { loadLesson, loadExercises, lessonIndex } from '../../lib/content'
import { useAsync } from '../../lib/useAsync'
import { useLearning } from '../progress/store'
import { Loading } from '../../app/Layout'
import Markdown from '../../components/Markdown'
import ReadProgress from '../../components/ReadProgress'
export default function LessonPage() {
  const { id = '' } = useParams()
  const [params] = useSearchParams()
  const [tocOpen, setTocOpen] = useState(false)
  const { data, error } = useAsync(async () => {
    const lesson = await loadLesson(id)
    const exercises = lesson.practiceMode === 'graded' ? await loadExercises(id) : null
    return { lesson, exercises }
  }, id)
  const state = useLearning()
  const visit = state.visitLesson
  const rule = params.get('rule')
  useEffect(() => {
    if (data) visit(id)
  }, [id, data, visit])
  useEffect(() => {
    if (data && rule)
      requestAnimationFrame(() =>
        document.getElementById(rule)?.scrollIntoView({ behavior: 'auto', block: 'start' }),
      )
  }, [data, rule])
  if (!data) return <Loading error={error} />
  const { lesson, exercises } = data
  const missing = lesson.prerequisites.filter((p) => !state.readLessons.includes(p))
  if (state.settings.sequential && missing.length)
    return (
      <div className="empty-state">
        <List size={30} />
        <h1>Học vững từng bước</h1>
        <p>Bạn đang bật học tuần tự. Hãy đọc bài tiền đề trước.</p>
        {missing.map((p) => (
          <Link key={p} className="button" to={`/lesson/${p}`}>
            {lessonIndex.find((l) => l.id === p)?.title}
            <ArrowRight size={17} />
          </Link>
        ))}
        <Link to="/settings">Đổi chế độ trong Cài đặt</Link>
      </div>
    )
  return (
    <>
      <Link className="back-link" to="/roadmap">
        <ChevronLeft size={16} />
        Lộ trình học
      </Link>
      <div className="lesson-page-heading">
        <div className="inline-tags">
          <span className="pill">{lesson.level} · Ngữ pháp</span>
          <span className="muted">{lesson.titleEn}</span>
        </div>
        <h1>{lesson.title}</h1>
        <p>{lesson.summary}</p>
        <div className="lesson-toolbar">
          <span>
            <Clock3 size={15} />
            {lesson.estimatedMinutes} phút · {lesson.rules.length} điểm kiến thức
          </span>
          <div>
            <button
              className={`icon-button ${state.bookmarks.includes(id) ? 'selected' : ''}`}
              aria-label="Đánh dấu bài học"
              aria-pressed={state.bookmarks.includes(id)}
              onClick={() => state.toggleBookmark(id)}
            >
              <Bookmark size={18} />
            </button>
            <button
              className="text-button"
              onClick={() => state.setSettings({ translations: !state.settings.translations })}
            >
              {state.settings.translations ? <Eye size={17} /> : <EyeOff size={17} />}Bản dịch
            </button>
            <button className="icon-button" aria-label="In bài học" onClick={() => window.print()}>
              <Printer size={18} />
            </button>
            <button
              className="icon-button toc-toggle"
              aria-label="Mở mục lục"
              aria-expanded={tocOpen}
              onClick={() => setTocOpen(!tocOpen)}
            >
              <List size={19} />
            </button>
          </div>
        </div>
      </div>
      {missing.length > 0 && (
        <div className="notice">
          <p>
            Nên học trước:{' '}
            {missing.map((p) => (
              <Link key={p} to={`/lesson/${p}`}>
                {lessonIndex.find((l) => l.id === p)?.title}
              </Link>
            ))}
            . Bạn vẫn có thể tiếp tục bài này.
          </p>
        </div>
      )}
      <div className="lesson-layout">
        <article className="lesson-article">
          <ReadProgress lessonId={id} />
          <Markdown content={lesson.body} />
          <section className="personal-note">
            <label htmlFor="lesson-note">Ghi chú của bạn</label>
            <textarea
              id="lesson-note"
              value={state.notes[id] ?? ''}
              onChange={(e) => state.saveNote(id, e.target.value)}
              placeholder="Ghi lại cách hiểu hoặc ví dụ của riêng bạn…"
            />
            <small>Tự động lưu trên thiết bị này.</small>
          </section>
          <div className="lesson-finish">
            <button className="button secondary" onClick={() => state.markRead(id)}>
              {state.readLessons.includes(id) ? <Check size={17} /> : null}
              {state.readLessons.includes(id) ? 'Đã đọc xong bài' : 'Tôi đã đọc xong'}
            </button>
            {exercises && (
              <Link className="button" to={`/practice/${id}/${exercises.sets[0].id}`}>
                Luyện tập ngay
                <ArrowRight size={17} />
              </Link>
            )}
          </div>
          {exercises ? (
            <div className="exercise-set-list">
              <h2>Các bộ luyện tập</h2>
              {exercises.sets.map((set) => (
                <Link to={`/practice/${id}/${set.id}`} key={set.id}>
                  <div>
                    <strong>{set.title}</strong>
                    <span>
                      {set.questions.length} câu · {set.kind === 'mixed' ? 'Tổng hợp' : 'Luyện tập'}
                    </span>
                  </div>
                  <ArrowRight size={18} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="soft-note">
              Bài này có câu tự luyện và lời giải trong từng phần. Hãy tự trả lời trước khi mở lời
              giải. Phần tự luyện chưa chấm điểm và chưa tạo lịch ôn tự động.
            </p>
          )}
        </article>
        <aside className={`lesson-toc ${tocOpen ? 'open' : ''}`}>
          <div className="toc-inner">
            <div className="eyebrow">TRONG BÀI HỌC NÀY</div>
            {lesson.rules.map((r, i) => (
              <Link
                className={rule === r.id ? 'active' : ''}
                to={`/lesson/${id}?rule=${r.id}`}
                key={r.id}
                onClick={() => setTocOpen(false)}
              >
                <span>{String(i + 1).padStart(2, '0')}</span>
                {r.label}
              </Link>
            ))}
            <div className="toc-foot">
              <BookNote />
              <p>
                Hiểu một quy tắc.
                <br />
                Tự tin thêm một chút.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
function BookNote() {
  return <span className="book-note-icon">Aa.</span>
}
