import { NotebookPen } from "lucide-react";
import { useProgress } from "../store/ProgressContext";
export function LessonNotes({ id }: { id: string }) {
  const { progress, setNote, storageError } = useProgress();
  return (
    <section className="card lesson-notes" id="ghi-chu-ca-nhan">
      <div className="section-heading">
        <h2>
          <NotebookPen size={19} /> Ghi chú của bạn
        </h2>
        <span aria-live="polite">
          {storageError ? "Chưa lưu được" : "Tự động lưu trên thiết bị"}
        </span>
      </div>
      <label className="sr-only" htmlFor="lesson-note">
        Ghi chú cho bài học này
      </label>
      <textarea
        id="lesson-note"
        value={progress.notes[id] ?? ""}
        maxLength={100000}
        onChange={(e) => setNote(id, e.target.value)}
        placeholder="Điều bạn muốn ghi nhớ, một ví dụ của riêng bạn, hoặc câu hỏi để tìm hiểu sau…"
        rows={5}
      />
    </section>
  );
}
