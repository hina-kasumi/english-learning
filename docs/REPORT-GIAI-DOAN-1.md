# Báo cáo triển khai giai đoạn 1 — Gramio

- **Ngày báo cáo:** 16/10/2026.
- **Phạm vi:** nền tảng kỹ thuật và hai bài mẫu theo mục 14 của [SPEC.md](../SPEC.md).
- **Trạng thái hiện tại:** đã tiếp tục bổ sung kiến thức theo yêu cầu người dùng: thêm L0-12 và nâng cấp L0-01. Hiện có 3 bài, 24 rule và 284 câu hỏi; chưa hoàn thành toàn bộ chuẩn phụ lục. Xem cập nhật mới nhất tại mục 10.
- **Môi trường:** dự án chạy cục bộ, hoàn toàn phía trình duyệt. Chưa triển khai lên hosting.

> **Cách đọc báo cáo:** mục 1–9 lưu lại kết quả và đối chiếu tại các lần bàn giao trước; số liệu hiện tại nằm ở **mục 10**. [Bản đồ 184 bài](../content/grammar/LESSON-MAP.md) đã bắt đầu triển khai; [ma trận 208 mã](../content/grammar/KNOWLEDGE-MATRIX.md) đã có ánh xạ thật cho phần vừa bổ sung. Các lần pass validator hiện tại chưa chứng nhận toàn bộ chuẩn nâng cao.

## 1. Kết quả chính

Đã thay giao diện khởi tạo Vite bằng ứng dụng học ngữ pháp tiếng Anh dành cho người Việt. Ứng dụng có màn hình tổng quan, lộ trình, đọc bài, luyện tập, tra cứu, ôn tập, sổ lỗi sai và cài đặt.

Hai bài mẫu có tổng cộng **16 điểm kiến thức (rule), 48 ví dụ song ngữ trong các rule, 152 câu hỏi và 6 bộ bài tập**. Mỗi rule được đánh dấu quan trọng và có ít nhất 8 câu luyện trực tiếp, đủ ba mức độ khó. Không dùng câu tổng hợp tham chiếu nhiều rule để bù thiếu coverage trực tiếp.

Các kiểm tra nội dung, kiểm thử logic, kiểm thử trình duyệt, lint, định dạng và build đã thành công. Đây là kết quả kiểm tra ở cuối lượt triển khai giai đoạn 1; việc viết báo cáo này không chạy lại các bộ kiểm thử.

## 2. Nền tảng kỹ thuật

| Hạng mục | Đã triển khai |
|---|---|
| Build và UI | Vite, React 18, TypeScript strict |
| Điều hướng | React Router với HashRouter; Vite dùng `base: './'` để hỗ trợ static hosting |
| Giao diện | Tailwind CSS, CSS variables, responsive, theme sáng/tối/theo thiết bị |
| Trạng thái | Zustand persist vào localStorage, schema và migration có phiên bản |
| Lý thuyết | Markdown + YAML frontmatter, react-markdown, GFM |
| Container | Remark plugin tuỳ chỉnh kết hợp remark-directive; hỗ trợ đủ 11 loại container |
| Bài tập | JSON được kiểm tra bằng Zod; registry renderer và grader theo loại câu hỏi |
| Tra cứu | Fuse.js, chỉ mục tạo trước khi build, tìm tiếng Việt không dấu |
| Tải nội dung | Lazy-load route và nội dung bài qua `import.meta.glob` |
| Mở rộng | Registry module gồm route, content loader và namespace tiến độ; metadata có `moduleId`, `tracks`, `goals` |

Nội dung lý thuyết và bài tập nằm trong `content/`; thêm bài không cần sửa component. Các thư mục kỹ năng và từ vựng đã được chuẩn bị nhưng chưa có nội dung.

## 3. Nội dung mẫu và coverage

| Bài | Rule | Ví dụ song ngữ trong rule | Câu hỏi | Dễ / Vừa / Khó | Bộ bài | Rule thiếu câu |
|---|---:|---:|---:|---|---|---:|
| [L0-01 — To be](../content/grammar/lessons/L0-01.md) | 6 | 18 | 60 | 18 / 27 / 15 | 2 practice + 1 mixed | 0 |
| [A2-03 — Present Simple](../content/grammar/lessons/A2-03.md) | 10 | 30 | 92 | 28 / 41 / 23 | 2 practice + 1 mixed | 0 |
| **Tổng** | **16** | **48** | **152** | **46 / 68 / 38** | **6 bộ** | **0** |

Mỗi bài có mục tiêu, tình huống khởi động, khái niệm, công thức và giải thích theo rule, ngoại lệ, dấu hiệu nhận biết, lỗi thường gặp, phần so sánh, phát âm/chính tả, ghi chú Anh-Anh/Anh-Mỹ, recap và liên kết liên quan.

Mỗi rule có ít nhất ba container ví dụ song ngữ. Câu hỏi có giải thích tiếng Việt và bản dịch; các câu trắc nghiệm giải thích lựa chọn đúng và những lỗi mà phương án sai phản ánh.

ID **A2-03** được giữ theo yêu cầu bài mẫu trong đặc tả. Chủ đề hiện tại đơn vẫn được đối chiếu với nhóm A1 trong checklist curriculum; không xem đây là bằng chứng đã hoàn thành nội dung cấp A2.

Tài liệu đối chiếu:

- [Báo cáo coverage do script sinh](../content/COVERAGE.md).
- [Checklist toàn bộ curriculum](../content/grammar/CURRICULUM-CHECKLIST.md).
- [Ghi chú rà soát nội dung](../content/REVIEW.md).

### 3.1. Khái niệm nền tảng đã được giải thích

Các khái niệm dưới đây được giới thiệu trong hai bài mẫu để người học hiểu công thức và ví dụ:

