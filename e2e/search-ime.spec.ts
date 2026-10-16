import { test, expect } from '@playwright/test'

test('Vietnamese composition commits the search only after accents are complete', async ({
  page,
}) => {
  await page.goto('/#/knowledge?level=B2&category=H')
  const input = page.getByLabel('Tìm kiếm bài học')
  await input.focus()
  const ime = await page.context().newCDPSession(page)
  for (const text of ['d', 'đ', 'đa', 'đả', 'đảo']) {
    await ime.send('Input.imeSetComposition', {
      text,
      selectionStart: text.length,
      selectionEnd: text.length,
    })
    await expect(input).toHaveValue(text)
    await expect(input).toBeFocused()
    await expect(page).toHaveURL(/#\/knowledge\?level=B2&category=H$/)
  }
  await ime.send('Input.insertText', { text: 'đảo' })
  await expect(input).toHaveValue('đảo')
  await expect(page).toHaveURL(/q=%C4%91%E1%BA%A3o/)
  await expect(page.getByLabel('Cấp độ', { exact: true })).toHaveValue('B2')
  await expect(page.getByLabel('Nhóm ngữ pháp', { exact: true })).toHaveValue('H')
  await expect(page.locator('.knowledge-card')).toContainText(['Đảo ngữ'])

  // Back/forward must still synchronize the field from the URL.
  await page.goBack()
  await expect(input).toHaveValue('')
  await page.goForward()
  await expect(input).toHaveValue('đảo')
  await input.fill('')
  await expect(page).toHaveURL(/#\/knowledge\?level=B2&category=H$/)
})

test('Enter confirms Vietnamese composition before submitting the global search', async ({
  page,
}) => {
  await page.goto('/#/knowledge')
  const input = page.getByLabel('Tìm kiến thức', { exact: true })
  await input.focus()
  const ime = await page.context().newCDPSession(page)
  await ime.send('Input.imeSetComposition', {
    text: 'phủ định',
    selectionStart: 8,
    selectionEnd: 8,
  })
  // The browser must not treat the IME confirmation as a search submission.
  const prevented = await input.evaluate((element) => {
    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      isComposing: true,
      bubbles: true,
      cancelable: true,
    })
    element.dispatchEvent(event)
    return event.defaultPrevented
  })
  expect(prevented).toBe(true)
  await expect(page).toHaveURL(/#\/knowledge$/)
  await ime.send('Input.insertText', { text: 'phủ định' })
  await expect(input).toHaveValue('phủ định')
  await input.press('Enter')
  await expect(page.getByLabel('Tìm kiếm bài học')).toHaveValue('phủ định')
  await expect(page).toHaveURL(/q=ph%E1%BB%A7%20%C4%91%E1%BB%8Bnh/)
})
