# Bản đồ bài học theo phụ lục nâng cao — đang triển khai từng phần

- Ngày lập: 16/10/2026.
- Nguồn yêu cầu: [Phụ lục kiến thức và chuẩn độ sâu](../../docs/PHU-LUC-KIEN-THUC-NANG-CAO.md), ưu tiên hơn các ngưỡng cũ của SPEC.
- **Trạng thái:** người dùng đã yêu cầu tiếp tục thêm kiến thức. Đã bắt đầu triển khai; các hàng chưa có nội dung vẫn là kế hoạch, không phải bài hoàn thành.
- Hiện có `L0-01`, `L0-12` và `A2-03`. L0-12 là bài mới; L0-01 đã bổ sung lý thuyết/câu luyện; A2-03 còn cần nâng cấp theo phụ lục. Các ID chưa viết chưa được thêm vào roadmap.

## 1. Quyết định về phạm vi và trình tự

Bản đồ bao phủ toàn bộ 208 mã A.01–Q.07 trong 17 nhóm. Phân cấp là đề xuất sư phạm của dự án, không phải chứng nhận CEFR. Mỗi hàng giao trách nhiệm nội dung cho một bài; khi một mã xuất hiện nhiều lần, các bài chia phạm vi nền tảng/mở rộng như cột cuối. Toàn bộ các tiểu mục của mã trong phụ lục vẫn bắt buộc được đưa vào outline, không chỉ các ví dụ nêu trong tên bài.

Giữ hai ID mẫu để bảo toàn tham chiếu hiện có. `L0-01` tiếp tục là bài be nền tảng. `A2-03` trở thành bài mở rộng hiện tại đơn ở A2; một bài lõi L0 dạy hiện tại đơn từ đầu. Khi triển khai cần lập bảng đối chiếu rule cũ/mới, tránh thay nghĩa rule đã lưu tiến độ mà không migration. Việc nâng cấp/migration chưa được thực hiện ở lần bàn giao bản đồ này.

ID dùng để tham chiếu, không quyết định thứ tự học. Trình tự trong mỗi level: âm/chữ và từ loại → cấu trúc câu → thì/cấu trúc trọng tâm → mệnh đề và văn phong → ôn/kiểm tra. Outline phải khai báo prerequisites cụ thể; không bắt người học học bài ở level cao hơn để hiểu bài nền. Kiến thức nâng cao chỉ được nhắc với liên kết học tiếp. Outline nào vượt 18 rule hoặc khoảng 4.000 từ phải tách và cập nhật bản đồ, không cắt bớt nội dung để giữ ID.

## 2. Chuẩn áp dụng cho từng bài

| Chỉ tiêu | Bài thường | Bài lõi |
|---|---|---|
| Rule | 6–10 | 10–18 |
| Từ lý thuyết tiếng Việt, không tính ví dụ | ≥1.000 | ≥2.000 |
| Ví dụ song ngữ/rule | ≥4 | ≥6 |
| Câu trực tiếp/rule | ≥8; rule quan trọng/dễ sai ≥12 | ≥12 |
| Tổng câu/bài | ≥50 và đủ coverage từng rule | ≥100 và đủ coverage từng rule |
| Dạng câu hỏi | ≥5 | ≥5 |
| Lỗi thường gặp | ≥5/bài, đồng thời ≥3/rule có nguyên nhân và tự kiểm tra | Như bài thường |
| Bảng so sánh | ≥1/bài, đồng thời đối chiếu theo từng rule khi áp dụng | ≥2/bài, đồng thời đối chiếu theo từng rule khi áp dụng |
| Bổ sung | Ba mức khó; hội thoại cho cách dùng văn nói | Thêm “Nhìn tổng thể”, trap set ≥10 câu, context set ≥10 chỗ trống |

Ngưỡng mỗi rule và mỗi bài phải cùng đạt: 10 rule lõi cần ít nhất **120 câu trực tiếp**, không dừng ở 100 câu tổng. Trap/context có thể đồng thời đóng góp coverage nếu thực sự kiểm tra trực tiếp rule; câu nhiều rule không được dùng để bù thiếu luyện riêng. Từ B1, mỗi rule lõi phải có ít nhất một câu transformation hoặc error-correction. Nhãn “Thường” của bài không miễn ngưỡng cho mã lõi hoặc rule dễ sai trong bài đó.

Sáu chiều trong mọi outline/rule: hình thức; nghĩa/cách dùng tách riêng; ngoại lệ/biên; sắc thái/văn phong/biến thể; bảng đối chiếu và tiếng Việt; lỗi/nguyên nhân/tự kiểm tra. Chiều không áp dụng phải giải thích trong outline. Không dùng việc có đủ số lượng để suy ra nội dung đã đủ sáu chiều.

## 3. Danh sách bài đề xuất

Tổng: **184 bài đề xuất**, gồm 87 bài lõi; đã bao gồm hai bài mẫu cần nâng cấp. Số bài có thể tăng sau khi rà outline.

| Level | Số bài đề xuất |
|---|---:|
| L0 | 21 |
| A1 | 24 |
| A2 | 37 |
| B1 | 46 |
| B2 | 43 |
| C1 | 13 |

### L0

