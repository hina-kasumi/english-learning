import { test, expect } from "@playwright/test";
const lesson = "/#/lesson/03-tenses/05-past-simple";

test("dashboard, reading position, notes, bookmarks, search and backup persist", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Chào bạn/ })).toBeVisible();
  await expect(page.locator(".desktop-sidebar .chapter-tree")).toHaveCount(9);
  await page.screenshot({ path: "/tmp/english-dashboard.png", fullPage: true });
  await page.goto(lesson);
  await expect(
    page.getByRole("heading", {
      name: "Quá khứ đơn (Past Simple)",
      exact: true,
    }),
  ).toBeVisible();
  await page
    .locator(".toc")
    .getByRole("link", {
      name: "3.1 Sự kiện trong quá khứ đã đóng",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(/section=/);
  await expect(page.locator(".toc a.active")).toContainText("3.1");
  await page
    .locator("h3")
    .filter({ hasText: "3.1 Sự kiện" })
    .getByRole("button")
    .click();
  await page.getByRole("button", { name: "Lưu Quá khứ đơn" }).click();
  await page
    .getByLabel("Ghi chú cho bài học này")
    .fill("Nhớ dùng did + V1. Ghi chú kiểm thử.");
  await page
    .getByRole("button", { name: "Đánh dấu đã học", exact: true })
    .click();
  await page.reload();
  await expect(page.getByLabel("Ghi chú cho bài học này")).toHaveValue(
    "Nhớ dùng did + V1. Ghi chú kiểm thử.",
  );
  await expect(
    page.getByRole("button", { name: "Đã học · Bỏ đánh dấu" }),
  ).toBeVisible();
  await page.goto(lesson);
  await expect(
    page.getByRole("heading", {
      name: "Quá khứ đơn (Past Simple)",
      exact: true,
    }),
  ).toBeAttached();
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(550);
  await page.reload();
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(1500);
  await page.goto("/#/bookmarks");
  await expect(page.locator(".saved-item")).toHaveCount(2);
  await expect(page.locator(".note-preview")).toContainText(
    "Nhớ dùng did + V1",
  );
  await page.keyboard.press("Control+k");
  await page.getByRole("combobox").fill("scanner");
  await expect(page.getByRole("option").first()).toBeVisible();
  await expect(page.locator(".search-results mark").first()).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.locator(".search-dialog")).not.toBeVisible();
  await expect(page).toHaveURL(/section=/);
  await page.goto("/#/settings");
  await page.getByRole("button", { name: "Tối", exact: true }).click();
  await page.getByLabel("Mục tiêu số bài mỗi tuần").selectOption("5");
  await page.reload();
  await expect(page.locator("html")).toHaveClass("dark");
  await expect(page.getByLabel("Mục tiêu số bài mỗi tuần")).toHaveValue("5");
  await page.screenshot({
    path: "/tmp/english-dark-settings.png",
    fullPage: true,
  });
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Xuất dữ liệu JSON" }).click();
  const download = await downloadPromise;
  const path = "/tmp/english-e2e-backup.json";
  await download.saveAs(path);
  await page.getByLabel("Mục tiêu số bài mỗi tuần").selectOption("2");
  await page.getByLabel("Chọn bản sao lưu JSON").setInputFiles(path);
  await page.getByRole("button", { name: "Áp dụng bản sao lưu" }).click();
  await expect(page.getByLabel("Mục tiêu số bài mỗi tuần")).toHaveValue("5");
  await page
    .getByLabel("Chọn bản sao lưu JSON")
    .setInputFiles({
      name: "invalid.json",
      mimeType: "application/json",
      buffer: Buffer.from('{"version":5}'),
    });
  await expect(page.getByRole("alert")).toBeVisible();
  await expect(page.getByLabel("Mục tiêu số bài mỗi tuần")).toHaveValue("5");
  expect(errors).toEqual([]);
});

test("mobile drawer, roadmap and wide tables fit the viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Chào bạn/ })).toBeVisible();
  await page.screenshot({ path: "/tmp/english-mobile.png", fullPage: true });
  await page.getByRole("button", { name: "Mở điều hướng" }).click();
  await page
    .locator(".mobile-drawer")
    .getByRole("link", { name: "Lộ trình học", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Lộ trình học tập" }),
  ).toBeVisible();
  await expect(page.locator(".mobile-drawer")).not.toBeVisible();
  await page.getByRole("button", { name: /Sửa lỗi cho người Việt/ }).click();
  await expect(page.locator(".roadmap-stage").first()).toContainText(
    "Lỗi thường gặp",
  );
  await page.goto(lesson);
  await expect(page.locator(".markdown table").first()).toBeAttached();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflow).toBe(false);
  await page.screenshot({
    path: "/tmp/english-mobile-lesson.png",
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "Tìm kiếm (Ctrl hoặc Command K)" })
    .click();
  await expect(page.getByRole("combobox")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator(".search-dialog")).not.toBeVisible();
});

test("adding, editing and removing Markdown updates the app automatically", async ({
  page,
}) => {
  const { writeFile, unlink } = await import("node:fs/promises");
  const path = "docs/grammar/01-foundations/99-app-smoke.md";
  await page.goto("/");
  await expect(page.locator(".desktop-sidebar .sidebar-heading")).toContainText(
    "63 bài",
  );
  try {
    await writeFile(
      path,
      "# Bài thử tự động\n\n## Nội dung thử\nĐây là bài học kiểm tra cập nhật tự động.\n",
    );
    await expect(
      page.locator(".desktop-sidebar .sidebar-heading"),
    ).toContainText("64 bài", { timeout: 20000 });
    await page.goto("/#/roadmap");
    await expect(page.locator(".stage-lessons")).toContainText([
      "Bài thử tự động",
    ]);
    await writeFile(
      path,
      "# Tiêu đề đã cập nhật\n\n## Nội dung mới\nNội dung thay đổi.\n",
    );
    await expect(
      page.getByRole("link", { name: /Tiêu đề đã cập nhật/ }).first(),
    ).toBeVisible({ timeout: 20000 });
  } finally {
    await unlink(path).catch(() => undefined);
  }
  await expect(page.locator(".desktop-sidebar .sidebar-heading")).toContainText(
    "63 bài",
    { timeout: 20000 },
  );
});

test("main screens support accessible names, landmarks and contrast", async ({
  page,
}) => {
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  for (const route of ["/", lesson, "/#/settings"]) {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
    await page.waitForTimeout(250);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect
      .soft(
        results.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
        route,
      )
      .toEqual([]);
  }
  await page.getByRole("button", { name: "Tối", exact: true }).click();
  await page.waitForTimeout(250);
  const dark = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect
    .soft(
      dark.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    )
    .toEqual([]);
  await page.screenshot({
    path: "/tmp/english-dark-final.png",
    animations: "disabled",
    fullPage: true,
  });
});
