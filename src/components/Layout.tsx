import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, Search, Sun, Moon, Monitor, BookOpen } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useProgress } from "../store/ProgressContext";
import { SearchDialog } from "./SearchDialog";
import { Sidebar } from "./Sidebar";
export function Layout() {
  const { theme, cycleTheme } = useTheme();
  const { storageError } = useProgress();
  const [searchOpen, setSearchOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const drawer = useRef<HTMLDialogElement>(null);
  const location = useLocation();
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((old) => !old);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  useEffect(() => {
    if (open) drawer.current?.showModal();
    else drawer.current?.close();
  }, [open]);
  useEffect(() => {
    setOpen(false);
  }, [location.key]);
  useEffect(() => {
    if (!location.pathname.startsWith("/lesson/")) window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className="app-shell">
      <a
        className="skip-link"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        Bỏ qua điều hướng
      </a>
      <aside className="desktop-sidebar">
        <Sidebar onClose={() => setOpen(false)} />
      </aside>
      <dialog
        ref={drawer}
        className="mobile-drawer"
        aria-label="Điều hướng"
        onCancel={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === drawer.current) setOpen(false);
        }}
      >
        <div className="drawer-inner">
          <Sidebar onClose={() => setOpen(false)} />
        </div>
      </dialog>
      <div className="app-body">
        <header className="topbar">
          <div className="flex items-center gap-3">
            <button
              className="icon-button mobile-only"
              aria-label="Mở điều hướng"
              onClick={() => setOpen(true)}
            >
              <Menu size={22} />
            </button>
            <span className="topbar-label">
              <BookOpen size={16} /> Không gian học của bạn
            </span>
          </div>
          <div className="topbar-actions">
            <button
              className="search-trigger"
              aria-label="Tìm kiếm (Ctrl hoặc Command K)"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={17} />
              <span>Tìm trong kho kiến thức…</span>
              <kbd>
                {/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘ K" : "Ctrl K"}
              </kbd>
            </button>
            <button
              className="icon-button"
              aria-label={`Giao diện: ${theme === "system" ? "theo hệ thống" : theme === "dark" ? "tối" : "sáng"}. Nhấn để chuyển.`}
              onClick={cycleTheme}
            >
              {theme === "system" ? (
                <Monitor size={19} />
              ) : theme === "dark" ? (
                <Moon size={19} />
              ) : (
                <Sun size={19} />
              )}
            </button>
            <span className="avatar" title="Người tự học">
              B
            </span>
          </div>
        </header>
        <div id="main-content" tabIndex={-1}>
          <>
            {storageError && (
              <p role="alert" className="storage-alert">
                {storageError}
              </p>
            )}
            <Outlet />
          </>
        </div>
        <footer className="app-footer">
          Góc Ngữ Pháp <span>Học mỗi ngày, hiểu từng chút.</span>
        </footer>
      </div>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
