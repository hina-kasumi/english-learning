import type { Answer, ExerciseType, Question } from '../../types/content'
import { Check, GripVertical, X } from 'lucide-react'
type Props = {
  question: Question
  answer: Answer
  onChange: (answer: Answer) => void
  disabled?: boolean
}
const record = (a: Answer): Record<string, string> =>
  typeof a === 'object' && !Array.isArray(a) ? a : {}
function Choices({ question: q, answer, onChange }: Props) {
  return (
    <div className="answer-options">
      {q.options?.map((o, i) => (
        <label key={o.id} className={`answer-option ${answer === o.id ? 'chosen' : ''}`}>
          <input
            type="radio"
            name={q.id}
            value={o.id}
            checked={answer === o.id}
            onChange={() => onChange(o.id)}
          />
          <span className="option-letter">{String.fromCharCode(65 + i)}</span>
          <span>{o.text}</span>
          {answer === o.id && <Check size={18} />}
        </label>
      ))}
    </div>
  )
}
function MultiSelect({ question: q, answer, onChange }: Props) {
  const selected = Array.isArray(answer) ? answer : []
  return (
    <div className="answer-options">
      {q.options?.map((o) => (
        <label className={`answer-option ${selected.includes(o.id) ? 'chosen' : ''}`} key={o.id}>
          <input
            type="checkbox"
            checked={selected.includes(o.id)}
            onChange={() =>
              onChange(
                selected.includes(o.id) ? selected.filter((a) => a !== o.id) : [...selected, o.id],
              )
            }
          />
          <span>{o.text}</span>
        </label>
      ))}
    </div>
  )
}
function TextInput({ question: q, answer, onChange }: Props) {
  return (
    <label className="answer-text-label">
      Câu trả lời của bạn
      <input
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        className="answer-text"
        aria-label="Câu trả lời của bạn"
        value={typeof answer === 'string' ? answer : ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          q.type === 'transformation' || q.type === 'sentence-completion'
            ? 'Viết câu trả lời…'
            : 'Nhập phần còn thiếu…'
        }
      />
    </label>
  )
}
function Dropdown({ question: q, answer, onChange }: Props) {
  return (
    <label className="answer-text-label">
      Từ hoặc cụm từ phù hợp
      <select
        className="answer-text"
        value={typeof answer === 'string' ? answer : ''}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          Chọn đáp án…
        </option>
        {q.options?.map((o) => (
          <option key={o.id} value={o.id}>
            {o.text}
          </option>
        ))}
      </select>
    </label>
  )
}
function ErrorCorrection({ question: q, answer, onChange }: Props) {
  const a = record(answer)
  return (
    <div>
      <p className="muted input-hint">1. Chọn từ sai trong câu.</p>
      <div className="token-pool">
        {q.tokens?.map((word, i) => (
          <button
            type="button"
            key={i}
            className={`word-token ${a.index === String(i) ? 'chosen' : ''}`}
            onClick={() => onChange({ ...a, index: String(i) })}
            aria-pressed={a.index === String(i)}
          >
            {word}
          </button>
        ))}
      </div>
      <label className="answer-text-label">
        2. Nhập từ hoặc cụm từ thay thế
        <input
          className="answer-text"
          autoComplete="off"
          value={a.correction ?? ''}
          onChange={(e) => onChange({ ...a, correction: e.target.value })}
        />
      </label>
    </div>
  )
}
function Reorder({ question: q, answer, onChange, disabled }: Props) {
  const chosen = Array.isArray(answer) ? answer : []
  const used = [...chosen]
  const remaining =
    q.tokens
      ?.map((word, index) => {
        const found = used.indexOf(word)
        if (found >= 0) {
          used.splice(found, 1)
          return null
        }
        return { word, index }
      })
      .filter((v): v is { word: string; index: number } => v !== null) ?? []
  const move = (payload: string, target: number) => {
    if (disabled) return
    const [origin, value] = payload.split(':')
    const index = Number(value)
    if (!Number.isInteger(index)) return
    const next = [...chosen]
    if (origin === 'chosen' && index >= 0 && index < chosen.length) {
      const [word] = next.splice(index, 1)
      next.splice(Math.min(target, next.length), 0, word)
      onChange(next)
    } else if (origin === 'pool' && remaining.some((r) => r.index === index)) {
      next.splice(target, 0, q.tokens![index])
      onChange(next)
    }
  }
  return (
    <div>
      <p className="muted input-hint">
        Chạm các từ theo thứ tự. Chạm từ đã chọn để bỏ ra, hoặc kéo để đổi vị trí.
      </p>
      <div
        className="reorder-answer"
        aria-label="Câu đang sắp xếp"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          move(e.dataTransfer.getData('text/plain'), chosen.length)
        }}
      >
        {chosen.length ? (
          chosen.map((word, i) => (
            <button
              type="button"
              className="word-token chosen"
              key={i}
              draggable={!disabled}
              onDragStart={(e) => e.dataTransfer.setData('text/plain', `chosen:${i}`)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                e.stopPropagation()
                move(e.dataTransfer.getData('text/plain'), i)
              }}
              onClick={() => onChange(chosen.filter((_, j) => i !== j))}
              aria-label={`Bỏ ${word} khỏi vị trí ${i + 1}`}
            >
              {word}
              <X size={12} />
            </button>
          ))
        ) : (
          <span>Câu của bạn sẽ xuất hiện ở đây…</span>
        )}
      </div>
      <div className="token-pool">
        {remaining.map(({ word, index }) => (
          <button
            type="button"
            className="word-token"
            key={index}
            draggable={!disabled}
            onDragStart={(e) => e.dataTransfer.setData('text/plain', `pool:${index}`)}
            onClick={() => onChange([...chosen, word])}
          >
            <GripVertical size={13} />
            {word}
          </button>
        ))}
      </div>
    </div>
  )
}
function GroupItems({ question: q, answer, onChange }: Props) {
  const a = record(answer)
  return (
    <div className="matching-items">
      {q.items?.map((item) => (
        <label key={item.id}>
          <span>{item.text}</span>
          <span aria-hidden="true">→</span>
          <select
            aria-label={`Đáp án cho ${item.text}`}
            value={a[item.id] ?? ''}
            onChange={(e) => onChange({ ...a, [item.id]: e.target.value })}
          >
            <option value="" disabled>
              Chọn {q.type === 'classify' ? 'nhóm' : 'cặp'}…
            </option>
            {q.groups?.map((g) => (
              <option key={g.id} value={g.id}>
                {g.text}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  )
}
function Cloze({ question: q, answer, onChange }: Props) {
  const a = record(answer)
  return (
    <div className="cloze-inputs">
      {q.blanks?.map((b) => (
        <label key={b.id}>
          <span>{b.label}</span>
          {b.options ? (
            <select
              aria-label={b.label}
              value={a[b.id] ?? ''}
              onChange={(e) => onChange({ ...a, [b.id]: e.target.value })}
            >
              <option value="" disabled>
                Chọn…
              </option>
              {b.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ) : (
            <input
              autoComplete="off"
              aria-label={b.label}
              value={a[b.id] ?? ''}
              onChange={(e) => onChange({ ...a, [b.id]: e.target.value })}
            />
          )}
        </label>
      ))}
    </div>
  )
}
// Adding a renderer and grader registers a new exercise without changing the session engine.
const renderers: Record<ExerciseType, (props: Props) => React.ReactNode> = {
  'multiple-choice': Choices,
  'multiple-select': MultiSelect,
  'fill-blank': TextInput,
  'fill-blank-choice': Dropdown,
  'verb-form': TextInput,
  'error-correction': ErrorCorrection,
  'reorder-words': Reorder,
  transformation: TextInput,
  matching: GroupItems,
  'true-false': Choices,
  classify: GroupItems,
  cloze: Cloze,
  'translation-choice': Choices,
  'sentence-completion': TextInput,
}
export default function QuestionInput(props: Props) {
  const Renderer = renderers[props.question.type]
  return (
    <fieldset disabled={props.disabled} className="question-input">
      <legend className="sr-only">{props.question.prompt}</legend>
      <Renderer {...props} />
    </fieldset>
  )
}