| ID dự kiến | Bài | Loại | Mã phụ lục | Phạm vi và phần nối tiếp |
|---|---|---|---|---|
| `L0-01` | Động từ to be: nâng cấp bài mẫu | Thường | E.07, D.01, M.06, M.07 | Giữ ID và liên kết hiện có; 6–10 rule, ≥12 câu/rule quan trọng, đủ sáu chiều và ≥4 ví dụ/rule. |
| `L0-02` | Bảng chữ cái và đánh vần | Thường | A.01 | Tên chữ cái, tên người, địa chỉ; phân biệt tên chữ và âm. |
| `L0-03` | IPA: nguyên âm đơn và nguyên âm đôi | Thường | A.02 | Phần nguyên âm của toàn bảng IPA; cặp dễ nhầm, đối chiếu hai biến thể Anh-Anh/Anh-Mỹ. |
| `L0-04` | IPA: phụ âm, âm cuối và cụm phụ âm | Thường | A.02 | Phần phụ âm còn lại; không dùng bảng nguyên âm thay cho toàn bảng IPA. |
| `L0-05` | Chính tả và âm: nguyên âm, magic e, tổ hợp chữ | Thường | A.07 | Quan hệ chữ–âm; giới hạn quy tắc và ngoại lệ. |
| `L0-06` | Âm câm và từ đồng âm | Thường | A.07 | Các nhóm âm câm, cặp đồng âm/gần âm, bài nghe–đọc đối chiếu. |
| `L0-07` | Đọc đuôi -s/-es, -ed và mạo từ | Thường | A.06 | Đủ ba cách đọc mỗi đuôi, a/an/the theo âm và ngữ cảnh. |
| `L0-08` | Chính tả khi thêm hậu tố | Thường | A.08, E.05 | Gấp đôi, bỏ e, y→i, ie→y; liên hệ đủ năm dạng động từ. |
| `L0-09` | Viết hoa, viết tắt và chữ số | Thường | A.10 | Quy tắc chữ viết, danh xưng, tên riêng và cách trình bày số. |
| `L0-10` | Danh từ: phân loại và tính đếm được | Thường | B.01, B.02 | Cơ bản; nghĩa đổi khi chuyển cách đếm được bổ sung ở A2. |
| `L0-11` | Số nhiều thông dụng và bất quy tắc | Thường | B.04, B.05 | Quy tắc chính tả, ngoại lệ và bảng tra; không giới hạn ở ví dụ trong đề. |
| `L0-12` | Đại từ nhân xưng và sở hữu | Thường | D.01, D.02 | Chủ ngữ/tân ngữ, tính từ/đại từ sở hữu, các cặp viết giống nhau. |
| `L0-13` | Động từ và năm dạng cơ bản | Thường | E.01, E.05 | Động từ chính/trợ động từ/modal, hành động/trạng thái ở mức nhập môn. |
| `L0-14` | Thành phần câu và trật tự từ | Thường | M.01, M.05 | S/V/O/C/A, vị ngữ, các cụm từ; trật tự cơ bản, dẫn sang đảo ngữ ở B2. |
| `L0-15` | Các kiểu câu và mục đích giao tiếp | Thường | M.04, M.15 | Kể, hỏi, mệnh lệnh, cảm thán, lời chào; phần nâng cao có bài riêng. |
| `L0-16` | Mạo từ a/an | Lõi | C.01 | Âm đầu, nghề nghiệp, lần nhắc đầu, nghĩa một/mỗi và ngoại lệ. |
| `L0-17` | The và không mạo từ: nền tảng | Lõi | C.02, C.03 | Cái đã biết/duy nhất, nói chung và trường hợp thường gặp; chưa kết thúc hai mã. |
| `L0-18` | Số đếm, số thứ tự và cách đọc số | Thường | C.16 | Phân số, thập phân, phần trăm, điện thoại, tiền và đo lường. |
| `L0-19` | Ngày tháng, giờ và số trong cụm từ | Thường | C.16 | Năm, lịch, Anh-Anh/Anh-Mỹ, dozens/hundreds, danh từ ghép có số. |
| `L0-20` | Hiện tại đơn: hình thức và cách dùng nền tảng | Lõi | F.01 | Tách các cách dùng thành rule; bài A2-03 nối tiếp, giữ riêng ID mẫu cũ. |
| `L0-21` | There is/are: giới thiệu sự tồn tại | Lõi | M.13 | Khẳng định/phủ định/hỏi, số lượng và phân biệt it/there cơ bản. |

### A1

| ID dự kiến | Bài | Loại | Mã phụ lục | Phạm vi và phần nối tiếp |
|---|---|---|---|---|
| `A1-01` | Trọng âm từ và từ ghép | Thường | A.03 | Đổi trọng âm theo từ loại, hậu tố và ngoại lệ. |
| `A1-02` | Dấu câu trong câu và đoạn ngắn | Thường | A.11 | Dấu cơ bản, sở hữu/viết tắt, trích dẫn; phần nâng cao ở C1. |
| `A1-03` | Đơn vị đếm và danh từ có hình thức số đặc biệt | Thường | B.03, B.07, B.08 | Đơn vị cho UC, dạng bất biến, luôn số nhiều, tận cùng -s số ít. |
| `A1-04` | Sở hữu cách | Thường | B.10 | Đủ biến thể 's/s'/of, sở hữu kép/nhóm/độc lập và tên riêng. |
| `A1-05` | This/that, some/any và đại từ bất định | Thường | C.05, C.06, D.05, D.06 | Mức cơ bản; nghĩa kể chuyện, tham chiếu và cấu trúc phức ở B1. |
| `A1-06` | Lượng nhiều và lượng ít | Thường | C.08, C.09 | Much/many, các cụm thay thế, few/little, fewer/less và sắc thái. |
| `A1-07` | Đại từ phản thân và đối ứng | Thường | D.03, D.04 | Bắt buộc/không dùng, nhấn mạnh, by oneself và each other. |
| `A1-08` | Be, have, do và linking verbs | Thường | E.03, E.07, K.15 | Ba vai trò, have got, do nhấn mạnh; tính từ sau linking verb. |
| `A1-09` | Hiện tại tiếp diễn | Lõi | F.02 | Mỗi cách dùng một rule; liên kết bài trạng thái/nghĩa đổi ở B1. |
| `A1-10` | Quá khứ đơn | Lõi | F.05 | Sự kiện, trình tự, thói quen/trạng thái; dẫn tới giả định ở B1. |
| `A1-11` | Hệ thống modal và can/could cơ bản | Lõi | G.01, G.02 | Hình thức modal, khả năng, xin phép, đề nghị; suy đoán ở B1. |
| `A1-12` | Mệnh lệnh, let's và lời yêu cầu | Lõi | H.08 | Các dạng và cách đáp; nghĩa điều kiện/nhấn mạnh ở B2. |
| `A1-13` | Động từ đi với V-ing | Lõi | J.01 | Nhóm mẫu, phủ định, cấu trúc cố định; liên kết danh sách KB đầy đủ. |
| `A1-14` | Động từ đi với to V | Lõi | J.02 | Nhóm mẫu, dạng câu, nghĩa và ngoại lệ; liên kết danh sách KB. |
| `A1-15` | Vị trí và thứ tự tính từ | Thường | K.01, K.02 | Định ngữ/vị ngữ, thứ tự, dấu phẩy; nghĩa đổi theo vị trí ở B1. |
| `A1-16` | So sánh hơn, nhất và bằng | Lõi | K.08 | Hình thức, bất quy tắc và cách dùng cơ bản; hai phần mở rộng ở A2/B2. |
| `A1-17` | Hình thành và phân loại trạng từ | Thường | K.09 | Các loại, -ly, trạng từ không -ly và cặp đổi nghĩa. |
| `A1-18` | Giới từ thời gian | Thường | L.01 | Toàn bộ nhóm giới từ và cụm cố định; đối chiếu while/during. |
| `A1-19` | Giới từ nơi chốn | Thường | L.02 | Vị trí, khoảng cách, phương tiện; phân biệt at/in/on. |
| `A1-20` | Giới từ chuyển động | Thường | L.03 | Hướng, đường đi, đích đến; phân biệt vị trí và chuyển động. |
| `A1-21` | Nối câu với FANBOYS | Thường | L.08, N.10 | Dấu phẩy, phối hợp từ/cụm/mệnh đề và tránh run-on cơ bản. |
| `A1-22` | Câu hỏi Yes/No và trả lời ngắn | Thường | M.06 | Be/do và các thì đã học; hoàn thiện hệ thì/modal ở B2. |
| `A1-23` | Câu hỏi Wh- và đại từ nghi vấn | Thường | M.07, D.07 | Chủ ngữ/tân ngữ, how, which/what, giới từ và hỏi mục đích. |
| `A1-24` | Cụm từ, mệnh đề và cách mở rộng câu | Thường | M.02, M.03 | Độc lập/phụ thuộc, câu đơn/ghép/phức/ghép–phức với dẫn nhập có hướng dẫn. |

