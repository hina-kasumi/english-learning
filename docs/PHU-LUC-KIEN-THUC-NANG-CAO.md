# PHỤ LỤC: Danh mục kiến thức chi tiết & chuẩn độ sâu nâng cao

> Phụ lục này **bổ sung và ghi đè** các con số tối thiểu trong `SPEC.md` (mục 4, 5, 6) và `PROMPT-NOI-DUNG-GIAI-DOAN-2.md`. Khi có khác biệt, **phụ lục này thắng**. Mục tiêu: nội dung **đầy đủ như một cuốn ngữ pháp tham khảo hoàn chỉnh**, không chỉ "đủ để qua bài".

---

## PHẦN 1. CHUẨN ĐỘ SÂU MỚI

### 1.1 Sáu chiều bắt buộc cho mỗi điểm kiến thức (rule)

Mỗi rule phải được phân tích đủ các chiều sau, **chiều nào không áp dụng thì ghi rõ "không áp dụng" trong outline**, không được bỏ lặng lẽ:

1. **Hình thức (Form):** công thức đầy đủ mọi biến thể (khẳng định/phủ định/nghi vấn/viết tắt/bị động nếu có), biến đổi chính tả, bất quy tắc.
2. **Ý nghĩa & cách dùng (Meaning/Use):** *mọi* cách dùng, liệt kê từng cách một, mỗi cách có ví dụ riêng. Không gộp.
3. **Ngoại lệ & trường hợp biên:** mọi ngoại lệ đã biết, trường hợp hiếm, cấu trúc cố định (fixed expressions).
4. **Sắc thái & văn phong:** trang trọng/thân mật, nói/viết, Anh-Anh/Anh-Mỹ, mức độ tự nhiên.
5. **Đối chiếu:** so với cấu trúc dễ nhầm (bắt buộc có bảng so sánh), và so với tiếng Việt (vì sao người Việt hay sai).
6. **Lỗi & cách tự kiểm tra:** ≥ 3 lỗi điển hình (nêu nguyên nhân), kèm mẹo nhận biết/kiểm tra nhanh.

### 1.2 Số lượng tối thiểu (thay thế mục 6.4 SPEC)

| Hạng mục | Tối thiểu mới |
|---|---|
| Rule mỗi bài "lõi" (thì, modal, điều kiện, bị động, gián tiếp, quan hệ, verb patterns, mạo từ, so sánh...) | **10–18 rule** |
| Rule mỗi bài thường | **6–10 rule** |
| Ví dụ song ngữ mỗi rule | **≥ 4** (rule lõi ≥ 6), phủ cả khẳng định/phủ định/nghi vấn khi áp dụng |
| Độ dài lý thuyết mỗi bài lõi | **≥ 2.000 từ** tiếng Việt (không tính ví dụ); bài thường **≥ 1.000 từ** |
| Câu bài tập mỗi rule | **≥ 8** (rule lõi/dễ sai **≥ 12**), đủ 3 mức khó |
| Câu bài tập mỗi bài | **≥ 50** (bài lõi **≥ 100**) |
| Số loại câu khác nhau mỗi bài | **≥ 5** loại |
| Lỗi thường gặp mỗi bài | **≥ 5** |
| Bảng so sánh mỗi bài | **≥ 1** (bài lõi ≥ 2) |

### 1.3 Quy tắc chống "viết ngắn"

- Cấm câu kiểu "và còn nhiều trường hợp khác", "tương tự như trên", "v.v." thay cho liệt kê. Nếu danh sách quá dài (ví dụ động từ + giới từ), đưa vào kho kiến thức và link, nhưng phải có **danh sách đầy đủ** ở đó.
- Cấm gộp 2 cách dùng khác nhau vào 1 rule chỉ để giảm số lượng rule.
- Mỗi cách dùng quan trọng phải có **ít nhất 1 ví dụ hội thoại ngắn** (`:::dialogue`) khi là văn nói.
- Mỗi bài lõi có **mục "Nhìn tổng thể"**: sơ đồ/bảng tóm tắt toàn bộ hệ thống của chủ đề (ví dụ bảng tất cả modal và nghĩa).

---

## PHẦN 2. QUY TRÌNH BẮT BUỘC TRƯỚC KHI VIẾT TỪNG BÀI

1. **Lập outline bao phủ** `content/grammar/outlines/<lessonId>.md`: liệt kê *tất cả* điểm kiến thức mà một cuốn ngữ pháp tham khảo hoàn chỉnh sẽ có cho chủ đề đó (đối chiếu với Phần 3 của phụ lục này **và** kiến thức riêng của bạn về các giáo trình ngữ pháp chuẩn như CGEL, Swan *Practical English Usage*, Murphy *English Grammar in Use*, Azar... dùng để **kiểm tra độ phủ**, không sao chép). Gắn mã phụ lục (ví dụ `[D.14]`) cho từng điểm.
2. **Tách bài nếu outline > 18 rule** hoặc bài > ~4.000 từ.
3. Viết lý thuyết bám outline → viết bài tập bám rule → rà soát.
4. Sau mỗi level, cập nhật **`content/grammar/KNOWLEDGE-MATRIX.md`**: bảng `Mã phụ lục | Điểm kiến thức | Bài | Rule ID | Số câu bài tập`. **Mọi mã trong Phần 3 phải có ít nhất 1 rule và ≥ 8 câu bài tập.** Viết script `scripts/check-knowledge-matrix.ts` (code tối thiểu được phép) làm fail `validate` nếu còn mã chưa ánh xạ. Mỗi rule trong frontmatter có thêm trường `appendixCodes: [D.14, D.15]`.
5. Điểm nào trong phụ lục mà bạn cho là chưa chuẩn hoặc còn tranh luận → ghi vào `REVIEW.md`, vẫn phải có nội dung, ghi chú rõ.

> **Quy ước:** mã `X.nn` = mục `nn` của nhóm `X`. Nhóm có thể được dạy ở nhiều level (spiral): cùng một mã có thể có rule ở A1 (cơ bản) và rule ở B2/C1 (nâng cao); khi đó đánh dấu `appendixCodes` ở cả hai và KNOWLEDGE-MATRIX ghi cả hai.

---

## PHẦN 3. DANH MỤC KIẾN THỨC CHI TIẾT (CHECKLIST ĐỐI CHIẾU)

### A. Âm thanh, chính tả, chữ viết

