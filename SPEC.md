# SPEC: Website Học Ngữ Pháp Tiếng Anh (Pure Frontend)

> Cập nhật 16/10/2026: [Phụ lục kiến thức nâng cao](docs/PHU-LUC-KIEN-THUC-NANG-CAO.md) bổ sung và ghi đè các ngưỡng tối thiểu tại mục 4, 5, 6 bên dưới. [Bản đồ bài học đề xuất](content/grammar/LESSON-MAP.md) đã được dùng để bắt đầu mở rộng nội dung theo yêu cầu “thêm kiến thức” và “tiếp tục” của người dùng; các bài chưa viết vẫn là kế hoạch. Các con số và nội dung mẫu từ giai đoạn 1 không được xem là đã đạt chuẩn mới.

> Tài liệu yêu cầu dành cho AI agent. Đọc toàn bộ trước khi code. Khi có mâu thuẫn, ưu tiên theo thứ tự: **(1) Chất lượng & độ đầy đủ của kiến thức → (2) Bài tập bao phủ 100% lý thuyết → (3) Kho kiến thức & Roadmap → (4) UI/UX → (5) Tính năng phụ.**

---

## 0. Quy tắc làm việc cho Agent

1. **Nội dung là sản phẩm chính, code chỉ là vỏ.** Không được tiết kiệm nội dung để kịp tiến độ. Nếu phải cắt, cắt UI/tính năng phụ, không cắt lý thuyết hoặc bài tập.
2. **Làm theo giai đoạn** (mục 14). Xong mỗi giai đoạn phải chạy script kiểm tra (mục 12) và báo kết quả trước khi sang giai đoạn tiếp.
3. **Không bịa kiến thức.** Mọi quy tắc ngữ pháp phải đúng chuẩn (Anh-Anh là chính, ghi chú khác biệt Anh-Mỹ khi có). Nếu không chắc về một ngoại lệ, ghi chú `[CẦN XÁC MINH]` trong file riêng `content/REVIEW.md` thay vì viết bừa.
5. **Mọi nội dung nằm trong file dữ liệu, không hard-code trong component.** Thêm bài học/bài tập mới chỉ cần thêm file, không sửa code.
6. **Thiết kế để mở rộng** thêm 4 kỹ năng (Nghe, Nói, Đọc, Viết) và Từ vựng sau này mà không phải viết lại (mục 11).

---

## 1. Mục tiêu sản phẩm

- Website học ngữ pháp tiếng Anh **hoàn toàn chạy phía client**, không backend, không database server, không đăng nhập. Deploy được lên GitHub Pages / Netlify / Vercel như static site.
- Người học đi từ **mất gốc (Level 0)** đến **thành thạo (C1)**.
- Ba trụ cột:
  1. **Lý thuyết** đầy đủ, chi tiết, giải thích bằng tiếng Việt, ví dụ tiếng Anh có dịch.
  2. **Bài tập** bao phủ toàn bộ lý thuyết, có giải thích từng đáp án.
  3. **Kho kiến thức (Knowledge Base)** tra cứu nhanh + **Roadmap** học theo lộ trình.
- Người dùng mục tiêu: người Việt, từ chưa biết gì đến trung - cao cấp, tự học.

### Ngoài phạm vi (giai đoạn đầu)
Backend, tài khoản, đồng bộ đám mây, chấm điểm bằng AI, Nghe/Nói/Đọc/Viết, từ vựng. (Chỉ chuẩn bị cấu trúc để thêm sau.)

---

## 2. Công nghệ

| Hạng mục | Yêu cầu |
|---|---|
| Build | **Vite** |
| UI | **React 18 + TypeScript (strict)** |
| Router | `react-router-dom` dùng **HashRouter** (để chạy được trên static hosting không cần rewrite) |
| Style | **Tailwind CSS** + CSS variables cho theme |
| State | **Zustand** (có middleware `persist` vào localStorage) |
| Nội dung lý thuyết | **Markdown + frontmatter**, render bằng `react-markdown` + `remark-gfm` + plugin container tuỳ chỉnh (mục 4.3) |
| Nội dung bài tập | **JSON** (có JSON Schema / Zod để validate) |
| Tìm kiếm | **Fuse.js** (hoặc MiniSearch), index build sẵn lúc build |
| Lưu trữ | `localStorage` (tiến độ, cài đặt), có **export/import JSON** để sao lưu |
| Test | **Vitest** cho logic chấm bài/SRS; script Node cho validate nội dung |
| Lint | ESLint + Prettier |

Không dùng thư viện cần server. Font hỗ trợ tiếng Việt đầy đủ (ví dụ Inter / Be Vietnam Pro) và font có phiên âm IPA hiển thị đúng.

---

## 3. Cấu trúc thư mục

