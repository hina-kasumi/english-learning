import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArrowUpRight, Bookmark, ChevronLeft, Search, BookOpen } from 'lucide-react'
import Fuse from 'fuse.js'
import entries from '../../generated/search.json'
import chapters from '../../generated/references.json'
import { PageHeading, Loading } from '../../app/Layout'
import { fold } from '../../lib/parse'
import { loadCheatsheet } from '../../lib/content'
import { useAsync } from '../../lib/useAsync'
import { useLearning } from '../progress/store'
import Markdown from '../../components/Markdown'
export function CheatsheetPage() {
  const { id = '' } = useParams()
  const { data, error } = useAsync(() => loadCheatsheet(id), id)
  return (
    <>
      <Link to="/knowledge" className="back-link">
        <ChevronLeft size={16} />
        Kho kiến thức
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
  const [level, setLevel] = useState('all')
  const [kind, setKind] = useState('all')
  const [savedOnly, setSavedOnly] = useState(false)
  const [category, setCategory] = useState('all')
  const [page, setPage] = useState({ key: '', count: 24 })
  const filterKey = [query, level, kind, category, savedOnly].join('|')
  const limit = page.key === filterKey ? page.count : 24
  const browsing =
    !query.trim() && level === 'all' && kind === 'all' && category === 'all' && !savedOnly
  const bookmarks = useLearning((s) => s.bookmarks),
    toggle = useLearning((s) => s.toggleBookmark)
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
      (kind === 'all' || e.kind === kind) &&
      (category === 'all' || e.category === category) &&
      (!browsing || !['Mục tra cứu', 'Chuyên đề'].includes(e.kind)) &&
      (!savedOnly || bookmarks.includes(e.id)),
  )
  return (
    <>
      <PageHeading
        eyebrow="MỘT ĐIỂM TỰA KHI BẠN CẦN"
        title="Kho kiến thức"
        description="17 chuyên đề · 208 mục ngữ pháp từ nền tảng đến nâng cao. Đọc giải thích, xem công thức, đối chiếu ví dụ và nhận diện lỗi thường gặp."
      />
      <div className="knowledge-search">
        <Search size={23} />
        <input
          aria-label="Tìm kiếm kho kiến thức"
          placeholder="Bạn muốn tìm hiểu điều gì? Thử “phu dinh”, “to be”…"
          value={query}
          onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {})}
        />
      </div>
      <div className="filter-row">
        <label>
          Cấp độ
          <select aria-label="Cấp độ" value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="all">Tất cả cấp độ</option>
            {['L0', 'A1', 'A2', 'B1', 'B2', 'C1'].map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </label>
        <label>
          Nội dung
          <select aria-label="Nội dung" value={kind} onChange={(e) => setKind(e.target.value)}>
            <option value="all">Tất cả nội dung</option>
            {['Chuyên đề', 'Mục tra cứu', 'Bài học', 'Điểm kiến thức', 'Cheat sheet'].map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </label>
        <label>
          Nhóm ngữ pháp
          <select
            aria-label="Nhóm ngữ pháp"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">Tất cả nhóm</option>
            {chapters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id}. {c.title}
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
        <span className="muted">
          {browsing
            ? `${chapters.length} chuyên đề · ${filtered.length} tài liệu luyện và ôn`
            : `${filtered.length} kết quả`}
        </span>
      </div>
      {browsing && (
        <section className="reference-library" aria-labelledby="reference-library-title">
          <div className="reference-intro">
            <span className="eyebrow">TỪ NỀN TẢNG ĐẾN NÂNG CAO</span>
            <h2 id="reference-library-title">Khám phá 17 nhóm ngữ pháp</h2>
            <p>
              Chọn một nhóm để đọc theo mục lục. Bạn cũng có thể tìm một cấu trúc hoặc đánh dấu mục
              cần ôn lại.
            </p>
          </div>
          <div className="reference-grid">
            {chapters.map((chapter) => (
              <Link
                className="reference-chapter"
                key={chapter.id}
                to={`/knowledge/reference/${chapter.id}`}
              >
                <span className="reference-letter">{chapter.id}</span>
                <div>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.description}</p>
                  <span className="muted">
                    {chapter.count} mục tra cứu <ArrowUpRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <h2 className="reference-resources-title">Bài học, quy tắc và bảng tóm tắt</h2>
        </section>
      )}
      {filtered.length ? (
        <div className="knowledge-grid">
          {filtered.slice(0, limit).map((entry) => (
            <article className="knowledge-card" key={entry.id}>
              <div className="inline-tags">
                <span className="pill neutral">{entry.kind}</span>
                <button
                  className={`icon-button ${bookmarks.includes(entry.id) ? 'selected' : ''}`}
                  aria-label={`Đánh dấu ${entry.title}`}
                  aria-pressed={bookmarks.includes(entry.id)}
                  onClick={() => toggle(entry.id)}
                >
                  <Bookmark size={17} />
                </button>
              </div>
              <Link to={entry.path}>
                <h2>{entry.title}</h2>
                <p>{entry.summary}</p>
                <span>
                  {entry.level || 'Tra cứu nhanh'} <ArrowUpRight size={17} />
                </span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <BookOpen size={30} />
          <h2>Chưa tìm thấy nội dung phù hợp</h2>
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
        208 mục tra cứu trong 17 chuyên đề có thể đọc ngay. Bài tập có trong các bài học được liên
        kết. Kho hiện có {entries.filter((entry) => entry.kind === 'Bài học').length} bài học,{' '}
        {entries.filter((entry) => entry.kind === 'Điểm kiến thức').length} điểm kiến thức và{' '}
        {entries.filter((entry) => entry.kind === 'Cheat sheet').length} bảng tóm tắt. Nội dung tiếp
        tục được bổ sung theo lộ trình.
      </div>
    </>
  )
}