| Khái niệm | Kiến thức đã có |
|---|---|
| Chủ ngữ — subject, ký hiệu S | Người hoặc vật được nói đến; xác định chủ ngữ để chọn dạng động từ. |
| Động từ — verb, ký hiệu V | Từ chỉ hành động hoặc trạng thái; phân biệt động từ gốc với dạng đã chia. |
| Tân ngữ — object, ký hiệu O | Người hoặc vật nhận hành động; dùng khi phân biệt câu hỏi về chủ ngữ và tân ngữ. |
| Bổ ngữ — complement | Thông tin mô tả sau be, như danh tính, tính chất hoặc nơi chốn. |
| Trợ động từ — auxiliary | Vai trò của do/does trong câu hỏi và phủ định với động từ thường. |
| Ngôi và số của chủ ngữ | Phân biệt I, you, he/she/it, we/they; chủ ngữ một người/vật, nhiều người/vật và chủ ngữ nối bằng and. |
| Câu khẳng định, phủ định và nghi vấn | Ý nghĩa, trật tự từ và cách chuyển đổi trong phạm vi be và hiện tại đơn. |

Đây là phần dẫn nhập phục vụ hai bài, chưa phải các bài độc lập đầy đủ về từ loại hoặc thành phần câu.

### 3.2. Kiến thức đã có trong L0-01 — Động từ to be

Nguồn: [lý thuyết L0-01](../content/grammar/lessons/L0-01.md) và [bài tập L0-01](../content/grammar/exercises/L0-01.json).

| Rule | Điểm kiến thức | Nội dung cụ thể đã được viết |
|---|---|---|
| `L0-01.01` | Chọn am/is/are theo chủ ngữ | `I am`; `he/she/it is`; `you/we/they are`. Chọn be theo chủ ngữ số ít/số nhiều; you vẫn dùng are khi chỉ một người; hai người nối bằng and thường dùng are. |
| `L0-01.02` | Khẳng định và viết tắt | Cấu trúc `S + am/is/are + thông tin`. Các dạng I’m, you’re, he’s, she’s, it’s, we’re, they’re; vai trò dấu nháy; phân biệt it’s và its; không dùng dạng khẳng định viết tắt đứng một mình ở cuối câu trả lời ngắn. |
| `L0-01.03` | Phủ định với not | Đặt not ngay sau be, không thêm do/does. Các dạng isn’t, aren’t, ’s not, ’re not; `I am not → I’m not`; không dùng I amn’t trong mẫu chuẩn đang học. |
| `L0-01.04` | Câu hỏi Yes/No và trả lời ngắn | Đảo be lên trước chủ ngữ: `Am/Is/Are + S + thông tin?`. Trả lời `Yes, S + be` hoặc `No, S + be + not`; đổi đại từ theo người trả lời, chẳng hạn câu hỏi dùng you nhưng câu trả lời dùng I hoặc we. |
| `L0-01.05` | Câu hỏi có từ để hỏi | Who hỏi người; what hỏi sự vật/nghề nghiệp; where hỏi nơi chốn; how hỏi tình trạng; how old hỏi tuổi. Trật tự câu hỏi trực tiếp với be; trường hợp who tự làm chủ ngữ như “Who is at the door?”. |
| `L0-01.06` | Nói tuổi, trạng thái, danh tính và vị trí | Be nối chủ ngữ với thông tin mô tả. Dùng be trước tính từ, dùng `be + số + years old` để nói tuổi, dùng be với cụm chỉ vị trí. Không bỏ be do ảnh hưởng cách nói tiếng Việt; không thêm be trước động từ hành động nguyên dạng. |

**Những lỗi đã được giải thích cách sửa:**

- `I happy. → I am happy.` — thiếu be trước tính từ.
- `I have twenty years old. → I am twenty years old.` — dùng sai cấu trúc nói tuổi.
- `She is work here. → She works here.` — thêm be không đúng trước động từ hành động.
- `Yes, she’s. → Yes, she is.` — rút gọn không đúng trong câu trả lời khẳng định ngắn.
- Không dùng `Do you are ...?` để hỏi với be.

**Phần bổ trợ đã có:** phát âm am `/æm/`, is `/ɪz/`, are `/ɑː/` ở dạng đọc riêng/nhấn mạnh theo phạm vi bài; I’m `/aɪm/`; lưu ý dạng đọc nhẹ trong lời nói, luôn viết hoa I, và khác biệt phát âm /r/ trong are giữa các giọng Anh-Anh/Anh-Mỹ. Có bảng đối chiếu câu dùng be với câu dùng động từ hành động.

**Bài tập hiện có:** 48 câu practice, chia đều 8 câu cho mỗi rule, và 12 câu mixed. Người học luyện chọn dạng be, viết tắt, phủ định, hỏi–đáp, xác định từ để hỏi, diễn đạt tuổi/trạng thái/vị trí và sửa lỗi.

### 3.3. Kiến thức đã có trong A2-03 — Thì hiện tại đơn

Nguồn: [lý thuyết A2-03](../content/grammar/lessons/A2-03.md) và [bài tập A2-03](../content/grammar/exercises/A2-03.json).