```
/
├─ SPEC.md
├─ content/
│  ├─ REVIEW.md                    # ghi chú nội dung cần người xác minh
│  ├─ grammar/
│  │  ├─ roadmap.json              # lộ trình: levels -> units -> lessons
│  │  ├─ lessons/
│  │  │  ├─ L0-01-to-be.md         # 1 file = 1 bài lý thuyết
│  │  │  ├─ ...
│  │  ├─ exercises/
│  │  │  ├─ L0-01-to-be.json       # 1 file bài tập tương ứng 1 bài lý thuyết
│  │  │  ├─ ...
│  │  └─ kb/                       # kho kiến thức tra cứu
│  │     ├─ irregular-verbs.json
│  │     ├─ cheatsheets/*.md
│  │     ├─ glossary.json          # thuật ngữ ngữ pháp Anh-Việt
│  │     ├─ common-mistakes.json
│  │     └─ comparisons/*.md       # so sánh cặp dễ nhầm
│  ├─ skills/                      # (để trống, dùng sau) listening/speaking/reading/writing
│  └─ vocabulary/                  # (để trống, dùng sau)
├─ scripts/
│  ├─ validate-content.ts          # kiểm tra schema + coverage (mục 12)
│  ├─ build-search-index.ts
│  └─ coverage-report.ts           # xuất bảng coverage ra console + file
├─ src/
│  ├─ app/                         # router, layout, providers
│  ├─ features/
│  │  ├─ grammar/                  # lesson viewer, exercise engine
│  │  ├─ roadmap/
│  │  ├─ knowledge-base/
│  │  ├─ progress/                 # store, SRS, sổ lỗi sai
│  │  ├─ placement-test/
│  │  └─ settings/
│  ├─ modules/                     # registry module: grammar, (skills, vocab sau này)
│  ├─ components/ui/
│  ├─ lib/                         # markdown plugins, grading, srs, storage
│  └─ types/
└─ package.json
```

---

## 4. Mô hình nội dung

### 4.1 Khái niệm cốt lõi: **Rule (điểm kiến thức)**

Mỗi bài lý thuyết được chia thành các **rule** nhỏ, mỗi rule có ID duy nhất, dạng `{lessonId}.{số}`, ví dụ `L0-01.03`. Rule là **đơn vị bao phủ**: một rule = một quy tắc/cách dùng/ngoại lệ/lỗi thường gặp có thể kiểm tra được.

Ví dụ rule của bài Thì hiện tại đơn:
- `A2-03.01` Công thức khẳng định (I/you/we/they + V)
- `A2-03.02` Thêm -s/-es cho ngôi thứ ba số ít: quy tắc đuôi -o, -s, -x, -ch, -sh
- `A2-03.03` Đuôi phụ âm + y → -ies
- `A2-03.04` Phủ định với do not / does not
- `A2-03.05` Câu hỏi Yes/No và Wh-
- `A2-03.06` Dùng cho thói quen, sự thật hiển nhiên, lịch trình
- `A2-03.07` Trạng từ tần suất và vị trí của chúng
- `A2-03.08` Lỗi thường gặp: *He don't*, *She go*

### 4.2 Schema bài lý thuyết (frontmatter của `.md`)

```yaml
---
id: A2-03
title: Thì hiện tại đơn (Present Simple)
titleEn: Present Simple
level: A2                 # L0 | A1 | A2 | B1 | B2 | C1
unit: U-tenses-basic
order: 3
estimatedMinutes: 25
prerequisites: [L0-01, A1-02]
tags: [tense, present, verb]
summary: "Dùng để nói về thói quen, sự thật, lịch trình."
rules:                     # danh sách rule, PHẢI khớp với các anchor trong thân bài
  - id: A2-03.01
    label: Công thức khẳng định
  - id: A2-03.02
    label: Thêm -s/-es cho ngôi thứ ba số ít
  # ...
related: [A2-04, kb:cheatsheet-tenses]
---
```

### 4.3 Cú pháp thân bài Markdown

Dùng Markdown chuẩn + **container tuỳ chỉnh** (agent tự viết remark plugin). Mỗi rule bắt đầu bằng heading kèm anchor ID:

```markdown
## Thêm -s/-es cho ngôi thứ ba số ít {#A2-03.02}

:::formula
S (he/she/it) + V-s/es + O
:::

:::rule
| Động từ kết thúc bằng | Cách thêm | Ví dụ |
|---|---|---|
| -s, -x, -z, -ch, -sh, -o | + es | watch → watches, go → goes |
| phụ âm + y | y → ies | study → studies |
| nguyên âm + y | + s | play → plays |
| còn lại | + s | work → works |
:::

:::example
- She **watches** TV every evening. | Cô ấy xem TV mỗi tối.
- He **studies** English at night. | Anh ấy học tiếng Anh vào ban đêm.
:::

:::warning
Ngoại lệ: *have → has* (không phải *haves*).
:::

:::mistake
❌ He **go** to school. → ✅ He **goes** to school.
Giải thích: ngôi thứ ba số ít bắt buộc có -s/-es.
:::

:::tip
Mẹo nhớ: ...
:::
```

Các container bắt buộc hỗ trợ: `formula`, `rule`, `example` (dòng `EN | VI`), `note`, `warning` (ngoại lệ), `mistake` (lỗi sai ❌/✅), `tip`, `compare` (bảng so sánh), `dialogue` (hội thoại ngắn), `recap` (tóm tắt cuối bài), `pronunciation` (IPA, quy tắc phát âm -s/-ed).

### 4.4 Yêu cầu nội dung của MỖI bài lý thuyết

Mỗi bài **bắt buộc** có đủ các phần, theo thứ tự:

1. **Mục tiêu bài học** (3–6 gạch đầu dòng "sau bài này bạn sẽ...").
2. **Khởi động / tình huống** (1–2 ví dụ thực tế để thấy vấn đề).
3. **Khái niệm & khi nào dùng** (giải thích bằng tiếng Việt, đơn giản trước, chi tiết sau).
4. **Các rule chi tiết**, mỗi rule gồm: công thức → giải thích → bảng (nếu có) → **tối thiểu 3 ví dụ song ngữ** (khẳng định, phủ định, nghi vấn khi áp dụng được).
5. **Ngoại lệ & trường hợp đặc biệt** (không được bỏ qua).
6. **Dấu hiệu nhận biết** (signal words) nếu là thì/cấu trúc.
7. **Lỗi thường gặp của người Việt** (ít nhất 3 lỗi, nêu nguyên nhân: dịch word-by-word, ảnh hưởng tiếng Việt...).
8. **So sánh với điểm dễ nhầm** (ví dụ Present Simple vs Present Continuous), dùng `:::compare`.
9. **Phát âm / chính tả** nếu liên quan (-s/-es, -ed, trọng âm...).
10. **Anh-Anh vs Anh-Mỹ** nếu có khác biệt.
11. **Tóm tắt (recap)**: bảng/checklist 1 màn hình.
12. **Liên kết** sang bài tiền đề, bài tiếp theo, mục kho kiến thức liên quan.

