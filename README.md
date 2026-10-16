# Gramio — Học ngữ pháp tiếng Anh

Ứng dụng **hoàn toàn phía trình duyệt**, dành cho người Việt. React 18, TypeScript strict, Vite, HashRouter, Tailwind CSS, Zustand persist, Markdown/GFM/directive, Zod và Fuse.js. Không cần backend, tài khoản hoặc dịch vụ AI.

## Bài học thay cho mục tra cứu

Ứng dụng có **69 bài học**: 3 bài có bài tập chấm điểm và 66 bài tự luyện có lời giải, trải từ L0 đến C1. Thư viện (`/#/knowledge`) và lộ trình mở trực tiếp bài học; không còn giao diện mục tra cứu riêng.

66 bài mới bao phủ **208 chủ đề A–Q**, với phần giải thích, công thức, phân tích cách lựa chọn, 624 ví dụ song ngữ, đối chiếu, lỗi cần tránh và 208 câu tự luyện có lời giải mở riêng. Giữ toàn bộ 8 bảng tổng hợp trong các bài tương ứng. Xem [đối chiếu từng chủ đề](content/grammar/LESSON-MIGRATION.md).

Các URL tra cứu cũ chuyển tới bài học và quy tắc tương ứng; dấu trang cũ vẫn tìm được trong bộ lọc đã đánh dấu. Các bài học cũ giữ ID, câu hỏi và dữ liệu tiến độ.

Bài tự luyện được ghi hoàn thành khi người học đánh dấu đọc xong, không tạo điểm mastery hoặc lịch SRS. Ba bài chấm điểm vẫn cần đọc xong và đạt ít nhất 70% một bộ practice để hoàn thành. Chưa có ngân hàng chấm điểm cho 66 bài mới; độ phủ chủ đề không đồng nghĩa hoàn thành chuẩn độ sâu và số câu của [phụ lục](docs/PHU-LUC-KIEN-THUC-NANG-CAO.md).

Các chức năng hiện có: tìm kiếm không dấu, lọc cấp độ/nhóm, mục lục theo quy tắc, ghi chú và đánh dấu, ẩn bản dịch, đọc ví dụ, in, tiến độ cục bộ, xuất/nhập bản sao lưu, 14 dạng bài tập và ôn cách quãng cho câu đã chấm điểm.

## Chạy tại máy

Dùng Node.js **22.12+** (đã kiểm tra với Node 24) và npm.

```sh
npm ci
npm run dev
```

Mở địa chỉ Vite in ra. Không cần biến môi trường hay API key. `predev` tự tạo metadata/chỉ mục tìm kiếm; khi thêm bài trong lúc dev đang chạy, chạy lại `npm run index`.

## Kiểm tra

```sh
npm run validate       # schema, rule, ví dụ, đáp án, coverage, liên kết, roadmap
npm run coverage       # bảng console + content/COVERAGE.md
npm test               # Vitest: grading, Markdown, SRS, storage, validator
npm run lint
npm run format:check
npm run build          # prebuild bắt buộc validate và tạo chỉ mục
```

`MIN_RULE_QUESTIONS` có thể nâng ngưỡng; không thể giảm dưới 4, hoặc dưới 8 cho rule quan trọng. Validator xem `roadmap.stage`: giai đoạn 1 chưa đòi bài thi của các cấp chưa hoàn thiện; từ giai đoạn 2 yêu cầu unit-test ≥20 và level-test ≥40 cho các cấp L0–A2.

Đây là hành vi validator giai đoạn 1 hiện có, **chưa thực thi chuẩn phụ lục nâng cao**. Kết quả pass của lệnh hiện tại không chứng minh đủ 208 mã, sáu chiều hoặc các ngưỡng mới. Chưa có script/lệnh `check-knowledge-matrix`; xem thứ tự triển khai trong bản đồ chờ duyệt.

Kiểm thử trình duyệt trên desktop và mobile 360px:

```sh
npx playwright install chromium
npm run test:e2e
```

