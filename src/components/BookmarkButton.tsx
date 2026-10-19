import { Bookmark } from "lucide-react";
import { useProgress } from "../store/ProgressContext";
export function BookmarkButton({
  lessonId,
  headingId,
  label,
  compact = false,
}: {
  lessonId: string;
  headingId?: string;
  label: string;
  compact?: boolean;
}) {
  const { progress, toggleBookmark } = useProgress();
  const saved = progress.bookmarks.some(
    (b) => b.lessonId === lessonId && b.headingId === headingId,
  );
  return (
    <button
      className={
        compact
          ? `heading-bookmark ${saved ? "saved" : ""}`
          : `button secondary ${saved ? "saved" : ""}`
      }
      aria-label={`${saved ? "Bỏ lưu" : "Lưu"} ${label}`}
      aria-pressed={saved}
      title={saved ? "Bỏ lưu mục này" : "Lưu để đọc lại"}
      onClick={() => toggleBookmark({ lessonId, headingId, label })}
    >
      <Bookmark
        size={compact ? 15 : 16}
        fill={saved ? "currentColor" : "none"}
      />
      {!compact && (saved ? "Đã lưu" : "Lưu bài")}
    </button>
  );
}