| Rule | Điểm kiến thức | Nội dung cụ thể đã được viết |
|---|---|---|
| `A2-03.01` | Khẳng định và ngôi thứ ba số ít | `I/you/we/they + V`; `he/she/it + V-s/es`. Nhận diện danh từ chính trong cụm chủ ngữ, không chia động từ theo danh từ đứng gần nhất; be có hệ am/is/are riêng. |
| `A2-03.02` | Chính tả -s/-es | Thêm -s với phần lớn động từ; thêm -es với các đuôi thông dụng -s/-ss/-sh/-ch đọc /tʃ/-x. Các dạng quiz → quizzes, buzz → buzzes, go → goes, do → does; lưu ý không áp dụng -es máy móc cho mọi động từ tận cùng -o hoặc -ch. |
| `A2-03.03` | Đuôi -y và dạng đặc biệt | Phụ âm + y đổi thành -ies: study → studies, carry → carries. Nguyên âm + y giữ y và thêm -s: play → plays, buy → buys. Have → has; sau does dùng have, không dùng has. |
| `A2-03.04` | Phủ định với don’t/doesn’t | `I/you/we/they + do not + V`; `he/she/it + does not + V`. Dạng viết tắt don’t/doesn’t; động từ chính giữ dạng gốc sau trợ động từ; không áp dụng công thức do/does cho be. |
| `A2-03.05` | Câu hỏi và câu trả lời ngắn | `(Wh-) + do/does + S + V?`; trả lời ngắn bằng do/does. Phân biệt hỏi chủ ngữ với hỏi tân ngữ: “Who helps you?” và “Who do you help?”. Câu hỏi khẳng định trung tính với who làm chủ ngữ không cần do/does. |
| `A2-03.06` | Cách dùng hiện tại đơn | Diễn tả thói quen, sự thật/trạng thái và lịch trình cố định. Lịch tàu hoặc thời khoá biểu có thể dùng hiện tại đơn khi nói về tương lai. Giới thiệu cách dùng hiện tại đơn trong mệnh đề when/if chỉ tương lai ở các mẫu đã nêu. |
| `A2-03.07` | Trạng từ tần suất | Nghĩa của always, usually, often, sometimes, rarely, never. Vị trí thông thường: trước động từ thường, sau be, sau trợ động từ đầu tiên. Sometimes có thể đứng đầu/cuối câu; every day, twice a week thường đứng cuối. Never đã có nghĩa phủ định; phân biệt every day và everyday. |
| `A2-03.08` | Hiện tại đơn so với hiện tại tiếp diễn | Phân biệt thói quen/trạng thái với việc đang diễn ra hoặc tạm thời; cấu trúc đối chiếu `V(s/es)` và `am/is/are + V-ing`. Know, believe, need, own thường không dùng tiếp diễn khi mang nghĩa trạng thái; think và have có thể dùng tiếp diễn khi chuyển sang nghĩa hành động phù hợp. |
| `A2-03.09` | Phát âm đuôi -s/-es | Đọc /s/ sau /p, t, k, f, θ/; đọc /ɪz/ sau /s, z, ʃ, ʒ, tʃ, dʒ/; đọc /z/ sau nguyên âm và phụ âm hữu thanh còn lại. Chọn theo âm cuối, không chỉ chữ cuối; nhận biết âm tiết bổ sung ở /ɪz/. Có does `/dʌz/`, says `/sez/`, goes `/ɡəʊz/`. |
| `A2-03.10` | Tự sửa lỗi và phân biệt be/do | Xác định động từ chính để chọn cấu trúc: be nối thông tin mô tả; do/does hỗ trợ câu hỏi/phủ định của động từ thường. Sửa lỗi bỏ -s, chia -s sau does/doesn’t, dùng be sai chỗ và ghép doesn’t với never khi muốn nói “không bao giờ”. |

**Những lỗi đã được giải thích cách sửa:**

- `He don’t eat meat. → He doesn’t eat meat.` — chọn sai trợ động từ theo chủ ngữ.
- `She doesn’t likes tea. → She doesn’t like tea.` — động từ chính chưa trở về dạng gốc.
- `I don’t am late. → I am not late.` — dùng do không đúng với be.
- `My dad go to work early. → My dad goes to work early.` — thiếu dạng ngôi thứ ba số ít.
- `Is she like music? → Does she like music?` — dùng be thay cho trợ động từ của like.
- `He doesn’t never call. → He never calls.` — phủ định kép không phù hợp với nghĩa đang luyện.

**Dấu hiệu và sắc thái đã có:** every morning, on Mondays, once a month và các trạng từ tần suất; lưu ý tomorrow không loại trừ hiện tại đơn khi nói lịch cố định, còn now không bắt buộc dùng tiếp diễn với động từ trạng thái. Có ghi chú “at weekends” thường gặp trong Anh-Anh và “on weekends” trong Anh-Mỹ, cùng khác biệt nguyên âm của go.

**Bài tập hiện có:** 80 câu practice, chia đều 8 câu cho mỗi rule, và 12 câu mixed. Người học luyện chia động từ, chính tả, phủ định, hỏi–đáp, chọn cấu trúc theo ngữ cảnh, vị trí trạng từ, phân biệt trạng thái/hành động, phát âm và sửa câu.

### 3.4. Kiến thức đã có trong hai bảng tra cứu nhanh

| Tài liệu | Nội dung tra cứu |
|---|---|
| [To be — Tóm tắt nhanh](../content/grammar/kb/cheatsheets/cheatsheet-to-be.md) | Bảng am/is/are theo chủ ngữ ở ba dạng khẳng định, phủ định, nghi vấn; dạng viết tắt; trả lời ngắn; nói tuổi; be trước tính từ; lưu ý không thêm do vào câu hỏi với be. |
| [Present Simple — Tóm tắt nhanh](../content/grammar/kb/cheatsheets/cheatsheet-present-simple.md) | Cách dùng chính; bảng chia động từ theo chủ ngữ ở ba dạng câu; watch/study/play/have; dạng gốc sau does; vị trí usually; who làm chủ ngữ; ba cách đọc đuôi -s/-es; lưu ý về động từ trạng thái. |

Hai bảng này tóm lược kiến thức của hai bài mẫu, không được tính là hai chủ đề ngữ pháp mới. Tương tự, 16 mục rule trong tìm kiếm là các phần của hai bài, không phải 16 bài độc lập.

### 3.5. Mức độ bao phủ của các chủ đề liên quan

| Chủ đề | Phạm vi hiện có |
|---|---|
| To be ở hiện tại | Đã có bài mẫu riêng với lý thuyết và bài tập theo 6 rule. |
| Hiện tại đơn | Đã có bài mẫu riêng với lý thuyết và bài tập theo 10 rule. |
| Hiện tại tiếp diễn | Có phần đối chiếu, cấu trúc và ví dụ phục vụ phân biệt với hiện tại đơn; chưa có bài riêng đầy đủ. |
| Động từ trạng thái | Có kiến thức bước đầu và ví dụ think/have theo nghĩa; chưa phải chuyên đề đầy đủ. |
| Câu điều kiện và mệnh đề thời gian | Mới giới thiệu mẫu when/if chỉ tương lai trong bài hiện tại đơn; chưa có bài riêng về các loại điều kiện. |
| Đại từ, câu hỏi Wh-, thành phần câu | Được giải thích trong phạm vi hai bài mẫu; chưa bao phủ toàn bộ các chuyên đề tương ứng trong curriculum. |
| Phát âm và IPA | Có phiên âm phục vụ be và đuôi -s/-es; chưa có bài đầy đủ về bảng âm IPA hoặc phát âm -ed. |

## 4. Tính năng đã hoạt động

### Đọc bài

