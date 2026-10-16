import { useEffect, useState, type ReactNode } from 'react'
import { NavLink, Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  BookOpen,
  LayoutDashboard,
  Route,
  Library,
  RotateCcw,
  NotebookPen,
  Settings,
  ArrowUpRight,
  Search,
  Menu,
  X,
  Sprout,
  ChevronRight,
  Sun,
  Moon,
} from 'lucide-react'
import { useLearning } from '../features/progress/store'
import copy from '../../content/interface.json'
import SearchInput from '../components/SearchInput'
const nav = [
  { to: '/', title: 'Tổng quan', icon: LayoutDashboard },
  { to: '/roadmap', title: 'Lộ trình học', icon: Route },
  { to: '/knowledge', title: 'Thư viện bài học', icon: Library },
  { to: '/practice', title: 'Luyện tập', icon: BookOpen },
  { to: '/review', title: 'Ôn tập hôm nay', icon: RotateCcw },
  { to: '/mistakes', title: 'Sổ lỗi sai', icon: NotebookPen },
]
export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  )
}
export function Loading({ error }: { error?: string }) {
  return (
    <div className="empty-state" role={error ? 'alert' : 'status'}>
      <BookOpen size={32} />
      <h2>{error ? 'Chưa thể mở nội dung' : 'Đang mở trang sách…'}</h2>
      <p>{error ?? 'Chỉ một chút thôi.'}</p>
      {error && (
        <Link className="button" to="/">
          Về tổng quan
        </Link>
      )}
    </div>
  )
}
export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])
  const location = useLocation()
  const navigate = useNavigate()
  const settings = useLearning((s) => s.settings),
    setSettings = useLearning((s) => s.setSettings),
    storageError = useLearning((s) => s.storageError)
  const due = useLearning(
    (s) => Object.values(s.review).filter((r) => new Date(r.due) <= new Date()).length,
  )
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      document.documentElement.dataset.theme =
        settings.theme === 'auto' ? (media.matches ? 'dark' : 'light') : settings.theme
      document.documentElement.dataset.font = settings.fontSize
    }
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [settings.theme, settings.fontSize])
  useEffect(() => {
    window.scrollTo({ top: 0 })
    if ('speechSynthesis' in window) speechSynthesis.cancel()
  }, [location.pathname])
  const current =
    nav.find((n) => n.to !== '/' && location.pathname.startsWith(n.to))?.title ??
    (location.pathname.startsWith('/lesson')
      ? 'Bài học'
      : location.pathname === '/settings'
        ? 'Cài đặt'
        : 'Tổng quan')
  return (
    <div className="app-shell">
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main')?.focus()
          document.getElementById('main')?.scrollIntoView()
        }}
      >
        Đến nội dung chính
      </a>
      {menuOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="Đóng menu"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <aside className={`sidebar ${menuOpen ? 'is-open' : ''}`}>
        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-symbol">
            <BookOpen size={23} />
            <span />
          </span>
          {copy.brand}
          <span className="brand-dot">.</span>
        </Link>
        <p className="brand-tagline">{copy.tagline}</p>
        <div className="sidebar-section-label">GÓC HỌC TẬP</div>
        <nav aria-label="Điều hướng chính">
          {nav.map(({ to, title, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <Icon size={19} />
              <span>{title}</span>
              {to === '/review' && due > 0 && <span className="nav-count">{due}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="growth-note">
            <Sprout size={25} />
            <strong>Chậm một chút cũng được.</strong>
            <p>Mỗi lần học là một bước tiến về phía trước.</p>
            <Link to="/roadmap" onClick={() => setMenuOpen(false)}>
              Cùng bắt đầu <ArrowUpRight size={16} />
            </Link>
          </div>
          <NavLink to="/settings" className="nav-item" onClick={() => setMenuOpen(false)}>
            <Settings size={19} />
            Cài đặt
          </NavLink>
          <div className="local-badge">
            <span />
            Tiến độ lưu trên thiết bị
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumbs">
            <button
              className="icon-button mobile-menu"
              aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
            <span>Góc học tập</span>
            <ChevronRight size={14} />
            <strong>{current}</strong>
          </div>
          <div className="topbar-actions">
            <form
              className="global-search"
              onSubmit={(e) => {
                e.preventDefault()
                navigate(`/knowledge?q=${encodeURIComponent(query)}`)
              }}
            >
              <Search size={17} />
              <SearchInput
                aria-label="Tìm kiến thức"
                placeholder="Tìm một điểm ngữ pháp…"
                value={query}
                onValueChange={setQuery}
              />
              <kbd>↵</kbd>
            </form>
            <button
              className="icon-button theme-toggle"
              aria-label="Chuyển giao diện sáng hoặc tối"
              onClick={() =>
                setSettings({
                  theme: document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark',
                })
              }
            >
              {settings.theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <Link to="/settings" className="avatar" aria-label="Cài đặt học tập">
              B
            </Link>
          </div>
        </header>
        {storageError && (
          <div className="storage-warning" role="alert">
            {storageError}
          </div>
        )}
        <main id="main" className="main-content" tabIndex={-1}>
          <Outlet />
        </main>
        <footer className="footer">
          <span>Học vững từ gốc, tiến xa từng ngày.</span>
          <span>Gramio · Bản nền tảng 01</span>
        </footer>
      </div>
    </div>
  )
}
