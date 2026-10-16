import { test, expect } from '@playwright/test'
import { initialData } from '../src/lib/storage'

test('roadmap filters persist, references open the right topic and mobile layout fits', async ({
  page,
}, info) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/#/roadmap')
  await expect(
    page.getByRole('heading', { name: 'Lộ trình học ngữ pháp', exact: true }),
  ).toBeVisible()
  await expect(page.locator('.roadmap-level')).toHaveCount(6)
  await expect(page.locator('.roadmap-next .button')).toHaveAttribute('href', '#/lesson/L0-01')
  await expect(page.locator('#roadmap-progress')).toHaveAttribute('max', '3')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.screenshot({ path: `test-results/roadmap-${info.project.name}.png`, fullPage: true })

  await page.getByRole('button', { name: 'A1', exact: true }).click()
  await expect(page.locator('.roadmap-level')).toHaveCount(1)
  await expect(page.locator('.planned-content')).toContainText('đang được chuẩn bị')
  await expect(page.locator('#roadmap-progress')).toHaveCount(0)
  await page.reload()
  await expect(page.getByRole('button', { name: 'A1', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  const references = page.locator('.roadmap-references').first()
  await references.locator('summary').click()
  await references.getByRole('link', { name: 'Đếm được và không đếm được', exact: true }).click()
  await expect(page.locator('[id="B.02"]')).toBeInViewport()

  await page.goto('/#/roadmap?level=unknown')
  await expect(page.getByRole('button', { name: 'Tất cả cấp độ' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await expect(page.locator('.roadmap-level')).toHaveCount(6)
  await expect(page.locator('.roadmap-prerequisites').first()).toBeVisible()
  expect(errors).toEqual([])
})

test('roadmap prioritizes due reviews and counts only completed published lessons', async ({
  page,
}) => {
  const data = initialData()
  data.readLessons = ['L0-01']
  data.attempts = [
    {
      id: 'roadmap-completed',
      lessonId: 'L0-01',
      setId: 'L0-01-practice-1',
      kind: 'practice',
      at: '2025-01-01T00:00:00.000Z',
      seconds: 20,
      responses: [{ questionId: 'L0-01-q1', ruleIds: ['L0-01.01'], correct: true, difficulty: 1 }],
    },
  ]
  data.review = { 'grammar:L0-01.01': { box: 1, due: '2025-01-02T00:00:00.000Z' } }
  await page.addInitScript((data) => {
    localStorage.setItem('gramio-learning', JSON.stringify({ state: data, version: 1 }))
  }, data)
  await page.goto('/#/roadmap?level=L0')
  await expect(page.locator('#roadmap-progress')).toHaveAttribute('value', '1')
  await expect(page.locator('#roadmap-progress')).toHaveAttribute('max', '2')
  await expect(page.locator('.roadmap-next')).toContainText('1 điểm kiến thức đến hạn ôn')
  await page.locator('.roadmap-next .button').click()
  await expect(page).toHaveURL(/#\/review$/)
})