- Mục lục theo rule, liên kết trực tiếp đến điểm kiến thức và thanh tiến độ đọc.
- Đủ container: `formula`, `rule`, `example`, `note`, `warning`, `mistake`, `tip`, `compare`, `dialogue`, `recap`, `pronunciation`.
- Bảng cuộn ngang trên màn hình nhỏ, điều chỉnh cỡ chữ và CSS phục vụ in bài.
- Bật/tắt bản dịch ví dụ; nghe ví dụ bằng Web Speech khi trình duyệt hỗ trợ, với lựa chọn giọng và tốc độ.
- Đánh dấu bài, ghi chú cá nhân và xác nhận đã đọc xong.

### Luyện tập và chấm bài

Engine hỗ trợ đủ 14 dạng:

1. `multiple-choice` — chọn một đáp án.
2. `multiple-select` — chọn nhiều đáp án.
3. `fill-blank` — nhập phần còn thiếu.
4. `fill-blank-choice` — chọn bằng dropdown.
5. `verb-form` — chia động từ.
6. `error-correction` — chọn vị trí lỗi và nhập phần sửa.
7. `reorder-words` — sắp xếp từ bằng chạm, bàn phím hoặc kéo thả.
8. `transformation` — viết lại câu.
9. `matching` — nối cặp bằng lựa chọn.
10. `true-false` — đúng/sai.
11. `classify` — phân loại.
12. `cloze` — đoạn văn có nhiều chỗ trống.
13. `translation-choice` — chọn bản dịch.
14. `sentence-completion` — hoàn thành câu.

Người học có thể chọn chấm ngay từng câu hoặc chấm cuối bài. Kết quả có điểm, thời gian, thống kê theo rule, lời giải và liên kết về lý thuyết. Có thao tác làm lại câu sai, làm lại toàn bộ và trộn câu/đáp án theo seed ổn định.

Chấm văn bản hỗ trợ chuẩn hoá khoảng trắng, dấu nháy, Unicode và hoa/thường theo cấu hình. Biến thể viết tắt phải được khai báo; dấu cuối câu chỉ được bỏ qua khi câu hỏi cho phép. Lượt chỉ làm lại một phần câu sai được ghi là lượt ôn, không được tính như một bộ practice hoàn chỉnh.

### Tiến độ, tra cứu và cài đặt

- Dashboard dùng số liệu thực từ lượt làm bài, không tạo tiến độ giả.
- Lộ trình có các cấp L0–C1; chỉ hai bài mẫu được mở, nội dung chưa có được ghi rõ đang chuẩn bị.
- Nhắc bài tiền đề và có tuỳ chọn học tuần tự.
- Tra cứu 20 mục: hai bài học, 16 rule và hai cheat sheet; hỗ trợ lọc và bookmark.
- Lưu lịch sử lượt làm, ghi chú, bookmark, cài đặt và sổ lỗi sai trên thiết bị.
- Có hàm mastery và lịch ôn Leitner nền tảng; giao diện hiển thị rule tới hạn và mức độ nắm vững.
- Export/import JSON có kiểm tra schema, báo dữ liệu không hợp lệ và xác nhận trước khi thay thế tiến độ.

## 5. Kiểm soát chất lượng và kết quả kiểm thử

| Kiểm tra | Kết quả cuối giai đoạn 1 |
|---|---|
| `npm run validate` | Pass: schema, ID, anchor, coverage, cấu trúc bài, tham chiếu, roadmap và liên kết nội bộ |
| `npm run coverage` | Không có rule thiếu câu luyện |
| `npm test` | **196 test pass**, trong 5 file |
| `npm run test:e2e` | **8 test pass**, trên desktop và mobile 360px |
| `npm run lint` | Pass |
| `npm run format:check` | Pass |
| `npm run build` | Pass, gồm prebuild validate và tạo chỉ mục |
| `git diff --check` | Pass |

Các test logic bao phủ đáp án của toàn bộ 152 câu, đủ 14 grader, chuẩn hoá chuỗi, shuffle theo seed, schema câu hỏi, mastery, SRS, migration/backup và render Markdown. Validator còn được thử với dữ liệu cố ý sai: thiếu coverage, thiếu anchor/ví dụ, trùng ID, liên kết gãy, tiền đề vòng lặp, bài mồ côi và tham chiếu đáp án không hợp lệ.

Kiểm thử trình duyệt xác minh:

- Dashboard, layout không tràn ngang, container bài học, bật/tắt bản dịch và liên kết đến rule.
- Các renderer bài tập, chấm ngay, sửa lỗi, làm lại câu sai và dữ liệu còn sau tải lại.
- Chế độ thi thử chỉ hiện lời giải sau khi nộp và có báo cáo theo rule.
- Tìm không dấu, bookmark, ghi chú, đổi theme, xuất và khôi phục bản sao lưu.

Các lỗi đã phát hiện và sửa trong quá trình kiểm tra gồm dấu đóng container bị GFM nhận thành hàng bảng, nhãn container không được đọc đúng, nhãn truy cập của dropdown và việc tính lượt ôn một phần như bộ practice đầy đủ.

## 6. Giới hạn và phần chưa triển khai

- Chưa hoàn thành curriculum L0–C1; checklist chỉ đánh dấu hai chủ đề mẫu đã có nội dung.
- Chưa có unit-test, level-test và placement test phân tầng/thích ứng.
- Kho kiến thức hiện chỉ phục vụ bản mẫu; chưa có bộ động từ bất quy tắc, glossary, lỗi thường gặp, so sánh cặp và các bảng tra đầy đủ.
- Mastery/SRS hiện là nền tảng; chưa hoàn thiện toàn bộ phạm vi ôn tập thông minh của giai đoạn 5.
- Chưa có PWA/service worker; không bảo đảm tải lại ứng dụng khi offline.
- Chưa chạy audit Lighthouse hoặc xác nhận toàn bộ WCAG AA. Kiểm tra responsive và các hỗ trợ bàn phím hiện có không thay thế một cuộc audit đầy đủ.
- Web Speech phụ thuộc giọng có sẵn và khả năng của thiết bị/trình duyệt.
- Bài viết lại và hoàn thành câu được chấm theo đáp án khai báo, không đánh giá mọi cách diễn đạt tiếng Anh hợp lệ.
- Lượt làm được lưu khi nộp bài; đáp án đang làm dở chưa được lưu để tiếp tục sau khi rời trang.
- Dữ liệu nằm trong trình duyệt hiện tại, không có đồng bộ đám mây. Xoá dữ liệu trình duyệt sẽ làm mất tiến độ nếu chưa sao lưu.
- Build static đã thành công nhưng chưa publish lên GitHub Pages, Netlify hoặc Vercel.

