import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArrowUpRight, Bookmark, ChevronLeft, Search, BookOpen } from 'lucide-react'
import Fuse from 'fuse.js'
import entries from '../../generated/search.json'
import chapters from '../../generated/categories.json'
import { PageHeading, Loading } from '../../app/Layout'
import { fold } from '../../lib/parse'
import { loadCheatsheet, lessonIndex } from '../../lib/content'
import { useAsync } from '../../lib/useAsync'
import { useLearning } from '../progress/store'
import Markdown from '../../components/Markdown'
import SearchInput from '../../components/SearchInput'
export function CheatsheetPage() {
  const { id = '' } = useParams()
  const { data, error } = useAsync(() => loadCheatsheet(id), id)
  return (
    <>
      <Link to="/knowledge" className="back-link">
        <ChevronLeft size={16} />
        Thư viện bài học
      </Link>
      {data ? (
        <article className="lesson-article standalone">
          <Markdown content={data} />
          <button className="button secondary" onClick={() => window.print()}>
            In bảng tóm tắt
          </button>
        </article>
      ) : (
        <Loading error={error} />
      )}
    </>
  )
}
export default function KnowledgePage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const level = params.get('level') ?? 'all'
  const category = params.get('category') ?? 'all'
  const [savedOnly, setSavedOnly] = useState(false)
  const [page, setPage] = useState({ key: '', count: 24 })
  const filterKey = [query, level, category, savedOnly].join('|')
  const limit = page.key === filterKey ? page.count : 24
  const bookmarks = useLearning((s) => s.bookmarks)
  const toggle = useLearning((s) => s.toggleBookmark)
  const updateFilter = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (!value || value === 'all') next.delete(key)
    else next.set(key, value)
    setParams(next)
  }
  const savedAliases = (entry: (typeof entries)[number]) =>
    bookmarks.filter((id) => {
      if (id === entry.id) return true
      if (!id.startsWith('reference:')) return false
      const code = id.slice('reference:'.length)
      const lesson = lessonIndex.find(
        (l) =>
          l.practiceMode === 'self-check' &&
          l.rules.some((r) => r.appendixCodes?.some((c) => c === code || c[0] === code)),
      )
      if (!lesson) return false
      const rule = lesson.rules.find((r) => r.appendixCodes?.includes(code))
      return entry.id === (rule?.id ?? lesson.id)
    })
  const index = useMemo(
    () =>
      new Fuse(
        entries.map((e) => ({ ...e, search: fold(e.title + ' ' + e.summary + ' ' + e.text) })),
        { keys: ['search'], threshold: 0.3, ignoreLocation: true },
      ),
    [],
  )
  const matches = query.trim() ? index.search(fold(query)).map((r) => r.item) : entries
  const filtered = matches.filter(
    (e) =>
      (level === 'all' || e.level === level) &&
      (category === 'all' || e.category === category) &&
      (query.trim() || savedOnly || e.kind === 'Bài học') &&
      (!savedOnly || savedAliases(e).length > 0),
  )
  return (
    <>
      <PageHeading
        eyebrow="HỌC TỪNG BƯỚC · HIỂU VÀ VẬN DỤNG"
        title="Thư viện bài học"
        description={`${lessonIndex.length} bài học từ L0 đến C1. Đọc giải thích, phân tích ví dụ, tự luyện và xem lời giải ngay trong bài.`}
      />
      <div className="knowledge-search">
        <Search size={23} />
        <SearchInput
          aria-label="Tìm kiếm bài học"
          placeholder="Tìm bài học hoặc cấu trúc, thử “phu dinh”, “to be”…"
          value={query}
          onValueChange={(value) => updateFilter('q', value)}
        />
      </div>
      <div className="filter-row">
        <label>
          Cấp độ
          <select
            aria-label="Cấp độ"
            value={level}
            onChange={(e) => updateFilter('level', e.target.value)}
          >
            <option value="all">Tất cả cấp độ</option>
            {['L0', 'A1', 'A2', 'B1', 'B2', 'C1'].map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </label>
        <label>
          Nhóm ngữ pháp
          <select
            aria-label="Nhóm ngữ pháp"
            value={category}
            onChange={(e) => updateFilter('category', e.target.value)}
          >
            <option value="all">Tất cả nhóm</option>
            {chapters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </label>
        <button
          className={`button secondary ${savedOnly ? 'selected' : ''}`}
          aria-pressed={savedOnly}
          onClick={() => setSavedOnly(!savedOnly)}
        >
          <Bookmark size={16} />
          Đã đánh dấu
        </button>
        <span className="muted" aria-live="polite">
          {filtered.length} kết quả
        </span>
      </div>
      {filtered.length ? (
        <div className="knowledge-grid">
          {filtered.slice(0, limit).map((entry) => {
            const saved = savedAliases(entry)
            const lesson = lessonIndex.find((l) => l.id === entry.id)
            return (
              <article className="knowledge-card" key={entry.id}>
                <div className="inline-tags">
                  <span className="pill neutral">{entry.kind}</span>
                  <button
                    className={`icon-button ${saved.length ? 'selected' : ''}`}
                    aria-label={`Đánh dấu ${entry.title}`}
                    aria-pressed={saved.length > 0}
                    onClick={() => (saved.length ? saved.forEach(toggle) : toggle(entry.id))}
                  >
                    <Bookmark size={17} />
                  </button>
                </div>
                <Link to={entry.path}>
                  <h2>{entry.title}</h2>
                  <p>{entry.summary}</p>
                  <span>
                    {entry.level}
                    {lesson
                      ? ` · ${lesson.practiceMode === 'self-check' ? 'Tự luyện có lời giải' : 'Bài tập chấm điểm'}`
                      : ''}
                    <ArrowUpRight size={17} />
                  </span>
                </Link>
              </article>
            )
          })}
        </div>
      ) : (
        <div className="empty-state">
          <BookOpen size={30} />
          <h2>Chưa tìm thấy bài học phù hợp</h2>
          <p>Thử từ ngắn hơn hoặc thay đổi bộ lọc. Bạn có thể tìm bằng tiếng Việt không dấu.</p>
        </div>
      )}
      {filtered.length > limit && (
        <button
          className="button secondary reference-more"
          onClick={() => setPage({ key: filterKey, count: limit + 24 })}
        >
          Xem thêm ({filtered.length - limit} mục)
        </button>
      )}
      <div className="soft-note">
        Mỗi bài có mục tiêu, cách dùng, ví dụ song ngữ và phần luyện tập. Bài tự luyện có lời giải
        để đối chiếu; bài tập chấm điểm được mở riêng trong Góc luyện tập.
      </div>
    </>
  )
}
