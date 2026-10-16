import { useState } from 'react'
import { Download, Upload, Check, ShieldCheck } from 'lucide-react'
import { PageHeading } from '../../app/Layout'
import { useLearning } from '../progress/store'
import { makeBackup, parseBackup, type LearningData } from '../../lib/storage'
export default function SettingsPage() {
  const state = useLearning()
  const { settings, setSettings } = state
  const [message, setMessage] = useState('')
  const [pending, setPending] = useState<LearningData | null>(null)
  const [pasted, setPasted] = useState('')
  const exportData = () => {
    const blob = new Blob([makeBackup(state)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `gramio-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setMessage('Đã tạo tệp sao lưu.')
  }
  const review = (raw: string) => {
    try {
      setPending(parseBackup(raw))
      setMessage('')
    } catch {
      setPending(null)
      setMessage(
        'Tệp không hợp lệ hoặc thuộc phiên bản chưa được hỗ trợ. Tiến độ hiện tại được giữ nguyên.',
      )
    }
  }
  return (
    <>
      <PageHeading
        title="Góc học theo ý bạn"
        description="Một không gian thoải mái giúp bạn học đều đặn hơn."
      />
      <div className="settings-layout">
        <section className="panel settings-panel">
          <h2>Hiển thị & cách học</h2>
          <label>
            Giao diện
            <select
              aria-label="Giao diện"
              value={settings.theme}
              onChange={(e) => setSettings({ theme: e.target.value as typeof settings.theme })}
            >
              <option value="light">Sáng</option>
              <option value="dark">Tối</option>
              <option value="auto">Theo thiết bị</option>
            </select>
          </label>
          <label>
            Cỡ chữ bài học
            <select
              aria-label="Cỡ chữ bài học"
              value={settings.fontSize}
              onChange={(e) =>
                setSettings({ fontSize: e.target.value as typeof settings.fontSize })
              }
            >
              <option value="small">Nhỏ</option>
              <option value="medium">Vừa</option>
              <option value="large">Lớn</option>
            </select>
          </label>
          <label>
            Mục tiêu mỗi ngày
            <select
              aria-label="Mục tiêu mỗi ngày"
              value={settings.dailyGoal}
              onChange={(e) => setSettings({ dailyGoal: Number(e.target.value) })}
            >
              {[5, 10, 15, 20, 30, 50].map((n) => (
                <option key={n} value={n}>
                  {n} câu
                </option>
              ))}
            </select>
          </label>
          <label className="toggle-label">
            <span>Hiện bản dịch tiếng Việt</span>
            <input
              type="checkbox"
              checked={settings.translations}
              onChange={(e) => setSettings({ translations: e.target.checked })}
            />
          </label>
          <label className="toggle-label">
            <span>
              Học tuần tự theo bài tiền đề<small>Tắt để tự chọn bất kỳ bài đã mở nào.</small>
            </span>
            <input
              type="checkbox"
              checked={settings.sequential}
              onChange={(e) => setSettings({ sequential: e.target.checked })}
            />
          </label>
          <h2>Nghe ví dụ</h2>
          {'speechSynthesis' in window ? (
            <>
              <label>
                Giọng đọc
                <select
                  aria-label="Giọng đọc"
                  value={settings.voice}
                  onChange={(e) => setSettings({ voice: e.target.value as typeof settings.voice })}
                >
                  <option value="en-GB">Anh-Anh</option>
                  <option value="en-US">Anh-Mỹ</option>
                </select>
              </label>
              <label>
                Tốc độ đọc
                <select
                  aria-label="Tốc độ đọc"
                  value={settings.rate}
                  onChange={(e) => setSettings({ rate: Number(e.target.value) })}
                >
                  {[0.6, 0.85, 1, 1.2].map((n) => (
                    <option key={n} value={n}>
                      {n}×
                    </option>
                  ))}
                </select>
              </label>
              <p className="muted">Giọng thực tế phụ thuộc giọng tiếng Anh có sẵn trên thiết bị.</p>
            </>
          ) : (
            <p>Trình duyệt này chưa hỗ trợ đọc ví dụ.</p>
          )}
        </section>
        <section className="panel backup-panel">
          <ShieldCheck size={27} />
          <h2>Tiến độ thuộc về bạn</h2>
          <p>
            Dữ liệu học tập được lưu trong trình duyệt này. Xoá dữ liệu trình duyệt sẽ xoá tiến độ;
            hãy tải bản sao lưu để chuyển máy hoặc khôi phục sau này.
          </p>
          <button className="button" onClick={exportData}>
            <Download size={17} />
            Tải bản sao lưu JSON
          </button>
          <h3>Khôi phục tiến độ</h3>
          <label className="upload-label">
            <Upload size={20} />
            Chọn tệp JSON
            <input
              type="file"
              accept="application/json,.json"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (file) {
                  if (file.size > 10_000_000) {
                    setMessage('Vui lòng chọn tệp nhỏ hơn 10 MB.')
                    return
                  }
                  try {
                    review(await file.text())
                  } catch {
                    setMessage('Không đọc được tệp. Hãy thử lại.')
                  }
                }
                e.target.value = ''
              }}
            />
          </label>
          <label className="paste-label">
            Hoặc dán nội dung JSON
            <textarea
              value={pasted}
              onChange={(e) => setPasted(e.target.value)}
              placeholder="Dán bản sao lưu tại đây…"
            />
          </label>
          <button
            className="button secondary"
            disabled={!pasted.trim()}
            onClick={() => review(pasted)}
          >
            Kiểm tra bản sao lưu
          </button>
          {pending && (
            <div className="notice backup-confirm">
              <p>
                <strong>Bản sao lưu hợp lệ:</strong> {pending.attempts.length} lượt luyện,{' '}
                {pending.readLessons.length} bài đã đọc. Khôi phục sẽ thay thế tiến độ hiện tại trên
                thiết bị này.
              </p>
              <button
                className="button"
                onClick={() => {
                  state.importData(pending)
                  setPending(null)
                  setMessage('Đã khôi phục tiến độ thành công.')
                }}
              >
                <Check size={16} />
                Thay thế và khôi phục
              </button>
              <button className="text-button" onClick={() => setPending(null)}>
                Huỷ
              </button>
            </div>
          )}
          {message && (
            <p className="settings-message" role="status">
              {message}
            </p>
          )}
        </section>
      </div>
    </>
  )
}