## 7. Nội dung cần duyệt trước giai đoạn 2

Theo mục 14 của đặc tả: **“Dừng và báo kết quả để người dùng duyệt chất lượng nội dung.”** Giai đoạn 2 chưa được bắt đầu.

Đề nghị duyệt hai bài mẫu và các bộ câu hỏi tương ứng theo các điểm sau:

- Độ chính xác, tự nhiên và dễ hiểu của giải thích tiếng Việt, ví dụ tiếng Anh và bản dịch.
- Tốc độ dẫn dắt, độ dài bài và mức độ phù hợp với người mất gốc.
- Độ rõ ràng của đề bài, các biến thể đáp án được chấp nhận và tính hợp lý của phương án sai.
- Mối liên hệ giữa từng câu hỏi với rule được gắn; mức độ bao phủ ngoại lệ và lỗi thường gặp.
- Quyết định giữ ID A2-03 cho bài mẫu hiện tại đơn và cách ghi nhận trong curriculum.

Ở lần bàn giao mẫu ban đầu, `content/REVIEW.md` không có mục cố ý để lại với nhãn `[CẦN XÁC MINH]`. Sau khi nhận phụ lục nâng cao, tài liệu này đã bổ sung các điểm cần đối chiếu nguồn; xem mục 9 bên dưới. Kiểm tra tự động chỉ xác minh các điều kiện có thể kiểm tra bằng chương trình.

Sau khi chất lượng mẫu được duyệt, giai đoạn 2 sẽ mở rộng toàn bộ lý thuyết và bài tập L0–A2, bổ sung bài thi theo unit/level và cập nhật lộ trình theo nội dung thực tế.

## 8. Cách chạy và tài liệu bàn giao

```sh
npm ci
npm run dev
```

Để kiểm tra và tạo bản static:

```sh
npm run validate
npm run coverage
npm test
npm run lint
npm run format:check
npm run build
```

Kiểm thử trình duyệt:

```sh
npx playwright install chromium
npm run test:e2e
```

Xem [README.md](../README.md) để biết phiên bản Node, cách thêm bài, cấu trúc đáp án, mở rộng module và deploy thư mục `dist/`.

## 9. Đối chiếu với phụ lục kiến thức nâng cao

### 9.1. Yêu cầu mới và tài liệu đã bổ sung

Đã lưu nguyên văn [phụ lục](PHU-LUC-KIEN-THUC-NANG-CAO.md). Phụ lục ưu tiên hơn các con số tối thiểu cũ ở mục 4–6 của SPEC. Mục tiêu mở rộng thành tài liệu ngữ pháp tham khảo đầy đủ; các phần 3.1–3.5 của báo cáo này vẫn là danh sách kiến thức **thực sự đã có**, không phải toàn bộ phạm vi mới.

| Tài liệu | Kết quả ở lượt cập nhật này |
|---|---|
| [LESSON-MAP.md](../content/grammar/LESSON-MAP.md) | Đề xuất 184 bài, gồm 87 bài lõi; bao phủ 208/208 mã thuộc 17 nhóm A–Q. Có phân level, trách nhiệm nội dung, cách tách bài và kế hoạch kho kiến thức. |
| [KNOWLEDGE-MATRIX.md](../content/grammar/KNOWLEDGE-MATRIX.md) | Kiểm kê đủ 208 mã, mỗi mã có bài/level dự kiến và ngưỡng câu tương ứng. Chưa có ánh xạ rule/câu được xác nhận theo schema mới; không đánh dấu đạt dựa trên kế hoạch. |
| [REVIEW.md](../content/REVIEW.md) | Ghi bất nhất mã D.14/D.15 trong ví dụ của phụ lục, file prompt chưa có, các điểm cần kiểm chứng ngữ pháp và phạm vi danh sách đầy đủ. |
| SPEC và README | Liên kết phụ lục và nêu rõ chuẩn mới thay ngưỡng cũ; không coi validator hiện tại là chứng nhận đạt phụ lục. |

| Level dự kiến | Số bài |
|---|---:|
| L0 | 21 |
| A1 | 24 |
| A2 | 37 |
| B1 | 46 |
| B2 | 43 |
| C1 | 13 |
| **Tổng** | **184** |

Đây là đề xuất phân bổ, có thể tăng số bài nếu outline vượt 18 rule hoặc khoảng 4.000 từ. Hai bài mẫu đã nằm trong tổng 184 bài, không cộng thêm lần nữa. Mười hai thì có bài lõi riêng; F.11 được tách thành tương lai hoàn thành và tương lai hoàn thành tiếp diễn. Các nhóm rộng như gián tiếp, mệnh đề trạng ngữ và hoà hợp được chia thành nhiều bài.

### 9.2. Hai bài mẫu so với ngưỡng mới

Theo bản đồ đề xuất, L0-01 là bài thường với các rule quan trọng/dễ sai; A2-03 là bài lõi. Phân loại `large` trong dữ liệu cũ chưa thay thế được phân loại này.

