import { useRef, useState } from "react";
import {
  Download,
  Upload,
  Monitor,
  Moon,
  Sun,
  CheckCircle2,
} from "lucide-react";
import { useProgress } from "../store/ProgressContext";
import { dayKey, parseProgress } from "../lib/progress";
import type { Progress, Theme } from "../types";
export function Settings() {
  const { progress, update, importData } = useProgress();
  const [pending, setPending] = useState<Progress | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const exportData = () => {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(progress, null, 2)], {
        type: "application/json",
      }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `goc-ngu-phap-${dayKey()}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage("Đã tạo bản sao lưu JSON.");
    setError("");
  };
  const readFile = async (file?: File) => {
    setPending(null);
    setMessage("");
    setError("");
    if (!file) return;
    try {
      if (file.size > 8 * 1024 * 1024)
        throw new Error("Tệp quá lớn. Vui lòng chọn bản sao lưu nhỏ hơn 8 MB.");
      setPending(parseProgress(JSON.parse(await file.text())));
    } catch (reason) {
      setError(
        reason instanceof SyntaxError
          ? "Không đọc được JSON. Dữ liệu hiện tại vẫn được giữ nguyên."
          : reason instanceof Error
            ? reason.message
            : "Không đọc được tệp.",
      );
    }
    if (input.current) input.current.value = "";
  };
  const themes: { id: Theme; label: string; icon: typeof Sun }[] = [
    { id: "system", label: "Theo hệ thống", icon: Monitor },
    { id: "light", label: "Sáng", icon: Sun },
    { id: "dark", label: "Tối", icon: Moon },
  ];
  return (
    <main className="page settings-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">HỌC THEO CÁCH CỦA BẠN</div>
          <h1>Cài đặt</h1>
          <p>Một không gian đọc thoải mái, một nhịp học phù hợp.</p>
        </div>
      </div>
      <section className="card settings-section">
        <h2>Trải nghiệm đọc</h2>
        <fieldset>
          <legend>Giao diện</legend>
          <div className="theme-options">
            {themes.map((t) => (
              <button
                key={t.id}
                className={progress.theme === t.id ? "selected" : ""}
                aria-pressed={progress.theme === t.id}
                onClick={() => update((old) => ({ ...old, theme: t.id }))}
              >
                <t.icon size={20} />
                {t.label}
              </button>
            ))}
          </div>
        </fieldset>
        <label htmlFor="font-size">
          Cỡ chữ bài học <span>{progress.fontSize}px</span>
        </label>
        <input
          id="font-size"
          type="range"
          min={15}
          max={22}
          value={progress.fontSize}
          onChange={(e) =>
            update((old) => ({ ...old, fontSize: Number(e.target.value) }))
          }
        />
        <div className="font-preview" style={{ fontSize: progress.fontSize }}>
          A little progress, every day.
          <br />
          <span>Mỗi ngày, hiểu thêm một chút.</span>
        </div>
      </section>
      <section className="card settings-section">
        <h2>Nhịp học tập</h2>
        <label htmlFor="weekly-goal">Mục tiêu số bài mỗi tuần</label>
        <select
          id="weekly-goal"
          value={progress.weeklyGoal}
          onChange={(e) =>
            update((old) => ({ ...old, weeklyGoal: Number(e.target.value) }))
          }
        >
          {Array.from({ length: 30 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} bài / tuần
            </option>
          ))}
        </select>
        <p>
          Tuần bắt đầu từ thứ Hai. Mục tiêu tính theo số bài đánh dấu hoàn thành
          trong tuần; chuỗi ngày tính theo ngày bạn mở bài học.
        </p>
      </section>
      <section className="card settings-section">
        <h2>Sao lưu & khôi phục</h2>
        <p>
          Tiến độ, vị trí đọc, ghi chú, mục đã lưu và cài đặt được lưu trên
          trình duyệt này. Xuất JSON để chuyển sang thiết bị khác hoặc giữ một
          bản sao.
        </p>
        <div className="backup-actions">
          <button className="button primary" onClick={exportData}>
            <Download size={16} /> Xuất dữ liệu JSON
          </button>
          <button
            className="button secondary"
            onClick={() => input.current?.click()}
          >
            <Upload size={16} /> Chọn tệp để nhập
          </button>
          <input
            ref={input}
            className="sr-only"
            tabIndex={-1}
            type="file"
            accept=".json,application/json"
            aria-label="Chọn bản sao lưu JSON"
            onChange={(e) => {
              void readFile(e.target.files?.[0]);
            }}
          />
        </div>
        {pending && (
          <div className="import-preview">
            <h3>Bản sao lưu đã sẵn sàng</h3>
            <p>
              {Object.keys(pending.lessons).length} bài có tiến độ ·{" "}
              {Object.keys(pending.notes).length} ghi chú ·{" "}
              {pending.bookmarks.length} mục đã lưu
            </p>
            <p>
              Áp dụng sẽ thay thế dữ liệu hiện tại trên trình duyệt này. Bạn có
              thể xuất dữ liệu hiện tại trước khi tiếp tục.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                className="button primary"
                onClick={() => {
                  importData(pending);
                  setPending(null);
                  setMessage("Đã khôi phục tiến độ, ghi chú và cài đặt.");
                }}
              >
                Áp dụng bản sao lưu
              </button>
              <button
                className="button secondary"
                onClick={() => setPending(null)}
              >
                Hủy
              </button>
            </div>
          </div>
        )}
        {message && (
          <p role="status" className="success-message">
            <CheckCircle2 size={17} />
            {message}
          </p>
        )}
        {error && (
          <p role="alert" className="error-message">
            {error}
          </p>
        )}
      </section>
    </main>
  );
}
