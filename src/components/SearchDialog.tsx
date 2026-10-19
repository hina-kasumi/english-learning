import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDown, ArrowUp, CornerDownLeft, Search, X } from "lucide-react";
import { useContent } from "../lib/ContentContext";
import { createSearch, excerpt } from "../lib/search";
import { lessonUrl } from "../lib/content";
function Highlight({
  text,
  ranges,
  offset = 0,
}: {
  text: string;
  ranges: readonly (readonly [number, number])[];
  offset?: number;
}) {
  const children: ReactNode[] = [];
  let cursor = 0;
  for (const [from, to] of ranges) {
    const start = Math.max(cursor, from - offset, 0);
    const end = Math.min(text.length, to - offset + 1);
    if (end <= start) continue;
    if (start > cursor) children.push(text.slice(cursor, start));
    children.push(
      <mark key={`${start}-${end}`}>{text.slice(start, end)}</mark>,
    );
    cursor = end;
  }
  children.push(text.slice(cursor));
  return <>{children}</>;
}
export function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { lessons } = useContent();
  const search = useMemo(() => createSearch(lessons), [lessons]);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const hits = useMemo(() => search(query), [query, search]);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      input.current?.focus();
    } else dialog.current?.close();
  }, [open]);
  useEffect(() => {
    document
      .getElementById(`search-result-${active}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active, hits]);
  const go = (index: number) => {
    const hit = hits[index];
    if (hit) {
      navigate(lessonUrl(hit.item.lessonId, hit.item.headingId));
      onClose();
    }
  };
  return (
    <dialog
      ref={dialog}
      className="search-dialog"
      aria-label="Tìm kiếm toàn văn"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) onClose();
      }}
    >
      <div className="search-dialog-inner">
        <div className="search-field">
          <Search size={21} />
          <input
            ref={input}
            aria-label="Tìm kiếm tiêu đề hoặc nội dung"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={hits.length > 0}
            aria-controls="search-results"
            aria-activedescendant={
              hits.length ? `search-result-${active}` : undefined
            }
            placeholder="Bạn muốn tìm hiểu điều gì?"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((i) => Math.max(0, Math.min(i + 1, hits.length - 1)));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
              }
              if (e.key === "Enter") {
                e.preventDefault();
                go(active);
              }
            }}
          />
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Đóng tìm kiếm"
          >
            <X size={20} />
          </button>
        </div>
        <div className="search-summary" aria-live="polite">
          {query.trim().length < 2
            ? "Tìm trong toàn bộ bài học · Nhập ít nhất 2 ký tự"
            : hits.length
              ? `${hits.length} kết quả phù hợp nhất`
              : "Chưa tìm thấy kết quả. Thử từ khóa khác hoặc ngắn hơn."}
        </div>
        <ul
          id="search-results"
          role="listbox"
          aria-label="Kết quả tìm kiếm"
          className="search-results"
        >
          {hits.map((hit, index) => {
            const ranges =
              hit.matches.find((m) => m.key === "text")?.indices ?? [];
            const snippet = excerpt(hit.item.text, ranges);
            return (
              <li
                role="option"
                aria-selected={active === index}
                id={`search-result-${index}`}
                key={`${hit.item.lessonId}#${hit.item.headingId}`}
                onMouseMove={() => setActive(index)}
                onClick={() => go(index)}
              >
                <div className="result-title">
                  <Highlight
                    text={hit.item.title}
                    ranges={
                      hit.matches.find((m) => m.key === "title")?.indices ?? []
                    }
                  />
                </div>
                <div className="result-heading">
                  <Highlight
                    text={hit.item.heading}
                    ranges={
                      hit.matches.find((m) => m.key === "heading")?.indices ??
                      []
                    }
                  />
                </div>
                <p>
                  {snippet.prefix && "…"}
                  <Highlight
                    text={snippet.text}
                    ranges={ranges}
                    offset={snippet.start}
                  />
                  {snippet.suffix && "…"}
                </p>
              </li>
            );
          })}
        </ul>
        {query.trim().length < 2 && (
          <div className="search-suggestions">
            <span>THỬ TÌM KIẾM</span>
            {["Quá khứ đơn", "Mạo từ", "used to", "Mệnh đề quan hệ"].map(
              (q) => (
                <button
                  key={q}
                  onClick={() => {
                    setQuery(q);
                    setActive(0);
                    input.current?.focus();
                  }}
                >
                  {q}
                </button>
              ),
            )}
          </div>
        )}
        <div className="search-footer">
          <span>
            <ArrowUp size={12} />
            <ArrowDown size={12} /> chọn kết quả
          </span>
          <span>
            <CornerDownLeft size={13} /> mở bài
          </span>
          <span>
            <kbd>esc</kbd> đóng
          </span>
        </div>
      </div>
    </dialog>
  );
}
