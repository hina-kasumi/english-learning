import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive'
import { Link } from 'react-router-dom'
import { Volume2 } from 'lucide-react'
import { useLearning } from '../features/progress/store'
import { remarkContainers, containerLabels } from '../lib/markdown'
import type { ComponentPropsWithoutRef } from 'react'
import type { ExtraProps } from 'react-markdown'
function Callout({ children, node, ...props }: ComponentPropsWithoutRef<'aside'> & ExtraProps) {
  const settings = useLearning((s) => s.settings)
  const kind = String(node?.properties?.['data-kind'] ?? node?.properties?.dataKind ?? '')
  const spokenText = (element: HTMLElement) => {
    const text = [...element.querySelectorAll('p,li')]
      .map((p) => p.textContent?.split(' | ')[0] ?? '')
      .join(' ')
    const speech = new SpeechSynthesisUtterance(text)
    speech.lang = settings.voice
    speech.rate = settings.rate
    const voice = speechSynthesis.getVoices().find((v) => v.lang === settings.voice)
    if (voice) speech.voice = voice
    speechSynthesis.cancel()
    speechSynthesis.speak(speech)
  }
  if (kind === 'answer')
    return (
      <details className="lesson-answer">
        <summary>Xem lời giải và cách suy luận</summary>
        {children}
      </details>
    )
  return (
    <aside {...props}>
      <div className="callout-label">
        <span>
          {kind === 'example' ? '↗' : kind === 'warning' || kind === 'mistake' ? '!' : '◇'}{' '}
          {containerLabels[kind] ?? 'Ghi chú'}
        </span>
        {kind === 'example' && 'speechSynthesis' in window && (
          <button
            className="icon-button"
            aria-label="Nghe ví dụ"
            onClick={(e) => spokenText(e.currentTarget.closest('aside')!)}
          >
            <Volume2 size={16} />
          </button>
        )}
      </div>
      {children}
    </aside>
  )
}
export default function Markdown({ content }: { content: string }) {
  const translations = useLearning((s) => s.settings.translations)
  const displayed = translations
    ? content
    : content.replace(
        /(^:::example\n)([\s\S]*?)(\n:::)/gm,
        (_all, start: string, body: string, end: string) =>
          start +
          body
            .split('\n')
            .map((line) => line.split(' | ')[0])
            .join('\n') +
          end,
      )
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkDirective, remarkContainers]}
        components={{
          aside: Callout,
          a: ({ href, children }) =>
            href?.startsWith('/') ? (
              <Link to={href}>{children}</Link>
            ) : (
              <a href={href} target="_blank" rel="noreferrer">
                {children}
              </a>
            ),
          table: ({ children }) => (
            <div className="table-scroll">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {displayed}
      </ReactMarkdown>
    </div>
  )
}
