import { test, expect } from '@playwright/test'
import { readContent } from '../scripts/content-utils'
import { initialData } from '../src/lib/storage'
const { lessons } = readContent()
const reading = lessons.filter((l) => l.practiceMode === 'self-check')
const topicLesson = (code: string) =>
  reading.find((l) => l.rules.some((r) => r.appendixCodes?.includes(code)))!

test('all migrated lessons open without exercise files and render distinct examples and answers', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const lesson of reading) {
    await page.goto(`/#/lesson/${lesson.id}`)
    await expect(
      page.getByRole('heading', { name: lesson.title, exact: true, level: 1 }),
    ).toBeVisible()
    await expect(page.locator('.callout-example')).toHaveCount(lesson.rules.length * 3)
    await expect(page.locator('.lesson-answer')).toHaveCount(lesson.rules.length)
    await expect(page.locator('.lesson-answer[open]')).toHaveCount(0)
    await expect(page.locator('.lesson-article')).not.toContainText(':::')
    await expect(page.getByRole('link', { name: 'Luyện tập ngay', exact: true })).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  expect(errors).toEqual([])
})

test('lesson search, filters, deep links, self-check disclosure and progress persist', async ({
  page,
}, info) => {
  await page.goto('/#/knowledge')
  await expect(page.getByRole('heading', { name: 'Thư viện bài học' })).toBeVisible()
  await expect(page.getByText('Mục tra cứu', { exact: true })).toHaveCount(0)
  await page.getByLabel('Nhóm ngữ pháp', { exact: true }).selectOption('H')
  await page.getByLabel('Cấp độ', { exact: true }).selectOption('B2')
  await expect(page.locator('.knowledge-card')).toHaveCount(1)
  await page.reload()
  await expect(page.getByLabel('Nhóm ngữ pháp', { exact: true })).toHaveValue('H')
  await page.getByLabel('Tìm kiếm bài học').fill('dao ngu dieu kien')
  const card = page
    .locator('.knowledge-card')
    .filter({ has: page.getByRole('heading', { name: 'Đảo ngữ điều kiện', exact: true }) })
  await card.getByRole('button').click()
  await card.getByRole('link').click()
  const lesson = topicLesson('H.03')
  const rule = lesson.rules.find((r) => r.appendixCodes?.includes('H.03'))!
  await expect(page.locator(`[id="${rule.id}"]`)).toBeInViewport()
  const answer = page.locator('.lesson-answer').nth(1)
  await answer.locator('summary').click()
  await expect(answer).toHaveAttribute('open', '')
  await expect(answer).toContainText('Had I known')
  await page.getByLabel('Ghi chú của bạn').fill('Had + chủ ngữ + V3')
  await page.getByRole('button', { name: 'Tôi đã đọc xong', exact: true }).click()
  await page.reload()
  await expect(page.getByLabel('Ghi chú của bạn')).toHaveValue('Had + chủ ngữ + V3')
  await expect(page.getByRole('button', { name: 'Đã đọc xong bài', exact: true })).toBeVisible()
  const stored = await page.evaluate(
    () => JSON.parse(localStorage.getItem('gramio-learning')!).state,
  )
  expect(stored.readLessons).toContain(lesson.id)
  expect(stored.attempts).toHaveLength(0)
  expect(stored.review).toEqual({})
  await page.goto('/#/knowledge')
  await page.getByRole('button', { name: 'Đã đánh dấu', exact: true }).click()
  await expect(page.locator('.knowledge-card')).toHaveCount(1)
  await expect(page.locator('.knowledge-card')).toContainText('Đảo ngữ điều kiện')
  await page.screenshot({ path: `test-results/lessons-${info.project.name}.png`, fullPage: true })
})

test('legacy reference links and saved topics resolve to real lesson anchors', async ({ page }) => {
  const data = initialData()
  data.bookmarks = ['reference:F.04']
  await page.addInitScript((data) => {
    if (!localStorage.getItem('gramio-learning'))
      localStorage.setItem('gramio-learning', JSON.stringify({ state: data, version: 1 }))
  }, data)
  const lesson = topicLesson('F.04')
  const rule = lesson.rules.find((r) => r.appendixCodes?.includes('F.04'))!
  await page.goto('/#/knowledge/reference/F?topic=F.04')
  await expect(page).toHaveURL(
    new RegExp(`/lesson/${lesson.id}\\?rule=${rule.id.replaceAll('.', '\\.')}$`),
  )
  await expect(page.locator(`[id="${rule.id}"]`)).toBeInViewport()
  await page.reload()
  await expect(page.locator(`[id="${rule.id}"]`)).toBeInViewport()
  await page.goto('/#/knowledge')
  await page.getByRole('button', { name: 'Đã đánh dấu', exact: true }).click()
  await expect(page.locator('.knowledge-card')).toHaveCount(1)
  await page.locator('.knowledge-card button').click()
  await expect(page.locator('.knowledge-card')).toHaveCount(0)
  await page.goto('/#/knowledge/reference/F')
  await expect(page.getByLabel('Nhóm ngữ pháp', { exact: true })).toHaveValue('F')
  await page.goto('/#/practice')
  await expect(page.locator('.practice-library > .panel')).toHaveCount(3)
  await expect(page.getByRole('alert')).toHaveCount(0)
})
