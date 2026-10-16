import { useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Bookmark, ChevronLeft, Printer, Languages } from 'lucide-react'
import { PageHeading, Loading } from '../../app/Layout'
import { loadReference, lessonIndex } from '../../lib/content'
import { useAsync } from '../../lib/useAsync'
import { useLearning } from '../progress/store'
import Markdown from '../../components/Markdown'
import chapters from '../../generated/references.json'

export default function ReferencePage() {
  const { id = '' } = useParams()
  const [params] = useSearchParams()
  const selected = params.get('topic')
  const { data, error } = useAsync(() => loadReference(id), id)
  const { bookmarks, toggleBookmark, settings, setSettings } = useLearning()
  useEffect(() => {
    if (!data) return
    const frame = requestAnimationFrame(() => {
      if (selected) document.getElementById(selected)?.scrollIntoView({ block: 'start' })
      else window.scrollTo({ top: 0 })
    })
    return () => cancelAnimationFrame(frame)
  }, [data, selected])
  if (!data) return <Loading error={error} />
  return (
    <>
      <Link to="/knowledge" className="back-link">
        <ChevronLeft size={16} />
        Kho kiến thức
      </Link>
      <PageHeading
        eyebrow={`CHUYÊN ĐỀ ${data.id} · ${data.topics.length} MỤC TRA CỨU`}
        title={data.title}
        description={data.description}
      />
      <div className="reference-toolbar">
        <button
          className="button secondary"
          aria-pressed={settings.translations}
          onClick={() => setSettings({ translations: !settings.translations })}
        >
          <Languages size={17} />
          {settings.translations ? 'Ẩn bản dịch' : 'Hiện bản dịch'}
        </button>
        <button className="button secondary" onClick={() => window.print()}>
          <Printer size={17} />
          In chuyên đề
        </button>
        <span className="muted">
          V = động từ gốc · V2 = quá khứ · V3 = quá khứ phân từ · S = chủ ngữ
        </span>
      </div>
      <div className="reference-layout">
        <aside className="reference-sidebar">
          <details open>
            <summary>Mục lục chuyên đề</summary>
            <nav aria-label="Mục lục chuyên đề">
              {data.tables.length > 0 && (
                <Link
                  to={`?topic=reference-tables`}
                  aria-current={selected === 'reference-tables' ? 'location' : undefined}
                >
                  Bảng tổng hợp
                </Link>
              )}
              {data.topics.map((topic) => (
                <Link
                  key={topic.id}
                  to={`?topic=${topic.id}`}
                  aria-current={selected === topic.id ? 'location' : undefined}
                >
                  <span>{topic.id}</span>
                  {topic.title}
                </Link>
              ))}
            </nav>
          </details>
        </aside>
        <div className="reference-body">
          {data.tables.length > 0 && (
            <section id="reference-tables" className="reference-tables">
              <h2>Bảng tổng hợp</h2>
              {data.tables.map((table) => (
                <div key={table.title} className="reference-table">
                  <div className="table-scroll" tabIndex={0} role="region" aria-label={table.title}>
                    <table>
                      <caption>{table.title}</caption>
                      <thead>
                        <tr>
                          {table.headers.map((h) => (
                            <th key={h} scope="col">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {table.rows.map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => (
                              <td key={j}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="muted">{table.note}</p>
                </div>
              ))}
            </section>
          )}
          {data.topics.map((topic) => (
            <article key={topic.id} id={topic.id} className="reference-topic">
              <div className="inline-tags">
                <span className="pill neutral">{topic.id}</span>
                <span className="pill">{topic.level}</span>
                <button
                  className={`icon-button ${bookmarks.includes(`reference:${topic.id}`) ? 'selected' : ''}`}
                  aria-label={`Đánh dấu ${topic.title}`}
                  aria-pressed={bookmarks.includes(`reference:${topic.id}`)}
                  onClick={() => toggleBookmark(`reference:${topic.id}`)}
                >
                  <Bookmark size={18} />
                </button>
              </div>
              <h2>{topic.title}</h2>
              <p>{topic.explanation}</p>
              <div className="reference-form">
                <h3>Cấu trúc & cách dùng</h3>
                <p>{topic.form}</p>
              </div>
              <h3>Ví dụ trong ngữ cảnh</h3>
              <Markdown
                content={topic.examples
                  .map((example) => `:::example\n${example.en} | ${example.vi}\n:::`)
                  .join('\n\n')}
              />
              <div className="reference-contrast">
                <section>
                  <h3>Lỗi cần tránh</h3>
                  <p>{topic.pitfall}</p>
                </section>
                <section>
                  <h3>Phân biệt & mở rộng</h3>
                  <p>{topic.comparison}</p>
                </section>
              </div>
              {topic.relatedLessons.length > 0 && (
                <div className="reference-related">
                  <h3>Học tiếp và luyện tập</h3>
                  {topic.relatedLessons.map((lesson) => (
                    <Link key={lesson} to={`/lesson/${lesson}`}>
                      {lessonIndex.find((l) => l.id === lesson)?.title} →
                    </Link>
                  ))}
                </div>
              )}
            </article>
          ))}
          {data.sources.length > 0 && (
            <section className="soft-note">
              <h2>Đọc thêm</h2>
              <ul>
                {data.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noreferrer">
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <nav className="reference-next" aria-label="Các chuyên đề khác">
            {chapters
              .filter((c) => Math.abs(c.id.charCodeAt(0) - data.id.charCodeAt(0)) === 1)
              .map((c) => (
                <Link className="button secondary" key={c.id} to={`/knowledge/reference/${c.id}`}>
                  {c.id}. {c.title}
                </Link>
              ))}
            <Link className="button secondary" to="/knowledge">
              Tất cả chuyên đề
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}
