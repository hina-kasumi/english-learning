import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, BookOpen, Check, Clock3, LockKeyhole, Sprout } from 'lucide-react'
import { PageHeading } from '../../app/Layout'
import { lessonIndex, roadmap } from '../../lib/content'
import { useLearning, lessonStatus } from '../progress/store'
import copy from '../../../content/interface.json'
export default function Roadmap() {
  const data = useLearning()
  const [params, setParams] = useSearchParams()
  const selected = params.get('level') ?? 'all'
  return (
    <>
      <PageHeading
        eyebrow="MỖI BƯỚC ĐỀU CÓ Ý NGHĨA"
        title="Lộ trình của bạn"
        description="Từ những câu đầu tiên đến cách diễn đạt tự tin và chính xác."
      />
      <div className="tabs" aria-label="Chọn cấp độ">
        {['all', ...roadmap.levels.map((l) => l.id)].map((id) => (
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
        <Sprout size={20} />
        <p>
          <strong>Hiện có {lessonIndex.length} bài học để bắt đầu.</strong> Các chủ đề tiếp theo
          đang được chuẩn bị. Bạn có thể học bất kỳ bài đã mở nào; lộ trình sẽ nhắc những kiến thức
          nên học trước.
        </p>
      </div>
      <div className="roadmap-timeline">
        {roadmap.levels
          .filter((l) => selected === 'all' || selected === l.id)
          .map((level) => {
            const available = level.units.flatMap((u) => u.lessons)
            return (
              <section
                className={`roadmap-level ${available.length ? '' : 'planned'}`}
                key={level.id}
              >
                <div className="level-marker">{level.id}</div>
                <div className="level-content">
                  <div className="section-heading">
                    <div>
                      <h2>{level.title}</h2>
                      <p className="muted">{level.description}</p>
                    </div>
                    <span className="pill neutral">
                      {available.length ? `${available.length} bài mẫu` : 'Đang chuẩn bị'}
                    </span>
                  </div>
                  {level.units.map((unit) => (
                    <div key={unit.id}>
                      <div className="unit-title">{unit.title}</div>
                      {unit.lessons.map((id) => {
                        const lesson = lessonIndex.find((l) => l.id === id)!
                        const status = lessonStatus(lesson, data)
                        return (
                          <Link key={id} to={`/lesson/${id}`} className="roadmap-lesson">
                            <span className="lesson-state">
                              {['mastered', 'completed'].includes(status) ? (
                                <Check size={22} />
                              ) : status === 'locked' ? (
                                <LockKeyhole size={20} />
                              ) : (
                                <BookOpen size={22} />
                              )}
                            </span>
                            <div>
                              <h3>{lesson.title}</h3>
                              <span>
                                <Clock3 size={13} />
                                {lesson.estimatedMinutes} phút · {lesson.rules.length} điểm kiến
                                thức · {copy.statusLabels[status]}
                              </span>
                            </div>
                            <ArrowRight size={19} />
                          </Link>
                        )
                      })}
                    </div>
                  ))}
                  {!available.length && (
                    <div className="planned-content">
                      Nội dung chưa xuất bản. Theo dõi curriculum trong bản đặc tả của dự án.
                    </div>
                  )}
                </div>
              </section>
            )
          })}
      </div>
      <div className="coming-modules">
        <h2>Một nền tảng, nhiều kỹ năng</h2>
        <div>
          {roadmap.tracks
            .filter((t) => !t.available)
            .map((t) => (
              <span key={t.id}>
                {t.title}
                <small>Sắp ra mắt</small>
              </span>
            ))}
        </div>
      </div>
    </>
  )
}
