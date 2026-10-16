# Rà soát nội dung — Giai đoạn 1

Hai bài và các ví dụ/bài tập được soạn mới. Khi bàn giao mẫu giai đoạn 1 chưa có mục cố ý để lại với nhãn [CẦN XÁC MINH]. Sau khi nhận phụ lục nâng cao, các điểm cần đối chiếu thêm được ghi ở cuối tài liệu này. Việc kiểm tra tự động xác nhận cấu trúc và tham chiếu, không thay thế thẩm định sư phạm của người dùng.

## Các quyết định cần duyệt chất lượng

- Giữ ID A2-03 cho bài Present Simple theo yêu cầu bài mẫu; chủ đề được đối chiếu với nhóm A1 trong checklist. Nội dung giải thích từ cơ bản và mở rộng đến A2.
- L0-01 có 6 rule, A2-03 có 10 rule. Mỗi rule được đánh dấu quan trọng, có ít nhất 8 câu luyện trực tiếp.
- Câu viết lại chỉ chấm theo các mẫu khai báo và có yêu cầu giới hạn cấu trúc. Không phải công cụ đánh giá mọi câu tiếng Anh tự do.
- Đọc kỹ phần dịch, độ tự nhiên của các câu và mức độ phù hợp với người mất gốc trước khi mở rộng giai đoạn 2.
- Unit-test, level-test và placement thuộc các giai đoạn sau; chưa công bố đơn vị/cấp độ nào là hoàn thành.

## Nguồn đối chiếu các điểm dễ nhầm

Các quy tắc cơ bản được soạn từ kiến thức ngữ pháp phổ thông. Đối chiếu giới hạn dạng viết tắt và động từ trạng thái với nguồn dưới đây, không chép nguyên bài hoặc ví dụ:

- Cambridge, contractions: https://dictionary.cambridge.org/grammar/british-grammar/contractions
- British Council, short forms: https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/short-forms
- British Council, stative verbs: https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/stative-verbs

## Rà soát phụ lục nâng cao — 16/10/2026

Nguồn: [phụ lục do người dùng cung cấp](../docs/PHU-LUC-KIEN-THUC-NANG-CAO.md). [LESSON-MAP](grammar/LESSON-MAP.md) là đề xuất chờ duyệt, chưa phải nội dung đã hoàn thành. Chưa đối chiếu bổ sung với CGEL/Swan/Murphy/Azar trong lượt lập kế hoạch này; không coi tên các tài liệu được nêu trong phụ lục là nguồn đã đọc.

### Điểm đã xác định từ chính tài liệu và repository

- Danh mục có **208 mã**, nhóm D chỉ từ **D.01 đến D.11**. `D.14` và `D.15` trong ví dụ Phần 2 không phải mã hợp lệ. Khi triển khai dùng mã thật của Phần 3; bản lưu phụ lục giữ nguyên văn để bảo toàn yêu cầu gốc.
- Chưa tìm thấy `PROMPT-NOI-DUNG-GIAI-DOAN-2.md` được nhắc trong phụ lục. Kế hoạch hiện dựa trên SPEC và phụ lục đã cung cấp, không suy đoán thêm nội dung của file còn thiếu.
- Hai bài mẫu chưa có `appendixCodes`, outline sáu chiều, trap/context set riêng hoặc kiểm tra ma trận. Có 3 ví dụ/rule và 8 câu trực tiếp/rule theo chuẩn cũ; cần nâng cấp theo ngưỡng mới.
- Nêu rõ hai cấp đánh giá: đủ bài dự kiến cho mọi mã là độ phủ kế hoạch; đủ rule/câu thật và mọi tiểu mục mới là độ phủ nội dung. Bản ma trận ban đầu không dùng bài dự kiến để đánh dấu đạt.
- Phụ lục cho phép báo mã dự kiến ở level sau, đồng thời yêu cầu validate fail khi còn mã chưa ánh xạ. Kế hoạch giữ gate toàn curriculum nghiêm ngặt; báo cáo theo level phải công khai các lỗi còn lại, không đổi “chưa học tới” thành “pass”.

### Các điểm cần đối chiếu nguồn khi lập outline