Playwright tự khởi động Vite nếu chưa có server. Có thể dùng trình duyệt sẵn có bằng `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/path/to/chrome npm run test:e2e`. Kết quả và ảnh chụp nằm trong `test-results/` (không đưa vào Git).

## Thêm bài học và bài tập

Quy trình nội dung từ lần cập nhật phụ lục; tiếp tục theo `LESSON-MAP.md` và hoàn thiện schema/checker tương ứng. Hai mẫu hiện tại chỉ minh hoạ định dạng kỹ thuật, không phải chuẩn độ sâu để sao theo.

1. Lập `content/grammar/outlines/<lessonId>.md`, gắn mã phụ lục hợp lệ và đủ sáu chiều cho từng rule. Tách khi vượt 18 rule hoặc khoảng 4.000 từ. Bài thường 6–10 rule/≥1.000 từ lý thuyết; bài lõi 10–18 rule/≥2.000 từ, không tính ví dụ.
2. Thêm Markdown vào `content/grammar/lessons/`. ID rule có dạng `lessonId.01`, với heading `## Tên quy tắc {#lessonId.01}`. Schema hiện tại ở `src/types/content.ts` đã nhận `appendixCodes` tuỳ chọn; các rule mới/nâng cấp phải gắn mã hợp lệ. Cổng kiểm tra đủ toàn bộ danh mục chưa triển khai.
3. Mỗi rule có ≥4 ví dụ song ngữ, rule lõi ≥6; mỗi chiều không áp dụng phải được giải thích trong outline. Có đối chiếu, ≥3 lỗi/rule kèm nguyên nhân/tự kiểm tra và hội thoại cho cách dùng văn nói. Bài lõi thêm mục “Nhìn tổng thể”. Các container hiện hỗ trợ: `formula`, `rule`, `example`, `note`, `warning`, `mistake`, `tip`, `compare`, `dialogue`, `recap`, `pronunciation`.
4. Thêm `content/grammar/exercises/<lessonId>.json`: ≥8 câu trực tiếp/rule, lõi/dễ sai ≥12, đủ ba mức khó; ≥50 câu/bài thường, ≥100/bài lõi và đồng thời đủ coverage từng rule; ≥5 dạng. Giữ cấu trúc practice/mixed của SPEC, bổ sung trap/context theo phụ lục sau khi hỗ trợ metadata. Mỗi câu có ID, `ruleIds`, giải thích tiếng Việt và bản dịch cho L0–A2. Từ B1 mỗi rule lõi có transformation hoặc error-correction.
5. Chỉ thêm bài đã có vào `roadmap.json`; cập nhật ma trận từ rule/câu thật. Ghi các mã chưa phủ và level dự kiến, không đánh dấu bài kế hoạch là đã hoàn thành.
6. Chạy validate/coverage/check-knowledge-matrix/test/lint/build khi checker mới được triển khai; báo đúng lỗi còn lại. Ghi vấn đề chưa chắc chắn bằng `[CẦN XÁC MINH]` trong `content/REVIEW.md`.

Thêm bài mới không sửa component. Frontmatter YAML thông thường và JSON (một tập con hợp lệ của YAML 1.2) đều được hỗ trợ. Dữ liệu mẫu dùng dạng JSON trong frontmatter để ID được phân tích nhất quán.

### Cấu trúc đáp án

- Choice/dropdown/true-false: `options: [{id,text}]`, `answers: [id]`. Multiple-select có từ hai ID đúng.
- Text/verb/transformation/completion: `answers` là các biến thể chấp nhận được. Hoa/thường được bỏ qua trừ khi `caseSensitive: true`. Dấu cuối câu chỉ bỏ qua nếu `ignoreEndPunctuation: true`. Không tự suy đoán các biến thể viết tắt.
- Error-correction: `tokens`, `errorIndex` bắt đầu từ 0, `answers` chứa từ/cụm thay thế. Cần đúng cả vị trí lẫn từ sửa.
- Reorder: `tokens` chứa đủ số lần xuất hiện của từng từ; `answers` chứa câu hoàn chỉnh ghép bằng dấu cách.
- Matching/classify: `items: [{id,text,answer}]`, `groups: [{id,text}]`; `answer` là ID nhóm. Matching yêu cầu cặp một-một.
- Cloze: `blanks: [{id,label,answers,options?}]`; có thể trộn dropdown và nhập từ trong cùng đoạn.

