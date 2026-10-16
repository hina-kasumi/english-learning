# Ma trận kiến thức — bài học và kho tra cứu A–Q

- Ngày: 16/10/2026; nguồn: [phụ lục nâng cao](../../docs/PHU-LUC-KIEN-THUC-NANG-CAO.md).
- Kế hoạch đủ 208 mã trong [LESSON-MAP](LESSON-MAP.md). **5 mã có ánh xạ rule/câu thật; 203 mã chưa ánh xạ.** Chưa chứng nhận mã nào hoàn tất mọi tiểu mục/sáu chiều theo toàn bộ phụ lục.
- Hiện có 3 bài, 24 rule, 284 câu; 14 rule của L0-01/L0-12 có `appendixCodes`. A2-03 chưa gắn mã nên không cộng câu của bài đó vào coverage theo mã.
- Cột Bài vẫn là các bài dự kiến; cột Rule ID và số câu là dữ liệu thực. Chỉ đếm câu có đúng một rule; mỗi ID câu đếm một lần. Câu mixed đơn rule cũng được tính; số ô của một cloze không được quy thành nhiều câu.
- Ngưỡng theo mã: F/G/H/I/J/N, M.08, M.13, C.02–03, K.08, L.05 ≥12; mã khác ≥8. Đủ số câu không đồng nghĩa đã đủ phạm vi nội dung. D.01 còn thiếu các phần it giả, you/we chung và các trường hợp nâng cao; E.07/M.06/M.07 cũng mới có phạm vi nền.
- Bảng được đối chiếu trực tiếp từ frontmatter/JSON ở lượt này. Checker tự động toàn danh mục chưa triển khai; không báo `check-knowledge-matrix` pass.

## Độ phủ tra cứu trên giao diện

Toàn bộ **208 mã / 17 nhóm** đã có mục đọc tại `/#/knowledge/reference/<nhóm>?topic=<mã>`; ví dụ `/#/knowledge/reference/H?topic=H.03`. Dữ liệu ở `kb/reference/A.json` đến `Q.json`, mỗi mục có giải thích/cấu trúc/ví dụ/lỗi/đối chiếu. Validator kiểm tra catalogue và liên kết; test đối chiếu với danh mục gốc.

**Có mục tra cứu không đồng nghĩa hoàn tất chuẩn bài học và bài tập.** Các cột Rule ID/số câu phía dưới vẫn ghi dữ liệu bài luyện thật; không nâng 203 mã chưa ánh xạ thành đạt chỉ vì đã thêm trang tham khảo.

## Nhóm A

| Mã phụ lục | Điểm kiến thức | Bài (dự kiến) | Rule ID đã xác nhận | Số câu bài tập đã xác nhận | Ngưỡng mã | Level dự kiến / trạng thái |
|---|---|---|---|---:|---:|---|
| A.01 | Bảng chữ cái, tên chữ cái, cách đánh vần tên/địa chỉ | L0-02 | — | 0 | 8 | L0; chưa xác nhận |
| A.02 | Nguyên âm đơn, nguyên âm đôi, phụ âm: toàn bộ bảng IPA (Anh-Anh, ghi chú Anh-Mỹ), cặp âm dễ nhầm với người Việt (/ θ ð ʃ ʒ tʃ dʒ ŋ/, âm cuối, cụm phụ âm, /i:/ vs /ɪ/, /æ/ vs /e/…) | L0-03, L0-04 | — | 0 | 8 | L0; chưa xác nhận |
| A.03 | Trọng âm từ (danh từ/động từ đổi trọng âm: record, present, object…), trọng âm từ ghép, hậu tố ảnh hưởng trọng âm | A1-01 | — | 0 | 8 | A1; chưa xác nhận |
| A.04 | Trọng âm câu, dạng mạnh/yếu (strong/weak forms), nối âm, nuốt âm, đồng hoá thường gặp | A2-01 | — | 0 | 8 | A2; chưa xác nhận |
| A.05 | Ngữ điệu cơ bản: câu kể, Yes/No, Wh-, câu hỏi đuôi, liệt kê | A2-02 | — | 0 | 8 | A2; chưa xác nhận |
| A.06 | Quy tắc phát âm -s/-es, -ed, "the" (/ðə/ vs /ðiː/), "a/an" | L0-07 | — | 0 | 8 | L0; chưa xác nhận |
| A.07 | Mối quan hệ chính tả–phát âm: nguyên âm dài/ngắn, magic e, các tổ hợp thông dụng, âm câm (knife, hour, castle, listen…), đồng âm/gần âm (their/there, to/too/two…) | L0-05, L0-06 | — | 0 | 8 | L0; chưa xác nhận |
| A.08 | Quy tắc chính tả thêm hậu tố: gấp đôi phụ âm cuối, bỏ e, y→i, ie→y (-ing, -ed, -er/-est, -ly, -ment, -ful…) | L0-08 | — | 0 | 8 | L0; chưa xác nhận |
| A.09 | Chính tả Anh-Anh vs Anh-Mỹ (colour/color, -ise/-ize, -re/-er, travelled/traveled…) | A2-04 | — | 0 | 8 | A2; chưa xác nhận |
| A.10 | Viết hoa (đầy đủ), viết tắt, chữ số/chữ cái trong văn bản | L0-09 | — | 0 | 8 | L0; chưa xác nhận |
| A.11 | Dấu câu đầy đủ: chấm, phẩy (liệt kê, mệnh đề, đồng vị, ngắt khoảng, Oxford comma), chấm phẩy, hai chấm, gạch nối, gạch ngang, ngoặc, nháy đơn (sở hữu, viết tắt), nháy kép, dấu chấm hỏi/than, dấu ba chấm, gạch chéo | A1-02, C1-01 | — | 0 | 8 | A1, C1; chưa xác nhận |
| A.12 | Câu lỗi dấu câu: comma splice, run-on, fragment | B2-41, C1-01 | — | 0 | 8 | B2, C1; chưa xác nhận |

## Nhóm B

| Mã phụ lục | Điểm kiến thức | Bài (dự kiến) | Rule ID đã xác nhận | Số câu bài tập đã xác nhận | Ngưỡng mã | Level dự kiến / trạng thái |
|---|---|---|---|---:|---:|---|
| B.01 | Phân loại: chung/riêng, cụ thể/trừu tượng, tập hợp, ghép | L0-10 | — | 0 | 8 | L0; chưa xác nhận |
| B.02 | Đếm được/không đếm được: quy tắc, danh sách UC thường gặp (information, advice, news, furniture, luggage, equipment, homework, progress, research…), danh từ vừa đếm vừa không đếm (nghĩa đổi: paper, glass, hair, work, time, room, experience…) | L0-10, A2-05 | — | 0 | 8 | L0, A2; chưa xác nhận |
| B.03 | Đơn vị đo cho UC (a piece of, a slice of, a bit of, an item of, a loaf of…) | A1-03 | — | 0 | 8 | A1; chưa xác nhận |
| B.04 | Số nhiều quy tắc: -s, -es, y→ies, -f/-fe→ves, -o (potatoes/photos), ngoại lệ đầy đủ | L0-11 | — | 0 | 8 | L0; chưa xác nhận |
| B.05 | Số nhiều bất quy tắc: man/men, child/children, tooth/teeth, foot/feet, mouse/mice, person/people… | L0-11 | — | 0 | 8 | L0; chưa xác nhận |
| B.06 | Số nhiều gốc Latin/Hy Lạp (-is→-es, -um→-a, -us→-i, -on→-a, -ix→-ices) | B1-01 | — | 0 | 8 | B1; chưa xác nhận |
| B.07 | Danh từ số ít và số nhiều giống nhau (sheep, fish, species, series, aircraft…) | A1-03 | — | 0 | 8 | A1; chưa xác nhận |
| B.08 | Danh từ luôn số nhiều (scissors, trousers, glasses, clothes, police, people, cattle…) và danh từ tận cùng -s nhưng số ít (news, physics, mathematics, economics, measles…) | A1-03 | — | 0 | 8 | A1; chưa xác nhận |
| B.09 | Danh từ tập hợp (team, family, government, committee…): số ít/số nhiều theo ngữ cảnh, Anh-Anh vs Anh-Mỹ | A2-06 | — | 0 | 8 | A2; chưa xác nhận |
| B.10 | Sở hữu cách: 's, s', of; danh từ tận cùng -s; sở hữu kép (a friend of mine); sở hữu với tên riêng/nhóm/cụm; khi nào dùng of vs 's; sở hữu độc lập (at the doctor's) | A1-04 | — | 0 | 8 | A1; chưa xác nhận |
| B.11 | Danh từ làm định ngữ (a stone wall, a ten-minute walk, two-year-old) và danh từ ghép (viết liền/rời/gạch nối, số nhiều của danh từ ghép: mothers-in-law) | A2-06 | — | 0 | 8 | A2; chưa xác nhận |
| B.12 | Giống (actor/actress, trung hoà giới tính: chair-person, they số ít) | B1-01 | — | 0 | 8 | B1; chưa xác nhận |
| B.13 | Danh từ từ động từ/tính từ (the poor, the rich, the elderly; a run, a swim, a look); danh từ tận -ing | B1-02 | — | 0 | 8 | B1; chưa xác nhận |
| B.14 | Danh từ trừu tượng & đuôi danh từ (-tion, -ness, -ment, -ity, -ship, -hood…) (nối sang K) | B2-02, C1-10 | — | 0 | 8 | B2, C1; chưa xác nhận |

