import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { List } from "lucide-react";
import type { Lesson } from "../types";
import { lessonUrl } from "../lib/content";
export function Toc({ lesson }: { lesson: Lesson }) {
  const [active, setActive] = useState("");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = lesson.headings[0]?.id ?? "";
      for (const heading of lesson.headings) {
        const top = document
          .getElementById(heading.id)
          ?.getBoundingClientRect().top;
        if (top !== undefined && top <= 160) current = heading.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [lesson]);
  return (
    <aside className="toc">
      <div className="eyebrow flex items-center gap-2">
        <List size={15} /> TRONG BÀI NÀY
      </div>
      <nav aria-label="Mục lục bài học">
        {lesson.headings.map((h) => (
          <Link
            key={h.id}
            to={lessonUrl(lesson.id, h.id)}
            aria-current={active === h.id ? "location" : undefined}
            className={`${h.level === 3 ? "sub" : ""} ${active === h.id ? "active" : ""}`}
          >
            {h.text}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