| Mã | Vấn đề cần kiểm tra | Cách xử lý trong nội dung dự kiến |
|---|---|---|
| I.01 | [CẦN XÁC MINH] Bảng bị động 12 thì: hình thức nào được dùng tự nhiên, hiếm dùng hoặc thường cần diễn đạt lại? | Vẫn bao phủ danh mục, ghi mức sử dụng và ví dụ có nguồn; không dạy mọi ô như lựa chọn giao tiếp tương đương. |
| H.01 | [CẦN XÁC MINH] “Mọi tổ hợp” điều kiện hỗn hợp: giới hạn theo nghĩa và quan hệ thời gian. | Đối chiếu từng mẫu có ngữ cảnh, không lập mọi hoán vị thì một cách máy móc. |
| J.03 | [CẦN XÁC MINH] Phạm vi của “cùng nghĩa” và khẳng định “luôn to V” với would like/love/prefer. | Kiểm tra bổ ngữ, chủ ngữ, sắc thái và ngoại lệ trước khi viết quy tắc tuyệt đối. |
| I.07/I.09/E.03 | [CẦN XÁC MINH] Phân biệt tính từ phân từ/get-passive, linking verb và điều kiện cho phép bị động theo nghĩa của động từ. | Không phân loại chỉ theo bề mặt get + V-ed hoặc danh sách động từ không xét nghĩa/ngữ cảnh. |
| L.01/L.09/N.06 | [CẦN XÁC MINH] Cách phân loại while và các từ nối xuất hiện trong nhóm giới từ/thời gian. | Nêu rõ theo hệ thuật ngữ dùng trong bài, đối chiếu bổ ngữ và cấu trúc, vẫn dạy đầy đủ các mục được yêu cầu. |
| E.06/E.10/L.05/J.15/Q.07 | [CẦN XÁC MINH] Phạm vi “danh sách đầy đủ”, nguồn tham khảo và cách đếm từ gốc, cụm, nghĩa, biến thể. | Công khai tiêu chí kiểm kê, đạt ngưỡng số lượng đã yêu cầu, tránh đếm biến thể hoặc lặp nghĩa để bù thiếu mục. |

Những mục trên là câu hỏi biên tập cần giải quyết, chưa phải kết luận rằng phụ lục sai. Sau khi có nguồn đối chiếu, ghi kết luận và nguồn ngay tại đây, đồng thời phản ánh giới hạn vào bài học; không bỏ mã khỏi kế hoạch.

## Bổ sung kiến thức theo yêu cầu tiếp tục