## Nhóm C

| Mã phụ lục | Điểm kiến thức | Bài (dự kiến) | Rule ID đã xác nhận | Số câu bài tập đã xác nhận | Ngưỡng mã | Level dự kiến / trạng thái |
|---|---|---|---|---:|---:|---|
| C.01 | a/an: quy tắc theo âm (an hour, a university, an MBA), nghĩa "một", "mỗi" (twice a day), nghề nghiệp, giới thiệu lần đầu | L0-16 | — | 0 | 8 | L0; chưa xác nhận |
| C.02 | the: mọi cách dùng (đã biết, duy nhất, so sánh nhất/thứ tự, tính từ làm danh từ, nhóm người, nhạc cụ, phát minh, họ gia đình, sông/biển/dãy núi/nhóm đảo/sa mạc, tên theo cụm "the + of") | L0-17, A2-07, B2-01 | — | 0 | 12 | L0, A2, B2; chưa xác nhận |
| C.03 | Không mạo từ (zero): danh từ số nhiều/UC nói chung, môn học, bữa ăn, ngôn ngữ, quốc gia/thành phố/châu lục, tên đường/công viên, giao thông (by bus), cụm cố định (go to school/bed/work/hospital/church/prison…) và sắc thái Anh-Anh vs Anh-Mỹ | L0-17, A2-08, B2-01 | — | 0 | 12 | L0, A2, B2; chưa xác nhận |
| C.04 | Mạo từ với tên riêng, địa danh, tên tổ chức, ngày tháng, mùa, trong tiêu đề báo (headlinese), cụm cố định | A2-07, B2-01 | — | 0 | 8 | A2, B2; chưa xác nhận |
| C.05 | this/that/these/those: gần/xa, thời gian, trong kể chuyện/thư từ/điện thoại, that thay cho the one | A1-05 | — | 0 | 8 | A1; chưa xác nhận |
| C.06 | some/any: khẳng định/phủ định/nghi vấn, câu mời/đề nghị (Would you like some…), any = bất kỳ, hợp từ (somebody/anything…) | A1-05 | — | 0 | 8 | A1; chưa xác nhận |
| C.07 | no/none/not any/neither; none of + số ít/số nhiều | A2-09 | — | 0 | 8 | A2; chưa xác nhận |
| C.08 | much/many/a lot of/lots of/plenty of/a great deal of/a large number of/a good deal; trong câu khẳng định/phủ định/nghi vấn, trang trọng/thân mật | A1-06 | — | 0 | 8 | A1; chưa xác nhận |
| C.09 | few/a few/little/a little, fewer/less, quite a few, only a few, very few | A1-06 | — | 0 | 8 | A1; chưa xác nhận |
| C.10 | enough/too/very/so/such (+ danh từ), too much/too many, enough + to | A2-10 | — | 0 | 8 | A2; chưa xác nhận |
| C.11 | all/whole/entire; every/each/everyone; all of, each of, every one; every + số ít, every + số đếm (every two days); each other/one another | A2-11 | — | 0 | 8 | A2; chưa xác nhận |
| C.12 | both/either/neither; both…and, either…or, neither…nor: hòa hợp chủ vị, vị trí, both of the | A2-09 | — | 0 | 8 | A2; chưa xác nhận |
| C.13 | another/other/others/the other/the others/each other/one another; phân biệt (bảng) | A2-12 | — | 0 | 8 | A2; chưa xác nhận |
| C.14 | several/various/a number of/a couple of/a handful of/most/the majority of/the rest of/half/double/twice/quarter/percent | B1-03 | — | 0 | 8 | B1; chưa xác nhận |
| C.15 | one/ones: thay thế danh từ; the one(s) with/that; this one | A2-12 | — | 0 | 8 | A2; chưa xác nhận |
| C.16 | Số: số đếm, số thứ tự, phân số, thập phân, phần trăm, năm, ngày tháng (Anh-Anh vs Anh-Mỹ), giờ, tiền, số điện thoại, nhiệt độ, đo lường, "dozens of/hundreds of", số trong dạng ghép (a three-year plan) | L0-18, L0-19 | — | 0 | 8 | L0; chưa xác nhận |
| C.17 | Thứ tự hạn định từ (all the, both my, half an hour, such a, what a, quite a) | B1-03 | — | 0 | 8 | B1; chưa xác nhận |

## Nhóm D

