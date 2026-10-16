import type { Root } from 'mdast'
import type {} from 'mdast-util-directive'
import { visit } from 'unist-util-visit'
export const containerLabels: Record<string, string> = {
  answer: 'Xem lời giải và cách suy luận',
  formula: 'Công thức',
  rule: 'Quy tắc',
  example: 'Ví dụ',
  note: 'Ghi chú',
  warning: 'Lưu ý & ngoại lệ',
  mistake: 'Lỗi thường gặp',
  tip: 'Mẹo ghi nhớ',
  compare: 'So sánh',
  dialogue: 'Hội thoại',
  recap: 'Ghi nhớ sau bài học',
  pronunciation: 'Phát âm',
}
// remark-directive tokenizes fences before GFM consumes table rows. This custom
// transformer owns the eleven pedagogical container kinds and stable rule anchors.
export function remarkContainers() {
  return (tree: Root) => {
    visit(tree, 'containerDirective', (node) => {
      const label = containerLabels[node.name]
      if (!label) return
      node.data = {
        ...node.data,
        hName: 'aside',
        hProperties: {
          className: ['callout', `callout-${node.name}`],
          'data-kind': node.name,
          'aria-label': label,
        },
      }
    })
    visit(tree, 'heading', (node) => {
      const last = node.children.at(-1)
      if (last?.type !== 'text') return
      const anchor = last.value.match(/\s*\{#([^}]+)\}$/)
      if (anchor) {
        last.value = last.value.replace(anchor[0], '')
        node.data = { ...node.data, hProperties: { id: anchor[1] } }
      }
    })
  }
}