- Đã thêm L0-12 (8 rule, 32 ví dụ, 108 câu) và bảng tra đại từ; L0-01 tăng lên 24 ví dụ/84 câu, mỗi rule ≥12 câu trực tiếp. Giữ ID câu/rule cũ, không thay ý nghĩa các ID đã lưu tiến độ.
- Hai outline được lập trước khi viết/nâng cấp. L0-12 giới hạn D.01 ở chủ ngữ/tân ngữ và giới thiệu trường hợp biên; chưa tuyên bố hoàn thành toàn D.01. D.02 có bảng sở hữu và bốn nhóm từ dễ nhầm.
- Đã đọc [British Council — Personal pronouns](https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/personal-pronouns) để đối chiếu vị trí chủ ngữ/tân ngữ, dạng sau giới từ và singular they. Ví dụ/bài tập soạn mới.
- Đã tra kết quả [Cambridge — Possessive pronouns](https://dictionary.cambridge.org/uk/grammar/british-grammar/pronouns-possessive-my-mine-your) và [Cambridge — It’s or its](https://dictionary.cambridge.org/grammar/british-grammar/it-s-or-its); các lần mở trực tiếp trang Cambridge bị chặn, không ghi là đã đọc toàn trang. Đối chiếu giới hạn không thêm dấu nháy vào đại từ sở hữu và it’s = it is/it has.
- Mẫu amn’t được ghi nhận có biến thể địa phương; bài luyện vẫn dùng I’m not. Tài liệu tham khảo đối chiếu: [Scots and Scottish Standard English, University of Glasgow](https://eprints.gla.ac.uk/343210/1/343210.pdf) (kết quả tra cứu, chưa rà toàn chương).
- Các bài đọc–viết không được mô tả là kiểm định kỹ năng nghe. Chấm đáp án giới hạn đúng mẫu được yêu cầu; câu chuyển đổi nói rõ phần nào được đổi.
- Còn cần nâng cấp A2-03, hoàn thiện checker/coverage theo phụ lục và các bài L0 còn lại. Các mục [CẦN XÁC MINH] trước đó chưa tự động được đóng bởi lần bổ sung này.

## Kho tra cứu A–Q trên giao diện — 16/10/2026

Đã soạn 208 mục tra cứu trong 17 nhóm, có outline tại [REFERENCE-A-Q](grammar/outlines/REFERENCE-A-Q.md). Mỗi mục gồm giải thích, cấu trúc, ví dụ song ngữ, lỗi cần tránh và đối chiếu. Nội dung nằm trong `grammar/kb/reference/A.json` đến `Q.json`, có thể mở từ Kho kiến thức. Đây là nội dung đọc tham khảo; không dùng 208 mục này để tự chứng nhận 184 bài học, độ sâu sáu chiều hay số câu luyện theo phụ lục.

Các điểm dễ nhầm được xử lý trong nội dung mới:

- I.01: bảng 12 dạng bị động phân biệt dạng thông dụng và dạng hiếm, đặc biệt perfect continuous; hướng dẫn diễn đạt lại. Đã tra [Cambridge — Passive forms](https://dictionary.cambridge.org/grammar/british-grammar/passive-forms).
- H.01: điều kiện hỗn hợp giải thích theo quan hệ thời gian, có hai mẫu đối chiếu; không hứa bao phủ mọi hoán vị thì. Nguồn đối chiếu: [British Council — Third and mixed conditionals](https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/conditionals-third-mixed).
- J.03: phân biệt like/love/prefer theo ngữ cảnh, chú ý would + to V; không đồng nhất mọi mẫu với nghĩa hoàn toàn giống nhau. Đã tra [Cambridge — Verb patterns](https://dictionary.cambridge.org/grammar/british-grammar/verb-patterns-verb-ing-or-verb-to-infinitive).
- J/N: mệnh đề phân từ nêu điều kiện về chủ thể và lỗi dangling participle; đối chiếu [British Council — Participle clauses](https://learnenglish.britishcouncil.org/grammar/c1-grammar/participle-clauses).
- A.02: bảng 44 âm theo mô hình giảng dạy Anh-Anh truyền thống, có ghi chú khác biệt biến thể và /ʊə/. Đã mở [British Council — Phonemic chart](https://www.teachingenglish.org.uk/teaching-resources/teaching-secondary/teaching-tools/phonemic-chart-english-teachers); phần giới thiệu hiện ghi 6 diphthongs nhưng phần poster ghi 44 âm, nên không dùng riêng con số trên trang để khẳng định mọi giọng có cùng số âm. Trang [Cambridge — Phonetic symbols](https://dictionary.cambridge.org/help/phonetics.html) có kết quả tra cứu, mở trực tiếp bị 403.

Ví dụ và lời giải thích được soạn mới; các liên kết “Đọc thêm” không có nghĩa toàn bộ nội dung đã qua thẩm định học thuật. Danh sách bất quy tắc, phrasal verbs, collocations và word families hiện chỉ giới thiệu quy tắc/mẫu tiêu biểu, chưa đủ các ngưỡng số lượng trong phụ lục. Còn cần duyệt chuyên môn toàn bộ nội dung, mở rộng ví dụ/ngữ cảnh và bài tập cho từng mục. Các câu hỏi biên tập khác ở trên tiếp tục được giữ, không tự động đóng bởi kiểm tra schema.

Validator mới kiểm tra đủ mã trong catalogue, mã không trùng/đúng nhóm, trường nội dung bắt buộc, cấu trúc bảng và liên kết bài học. Test đối chiếu catalogue với các dòng mã thật của Phần 3 trong phụ lục, bỏ qua D.14/D.15 vốn chỉ xuất hiện trong ví dụ ở Phần 2. Đây là kiểm tra tính toàn vẹn kho tra cứu, không thay checker ma trận rule/câu của toàn curriculum.
