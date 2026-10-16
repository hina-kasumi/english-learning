import { test, expect } from '@playwright/test'
import { readReferences } from '../scripts/reference-utils'
const chapters = readReferences()

test('browse all 17 chapters with real topic content and usable mobile tables', async ({
  page,
}, info) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto('/#/knowledge')
  await expect(page.locator('.reference-chapter')).toHaveCount(17)
  await page.screenshot({ path: `test-results/knowledge-${info.project.name}.png`, fullPage: true })
  for (const chapter of chapters) {
    await page.goto(`/#/knowledge/reference/${chapter.id}`)
    await expect(
      page.getByRole('heading', { name: chapter.title, exact: true, level: 1 }),
    ).toBeVisible()
    await expect(page.locator('.reference-topic')).toHaveCount(chapter.topics.length)
    await expect(page.locator('.callout-example')).toHaveCount(chapter.topics.length)
    await expect(page.locator('.reference-topic').first()).toContainText(
      chapter.topics[0].explanation,
    )
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  await page.goto('/#/knowledge/reference/F?topic=F.04')
  await expect(page.locator('[id="F.04"]')).toBeInViewport()
  await page.screenshot({ path: `test-results/reference-${info.project.name}.png` })
  await page
    .getByRole('navigation', { name: 'Mục lục chuyên đề' })
    .getByRole('link', { name: 'Bảng tổng hợp' })
    .click()
  await expect(page.locator('#reference-tables')).toBeInViewport()
  await expect(page.locator('.reference-table tbody tr')).toHaveCount(12)
  await page.getByRole('button', { name: 'Ẩn bản dịch', exact: true }).click()
  await expect(page.locator('.reference-topic').first()).not.toContainText(
    chapters[5].topics[0].examples[0].vi,
  )
  await page.getByRole('button', { name: 'Hiện bản dịch', exact: true }).click()
  await expect(page.locator('.reference-topic').first()).toContainText(
    chapters[5].topics[0].examples[0].vi,
  )
  expect(errors).toEqual([])
})

test('search, category and level filters, saved references and direct links survive reload', async ({
  page,
}) => {
  await page.goto('/#/knowledge')
  await page.getByLabel('Nhóm ngữ pháp', { exact: true }).selectOption('H')
  await page.getByLabel('Nội dung', { exact: true }).selectOption('Mục tra cứu')
  await expect(page.locator('.knowledge-card')).toHaveCount(8)
  await page.getByLabel('Cấp độ', { exact: true }).selectOption('B2')
  await expect(page.locator('.knowledge-card')).toHaveCount(5)
  await page.getByLabel('Tìm kiếm kho kiến thức').fill('dao ngu dieu kien')
  await expect.poll(() => page.locator('.knowledge-card').count()).toBeLessThan(5)
  await page.getByRole('link', { name: /Đảo ngữ điều kiện/ }).click()
  const topic = page.locator('[id="H.03"]')
  await expect(topic).toBeInViewport()
  await topic.getByRole('button', { name: 'Đánh dấu Đảo ngữ điều kiện', exact: true }).click()
  await page.reload()
  await expect(
    topic.getByRole('button', { name: 'Đánh dấu Đảo ngữ điều kiện', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('link', { name: 'Kho kiến thức', exact: true }).last().click()
  await page.getByRole('button', { name: 'Đã đánh dấu', exact: true }).click()
  await expect(page.locator('.knowledge-card')).toHaveCount(1)
  await expect(page.locator('.knowledge-card')).toContainText('Đảo ngữ điều kiện')
  await page.goto('/#/knowledge/reference/Z')
  await expect(page.getByText('Không tìm thấy chuyên đề này.', { exact: true })).toBeVisible()
})
