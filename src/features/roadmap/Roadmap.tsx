import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  LockKeyhole,
  RotateCcw,
  Sprout,
  Target,
} from 'lucide-react'
import { PageHeading } from '../../app/Layout'
import { lessonIndex, roadmap } from '../../lib/content'
import { useLearning, lessonStatus } from '../progress/store'
import copy from '../../../content/interface.json'

const studySession = [
  {
    time: '5 phút',
    title: 'Nhớ lại',
    description:
      'Đóng tài liệu, nhắc lại quy tắc cũ và tự viết 2 câu ví dụ. Ưu tiên nội dung đến hạn ôn.',
  },
  {
    time: '10 phút',
    title: 'Hiểu một điểm mới',
    description:
      'Đọc cách dùng và ví dụ trong ngữ cảnh. Giải thích vì sao chọn cấu trúc này, đối chiếu với cấu trúc dễ nhầm.',
  },
  {
    time: '10 phút',
    title: 'Luyện và sửa',
    description:
      'Tự làm bài trước khi xem đáp án. Đọc giải thích, ghi nguyên nhân sai và làm lại bằng một câu khác.',
  },
  {
    time: '5 phút',
    title: 'Dùng vào việc thật',
    description: 'Viết hoặc nói 3–5 câu về bản thân. Buổi sau, thử nhớ lại trước khi mở ghi chú.',
  },
]
const isCompleted = (status: string) => status === 'completed' || status === 'mastered'