| Chỉ tiêu | L0-01 hiện có / yêu cầu mới | A2-03 hiện có / yêu cầu mới | Nhận định |
|---|---|---|---|
| Rule | 6 / 6–10 | 10 / 10–18 | Đạt số lượng; vẫn cần rà phạm vi từng rule. |
| Ví dụ song ngữ/rule | 3 / ≥4 | 3 / ≥6 | Thiếu ít nhất 6 và 30 ví dụ nếu giữ số rule hiện tại. |
| Câu luyện trực tiếp/rule | 8 / ≥12 cho rule quan trọng | 8 / ≥12 | Thiếu ít nhất 24 và 40 câu trực tiếp nếu giữ số rule hiện tại. |
| Tổng câu | 60 / ≥50 | 92 / ≥100 | L0 đạt ngưỡng tổng nhưng thiếu coverage mới; A2 thiếu cả hai. Với 10 rule lõi cần ít nhất 120 câu trực tiếp. |
| Loại câu hỏi | 14 / ≥5 | 14 / ≥5 | Đạt số loại; không chứng minh mọi rule đủ dạng và độ khó. |
| Từ lý thuyết tiếng Việt, loại trừ ví dụ | Chưa đo riêng / ≥1.000 | Chưa đo riêng / ≥2.000 | Chưa xác nhận; không lấy số từ của toàn Markdown thay thế. |
| Sáu chiều và lỗi tự kiểm tra/rule | Chưa có outline để rà đủ | Chưa có outline để rà đủ | Chưa xác nhận đạt; yêu cầu ≥3 lỗi/rule với nguyên nhân và cách tự kiểm tra. |
| Lỗi/bài, bảng đối chiếu | Có nội dung; chưa kiểm kê theo chuẩn mới | Có nội dung; chưa kiểm kê theo chuẩn mới | Cần rà ≥5 lỗi/bài; ≥1/2 bảng tương ứng và đối chiếu theo rule khi áp dụng. |
| Trap/context set | Không phải yêu cầu bắt buộc cho bài thường | Chưa có set riêng / ≥10 câu bẫy và ≥10 ô văn cảnh | Set mixed hiện tại không tự được tính là đáp ứng hai yêu cầu này. |
| `appendixCodes` và outline | Chưa có | Chưa có | Chưa xác nhận mã nào đạt theo hệ thống ánh xạ mới. |

Các con số thiếu ở bảng là mức thấp nhất trên **số rule đang có**, chưa bao gồm rule mới cần bổ sung để đủ cách dùng/ngoại lệ. Không thể chỉ thêm ví dụ và câu hỏi rồi kết luận đã đạt chuẩn tham khảo.

### 9.3. Phần chưa thực hiện và kiểm tra lần cập nhật này

Lượt này bổ sung tài liệu yêu cầu, bản đồ chờ duyệt và đối chiếu báo cáo. Chưa viết hàng loạt bài mới, chưa thay đổi nội dung chạy trên ứng dụng, schema, validator hoặc roadmap. `scripts/check-knowledge-matrix.ts` và cơ chế làm fail validate theo phụ lục còn thuộc bước triển khai sau khi duyệt bản đồ; chưa có lệnh `npm run check-knowledge-matrix`.

Đã kiểm tra danh mục trong file người dùng: 208 mã duy nhất; mỗi mã có ít nhất một bài dự kiến; ID bài không trùng; ma trận đủ 208 mã. Kiểm tra này chỉ xác nhận tính nhất quán của tài liệu kế hoạch. Không chạy lại test/lint/build ứng dụng cho thay đổi tài liệu; kết quả ở mục 5 là kết quả lịch sử theo chuẩn cũ, không phải kết quả kiểm tra phụ lục.

### 9.4. Bước duyệt tiếp theo

Phần 4 phụ lục quy định: **“bản đồ bài học chính thức (`LESSON-MAP.md`) do agent lập và tôi duyệt.”** Bản đồ đã được lập đủ để rà soát tại [LESSON-MAP.md](../content/grammar/LESSON-MAP.md); chờ duyệt danh sách, phân level và cách xử lý hai ID mẫu trước khi triển khai nội dung.

Sau duyệt: triển khai schema/checker, lập outline, nâng cấp mẫu, rồi hoàn thành từng level theo chuẩn mới. Ma trận phải dựa trên rule/câu thật; mã chưa học tới vẫn được báo chưa phủ. Không bỏ gate kiểm tra toàn curriculum để làm validate/build pass khi nội dung còn thiếu.

## 10. Kiến thức đã bổ sung theo yêu cầu tiếp tục

Người dùng đã yêu cầu “thêm kiến thức” rồi “tiếp tục”. Lượt này đã viết nội dung và đưa vào ứng dụng; không còn dừng ở việc lập bản đồ. Những quyết định chờ duyệt ở mục 7/9 là trạng thái lịch sử trước yêu cầu tiếp tục này.

### 10.1. Bài mới L0-12 — Đại từ nhân xưng và sở hữu

Nguồn: [bài học](../content/grammar/lessons/L0-12.md), [outline](../content/grammar/outlines/L0-12.md), [108 câu luyện](../content/grammar/exercises/L0-12.json) và [bảng tra nhanh](../content/grammar/kb/cheatsheets/cheatsheet-pronouns.md).

| Rule | Kiến thức đã viết |
|---|---|
| L0-12.01 | Đại từ chủ ngữ I/you/he/she/it/we/they; thay cụm danh từ, đổi góc nhìn người nói/nghe, chia be, tránh lặp chủ ngữ; giới thiệu giới hạn singular they. |
| L0-12.02 | Đại từ tân ngữ me/you/him/her/it/us/them sau động từ/giới từ; kiểm tra “for Lan and me”; phân biệt vai trò với chủ ngữ và giới hạn của mẹo nhìn vị trí. |
| L0-12.03 | My/your/his/her/its/our/their trước danh từ hoặc tính từ + danh từ; chọn theo người sở hữu, quan hệ gia đình/xã hội, tránh the my và book my. |
| L0-12.04 | Mine/yours/his/hers/ours/theirs thay cả cụm sở hữu; hoà hợp theo vật được chỉ tới, không thêm dấu nháy, a friend of mine và giới hạn dùng its độc lập. |
| L0-12.05 | Its so với it’s; thử mở rộng it is, nhận diện danh từ trung tâm, giới thiệu it has trong cấu trúc phù hợp, tránh its’. |
| L0-12.06 | Your so với you’re; sở hữu so với you are, phủ định/câu hỏi, tính từ chen giữa và cách tự sửa you’r. |
| L0-12.07 | Their/there/they’re: sở hữu, nơi chốn/mẫu tồn tại, they are; tránh lặp are và phân biệt their/theirs. |
| L0-12.08 | Whose/who’s: hỏi người sở hữu so với hỏi danh tính; whose trước danh từ/đứng độc lập, hoà hợp số và ghi chú who has. |

