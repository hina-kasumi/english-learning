import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { categories, lessonById, lessons, roadmap, validateContent } from './data/grammar'
import type { CategoryId, Exercise, Lesson } from './data/grammar'
import { acceptsFillAnswer, answerText, normalize } from './data/grading'
import './App.css'

type Route = { page: 'home' | 'library' | 'roadmap' } | { page: 'article'; id: string }
type Progress = { readIds: string[]; bestScores: Record<string, number>; lastLessonId: string | null }
const STORAGE_KEY = 'grammar-atlas-progress-v2'
const LEGACY_STORAGE_KEY = 'grammar-atlas-progress-v1'
const emptyProgress: Progress = { readIds: [], bestScores: {}, lastLessonId: null }
const categoryById = Object.fromEntries(categories.map((category) => [category.id, category])) as Record<CategoryId, (typeof categories)[number]>
const articleHref = (id: string) => `#/article/${id}`

function loadProgress(): Progress {
  try {
    const currentRaw = localStorage.getItem(STORAGE_KEY)
    const data = JSON.parse(currentRaw ?? localStorage.getItem(LEGACY_STORAGE_KEY) ?? 'null') as Partial<Progress> | null
    if (!data) return emptyProgress
    return {
      readIds: Array.isArray(data.readIds) ? [...new Set(data.readIds.filter((id): id is string => typeof id === 'string' && Boolean(lessonById[id])))] : [],
      bestScores: currentRaw && data.bestScores && typeof data.bestScores === 'object' ? Object.fromEntries(Object.entries(data.bestScores).filter(([id, score]) => Boolean(lessonById[id]) && typeof score === 'number' && Number.isFinite(score) && score >= 0 && score <= 100)) : {},
      lastLessonId: data.lastLessonId && lessonById[data.lastLessonId] ? data.lastLessonId : null,
    }
  } catch { return emptyProgress }
}
function parseRoute(): Route {
  const path = window.location.hash.replace(/^#\/?/, '')
  if (path === 'library' || path === 'roadmap') return { page: path }
  if (path.startsWith('article/')) {
    try {
      const id = decodeURIComponent(path.slice(8))
      if (lessonById[id]) return { page: 'article', id }
    } catch { /* liên kết không hợp lệ */ }
  }
  return { page: 'home' }
}
function Icon({ name, size = 20, className = '' }: { name: string; size?: number; className?: string }) {
  const paths: Record<string, ReactNode> = {
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z"/><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20M8 7h8M8 10h6"/></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3z"/><path d="M9 3v15M15 6v15"/></>,
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-7h6v7"/></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></>,
    arrow: <path d="M4 12h16m-7-7 7 7-7 7"/>,
    check: <path d="m4.5 12 5 5L20 6"/>,
    chevron: <path d="m7 10 5 5 5-5"/>,
    layers: <><path d="m12 3 9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5"/></>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
    sparkles: <><path d="m12 2 1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8zM19 16l.7 1.3L21 18l-1.3.7L19 20l-.7-1.3L17 18l1.3-.7z"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    bookmark: <path d="M5 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17l-7-4-7 4z"/>,
    menu: <path d="M4 6h16M4 12h16M4 18h16"/>,
    close: <path d="M5 5 19 19M19 5 5 19"/>,
  }
  return <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name] || paths.book}</svg>
}