Renderer đăng ký trong `src/features/grammar/QuestionInput.tsx`, grader trong `src/lib/grading.ts`. Bổ sung schema và registry để thêm loại bài; không sửa logic điều khiển lượt luyện.

## Tiến độ và dữ liệu

Kho Zustand `gramio-learning`, phiên bản 1, dùng namespace `grammar:` cho rule/câu hỏi. `src/lib/storage.ts` chứa schema, migrate và định dạng backup. Dữ liệu chỉ lưu trên trình duyệt hiện tại. Lượt làm bài được ghi khi nộp xong; rời trang giữa lượt chưa lưu đáp án đang làm.

`completed`: đã đọc bài và có một bộ practice đạt ≥70%. `mastered`: mỗi rule có ít nhất bốn lần trả lời và mastery ≥80%. Mastery dùng tối đa 20 kết quả gần nhất, trọng số tăng theo độ mới × độ khó. Leitner đặt lịch một lần mỗi rule mỗi lượt, chỉ tăng box khi tất cả câu của rule trong lượt đúng; sai thì đặt về box 0. Khoảng ôn là 1/2/4/7/14/30 ngày.

## Mở rộng module

`src/modules/registry.ts` đăng ký `{id,title,routes,contentLoader,progressNamespace}`. Router tự lấy các route của module. Thêm module bằng registry, thư mục `content/<module>/`, loader tương ứng và namespace tiến độ riêng. Mô hình lesson/exercise đã có `moduleId`; unit có `tracks[]` và `goals[]`. Các thư mục kỹ năng/từ vựng được chuẩn bị nhưng chưa có nội dung. Khi mở thêm module, bổ sung loader/validator của module thay vì gắn nội dung vào component.

## Deploy static

```sh
npm run build
npm run preview
```

Đưa **nội dung thư mục `dist/`** lên GitHub Pages, Netlify hoặc Vercel. Vite dùng `base: './'`; HashRouter dùng URL dạng `/#/lesson/L0-01`, nên không cần rewrite server. Với Netlify/Vercel: build command `npm run build`, output directory `dist`. GitHub Pages: build bằng Node 22.12+ rồi tải `dist` như Pages artifact.

Không có backend được triển khai. Font dùng font hệ thống có dấu tiếng Việt và IPA; không tải tài nguyên font từ bên ngoài. Web Speech phụ thuộc giọng và khả năng của thiết bị, có thể cần mạng tuỳ trình duyệt. Chưa có service worker nên không hứa hỗ trợ tải lại trang khi offline.

### Biên soạn bài tự luyện

Nguồn nội dung xuất bản là `content/grammar/lessons/*.md`. Đặt `practiceMode: "self-check"` cho bài có câu tự luyện trong nội dung; mặc định `graded` giữ các yêu cầu ngân hàng câu hỏi hiện có. Không tạo bộ bài chấm điểm giả để mở được bài đọc.

Mỗi quy tắc của bài tự luyện phải có mã `appendixCodes`, ít nhất 3 ví dụ song ngữ khác nhau, công thức, phần phân tích, câu tự luyện và container `:::answer` chứa lời giải. Renderer hiển thị lời giải bằng phần mở/đóng để người học thử trước. Thêm bài vào unit/cấp tương ứng của roadmap, rồi chạy `npm run validate`, `npm run index` và kiểm thử.

`content/grammar/kb/reference/` là hồ sơ đối chiếu nội dung trước chuyển đổi, không được tải vào giao diện. `scripts/lesson-migration.ts` kiểm tra mỗi mã có đúng một bài chuyển đổi và giữ giải thích, ví dụ, lỗi, đối chiếu, bảng cùng nguồn gốc. Kiểm tra này độc lập với coverage bài tập chấm điểm. Không sửa hồ sơ để che nội dung bị mất khi biên tập bài học.