### A2

| ID dự kiến | Bài | Loại | Mã phụ lục | Phạm vi và phần nối tiếp |
|---|---|---|---|---|
| `A2-01` | Trọng âm câu và lời nói nối liền | Thường | A.04 | Dạng mạnh/yếu, nối âm, nuốt âm, đồng hoá và ngữ cảnh nghe. |
| `A2-02` | Ngữ điệu trong hội thoại | Thường | A.05 | Câu kể/hỏi/đuôi/liệt kê; liên kết bài tag questions. |
| `A2-03` | Hiện tại đơn: mở rộng cách dùng và đối chiếu | Lõi | F.01, F.15 | Nâng cấp mẫu hiện có; tách từng cách dùng (chỉ dẫn, tường thuật, lịch trình, mệnh đề thời gian/điều kiện); nối bài nền L0, chuyển chi tiết âm/chính tả sang bài chuyên đề có liên kết. |
| `A2-04` | Chính tả Anh-Anh và Anh-Mỹ | Thường | A.09 | Các nhóm khác biệt, biến thể được chấp nhận, tính nhất quán. |
| `A2-05` | Danh từ đếm được/không đếm được: nghĩa đổi | Thường | B.02 | Danh sách UC và từng cặp nghĩa; liên kết bảng tra danh từ. |
| `A2-06` | Danh từ tập hợp và danh từ ghép | Thường | B.09, B.11 | Hoà hợp theo ngữ cảnh, định ngữ danh từ, số nhiều ghép và dấu nối. |
| `A2-07` | Mạo từ với tên riêng và địa danh | Lõi | C.02, C.04 | Nhóm tên người, địa lý, tổ chức, mùa/ngày và cụm cố định. |
| `A2-08` | Không mạo từ: địa điểm, hoạt động và thành ngữ | Lõi | C.03 | Nghĩa chức năng/địa điểm, giao thông, bữa ăn, trường học/bệnh viện; đối chiếu BrE/AmE. |
| `A2-09` | No, none, both, either và neither | Thường | C.07, C.12 | Phạm vi phủ định, of, liên từ đôi và hoà hợp. |
| `A2-10` | Too, enough, so, such và lượng từ mức độ | Thường | C.10, K.11 | Dạng đi với danh từ/tính từ/trạng từ/to V và sắc thái mức độ. |
| `A2-11` | All, whole, every và each | Thường | C.11 | Phân bố, tần suất, of, every one/everyone và đại từ đối ứng. |
| `A2-12` | Other, another, one và các từ thay thế | Thường | C.13, C.15, D.09 | Bảng đối chiếu toàn bộ nhóm, one/ones và cách nói chung. |
| `A2-13` | Động từ bất quy tắc và các cặp dễ nhầm | Thường | E.06 | Mô hình AAA/ABA/ABB/ABC; KB ≥200 động từ và bài luyện riêng. |
| `A2-14` | Make/do/take/give/have/go | Thường | E.09 | Collocation ngữ pháp, nghĩa của từng mẫu và lỗi dịch từng từ. |
| `A2-15` | Phrasal verbs: cấu trúc và vị trí tân ngữ | Thường | E.10 | Bốn loại, đại từ bắt buộc tách; KB ≥300 cụm dùng chung các level. |
| `A2-16` | Hiện tại hoàn thành | Lõi | F.03 | Từng nghĩa, dấu hiệu, been/gone, first time, quá khứ đơn và BrE/AmE. |
| `A2-17` | Quá khứ tiếp diễn | Lõi | F.06 | Mốc thời gian, bối cảnh, song song, phàn nàn, lịch sự và kể chuyện. |
| `A2-18` | Will và be going to | Lõi | F.09 | Từng cách dùng, dấu hiệu ngữ cảnh và bảng đối chiếu. |
| `A2-19` | Kế hoạch và lịch trình tương lai | Lõi | F.09 | Hiện tại tiếp diễn/đơn, shall cơ bản; biểu thức tương lai nâng cao ở B2. |
| `A2-20` | Used to, would, be/get used to | Lõi | F.13, G.08 | Thói quen/trạng thái cũ và sự quen thuộc; không gộp các nghĩa vào một rule. |
| `A2-21` | Must, have to và need to | Lõi | G.04 | Bắt buộc, không bắt buộc, cấm đoán, quá khứ và have got to. |
| `A2-22` | Should, ought to và had better | Lõi | G.05 | Lời khuyên, nghĩa vụ, kỳ vọng; should have/mandative nối B2. |
| `A2-23` | Will/would trong ý chí và phép lịch sự | Lõi | G.06, G.13 | Mời, yêu cầu, đề nghị, đáp lời; would rather và giả định nối B1. |
| `A2-24` | Điều kiện loại 0 và loại 1 | Lõi | H.01, M.16 | Mỗi loại có rule riêng; modal trong mệnh đề chính và thời gian tương lai. |
| `A2-25` | V-ing/to V: nghĩa gần nhau và sắc thái | Lõi | J.03 | Các động từ trong danh mục, dạng với would; điểm cần đối chiếu nguồn ghi REVIEW. |
| `A2-26` | Giới từ + V-ing và to là giới từ | Lõi | J.07 | Nhóm động từ/tính từ, phủ định, cấu trúc cố định và phân biệt to V. |
| `A2-27` | Tính từ -ed/-ing và tính từ ghép | Thường | K.03 | Cảm xúc/tác nhân, hậu tố, dấu nối và đơn vị số ít trong cụm ghép. |
| `A2-28` | So sánh: mức độ, bội số và đối chiếu | Lõi | K.08 | Less/least, twice as, từ bổ nghĩa, same/similar/different và than-clause. |
| `A2-29` | Vị trí trạng từ và phạm vi nhấn mạnh | Thường | K.10 | Đầu/giữa/cuối, nhiều trạng từ, trợ động từ, only/even/just/also. |
| `A2-30` | Giới từ chỉ quan hệ, nguyên nhân và ngoại lệ | Thường | L.04 | By/with/of/for, like/as, nhượng bộ, nguyên nhân và nhóm loại trừ. |
| `A2-31` | Liên từ phụ thuộc theo nghĩa | Thường | L.09 | Các nhóm trong danh mục; dùng làm nền cho mệnh đề trạng ngữ B1. |
| `A2-32` | Câu hỏi đuôi | Lõi | M.08 | Toàn bộ trường hợp đặc biệt, modal, đại từ thay thế, ngữ điệu và hàm ý. |
| `A2-33` | Phủ định và phản hồi đồng ý/phản đối | Thường | M.11, M.12 | Hình thức cơ bản, so/neither/too/either, think so/hope not; phạm vi ở B2. |
| `A2-34` | Mệnh đề quan hệ xác định | Lõi | N.01, D.08 | Đại từ/trạng từ quan hệ, lược đại từ, giới từ và phạm vi that/which. |
| `A2-35` | Lỗi ngữ pháp thường gặp của người Việt | Thường | P.08 | Các nhóm lỗi trong phụ lục, nguyên nhân và quy trình tự sửa. |
| `A2-36` | Tiền tố và nghĩa của từ | Thường | Q.01 | Toàn bộ nhóm tiền tố được nêu; ngoại lệ và giới hạn đoán nghĩa. |
| `A2-37` | Hậu tố danh từ và tính từ | Thường | Q.02, Q.03 | Hai bảng hậu tố, biến đổi chính tả và nhận diện từ loại. |