| Mã phụ lục | Điểm kiến thức | Bài (dự kiến) | Rule ID đã xác nhận | Số câu bài tập đã xác nhận | Ngưỡng mã | Level dự kiến / trạng thái |
|---|---|---|---|---:|---:|---|
| D.01 | Nhân xưng chủ ngữ/tân ngữ; it (thời tiết, thời gian, khoảng cách, chủ ngữ giả); they số ít; you chung; we chung | L0-01, L0-12, B1-35 | L0-12.01; L0-12.02 | 25 | 8 | L0, B1; có phần nội dung, chưa xác nhận toàn mã |
| D.02 | Tính từ sở hữu vs đại từ sở hữu; phân biệt its/it's, your/you're, their/there/they're, whose/who's | L0-12 | L0-12.03; L0-12.04; L0-12.05; L0-12.06; L0-12.07; L0-12.08 | 73 | 8 | L0; có phần nội dung, chưa xác nhận toàn mã |
| D.03 | Đại từ phản thân (-self/-selves): khi bắt buộc, khi không dùng (wash, dress, feel…), nhấn mạnh, by oneself, enjoy yourself, help yourself | A1-07 | — | 0 | 8 | A1; chưa xác nhận |
| D.04 | Đại từ nhấn mạnh vs đối ứng (each other) | A1-07 | — | 0 | 8 | A1; chưa xác nhận |
| D.05 | Chỉ định làm đại từ (this/that/these/those), such, same, the former/the latter | A1-05, B1-04 | — | 0 | 8 | A1, B1; chưa xác nhận |
| D.06 | Bất định: somebody/anyone/nothing/everything…, + tính từ (something nice), + else, + to V; hòa hợp (everyone → he/she/they) | A1-05, B1-04 | — | 0 | 8 | A1, B1; chưa xác nhận |
| D.07 | Nghi vấn who/whom/whose/which/what; Wh-ever (whatever, whoever, wherever, whenever, however) | A1-23, B1-04 | — | 0 | 8 | A1, B1; chưa xác nhận |
| D.08 | Quan hệ (nối sang N) | A2-34, B1-36, B2-33 | — | 0 | 8 | A2, B1, B2; chưa xác nhận |
| D.09 | One(s) làm đại từ, you/one chung | A2-12, C1-07 | — | 0 | 8 | A2, C1; chưa xác nhận |
| D.10 | Đại từ trong câu cảm thán, câu rút gọn trả lời (Me too, Him?, It's me), "It is I" vs "It is me" | B1-04 | — | 0 | 8 | B1; chưa xác nhận |
| D.11 | Đại từ và danh từ tập hợp, hòa hợp đại từ (pronoun agreement), mơ hồ đại từ tham chiếu (ambiguous reference) | B2-03 | — | 0 | 8 | B2; chưa xác nhận |

## Nhóm E

| Mã phụ lục | Điểm kiến thức | Bài (dự kiến) | Rule ID đã xác nhận | Số câu bài tập đã xác nhận | Ngưỡng mã | Level dự kiến / trạng thái |
|---|---|---|---|---:|---:|---|
| E.01 | Động từ chính/trợ động từ (do, be, have)/khiếm khuyết; hành động/trạng thái (stative) với danh sách đầy đủ và nghĩa đổi theo ngữ cảnh (think, see, have, taste, smell, feel, look, appear, weigh, measure, be) | L0-13, B1-05 | — | 0 | 8 | L0, B1; chưa xác nhận |
| E.02 | Ngoại/nội động từ; động từ vừa ngoại vừa nội (open, close, begin, change, break, sell, burn, cook…) và nghĩa; động từ "middle" (This book sells well) | B1-06 | — | 0 | 8 | B1; chưa xác nhận |
| E.03 | Linking verbs: be, seem, appear, become, get, grow, turn, remain, stay, look, sound, feel, taste, smell, prove, keep + tính từ (không + trạng từ) | A1-08 | — | 0 | 8 | A1; chưa xác nhận |
| E.04 | Mẫu động từ theo tân ngữ: SV, SVO, SVOO (give/send/show…, chuyển sang to/for), SVOC (call/make/find/consider…), SVA | B1-06 | — | 0 | 8 | B1; chưa xác nhận |
| E.05 | Năm dạng động từ (base, -s, -ing, past, past participle); quy tắc -ed và -ing chính tả | L0-08, L0-13 | — | 0 | 8 | L0; chưa xác nhận |
| E.06 | Động từ bất quy tắc: nhóm theo mô hình (AAA, ABA, ABB, ABC) + danh sách đầy đủ ≥ 200 động từ; cặp dễ nhầm (lie/lay, rise/raise, sit/set, fall/fell, find/found, hang) | A2-13 | — | 0 | 8 | A2; chưa xác nhận |
| E.07 | Be/have/do ba vai trò; do nhấn mạnh; have = sở hữu/ăn uống/hoạt động/trải nghiệm (have breakfast, have a shower); have got | L0-01, A1-08 | L0-01.01; L0-01.02; L0-01.03; L0-01.06 | 49 | 8 | L0, A1; có phần nội dung, chưa xác nhận toàn mã |
| E.08 | Get: tất cả nghĩa/cấu trúc (get + adj/pp/noun/to V/V-ing/object + pp/get + trạng từ, get = become/obtain/arrive/understand, get used to, get going, get-passive) | B1-07 | — | 0 | 8 | B1; chưa xác nhận |
| E.09 | Make/do/take/give/have/go collocation ngữ pháp, (make a decision vs do homework) | A2-14 | — | 0 | 8 | A2; chưa xác nhận |
| E.10 | Phrasal verbs: 4 loại (nội/ngoại, tách/không tách, bắt buộc tách với đại từ, phrasal-prepositional), ≥ 300 cụm nhóm theo động từ gốc & chủ đề, nghĩa đen/bóng, văn phong | A2-15, B2-04, C1-02 | — | 0 | 8 | A2, B2, C1; chưa xác nhận |
| E.11 | Prepositional verbs (look at, depend on, listen to, wait for…) vs phrasal verbs, bị động của chúng | B1-08, C1-02 | — | 0 | 8 | B1, C1; chưa xác nhận |
| E.12 | Động từ + giới từ + (O) theo danh sách (rely on, insist on, apologize for, blame for, accuse of, prevent from, congratulate on…) | B1-08, B1-30, C1-02 | — | 0 | 8 | B1, C1; chưa xác nhận |

## Nhóm F

| Mã phụ lục | Điểm kiến thức | Bài (dự kiến) | Rule ID đã xác nhận | Số câu bài tập đã xác nhận | Ngưỡng mã | Level dự kiến / trạng thái |
|---|---|---|---|---:|---:|---|
| F.01 | Hiện tại đơn: thói quen, sự thật, lịch trình, chỉ dẫn, bình luận thể thao/kể chuyện, tiêu đề báo, mệnh đề thời gian/điều kiện, động từ tường thuật hiện tại (He says…), thành ngữ | L0-20, A2-03, C1-03 | — | 0 | 12 | L0, A2, C1; chưa xác nhận |
| F.02 | Hiện tại tiếp diễn: đang diễn ra, tạm thời, xu hướng thay đổi, kế hoạch sắp xếp, phàn nàn với always, tiếp diễn với động từ trạng thái (nghĩa đổi), ngôn ngữ báo chí | A1-09, C1-03 | — | 0 | 12 | A1, C1; chưa xác nhận |
| F.03 | Hiện tại hoàn thành: trải nghiệm (ever/never/before), kết quả hiện tại, kéo dài đến nay (for/since), vừa xảy ra (just/recently), already/yet/still, "this is the first time", be gone/been, so sánh với quá khứ đơn, Anh-Anh vs Anh-Mỹ | A2-16 | — | 0 | 12 | A2; chưa xác nhận |
| F.04 | Hiện tại hoàn thành tiếp diễn: kéo dài, kết quả nhìn thấy, tức thời gần đây; so với hoàn thành đơn; động từ không dùng tiếp diễn | B1-09 | — | 0 | 12 | B1; chưa xác nhận |
| F.05 | Quá khứ đơn: sự kiện hoàn tất, chuỗi hành động, thói quen quá khứ, trạng thái quá khứ, cấu trúc giả định (It's time I went), mệnh đề điều kiện loại 2; dấu hiệu nhận biết | A1-10, B1-18 | — | 0 | 12 | A1, B1; chưa xác nhận |
| F.06 | Quá khứ tiếp diễn: đang diễn ra tại thời điểm, bối cảnh và sự kiện (when/while), hành động song song, phàn nàn quá khứ, lịch sự (I was wondering…), kể chuyện | A2-17 | — | 0 | 12 | A2; chưa xác nhận |
| F.07 | Quá khứ hoàn thành: trước một mốc quá khứ, kể chuyện đảo thứ tự, câu gián tiếp, điều kiện loại 3, wish, "hardly/no sooner", before/after/by the time/until | B1-10 | — | 0 | 12 | B1; chưa xác nhận |
| F.08 | Quá khứ hoàn thành tiếp diễn: kéo dài đến mốc quá khứ, nguyên nhân | B1-11 | — | 0 | 12 | B1; chưa xác nhận |
| F.09 | Tương lai: will (dự đoán, quyết định tức thời, hứa, đề nghị, đe doạ), be going to (dự định, dự đoán dựa trên bằng chứng), hiện tại tiếp diễn (sắp xếp), hiện tại đơn (lịch trình), shall (đề nghị), be about to, be due to, be to, be on the point of; phân biệt (bảng) | A2-18, A2-19, B2-07 | — | 0 | 12 | A2, B2; chưa xác nhận |
| F.10 | Tương lai tiếp diễn: tại thời điểm tương lai, sự kiện sắp xếp tự nhiên, hỏi lịch sự về kế hoạch | B1-12 | — | 0 | 12 | B1; chưa xác nhận |
| F.11 | Tương lai hoàn thành & tương lai hoàn thành tiếp diễn | B2-05, B2-06 | — | 0 | 12 | B2; chưa xác nhận |
| F.12 | Tương lai trong quá khứ (was going to, would, was about to, was to), thì trong mệnh đề phụ thuộc, sự hoà hợp thì (sequence of tenses) | B2-07, B2-08 | — | 0 | 12 | B2; chưa xác nhận |
| F.13 | Used to / would (thói quen quá khứ) / be used to / get used to | A2-20 | — | 0 | 12 | A2; chưa xác nhận |
| F.14 | Thì kể chuyện: đan xen quá khứ đơn/tiếp diễn/hoàn thành; hiện tại lịch sử; phối thì trong đoạn văn | B2-09, C1-03 | — | 0 | 12 | B2, C1; chưa xác nhận |
| F.15 | Thì và trạng từ thời gian (since/for/ago/already/yet/still/just/ever/never/recently/lately/so far/by now/up to now/this week…), vị trí của chúng | A2-03, B1-29 | — | 0 | 12 | A2, B1; chưa xác nhận |
| F.16 | Bảng đối chiếu tổng hợp 12 thì (hình thức + nghĩa + dấu hiệu) | B2-09 | — | 0 | 12 | B2; chưa xác nhận |

## Nhóm G

| Mã phụ lục | Điểm kiến thức | Bài (dự kiến) | Rule ID đã xác nhận | Số câu bài tập đã xác nhận | Ngưỡng mã | Level dự kiến / trạng thái |
|---|---|---|---|---:|---:|---|
| G.01 | Đặc điểm chung (không -s, không to, không trợ động từ, đảo lên trước chủ ngữ), viết tắt (can't, shan't, mustn't…) | A1-11 | — | 0 | 12 | A1; chưa xác nhận |
| G.02 | Can/could: khả năng, xin phép, đề nghị, khả năng xảy ra, could = quá khứ của can, could vs was able to, can't/couldn't = chắc chắn không | A1-11, B1-13 | — | 0 | 12 | A1, B1; chưa xác nhận |
| G.03 | May/might: khả năng, xin phép, may/might as well, may well, might + perfect, nghĩa "mặc dù" (may…but) | B1-13, C1-04 | — | 0 | 12 | B1, C1; chưa xác nhận |
| G.04 | Must/have to/have got to/need to: bắt buộc, suy đoán chắc chắn, mustn't vs don't have to vs needn't, quá khứ (had to), nội/ngoại bắt buộc | A2-21 | — | 0 | 12 | A2; chưa xác nhận |
| G.05 | Should/ought to/had better: lời khuyên, kỳ vọng, nghĩa vụ nhẹ, should have, ought to have, had better (không phải quá khứ), should trong mệnh đề that | A2-22, B2-11, B2-17 | — | 0 | 12 | A2, B2; chưa xác nhận |
| G.06 | Will/would: dự đoán, ý chí, thói quen, lịch sự, would rather, would you mind, would like/love/prefer, tương lai trong quá khứ, giả định | A2-23, B1-17, B2-13, C1-04 | — | 0 | 12 | A2, B1, B2, C1; chưa xác nhận |
| G.07 | Shall: đề nghị/gợi ý, tương lai trang trọng, văn bản pháp lý | B2-10, C1-04 | — | 0 | 12 | B2, C1; chưa xác nhận |
| G.08 | Need/dare: need như khiếm khuyết (needn't) vs thường; dare; used to như bán khiếm khuyết | A2-20, B2-10 | — | 0 | 12 | A2, B2; chưa xác nhận |
| G.09 | Modal perfect: must have, can't/couldn't have, may/might/could have, should/shouldn't have, needn't have, would have; suy đoán quá khứ vs phê bình/hối tiếc | B1-14, B2-11 | — | 0 | 12 | B1, B2; chưa xác nhận |
| G.10 | Modal tiếp diễn & perfect tiếp diễn (must be doing, might have been doing) | B2-12 | — | 0 | 12 | B2; chưa xác nhận |
| G.11 | Bán khiếm khuyết: be able to, be allowed to, be supposed to, be bound to, be likely to, be sure/certain to, be going to, be to, be about to, have the ability to | B2-07, B2-10 | — | 0 | 12 | B2; chưa xác nhận |
| G.12 | Thang suy đoán/độ chắc chắn (certainty scale) và bảng tổng hợp mọi modal × mọi nghĩa | B2-12 | — | 0 | 12 | B2; chưa xác nhận |
| G.13 | Modal trong lịch sự: yêu cầu, xin phép, đề nghị, mời (Could you / Would you mind / May I / Shall I / Would you like), cách đáp lời | A2-23, B2-13 | — | 0 | 12 | A2, B2; chưa xác nhận |
| G.14 | Modal trong câu hỏi đuôi, phủ định, câu gián tiếp (đổi modal), mệnh đề điều kiện | B1-42, B2-13 | — | 0 | 12 | B1, B2; chưa xác nhận |

## Nhóm H

| Mã phụ lục | Điểm kiến thức | Bài (dự kiến) | Rule ID đã xác nhận | Số câu bài tập đã xác nhận | Ngưỡng mã | Level dự kiến / trạng thái |
|---|---|---|---|---:|---:|---|
| H.01 | Loại 0, 1, 2, 3, hỗn hợp (mọi tổ hợp), dùng modal trong mệnh đề chính | A2-24, B1-15, B1-16 | — | 0 | 12 | A2, B1; chưa xác nhận |
| H.02 | Từ thay if: unless, as long as, provided/providing (that), on condition that, supposing/suppose, in case, otherwise, or else, but for, if not, even if, only if, whether or not, if it weren't for | B2-14 | — | 0 | 12 | B2; chưa xác nhận |
| H.03 | Điều kiện không thực/đảo ngữ: Were I…, Had I…, Should you…, Were it not for…, If … should, If … were to | B2-15, C1-04 | — | 0 | 12 | B2, C1; chưa xác nhận |
| H.04 | If + will/would (lịch sự: If you will…), If + present perfect, if + was/were | B2-15 | — | 0 | 12 | B2; chưa xác nhận |
| H.05 | Điều kiện ngầm (without, with, in that case, then), rút gọn mệnh đề điều kiện (if possible, if necessary, if so/not) | B2-16 | — | 0 | 12 | B2; chưa xác nhận |
| H.06 | Wish/If only (hiện tại, quá khứ, tương lai/phàn nàn: wish + would), would rather (+ clause), it's (high) time + past, as if/as though (thực/không thực), suppose/imagine + past, I'd sooner | B1-17, B1-18 | — | 0 | 12 | B1; chưa xác nhận |
| H.07 | Subjunctive: mandative (suggest/insist/demand/recommend + that + base verb, important that), were-subjunctive, formulaic (God save, so be it, come what may, long live), Anh-Anh (should) vs Anh-Mỹ | B2-17, C1-04 | — | 0 | 12 | B2, C1; chưa xác nhận |
| H.08 | Câu mệnh lệnh: khẳng định/phủ định, lịch sự (please), Let's/Let us/Let me, Don't let…, do + imperative nhấn mạnh, mệnh lệnh ngôi 3, nghĩa điều kiện (Do that and…), You + imperative | A1-12, B2-16 | — | 0 | 12 | A1, B2; chưa xác nhận |

## Nhóm I

| Mã phụ lục | Điểm kiến thức | Bài (dự kiến) | Rule ID đã xác nhận | Số câu bài tập đã xác nhận | Ngưỡng mã | Level dự kiến / trạng thái |
|---|---|---|---|---:|---:|---|
| I.01 | Hình thành mọi thì (đơn, tiếp diễn, hoàn thành; tương lai; modal), bảng 12 thì chủ/bị động | B1-19, B2-20, C1-05 | — | 0 | 12 | B1, B2, C1; chưa xác nhận |
| I.02 | Khi nào dùng bị động (không biết/không quan trọng tác nhân, nhấn mạnh, văn khoa học, tránh đổ lỗi, mạch thông tin), khi nào tránh | B1-19, C1-05 | — | 0 | 12 | B1, C1; chưa xác nhận |
| I.03 | By + tác nhân; with + công cụ; bỏ tác nhân | B1-20 | — | 0 | 12 | B1; chưa xác nhận |
| I.04 | Bị động với hai tân ngữ (give, send, show…), với tân ngữ giới từ (be looked after), phrasal verbs | B1-20 | — | 0 | 12 | B1; chưa xác nhận |
| I.05 | Bị động với động từ tường thuật (It is said that…, He is said to…, is believed to have…), nhóm động từ dùng cấu trúc này | B2-18 | — | 0 | 12 | B2; chưa xác nhận |
| I.06 | Bị động của nguyên mẫu/danh động từ (to be done, being done, to have been done, having been done); want/need + V-ing (needs cleaning) | B2-19 | — | 0 | 12 | B2; chưa xác nhận |
| I.07 | Get-passive (get married/lost/hurt/dressed), sắc thái; be + tính từ vs bị động (The door is closed: tình trạng/hành động) | B2-20 | — | 0 | 12 | B2; chưa xác nhận |
| I.08 | Have/get something done (nguyên nhân bị động, trải nghiệm bất lợi), have someone do, get someone to do | B1-21 | — | 0 | 12 | B1; chưa xác nhận |
| I.09 | Động từ không có bị động (have = own, fit, suit, resemble, lack…, nội động từ), bị động mệnh lệnh (Let it be done), bị động với câu hỏi/phủ định | B2-20, C1-05 | — | 0 | 12 | B2, C1; chưa xác nhận |
| I.10 | Causatives: make, let, have, get, help, force, allow, enable, cause, order (mẫu động từ + tân ngữ + V/to V/V-ed) | B1-24, B2-21 | — | 0 | 12 | B1, B2; chưa xác nhận |

## Nhóm J

| Mã phụ lục | Điểm kiến thức | Bài (dự kiến) | Rule ID đã xác nhận | Số câu bài tập đã xác nhận | Ngưỡng mã | Level dự kiến / trạng thái |
|---|---|---|---|---:|---:|---|
| J.01 | Động từ + V-ing (enjoy, avoid, finish, mind, suggest, consider, practise, risk, keep, give up, admit, deny, can't help, can't stand, it's no use…) danh sách đầy đủ | A1-13 | — | 0 | 12 | A1; chưa xác nhận |
| J.02 | Động từ + to V (want, hope, decide, plan, promise, refuse, manage, afford, learn, offer, agree, fail, seem, appear, tend, pretend…) danh sách đầy đủ | A1-14 | — | 0 | 12 | A1; chưa xác nhận |
| J.03 | Động từ + V-ing hoặc to V cùng nghĩa (like, love, hate, prefer, begin, start, continue, intend, can't bear) và sắc thái (would like/would love/would prefer luôn to V) | A2-25 | — | 0 | 12 | A2; chưa xác nhận |
| J.04 | Động từ + V-ing hoặc to V khác nghĩa (remember, forget, stop, try, regret, mean, go on, need, propose, used, be afraid, be sorry) | B1-22 | — | 0 | 12 | B1; chưa xác nhận |
| J.05 | Động từ + tân ngữ + to V (want, ask, tell, advise, allow, persuade, order, invite, expect, encourage, remind, warn, force, enable, would like, need…) | B1-23 | — | 0 | 12 | B1; chưa xác nhận |
| J.06 | Động từ + tân ngữ + V nguyên (make, let, have, help (+ to), see/hear/watch/notice/feel + O + V/V-ing và khác biệt nghĩa) | B1-24 | — | 0 | 12 | B1; chưa xác nhận |
| J.07 | Giới từ + V-ing (interested in, good at, before/after/by/without/instead of…), động từ + giới từ + V-ing, to là giới từ (look forward to, be used to, object to, committed to) | A2-26 | — | 0 | 12 | A2; chưa xác nhận |
| J.08 | Tính từ + to V (easy to, nice of you to, happy to, ready/likely/sure to), tính từ + giới từ + V-ing; too/enough + to V; so…as to | B1-25 | — | 0 | 12 | B1; chưa xác nhận |
| J.09 | Danh từ + to V (a chance to, the ability to, a decision to, time to, a plan to) vs danh từ + giới từ + V-ing (the idea of, a way of) | B1-25 | — | 0 | 12 | B1; chưa xác nhận |
| J.10 | Nguyên mẫu mục đích (to V, in order to, so as to, so that, for + V-ing), vs for + O + to V; nguyên mẫu chỉ kết quả (only to find out) | B1-26 | — | 0 | 12 | B1; chưa xác nhận |
| J.11 | Nguyên mẫu hoàn thành/tiếp diễn/bị động (to have done, to be doing, to be done) và dùng với seem/appear/be said/believed | B2-19, B2-22 | — | 0 | 12 | B2; chưa xác nhận |
| J.12 | Nguyên mẫu bỏ to (bare), tách nguyên mẫu (split infinitive), to đứng một mình (I don't want to), nguyên mẫu trong câu hỏi (what to do), Wh- + to V | B2-22, C1-07 | — | 0 | 12 | B2, C1; chưa xác nhận |
| J.13 | Danh động từ làm chủ ngữ/tân ngữ/bổ ngữ; sở hữu trước V-ing (my going vs me going); danh động từ hoàn thành/bị động; phủ định (not going) | B2-23 | — | 0 | 12 | B2; chưa xác nhận |
| J.14 | Mệnh đề phân từ: hiện tại (V-ing), quá khứ (V-ed), hoàn thành (having done), chủ ngữ treo (dangling participles), phân từ làm tính từ (-ing/-ed), phân từ sau liên từ (while/before/after/when + V-ing), absolute constructions (Weather permitting…) | B2-24, C1-06 | — | 0 | 12 | B2, C1; chưa xác nhận |
| J.15 | Bảng tra: danh sách động từ theo mẫu (kho kiến thức, đầy đủ) | B2-25 | — | 0 | 12 | B2; chưa xác nhận |

## Nhóm K

| Mã phụ lục | Điểm kiến thức | Bài (dự kiến) | Rule ID đã xác nhận | Số câu bài tập đã xác nhận | Ngưỡng mã | Level dự kiến / trạng thái |
|---|---|---|---|---:|---:|---|
| K.01 | Vị trí tính từ: định ngữ/vị ngữ, chỉ vị ngữ (afraid, asleep, alive, alone, aware…), chỉ định ngữ (main, only, total, mere), tính từ đứng sau danh từ (president elect, things unknown, something nice, the people involved), nghĩa đổi theo vị trí (responsible, present, concerned, involved, proper) | A1-15, B1-27 | — | 0 | 8 | A1, B1; chưa xác nhận |
| K.02 | Thứ tự tính từ (opinion–size–age–shape–colour–origin–material–purpose + noun), dấu phẩy/and giữa tính từ | A1-15 | — | 0 | 8 | A1; chưa xác nhận |
| K.03 | Tính từ -ed vs -ing (bored/boring…), tính từ ghép (a well-known actor, a 10-year-old), tính từ từ danh từ/động từ | A2-27 | — | 0 | 8 | A2; chưa xác nhận |
| K.04 | Tính từ gradable/ungradable (very good, absolutely perfect, quite, fairly, rather, pretty, really, extremely), mức độ từ nhấn mạnh | B1-27 | — | 0 | 8 | B1; chưa xác nhận |
| K.05 | Tính từ làm danh từ (the poor, the English, the unemployed), tính từ quốc tịch (số nhiều/số ít) | B1-02 | — | 0 | 8 | B1; chưa xác nhận |
| K.06 | Tính từ + giới từ (afraid of, good at, keen on, fond of, similar to, different from/than/to, angry with/at…) | B1-28, B1-31 | — | 0 | 8 | B1; chưa xác nhận |
| K.07 | Tính từ + that-clause/to-V/wh-clause (sure that, glad to, certain whether) | B1-25 | — | 0 | 8 | B1; chưa xác nhận |
| K.08 | So sánh: hơn/nhất (-er/-est vs more/most, quy tắc chính tả, bất quy tắc good/better/best, far/farther/further, old/older/elder), as…as, not as/so…as, twice as, the same as, similar, different, less/least, much/far/a lot/slightly + so sánh, so sánh kép (the more…the more; more and more; the sooner the better), so sánh trong mệnh đề (than I do/than me), so sánh nhất + in/of/that + present perfect (the best film I've ever seen), so sánh hai vs nhiều | A1-16, A2-28, B2-26 | — | 0 | 12 | A1, A2, B2; chưa xác nhận |
| K.09 | Trạng từ: loại (cách thức, nơi chốn, thời gian, tần suất, mức độ, quan điểm/bình luận, liên kết), hình thành (-ly, quy tắc chính tả, bất quy tắc: fast/hard/late/early/well), trạng từ trùng tính từ (hard/hardly, late/lately, near/nearly, high/highly, direct/directly, free/freely…) | A1-17 | — | 0 | 8 | A1; chưa xác nhận |
| K.10 | Vị trí trạng từ: đầu/giữa/cuối; trạng từ tần suất; nhiều trạng từ trong câu (cách–nơi–thời gian), trạng từ đứng giữa trợ động từ; vị trí "only/even/just/also/too/either/as well/almost" | A2-29 | — | 0 | 8 | A2; chưa xác nhận |
| K.11 | Trạng từ mức độ: very/too/so/quite/fairly/pretty/rather/extremely/absolutely/enough/hardly/scarcely/barely/almost/nearly/completely/totally… | A2-10 | — | 0 | 8 | A2; chưa xác nhận |
| K.12 | Trạng từ thời gian đặc biệt: still/yet/already/anymore/any longer/no longer/ever/never/ago/before/since/just/recently/lately/soon/at last/finally/in the end/eventually… | B1-29 | — | 0 | 8 | B1; chưa xác nhận |
| K.13 | Trạng từ bình luận (frankly, fortunately, obviously, apparently, hopefully…), trạng từ liên kết (however, therefore, moreover, nevertheless…) | B2-27 | — | 0 | 8 | B2; chưa xác nhận |
| K.14 | Trạng từ so sánh (faster, more carefully, the best), enough/too với trạng từ | B2-26 | — | 0 | 8 | B2; chưa xác nhận |
| K.15 | Trạng từ vs tính từ (good/well, bad/badly, real/really, sure/surely, linking verbs + adj), tính từ sau get/look/feel/taste… | A1-08 | — | 0 | 8 | A1; chưa xác nhận |

## Nhóm L

| Mã phụ lục | Điểm kiến thức | Bài (dự kiến) | Rule ID đã xác nhận | Số câu bài tập đã xác nhận | Ngưỡng mã | Level dự kiến / trạng thái |
|---|---|---|---|---:|---:|---|
| L.01 | Giới từ thời gian: at/on/in/by/until/till/from/to/since/for/during/while/within/after/before/around/about/throughout; cụm (at night, in the morning, on Monday, at the weekend/on the weekend, in time/on time, at the moment/in a moment…) | A1-18 | — | 0 | 8 | A1; chưa xác nhận |
| L.02 | Giới từ nơi chốn: at/in/on/under/over/above/below/beneath/beside/between/among/behind/in front of/opposite/next to/near/by/around/inside/outside/within; at/in/on (địa điểm, phương tiện) | A1-19 | — | 0 | 8 | A1; chưa xác nhận |
| L.03 | Giới từ chuyển động: to/into/onto/out of/off/from/towards/through/across/along/past/up/down/over/under/round/via | A1-20 | — | 0 | 8 | A1; chưa xác nhận |
| L.04 | Giới từ khác: by (phương tiện, tác nhân, thời hạn), with/without, of, for, about, like/as, despite/in spite of, because of/due to/owing to/thanks to, instead of, apart from, except (for), besides, according to, regarding, concerning | A2-30 | — | 0 | 8 | A2; chưa xác nhận |
| L.05 | Giới từ đi sau động từ/tính từ/danh từ (dependent prepositions): danh sách đầy đủ ≥ 300 mục nhóm theo từ, kèm ví dụ | B1-30, B1-31, C1-02 | — | 0 | 12 | B1, C1; chưa xác nhận |
| L.06 | Giới từ ở cuối câu/mệnh đề (Who are you talking to?), giới từ + whom/which; giới từ trong câu hỏi, bị động, mệnh đề quan hệ, V-ing | B1-32 | — | 0 | 8 | B1; chưa xác nhận |
| L.07 | Cụm giới từ cố định (in charge of, on behalf of, in terms of, with regard to, by means of…), ≥ 100 cụm | B1-32 | — | 0 | 8 | B1; chưa xác nhận |
| L.08 | Liên từ kết hợp (FANBOYS: for, and, nor, but, or, yet, so), dấu phẩy, vị trí | A1-21 | — | 0 | 8 | A1; chưa xác nhận |
| L.09 | Liên từ phụ thuộc theo nhóm: thời gian, nguyên nhân, mục đích, kết quả, nhượng bộ, điều kiện, so sánh, cách thức | A2-31 | — | 0 | 8 | A2; chưa xác nhận |
| L.10 | Liên từ tương liên: both…and, either…or, neither…nor, not only…but also, not…but, whether…or, as…as, no sooner…than, hardly…when, rather…than | B1-33 | — | 0 | 8 | B1; chưa xác nhận |
| L.11 | Trạng từ liên kết (conjunctive adverbs) và dấu câu đi kèm (; however,) | B2-27 | — | 0 | 8 | B2; chưa xác nhận |
| L.12 | Phân biệt cặp dễ nhầm giới từ/liên từ: although/though/even though/despite/in spite of/while/whereas; because/since/as/for; so that/in order that/so…that/such…that; in case/if; as/like; during/while; by/until; except/besides; unless/if…not | B1-33, B1-39 | — | 0 | 8 | B1; chưa xác nhận |
| L.13 | Từ nối trong văn viết: bổ sung, tương phản, nguyên nhân, kết quả, ví dụ, trình tự, kết luận, nhấn mạnh (bảng phân theo văn phong) | B2-28 | — | 0 | 8 | B2; chưa xác nhận |

## Nhóm M

| Mã phụ lục | Điểm kiến thức | Bài (dự kiến) | Rule ID đã xác nhận | Số câu bài tập đã xác nhận | Ngưỡng mã | Level dự kiến / trạng thái |
|---|---|---|---|---:|---:|---|
| M.01 | Thành phần câu: S, V, O (trực tiếp/gián tiếp), C (chủ ngữ/tân ngữ), A (trạng ngữ), vị ngữ; cụm danh/động/tính/trạng/giới từ | L0-14 | — | 0 | 8 | L0; chưa xác nhận |
| M.02 | Cụm từ vs mệnh đề; mệnh đề độc lập/phụ thuộc | A1-24 | — | 0 | 8 | A1; chưa xác nhận |
| M.03 | Câu đơn, ghép, phức, ghép–phức; cách mở rộng và nối câu | A1-24 | — | 0 | 8 | A1; chưa xác nhận |
| M.04 | Câu kể, nghi vấn, mệnh lệnh, cảm thán (What a…! How…!), câu cầu khiến | L0-15 | — | 0 | 8 | L0; chưa xác nhận |
| M.05 | Trật tự từ trong câu: chuẩn SVO, vị trí trạng ngữ, trật tự trong câu hỏi, đảo ngữ | L0-14, B2-38 | — | 0 | 8 | L0, B2; chưa xác nhận |
| M.06 | Câu hỏi Yes/No (mọi thì, modal, be), trả lời ngắn | L0-01, A1-22, B2-31 | L0-01.04 | 12 | 8 | L0, A1, B2; có phần nội dung, chưa xác nhận toàn mã |
| M.07 | Câu hỏi Wh-: chủ ngữ vs tân ngữ, giới từ, which/what, how + adj/adv (how long/far/often/much/many/old/tall), what…for, what…like, whose, why/why not/why don't… | L0-01, A1-23 | L0-01.05 | 12 | 8 | L0, A1; có phần nội dung, chưa xác nhận toàn mã |
| M.08 | Câu hỏi đuôi: mọi trường hợp (I am → aren't I, Let's → shall we, imperative → will you, nobody → they, there, this/that → it, used to, modal, phủ định → khẳng định), ngữ điệu và nghĩa | A2-32 | — | 0 | 12 | A2; chưa xác nhận |
| M.09 | Câu hỏi gián tiếp & câu hỏi nhúng (Do you know where…), câu hỏi lịch sự | B1-34 | — | 0 | 8 | B1; chưa xác nhận |
| M.10 | Câu hỏi phủ định (Don't you…?, Isn't it…?), câu hỏi tu từ, câu hỏi lặp/echo, câu hỏi lựa chọn (A or B) | B1-34 | — | 0 | 8 | B1; chưa xác nhận |
| M.11 | Phủ định: not, no, never, nobody, nothing, nowhere, neither, none, hardly/scarcely/barely/seldom/rarely (phủ định hàm), phạm vi phủ định, phủ định kép (lỗi), phủ định với suy nghĩ (I don't think…), no vs not any/a, not…until, phủ định bắt buộc "any" | A2-33, B2-30 | — | 0 | 8 | A2, B2; chưa xác nhận |
| M.12 | So/neither/nor/too/either, trả lời đồng ý/phản đối (So do I, Neither can I, I do too/I don't either, I think so/I hope not) | A2-33 | — | 0 | 8 | A2; chưa xác nhận |
| M.13 | There is/are mọi dạng: thì, modal, there + to be + V-ing/V-ed, there seems/appears, there used to be, there's no point in, There is no one…, hòa hợp (There's two…), it vs there | L0-21, B2-31 | — | 0 | 12 | L0, B2; chưa xác nhận |
| M.14 | It: chủ ngữ giả (It is important to…, It takes…, It is said…), it chỉ thời tiết/thời gian/khoảng cách, it + be + adj + of/for + O + to V, it's no use/good/worth + V-ing, it + seems/appears/happens that | B1-35, C1-09 | — | 0 | 8 | B1, C1; chưa xác nhận |
| M.15 | Câu cảm thán, câu cầu khiến, câu thề nguyện/chúc, lời chào | L0-15, B2-32 | — | 0 | 8 | L0, B2; chưa xác nhận |
| M.16 | Câu điều kiện (nối sang H), câu ước (H), câu bị động (I) | A2-24, B1-15, B1-19 | — | 0 | 8 | A2, B1; chưa xác nhận |
| M.17 | Lược bỏ & thay thế (ellipsis/substitution): so/not (I think so), do so, one(s), the same, to (đứng một mình), lược chủ ngữ/trợ động từ trong văn nói/chỉ dẫn, lược trong câu ghép (She cooked and (she) sang), lược trong so sánh (than I (do)) | C1-07 | — | 0 | 8 | C1; chưa xác nhận |

## Nhóm N

| Mã phụ lục | Điểm kiến thức | Bài (dự kiến) | Rule ID đã xác nhận | Số câu bài tập đã xác nhận | Ngưỡng mã | Level dự kiến / trạng thái |
|---|---|---|---|---:|---:|---|
| N.01 | Mệnh đề quan hệ xác định: who/whom/which/that/whose/where/when/why; bỏ đại từ quan hệ; giới từ + whom/which; that vs which; không dùng that sau giới từ/dấu phẩy | A2-34 | — | 0 | 12 | A2; chưa xác nhận |
| N.02 | Mệnh đề quan hệ không xác định: dấu phẩy, which = cả mệnh đề, quantifier + of whom/which, nhận diện xác định/không xác định, không dùng that | B1-36 | — | 0 | 12 | B1; chưa xác nhận |
| N.03 | Rút gọn mệnh đề quan hệ (V-ing, V-ed, to V, cụm tính từ/giới từ, đồng vị) | B2-33 | — | 0 | 12 | B2; chưa xác nhận |
| N.04 | Mệnh đề quan hệ nâng cao: what (the thing that), whatever/whoever, "the way (that)", "the reason why", "the day when", mệnh đề quan hệ tách xa, đại từ quan hệ nối tiếp | B2-33 | — | 0 | 12 | B2; chưa xác nhận |
| N.05 | Mệnh đề danh ngữ: that-clause (+ bỏ that), wh-clause, if/whether-clause, V-ing/to V clause; chủ ngữ/tân ngữ/bổ ngữ/đồng vị; tính từ/danh từ + that; hòa hợp | B1-37 | — | 0 | 12 | B1; chưa xác nhận |
| N.06 | Mệnh đề trạng ngữ: thời gian (when, while, as, before, after, since, until, by the time, as soon as, once, whenever), nơi chốn (where, wherever), nguyên nhân (because, since, as, now that, seeing that), mục đích (so that, in order that, lest), kết quả (so…that, such…that, so that), nhượng bộ (although, though, even though, while, whereas, no matter, however, whatever), tương phản, cách thức (as, as if, the way, like), so sánh (as…as, than), tỉ lệ (the more…the more), điều kiện (nối H) | B1-38, B1-39, B1-40 | — | 0 | 12 | B1; chưa xác nhận |
| N.07 | Rút gọn mệnh đề trạng ngữ (V-ing, V-ed, having V-ed, being, with + O + V-ing/V-ed absolute), quy tắc cùng chủ ngữ | B2-24, C1-06 | — | 0 | 12 | B2, C1; chưa xác nhận |
| N.08 | Câu gián tiếp: lùi thì, đổi đại từ/trạng từ thời gian-nơi chốn, câu kể/hỏi/mệnh lệnh/đề nghị/cảm thán, không lùi thì khi nào, động từ tường thuật theo mẫu (say, tell, ask, order, advise, warn, suggest, admit, deny, accuse, apologize, promise, offer, threaten, insist, remind, refuse, agree, claim, explain, complain, announce…) ≥ 60 động từ + mẫu cấu trúc, modal trong câu gián tiếp, câu hỏi gián tiếp, tường thuật nhiều câu, tường thuật bằng V-ing/to V/that | B1-41, B1-42, B2-34 | — | 0 | 12 | B1, B2; chưa xác nhận |
| N.09 | Hòa hợp thì trong câu phức (sequence of tenses), thì trong mệnh đề danh/quan hệ/thời gian | B2-08, C1-05 | — | 0 | 12 | B2, C1; chưa xác nhận |
| N.10 | Câu ghép & liên kết: and/but/or/so/yet/for/nor, dấu phẩy, chấm phẩy, tránh run-on, song song cấu trúc (parallelism) | A1-21, B2-36 | — | 0 | 12 | A1, B2; chưa xác nhận |
| N.11 | Hòa hợp chủ vị đầy đủ: and, or/nor, either…or, with/as well as/together with, each/every, collective nouns, uncountable, quantifiers (a number of vs the number of, a lot of, none, all, most, some…), tính từ làm danh từ, tựa đề/tên/số tiền/khoảng cách/thời gian (Ten dollars is…), there/here + V, mệnh đề quan hệ (one of the…who), Wh-/what-clause làm chủ ngữ, danh từ -s số ít (news, mathematics), danh từ số nhiều (police, people), đại từ bất định, đảo ngữ | B2-35, B2-36 | — | 0 | 12 | B2; chưa xác nhận |

## Nhóm O

| Mã phụ lục | Điểm kiến thức | Bài (dự kiến) | Rule ID đã xác nhận | Số câu bài tập đã xác nhận | Ngưỡng mã | Level dự kiến / trạng thái |
|---|---|---|---|---:|---:|---|
| O.01 | Đảo ngữ sau trạng từ phủ định/hạn chế (never, rarely, seldom, hardly…when, scarcely…when, no sooner…than, not only…but also, not until, only when/only after/only then, little, at no time, under no circumstances, on no account, nowhere) | B2-37, C1-08 | — | 0 | 8 | B2, C1; chưa xác nhận |
| O.02 | Đảo ngữ khác: So + adj/such + clause, neither/nor, here/there + V, đảo nơi chốn/hướng (Down came the rain), đảo trong điều kiện (H.03), đảo sau as/than (văn trang trọng), đảo trong câu cảm thán, đảo với so/neither, đảo trong trích dẫn (said John) | B2-38, C1-08 | — | 0 | 8 | B2, C1; chưa xác nhận |
| O.03 | Câu chẻ (cleft): It + be + X + that/who…, wh-cleft (What I need is…), reverse wh-cleft, All I want is…, The thing that/The reason why…, câu chẻ với thì quá khứ/phủ định/tính từ | B2-39, C1-09 | — | 0 | 8 | B2, C1; chưa xác nhận |
| O.04 | Đưa ra trước (fronting/topicalization), đảo tân ngữ, "As for", "Speaking of", "Regarding", cấu trúc "As + adj + as", "Much as" | C1-08 | — | 0 | 8 | C1; chưa xác nhận |
| O.05 | Nhấn mạnh bằng do/does/did, bằng trạng từ (really, certainly, indeed, simply), lặp, đại từ phản thân (I myself), at all/whatsoever/in the least/by any means/ever, "on earth/the hell/in the world" | B2-39 | — | 0 | 8 | B2; chưa xác nhận |
| O.06 | Cấu trúc đồng vị (appositive), mệnh đề chèn, nhóm danh từ phức (noun phrase complex), extraposition (It is…that…), đặt thông tin cũ/mới, trọng tâm cuối câu (end-weight) | C1-09 | — | 0 | 8 | C1; chưa xác nhận |
| O.07 | Danh hoá (nominalisation): từ động từ/tính từ thành danh từ (decide → decision), văn viết học thuật | C1-10 | — | 0 | 8 | C1; chưa xác nhận |

## Nhóm P

| Mã phụ lục | Điểm kiến thức | Bài (dự kiến) | Rule ID đã xác nhận | Số câu bài tập đã xác nhận | Ngưỡng mã | Level dự kiến / trạng thái |
|---|---|---|---|---:|---:|---|
| P.01 | Liên kết văn bản: tham chiếu (this/that/it/such/the former), thay thế, lược, từ nối, lặp từ vựng, đồng nghĩa, từ bao quát | B2-28, C1-11 | — | 0 | 8 | B2, C1; chưa xác nhận |
| P.02 | Hedging & độ chắc chắn (seem, appear, tend, may/might, probably, arguably, it is likely that, to some extent, in general), boosting | B2-29, C1-11 | — | 0 | 8 | B2, C1; chưa xác nhận |
| P.03 | Trang trọng vs thân mật (formal/informal/neutral): chọn từ, cấu trúc, viết tắt, phrasal verb vs động từ trang trọng, bị động trang trọng, you vs one, whom/who | B1-43, C1-11 | — | 0 | 8 | B1, C1; chưa xác nhận |
| P.04 | Ngữ pháp văn nói: viết tắt, lược, tag, discourse markers (well, you know, I mean, actually), cấu trúc lặp/dở dang, get-passive, vague language (and stuff, sort of), phản hồi ngắn | B1-44, C1-12 | — | 0 | 8 | B1, C1; chưa xác nhận |
| P.05 | Anh-Anh vs Anh-Mỹ ngữ pháp: present perfect/past simple, have/have got, collective nouns, gotten/got, shall, mandative subjunctive, giới từ (at the weekend/on the weekend, Monday to Friday/through), mạo từ (in hospital/in the hospital), từ vựng ngữ pháp (will/shall, needn't/don't need to) | B1-45, C1-12 | — | 0 | 8 | B1, C1; chưa xác nhận |
| P.06 | Ngôn ngữ trung hoà giới tính; singular they; Ms/Mr/Mrs; danh xưng | B1-01, C1-12 | — | 0 | 8 | B1, C1; chưa xác nhận |
| P.07 | Phong cách văn bản: email, thư, báo, học thuật, quảng cáo, tiêu đề (headlinese), chỉ dẫn, nhãn, tin nhắn | B2-40, C1-11 | — | 0 | 8 | B2, C1; chưa xác nhận |
| P.08 | Lỗi phổ biến của người Việt (nhóm theo chủ đề: thiếu be, thiếu -s/-ed, mạo từ, giới từ, thứ tự từ, dịch word-by-word, thiếu chủ ngữ, nhầm tính từ/trạng từ, nhầm danh từ đếm được…) | A2-35, C1-13 | — | 0 | 8 | A2, C1; chưa xác nhận |
| P.09 | Lỗi viết thường gặp: dangling/misplaced modifiers, parallelism, sai hòa hợp, sai đại từ tham chiếu, comma splice, câu cụt, dùng thừa từ (redundancy) | B2-41, C1-13 | — | 0 | 8 | B2, C1; chưa xác nhận |

## Nhóm Q

| Mã phụ lục | Điểm kiến thức | Bài (dự kiến) | Rule ID đã xác nhận | Số câu bài tập đã xác nhận | Ngưỡng mã | Level dự kiến / trạng thái |
|---|---|---|---|---:|---:|---|
| Q.01 | Tiền tố (un-, in-/im-/il-/ir-, dis-, mis-, re-, pre-, post-, over-, under-, anti-, co-, de-, en-, ex-, inter-, mid-, non-, out-, sub-, super-, trans-, ultra-, semi-…) với nghĩa và ví dụ | A2-36 | — | 0 | 8 | A2; chưa xác nhận |
| Q.02 | Hậu tố danh từ (-tion/-sion, -ment, -ness, -ity, -ance/-ence, -ship, -hood, -dom, -er/-or, -ist, -ian, -ism, -age, -th, -ure…) | A2-37, B2-02 | — | 0 | 8 | A2, B2; chưa xác nhận |
| Q.03 | Hậu tố tính từ (-able/-ible, -al, -ful, -less, -ous, -ive, -ic, -ish, -y, -ent/-ant, -ary/-ory, -ed/-ing) | A2-37 | — | 0 | 8 | A2; chưa xác nhận |
| Q.04 | Hậu tố động từ (-ize/-ise, -ify, -en, -ate) và trạng từ (-ly, -ward, -wise) | B1-46 | — | 0 | 8 | B1; chưa xác nhận |
| Q.05 | Chuyển loại (conversion): danh từ ↔ động từ (a text/to text), tính từ → động từ; đổi trọng âm | B1-46 | — | 0 | 8 | B1; chưa xác nhận |
| Q.06 | Từ ghép (compound words), blend, viết tắt, rút gọn (clipping), back-formation, acronym/initialism | B2-42 | — | 0 | 8 | B2; chưa xác nhận |
| Q.07 | Họ từ (word families) cho ≥ 300 từ gốc thông dụng (bảng danh từ/động từ/tính từ/trạng từ), quy tắc chuyển tính từ ↔ trạng từ ↔ danh từ | B2-43, C1-10 | — | 0 | 8 | B2, C1; chưa xác nhận |

