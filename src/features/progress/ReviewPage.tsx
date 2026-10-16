import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Check, NotebookPen } from 'lucide-react'
import { PageHeading } from '../../app/Layout'
import { useLearning } from './store'
import { lessonIndex } from '../../lib/content'
import { mastery } from '../../lib/srs'
export default function ReviewPage({ mistakes = false }: { mistakes?: boolean }) {
  const data = useLearning()
  const wrong = Object.values(data.mistakes)
  const due = Object.entries(data.review).filter(([, r]) => new Date(r.due) <= new Date())
  const relevant = lessonIndex.filter((l) =>
    mistakes
      ? wrong.some((w) => w.lessonId === l.id)
      : l.rules.some((r) => due.some(([id]) => id === `grammar:${r.id}`)),
  )
  return (
    <>
      <PageHeading
        title={mistakes ? 'Sổ lỗi sai' : 'Ôn tập hôm nay'}
        description={
          mistakes
            ? 'Hiểu lại điều chưa rõ. Mỗi lần sửa là một lần nhớ lâu hơn.'
            : 'Quay lại những điểm kiến thức đã đến lúc ôn luyện.'
        }
      />
      {!relevant.length ? (
        <div className="empty-state">
          {mistakes ? <NotebookPen size={38} /> : <Check size={38} />}
          <h2>{mistakes ? 'Chưa có lỗi sai cần ôn' : 'Chưa có nội dung đến hạn'}</h2>
          <p>
            {mistakes
              ? 'Các câu trả lời sai sẽ xuất hiện ở đây sau khi bạn nộp một bộ bài tập.'
              : 'Lịch ôn được tạo sau mỗi lượt luyện tập. Trong lúc chờ, bạn có thể học thêm một chút.'}
          </p>
          <Link className="button" to="/practice">
            Đến góc luyện tập
            <ArrowRight size={17} />
          </Link>
        </div>
      ) : (
        <div className="practice-library">
          {relevant.map((l) => (
            <section className="panel" key={l.id}>
              <BookOpen size={24} />
              <h2>{l.title}</h2>
              <p className="muted">
                {mistakes
                  ? `${wrong.filter((w) => w.lessonId === l.id).length} câu cần luyện lại`
                  : `${l.rules.filter((r) => due.some(([key]) => key === `grammar:${r.id}`)).length} quy tắc đến hạn`}
              </p>
              <Link
                className="button"
                to={`/practice/${l.id}/${l.id}-practice-1?${mistakes ? 'wrong' : 'due'}=1`}
              >
                Bắt đầu ôn
                <ArrowRight size={17} />
              </Link>
            </section>
          ))}
        </div>
      )}
      <section className="panel mastery-panel">
        <h2>Mức độ nắm vững kiến thức</h2>
        <p className="muted">
          Dựa trên tối đa 20 câu gần nhất của mỗi rule; câu mới và câu khó có trọng số cao hơn.
        </p>
        {lessonIndex.map((l) => (
          <div className="mastery-lesson" key={l.id}>
            <h3>{l.title}</h3>
            <div className="mastery-grid">
              {l.rules.map((r) => {
                const records = data.results[`grammar:${r.id}`] ?? []
                const score = mastery(records)
                return (
                  <Link
                    to={`/lesson/${l.id}?rule=${r.id}`}
                    key={r.id}
                    className={
                      records.length
                        ? score >= 80
                          ? 'strong'
                          : score >= 50
                            ? 'medium'
                            : 'weak'
                        : 'unseen'
                    }
                  >
                    <span>{r.label}</span>
                    <strong>{records.length ? `${score}%` : 'Chưa luyện'}</strong>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