### B1

| ID dự kiến | Bài | Loại | Mã phụ lục | Phạm vi và phần nối tiếp |
|---|---|---|---|---|
| `B1-01` | Số nhiều Latin/Hy Lạp và từ chỉ người | Thường | B.06, B.12, P.06 | Biến thể số nhiều; danh xưng, giới tính và singular they trong ngữ cảnh. |
| `B1-02` | Danh từ từ động từ/tính từ | Thường | B.13, K.05 | The + adjective, danh từ -ing, danh từ chuyển loại và hoà hợp. |
| `B1-03` | Lượng từ mở rộng và thứ tự hạn định từ | Thường | C.14, C.17 | Phân số/tỷ lệ, most/rest/half, thứ tự predeterminer–determiner. |
| `B1-04` | Đại từ trong diễn ngôn và câu rút gọn | Thường | D.05, D.06, D.07, D.10 | Former/latter, such/same, else/to V, wh-ever, Me too/It's me và sắc thái. |
| `B1-05` | Động từ trạng thái và nghĩa đổi | Thường | E.01 | Danh sách đầy đủ theo nghĩa; tiếp diễn khi đổi nghĩa, đối chiếu với thì. |
| `B1-06` | Nội/ngoại động từ và các mẫu câu | Thường | E.02, E.04 | SV/SVO/SVOO/SVOC/SVA, đổi to/for, middle và động từ đổi tính chuyển tác. |
| `B1-07` | Get: nghĩa và các mẫu cấu trúc | Thường | E.08 | Các dạng get + thành phần, nghĩa từ vựng và dẫn tới causative/passive. |
| `B1-08` | Prepositional verbs và phrasal verbs | Thường | E.11, E.12 | Cấu trúc, vị trí tân ngữ, giới từ đi kèm và khả năng bị động. |
| `B1-09` | Hiện tại hoàn thành tiếp diễn | Lõi | F.04 | Các nghĩa kéo dài/kết quả/gần đây; đối chiếu hoàn thành đơn và stative. |
| `B1-10` | Quá khứ hoàn thành | Lõi | F.07 | Trình tự, before/after/until, tường thuật, điều kiện/wish và hardly/no sooner. |
| `B1-11` | Quá khứ hoàn thành tiếp diễn | Lõi | F.08 | Kéo dài tới mốc, nguyên nhân và phân biệt các thì quá khứ. |
| `B1-12` | Tương lai tiếp diễn | Lõi | F.10 | Thời điểm, diễn tiến tự nhiên, sắp xếp và hỏi lịch sự. |
| `B1-13` | Can/could và may/might: khả năng, suy đoán | Lõi | G.02, G.03 | Could/was able to, phủ định suy đoán, may well/as well, may…but. |
| `B1-14` | Modal perfect: suy đoán về quá khứ | Lõi | G.09 | Must/can't/may/might/could have; bằng chứng và mức chắc chắn. |
| `B1-15` | Điều kiện loại 2 và loại 3 | Lõi | H.01, M.16 | Giả định hiện tại/quá khứ, modal trong kết quả và đối chiếu với sự thật. |
| `B1-16` | Điều kiện hỗn hợp và quan hệ thời gian | Lõi | H.01 | Các tổ hợp có nghĩa theo ngữ cảnh; đối chiếu timeline, không tổ hợp máy móc. |
| `B1-17` | Wish, if only và would rather | Lõi | H.06, G.06 | Ước hiện tại/quá khứ, phàn nàn, sở thích và đổi chủ ngữ. |
| `B1-18` | It's time, as if và các cấu trúc giả định | Lõi | H.06, F.05 | High time, as though, suppose/imagine, I'd sooner; thực/không thực. |
| `B1-19` | Bị động: hình thức và lựa chọn thể | Lõi | I.01, I.02, M.16 | Các thì phổ biến, modal, tác nhân, thông tin và trường hợp nên tránh. |
| `B1-20` | Bị động với tác nhân và nhiều tân ngữ | Lõi | I.03, I.04 | By/with, bỏ tác nhân, hai tân ngữ, giới từ và phrasal verbs. |
| `B1-21` | Have/get something done và nhờ người làm | Lõi | I.08 | Dịch vụ, trải nghiệm bất lợi, have O V/get O to V; phân biệt get-passive. |
| `B1-22` | V-ing/to V: các cặp đổi nghĩa | Lõi | J.04 | Từng động từ trong danh mục có rule/phần riêng; split nếu vượt 18 rule. |
| `B1-23` | Động từ + tân ngữ + to V | Lõi | J.05 | Nhóm yêu cầu, khuyên, cho phép, mong đợi và danh sách KB. |
| `B1-24` | Bare infinitive, tri giác và sai khiến | Lõi | J.06, I.10 | Make/let/have/help, see/hear + V/V-ing, khác biệt nghĩa và bị động. |
| `B1-25` | Bổ ngữ của tính từ và danh từ | Lõi | J.08, J.09, K.07 | To V, giới từ + V-ing, that/wh-clause, nice of/for, too/enough. |
| `B1-26` | Mục đích và kết quả với nguyên mẫu | Lõi | J.10 | To/in order to/so as to/so that, for V-ing/O to V và only to. |
| `B1-27` | Tính từ: vị trí, nghĩa và mức độ | Thường | K.01, K.04 | Chỉ định ngữ/vị ngữ, sau danh từ, đổi nghĩa theo vị trí, gradable/ungradable. |
| `B1-28` | Tính từ đi với giới từ | Thường | K.06 | Nhóm nghĩa, các giới từ biến thể và sắc thái; liên kết KB L.05. |
| `B1-29` | Trạng từ thời gian và dấu hiệu thì | Thường | K.12, F.15 | Vị trí, phạm vi và các cặp dễ nhầm; không coi dấu hiệu là công thức chọn thì tuyệt đối. |
| `B1-30` | Dependent prepositions: động từ | Lõi | L.05, E.12 | Mẫu động từ + giới từ + O/V-ing; dùng chung kho ≥300 mục. |
| `B1-31` | Dependent prepositions: tính từ và danh từ | Lõi | L.05, K.06 | Mẫu tính từ/danh từ, nghĩa đổi theo giới từ; luyện riêng theo nhóm. |
| `B1-32` | Giới từ cuối câu và cụm giới từ cố định | Thường | L.06, L.07 | Stranding/pied-piping, câu hỏi/quan hệ/bị động/V-ing; KB ≥100 cụm. |
| `B1-33` | Liên từ tương liên và cặp dễ nhầm | Thường | L.10, L.12 | Song song cấu trúc, các cặp trong danh mục; phần nguyên nhân/nhượng bộ nối N.06. |
| `B1-34` | Câu hỏi nhúng, phủ định, tu từ và echo | Thường | M.09, M.10 | Trật tự câu, phép lịch sự, lựa chọn và cách trả lời theo ý nghĩa. |
| `B1-35` | It giả và các cấu trúc đánh giá | Thường | M.14, D.01 | Thời tiết/thời gian/khoảng cách, of/for, takes, seems, no use/good/worth. |
| `B1-36` | Mệnh đề quan hệ không xác định | Lõi | N.02, D.08 | Dấu phẩy, which cả mệnh đề, quantifier + of whom/which và đối chiếu defining. |
| `B1-37` | Mệnh đề danh ngữ | Lõi | N.05 | That/wh/if/whether, hữu hạn/phi hữu hạn, vai trò và hoà hợp. |
| `B1-38` | Mệnh đề trạng ngữ: thời gian, nơi chốn, nguyên nhân | Lõi | N.06 | Từng liên từ và sắc thái, vị trí, dấu câu và phối thì. |
| `B1-39` | Mệnh đề trạng ngữ: mục đích, kết quả, nhượng bộ | Lõi | N.06, L.12 | So/such/so that, lest, although/no matter và đối chiếu các cặp dễ nhầm. |
| `B1-40` | Mệnh đề trạng ngữ: cách thức, so sánh, điều kiện | Lõi | N.06 | As/as if/the way, as…as/than, tỉ lệ và liên kết H. |
| `B1-41` | Câu gián tiếp: câu kể và lùi thì | Lõi | N.08 | Đại từ, thời gian/nơi chốn, giữ thì khi phù hợp và tường thuật nhiều câu. |
| `B1-42` | Câu gián tiếp: hỏi, mệnh lệnh và lời nói chức năng | Lõi | N.08, G.14 | Hỏi/đề nghị/cảm thán, modal và trật tự; reporting verbs nâng cao ở B2. |
| `B1-43` | Văn phong trang trọng, trung tính và thân mật | Thường | P.03 | Từ/cấu trúc, viết tắt, whom/who, you/one; bài tập lựa chọn theo người nghe. |
| `B1-44` | Ngữ pháp văn nói và phản hồi | Thường | P.04 | Lược, tag, discourse marker, vague language, lặp/dở dang và phản hồi ngắn. |
| `B1-45` | Ngữ pháp Anh-Anh và Anh-Mỹ | Thường | P.05 | Tất cả nhóm khác biệt trong phụ lục, tránh khẳng định tuyệt đối theo vùng. |
| `B1-46` | Hậu tố động từ/trạng từ và chuyển loại | Thường | Q.04, Q.05 | Mẫu hậu tố, chuyển từ loại và đổi trọng âm. |

