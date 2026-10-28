import { expect, test, type Page } from "@playwright/test";

const lesson = "/#/lesson/03-tenses/05-past-simple";

async function expectNoPageOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
}

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`pages fit a ${width}px viewport with saved content and large text`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(lesson);
    await page.getByRole("button", { name: "Lưu Quá khứ đơn" }).click();
    await page
      .getByLabel("Ghi chú cho bài học này")
      .fill(
        `Ghi chú với đường dẫn dài: https://example.com/${"grammar".repeat(30)}`,
      );
    await page.goto("/#/settings");
    await page.getByLabel("Cỡ chữ bài học").fill("22");

    for (const route of [
      "/",
      "/#/roadmap",
      "/#/bookmarks",
      "/#/settings",
      lesson,
      "/#/guide",
      "/#/editorial-log",
    ]) {
      await test.step(route, async () => {
        await page.goto(route);
        await expect(page.locator("main h1")).toBeAttached();
        await expectNoPageOverflow(page);
      });
    }

    await page.goto("/");
    await expect(page.locator(".hero-card")).toBeVisible();
    await page.screenshot({
      path: `/tmp/english-responsive-${width}.png`,
      fullPage: true,
    });
  });
}

test("long lesson level labels wrap within the reading column", async ({
  page,
}) => {
  await page.goto("/#/lesson/02-parts-of-speech/01-nouns");
  const badge = page.locator(".lesson-meta .badge");
  await expect(badge).toContainText("quy ước chuyên ngành C1–C2");

  for (const width of [320, 390, 768, 1024, 1440]) {
    await test.step(`${width}px`, async () => {
      await page.setViewportSize({ width, height: 844 });
      await expectNoPageOverflow(page);
      const dimensions = await badge.evaluate((element) => ({
        content: element.scrollWidth,
        available: element.clientWidth,
        right: element.getBoundingClientRect().right,
        containerRight: element.parentElement!.getBoundingClientRect().right,
      }));
      expect(dimensions.content).toBeLessThanOrEqual(dimensions.available);
      expect(dimensions.right).toBeLessThanOrEqual(dimensions.containerRight);
      await expect(
        page.locator(".lesson-meta").getByText(/phút đọc/),
      ).toBeInViewport();
      await expect(
        page.getByRole("button", { name: "Lưu Danh từ", exact: true }),
      ).toBeInViewport();
      if (width === 390)
        await page.screenshot({ path: "/tmp/english-lesson-meta-390.png" });
    });
  }
});

test("mobile contents navigate to headings and wide tables scroll locally", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto(lesson);
  const toc = page.locator(".toc-mobile");
  await toc.locator("summary").click();
  await toc
    .getByRole("link", {
      name: "3.1 Sự kiện trong quá khứ đã đóng",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(/section=/);
  await expect(toc).not.toHaveAttribute("open");
  const heading = page.locator("h3").filter({ hasText: "3.1 Sự kiện" });
  await expect(heading).toBeInViewport();
  const headingTop = await heading.evaluate(
    (element) => element.getBoundingClientRect().top,
  );
  const headerBottom = await page
    .locator(".topbar")
    .evaluate((element) => element.getBoundingClientRect().bottom);
  expect(headingTop).toBeGreaterThanOrEqual(headerBottom);

  const table = page.locator(".table-scroll").first();
  await table.scrollIntoViewIfNeeded();
  await table.evaluate((element) => {
    element.scrollLeft = 120;
  });
  expect(await table.evaluate((element) => element.scrollLeft)).toBeGreaterThan(
    0,
  );
  await expectNoPageOverflow(page);

  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(toc).not.toBeVisible();
  await expect(page.locator(".toc")).toBeVisible();
});

test("drawer remains usable in landscape and closes when switching to desktop", async ({
  page,
}) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Mở điều hướng" });
  const drawer = page.getByRole("dialog", { name: "Điều hướng", exact: true });
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await drawer.getByRole("button", { name: "Đóng điều hướng" }).click();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await drawer.getByRole("link", { name: "Cài đặt", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Cài đặt", exact: true }),
  ).toBeVisible();
  await expect(drawer).not.toBeVisible();
  await trigger.click();
  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(drawer).not.toBeVisible();
  await expect(page.locator(".desktop-sidebar")).toBeVisible();
  await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.click();
  await page.keyboard.press("Escape");
  await expect(drawer).not.toBeVisible();
});

test("search results stay usable on narrow and short screens", async ({
  page,
}) => {
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 844, height: 390 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page
      .getByRole("button", { name: "Tìm kiếm (Ctrl hoặc Command K)" })
      .click();
    await page.getByRole("combobox").fill("quá khứ");
    await expect(page.getByRole("option").first()).toBeVisible();
    const dialog = page.getByRole("dialog", { name: "Tìm kiếm toàn văn" });
    const bounds = await dialog.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.y).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width);
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(viewport.height);
    const results = page.locator(".search-results");
    await results.evaluate((element) => {
      element.scrollTop = 200;
    });
    expect(
      await results.evaluate((element) => element.scrollTop),
    ).toBeGreaterThan(0);
    await page.getByRole("button", { name: "Đóng tìm kiếm" }).click();
    await expect(dialog).not.toBeVisible();
  }
});