function App() {
  const [route, setRoute] = useState<Route>(parseRoute)
  const [progress, setProgress] = useState<Progress>(() => {
    const loaded = loadProgress()
    const initialRoute = parseRoute()
    return initialRoute.page === 'article' ? { ...loaded, lastLessonId: initialRoute.id } : loaded
  })
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryId | 'all'>('all')
  const [menuOpen, setMenuOpen] = useState(false)
  const errors = useMemo(() => validateContent(), [])
  const readCount = progress.readIds.length
  const practiceCount = Object.keys(progress.bestScores).length

  useEffect(() => {
    const onHash = () => {
      const nextRoute = parseRoute()
      setRoute(nextRoute)
      if (nextRoute.page === 'article') setProgress((current) => current.lastLessonId === nextRoute.id ? current : { ...current, lastLessonId: nextRoute.id })
      setMenuOpen(false)
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)) } catch { /* storage unavailable */ } }, [progress])
  function navigate(hash: string) { if (window.location.hash === hash) window.scrollTo({ top: 0, behavior: 'smooth' }); else window.location.assign(hash) }
  function browseCategory(id: CategoryId) { setCategory(id); setQuery(''); navigate('#/library') }
  function markRead(id: string) { setProgress((current) => ({ ...current, readIds: current.readIds.includes(id) ? current.readIds : [...current.readIds, id] })) }
  function saveScore(id: string, score: number) { setProgress((current) => ({ ...current, bestScores: { ...current.bestScores, [id]: Math.max(current.bestScores[id] || 0, score) } })) }

  return <div className="app-shell">
    <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`} aria-label="Điều hướng chính">
      <a className="brand" href="#/" onClick={() => setMenuOpen(false)} aria-label="Grammar Atlas - trang chủ"><span className="brand-mark"><span>A</span><span>↗</span></span><span className="brand-name">grammar<span>atlas</span><small>Học hiểu từ gốc</small></span></a>
      <div className="sidebar-label">KHÁM PHÁ</div>
      <nav className="side-nav"><a href="#/" className={route.page === 'home' ? 'active' : ''}><Icon name="home"/> Tổng quan</a><a href="#/library" className={route.page === 'library' || route.page === 'article' ? 'active' : ''}><Icon name="book"/> Kho ngữ pháp <span className="nav-count">{lessons.length}</span></a><a href="#/roadmap" className={route.page === 'roadmap' ? 'active' : ''}><Icon name="map"/> Roadmap học tập</a></nav>
      <div className="sidebar-label sidebar-label-second">CHỦ ĐỀ</div>
      <nav className="category-nav" aria-label="Nhóm ngữ pháp">{categories.map((item) => <button type="button" key={item.id} onClick={() => { browseCategory(item.id); setMenuOpen(false) }}><span className={`tiny-symbol cat-${item.id}`}>{item.symbol}</span>{item.name}</button>)}</nav>
      <div className="sidebar-bottom"><span className="sidebar-progress-icon"><Icon name="target" size={18}/></span><div><strong>Tiến độ của bạn</strong><span>{readCount}/{lessons.length} bài đã học</span></div><div className="mini-progress"><span style={{ width: `${readCount / lessons.length * 100}%` }}/></div></div>
    </aside>
    <div className="main-area"><header className="topbar"><button type="button" className="mobile-menu-button icon-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}><Icon name={menuOpen ? 'close' : 'menu'}/></button><div className="mobile-brand">grammar<span>atlas</span></div><div className="topbar-spacer"/><form className="global-search" role="search" onSubmit={(event) => { event.preventDefault(); setCategory('all'); navigate('#/library') }}><Icon name="search" size={18}/><input aria-label="Tìm kiến thức ngữ pháp" placeholder="Tìm bài học..." value={query} onChange={(event) => { setQuery(event.target.value); if (route.page !== 'library') navigate('#/library') }}/></form><span className="topbar-separator"/><span className="topbar-note"><span className="topbar-dot"/> Học theo cách của bạn</span></header>
      <main className="page-content" id="main-content">{errors.length > 0 && <div className="content-warning" role="alert">Dữ liệu nội dung có lỗi: {errors.join('; ')}</div>}{route.page === 'home' && <HomePage progress={progress} readCount={readCount} practiceCount={practiceCount} onCategory={browseCategory} onNavigate={navigate}/ >}{route.page === 'library' && <LibraryPage query={query} setQuery={setQuery} category={category} setCategory={setCategory} progress={progress}/ >}{route.page === 'roadmap' && <RoadmapPage progress={progress}/ >}{route.page === 'article' && <ArticlePage key={route.id} lesson={lessonById[route.id]} progress={progress} onRead={markRead} onScore={saveScore}/ >}</main>
    </div>{menuOpen && <button type="button" className="menu-backdrop" aria-label="Đóng menu" onClick={() => setMenuOpen(false)}/>}</div>
}

function SectionHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) { return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{action}</div> }

function HomePage({ progress, readCount, practiceCount, onCategory, onNavigate }: { progress: Progress; readCount: number; practiceCount: number; onCategory: (id: CategoryId) => void; onNavigate: (hash: string) => void }) {
  const continueLesson = lessonById[progress.lastLessonId || roadmap[0].lessonIds[0]]
  return <>
    <div className="welcome-line"><span>KHÔNG GÒ BÓ CẤP ĐỘ. HỌC THEO CÁCH BẠN HIỂU.</span><span>Một nơi để hiểu tiếng Anh thật sâu ✦</span></div>
    <section className="hero-banner"><div className="hero-content"><span className="hero-tag"><Icon name="sparkles" size={15}/> KHO TÀNG NGỮ PHÁP TIẾNG ANH</span><h1>Hiểu bản chất.<br/><em>Giỏi tiếng Anh.</em></h1><p>Từ câu đầu tiên đến những sắc thái tinh tế. Tra cứu bất cứ lúc nào, hoặc đi theo một lộ trình được sắp xếp rõ ràng.</p><div className="hero-actions"><a className="button button-light" href="#/library">Khám phá kho bài <Icon name="arrow" size={18}/></a><a className="button button-outline-light" href="#/roadmap">Xem roadmap</a></div></div><div className="hero-art" aria-hidden="true"><div className="hero-orbit hero-orbit-one"/><div className="hero-orbit hero-orbit-two"/><div className="hero-paper"><span className="paper-dots">•••</span><span className="paper-label">THE ENGLISH SENTENCE</span><strong>Ideas become<br/><i>clearer.</i></strong><span className="paper-rule"/><span className="paper-rule short"/><span className="paper-badge">Aa</span></div><span className="art-spark art-spark-one">✳</span><span className="art-spark art-spark-two">✦</span></div></section>
    <div className="stat-strip"><div><span className="stat-icon lavender"><Icon name="book"/></span><strong>{lessons.length}</strong><span>bài ngữ pháp</span></div><div><span className="stat-icon peach"><Icon name="target"/></span><strong>{lessons.reduce((total, lesson) => total + lesson.exercises.length, 0)}</strong><span>câu luyện tập</span></div><div><span className="stat-icon mint"><Icon name="check"/></span><strong>{readCount}</strong><span>bài đã học</span></div><div><span className="stat-icon blue"><Icon name="layers"/></span><strong>{practiceCount}</strong><span>bài đã luyện tập</span></div></div>
    <section className="home-section"><SectionHeading eyebrow="BẮT ĐẦU TỪ ĐÂU?" title="Chọn cách học phù hợp với bạn"/><div className="start-cards"><button type="button" className="start-card start-roadmap" onClick={() => onNavigate('#/roadmap')}><span className="start-icon"><Icon name="map" size={25}/></span><span className="start-copy"><span className="start-kicker">HỌC THEO LỘ TRÌNH</span><strong>Đi từng bước vững chắc</strong><span>Theo roadmap từ nền tảng đến nâng cao, biết nên học gì tiếp theo.</span><b>Xem roadmap <Icon name="arrow" size={16}/></b></span></button><button type="button" className="start-card start-library" onClick={() => onNavigate('#/library')}><span className="start-icon"><Icon name="search" size={25}/></span><span className="start-copy"><span className="start-kicker">TRA CỨU TỰ DO</span><strong>Tìm đúng điều bạn cần</strong><span>Khám phá theo chủ đề, tra nhanh quy tắc và những điểm dễ nhầm.</span><b>Vào kho ngữ pháp <Icon name="arrow" size={16}/></b></span></button></div></section>
    <section className="home-section"><SectionHeading eyebrow="KHÁM PHÁ KIẾN THỨC" title={`${categories.length} cánh cửa vào ngữ pháp`} action={<a className="text-link" href="#/library">Xem tất cả bài học <Icon name="arrow" size={17}/></a>}/><div className="category-grid">{categories.map((item) => <button type="button" className={`category-card cat-card-${item.id}`} key={item.id} onClick={() => onCategory(item.id)}><span className="category-symbol">{item.symbol}</span><strong>{item.name}</strong><span>{item.description}</span><span className="category-card-bottom">{lessons.filter((lesson) => lesson.category === item.id).length} bài học <Icon name="arrow" size={16}/></span></button>)}</div></section>
    <section className="home-section home-bottom-grid"><div className="continue-panel"><span className="eyebrow">TIẾP TỤC HỌC</span><div className="continue-icon"><Icon name="bookmark" size={24}/></div><h2>{progress.lastLessonId ? 'Nơi bạn dừng lại' : 'Bài đầu tiên dành cho bạn'}</h2><p>{continueLesson.title}</p><span>{continueLesson.subtitle}</span><a className="button button-primary" href={articleHref(continueLesson.id)}>{progress.lastLessonId ? 'Học tiếp' : 'Bắt đầu học'} <Icon name="arrow" size={17}/></a></div><div className="roadmap-preview"><span className="eyebrow">HÀNH TRÌNH CỦA BẠN</span><h2>Roadmap {roadmap.length} chặng học</h2><p>Một lối đi gợi ý qua kho kiến thức. Mỗi bài vẫn luôn mở để bạn tra cứu bất cứ lúc nào.</p><div className="preview-stages">{roadmap.slice(0, 4).map((stage, index) => <div key={stage.id}><span>{String(index + 1).padStart(2, '0')}</span><strong>{stage.title}</strong><small>{stage.lessonIds.length} bài</small></div>)}</div><a href="#/roadmap" className="text-link">Xem toàn bộ roadmap <Icon name="arrow" size={17}/></a></div></section>
  </>
}

function LibraryPage({ query, setQuery, category, setCategory, progress }: { query: string; setQuery: (value: string) => void; category: CategoryId | 'all'; setCategory: (value: CategoryId | 'all') => void; progress: Progress }) {
  const filtered = useMemo(() => lessons.filter((lesson) => {
    if (category !== 'all' && lesson.category !== category) return false
    return normalize(`${lesson.title} ${lesson.subtitle} ${lesson.overview} ${lesson.structure} ${lesson.uses.join(' ')} ${lesson.contrast} ${lesson.mistake} ${lesson.summary} ${lesson.examples.flat().join(' ')} ${categoryById[lesson.category].name}`).includes(normalize(query))
  }), [query, category])
  return <><div className="page-intro"><span className="eyebrow">THƯ VIỆN KIẾN THỨC</span><h1>Kho ngữ pháp<span className="title-dot">.</span></h1><p>Mỗi chủ đề là một cánh cửa. Chọn điều bạn tò mò và học theo nhịp của riêng mình.</p></div><div className="library-tools"><div className="library-search"><Icon name="search" size={20}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm chủ đề, cấu trúc, cách dùng..." aria-label="Tìm trong kho ngữ pháp"/>{query && <button type="button" onClick={() => setQuery('')} aria-label="Xóa tìm kiếm"><Icon name="close" size={16}/></button>}</div><div className="result-count"><Icon name="layers" size={17}/>{filtered.length} bài học</div></div><div className="filter-row" aria-label="Lọc theo nhóm chủ đề"><button type="button" className={category === 'all' ? 'selected' : ''} onClick={() => setCategory('all')}>Tất cả</button>{categories.map((item) => <button type="button" key={item.id} className={category === item.id ? 'selected' : ''} onClick={() => setCategory(item.id)}>{item.name}</button>)}</div>{filtered.length ? <div className="lesson-grid">{filtered.map((lesson) => <LessonCard key={lesson.id} lesson={lesson} read={progress.readIds.includes(lesson.id)}/>)}</div> : <div className="empty-state"><Icon name="search" size={34}/><h2>Chưa tìm thấy bài phù hợp</h2><p>Thử một từ khóa khác hoặc chọn tất cả nhóm kiến thức.</p><button type="button" className="button button-primary" onClick={() => { setQuery(''); setCategory('all') }}>Xem tất cả bài</button></div>}</>
}

function LessonCard({ lesson, read }: { lesson: Lesson; read: boolean }) {
  const category = categoryById[lesson.category]
  return <a className="lesson-card" href={articleHref(lesson.id)}><div className="lesson-card-top"><span className={`lesson-category cat-text-${lesson.category}`}><span className={`tiny-symbol cat-${lesson.category}`}>{category.symbol}</span>{category.name}</span>{read && <span className="read-pill"><Icon name="check" size={13}/> Đã học</span>}</div><h3>{lesson.title}</h3><p>{lesson.subtitle}</p><div className="lesson-card-footer"><span>{lesson.exercises.length} câu luyện tập · {lesson.prerequisites.length ? `${lesson.prerequisites.length} kiến thức nền` : 'bắt đầu ngay'}</span><span className="round-arrow"><Icon name="arrow" size={17}/></span></div></a>
}

function RoadmapPage({ progress }: { progress: Progress }) {
  const [openStages, setOpenStages] = useState<string[]>(['start'])
  const uniqueIds = new Set(roadmap.flatMap((stage) => stage.lessonIds))
  const completed = [...uniqueIds].filter((id) => progress.readIds.includes(id)).length
  function toggle(id: string) { setOpenStages((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]) }
  return <><div className="page-intro roadmap-intro"><span className="eyebrow">HỌC CÓ ĐỊNH HƯỚNG</span><h1>Roadmap học tập<span className="title-dot">.</span></h1><p>Đi từ nền tảng đến sắc thái. Lộ trình chỉ gợi ý thứ tự; bạn luôn có thể mở bất kỳ bài nào trong kho.</p><div className="roadmap-total"><span><Icon name="target" size={17}/> Tiến độ lộ trình</span><strong>{completed}/{uniqueIds.size} bài</strong><div className="progress-track"><span style={{ width: `${completed / uniqueIds.size * 100}%` }}/></div></div></div><div className="roadmap-list">{roadmap.map((stage, index) => {
    const done = stage.lessonIds.filter((id) => progress.readIds.includes(id)).length
    const open = openStages.includes(stage.id)
    return <section className={`stage-card ${open ? 'stage-open' : ''}`} key={stage.id}><button className="stage-heading" type="button" onClick={() => toggle(stage.id)} aria-expanded={open} aria-controls={`stage-${stage.id}`}><span className="stage-number">{String(index + 1).padStart(2, '0')}</span><span className="stage-heading-text"><small>CHẶNG {String(index + 1).padStart(2, '0')}</small><strong>{stage.title}</strong><span>{stage.subtitle}</span></span><span className="stage-status"><b>{done}/{stage.lessonIds.length}</b> bài đã học<span className="stage-chevron"><Icon name="chevron" size={19}/></span></span></button>{open && <div className="stage-content" id={`stage-${stage.id}`}><div className="stage-progress"><span style={{ width: `${done / stage.lessonIds.length * 100}%` }}/></div><div className="stage-lessons">{stage.lessonIds.map((id, lessonIndex) => { const lesson = lessonById[id]; const read = progress.readIds.includes(id); return <a href={articleHref(id)} className="stage-lesson" key={`${stage.id}-${id}`}><span className={`stage-lesson-index ${read ? 'done' : ''}`}>{read ? <Icon name="check" size={15}/> : String(lessonIndex + 1).padStart(2, '0')}</span><span><strong>{lesson.title}</strong><small>{categoryById[lesson.category].name}</small></span><Icon name="arrow" className="stage-lesson-arrow" size={18}/></a> })}</div></div>}</section>
  })}</div></>
}

const sectionLinks = [
  ['overview', 'Hiểu nhanh bản chất'], ['structure', 'Cấu trúc cần nhớ'], ['usage', 'Cách dùng'],
  ['examples', 'Ví dụ'], ['distinctions', 'Phân biệt & tránh nhầm'], ['summary', 'Ghi nhớ nhanh'], ['practice', 'Kiểm tra nhanh'],
]

function ArticlePage({ lesson, progress, onRead, onScore }: { lesson: Lesson; progress: Progress; onRead: (id: string) => void; onScore: (id: string, score: number) => void }) {
  const category = categoryById[lesson.category]
  const roadmapOrder = [...new Set(roadmap.flatMap((stage) => stage.lessonIds))]
  const nextId = roadmapOrder[roadmapOrder.indexOf(lesson.id) + 1]
  const related = [...new Set([...lesson.prerequisites, ...lessons.filter((item) => item.prerequisites.includes(lesson.id)).map((item) => item.id), ...lessons.filter((item) => item.category === lesson.category && item.id !== lesson.id).map((item) => item.id)])].filter((id) => id !== lesson.id).slice(0, 4)
  const read = progress.readIds.includes(lesson.id)
  return <div className="article-layout"><article className="article-main"><div className="breadcrumbs"><a href="#/library">Kho ngữ pháp</a><span>/</span><span>{category.name}</span><span>/</span><strong>{lesson.title}</strong></div><div className="article-hero"><span className={`article-category cat-text-${lesson.category}`}><span className={`tiny-symbol cat-${lesson.category}`}>{category.symbol}</span>{category.name}</span><h1>{lesson.title}</h1><p>{lesson.subtitle}</p><div className="article-actions"><span><Icon name="clock" size={16}/> {Math.max(5, Math.ceil((lesson.overview.length + lesson.uses.join('').length + lesson.contrast.length) / 180))} phút đọc</span><span className="action-divider"/><button type="button" className={read ? 'mark-read is-read' : 'mark-read'} onClick={() => onRead(lesson.id)}><Icon name="check" size={16}/>{read ? 'Đã học' : 'Đánh dấu đã học'}</button></div></div>
    {lesson.prerequisites.length > 0 && <div className="prerequisite-box"><span><Icon name="layers" size={18}/> NÊN BIẾT TRƯỚC</span><div>{lesson.prerequisites.map((id) => <a key={id} href={articleHref(id)}>{lessonById[id].title} <Icon name="arrow" size={13}/></a>)}</div></div>}
    <div className="article-body"><section id="overview"><div className="article-section-heading"><span>01</span><h2>Hiểu nhanh bản chất</h2></div><p className="article-lead">{lesson.overview}</p></section><section id="structure"><div className="article-section-heading"><span>02</span><h2>Cấu trúc cần nhớ</h2></div><div className="formula-box"><span>CÔNG THỨC / MẪU CÂU</span><strong>{lesson.structure}</strong></div></section><section id="usage"><div className="article-section-heading"><span>03</span><h2>Cách dùng trong thực tế</h2></div><div className="use-list">{lesson.uses.map((use, index) => <div key={index}><span>{String(index + 1).padStart(2, '0')}</span><p>{use}</p></div>)}</div></section><section id="examples"><div className="article-section-heading"><span>04</span><h2>Ví dụ dễ hiểu</h2></div><div className="example-list">{lesson.examples.map(([en, vi]) => <div key={en}><span className="example-quote">“</span><strong>{en}</strong><span>{vi}</span></div>)}</div></section><section id="distinctions"><div className="article-section-heading"><span>05</span><h2>Phân biệt & tránh nhầm</h2></div><div className="insight-box"><span className="insight-icon">↔</span><div><strong>So sánh để hiểu sâu</strong><p>{lesson.contrast}</p></div></div><div className="mistake-box"><span className="insight-icon">!</span><div><strong>Lỗi thường gặp</strong><p>{lesson.mistake}</p></div></div></section><section id="summary"><div className="article-section-heading"><span>06</span><h2>Ghi nhớ nhanh</h2></div><div className="summary-box"><Icon name="sparkles" size={21}/><p>{lesson.summary}</p></div></section><section id="practice"><div className="article-section-heading"><span>07</span><h2>Kiểm tra nhanh</h2></div><p className="practice-intro">Thử áp dụng ngay để xem bạn đã nắm chắc điểm chính chưa.</p><Practice exercises={lesson.exercises} bestScore={progress.bestScores[lesson.id]} onComplete={(score) => onScore(lesson.id, score)}/></section></div>
    <div className="article-end"><button type="button" className={`button ${read ? 'button-muted' : 'button-primary'}`} onClick={() => onRead(lesson.id)}><Icon name="check" size={17}/>{read ? 'Bạn đã đánh dấu bài này' : 'Đánh dấu đã học'}</button>{nextId && <a href={articleHref(nextId)} className="next-link">Bài tiếp theo <strong>{lessonById[nextId].title}</strong><Icon name="arrow" size={19}/></a>}</div></article><aside className="article-aside"><div className="aside-box"><span className="aside-title">TRONG BÀI NÀY</span>{sectionLinks.map(([id, label]) => <button type="button" key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}>{label}</button>)}</div><div className="aside-box related-box"><span className="aside-title">BÀI LIÊN QUAN</span>{related.map((id) => <a key={id} href={articleHref(id)}>{lessonById[id].title}<Icon name="arrow" size={15}/></a>)}</div></aside></div>
}

function Practice({ exercises, bestScore, onComplete }: { exercises: Exercise[]; bestScore?: number; onComplete: (score: number) => void }) {
  const [answers, setAnswers] = useState<Record<number, number | string | number[]>>({})
  const [submitted, setSubmitted] = useState(false)
  const results = exercises.map((exercise, index) => {
    const answer = answers[index]
    if (exercise.type === 'choice') return answer === exercise.answer
    if (exercise.type === 'fill') return typeof answer === 'string' && acceptsFillAnswer(exercise, answer)
    return Array.isArray(answer) && answerText(answer.map((wordIndex) => exercise.words[wordIndex]).join(' ')) === answerText(exercise.answer)
  })
  const score = Math.round(results.filter(Boolean).length / exercises.length * 100)
  const allAnswered = exercises.every((exercise, index) => {
    const answer = answers[index]
    if (exercise.type === 'choice') return typeof answer === 'number'
    if (exercise.type === 'fill') return typeof answer === 'string' && answer.trim().length > 0
    return Array.isArray(answer) && answer.length === exercise.words.length
  })
  return <div className="practice-card"><div className="practice-card-top"><span><Icon name="target" size={18}/> LUYỆN TẬP</span>{bestScore !== undefined && <small>Điểm tốt nhất: {bestScore}%</small>}</div>{exercises.map((exercise, index) => <div className="exercise" key={index}><div className="exercise-title"><span>CÂU {String(index + 1).padStart(2, '0')}</span><h3>{exercise.prompt}</h3></div>{exercise.type === 'choice' && <div className="choice-list">{exercise.options.map((option, optionIndex) => <button type="button" key={optionIndex} disabled={submitted} className={`choice-option ${answers[index] === optionIndex ? 'chosen' : ''} ${submitted && optionIndex === exercise.answer ? 'correct' : ''} ${submitted && answers[index] === optionIndex && optionIndex !== exercise.answer ? 'incorrect' : ''}`} onClick={() => setAnswers({ ...answers, [index]: optionIndex })}><span>{String.fromCharCode(65 + optionIndex)}</span>{option}</button>)}</div>}{exercise.type === 'fill' && <input className={`fill-input ${submitted ? results[index] ? 'correct' : 'incorrect' : ''}`} type="text" value={typeof answers[index] === 'string' ? answers[index] : ''} disabled={submitted} onChange={(event) => setAnswers({ ...answers, [index]: event.target.value })} placeholder="Nhập câu trả lời của bạn" aria-label={`Câu trả lời cho câu ${index + 1}`}/>}{exercise.type === 'order' && <div className="order-exercise"><div className="order-answer" aria-label="Câu đã sắp xếp">{Array.isArray(answers[index]) && answers[index].length ? answers[index].map((wordIndex) => <button type="button" disabled={submitted} key={wordIndex} onClick={() => setAnswers({ ...answers, [index]: (answers[index] as number[]).filter((value) => value !== wordIndex) })}>{exercise.words[wordIndex]}</button>) : <span>Chạm các từ bên dưới để tạo câu</span>}</div><div className="order-words">{exercise.words.map((word, wordIndex) => <button type="button" key={wordIndex} disabled={submitted || (Array.isArray(answers[index]) && (answers[index] as number[]).includes(wordIndex))} onClick={() => setAnswers({ ...answers, [index]: [...(Array.isArray(answers[index]) ? answers[index] as number[] : []), wordIndex] })}>{word}</button>)}</div></div>}{submitted && <div className={`answer-feedback ${results[index] ? 'success' : 'error'}`}><strong>{results[index] ? 'Chính xác!' : 'Chưa đúng rồi.'}</strong> {exercise.explanation}{!results[index] && exercise.type === 'fill' && <span> Đáp án: <b>{exercise.answers[0]}</b>.</span>}{!results[index] && exercise.type === 'order' && <span> Đáp án: <b>{exercise.answer}</b>.</span>}</div>}</div>)}<div className="practice-footer">{submitted ? <><span className={`practice-result ${score === 100 ? 'perfect' : ''}`}>Bạn đúng {results.filter(Boolean).length}/{exercises.length} câu · {score}%</span><button type="button" className="button button-primary" onClick={() => { setAnswers({}); setSubmitted(false) }}>Làm lại <Icon name="arrow" size={16}/></button></> : <><span>Chọn đáp án rồi kiểm tra kết quả</span><button type="button" disabled={!allAnswered} className="button button-primary" onClick={() => { setSubmitted(true); onComplete(score) }}>Kiểm tra đáp án <Icon name="arrow" size={16}/></button></>}</div></div>
}

export default App