### B2

| ID dự kiến | Bài | Loại | Mã phụ lục | Phạm vi và phần nối tiếp |
|---|---|---|---|---|
| `B2-01` | Mạo từ nâng cao trong văn bản | Lõi | C.02, C.03, C.04 | Nhạc cụ/phát minh/nhóm người, tiêu đề, tổ chức, cụm cố định và ngoại lệ theo ngữ cảnh. |
| `B2-02` | Danh từ trừu tượng và cấu tạo danh từ | Thường | B.14, Q.02 | Ý nghĩa hậu tố, đếm được theo nghĩa và liên kết danh hoá học thuật. |
| `B2-03` | Hoà hợp và tham chiếu đại từ | Thường | D.11 | Tập hợp, bất định, singular they, tham chiếu mơ hồ và sửa đoạn. |
| `B2-04` | Phrasal verbs: nghĩa bóng và văn phong | Thường | E.10 | KB ≥300 cụm, nhóm động từ gốc/chủ đề, lựa chọn nghĩa và bài luyện riêng. |
| `B2-05` | Tương lai hoàn thành | Lõi | F.11 | Bài riêng cho thì này; by/by the time và quan hệ mốc thời gian. |
| `B2-06` | Tương lai hoàn thành tiếp diễn | Lõi | F.11 | Bài riêng cho thì này; độ dài, điểm nhìn và đối chiếu hoàn thành đơn. |
| `B2-07` | Tương lai trong quá khứ và biểu thức tương lai | Lõi | F.12, F.09, G.11 | Was going to/would/was about to/was to; be due to/be to/on the point of. |
| `B2-08` | Phối thì trong câu phức | Lõi | N.09, F.12 | Danh ngữ/quan hệ/thời gian, sequence of tenses và điểm nhìn tường thuật. |
| `B2-09` | Thì kể chuyện và bảng tổng hợp 12 thì | Lõi | F.14, F.16 | Đan xen thì, timeline, đủ hình thức/nghĩa/dấu hiệu; bài tổng hợp có câu luyện riêng. |
| `B2-10` | Shall, need, dare và bán khiếm khuyết | Lõi | G.07, G.08, G.11 | Modal/động từ thường, sắc thái trang trọng/pháp lý, toàn bộ mẫu bán modal còn lại. |
| `B2-11` | Modal perfect: đánh giá, hối tiếc và giả định | Lõi | G.09, G.05 | Should/ought to/needn't/would have; phân biệt phê bình với suy đoán. |
| `B2-12` | Modal tiếp diễn và thang chắc chắn | Lõi | G.10, G.12 | Must be/might have been, bảng modal × nghĩa, phạm vi và mức chắc chắn. |
| `B2-13` | Modal trong câu phức và phép lịch sự nâng cao | Lõi | G.14, G.06, G.13 | Tags, phủ định, điều kiện, tường thuật; hàm ý và cách đáp theo ngữ cảnh. |
| `B2-14` | Các từ thay if | Lõi | H.02 | Toàn bộ danh mục, phân biệt in case/if, only if/even if, unless/if not. |
| `B2-15` | Đảo điều kiện và biến thể của if | Lõi | H.03, H.04 | Were/Had/Should, if should/were to/will/would/perfect, was/were. |
| `B2-16` | Điều kiện ngầm, rút gọn và mệnh lệnh | Lõi | H.05, H.08 | With/without/then, if so/not/possible, imperative + and/or, do/you/let. |
| `B2-17` | Subjunctive và mandative clauses | Lõi | H.07, G.05 | Base verb, were, should, công thức cố định và đối chiếu BrE/AmE. |
| `B2-18` | Bị động tường thuật | Lõi | I.05 | It is said/He is said, perfect infinitive và danh sách động từ theo mẫu. |
| `B2-19` | Bị động phi hữu hạn và cấu trúc need | Lõi | I.06, J.11 | Nguyên mẫu/danh động từ đơn/hoàn thành/bị động; need/want + V-ing. |
| `B2-20` | Get-passive, tính từ phân từ và giới hạn bị động | Lõi | I.07, I.09, I.01 | Trạng thái/hành động, câu hỏi/phủ định/mệnh lệnh, bảng 12 thì có nhãn độ tự nhiên. |
| `B2-21` | Hệ thống sai khiến và cho phép | Lõi | I.10 | Make/let/have/get/help/force/allow/enable/cause/order, đối chiếu mẫu O + V/to V/V-ed. |
| `B2-22` | Nguyên mẫu nâng cao và lược to-infinitive | Lõi | J.11, J.12 | Perfect/continuous/passive, seem/appear, bare/split/wh-infinitive, to đứng một mình. |
| `B2-23` | Danh động từ: vai trò, chủ ngữ và thể | Lõi | J.13 | Chủ ngữ/tân ngữ/bổ ngữ, sở hữu, not, hoàn thành/bị động. |
| `B2-24` | Mệnh đề phân từ và rút gọn trạng ngữ | Lõi | J.14, N.07 | V-ing/V-ed/having done/being, liên từ, cùng chủ ngữ và dangling modifier. |
| `B2-25` | Tra cứu và chọn mẫu động từ | Lõi | J.15 | Bài tổng hợp có rule và bài tập riêng; bảng KB liên kết tất cả mẫu J.01–14. |
| `B2-26` | So sánh nâng cao và trạng từ so sánh | Lõi | K.08, K.14 | So sánh kép, than-clause, best…ever, hai/nhiều, too/enough với trạng từ. |
| `B2-27` | Trạng từ bình luận, liên kết và dấu câu | Thường | K.13, L.11 | Quan điểm người viết, phạm vi và dấu chấm phẩy/phẩy. |
| `B2-28` | Liên kết và tổ chức đoạn văn | Thường | L.13, P.01 | Từng chức năng từ nối, tham chiếu/thay thế/lược, lặp và từ bao quát. |
| `B2-29` | Hedging, boosting và mức độ chắc chắn | Thường | P.02 | Mẫu cấu trúc, độ mạnh và tính phù hợp trong lập luận. |
| `B2-30` | Phủ định: phạm vi, hàm ý và hạn định | Thường | M.11 | Not/no/any, phủ định hàm, don't think, not until; ghi rõ phạm vi chuẩn học. |
| `B2-31` | There nâng cao và câu hỏi qua các thì | Lõi | M.13, M.06 | There + modal/to be/seems/used to/V-ing/V-ed, no point; hình thức câu hỏi tổng hợp. |
| `B2-32` | Cảm thán, cầu khiến và công thức lời nói | Thường | M.15 | What/how, chúc/thề/nguyện, lời chào và sắc thái. |
| `B2-33` | Rút gọn và mở rộng mệnh đề quan hệ | Lõi | N.03, N.04, D.08 | V-ing/V-ed/to V/cụm, what/wh-ever, the way/reason/day, tách xa và nối tiếp. |
| `B2-34` | Reporting verbs và các mẫu tường thuật | Lõi | N.08 | KB ≥60 động từ + mẫu; V-ing/to V/that, phối hợp nhiều lời nói và bài luyện. |
| `B2-35` | Hoà hợp chủ vị: hệ thống và ngoại lệ | Lõi | N.11 | And/or/nor, quantifiers, tập hợp/UC, số đo/tựa đề, -s và đại từ bất định. |
| `B2-36` | Hoà hợp trong câu phức và phối hợp câu | Lõi | N.11, N.10 | Relative/what-clause, one of those who, đảo/there/here, parallelism và dấu câu. |
| `B2-37` | Đảo ngữ sau từ phủ định và hạn chế | Thường | O.01 | Tất cả nhóm trong danh mục, vị trí only/not until và trợ động từ. |
| `B2-38` | Đảo ngữ nơi chốn, so/such và các mẫu khác | Thường | O.02, M.05 | Here/there, hướng, as/than, trích dẫn và đối chiếu đảo điều kiện. |
| `B2-39` | Câu chẻ và nhấn mạnh | Thường | O.03, O.05 | It/wh/reverse/all-cleft; do, trạng từ, phản thân, lặp và các cụm nhấn mạnh. |
| `B2-40` | Ngữ pháp theo thể loại văn bản | Thường | P.07 | Email/thư/báo/học thuật/quảng cáo/tiêu đề/chỉ dẫn/nhãn/tin nhắn. |
| `B2-41` | Biên tập lỗi câu và đoạn văn | Thường | P.09, A.12 | Dangling/misplaced modifier, hoà hợp/tham chiếu, song song, redundancy, run-on/fragment. |
| `B2-42` | Từ ghép, rút gọn và cơ chế tạo từ | Thường | Q.06 | Compound/blend/clipping/back-formation/acronym/initialism và cách viết. |
| `B2-43` | Họ từ và chuyển đổi từ loại | Thường | Q.07 | KB ≥300 từ gốc, bảng N/V/Adj/Adv và bài luyện nhận diện theo ngữ cảnh. |

