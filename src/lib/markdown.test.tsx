import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive'
import { remarkContainers, containerLabels } from './markdown'
import { readContent } from '../../scripts/content-utils'
describe('Spec Markdown rendering', () => {
  const render = (body: string) =>
    renderToStaticMarkup(
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkDirective, remarkContainers]}>
        {body}
      </ReactMarkdown>,
    )
  it.each(Object.keys(containerLabels))('renders %s as an accessible labelled aside', (kind) => {
    const html = render(`:::${kind}\nAn **example** | Một ví dụ\n:::`)
    expect(html).toContain(`<aside`)
    expect(html).toContain(`callout-${kind}`)
    expect(html).toContain('aria-label=')
    expect(html).toContain('<strong>example</strong>')
    expect(html).not.toContain(':::')
  })
  it('retains GFM tables inside containers and rule anchors', () => {
    const html = render('## Rule {#L0-01.01}\n\n:::rule\n| A | B |\n|---|---|\n| 1 | 2 |\n:::')
    expect(html).toContain('id="L0-01.01"')
    expect(html).toContain('<table>')
    expect(html).toContain('callout-rule')
    expect(html).not.toContain(':::')
  })
  it('renders every published rule and example without leaking raw syntax', () => {
    for (const lesson of readContent().lessons) {
      const html = render(lesson.body)
      expect(html).not.toContain(':::')
      expect(html).not.toContain('{#')
      for (const rule of lesson.rules) expect(html).toContain(`id="${rule.id}"`)
      expect((html.match(/callout-example/g) ?? []).length).toBe(
        (lesson.body.match(/^:::example$/gm) ?? []).length,
      )
    }
  })
  it('does not execute user-authored raw HTML', () =>
    expect(render('<script>alert(1)</script>')).not.toContain('<script>'))
})