Độ sâu theo level:
- **L0–A1**: giải thích cực chậm, từ ngữ tiếng Việt dễ hiểu, ví dụ ngắn dùng từ vựng cơ bản (≤ 1000 từ thông dụng), có phiên âm khi cần. Không dùng thuật ngữ mà chưa giải thích.
- **A2–B1**: thêm bảng so sánh, ngoại lệ, lỗi thường gặp nhiều hơn.
- **B2–C1**: sắc thái, văn phong trang trọng/thân mật, cấu trúc đảo ngữ/giả định/rút gọn mệnh đề, ví dụ học thuật và đời sống phức tạp; có thể giải thích một phần bằng tiếng Anh kèm tiếng Việt.

Mọi ví dụ phải **tự nhiên, đúng ngữ pháp, không gượng ép**. Không lặp lại cùng một câu ví dụ giữa các bài.

---

## 5. Danh mục ngữ pháp cần phủ (Curriculum)

Agent phải tạo `roadmap.json` và các bài theo danh mục dưới đây. Có thể **tách nhỏ thêm** bài nếu quá dài, **không được bỏ** chủ đề. (Chia bài là gợi ý; mỗi dòng ≈ 1 bài hoặc 1 nhóm bài.)

### Level 0 – Mất gốc (Nền tảng)
- Bảng chữ cái, nguyên âm/phụ âm, cách đọc cơ bản, phiên âm IPA căn bản
- Từ loại tổng quan: danh từ, động từ, tính từ, trạng từ, đại từ, giới từ, liên từ, thán từ, mạo từ
- Thành phần câu: chủ ngữ, vị ngữ, tân ngữ, bổ ngữ
- Câu đơn giản S + V (+ O); trật tự từ trong câu tiếng Anh
- Đại từ nhân xưng (I/you/he/she/it/we/they), đại từ sở hữu & tính từ sở hữu căn bản
- Động từ **to be** (am/is/are): khẳng định, phủ định, nghi vấn, viết tắt
- **There is / There are**
- This/That/These/Those
- Mạo từ a/an/the cơ bản
- Số đếm, số thứ tự, ngày tháng, giờ giấc
- Dấu câu & viết hoa căn bản

### A1 – Sơ cấp
- Danh từ đếm được/không đếm được; số nhiều quy tắc & bất quy tắc
- Some/any/a lot of/much/many/a few/a little (cơ bản)
- Thì hiện tại đơn (toàn bộ chi tiết) + trạng từ tần suất
- Thì hiện tại tiếp diễn; động từ không chia tiếp diễn (stative verbs) bước đầu
- Have/has got; sở hữu cách 's
- Can/can't (khả năng, xin phép)
- Giới từ chỉ thời gian (at/on/in), nơi chốn, phương hướng
- Câu mệnh lệnh, Let's
- Câu hỏi Yes/No, từ để hỏi Wh- (what, where, when, who, why, how, which, whose)
- Tính từ & thứ tự cơ bản; trạng từ cách thức
- Like/love/hate + V-ing; want to + V
- Đại từ tân ngữ (me/him/her...)
- Liên từ cơ bản: and, but, or, because, so

### A2 – Tiền trung cấp
- Thì quá khứ đơn (to be, động từ thường, V-ed quy tắc, bất quy tắc) + phát âm -ed
- Quá khứ tiếp diễn; quá khứ đơn vs quá khứ tiếp diễn; when/while
- Tương lai: will, be going to, hiện tại tiếp diễn chỉ kế hoạch; phân biệt
- So sánh hơn, so sánh nhất, so sánh bằng (as...as); so sánh kép bước đầu
- Hiện tại hoàn thành (cơ bản): ever/never/already/yet/just/for/since
- Modal verbs: must, mustn't, have to, don't have to, should, shouldn't, may, might, could, would
- Gerund & Infinitive cơ bản
- Lượng từ nâng cao; mạo từ nâng cao (zero article)
- Đại từ phản thân; đại từ bất định (some-/any-/no-/every-)
- Câu điều kiện loại 0 và loại 1
- Mệnh đề quan hệ xác định cơ bản (who/which/that/where)
- Câu hỏi đuôi (question tags) cơ bản; so/neither, too/either
- Trạng từ: mức độ (very, quite, too, enough), vị trí trạng từ
- Cụm động từ (phrasal verbs) phổ biến (nhóm theo chủ đề)
- Used to / be used to / get used to