### C1

| ID dự kiến | Bài | Loại | Mã phụ lục | Phạm vi và phần nối tiếp |
|---|---|---|---|---|
| `C1-01` | Dấu câu nâng cao và biên tập cấu trúc | Thường | A.11, A.12 | Đủ danh mục dấu câu, Oxford comma, đồng vị/ngắt khoảng; sửa lỗi đoạn dài. |
| `C1-02` | Cụm động từ và giới từ: sắc thái diễn ngôn | Thường | E.10, E.11, E.12, L.05 | Nghĩa bóng, kết hợp, register; mở rộng kho dùng chung và luyện theo văn bản. |
| `C1-03` | Điểm nhìn thời gian và hiện tại lịch sử | Lõi | F.14, F.01, F.02 | Kể chuyện, bình luận, tiêu đề/báo chí, đổi điểm nhìn và hiệu ứng diễn ngôn. |
| `C1-04` | Modal, giả định và điều kiện trong diễn ngôn | Lõi | G.03, G.06, G.07, H.03, H.07 | Hàm ý, nhượng bộ, công thức giả định và sắc thái; không thay thế bài từng mẫu. |
| `C1-05` | Thể và cấu trúc câu trong văn viết nâng cao | Lõi | I.01, I.02, I.09, N.09 | Lựa chọn bị động, hình thức ít tự nhiên, phối thì và biên tập giữ nghĩa. |
| `C1-06` | Absolute constructions và mệnh đề phi hữu hạn | Lõi | J.14, N.07 | Weather permitting, with O V-ing/V-ed, chủ ngữ riêng và phân biệt lỗi dangling. |
| `C1-07` | Lược bỏ và thay thế | Thường | M.17, J.12, D.09 | So/not/do so/one/same/to, lời nói/chỉ dẫn, câu phối hợp và so sánh. |
| `C1-08` | Fronting và cấu trúc nhượng bộ | Thường | O.04, O.01, O.02 | Topic, tân ngữ đưa lên, as for, much as/as…as; điều kiện đảo ngữ. |
| `C1-09` | Đồng vị, nhóm danh từ phức và trọng tâm thông tin | Thường | O.06, O.03, M.14 | Parenthesis, extraposition, thông tin cũ/mới, end-weight, cleft theo ngữ cảnh. |
| `C1-10` | Danh hoá và viết học thuật | Thường | O.07, B.14, Q.07 | Đổi cấu trúc giữ nghĩa, họ từ, cân bằng danh hoá với độ rõ ràng. |
| `C1-11` | Liên kết, lập luận và lựa chọn văn phong | Thường | P.01, P.02, P.03, P.07 | Đoạn/văn bản dài, hedging/boosting, thể loại và người đọc. |
| `C1-12` | Biến thể ngôn ngữ, hội thoại và cách gọi người | Thường | P.04, P.05, P.06 | Spoken grammar, BrE/AmE, neutral language, singular they và danh xưng. |
| `C1-13` | Biên tập tổng hợp cho người Việt | Thường | P.08, P.09 | Các nhóm lỗi, nguyên nhân và tự kiểm tra; sửa bài có giải thích từng lựa chọn. |

