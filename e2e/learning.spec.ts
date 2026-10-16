import { test, expect, type Page } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { exerciseFileSchema, type Question } from '../src/types/content'
const be = exerciseFileSchema.parse(
  JSON.parse(readFileSync('content/grammar/exercises/L0-01.json', 'utf8')),
)
const present = exerciseFileSchema.parse(
  JSON.parse(readFileSync('content/grammar/exercises/A2-03.json', 'utf8')),
)
const pronouns = exerciseFileSchema.parse(
  JSON.parse(readFileSync('content/grammar/exercises/L0-12.json', 'utf8')),
)
async function answerQuestion(page: Page, q: Question, wrong = false) {
  const card = page.locator('.question-card')
  await expect(card.locator('h2')).toHaveText(q.prompt)
  if (q.type === 'multiple-select') {
    for (const a of q.answers!) {
      const option = q.options!.find((o) => o.id === a)!
      await card.getByRole('checkbox', { name: option.text, exact: true }).check()
    }
  } else if (['multiple-choice', 'translation-choice', 'true-false'].includes(q.type)) {
    const option = q.options!.find((o) =>
      wrong ? !q.answers!.includes(o.id) : q.answers!.includes(o.id),
    )!
    await card.locator('label.answer-option').filter({ hasText: option.text }).click()
  } else if (q.type === 'fill-blank-choice')
    await card.getByRole('combobox').selectOption(q.answers![0])
  else if (q.type === 'reorder-words') {
    for (const word of q.answers![0].split(' '))
      await card
        .locator('.token-pool')
        .getByRole('button', { name: word, exact: true })
        .first()
        .click()
  } else if (q.type === 'error-correction') {
    await card.locator('.token-pool').getByRole('button').nth(q.errorIndex!).click()
    await card.getByRole('textbox').fill(q.answers![0])
  } else if (q.items) {
    for (const item of q.items)
      await card
        .getByRole('combobox', { name: `Đáp án cho ${item.text}` })
        .selectOption(item.answer)
  } else if (q.blanks) {
    for (const b of q.blanks) {
      const input = card.getByLabel(b.label, { exact: true })
      if (b.options) await input.selectOption(b.answers[0])
      else await input.fill(b.answers[0])
    }
  } else await card.getByRole('textbox').fill(q.answers![0])
}
async function runSet(
  page: Page,
  lessonId: string,
  setId: string,
  questions: Question[],
  exam = false,
  wrongFirst = false,
) {
  await page.goto(`/#/practice/${lessonId}/${setId}`)
  if (exam) await page.getByRole('radio', { name: /Thi thử/ }).check()
  await page.getByRole('button', { name: 'Bắt đầu luyện tập', exact: true }).click()
  for (const [i, q] of questions.entries()) {
    await answerQuestion(page, q, wrongFirst && i === 0)
    if (!exam) {
      await page.getByRole('button', { name: 'Kiểm tra đáp án', exact: true }).click()
      await expect(page.locator('.feedback')).toContainText(
        wrongFirst && i === 0 ? 'Cùng xem lại' : 'Chính xác!',
      )
    } else await expect(page.locator('.feedback')).toHaveCount(0)
    await page
      .getByRole('button', {
        name: i === questions.length - 1 ? 'Nộp bài' : 'Câu tiếp theo',
        exact: true,
      })
      .click()
  }
  await expect(page.locator('.result-score')).toBeVisible()
}
test('dashboard, responsive layout, all lesson containers and rule links', async ({
  page,
}, info) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Chào bạn, cùng học nhé!' })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.screenshot({ path: `test-results/dashboard-${info.project.name}.png`, fullPage: true })
  await page.getByRole('link', { name: 'Bắt đầu học ngay', exact: true }).click()
  await expect(page.locator('.callout-example')).toHaveCount(24)
  await expect(page.locator('.prose table')).toHaveCount(12)
  await expect(page.locator('.callout-example .callout-label').first()).toContainText('Ví dụ')
  await expect(page.getByRole('button', { name: 'Nghe ví dụ' })).toHaveCount(24)
  await expect(page.locator('.prose')).not.toContainText(':::')
  await page.getByRole('button', { name: 'Bản dịch', exact: true }).click()
  await expect(page.locator('.callout-example').first()).not.toContainText('Tôi là Mai')
  await page.goto('/#/lesson/L0-01?rule=L0-01.03')
  await expect(page.locator('[id="L0-01.03"]')).toBeInViewport()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.goto('/#/lesson/L0-12?rule=L0-12.05')
  await expect(page.locator('.callout-example')).toHaveCount(32)
  await expect(page.locator('[id="L0-12.05"]')).toBeInViewport()
  await expect(page.locator('.prose')).not.toContainText(':::')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.goto('/#/knowledge/cheatsheet-pronouns')
  await expect(
    page.getByRole('heading', { name: 'Đại từ nhân xưng và sở hữu — Tóm tắt nhanh' }),
  ).toBeVisible()
  expect(errors).toEqual([])
})
test('all exercise renderers, immediate grading, mistakes, retry and persistence', async ({
  page,
}) => {
  await runSet(page, 'L0-01', be.sets[0].id, be.sets[0].questions, false, true)
  const expectedScore = Math.round(
    ((be.sets[0].questions.length - 1) / be.sets[0].questions.length) * 100,
  )
  await expect(page.locator('.result-score')).toHaveText(`${expectedScore}%`)
  await page.getByRole('button', { name: 'Làm lại 1 câu sai', exact: true }).click()
  await answerQuestion(page, be.sets[0].questions[0])
  await page.getByRole('button', { name: 'Kiểm tra đáp án', exact: true }).click()
  await page.getByRole('button', { name: 'Nộp bài', exact: true }).click()
  await expect(page.locator('.result-score')).toHaveText('100%')
  await page.reload()
  const persisted = await page.evaluate(() => JSON.parse(localStorage.getItem('gramio-learning')!))
  expect(persisted.state.attempts.length).toBe(2)
  expect(persisted.state.attempts[1].kind).toBe('review')
  expect(Object.keys(persisted.state.mistakes).length).toBe(0)
  await runSet(page, 'L0-01', be.sets[2].id, be.sets[2].questions)
  await expect(page.locator('.result-score')).toHaveText('100%')
  await page.goto('/#/mistakes')
  await expect(page.getByRole('heading', { name: 'Chưa có lỗi sai cần ôn' })).toBeVisible()
})
test('exam defers explanations until submission and reports each rule', async ({ page }) => {
  await runSet(page, 'A2-03', present.sets[2].id, present.sets[2].questions, true)
  await expect(page.locator('.result-score')).toHaveText('100%')
  await expect(page.locator('.review-question')).toHaveCount(12)
  await expect(page.locator('.rule-results>a')).toHaveCount(10)
  await runSet(page, 'L0-12', pronouns.sets[2].id, pronouns.sets[2].questions, true)
  await expect(page.locator('.result-score')).toHaveText('100%')
  await expect(page.locator('.review-question')).toHaveCount(12)
})
test('accent-free search, bookmarks, notes, themes and verified backup import', async ({
  page,
}) => {
  await page.goto('/#/knowledge?q=phu%20dinh')
  await expect(page.locator('.knowledge-card')).not.toHaveCount(0)
  await page.locator('.knowledge-card .icon-button').first().click()
  await page.getByRole('button', { name: 'Đã đánh dấu', exact: true }).click()
  await expect(page.locator('.knowledge-card')).toHaveCount(1)
  await page.goto('/#/lesson/L0-01')
  await page.getByLabel('Ghi chú của bạn').fill('Tôi nhớ I am, you are.')
  await page.getByRole('button', { name: 'Tôi đã đọc xong', exact: true }).click()
  await page.reload()
  await expect(page.getByLabel('Ghi chú của bạn')).toHaveValue('Tôi nhớ I am, you are.')
  await page.goto('/#/settings')
  await page.getByLabel('Giao diện', { exact: true }).selectOption('dark')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Tải bản sao lưu JSON', exact: true }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toMatch(/gramio-backup/)
  await page.getByLabel('Hoặc dán nội dung JSON').fill('{"bad":true}')
  await page.getByRole('button', { name: 'Kiểm tra bản sao lưu', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('Tệp không hợp lệ')
  const backup = await page.evaluate(() => ({
    app: 'gramio',
    version: 1,
    data: JSON.parse(localStorage.getItem('gramio-learning')!).state,
  }))
  await page.getByLabel('Hoặc dán nội dung JSON').fill(JSON.stringify(backup))
  await page.getByRole('button', { name: 'Kiểm tra bản sao lưu', exact: true }).click()
  await page.getByRole('button', { name: 'Thay thế và khôi phục', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('thành công')
})
