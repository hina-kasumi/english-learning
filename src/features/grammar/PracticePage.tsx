import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArrowRight, Check, ChevronLeft, Clock3, RotateCcw, Shuffle, Target, X } from 'lucide-react'
import { PageHeading, Loading } from '../../app/Layout'
import { lessonIndex, loadExercises } from '../../lib/content'
import { useAsync } from '../../lib/useAsync'
import { correctAnswer, grade, shuffle } from '../../lib/grading'
import { useLearning } from '../progress/store'
import type { Answer, ExerciseSet, Question } from '../../types/content'
import QuestionInput from './QuestionInput'
import copy from '../../../content/interface.json'
function ready(q: Question, answer: Answer) {
  if (q.type === 'reorder-words') return Array.isArray(answer) && answer.length === q.tokens?.length
  if (q.type === 'multiple-select') return Array.isArray(answer) && answer.length > 0
  if (q.type === 'error-correction')
    return (
      typeof answer === 'object' &&
      !Array.isArray(answer) &&
      answer.index !== undefined &&
      !!answer.correction?.trim()
    )
  if (q.items)
    return (
      typeof answer === 'object' && !Array.isArray(answer) && q.items.every((i) => !!answer[i.id])
    )
  if (q.blanks)
    return (
      typeof answer === 'object' &&
      !Array.isArray(answer) &&
      q.blanks.every((b) => !!answer[b.id]?.trim())
    )
  return typeof answer === 'string' && !!answer.trim()
}
export function PracticeLibrary() {
  return (
    <>
      <PageHeading
        eyebrow="HIỂU QUA TỪNG LẦN THỬ"
        title="Góc luyện tập"
        description="Chọn một bài, thử sức và hiểu vì sao mỗi đáp án đúng."
      />
      <div className="practice-library">
        {lessonIndex
          .filter((l) => l.practiceMode === 'graded')
          .map((l) => (
            <PracticeCard key={l.id} id={l.id} />
          ))}
      </div>
    </>
  )
}
function PracticeCard({ id }: { id: string }) {
  const lesson = lessonIndex.find((l) => l.id === id)!
  const { data, error } = useAsync(() => loadExercises(id), id)
  return (
    <section className="panel">
      <div className="inline-tags">
        <span className="pill">{lesson.level}</span>
        <span className="muted">{lesson.rules.length} điểm kiến thức</span>
      </div>
      <h2>{lesson.title}</h2>
      <p className="muted">{lesson.summary}</p>
      {!data ? (
        <Loading error={error} />
      ) : (
        <div className="exercise-set-list">
          {data.sets.map((s) => (
            <Link to={`/practice/${id}/${s.id}`} key={s.id}>
              <div>
                <strong>{s.title}</strong>
                <span>
                  {s.questions.length} câu ·{' '}
                  {s.kind === 'mixed' ? 'Tổng hợp nhiều dạng bài' : 'Luyện theo rule'}
                </span>
              </div>
              <ArrowRight size={17} />
            </Link>
          ))}
        </div>
      )}
      <Link className="text-link" to={`/lesson/${id}`}>
        Đọc lại lý thuyết
      </Link>
    </section>
  )
}
export default function PracticePage() {
  const { id = '', setId = '' } = useParams()
  const [params] = useSearchParams()
  const { data, error } = useAsync(() => loadExercises(id), id)
  const mistakes = useLearning((s) => s.mistakes),
    review = useLearning((s) => s.review)
  if (!data) return <Loading error={error} />
  const set = data.sets.find((s) => s.id === setId)
  if (!set) return <Loading error="Không tìm thấy bộ bài tập này." />
  const wrong = params.has('wrong'),
    due = params.has('due')
  const questions = wrong
    ? data.sets.flatMap((s) => s.questions).filter((q) => mistakes[`grammar:${q.id}`])
    : due
      ? data.sets
          .flatMap((s) => s.questions)
          .filter((q) =>
            q.ruleIds.some(
              (r) => review[`grammar:${r}`] && new Date(review[`grammar:${r}`].due) <= new Date(),
            ),
          )
      : set.questions
  return (
    <PracticeSession
      key={`${id}:${setId}:${wrong}:${due}`}
      id={id}
      set={set}
      initialQuestions={questions}
      reviewMode={wrong || due}
    />
  )
}
function PracticeSession({
  id,
  set,
  initialQuestions,
  reviewMode,
}: {
  id: string
  set: ExerciseSet
  initialQuestions: Question[]
  reviewMode: boolean
}) {
  const [original] = useState(initialQuestions)
  const [questions, setQuestions] = useState(initialQuestions)
  const [mode, setMode] = useState<'practice' | 'exam'>('practice')
  const [random, setRandom] = useState(false)
  const [seed, setSeed] = useState(2026)
  const [phase, setPhase] = useState<'setup' | 'running' | 'result'>('setup')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [checked, setChecked] = useState<string[]>([])
  const [started, setStarted] = useState(0)
  const [duration, setDuration] = useState(0)
  const recordAttempt = useLearning((s) => s.recordAttempt)
  const translations = useLearning((s) => s.settings.translations)
  const lesson = lessonIndex.find((l) => l.id === id)!
  const begin = (source: Question[], nextSeed = seed) => {
    const next = random
      ? shuffle(source, nextSeed).map((q, i) => ({
          ...q,
          options: q.options ? shuffle(q.options, nextSeed + i) : undefined,
        }))
      : source
    setQuestions(next)
    setAnswers({})
    setChecked([])
    setIndex(0)
    setStarted(Date.now())
    setPhase('running')
  }
  const finish = () => {
    const seconds = Math.round((Date.now() - started) / 1000)
    setDuration(seconds)
    recordAttempt({
      id: crypto.randomUUID(),
      lessonId: id,
      setId: set.id,
      kind: reviewMode || questions.length !== original.length ? 'review' : set.kind,
      at: new Date().toISOString(),
      seconds,
      responses: questions.map((q) => ({
        questionId: q.id,
        ruleIds: q.ruleIds,
        correct: grade(q, answers[q.id] ?? ''),
        difficulty: q.difficulty,
      })),
    })
    setPhase('result')
  }
  const q = questions[index]
  const answer = q ? (answers[q.id] ?? '') : ''
  const isChecked = q ? checked.includes(q.id) : false
  const correct = questions.filter((q) => grade(q, answers[q.id] ?? ''))
  const wrong = questions.filter((q) => !grade(q, answers[q.id] ?? ''))
  if (!original.length)
    return (
      <div className="empty-state">
        <Check size={36} />
        <h1>Hiện chưa có câu cần ôn</h1>
        <p>Tiếp tục luyện tập để xây nền tảng.</p>
        <Link className="button" to="/practice">
          Chọn bộ bài tập
        </Link>
      </div>
    )
  return (
    <div className="practice-page">
      <Link className="back-link" to={`/lesson/${id}`}>
        <ChevronLeft size={16} />
        {lesson.title}
      </Link>
      <PageHeading
        title={reviewMode ? 'Ôn lại để nhớ lâu' : set.title}
        description={`${questions.length} câu hỏi · ${lesson.level} · Giải thích theo từng điểm kiến thức`}
      />
      {phase === 'setup' && (
        <section className="practice-setup panel">
          <span className="setup-icon">
            <Target size={32} />
          </span>
          <h2>Một lần luyện, thêm một lần hiểu.</h2>
          <p>{set.instruction}</p>
          <fieldset className="mode-options">
            <legend>Chọn cách luyện tập</legend>
            <label className={mode === 'practice' ? 'chosen' : ''}>
              <input
                type="radio"
                name="mode"
                checked={mode === 'practice'}
                onChange={() => setMode('practice')}
              />
              <strong>Học từng câu</strong>
              <span>Chấm ngay và đọc lời giải sau mỗi câu.</span>
            </label>
            <label className={mode === 'exam' ? 'chosen' : ''}>
              <input
                type="radio"
                name="mode"
                checked={mode === 'exam'}
                onChange={() => setMode('exam')}
              />
              <strong>Thi thử</strong>
              <span>Nhận điểm và lời giải sau khi nộp bài.</span>
            </label>
          </fieldset>
          <label className="checkbox-row">
            <input type="checkbox" checked={random} onChange={(e) => setRandom(e.target.checked)} />
            <Shuffle size={16} />
            Trộn thứ tự câu hỏi và đáp án
          </label>
          {random && (
            <label className="seed-field">
              Mã trộn (cùng mã → cùng thứ tự)
              <input
                type="number"
                min="0"
                max="4294967295"
                value={seed}
                onChange={(e) => setSeed(Number(e.target.value) >>> 0)}
              />
            </label>
          )}
          <button className="button" onClick={() => begin(original)}>
            Bắt đầu luyện tập
            <ArrowRight size={17} />
          </button>
        </section>
      )}
      {phase === 'running' && q && (
        <>
          <div className="exercise-progress">
            <div>
              <span>
                Câu {index + 1} <span className="muted">/ {questions.length}</span>
              </span>
              <span>{mode === 'exam' ? 'Thi thử · Chấm cuối bài' : 'Luyện tập · Chấm ngay'}</span>
            </div>
            <div className="progress-track">
              <span style={{ width: `${(index / questions.length) * 100}%` }} />
            </div>
          </div>
          <form
            className="question-card"
            onSubmit={(e) => {
              e.preventDefault()
              if (!ready(q, answer)) return
              if (mode === 'practice' && !isChecked) {
                setChecked([...checked, q.id])
                return
              }
              if (index === questions.length - 1) finish()
              else setIndex(index + 1)
            }}
          >
            <div className="inline-tags">
              <span className="pill">{copy.typeLabels[q.type]}</span>
              <span className="difficulty">
                {['', 'Cơ bản', 'Vận dụng', 'Thử thách'][q.difficulty]}
              </span>
            </div>
            <h2>{q.prompt}</h2>
            {translations && q.translation && (
              <p className="question-translation">{q.translation}</p>
            )}
            <QuestionInput
              question={q}
              answer={answer}
              onChange={(a) => setAnswers({ ...answers, [q.id]: a })}
              disabled={isChecked && mode === 'practice'}
            />
            {isChecked && mode === 'practice' && (
              <Feedback question={q} answer={answer} lessonId={id} />
            )}
            <div className="question-actions">
              <span className="keyboard-hint">
                Enter ↵ để {isChecked ? 'tiếp tục' : 'xác nhận'}
              </span>
              {mode === 'exam' && index > 0 && (
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => setIndex(index - 1)}
                >
                  Câu trước
                </button>
              )}
              <button className="button" disabled={!ready(q, answer)} type="submit">
                {mode === 'practice' && !isChecked
                  ? 'Kiểm tra đáp án'
                  : index === questions.length - 1
                    ? 'Nộp bài'
                    : 'Câu tiếp theo'}
                <ArrowRight size={17} />
              </button>
            </div>
          </form>
        </>
      )}
      {phase === 'result' && (
        <>
          <section className="result-card panel">
            <span className="setup-icon">
              <Check size={32} />
            </span>
            <div className="eyebrow">MỘT BƯỚC TIẾN MỚI</div>
            <h2>
              {correct.length / questions.length >= 0.7
                ? 'Bạn đang làm rất tốt!'
                : 'Mỗi lỗi sai là một điều mới để học.'}
            </h2>
            <div className="result-score">
              {Math.round((correct.length / questions.length) * 100)}
              <span>%</span>
            </div>
            <p>
              {correct.length}/{questions.length} câu đúng{' '}
              <span className="result-time">
                <Clock3 size={15} />
                {Math.floor(duration / 60)} phút {duration % 60} giây
              </span>
            </p>
            <div className="result-actions">
              {wrong.length > 0 && (
                <button className="button" onClick={() => begin(wrong)}>
                  Làm lại {wrong.length} câu sai
                  <RotateCcw size={16} />
                </button>
              )}
              <button className="button secondary" onClick={() => begin(original)}>
                Làm lại toàn bộ
              </button>
              <button
                className="button secondary"
                onClick={() => {
                  const next = seed + 1
                  setSeed(next)
                  setRandom(true)
                  setPhase('setup')
                }}
              >
                <Shuffle size={16} />
                Trộn bài mới
              </button>
            </div>
            <Link to={`/lesson/${id}`} className="text-link">
              Quay lại bài học
            </Link>
          </section>
          <section className="panel">
            <h2>Bạn nắm từng quy tắc thế nào?</h2>
            <div className="rule-results">
              {lesson.rules
                .filter((r) => questions.some((q) => q.ruleIds.includes(r.id)))
                .map((rule) => {
                  const all = questions.filter((q) => q.ruleIds.includes(rule.id))
                  const right = all.filter((q) => grade(q, answers[q.id] ?? '')).length
                  return (
                    <Link to={`/lesson/${id}?rule=${rule.id}`} key={rule.id}>
                      <span>{rule.label}</span>
                      <span className={`pill ${right / all.length >= 0.8 ? '' : 'warn'}`}>
                        {right}/{all.length} đúng
                      </span>
                      <ArrowRight size={16} />
                    </Link>
                  )
                })}
            </div>
          </section>
          <section>
            <div className="section-heading">
              <h2>{mode === 'exam' ? 'Đáp án và giải thích' : 'Những câu cần xem lại'}</h2>
            </div>
            {(mode === 'exam' ? questions : wrong).map((q) => (
              <article className="review-question" key={q.id}>
                <h3>{q.prompt}</h3>
                <p className="muted">Bạn đã chọn: {showAnswer(q, answers[q.id] ?? '')}</p>
                <Feedback question={q} answer={answers[q.id] ?? ''} lessonId={id} />
              </article>
            ))}
            {mode === 'practice' && !wrong.length && (
              <p className="muted">Bạn đã trả lời đúng tất cả các câu trong lượt này.</p>
            )}
          </section>
        </>
      )}
    </div>
  )
}
function showAnswer(q: Question, answer: Answer) {
  if (typeof answer === 'string') return q.options?.find((o) => o.id === answer)?.text ?? answer
  if (Array.isArray(answer))
    return answer.map((a) => q.options?.find((o) => o.id === a)?.text ?? a).join(' · ')
  if (q.type === 'error-correction')
    return `${q.tokens?.[Number(answer.index)] ?? ''} → ${answer.correction ?? ''}`
  if (q.items)
    return q.items
      .map(
        (item) =>
          `${item.text} → ${q.groups?.find((g) => g.id === answer[item.id])?.text ?? 'Chưa trả lời'}`,
      )
      .join(' · ')
  if (q.blanks)
    return q.blanks
      .map((blank) => `${blank.label}: ${answer[blank.id] ?? 'Chưa trả lời'}`)
      .join(' · ')
  return Object.values(answer).join(' · ')
}
function Feedback({
  question: q,
  answer,
  lessonId,
}: {
  question: Question
  answer: Answer
  lessonId: string
}) {
  const correct = grade(q, answer)
  const lesson = lessonIndex.find((l) => l.id === lessonId)
  const hint = typeof answer === 'string' ? q.wrongAnswerHints?.[answer] : undefined
  return (
    <div className={`feedback ${correct ? 'correct' : 'incorrect'}`} role="status">
      <strong>
        {correct ? <Check size={18} /> : <X size={18} />}{' '}
        {correct ? 'Chính xác!' : 'Cùng xem lại một chút.'}
      </strong>
      {!correct && (
        <p>
          <b>Đáp án:</b> {correctAnswer(q)}
        </p>
      )}
      <p>{hint ?? q.explanation}</p>
      <div className="feedback-links">
        {q.ruleIds.map((r) => (
          <Link key={r} to={`/lesson/${lessonId}?rule=${r}`}>
            Xem lại: {lesson?.rules.find((rule) => rule.id === r)?.label ?? r}
            <ArrowRight size={13} />
          </Link>
        ))}
      </div>
    </div>
  )
}