- A.01 Bảng chữ cái, tên chữ cái, cách đánh vần tên/địa chỉ
- A.02 Nguyên âm đơn, nguyên âm đôi, phụ âm: toàn bộ bảng IPA (Anh-Anh, ghi chú Anh-Mỹ), cặp âm dễ nhầm với người Việt (/ θ ð ʃ ʒ tʃ dʒ ŋ/, âm cuối, cụm phụ âm, /i:/ vs /ɪ/, /æ/ vs /e/…)
- A.03 Trọng âm từ (danh từ/động từ đổi trọng âm: record, present, object…), trọng âm từ ghép, hậu tố ảnh hưởng trọng âm
- A.04 Trọng âm câu, dạng mạnh/yếu (strong/weak forms), nối âm, nuốt âm, đồng hoá thường gặp
- A.05 Ngữ điệu cơ bản: câu kể, Yes/No, Wh-, câu hỏi đuôi, liệt kê
- A.06 Quy tắc phát âm -s/-es, -ed, "the" (/ðə/ vs /ðiː/), "a/an"
- A.07 Mối quan hệ chính tả–phát âm: nguyên âm dài/ngắn, magic e, các tổ hợp thông dụng, âm câm (knife, hour, castle, listen…), đồng âm/gần âm (their/there, to/too/two…)
- A.08 Quy tắc chính tả thêm hậu tố: gấp đôi phụ âm cuối, bỏ e, y→i, ie→y (-ing, -ed, -er/-est, -ly, -ment, -ful…)
- A.09 Chính tả Anh-Anh vs Anh-Mỹ (colour/color, -ise/-ize, -re/-er, travelled/traveled…)
- A.10 Viết hoa (đầy đủ), viết tắt, chữ số/chữ cái trong văn bản
- A.11 Dấu câu đầy đủ: chấm, phẩy (liệt kê, mệnh đề, đồng vị, ngắt khoảng, Oxford comma), chấm phẩy, hai chấm, gạch nối, gạch ngang, ngoặc, nháy đơn (sở hữu, viết tắt), nháy kép, dấu chấm hỏi/than, dấu ba chấm, gạch chéo
- A.12 Câu lỗi dấu câu: comma splice, run-on, fragment

### B. Danh từ

- B.01 Phân loại: chung/riêng, cụ thể/trừu tượng, tập hợp, ghép
- B.02 Đếm được/không đếm được: quy tắc, danh sách UC thường gặp (information, advice, news, furniture, luggage, equipment, homework, progress, research…), danh từ vừa đếm vừa không đếm (nghĩa đổi: paper, glass, hair, work, time, room, experience…)
- B.03 Đơn vị đo cho UC (a piece of, a slice of, a bit of, an item of, a loaf of…)
- B.04 Số nhiều quy tắc: -s, -es, y→ies, -f/-fe→ves, -o (potatoes/photos), ngoại lệ đầy đủ
- B.05 Số nhiều bất quy tắc: man/men, child/children, tooth/teeth, foot/feet, mouse/mice, person/people…
- B.06 Số nhiều gốc Latin/Hy Lạp (-is→-es, -um→-a, -us→-i, -on→-a, -ix→-ices)
- B.07 Danh từ số ít và số nhiều giống nhau (sheep, fish, species, series, aircraft…)
- B.08 Danh từ luôn số nhiều (scissors, trousers, glasses, clothes, police, people, cattle…) và danh từ tận cùng -s nhưng số ít (news, physics, mathematics, economics, measles…)
- B.09 Danh từ tập hợp (team, family, government, committee…): số ít/số nhiều theo ngữ cảnh, Anh-Anh vs Anh-Mỹ
- B.10 Sở hữu cách: 's, s', of; danh từ tận cùng -s; sở hữu kép (a friend of mine); sở hữu với tên riêng/nhóm/cụm; khi nào dùng of vs 's; sở hữu độc lập (at the doctor's)
- B.11 Danh từ làm định ngữ (a stone wall, a ten-minute walk, two-year-old) và danh từ ghép (viết liền/rời/gạch nối, số nhiều của danh từ ghép: mothers-in-law)
- B.12 Giống (actor/actress, trung hoà giới tính: chair-person, they số ít)
- B.13 Danh từ từ động từ/tính từ (the poor, the rich, the elderly; a run, a swim, a look); danh từ tận -ing
- B.14 Danh từ trừu tượng & đuôi danh từ (-tion, -ness, -ment, -ity, -ship, -hood…) (nối sang K)

### C. Mạo từ, hạn định từ, lượng từ

- C.01 a/an: quy tắc theo âm (an hour, a university, an MBA), nghĩa "một", "mỗi" (twice a day), nghề nghiệp, giới thiệu lần đầu
- C.02 the: mọi cách dùng (đã biết, duy nhất, so sánh nhất/thứ tự, tính từ làm danh từ, nhóm người, nhạc cụ, phát minh, họ gia đình, sông/biển/dãy núi/nhóm đảo/sa mạc, tên theo cụm "the + of")
- C.03 Không mạo từ (zero): danh từ số nhiều/UC nói chung, môn học, bữa ăn, ngôn ngữ, quốc gia/thành phố/châu lục, tên đường/công viên, giao thông (by bus), cụm cố định (go to school/bed/work/hospital/church/prison…) và sắc thái Anh-Anh vs Anh-Mỹ
- C.04 Mạo từ với tên riêng, địa danh, tên tổ chức, ngày tháng, mùa, trong tiêu đề báo (headlinese), cụm cố định
- C.05 this/that/these/those: gần/xa, thời gian, trong kể chuyện/thư từ/điện thoại, that thay cho the one
- C.06 some/any: khẳng định/phủ định/nghi vấn, câu mời/đề nghị (Would you like some…), any = bất kỳ, hợp từ (somebody/anything…)
- C.07 no/none/not any/neither; none of + số ít/số nhiều
- C.08 much/many/a lot of/lots of/plenty of/a great deal of/a large number of/a good deal; trong câu khẳng định/phủ định/nghi vấn, trang trọng/thân mật
- C.09 few/a few/little/a little, fewer/less, quite a few, only a few, very few
- C.10 enough/too/very/so/such (+ danh từ), too much/too many, enough + to
- C.11 all/whole/entire; every/each/everyone; all of, each of, every one; every + số ít, every + số đếm (every two days); each other/one another
- C.12 both/either/neither; both…and, either…or, neither…nor: hòa hợp chủ vị, vị trí, both of the
- C.13 another/other/others/the other/the others/each other/one another; phân biệt (bảng)
- C.14 several/various/a number of/a couple of/a handful of/most/the majority of/the rest of/half/double/twice/quarter/percent
- C.15 one/ones: thay thế danh từ; the one(s) with/that; this one
- C.16 Số: số đếm, số thứ tự, phân số, thập phân, phần trăm, năm, ngày tháng (Anh-Anh vs Anh-Mỹ), giờ, tiền, số điện thoại, nhiệt độ, đo lường, "dozens of/hundreds of", số trong dạng ghép (a three-year plan)
- C.17 Thứ tự hạn định từ (all the, both my, half an hour, such a, what a, quite a)