Mỗi rule có công thức, giải thích tiếng Việt, ngoại lệ/giới hạn, ghi chú văn phong, bảng đối chiếu, **4 ví dụ song ngữ**, **1 hội thoại**, **3 lỗi kèm nguyên nhân và tự kiểm tra**. Tổng cộng 32 ví dụ, 8 hội thoại, 24 tình huống lỗi và 8 bảng đối chiếu theo rule, ngoài bảng tổng quan.

Bài tập gồm **96 câu practice** (12 câu/rule, mỗi rule 4 dễ + 4 vừa + 4 khó) và **12 câu mixed**. Có 7 dạng: chọn đáp án, dropdown, điền từ, hoàn thành câu, viết lại, nối và cloze. Tổng mức khó: 32 dễ / 35 vừa / 41 khó. Mỗi đề nêu rõ người/vật tham chiếu hoặc cấu trúc cần dùng; câu viết lại giới hạn phần được thay để có đáp án chấm rõ ràng.

Phạm vi D.01 ở bài này là chủ ngữ/tân ngữ và một số ghi chú biên. It giả, you/we chung, singular they chi tiết và tham chiếu nâng cao vẫn còn ở các bài sau; không coi việc đã gắn mã là hoàn thành toàn mã. D.02 được triển khai ở mức nền tảng với bảng sở hữu và các cặp dễ nhầm.

### 10.2. Nâng cấp L0-01 — To be

- Thêm **6 ví dụ**, đưa tổng lên 24, tức 4 ví dụ/rule.
- Thêm **24 câu luyện**, đưa tổng lên 84, gồm 72 practice + 12 mixed; mỗi rule có ít nhất 12 câu trực tiếp và đủ ba mức khó.
- Bổ sung chọn be theo danh từ trung tâm, one of/information; giới hạn viết tắt, câu hỏi phủ định, đổi đại từ khi trả lời, phân biệt từ hỏi và cách diễn đạt tuổi/nghề/trạng thái/vị trí.
- Mỗi rule có bảng đối chiếu và ít nhất ba lỗi có nguyên nhân/tự kiểm tra; toàn bài có 18 tình huống lỗi và 7 container đối chiếu. Thêm hội thoại cho các rule còn thiếu.
- Có [outline nâng cấp](../content/grammar/outlines/L0-01.md) và gắn mã E.07/M.06/M.07. Giữ ID và phạm vi các rule/câu cũ để không làm lệch lịch sử đã lưu.

### 10.3. Tổng nội dung hiện có

| Bài | Rule | Ví dụ song ngữ | Câu hỏi | Bộ bài | Dạng câu hỏi |
|---|---:|---:|---:|---:|---:|
| L0-01 — To be | 6 | 24 | 84 | 3 | 14 |
| L0-12 — Đại từ và sở hữu | 8 | 32 | 108 | 3 | 7 |
| A2-03 — Hiện tại đơn | 10 | 30 | 92 | 3 | 14 |
| **Tổng** | **24** | **86** | **284** | **9** | **14 dạng được hỗ trợ** |

Đã có 3 bảng tra nhanh. Chỉ mục tìm kiếm gồm 30 mục: 3 bài, 24 rule và 3 bảng tra. Bài mới đã được thêm vào lộ trình L0, có liên kết từ bài be và có thể luyện tập ngay. Các dòng giao diện từng ghi cố định “hai bài mẫu” đã được thay bằng thông tin theo dữ liệu hoặc mô tả không cố định số lượng.

Schema đã nhận `appendixCodes` tuỳ chọn. Ma trận được đối chiếu từ dữ liệu thật: **14 rule ánh xạ tới 5 mã**, 203 mã còn chưa có ánh xạ. Số câu trực tiếp theo mã (mỗi câu đúng một rule, không đếm trùng ID): D.01 = 25; D.02 = 73; E.07 = 49; M.06 = 12; M.07 = 12. Các câu mixed đơn rule được tính, nên có thể nhiều hơn phần practice. Đây chưa phải chứng nhận đủ mọi tiểu mục của mã.

### 10.4. Kiểm tra và giới hạn còn lại

- `validate`: pass cho 3 bài / 24 rule / 284 câu / 9 bộ theo validator hiện có.
- `coverage`: không rule nào thiếu ngưỡng hiện tại; kiểm kê riêng xác nhận L0-01/L0-12 đều có ≥12 câu trực tiếp/rule.
- `test`: **328 test pass** trong 5 file. Đã sửa test renderer vốn giả định cố định 3 ví dụ/rule để đối chiếu đúng số ví dụ có trong Markdown.
- `lint`, `format:check`, `build`: pass. Build đã gồm bài mới và bảng tra mới.
- `test:e2e`: **8 test pass** trên desktop và mobile 360px, gồm mở bài đại từ, anchor rule, bảng tra mới, không tràn ngang và hoàn thành bộ mixed L0-12. Đã sửa kỳ vọng điểm số cố định của bộ be để tính theo số câu thực tế.

L0-12 có khoảng 4.100 đơn vị phân cách bằng khoảng trắng nếu tính toàn thân Markdown gồm ví dụ, bảng và nhãn. Đây không phải số từ tiếng Việt được tách từ bằng công cụ ngôn ngữ; không dùng con số này để tự chứng nhận ngưỡng từ lý thuyết. Outline có 8 rule, không cần tách theo ngưỡng số rule.

Chưa hoàn thành level L0, chưa nâng cấp A2-03 theo chuẩn mới, chưa có bài thi unit/level hoặc `scripts/check-knowledge-matrix.ts`. Validator hiện tại chưa bắt buộc ánh xạ đủ 208 mã và chưa kiểm định đủ sáu chiều bằng máy; các kết quả pass phía trên chỉ phản ánh phạm vi kiểm tra đang triển khai. Nội dung đã thêm có thể học ngay, còn mục tiêu toàn curriculum vẫn đang thực hiện.


## 11. Mở rộng kiến thức trực tiếp trên giao diện — 16/10/2026

### 11.1. Nội dung đã thêm

Kho kiến thức tại `/#/knowledge` hiện có **17 chuyên đề với 208 mục tra cứu** theo toàn bộ mã A–Q của danh mục phụ lục. Mỗi mục có nội dung đọc thực: giải thích bằng tiếng Việt, cấu trúc/cách dùng, một ví dụ Anh–Việt, lỗi cần tránh và đối chiếu với cấu trúc dễ nhầm. Tổng cộng thêm 208 ví dụ song ngữ trong các mục, ngoài ví dụ ở bảng và 86 ví dụ của ba bài học đã có.