### B1 – Trung cấp
- Hiện tại hoàn thành vs quá khứ đơn; hiện tại hoàn thành tiếp diễn
- Quá khứ hoàn thành; quá khứ hoàn thành tiếp diễn
- Tương lai tiếp diễn, tương lai hoàn thành (bước đầu)
- **Câu bị động**: tất cả các thì cơ bản, với modal, have something done
- **Câu gián tiếp** (reported speech): câu kể, câu hỏi, mệnh lệnh; động từ tường thuật
- Câu điều kiện loại 2, loại 3, hỗn hợp; unless, as long as, provided that
- Mệnh đề quan hệ không xác định; rút gọn mệnh đề quan hệ; whose, whom, which (cả mệnh đề)
- Gerund vs Infinitive (đầy đủ: stop, remember, forget, try, regret, mean, go on...)
- Modal verbs chỉ suy đoán (must have, can't have, might have...) ở mức cơ bản
- Wish / If only (hiện tại, quá khứ)
- Liên từ & từ nối: although, despite/in spite of, however, therefore, whereas, while
- Mệnh đề chỉ mục đích, nguyên nhân, kết quả, nhượng bộ (so that, in order to, so...that, such...that)
- Cấu trúc: too...to, enough...to, It takes (time) to..., prefer, would rather
- Câu hỏi đuôi nâng cao; câu hỏi gián tiếp
- Từ chỉ định lượng nâng cao, so sánh nâng cao (the more..., the more...)
- Cụm động từ nâng cao; thành ngữ thông dụng (tách riêng khỏi ngữ pháp thuần)

### B2 – Trung cao cấp
- Tổng ôn và phân biệt toàn bộ hệ thống thì (tense contrast), thì trong ngữ cảnh kể chuyện
- Modal verbs nâng cao: suy đoán hiện tại/quá khứ, nghĩa vụ trong quá khứ, needn't have, be supposed to, be bound to
- Bị động nâng cao: bị động với động từ tường thuật (It is said that / He is said to...), causative (get/have/make/let)
- Câu điều kiện nâng cao: đảo ngữ điều kiện, were to, should happen to, but for, otherwise, supposing
- Reported speech nâng cao; reporting verbs với các cấu trúc (accuse of, insist on, suggest...)
- Mệnh đề danh ngữ, mệnh đề nhượng bộ, mệnh đề trạng ngữ rút gọn (V-ing/V-ed/having V-ed)
- Mạo từ & hạn định từ nâng cao; danh từ ghép; sở hữu cách nâng cao
- Tính từ & trạng từ nâng cao (thứ tự tính từ, gradable/ungradable, tính từ -ed/-ing)
- Giới từ đi sau động từ/tính từ/danh từ (dependent prepositions)
- Cấu trúc nhấn mạnh: câu chẻ (cleft sentences: It is... that..., What... is...)
- Đảo ngữ cơ bản (Never, Rarely, Hardly...when, Not only...but also, No sooner...than)
- Subjunctive (suggest/demand that + bare V), It's time/high time, would rather + clause
- Song song cấu trúc (parallelism); hòa hợp chủ vị (subject-verb agreement) đầy đủ
- Word formation (tiền tố, hậu tố, chuyển loại từ)

### C1 – Cao cấp / Thành thạo
- Đảo ngữ nâng cao và các trường hợp trang trọng/văn viết
- Mệnh đề rút gọn & cấu trúc phân từ phức tạp, absolute constructions
- Cấu trúc nhấn mạnh nâng cao, fronting, cleft/pseudo-cleft, thể bị động nhấn mạnh
- Hedging & mức độ chắc chắn (seem, appear, tend to, arguably...), ngữ pháp văn phong học thuật
- Danh hoá (nominalisation); mật độ từ vựng ngữ pháp trong văn viết
- Mệnh đề quan hệ nâng cao (prep + whom/which, quantifier + of which), mệnh đề đồng vị
- Ellipsis & substitution (lược bỏ, thay thế), cohesion & discourse markers
- Cách dùng tinh tế: thì & thể trong văn kể chuyện, hiện tại lịch sử, will/would thói quen, be to V
- Subjunctive/mandative, were-subjunctive, formulaic subjunctive
- Sắc thái modal (nuance), mức độ trang trọng (register), phân biệt cặp dễ nhầm nâng cao
- Chấm câu nâng cao (dấu ;, :, —, dấu phẩy trong mệnh đề)
- Lỗi phổ biến ở trình độ cao, phân tích câu phức

> Agent phải lập file `content/grammar/CURRICULUM-CHECKLIST.md` đối chiếu từng mục ở trên với ID bài, đánh dấu `[x]` khi hoàn thành.

---

## 6. Bài tập (ƯU TIÊN CAO NHẤT cùng lý thuyết)

### 6.1 Nguyên tắc bao phủ
- **Mỗi rule trong lý thuyết phải có ít nhất 4 câu bài tập** trực tiếp kiểm tra rule đó (gắn `ruleIds`).
- Với rule quan trọng/dễ sai: ≥ 8 câu, đủ cả mức dễ, vừa, khó.
- Mỗi bài có thêm **bài tổng hợp** (mixed) kiểm tra nhiều rule cùng lúc.
- Mỗi **unit** có bài **kiểm tra cuối unit**; mỗi **level** có **bài thi cuối level**.
- Script `validate-content` **phải fail** nếu có rule thiếu bài tập (mục 12).

### 6.2 Các dạng bài (engine bắt buộc hỗ trợ)

| type | Mô tả |
|---|---|
| `multiple-choice` | Chọn 1 đáp án đúng (3–4 lựa chọn) |
| `multiple-select` | Chọn nhiều đáp án đúng |
| `fill-blank` | Điền từ vào chỗ trống (nhập tay); hỗ trợ nhiều đáp án chấp nhận được, không phân biệt hoa thường tuỳ chọn |
| `fill-blank-choice` | Điền chỗ trống bằng dropdown |
| `verb-form` | Cho động từ trong ngoặc, chia đúng dạng (thì, V-ing, to V, bị động...) |
| `error-correction` | Tìm và sửa lỗi sai trong câu (chọn từ sai + nhập đáp án sửa) |
| `reorder-words` | Sắp xếp từ thành câu đúng (kéo thả + chạm trên mobile) |
| `transformation` | Viết lại câu với từ gợi ý/giữ nguyên nghĩa (kiểu key word transformation) |
| `matching` | Nối cột A–B (kéo thả hoặc chọn) |
| `true-false` | Đúng/Sai kèm giải thích |
| `classify` | Phân loại vào nhóm (ví dụ đếm được/không đếm được) |
| `cloze` | Đoạn văn có nhiều chỗ trống (kết hợp dropdown/nhập) |
| `translation-choice` | Chọn bản dịch Anh–Việt đúng nhất (L0–B1 chủ yếu) |
| `sentence-completion` | Hoàn thành câu theo gợi ý (chấm theo danh sách đáp án chấp nhận) |

Phân bố gợi ý theo level: L0–A1 thiên về multiple-choice, fill-blank-choice, matching, reorder, true-false; A2–B1 thêm verb-form, error-correction, transformation; B2–C1 chú trọng transformation, error-correction, cloze, multiple-select.

### 6.3 Schema bài tập (`exercises/*.json`)

```json
{
  "lessonId": "A2-03",
  "sets": [
    {
      "id": "A2-03-practice-1",
      "kind": "practice",              // practice | mixed | unit-test | level-test | placement
      "title": "Chia động từ hiện tại đơn",
      "instruction": "Chia động từ trong ngoặc.",
      "questions": [
        {
          "id": "A2-03-q001",
          "type": "verb-form",
          "difficulty": 1,              // 1 dễ, 2 vừa, 3 khó
          "ruleIds": ["A2-03.02"],
          "prompt": "She ___ (watch) TV every evening.",
          "answers": ["watches"],       // danh sách đáp án chấp nhận
          "explanation": "Chủ ngữ she là ngôi thứ ba số ít; watch kết thúc bằng -ch nên thêm -es.",
          "wrongAnswerHints": {         // tuỳ chọn: giải thích cho lỗi sai phổ biến
            "watchs": "Động từ tận cùng -ch phải thêm -es, không chỉ -s.",
            "watch":  "Quên chia ngôi thứ ba số ít."
          },
          "translation": "Cô ấy xem TV mỗi tối."
        }
      ]
    }
  ]
}
```

Quy tắc bắt buộc cho **mọi** câu hỏi:
- Có `id` duy nhất toàn hệ thống, `type`, `difficulty`, `ruleIds` (≥ 1), `explanation` (tiếng Việt, nêu rõ **tại sao đúng** và **tại sao các đáp án khác sai** khi là trắc nghiệm).
- Đáp án sai (distractor) phải **hợp lý** (dựa trên lỗi thật của người học), không vô lý.
- Câu hỏi không mơ hồ: chỉ có đáp án đúng đã khai báo (với fill-blank phải liệt kê đủ biến thể đúng).
- Không trùng lặp câu hỏi.
- Có `translation` cho level L0–A2 (tuỳ chọn từ B1).

### 6.4 Số lượng tối thiểu
- Mỗi bài lý thuyết: **≥ 30 câu** (gồm ≥ 2 set practice + 1 set mixed), với bài lớn (thì, câu điều kiện, bị động, câu gián tiếp...) **≥ 60 câu**.
- Mỗi unit: 1 unit-test ≥ 20 câu. Mỗi level: 1 level-test ≥ 40 câu.
- Placement test: 40–60 câu phân tầng độ khó (mục 8.4).
- Phân bố độ khó mỗi bài: khoảng 30% dễ, 45% vừa, 25% khó.

### 6.5 Engine làm bài (UI/Logic)
- Chấm **ngay lập tức** (chế độ luyện tập) hoặc **cuối bài** (chế độ thi thử), cho người dùng chọn.
- Sau khi trả lời: hiển thị đúng/sai, **giải thích**, và **link ngược về rule** trong bài lý thuyết ("Xem lại: Thêm -s/-es").
- Chuẩn hoá khi chấm text: trim, gộp khoảng trắng, chuẩn hoá dấu nháy ’ → ', không phân biệt hoa/thường (cấu hình theo câu), chấp nhận dạng viết tắt tương đương nếu khai báo.
- Hiển thị kết quả: điểm, thời gian, **thống kê theo rule** (rule nào yếu), danh sách câu sai.
- Nút "Làm lại câu sai", "Làm lại toàn bộ", "Trộn ngẫu nhiên thứ tự câu/đáp án" (seed ổn định).
- Phím tắt (Enter để kiểm tra/tiếp), hỗ trợ bàn phím đầy đủ, chạm trên mobile.
- Lưu từng lần làm: điểm, thời gian, câu sai, ngày giờ.

---

## 7. Kho kiến thức (Knowledge Base)

Khu vực tra cứu nhanh, **độc lập với lộ trình**, truy cập từ menu chính.

### 7.1 Thành phần
1. **Danh mục toàn bộ lý thuyết**: duyệt theo Level / Chủ đề (Thì, Câu điều kiện, Bị động, Modal, Mệnh đề, Từ loại, Giới từ...) / Tag.
2. **Cheat sheet**: bảng tóm tắt 1 trang cho từng chủ đề lớn (12 thì, modal verbs, câu điều kiện, bị động theo thì, mạo từ, giới từ thời gian/nơi chốn, mệnh đề quan hệ, câu gián tiếp...). In được (CSS print).
3. **Bảng động từ bất quy tắc** đầy đủ (V1, V2, V3, nghĩa, phiên âm), có tìm kiếm, lọc theo chữ cái, chế độ che cột để tự kiểm tra, bài luyện riêng.
4. **Từ điển thuật ngữ ngữ pháp** (Anh–Việt): ví dụ *gerund – danh động từ*, *countable noun – danh từ đếm được*, kèm định nghĩa và link bài liên quan.
5. **Lỗi sai thường gặp** (Common Mistakes): ❌/✅ + giải thích, lọc theo level/chủ đề.
6. **So sánh cặp dễ nhầm**: *since/for, in/on/at, much/many, make/do, say/tell, lend/borrow, used to/be used to, a/an/the, few/a few, so/such, as/like, besides/except, rise/raise, lie/lay...* (mỗi cặp 1 trang ngắn + mini quiz 5 câu).
7. **Cụm động từ & collocation theo chủ đề** (ghi chú: ranh giới với từ vựng, giữ ở mức ngữ pháp/đi kèm giới từ).
8. **Bảng tra giới từ đi kèm** (dependent prepositions: depend on, interested in, afraid of...).

### 7.2 Tính năng kho
- **Tìm kiếm toàn văn** (Fuse/MiniSearch) trên bài học, rule, thuật ngữ, cheat sheet; gõ không dấu tiếng Việt vẫn tìm được; gợi ý khi gõ.
- Lọc đa tiêu chí (level, chủ đề, loại nội dung).
- **Bookmark / đánh dấu** bài, rule, mục kho.
- **Ghi chú cá nhân** trên từng bài/rule (lưu localStorage).
- Xem nhanh dạng popup/drawer mà không rời trang đang học.
- Mỗi mục kho liên kết 2 chiều với bài lý thuyết và bài tập liên quan.

---

## 8. Roadmap (Lộ trình học)

### 8.1 Cấu trúc
`roadmap.json`: `levels[] → units[] → lessons[]`, mỗi lesson tham chiếu `lessonId`. Hiển thị dạng **bản đồ/timeline dọc** có trạng thái từng bài.

```json
{
  "levels": [
    {
      "id": "L0", "title": "Mất gốc", "description": "Từ con số 0", "targetCEFR": "Pre-A1",
      "estimatedHours": 20,
      "units": [
        { "id": "L0-U1", "title": "Làm quen với câu tiếng Anh",
          "lessons": ["L0-01", "L0-02", "L0-03"], "unitTest": "L0-U1-test" }
      ],
      "levelTest": "L0-level-test"
    }
  ]
}
```

### 8.2 Trạng thái bài học
`locked (khuyến nghị)` / `available` / `in-progress` / `completed` / `mastered`.
- **Không khoá cứng**: người dùng có thể nhảy cóc, nhưng hiển thị cảnh báo mềm "Bạn nên học X trước" dựa trên `prerequisites`. Có cài đặt bật "chế độ mở khoá tuần tự".
- `completed`: đã đọc hết bài + làm ≥ 1 set practice đạt ≥ 70%.
- `mastered`: tất cả rule của bài đạt độ thành thạo ≥ 80% (mục 9.2).

### 8.3 Luồng học một bài (Learning Flow)
1. Xem lý thuyết (có thanh tiến độ đọc, mục lục rule bên cạnh).
2. Làm **Practice** theo từng rule/nhóm.
3. Làm **Mixed**.
4. Xem báo cáo yếu điểm → gợi ý quay lại rule yếu.
5. Hoàn thành → mở gợi ý bài tiếp theo.

### 8.4 Kiểm tra đầu vào (Placement Test)
- 40–60 câu, thích ứng đơn giản (adaptive): bắt đầu A1, đúng nhiều thì tăng level, sai nhiều thì giảm.
- Kết quả: đề xuất level bắt đầu + danh sách rule yếu; người dùng có thể chấp nhận hoặc chọn thủ công.
- Có tuỳ chọn "Tôi mới bắt đầu hoàn toàn" → vào thẳng L0.

### 8.5 Lộ trình tuỳ chỉnh
- Đặt mục tiêu (ví dụ: giao tiếp / thi IELTS-TOEIC / học thuật) → gợi ý ưu tiên một số unit (cấu hình trong `roadmap.json`, chỉ cần metadata `goals: [...]`, không cần viết nhiều nội dung riêng).
- Đặt mục tiêu hằng ngày (số phút/số câu).

---

## 9. Tiến độ, Ôn tập & Sổ lỗi sai

### 9.1 Lưu trữ
Tất cả trong `localStorage` qua Zustand persist, có `version` + hàm migrate. Dữ liệu: tiến độ bài, lịch sử làm bài, bookmark, ghi chú, cài đặt, SRS, streak.
**Export/Import JSON** trong trang Cài đặt (tải file / dán nội dung). Cảnh báo người dùng rằng xoá dữ liệu trình duyệt sẽ mất tiến độ.

### 9.2 Độ thành thạo theo rule
Mỗi rule có `mastery` (0–100) tính từ các lần trả lời gần nhất (trọng số cao cho kết quả mới, tính theo độ khó). Dashboard hiển thị **heatmap rule theo level** (xanh = vững, vàng = trung bình, đỏ = yếu).

### 9.3 Sổ lỗi sai (Error Notebook)
- Mọi câu sai tự động vào sổ, nhóm theo rule/bài.
- Chế độ **"Ôn lỗi sai"**: làm lại các câu đã sai.

### 9.4 Ôn tập ngắt quãng (Spaced Repetition)
- Dùng thuật toán đơn giản kiểu **Leitner hoặc SM-2** cho **câu hỏi/rule**: đến hạn ôn → hiện trong "Ôn tập hôm nay".
- Lịch ôn lưu localStorage; trang Dashboard hiển thị số mục đến hạn.

### 9.5 Dashboard
Streak, thời gian học, số câu đúng/sai, mục tiêu hằng ngày, level hiện tại, bài tiếp theo gợi ý, rule yếu nhất, ôn tập đến hạn.

---

## 10. UI/UX

- **Responsive** mobile-first (360px → desktop). Layout lý thuyết: nội dung chính + mục lục rule (sticky) bên phải trên desktop, dạng drawer trên mobile.
- **Dark/Light/Auto theme**, cỡ chữ điều chỉnh được (3 mức).
- **Đọc thoải mái**: độ rộng dòng 65–75 ký tự, khoảng cách dòng thoáng, bảng cuộn ngang trên mobile, màu phân biệt rõ ví dụ / công thức / cảnh báo / lỗi sai (không chỉ dựa vào màu: kèm icon + nhãn).
- Từ khoá ngữ pháp quan trọng trong ví dụ được **tô đậm/gạch chân** (cú pháp `**...**` trong `:::example`).
- Nút **nghe phát âm** bằng Web Speech API (`speechSynthesis`) cho ví dụ tiếng Anh (cho chọn giọng en-GB/en-US, tốc độ). Ẩn khi trình duyệt không hỗ trợ.
- **Hiển thị/ẩn bản dịch tiếng Việt** (toggle toàn cục) để người học tự thử đoán nghĩa.
- Điều hướng: Trang chủ/Dashboard · Roadmap · Kho kiến thức · Ôn tập · Sổ lỗi sai · Cài đặt. Breadcrumb trong bài học, nút Trước/Sau.
- **Accessibility (WCAG AA)**: tương phản đủ, focus rõ, điều khiển bằng bàn phím, ARIA đúng cho widget kéo thả (có cách thay thế bằng bàn phím/nút), `prefers-reduced-motion`.
- **Hiệu năng**: lazy-load nội dung theo bài (code-splitting theo route/`import.meta.glob`), không tải toàn bộ nội dung một lần; Lighthouse Performance ≥ 90 trên trang bài học.
- **PWA (nên có, ưu tiên thấp)**: service worker cache để học offline.
- In được (print stylesheet) cho bài học và cheat sheet.

---

## 11. Khả năng mở rộng (4 kỹ năng + Từ vựng)

- Hệ thống được thiết kế theo **module**: `modules/registry.ts` đăng ký module `{ id, title, routes, contentLoader, progressNamespace }`. Hiện chỉ đăng ký `grammar`.
- Cấu trúc nội dung dùng chung khái niệm `Lesson`, `Exercise`, `Roadmap node` với `moduleId` — thêm `listening/speaking/reading/writing/vocabulary` chỉ cần thêm module + thư mục `content/<module>/`.
- Engine bài tập thiết kế dạng **plugin theo `type`** (registry các renderer + grader) để thêm dạng bài mới (ví dụ nghe-điền từ, ghi âm, viết luận chấm theo checklist) mà không sửa core.
- Namespace tiến độ theo module để không xung đột dữ liệu.
- Menu điều hướng và Roadmap hỗ trợ **nhiều track** (Ngữ pháp / Từ vựng / Đọc ...). Track chưa có hiển thị "Sắp ra mắt" (có thể ẩn bằng cờ cấu hình).
- Roadmap thiết kế để **một bài có thể thuộc nhiều track** và có thể tích hợp bài kỹ năng xen kẽ sau này.

---

## 12. Kiểm soát chất lượng (BẮT BUỘC cài đặt)

Script `npm run validate` phải chạy trước mỗi build (`prebuild`) và **fail build** nếu vi phạm:

1. **Schema**: mọi lesson frontmatter, roadmap, exercise JSON hợp lệ (Zod).
2. **ID duy nhất**: lesson, rule, question, set.
3. **Rule anchor**: mọi `rules[].id` trong frontmatter có heading `{#id}` tương ứng trong thân bài và ngược lại.
4. **Coverage**: mỗi rule có **≥ 4 câu** tham chiếu qua `ruleIds` (cấu hình ngưỡng; rule quan trọng ≥ 8). Báo cáo rule thiếu.
5. **Tham chiếu hợp lệ**: `prerequisites`, `related`, `ruleIds`, `lessonId`, `unitTest` đều trỏ tới thứ tồn tại.
6. **Câu hỏi hợp lệ theo type** (ví dụ multiple-choice có đúng 1 đáp án đúng; fill-blank có ≥ 1 đáp án; reorder có đủ token; mọi câu có `explanation` không rỗng).
7. **Cấu trúc bài lý thuyết**: có đủ các phần bắt buộc ở mục 4.4 (kiểm tra theo heading/container: ≥ 3 `:::example` mỗi rule, ≥ 1 `:::mistake` mỗi bài, có `:::recap`).
8. **Roadmap**: không có bài mồ côi (bài không nằm trong roadmap), không có vòng lặp tiền đề.
9. **Liên kết nội bộ không gãy** trong Markdown.

`npm run coverage` xuất bảng: lesson | số rule | số câu | rule thiếu bài tập | phân bố độ khó/type.
Có unit test (Vitest) cho: hàm chấm từng type, chuẩn hoá chuỗi, tính mastery, SRS, migrate storage.

---

## 13. Quy ước viết nội dung (Content Style Guide)

- Giải thích bằng **tiếng Việt rõ ràng**, câu ngắn; thuật ngữ lần đầu xuất hiện kèm tiếng Anh: *danh động từ (gerund)*.
- Ví dụ tiếng Anh **tự nhiên**, dùng từ vựng phù hợp level; mỗi ví dụ có dịch tiếng Việt tự nhiên (không dịch word-by-word).
- Ví dụ đa dạng chủ ngữ, bối cảnh (đời sống, công việc, học tập, du lịch), tên người đa dạng.
- Mỗi quy tắc đi kèm **lý do/ý nghĩa** (khi nào dùng, vì sao), không chỉ liệt kê công thức.
- Luôn nêu **ngoại lệ**; nếu một quy tắc "không có ngoại lệ" thì khẳng định rõ.
- Với điểm có tranh luận/khác biệt Anh-Anh vs Anh-Mỹ hoặc văn phong (formal/informal), ghi chú rõ.
- Không dùng nội dung sao chép từ sách/website có bản quyền; viết nội dung gốc.
- Bài tập: câu hỏi ngắn gọn, bối cảnh tự nhiên, đáp án sai phản ánh lỗi thực tế; giải thích giúp người học **tự sửa được lần sau**, không chỉ nói "đáp án là B".

### Ví dụ mẫu một bài rút gọn (agent dùng làm khuôn)

```markdown
---
id: L0-01
title: Động từ to be (am / is / are)
titleEn: The verb "to be"
level: L0
unit: L0-U1
order: 1
estimatedMinutes: 20
prerequisites: []
tags: [verb, to-be, basics]
summary: "Động từ quan trọng nhất để giới thiệu bản thân và mô tả người, vật."
rules:
  - { id: L0-01.01, label: "Chia to be theo chủ ngữ" }
  - { id: L0-01.02, label: "Câu khẳng định và viết tắt" }
  - { id: L0-01.03, label: "Câu phủ định" }
  - { id: L0-01.04, label: "Câu hỏi Yes/No và câu trả lời ngắn" }
  - { id: L0-01.05, label: "Lỗi thường gặp của người Việt" }
related: [L0-02, kb:cheatsheet-to-be]
---

## Mục tiêu bài học
- Biết chọn am/is/are đúng với chủ ngữ.
- Tạo câu khẳng định, phủ định, nghi vấn với to be.
...
## Chia to be theo chủ ngữ {#L0-01.01}
:::rule
| Chủ ngữ | to be | Ví dụ |
|---|---|---|
| I | am | I am a student. |
| He / She / It | is | She is my teacher. |
| You / We / They | are | They are friends. |
:::
...
```

---

## 14. Các giai đoạn thực hiện (Milestones)

**Giai đoạn 1 – Nền tảng kỹ thuật**
- Khởi tạo dự án, router, theme, layout, store, loader nội dung.
- Remark plugin cho tất cả container (mục 4.3), component hiển thị lesson, mục lục rule.
- Engine bài tập đủ **tất cả type** ở mục 6.2 + chấm + giải thích + link về rule.
- Script validate + coverage + unit test.
- **Nội dung mẫu hoàn chỉnh**: 2 bài đầy đủ (L0-01 to be, A2-03 present simple) với bài tập đạt đủ chuẩn mục 6.4 để làm khuôn chuẩn. **Dừng và báo kết quả để người dùng duyệt chất lượng nội dung.**

**Giai đoạn 2 – Nội dung Level 0 → A2**
- Viết toàn bộ bài + bài tập theo curriculum; unit-test; level-test.
- Roadmap + trạng thái tiến độ + dashboard cơ bản.

**Giai đoạn 3 – Kho kiến thức**
- Tìm kiếm, bookmark, ghi chú, bảng động từ bất quy tắc, glossary, cheat sheet, lỗi thường gặp, so sánh cặp.

**Giai đoạn 4 – Nội dung B1 → B2**
- Bài + bài tập + test; mở rộng kho kiến thức tương ứng.

**Giai đoạn 5 – Nội dung C1 + Ôn tập thông minh**
- Bài C1; Placement test; SRS; sổ lỗi sai; heatmap mastery; mục tiêu cá nhân.

**Giai đoạn 6 – Hoàn thiện**
- Export/import, PWA/offline, print, a11y audit, tối ưu hiệu năng, tài liệu README (cách thêm bài mới, cách chạy validate, cách deploy), chuẩn bị mở rộng module.

---

## 15. Tiêu chí hoàn thành (Definition of Done)

- [ ] `npm run build` thành công, `npm run validate` pass 100%, không rule nào thiếu bài tập.
- [ ] Toàn bộ chủ đề trong mục 5 có bài (CURRICULUM-CHECKLIST.md tất cả `[x]`).
- [ ] Mỗi bài đủ cấu trúc mục 4.4; mỗi bài đạt số câu tối thiểu mục 6.4.
- [ ] Mỗi câu hỏi có giải thích tiếng Việt; sai thì chỉ về rule cần xem lại.
- [ ] Roadmap đi được từ L0 đến C1; placement test hoạt động.
- [ ] Kho kiến thức: tìm kiếm, bookmark, ghi chú, bảng bất quy tắc, glossary, cheat sheet hoạt động.
- [ ] Tiến độ, sổ lỗi sai, SRS, export/import hoạt động; refresh trang không mất dữ liệu.
- [ ] Dùng tốt trên mobile và desktop; dark mode; a11y cơ bản; Lighthouse ≥ 90 (Performance/Accessibility).
- [ ] README hướng dẫn thêm nội dung và thêm module mới (kỹ năng / từ vựng).
- [ ] `content/REVIEW.md` liệt kê mọi điểm nội dung cần con người xác minh.