### D. Đại từ

- D.01 Nhân xưng chủ ngữ/tân ngữ; it (thời tiết, thời gian, khoảng cách, chủ ngữ giả); they số ít; you chung; we chung
- D.02 Tính từ sở hữu vs đại từ sở hữu; phân biệt its/it's, your/you're, their/there/they're, whose/who's
- D.03 Đại từ phản thân (-self/-selves): khi bắt buộc, khi không dùng (wash, dress, feel…), nhấn mạnh, by oneself, enjoy yourself, help yourself
- D.04 Đại từ nhấn mạnh vs đối ứng (each other)
- D.05 Chỉ định làm đại từ (this/that/these/those), such, same, the former/the latter
- D.06 Bất định: somebody/anyone/nothing/everything…, + tính từ (something nice), + else, + to V; hòa hợp (everyone → he/she/they)
- D.07 Nghi vấn who/whom/whose/which/what; Wh-ever (whatever, whoever, wherever, whenever, however)
- D.08 Quan hệ (nối sang N)
- D.09 One(s) làm đại từ, you/one chung
- D.10 Đại từ trong câu cảm thán, câu rút gọn trả lời (Me too, Him?, It's me), "It is I" vs "It is me"
- D.11 Đại từ và danh từ tập hợp, hòa hợp đại từ (pronoun agreement), mơ hồ đại từ tham chiếu (ambiguous reference)

### E. Động từ: phân loại & hình thái

- E.01 Động từ chính/trợ động từ (do, be, have)/khiếm khuyết; hành động/trạng thái (stative) với danh sách đầy đủ và nghĩa đổi theo ngữ cảnh (think, see, have, taste, smell, feel, look, appear, weigh, measure, be)
- E.02 Ngoại/nội động từ; động từ vừa ngoại vừa nội (open, close, begin, change, break, sell, burn, cook…) và nghĩa; động từ "middle" (This book sells well)
- E.03 Linking verbs: be, seem, appear, become, get, grow, turn, remain, stay, look, sound, feel, taste, smell, prove, keep + tính từ (không + trạng từ)
- E.04 Mẫu động từ theo tân ngữ: SV, SVO, SVOO (give/send/show…, chuyển sang to/for), SVOC (call/make/find/consider…), SVA
- E.05 Năm dạng động từ (base, -s, -ing, past, past participle); quy tắc -ed và -ing chính tả
- E.06 Động từ bất quy tắc: nhóm theo mô hình (AAA, ABA, ABB, ABC) + danh sách đầy đủ ≥ 200 động từ; cặp dễ nhầm (lie/lay, rise/raise, sit/set, fall/fell, find/found, hang)
- E.07 Be/have/do ba vai trò; do nhấn mạnh; have = sở hữu/ăn uống/hoạt động/trải nghiệm (have breakfast, have a shower); have got
- E.08 Get: tất cả nghĩa/cấu trúc (get + adj/pp/noun/to V/V-ing/object + pp/get + trạng từ, get = become/obtain/arrive/understand, get used to, get going, get-passive)
- E.09 Make/do/take/give/have/go collocation ngữ pháp, (make a decision vs do homework)
- E.10 Phrasal verbs: 4 loại (nội/ngoại, tách/không tách, bắt buộc tách với đại từ, phrasal-prepositional), ≥ 300 cụm nhóm theo động từ gốc & chủ đề, nghĩa đen/bóng, văn phong
- E.11 Prepositional verbs (look at, depend on, listen to, wait for…) vs phrasal verbs, bị động của chúng
- E.12 Động từ + giới từ + (O) theo danh sách (rely on, insist on, apologize for, blame for, accuse of, prevent from, congratulate on…)

### F. Thì và thể (mỗi thì = 1 bài lõi riêng, mọi cách dùng)

- F.01 Hiện tại đơn: thói quen, sự thật, lịch trình, chỉ dẫn, bình luận thể thao/kể chuyện, tiêu đề báo, mệnh đề thời gian/điều kiện, động từ tường thuật hiện tại (He says…), thành ngữ
- F.02 Hiện tại tiếp diễn: đang diễn ra, tạm thời, xu hướng thay đổi, kế hoạch sắp xếp, phàn nàn với always, tiếp diễn với động từ trạng thái (nghĩa đổi), ngôn ngữ báo chí
- F.03 Hiện tại hoàn thành: trải nghiệm (ever/never/before), kết quả hiện tại, kéo dài đến nay (for/since), vừa xảy ra (just/recently), already/yet/still, "this is the first time", be gone/been, so sánh với quá khứ đơn, Anh-Anh vs Anh-Mỹ
- F.04 Hiện tại hoàn thành tiếp diễn: kéo dài, kết quả nhìn thấy, tức thời gần đây; so với hoàn thành đơn; động từ không dùng tiếp diễn
- F.05 Quá khứ đơn: sự kiện hoàn tất, chuỗi hành động, thói quen quá khứ, trạng thái quá khứ, cấu trúc giả định (It's time I went), mệnh đề điều kiện loại 2; dấu hiệu nhận biết
- F.06 Quá khứ tiếp diễn: đang diễn ra tại thời điểm, bối cảnh và sự kiện (when/while), hành động song song, phàn nàn quá khứ, lịch sự (I was wondering…), kể chuyện
- F.07 Quá khứ hoàn thành: trước một mốc quá khứ, kể chuyện đảo thứ tự, câu gián tiếp, điều kiện loại 3, wish, "hardly/no sooner", before/after/by the time/until
- F.08 Quá khứ hoàn thành tiếp diễn: kéo dài đến mốc quá khứ, nguyên nhân
- F.09 Tương lai: will (dự đoán, quyết định tức thời, hứa, đề nghị, đe doạ), be going to (dự định, dự đoán dựa trên bằng chứng), hiện tại tiếp diễn (sắp xếp), hiện tại đơn (lịch trình), shall (đề nghị), be about to, be due to, be to, be on the point of; phân biệt (bảng)
- F.10 Tương lai tiếp diễn: tại thời điểm tương lai, sự kiện sắp xếp tự nhiên, hỏi lịch sự về kế hoạch
- F.11 Tương lai hoàn thành & tương lai hoàn thành tiếp diễn
- F.12 Tương lai trong quá khứ (was going to, would, was about to, was to), thì trong mệnh đề phụ thuộc, sự hoà hợp thì (sequence of tenses)
- F.13 Used to / would (thói quen quá khứ) / be used to / get used to
- F.14 Thì kể chuyện: đan xen quá khứ đơn/tiếp diễn/hoàn thành; hiện tại lịch sử; phối thì trong đoạn văn
- F.15 Thì và trạng từ thời gian (since/for/ago/already/yet/still/just/ever/never/recently/lately/so far/by now/up to now/this week…), vị trí của chúng
- F.16 Bảng đối chiếu tổng hợp 12 thì (hình thức + nghĩa + dấu hiệu)

### G. Động từ khiếm khuyết & bán khiếm khuyết

- G.01 Đặc điểm chung (không -s, không to, không trợ động từ, đảo lên trước chủ ngữ), viết tắt (can't, shan't, mustn't…)
- G.02 Can/could: khả năng, xin phép, đề nghị, khả năng xảy ra, could = quá khứ của can, could vs was able to, can't/couldn't = chắc chắn không
- G.03 May/might: khả năng, xin phép, may/might as well, may well, might + perfect, nghĩa "mặc dù" (may…but)
- G.04 Must/have to/have got to/need to: bắt buộc, suy đoán chắc chắn, mustn't vs don't have to vs needn't, quá khứ (had to), nội/ngoại bắt buộc
- G.05 Should/ought to/had better: lời khuyên, kỳ vọng, nghĩa vụ nhẹ, should have, ought to have, had better (không phải quá khứ), should trong mệnh đề that
- G.06 Will/would: dự đoán, ý chí, thói quen, lịch sự, would rather, would you mind, would like/love/prefer, tương lai trong quá khứ, giả định
- G.07 Shall: đề nghị/gợi ý, tương lai trang trọng, văn bản pháp lý
- G.08 Need/dare: need như khiếm khuyết (needn't) vs thường; dare; used to như bán khiếm khuyết
- G.09 Modal perfect: must have, can't/couldn't have, may/might/could have, should/shouldn't have, needn't have, would have; suy đoán quá khứ vs phê bình/hối tiếc
- G.10 Modal tiếp diễn & perfect tiếp diễn (must be doing, might have been doing)
- G.11 Bán khiếm khuyết: be able to, be allowed to, be supposed to, be bound to, be likely to, be sure/certain to, be going to, be to, be about to, have the ability to
- G.12 Thang suy đoán/độ chắc chắn (certainty scale) và bảng tổng hợp mọi modal × mọi nghĩa
- G.13 Modal trong lịch sự: yêu cầu, xin phép, đề nghị, mời (Could you / Would you mind / May I / Shall I / Would you like), cách đáp lời
- G.14 Modal trong câu hỏi đuôi, phủ định, câu gián tiếp (đổi modal), mệnh đề điều kiện

### H. Câu điều kiện, thức giả định, ước muốn

- H.01 Loại 0, 1, 2, 3, hỗn hợp (mọi tổ hợp), dùng modal trong mệnh đề chính
- H.02 Từ thay if: unless, as long as, provided/providing (that), on condition that, supposing/suppose, in case, otherwise, or else, but for, if not, even if, only if, whether or not, if it weren't for
- H.03 Điều kiện không thực/đảo ngữ: Were I…, Had I…, Should you…, Were it not for…, If … should, If … were to
- H.04 If + will/would (lịch sự: If you will…), If + present perfect, if + was/were
- H.05 Điều kiện ngầm (without, with, in that case, then), rút gọn mệnh đề điều kiện (if possible, if necessary, if so/not)
- H.06 Wish/If only (hiện tại, quá khứ, tương lai/phàn nàn: wish + would), would rather (+ clause), it's (high) time + past, as if/as though (thực/không thực), suppose/imagine + past, I'd sooner
- H.07 Subjunctive: mandative (suggest/insist/demand/recommend + that + base verb, important that), were-subjunctive, formulaic (God save, so be it, come what may, long live), Anh-Anh (should) vs Anh-Mỹ
- H.08 Câu mệnh lệnh: khẳng định/phủ định, lịch sự (please), Let's/Let us/Let me, Don't let…, do + imperative nhấn mạnh, mệnh lệnh ngôi 3, nghĩa điều kiện (Do that and…), You + imperative

### I. Thể bị động & cấu trúc nguyên nhân

- I.01 Hình thành mọi thì (đơn, tiếp diễn, hoàn thành; tương lai; modal), bảng 12 thì chủ/bị động
- I.02 Khi nào dùng bị động (không biết/không quan trọng tác nhân, nhấn mạnh, văn khoa học, tránh đổ lỗi, mạch thông tin), khi nào tránh
- I.03 By + tác nhân; with + công cụ; bỏ tác nhân
- I.04 Bị động với hai tân ngữ (give, send, show…), với tân ngữ giới từ (be looked after), phrasal verbs
- I.05 Bị động với động từ tường thuật (It is said that…, He is said to…, is believed to have…), nhóm động từ dùng cấu trúc này
- I.06 Bị động của nguyên mẫu/danh động từ (to be done, being done, to have been done, having been done); want/need + V-ing (needs cleaning)
- I.07 Get-passive (get married/lost/hurt/dressed), sắc thái; be + tính từ vs bị động (The door is closed: tình trạng/hành động)
- I.08 Have/get something done (nguyên nhân bị động, trải nghiệm bất lợi), have someone do, get someone to do
- I.09 Động từ không có bị động (have = own, fit, suit, resemble, lack…, nội động từ), bị động mệnh lệnh (Let it be done), bị động với câu hỏi/phủ định
- I.10 Causatives: make, let, have, get, help, force, allow, enable, cause, order (mẫu động từ + tân ngữ + V/to V/V-ed)

### J. Mẫu động từ: V-ing / to V / V nguyên mẫu

- J.01 Động từ + V-ing (enjoy, avoid, finish, mind, suggest, consider, practise, risk, keep, give up, admit, deny, can't help, can't stand, it's no use…) danh sách đầy đủ
- J.02 Động từ + to V (want, hope, decide, plan, promise, refuse, manage, afford, learn, offer, agree, fail, seem, appear, tend, pretend…) danh sách đầy đủ
- J.03 Động từ + V-ing hoặc to V cùng nghĩa (like, love, hate, prefer, begin, start, continue, intend, can't bear) và sắc thái (would like/would love/would prefer luôn to V)
- J.04 Động từ + V-ing hoặc to V khác nghĩa (remember, forget, stop, try, regret, mean, go on, need, propose, used, be afraid, be sorry)
- J.05 Động từ + tân ngữ + to V (want, ask, tell, advise, allow, persuade, order, invite, expect, encourage, remind, warn, force, enable, would like, need…)
- J.06 Động từ + tân ngữ + V nguyên (make, let, have, help (+ to), see/hear/watch/notice/feel + O + V/V-ing và khác biệt nghĩa)
- J.07 Giới từ + V-ing (interested in, good at, before/after/by/without/instead of…), động từ + giới từ + V-ing, to là giới từ (look forward to, be used to, object to, committed to)
- J.08 Tính từ + to V (easy to, nice of you to, happy to, ready/likely/sure to), tính từ + giới từ + V-ing; too/enough + to V; so…as to
- J.09 Danh từ + to V (a chance to, the ability to, a decision to, time to, a plan to) vs danh từ + giới từ + V-ing (the idea of, a way of)
- J.10 Nguyên mẫu mục đích (to V, in order to, so as to, so that, for + V-ing), vs for + O + to V; nguyên mẫu chỉ kết quả (only to find out)
- J.11 Nguyên mẫu hoàn thành/tiếp diễn/bị động (to have done, to be doing, to be done) và dùng với seem/appear/be said/believed
- J.12 Nguyên mẫu bỏ to (bare), tách nguyên mẫu (split infinitive), to đứng một mình (I don't want to), nguyên mẫu trong câu hỏi (what to do), Wh- + to V
- J.13 Danh động từ làm chủ ngữ/tân ngữ/bổ ngữ; sở hữu trước V-ing (my going vs me going); danh động từ hoàn thành/bị động; phủ định (not going)
- J.14 Mệnh đề phân từ: hiện tại (V-ing), quá khứ (V-ed), hoàn thành (having done), chủ ngữ treo (dangling participles), phân từ làm tính từ (-ing/-ed), phân từ sau liên từ (while/before/after/when + V-ing), absolute constructions (Weather permitting…)
- J.15 Bảng tra: danh sách động từ theo mẫu (kho kiến thức, đầy đủ)

### K. Tính từ & trạng từ

- K.01 Vị trí tính từ: định ngữ/vị ngữ, chỉ vị ngữ (afraid, asleep, alive, alone, aware…), chỉ định ngữ (main, only, total, mere), tính từ đứng sau danh từ (president elect, things unknown, something nice, the people involved), nghĩa đổi theo vị trí (responsible, present, concerned, involved, proper)
- K.02 Thứ tự tính từ (opinion–size–age–shape–colour–origin–material–purpose + noun), dấu phẩy/and giữa tính từ
- K.03 Tính từ -ed vs -ing (bored/boring…), tính từ ghép (a well-known actor, a 10-year-old), tính từ từ danh từ/động từ
- K.04 Tính từ gradable/ungradable (very good, absolutely perfect, quite, fairly, rather, pretty, really, extremely), mức độ từ nhấn mạnh
- K.05 Tính từ làm danh từ (the poor, the English, the unemployed), tính từ quốc tịch (số nhiều/số ít)
- K.06 Tính từ + giới từ (afraid of, good at, keen on, fond of, similar to, different from/than/to, angry with/at…)
- K.07 Tính từ + that-clause/to-V/wh-clause (sure that, glad to, certain whether)
- K.08 So sánh: hơn/nhất (-er/-est vs more/most, quy tắc chính tả, bất quy tắc good/better/best, far/farther/further, old/older/elder), as…as, not as/so…as, twice as, the same as, similar, different, less/least, much/far/a lot/slightly + so sánh, so sánh kép (the more…the more; more and more; the sooner the better), so sánh trong mệnh đề (than I do/than me), so sánh nhất + in/of/that + present perfect (the best film I've ever seen), so sánh hai vs nhiều
- K.09 Trạng từ: loại (cách thức, nơi chốn, thời gian, tần suất, mức độ, quan điểm/bình luận, liên kết), hình thành (-ly, quy tắc chính tả, bất quy tắc: fast/hard/late/early/well), trạng từ trùng tính từ (hard/hardly, late/lately, near/nearly, high/highly, direct/directly, free/freely…)
- K.10 Vị trí trạng từ: đầu/giữa/cuối; trạng từ tần suất; nhiều trạng từ trong câu (cách–nơi–thời gian), trạng từ đứng giữa trợ động từ; vị trí "only/even/just/also/too/either/as well/almost"
- K.11 Trạng từ mức độ: very/too/so/quite/fairly/pretty/rather/extremely/absolutely/enough/hardly/scarcely/barely/almost/nearly/completely/totally…
- K.12 Trạng từ thời gian đặc biệt: still/yet/already/anymore/any longer/no longer/ever/never/ago/before/since/just/recently/lately/soon/at last/finally/in the end/eventually…
- K.13 Trạng từ bình luận (frankly, fortunately, obviously, apparently, hopefully…), trạng từ liên kết (however, therefore, moreover, nevertheless…)
- K.14 Trạng từ so sánh (faster, more carefully, the best), enough/too với trạng từ
- K.15 Trạng từ vs tính từ (good/well, bad/badly, real/really, sure/surely, linking verbs + adj), tính từ sau get/look/feel/taste…

### L. Giới từ & liên từ

- L.01 Giới từ thời gian: at/on/in/by/until/till/from/to/since/for/during/while/within/after/before/around/about/throughout; cụm (at night, in the morning, on Monday, at the weekend/on the weekend, in time/on time, at the moment/in a moment…)
- L.02 Giới từ nơi chốn: at/in/on/under/over/above/below/beneath/beside/between/among/behind/in front of/opposite/next to/near/by/around/inside/outside/within; at/in/on (địa điểm, phương tiện)
- L.03 Giới từ chuyển động: to/into/onto/out of/off/from/towards/through/across/along/past/up/down/over/under/round/via
- L.04 Giới từ khác: by (phương tiện, tác nhân, thời hạn), with/without, of, for, about, like/as, despite/in spite of, because of/due to/owing to/thanks to, instead of, apart from, except (for), besides, according to, regarding, concerning
- L.05 Giới từ đi sau động từ/tính từ/danh từ (dependent prepositions): danh sách đầy đủ ≥ 300 mục nhóm theo từ, kèm ví dụ
- L.06 Giới từ ở cuối câu/mệnh đề (Who are you talking to?), giới từ + whom/which; giới từ trong câu hỏi, bị động, mệnh đề quan hệ, V-ing
- L.07 Cụm giới từ cố định (in charge of, on behalf of, in terms of, with regard to, by means of…), ≥ 100 cụm
- L.08 Liên từ kết hợp (FANBOYS: for, and, nor, but, or, yet, so), dấu phẩy, vị trí
- L.09 Liên từ phụ thuộc theo nhóm: thời gian, nguyên nhân, mục đích, kết quả, nhượng bộ, điều kiện, so sánh, cách thức
- L.10 Liên từ tương liên: both…and, either…or, neither…nor, not only…but also, not…but, whether…or, as…as, no sooner…than, hardly…when, rather…than
- L.11 Trạng từ liên kết (conjunctive adverbs) và dấu câu đi kèm (; however,)
- L.12 Phân biệt cặp dễ nhầm giới từ/liên từ: although/though/even though/despite/in spite of/while/whereas; because/since/as/for; so that/in order that/so…that/such…that; in case/if; as/like; during/while; by/until; except/besides; unless/if…not
- L.13 Từ nối trong văn viết: bổ sung, tương phản, nguyên nhân, kết quả, ví dụ, trình tự, kết luận, nhấn mạnh (bảng phân theo văn phong)

### M. Câu & kiểu câu

- M.01 Thành phần câu: S, V, O (trực tiếp/gián tiếp), C (chủ ngữ/tân ngữ), A (trạng ngữ), vị ngữ; cụm danh/động/tính/trạng/giới từ
- M.02 Cụm từ vs mệnh đề; mệnh đề độc lập/phụ thuộc
- M.03 Câu đơn, ghép, phức, ghép–phức; cách mở rộng và nối câu
- M.04 Câu kể, nghi vấn, mệnh lệnh, cảm thán (What a…! How…!), câu cầu khiến
- M.05 Trật tự từ trong câu: chuẩn SVO, vị trí trạng ngữ, trật tự trong câu hỏi, đảo ngữ
- M.06 Câu hỏi Yes/No (mọi thì, modal, be), trả lời ngắn
- M.07 Câu hỏi Wh-: chủ ngữ vs tân ngữ, giới từ, which/what, how + adj/adv (how long/far/often/much/many/old/tall), what…for, what…like, whose, why/why not/why don't…
- M.08 Câu hỏi đuôi: mọi trường hợp (I am → aren't I, Let's → shall we, imperative → will you, nobody → they, there, this/that → it, used to, modal, phủ định → khẳng định), ngữ điệu và nghĩa
- M.09 Câu hỏi gián tiếp & câu hỏi nhúng (Do you know where…), câu hỏi lịch sự
- M.10 Câu hỏi phủ định (Don't you…?, Isn't it…?), câu hỏi tu từ, câu hỏi lặp/echo, câu hỏi lựa chọn (A or B)
- M.11 Phủ định: not, no, never, nobody, nothing, nowhere, neither, none, hardly/scarcely/barely/seldom/rarely (phủ định hàm), phạm vi phủ định, phủ định kép (lỗi), phủ định với suy nghĩ (I don't think…), no vs not any/a, not…until, phủ định bắt buộc "any"
- M.12 So/neither/nor/too/either, trả lời đồng ý/phản đối (So do I, Neither can I, I do too/I don't either, I think so/I hope not)
- M.13 There is/are mọi dạng: thì, modal, there + to be + V-ing/V-ed, there seems/appears, there used to be, there's no point in, There is no one…, hòa hợp (There's two…), it vs there
- M.14 It: chủ ngữ giả (It is important to…, It takes…, It is said…), it chỉ thời tiết/thời gian/khoảng cách, it + be + adj + of/for + O + to V, it's no use/good/worth + V-ing, it + seems/appears/happens that
- M.15 Câu cảm thán, câu cầu khiến, câu thề nguyện/chúc, lời chào
- M.16 Câu điều kiện (nối sang H), câu ước (H), câu bị động (I)
- M.17 Lược bỏ & thay thế (ellipsis/substitution): so/not (I think so), do so, one(s), the same, to (đứng một mình), lược chủ ngữ/trợ động từ trong văn nói/chỉ dẫn, lược trong câu ghép (She cooked and (she) sang), lược trong so sánh (than I (do))

### N. Mệnh đề

- N.01 Mệnh đề quan hệ xác định: who/whom/which/that/whose/where/when/why; bỏ đại từ quan hệ; giới từ + whom/which; that vs which; không dùng that sau giới từ/dấu phẩy
- N.02 Mệnh đề quan hệ không xác định: dấu phẩy, which = cả mệnh đề, quantifier + of whom/which, nhận diện xác định/không xác định, không dùng that
- N.03 Rút gọn mệnh đề quan hệ (V-ing, V-ed, to V, cụm tính từ/giới từ, đồng vị)
- N.04 Mệnh đề quan hệ nâng cao: what (the thing that), whatever/whoever, "the way (that)", "the reason why", "the day when", mệnh đề quan hệ tách xa, đại từ quan hệ nối tiếp
- N.05 Mệnh đề danh ngữ: that-clause (+ bỏ that), wh-clause, if/whether-clause, V-ing/to V clause; chủ ngữ/tân ngữ/bổ ngữ/đồng vị; tính từ/danh từ + that; hòa hợp
- N.06 Mệnh đề trạng ngữ: thời gian (when, while, as, before, after, since, until, by the time, as soon as, once, whenever), nơi chốn (where, wherever), nguyên nhân (because, since, as, now that, seeing that), mục đích (so that, in order that, lest), kết quả (so…that, such…that, so that), nhượng bộ (although, though, even though, while, whereas, no matter, however, whatever), tương phản, cách thức (as, as if, the way, like), so sánh (as…as, than), tỉ lệ (the more…the more), điều kiện (nối H)
- N.07 Rút gọn mệnh đề trạng ngữ (V-ing, V-ed, having V-ed, being, with + O + V-ing/V-ed absolute), quy tắc cùng chủ ngữ
- N.08 Câu gián tiếp: lùi thì, đổi đại từ/trạng từ thời gian-nơi chốn, câu kể/hỏi/mệnh lệnh/đề nghị/cảm thán, không lùi thì khi nào, động từ tường thuật theo mẫu (say, tell, ask, order, advise, warn, suggest, admit, deny, accuse, apologize, promise, offer, threaten, insist, remind, refuse, agree, claim, explain, complain, announce…) ≥ 60 động từ + mẫu cấu trúc, modal trong câu gián tiếp, câu hỏi gián tiếp, tường thuật nhiều câu, tường thuật bằng V-ing/to V/that
- N.09 Hòa hợp thì trong câu phức (sequence of tenses), thì trong mệnh đề danh/quan hệ/thời gian
- N.10 Câu ghép & liên kết: and/but/or/so/yet/for/nor, dấu phẩy, chấm phẩy, tránh run-on, song song cấu trúc (parallelism)
- N.11 Hòa hợp chủ vị đầy đủ: and, or/nor, either…or, with/as well as/together with, each/every, collective nouns, uncountable, quantifiers (a number of vs the number of, a lot of, none, all, most, some…), tính từ làm danh từ, tựa đề/tên/số tiền/khoảng cách/thời gian (Ten dollars is…), there/here + V, mệnh đề quan hệ (one of the…who), Wh-/what-clause làm chủ ngữ, danh từ -s số ít (news, mathematics), danh từ số nhiều (police, people), đại từ bất định, đảo ngữ

### O. Cấu trúc nhấn mạnh & thông tin

- O.01 Đảo ngữ sau trạng từ phủ định/hạn chế (never, rarely, seldom, hardly…when, scarcely…when, no sooner…than, not only…but also, not until, only when/only after/only then, little, at no time, under no circumstances, on no account, nowhere)
- O.02 Đảo ngữ khác: So + adj/such + clause, neither/nor, here/there + V, đảo nơi chốn/hướng (Down came the rain), đảo trong điều kiện (H.03), đảo sau as/than (văn trang trọng), đảo trong câu cảm thán, đảo với so/neither, đảo trong trích dẫn (said John)
- O.03 Câu chẻ (cleft): It + be + X + that/who…, wh-cleft (What I need is…), reverse wh-cleft, All I want is…, The thing that/The reason why…, câu chẻ với thì quá khứ/phủ định/tính từ
- O.04 Đưa ra trước (fronting/topicalization), đảo tân ngữ, "As for", "Speaking of", "Regarding", cấu trúc "As + adj + as", "Much as"
- O.05 Nhấn mạnh bằng do/does/did, bằng trạng từ (really, certainly, indeed, simply), lặp, đại từ phản thân (I myself), at all/whatsoever/in the least/by any means/ever, "on earth/the hell/in the world"
- O.06 Cấu trúc đồng vị (appositive), mệnh đề chèn, nhóm danh từ phức (noun phrase complex), extraposition (It is…that…), đặt thông tin cũ/mới, trọng tâm cuối câu (end-weight)
- O.07 Danh hoá (nominalisation): từ động từ/tính từ thành danh từ (decide → decision), văn viết học thuật

### P. Cohesion, văn phong & biến thể

- P.01 Liên kết văn bản: tham chiếu (this/that/it/such/the former), thay thế, lược, từ nối, lặp từ vựng, đồng nghĩa, từ bao quát
- P.02 Hedging & độ chắc chắn (seem, appear, tend, may/might, probably, arguably, it is likely that, to some extent, in general), boosting
- P.03 Trang trọng vs thân mật (formal/informal/neutral): chọn từ, cấu trúc, viết tắt, phrasal verb vs động từ trang trọng, bị động trang trọng, you vs one, whom/who
- P.04 Ngữ pháp văn nói: viết tắt, lược, tag, discourse markers (well, you know, I mean, actually), cấu trúc lặp/dở dang, get-passive, vague language (and stuff, sort of), phản hồi ngắn
- P.05 Anh-Anh vs Anh-Mỹ ngữ pháp: present perfect/past simple, have/have got, collective nouns, gotten/got, shall, mandative subjunctive, giới từ (at the weekend/on the weekend, Monday to Friday/through), mạo từ (in hospital/in the hospital), từ vựng ngữ pháp (will/shall, needn't/don't need to)
- P.06 Ngôn ngữ trung hoà giới tính; singular they; Ms/Mr/Mrs; danh xưng
- P.07 Phong cách văn bản: email, thư, báo, học thuật, quảng cáo, tiêu đề (headlinese), chỉ dẫn, nhãn, tin nhắn
- P.08 Lỗi phổ biến của người Việt (nhóm theo chủ đề: thiếu be, thiếu -s/-ed, mạo từ, giới từ, thứ tự từ, dịch word-by-word, thiếu chủ ngữ, nhầm tính từ/trạng từ, nhầm danh từ đếm được…)
- P.09 Lỗi viết thường gặp: dangling/misplaced modifiers, parallelism, sai hòa hợp, sai đại từ tham chiếu, comma splice, câu cụt, dùng thừa từ (redundancy)

### Q. Từ loại biến đổi & cấu tạo từ

- Q.01 Tiền tố (un-, in-/im-/il-/ir-, dis-, mis-, re-, pre-, post-, over-, under-, anti-, co-, de-, en-, ex-, inter-, mid-, non-, out-, sub-, super-, trans-, ultra-, semi-…) với nghĩa và ví dụ
- Q.02 Hậu tố danh từ (-tion/-sion, -ment, -ness, -ity, -ance/-ence, -ship, -hood, -dom, -er/-or, -ist, -ian, -ism, -age, -th, -ure…)
- Q.03 Hậu tố tính từ (-able/-ible, -al, -ful, -less, -ous, -ive, -ic, -ish, -y, -ent/-ant, -ary/-ory, -ed/-ing)
- Q.04 Hậu tố động từ (-ize/-ise, -ify, -en, -ate) và trạng từ (-ly, -ward, -wise)
- Q.05 Chuyển loại (conversion): danh từ ↔ động từ (a text/to text), tính từ → động từ; đổi trọng âm
- Q.06 Từ ghép (compound words), blend, viết tắt, rút gọn (clipping), back-formation, acronym/initialism
- Q.07 Họ từ (word families) cho ≥ 300 từ gốc thông dụng (bảng danh từ/động từ/tính từ/trạng từ), quy tắc chuyển tính từ ↔ trạng từ ↔ danh từ

---

## PHẦN 4. ÁNH XẠ ĐỀ XUẤT PHẦN → LEVEL (SPIRAL)

Dạy theo vòng xoáy: cùng một nhóm xuất hiện nhiều lần, sâu dần.

| Nhóm | L0 | A1 | A2 | B1 | B2 | C1 |
|---|---|---|---|---|---|---|
| A Âm/chính tả/dấu câu | A.01–02, A.06–08, A.10 | A.03, A.11 (cơ bản) | A.04–05, A.09 | — | — | A.11–12 nâng cao |
| B Danh từ | B.01–02, B.04–05 | B.03, B.07–08, B.10 | B.09, B.11 | B.06, B.12–13 | B.14 | — |
| C Mạo từ/lượng từ/số | C.01–03, C.16 | C.05–06, C.08–09 | C.04, C.07, C.10–13 | C.14–15, C.17 | nâng cao C.03–04 | — |
| D Đại từ | D.01–02 | D.03, D.06 | D.07, D.09 | D.04–05, D.10 | D.11 | — |
| E Động từ | E.01, E.05 | E.03, E.07 | E.06, E.09–10 | E.02, E.04, E.08, E.11–12 | E.10 nâng cao | E.10–12 sắc thái |
| F Thì | be, F.01 | F.02, F.05 | F.03, F.06, F.09, F.13 | F.04, F.07–08, F.10 | F.11–12, F.14–16 | F.14 nâng cao |
| G Modal | — | G.02 | G.04–06, G.13 | G.03, G.09 cơ bản | G.07–12, G.14 | sắc thái |
| H Điều kiện/giả định | — | H.08 | H.01 (0, 1) | H.01 (2, 3, mixed), H.06 | H.02–05, H.07 | H.03, H.07 nâng cao |
| I Bị động | — | — | — | I.01–04, I.08 | I.05–07, I.09–10 | nâng cao |
| J Mẫu động từ | — | J.01–02 cơ bản | J.03, J.07 | J.04–06, J.08–10 | J.11–14 | nâng cao |
| K Tính từ/trạng từ | — | K.01–02, K.08 cơ bản, K.09 | K.03, K.08, K.10–11 | K.04–07, K.12 | K.13–15 | nâng cao |
| L Giới từ/liên từ | — | L.01–03, L.08 | L.04, L.09 | L.05–07, L.10, L.12 | L.11, L.13 | nâng cao |
| M Câu | M.01, M.04–05, M.13 | M.06–07 | M.08, M.11–12 | M.09–10, M.14 | M.15 | M.17 |
| N Mệnh đề | — | — | N.01 cơ bản | N.02, N.05–06, N.08 | N.03–04, N.07, N.09–11 | N nâng cao |
| O Nhấn mạnh | — | — | — | — | O.01–03, O.05 | O.01–07 |
| P Văn phong/biến thể | — | — | P.08 | P.03–05 | P.01–02, P.07, P.09 | P.01–09 |
| Q Cấu tạo từ | — | — | Q.01–03 cơ bản | Q.04–05 | Q.06–07 | nâng cao |

> Bản đồ trên chỉ là **gợi ý khởi điểm**; bản đồ bài học chính thức (`LESSON-MAP.md`) do agent lập và tôi duyệt. Bất kỳ mã nào trong Phần 3 cũng phải xuất hiện ở ít nhất một bài.

---

## PHẦN 5. CHUẨN ĐỘ KHÓ CỦA BÀI TẬP THEO NÂNG CẤP

- Mỗi mã phụ lục trong Phần 3 phải có **≥ 8 câu trực tiếp**; mã "lõi" (F, G, H, I, J, N, M.08, M.13, C.02–03, K.08, L.05) phải có **≥ 12 câu**.
- Dạng bài đa dạng; từ B1 trở lên mỗi bài có tối thiểu **một** `transformation` hoặc `error-correction` theo từng rule lõi.
- Mỗi bài lõi có **set "bẫy"** (trap set) ≥ 10 câu: các trường hợp ngoại lệ/biên mà người học dễ sai.
- Mỗi bài lõi có **set "văn cảnh"** (cloze/đoạn văn/hội thoại) ≥ 10 chỗ trống kiểm tra việc dùng đúng trong ngữ cảnh thật, không chỉ câu rời.
- Kho kiến thức: bảng/danh sách phải **đầy đủ**, không chọn mẫu minh hoạ; có bài luyện riêng cho động từ bất quy tắc, giới từ đi kèm, phrasal verbs, cặp dễ nhầm.

---

## PHẦN 6. BÁO CÁO CẦN NỘP SAU MỖI LEVEL

1. Bảng theo bài: số rule, số từ lý thuyết, số ví dụ, số câu bài tập, số loại câu, số lỗi thường gặp, số bảng so sánh — so với ngưỡng ở 1.2.
2. `KNOWLEDGE-MATRIX.md` cập nhật; liệt kê **mã phụ lục chưa phủ** (nếu level này chưa phải nơi dạy thì ghi "dự kiến ở level X").
3. Danh sách `[CẦN XÁC MINH]` mới.
4. Danh sách bài đã tách thêm so với kế hoạch và lý do.
5. Kết quả `validate`, `coverage`, `check-knowledge-matrix`, `test`, `lint`, `build`.

**Điều kiện hoàn thành toàn bộ:** mọi mã trong Phần 3 được ánh xạ, đủ số câu, đạt ngưỡng 1.2 cho mọi bài; không còn rule nào chỉ có nội dung "ví dụ minh hoạ" mà thiếu phân tích đủ sáu chiều ở 1.1.