export default function Roadmap() {
  const data = useLearning()
  const [params, setParams] = useSearchParams()
  const requested = params.get('level')
  const selected = roadmap.levels.some((level) => level.id === requested) ? requested! : 'all'
  const visibleLevels = roadmap.levels.filter(
    (level) => selected === 'all' || selected === level.id,
  )
  const orderedLessons = visibleLevels.flatMap((level) =>
    level.units.flatMap((unit) =>
      unit.lessons.map((id) => lessonIndex.find((lesson) => lesson.id === id)!),
    ),
  )
  const completed = orderedLessons.filter((lesson) =>
    isCompleted(lessonStatus(lesson, data)),
  ).length
  const nextLesson = orderedLessons.find((lesson) => {
    const status = lessonStatus(lesson, data)
    return !isCompleted(status) && status !== 'locked'
  })
  const dueCount = lessonIndex
    .flatMap((lesson) => lesson.rules)
    .filter((rule) => {
      const review = data.review[`grammar:${rule.id}`]
      return review && new Date(review.due) <= new Date()
    }).length
  const firstReference = visibleLevels[0].steps[0].references[0]
  const nextPath = dueCount
    ? '/review'
    : nextLesson
      ? `/lesson/${nextLesson.id}`
      : `/knowledge/reference/${firstReference.id[0]}?topic=${firstReference.id}`

  return (
    <>
      <PageHeading
        eyebrow="HIỂU CẤU TRÚC · LUYỆN SỬ DỤNG · ÔN ĐỂ NHỚ LÂU"
        title="Lộ trình học ngữ pháp"
        description="Đi từ câu đơn đến diễn đạt linh hoạt. Mỗi chặng có thứ tự học, mục tiêu vận dụng và điểm tự kiểm tra."
      />
      <section className="roadmap-guide" aria-labelledby="roadmap-start">
        <div>
          <span className="roadmap-kicker">BẮT ĐẦU ĐÚNG CHỖ</span>
          <h2 id="roadmap-start">Học chắc từng bước, tiến theo khả năng</h2>
          <p>
            Mới bắt đầu? Đi từ L0. Đã có nền tảng? Đọc điều kiện đầu vào và thử nhiệm vụ cuối chặng;
            quay lại phần chưa tự làm được.
          </p>
          <p className="muted">
            Các nhãn L0–C1 định hướng độ khó ngữ pháp, không thay thế đánh giá năng lực CEFR toàn
            diện. Mỗi mục tra cứu có thể chứa phần nâng cao; hãy theo phạm vi được hướng dẫn ở từng
            bước.
          </p>
        </div>
        <div className="roadmap-next">
          <span className="roadmap-kicker">
            {dueCount ? 'ƯU TIÊN HÔM NAY' : 'GỢI Ý TRONG PHẠM VI ĐANG XEM'}
          </span>
          <h3>
            {dueCount
              ? `${dueCount} điểm kiến thức đến hạn ôn`
              : nextLesson
                ? nextLesson.title
                : 'Học theo các bước bên dưới'}
          </h3>
          <p>
            {dueCount
              ? 'Ôn kiến thức đã học trước khi thêm nội dung mới. Lịch ôn được điều chỉnh theo kết quả luyện tập.'
              : nextLesson
                ? 'Bài thực hành chưa hoàn thành tiếp theo trong các bài đã xuất bản. Hãy kiểm tra nền tảng cần có ở chặng tương ứng.'
                : 'Dùng các mục tra cứu để học theo thứ tự. Bài thực hành cho các chủ đề còn lại đang được bổ sung.'}
          </p>
          <Link className="button" to={nextPath}>
            {dueCount ? 'Ôn tập hôm nay' : nextLesson ? 'Vào bài học' : 'Mở mục tra cứu đầu tiên'}
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="roadmap-method" aria-labelledby="roadmap-method-title">
        <div className="section-heading">
          <h2 id="roadmap-method-title">Một buổi học gợi ý · 30 phút</h2>
          <span className="muted">Có thể chia thành hai buổi ngắn</span>
        </div>
        <ol className="roadmap-session">
          {studySession.map((step, index) => (
            <li key={step.title}>
              <span className="roadmap-kicker">
                0{index + 1} · {step.time}
              </span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
        <div className="roadmap-review-tip">
          <RotateCcw size={20} aria-hidden="true" />
          <p>
            <strong>Ôn cách quãng, rồi luyện trộn.</strong> Quay lại sau vài ngày và những tuần tiếp
            theo. Khi đã hiểu từng cấu trúc, trộn câu cũ và mới để luyện chọn cách dùng. Lịch ôn
            trong ứng dụng bắt đầu sau khi nộp bài.
          </p>
          <Link to="/review">
            Xem lịch ôn <ArrowRight size={15} />
          </Link>
        </div>
        <details className="roadmap-evidence">
          <summary>Cơ sở của cách học và cách tự kiểm tra</summary>
          <p>
            Tự nhớ lại kiến thức, xem phản hồi và học cách quãng giúp tổ chức việc học theo các
            nguyên tắc được tổng hợp trong{' '}
            <a href="https://ies.ed.gov/ncee/wwc/practiceguide/1" target="_blank" rel="noreferrer">
              hướng dẫn của IES về học tập và ghi nhớ
            </a>
            . Thứ tự chủ đề, thời lượng 30 phút và các nhiệm vụ ở đây là gợi ý áp dụng của lộ trình.
          </p>
          <p>
            Trước khi đi tiếp, hãy tự giải thích quy tắc, làm được câu mới không nhìn tài liệu và
            thử lại sau vài ngày. Nếu còn nhầm, xem <Link to="/mistakes">Sổ lỗi sai</Link>, ôn phần
            liên quan rồi thử lại. Nhiệm vụ viết/nói bên dưới dành để tự kiểm tra, chưa được ứng
            dụng chấm điểm.
          </p>
        </details>
      </section>

      <div className="tabs" role="group" aria-label="Chọn cấp độ">
        {['all', ...roadmap.levels.map((level) => level.id)].map((id) => (
          <button
            key={id}
            aria-pressed={selected === id}
            className={selected === id ? 'active' : ''}
            onClick={() => setParams(id === 'all' ? {} : { level: id })}
          >
            {id === 'all' ? 'Tất cả cấp độ' : id}
          </button>
        ))}
      </div>
      <div className="notice">
        <Sprout size={20} aria-hidden="true" />
        <p>
          <strong>{lessonIndex.length} bài có luyện tập · 6 chặng có hướng dẫn và tra cứu.</strong>{' '}
          Tiến độ dưới đây chỉ tính bài đã xuất bản. Hoàn thành các bài này chưa đồng nghĩa hoàn
          thành một cấp độ.
        </p>
      </div>
      {orderedLessons.length > 0 && (
        <div className="roadmap-progress" aria-live="polite">
          <label htmlFor="roadmap-progress">
            Đã hoàn thành {completed}/{orderedLessons.length} bài đã xuất bản{' '}
            {selected === 'all' ? 'trong lộ trình' : `ở ${selected}`}
          </label>
          <progress id="roadmap-progress" value={completed} max={orderedLessons.length} />
        </div>
      )}

      <div className="roadmap-timeline">
        {visibleLevels.map((level) => {
          const available = level.units.flatMap((unit) => unit.lessons)
          return (
            <section
              className={`roadmap-level ${available.length ? '' : 'planned'}`}
              key={level.id}
              aria-labelledby={`level-${level.id}`}
            >
              <div className="level-marker">{level.id}</div>
              <div className="level-content">
                <div className="section-heading">
                  <div>
                    <h2 id={`level-${level.id}`}>{level.title}</h2>
                    <p className="muted">{level.description}</p>
                  </div>
                  <span className="pill neutral">
                    {available.length ? `${available.length} bài có luyện tập` : 'Có mục tra cứu'}
                  </span>
                </div>
                <div className="roadmap-outcomes">
                  <p>
                    <strong>Trước khi học:</strong> {level.entry}
                  </p>
                  <p>
                    <strong>Sau chặng này:</strong> {level.outcome}
                  </p>
                </div>
                <ol className="roadmap-steps">
                  {level.steps.map((step, index) => (
                    <li key={step.title}>
                      <span className="roadmap-step-number" aria-hidden="true">
                        {index + 1}
                      </span>
                      <div>
                        <h3>{step.title}</h3>
                        <p>{step.focus}</p>
                        <details className="roadmap-references">
                          <summary>Đọc {step.references.length} mục tra cứu</summary>
                          <ul>
                            {step.references.map((reference) => (
                              <li key={reference.id}>
                                <Link
                                  to={`/knowledge/reference/${reference.id[0]}?topic=${reference.id}`}
                                >
                                  <BookOpen size={14} aria-hidden="true" />
                                  {reference.title}
                                  <ArrowRight size={14} aria-hidden="true" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </details>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="roadmap-checkpoint">
                  <Target size={21} aria-hidden="true" />
                  <div>
                    <h3>Tự kiểm tra cuối chặng</h3>
                    <p>{level.checkpoint}</p>
                    <small>
                      Thử không nhìn tài liệu, rồi kiểm tra lại sau vài ngày. Quay lại bước còn yếu
                      trước khi tăng độ khó.
                    </small>
                  </div>
                </div>
                {available.length ? (
                  <div className="roadmap-published">
                    <h3>Bài học có luyện tập</h3>
                    {available.map((id) => {
                      const lesson = lessonIndex.find((lesson) => lesson.id === id)!
                      const status = lessonStatus(lesson, data)
                      const missing = lesson.prerequisites.filter(
                        (prerequisite) => !data.readLessons.includes(prerequisite),
                      )
                      return (
                        <div key={id}>
                          <Link to={`/lesson/${id}`} className="roadmap-lesson">
                            <span className="lesson-state">
                              {isCompleted(status) ? (
                                <Check size={22} />
                              ) : status === 'locked' ? (
                                <LockKeyhole size={20} />
                              ) : (
                                <BookOpen size={22} />
                              )}
                            </span>
                            <div>
                              <h4>{lesson.title}</h4>
                              <span>
                                <Clock3 size={13} />
                                {lesson.estimatedMinutes} phút · {lesson.rules.length} điểm kiến
                                thức · {copy.statusLabels[status]}
                              </span>
                            </div>
                            <ArrowRight size={19} />
                          </Link>
                          {missing.length > 0 && (
                            <p className="roadmap-prerequisites">
                              Nên đọc trước:{' '}
                              {missing.map((id, index) => (
                                <span key={id}>
                                  {index > 0 && ', '}
                                  <Link to={`/lesson/${id}`}>
                                    {lessonIndex.find((lesson) => lesson.id === id)!.title}
                                  </Link>
                                </span>
                              ))}
                            </p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="planned-content">
                    Bài học kèm bài tập của chặng này đang được chuẩn bị. Bạn có thể đọc các mục tra
                    cứu ở từng bước và làm nhiệm vụ tự kiểm tra.
                  </p>
                )}
              </div>
            </section>
          )
        })}
      </div>
    </>
  )
}
