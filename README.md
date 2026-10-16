# Gramio — Học ngữ pháp tiếng Anh

Ứng dụng **hoàn toàn phía trình duyệt**, dành cho người Việt. React 18, TypeScript strict, Vite, HashRouter, Tailwind CSS, Zustand persist, Markdown/GFM/directive, Zod và Fuse.js. Không cần backend, tài khoản hoặc dịch vụ AI.

## Phạm vi hiện tại: nền tảng và nội dung đang mở rộng

Đã thêm **17 chuyên đề / 208 mục tra cứu ngữ pháp** trực tiếp trên giao diện Kho kiến thức (`/#/knowledge`), bên cạnh 3 bài học có luyện tập. Mỗi mục có giải thích, cấu trúc, ví dụ song ngữ, lỗi cần tránh và đối chiếu. Có mục lục, bộ lọc L0–C1/nhóm, đánh dấu, ẩn/hiện bản dịch, đọc ví dụ và in chuyên đề. Chưa hoàn thành toàn bộ bài học/bài tập của curriculum L0–C1.

**Cập nhật 16/10/2026:** [Phụ lục nâng cao](docs/PHU-LUC-KIEN-THUC-NANG-CAO.md) thay các ngưỡng nội dung cũ. A2-03 còn theo chuẩn mẫu cũ; L0-01/L0-12 đã tăng độ sâu, nhưng chưa chứng nhận đủ toàn bộ phạm vi phụ lục. Đã lập [bản đồ 184 bài](content/grammar/LESSON-MAP.md), [ma trận kế hoạch 208 mã](content/grammar/KNOWLEDGE-MATRIX.md) và [đối chiếu trong báo cáo](docs/REPORT-GIAI-DOAN-1.md#9-đối-chiếu-với-phụ-lục-kiến-thức-nâng-cao). Đã có nội dung mới theo bản đồ; checker toàn bộ ma trận còn chưa triển khai.

| Bài | Rule | Ví dụ song ngữ trong rule | Câu luyện | Bộ bài |
|---|---:|---:|---:|---:|
| L0-01 — To be | 6 | 24 | 84 | 2 practice + 1 mixed |
| L0-12 — Đại từ nhân xưng và sở hữu | 8 | 32 | 108 | 2 practice + 1 mixed |
| A2-03 — Present Simple | 10 | 30 | 92 | 2 practice + 1 mixed |

L0-01 và L0-12 có **ít nhất 12 câu luyện trực tiếp/rule**, đủ ba mức độ khó; A2-03 còn ở mức 8 câu/rule theo bản mẫu cũ. Bài mixed không được dùng để bù thiếu câu trực tiếp. Các bài có mục tiêu, tình huống, công thức, giải thích, ngoại lệ, lỗi sai, so sánh, phát âm, ghi chú Anh-Anh/Anh-Mỹ và recap. ID A2-03 giữ theo yêu cầu bài mẫu dù chủ đề hiện tại đơn thuộc nhóm A1 của curriculum.

Đã có:

- Dashboard sử dụng tiến độ thật; lộ trình chỉ hiển thị bài đã xuất bản, các cấp còn lại ghi rõ đang chuẩn bị.
- Đọc Markdown với đủ 11 container, bảng cuộn ngang, mục lục, liên kết tới rule, bản dịch bật/tắt, nút đọc ví dụ khi trình duyệt hỗ trợ Web Speech.
- Đủ 14 dạng bài: lựa chọn, nhiều lựa chọn, điền từ, dropdown, chia động từ, sửa lỗi, sắp xếp, viết lại, nối, đúng/sai, phân loại, cloze, chọn bản dịch, hoàn thành câu.
- Chấm ngay hoặc chấm cuối bài, giải thích từng câu, điểm/thời gian/thống kê theo rule, làm lại lỗi sai, trộn câu/đáp án theo seed. Sắp xếp từ hỗ trợ chạm, bàn phím và kéo thả.
- Lưu kết quả từng lượt hoàn thành, ghi chú, bookmark, cài đặt và lỗi sai trong localStorage. Có export/import JSON kiểm tra schema và bước xác nhận thay thế.
- Các hàm nền tảng mastery và Leitner; giao diện ôn rule tới hạn. Chưa có placement thích ứng hay bộ thi đầy đủ theo cấp độ.
- Tra cứu không dấu trên **255 mục**: 17 chuyên đề, 208 mục tham khảo, 3 bài học, 24 rule và 3 bảng tóm tắt. Có 8 bảng đối chiếu: IPA, 12 thì, modal, điều kiện, bị động, mẫu V-ing/to V, so sánh và câu gián tiếp. Không công bố kho bất quy tắc/glossary đầy đủ ở giai đoạn này.
- Theme sáng/tối/theo thiết bị; cỡ chữ, mục tiêu, giọng/tốc độ đọc, chế độ học tuần tự tuỳ chọn.

Chưa triển khai nội dung toàn bộ L0–C1, unit-test/level-test/placement, PWA hoặc đánh giá Lighthouse hoàn chỉnh. Các việc này thuộc các giai đoạn sau; xem [checklist curriculum](content/grammar/CURRICULUM-CHECKLIST.md) và [ghi chú duyệt nội dung](content/REVIEW.md).

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

### Biên soạn kho tra cứu

Sửa `content/grammar/kb/reference/<A–Q>.json`; schema nằm tại `src/types/reference.ts`. `npm run validate` kiểm tra tính toàn vẹn 208 mã, bảng và liên kết bài học; `npm run index` tạo metadata và chỉ mục tìm kiếm. Nội dung từng chuyên đề được tải khi mở trang. Kiểm tra này không thay thế coverage bài tập theo phụ lục.