## 4. Những phần đã chủ động tách

| Nhóm | Cách chia | Lý do |
|---|---|---|
| A.02/A.07/C.16 | Nguyên âm–phụ âm; quan hệ chữ–âm–âm câm; số–ngày giờ | Tách tải nhận thức và đủ chỗ cho ví dụ/ngoại lệ. |
| F.01/F.09/F.11 | Hiện tại đơn nền/mở rộng; tương lai theo will/going to–kế hoạch–biểu thức nâng cao; hai thì hoàn thành tương lai riêng | Giữ mỗi thì có bài lõi riêng, không gộp hai thì của F.11. |
| H.01/H.06 | Điều kiện 0–1, 2–3, mixed; wish/rather và time/as if | Phân biệt điểm nhìn thời gian và tránh một rule chứa nhiều cách dùng. |
| N.06/N.08/N.11 | Ba bài mệnh đề trạng ngữ; ba bài gián tiếp; hai bài hoà hợp | Các mã này có nhiều tiểu mục, không thể coi một mục tổng hợp là đã phủ. |
| L.05/J.14/N.07 | Giới từ theo động từ và theo tính từ/danh từ; participle cơ bản và absolute ở C1 | Tách theo cấu trúc, có bài luyện tra cứu và kiểm tra chủ ngữ riêng. |
| C.02–04/K.08/E.10 | Nền tảng → mở rộng → sắc thái/ngữ cảnh | Dạy spiral; không tính việc nhắc tên ở bài đầu là hoàn tất mã. |

Đây là các tách bài dự kiến trước khi viết; sau mỗi level phải báo riêng các lần tách phát sinh và lý do.