| Nhóm | Chuyên đề | Số mục |
|---|---|---:|
| A | Âm thanh, chính tả và dấu câu | 12 |
| B | Danh từ | 14 |
| C | Mạo từ, hạn định từ và lượng từ | 17 |
| D | Đại từ | 11 |
| E | Động từ và các mẫu cấu tạo | 12 |
| F | Thì và thể | 16 |
| G | Modal verbs | 14 |
| H | Điều kiện, giả định và ước muốn | 8 |
| I | Bị động và sai khiến | 10 |
| J | V-ing, to V và mệnh đề phân từ | 15 |
| K | Tính từ, trạng từ và so sánh | 15 |
| L | Giới từ và liên từ | 13 |
| M | Cấu trúc và các kiểu câu | 17 |
| N | Mệnh đề và câu gián tiếp | 11 |
| O | Nhấn mạnh và tổ chức thông tin | 7 |
| P | Liên kết, văn phong và biến thể | 9 |
| Q | Cấu tạo từ và họ từ | 7 |

Có **8 bảng tổng hợp/đối chiếu**: 44 âm trong mô hình IPA Anh-Anh truyền thống; 12 thì; các chức năng modal; các kiểu điều kiện; 12 dạng bị động có đánh dấu dạng hiếm; các mẫu bổ ngữ V-ing/to V; so sánh; biến đổi trong câu gián tiếp. Các bảng nêu điều kiện áp dụng và giới hạn, không dạy lùi thì hoặc ghép thì một cách máy móc.

### 11.2. Cách đọc trên giao diện

- Mở **Kho kiến thức**, chọn một trong 17 thẻ chuyên đề; trang Tổng quan cũng có đường dẫn giới thiệu 208 mục.
- Tìm không dấu hoặc lọc theo nhóm/cấp độ L0–C1/loại nội dung. Chỉ mục gồm **255 mục**: 17 chuyên đề + 208 mục tra cứu + 3 bài học + 24 rule + 3 bảng tóm tắt. Kết quả dài có nút xem thêm.
- Trong chuyên đề, dùng mục lục để tới đúng mục hoặc bảng. Liên kết trực tiếp như `/#/knowledge/reference/H?topic=H.03` mở thẳng phần đảo ngữ điều kiện và hoạt động sau khi tải lại.
- Có đánh dấu từng mục, ẩn/hiện bản dịch, nghe ví dụ bằng giọng đọc trình duyệt, in chuyên đề và chuyển nhóm trước/sau. Đánh dấu được lưu cùng dữ liệu học trên thiết bị.
- Các mục phù hợp có liên kết tới bài học đang có bài tập. Không hiển thị nút luyện dẫn tới bài chưa tồn tại.
- Giao diện có mục lục bên cạnh trên desktop, mục lục cuộn trên điện thoại; bảng dài cuộn ngang trong khung. Mỗi chuyên đề tải nội dung riêng khi mở.

### 11.3. Tệp và kiểm tra

Dữ liệu mới nằm ở `content/grammar/kb/reference/A.json` đến `Q.json`; `catalogue.json` giữ danh mục mã. Outline là `content/grammar/outlines/REFERENCE-A-Q.md`. Trang mới nằm tại `src/features/knowledge-base/ReferencePage.tsx`, schema tại `src/types/reference.ts`.

`scripts/reference-utils.ts` kiểm tra cấu trúc, đủ mã trong catalogue, mã không trùng/đúng nhóm, số ô bảng và liên kết bài học. `validate` gọi kiểm tra này; test đối chiếu với các dòng mã thật trong Phần 3 của phụ lục. Chỉ mục tìm kiếm và metadata chuyên đề được sinh lại bằng `npm run index`.

Kết quả kiểm tra sau bổ sung:

- `validate`, `coverage`, `index`, `build`, `lint`, `format:check`: đạt trong phạm vi bộ kiểm tra hiện có.
- Vitest: **332 test đạt / 6 file**, gồm kiểm tra thiếu/trùng/sai nhóm, liên kết hỏng, bảng lỗi và đối chiếu mã phụ lục.
- Playwright: **12 kịch bản đã đạt trên desktop/mobile qua các lượt chạy**: 8 kịch bản cũ đạt trong lần chạy toàn bộ; 2 kịch bản đọc 17 chuyên đề đạt; 2 kịch bản tìm kiếm/lọc/đánh dấu đạt khi chạy lại sau sửa nhãn bộ lọc và điều chỉnh kỳ vọng tìm kiếm gần đúng. Không mô tả lần chạy đầu có lỗi là pass.
- Đã xem ảnh chụp trang chuyên đề trên desktop và mobile; kiểm tra không tràn ngang, đủ nội dung từng nhóm, bảng 12 thì, bật/tắt dịch, anchor và lưu bookmark sau tải lại. Giọng đọc phụ thuộc khả năng trình duyệt, chưa kiểm định chất lượng phát âm tự động.

### 11.4. Phạm vi còn cần mở rộng

208 mục có nội dung tra cứu không đồng nghĩa 208 mã đã đạt toàn bộ chuẩn độ sâu, số ví dụ, sáu chiều và bài luyện của phụ lục. Hiện vẫn có **3 bài học / 24 rule / 284 câu / 9 bộ**, 5 mã có ánh xạ rule/câu và 203 mã chưa ánh xạ. Không tính các đoạn tra cứu thành bài tập hoặc nâng trạng thái hoàn thành lộ trình.

Các kho từ bất quy tắc, phrasal verbs, collocations và word families chưa đủ ngưỡng kiểm kê lớn trong phụ lục; những mục này hiện giải thích nguyên tắc và mẫu tiêu biểu. Cần tiếp tục mở rộng mỗi mục thành bài chuyên sâu, bổ sung ngữ cảnh/bài tập, hoàn thiện kiểm tra ma trận rule/câu và duyệt chuyên môn. Nguồn đối chiếu và vấn đề biên tập được cập nhật ở `content/REVIEW.md`.
