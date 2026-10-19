# Góc Ngữ Pháp

Ứng dụng tự học ngữ pháp tiếng Anh dành cho người Việt, dùng trực tiếp nội dung trong `docs/grammar/`. React 18, TypeScript strict, Vite, Tailwind CSS 4 + Typography, React Router (HashRouter), React Markdown/GFM và Fuse.js. Không cần backend.

## Chạy tại máy

Cần **Node.js 24+** và npm.

```bash
npm ci
npm run dev
```

Mở địa chỉ Vite in ra (mặc định `http://localhost:5173`).

```bash
npm run build       # kiểm tra TypeScript và tạo dist/
npm run typecheck   # tương đương npx tsc --noEmit
npm run preview     # xem bản build
npm test            # kiểm thử nội dung, link, tìm kiếm, tiến độ
```

Kiểm thử trình duyệt (desktop/mobile, lưu dữ liệu, tìm kiếm, JSON, thay đổi Markdown):

```bash
npx playwright install chromium
npm run test:e2e
```

Nếu Chromium có sẵn ở vị trí riêng, đặt `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` tới file thực thi. Playwright tự khởi động và dừng Vite. Kiểm thử thêm/sửa/xóa Markdown dùng một file tạm `99-app-smoke.md`, tự xóa khi kết thúc; tránh chạy đồng thời với một phiên đang sửa chính file đó.

## Cách sử dụng

- **Tổng quan:** tiếp tục bài đang đọc ở vị trí đã lưu, gợi ý bài tiếp theo, tiến độ, lịch học tuần và bài gần đây.
- **Lộ trình:** Đầy đủ, Nền tảng nhanh hoặc Sửa lỗi cho người Việt. Mở bài chuyển sang Đang học; nút cuối bài đánh dấu Đã xong và cho phép bỏ đánh dấu.
- **Tìm kiếm:** `Ctrl + K` / `Cmd + K`, nhập ít nhất hai ký tự; dùng ↑/↓ và Enter để mở đúng mục. Hỗ trợ tìm tiếng Việt không dấu.
- **Bài học:** mục lục H2/H3 theo vị trí đọc, link nội bộ, trước/sau, chỉnh cỡ chữ, lưu cả bài hoặc từng heading và ghi chú cá nhân.
- **Đã lưu:** tập hợp bài/mục đã lưu và ghi chú của bạn.
- **Cài đặt:** giao diện theo hệ thống/sáng/tối, cỡ chữ 15–22px, mục tiêu 1–30 bài/tuần, xuất và nhập JSON.

Dữ liệu được lưu bằng `localStorage` với khóa `goc-ngu-phap:v1`, riêng cho từng trình duyệt và địa chỉ website. Không tự đồng bộ lên máy chủ. Xuất JSON để chuyển dữ liệu sang thiết bị khác. Nhập có bước xem trước và **thay thế** dữ liệu hiện tại sau khi bấm Áp dụng. Tệp sai định dạng không ghi đè dữ liệu.

Chuỗi ngày tính theo ngày địa phương bạn mở bài học; chuỗi của hôm qua vẫn được giữ nếu hôm nay chưa học. Tuần bắt đầu thứ Hai; mục tiêu tuần tính theo các bài đang ở trạng thái hoàn thành và có thời điểm hoàn thành trong tuần. Vị trí đọc tự lưu khi cuộn, rời trang hoặc ẩn tab; link tới heading được ưu tiên hơn vị trí đã lưu.

## Thêm hoặc sửa bài

1. Tạo file trong nhóm, ví dụ `docs/grammar/03-tenses/16-new-topic.md`.
2. Đặt H1 làm tiêu đề. H2/H3 tạo mục lục và các điểm đến tìm kiếm; có thể thêm blockquote `> **Trình độ:** B1–B2.`.
3. Lưu file. Vite cập nhật ứng dụng khi thêm/sửa/xóa; website đã deploy cần build và deploy lại.

Không cần sửa danh sách trong mã nguồn. Module `src/lib/content.ts` dùng `import.meta.glob` với `?raw`, nạp bất đồng bộ và phân tích cây Markdown thật. Tiêu đề ưu tiên H1, dự phòng theo tên file; thứ tự lấy từ tiền tố số. Tên nhóm tiếng Việt lấy từ `### 01. Tên nhóm` trong `00-index.md`; nhóm mới chưa có tên sẽ dùng tên thư mục.

Không có frontmatter trong bộ nội dung hiện tại nên không dùng parser frontmatter. `_progress.md` chỉ là tiến độ biên soạn, không tính vào tiến độ học. `00-index.md` hiển thị tại `/#/guide`; nhật ký biên soạn tại `/#/editorial-log`. Nội dung bài không bị sao chép hoặc chỉnh sửa bởi ứng dụng.

Link như `../03-tenses/03-present-perfect.md#1-tổng-quan` được đổi thành route và tham số `section`. Heading dùng quy tắc slug của GitHub, cùng với `rehype-slug`. Đổi tên/di chuyển file sẽ đổi ID của bài; dữ liệu cũ vẫn có trong bản sao JSON nhưng không tự gán sang ID mới.

## Chỉnh lộ trình

Sửa **`src/data/roadmaps.ts`**. Mỗi lộ trình có `id`, tên, mô tả và hàm `select(chapters)` lọc/sắp xếp bài từ cây nội dung duy nhất. Lộ trình đầy đủ nhận mọi bài; lộ trình nhanh lấy nhóm 01, 02 và các thì cơ bản; lộ trình sửa lỗi bắt đầu ở nhóm 09 rồi đến các nhóm liên quan. Sidebar và dashboard dùng chung dữ liệu này.

Nhãn CEFR là định hướng phạm vi tài liệu. Xem trang Hướng dẫn để đọc lộ trình phân tầng trong `00-index.md`, gồm các phần nên học trước và phần để đọc sau.

## Deploy

### GitHub Pages

1. Chạy `npm ci` và `npm run build`.
2. Trong repository GitHub: **Settings → Pages → Source: GitHub Actions**.
3. Tạo workflow Pages theo mẫu static site: checkout → setup Node 24 → `npm ci` → `npm run build` → `actions/upload-pages-artifact` với `path: dist` → `actions/deploy-pages`. Job deploy cần quyền `pages: write`, `id-token: write` và environment `github-pages`.

`base: './'` và HashRouter hỗ trợ cả domain gốc lẫn đường dẫn repository như `https://user.github.io/english-learning/#/roadmap`; không cần quy tắc rewrite hay bản sao `404.html`.

### Vercel

Import repository, chọn preset **Vite**, build command **`npm run build`**, output directory **`dist`**, Node.js **24**. Route dùng hash nên không cần rewrite. Chỉ nội dung tĩnh được deploy; tiến độ và ghi chú ở lại trên thiết bị người học.

## Cấu trúc

- `src/lib/`: đọc Markdown, chuyển link, chỉ mục tìm kiếm, kiểm tra JSON và tính ngày học.
- `src/store/`: React Context lưu tiến độ, ghi chú, bookmark và tùy chọn.
- `src/components/`: sidebar, Markdown, TOC, tìm kiếm, ghi chú và các thành phần giao diện.
- `src/pages/`: Dashboard, Lesson, Roadmap, Bookmarks, Settings.
- `src/hooks/`: vị trí đọc và giao diện theo hệ thống.
- `src/data/roadmaps.ts`: các quy tắc lộ trình.
- `tests/`: kiểm thử trên bộ Markdown thật và các luồng trình duyệt.