## 5. Kho kiến thức và bài luyện đi kèm

| Tài liệu dự kiến trong `kb/` | Mã | Cam kết nội dung và bài luyện |
|---|---|---|
| `irregular-verbs` | E.06 | ≥200 động từ, dạng và nghĩa/biến thể, nhóm AAA/ABA/ABB/ABC; bài luyện riêng và cặp dễ nhầm. |
| `phrasal-verbs` | E.10 | ≥300 cụm, nghĩa và văn phong, tách/không tách, nhóm động từ gốc/chủ đề; bài luyện riêng. |
| `dependent-prepositions` | L.05, E.12, K.06 | ≥300 mục, mẫu động từ/tính từ/danh từ và ví dụ; bài luyện riêng. |
| `fixed-prepositions` | L.07 | ≥100 cụm có nghĩa, văn cảnh, liên kết luyện tập. |
| `reporting-verbs` | N.08 | ≥60 động từ kèm mẫu bổ ngữ và biến thể; bài luyện chọn/chuyển cấu trúc. |
| `word-families` | Q.07 | ≥300 từ gốc, N/V/Adj/Adv; ghi rõ dạng không tồn tại/hiếm, không tự chế dạng để lấp bảng. |
| `verb-patterns` | J.01–15 | Danh sách theo mẫu, nghĩa đổi và ngoại lệ; nối từ rule tới mục tra tương ứng. |
| `noun-forms-and-countability` | B.02–09 | UC, đổi nghĩa theo tính đếm được, số nhiều/biến thể/ngoại lệ. |
| `stative-verbs` | E.01 | Danh sách theo nghĩa, cách dùng tiếp diễn khi đổi nghĩa và giới hạn. |
| `confused-pairs` | L.12, P.08–09 | Mỗi cặp có bảng so sánh, ngữ cảnh và bộ luyện riêng. |
| `reference-tables` | A.02, A.11, F.16, G.12, I.01, Q.01–04 | IPA, dấu câu, thì/modal/bị động/hậu tố; nhãn biến thể và độ tự nhiên khi cần. |

Các tên trên là kế hoạch, chưa phải file/route có thể mở. “Đầy đủ” cần kiểm tra theo nguồn tham khảo và phạm vi danh mục, không đồng nhất ngưỡng 200/300 với mọi từ trong ngôn ngữ. Các điểm cần làm rõ được ghi trong [REVIEW](../REVIEW.md); không được tự hạ yêu cầu hoặc dùng bảng mẫu thay bảng hoàn chỉnh.

## 6. Ma trận và kiểm soát chất lượng cần triển khai sau duyệt

[KNOWLEDGE-MATRIX.md](KNOWLEDGE-MATRIX.md) là bản kiểm kê ban đầu đủ 208 mã, phân biệt **bài dự kiến** với **rule/câu đã xác nhận**. Đã có `appendixCodes` trên 14 rule thuộc L0-01/L0-12; A2-03 chưa ánh xạ. Ma trận ghi số câu thật nhưng không coi việc có đủ số câu là đủ mọi tiểu mục.

Thứ tự công việc còn tiếp tục (schema đã nhận `appendixCodes` tuỳ chọn; checker chưa có):

1. Thêm schema `appendixCodes`, danh mục mã hợp lệ, phân loại lõi/dễ sai và metadata phục vụ kiểm tra ngưỡng. Dùng mã có thật như `F.01`, không dùng `D.14`/`D.15` chỉ xuất hiện trong ví dụ của phụ lục.
2. Viết `scripts/check-knowledge-matrix.ts`, sinh/đối chiếu ma trận từ bài và câu thật. Kiểm tra mã không tồn tại, thiếu ánh xạ, rule không có anchor/câu, số câu trực tiếp, đủ ba mức khó và mức tối thiểu theo mã/rule. Không đếm trùng ID câu trong nhiều set; một cloze không tự biến thành nhiều câu độc lập chỉ vì có nhiều ô trống.
3. Nối checker vào `validate`: thiếu mã ánh xạ phải fail như phụ lục yêu cầu. Báo cáo tiến độ được phép ghi “dự kiến ở level X”, nhưng điều đó không chuyển một lần kiểm tra toàn curriculum từ fail thành pass. Vì `prebuild` chạy validate, cần báo rõ build sẽ chưa qua cổng toàn curriculum khi còn thiếu nội dung; không hạ gate để làm đẹp báo cáo.
4. Lập outline cho từng bài trước khi viết, đối chiếu các tài liệu ngữ pháp chuẩn bằng nguồn thực sự đã đọc; theo dõi sáu chiều và tiểu mục của từng mã. Đếm từ lý thuyết phải tách phần ví dụ/bản dịch/công thức/bài tập, công khai quy tắc đếm tiếng Việt; chưa dùng tổng số token Markdown làm số từ lý thuyết.
5. Nâng cấp hai bài mẫu và triển khai từng level L0 → A1 → A2 → B1 → B2 → C1. Theo SPEC, bổ sung kiểm tra unit/level và cập nhật roadmap khi nội dung thực sự có. Không đưa hàng “dự kiến” lên ứng dụng như bài hoàn thành.
6. Sau mỗi level nộp metrics từng bài, ma trận có rule/câu thật và mã chưa phủ, REVIEW mới, bài tách thêm, kết quả validate/coverage/check-knowledge-matrix/test/lint/build. Kiểm tra tự động không thay thế đọc duyệt độ chính xác, tự nhiên và sáu chiều.

## 7. Điểm cần người dùng duyệt

Phần 4 của phụ lục quy định: **“bản đồ bài học chính thức (`LESSON-MAP.md`) do agent lập và tôi duyệt.”** Người dùng sau đó đã yêu cầu “thêm kiến thức” và “tiếp tục”; việc bổ sung nội dung đã bắt đầu, không chờ một lần xác nhận lặp lại.

Các quyết định còn có thể rà soát trong quá trình triển khai: danh sách và cách phân level ở mục 3; giữ ID `A2-03` làm bài mở rộng, thêm hiện tại đơn nền ở L0; cách tách bài ở mục 4; phạm vi kho kiến thức và trình tự triển khai ở mục 5–6. `CURRICULUM-CHECKLIST.md` cũ vẫn mô tả kế hoạch từ SPEC ban đầu; bản đồ mới chỉ thay thế kế hoạch đó sau khi được duyệt.
