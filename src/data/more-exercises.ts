import type { Exercise } from './grammar'

const c = (prompt: string, options: string[], answer: number, explanation: string): Exercise => ({ type: 'choice', prompt, options, answer, explanation })
const f = (prompt: string, answers: string[], explanation: string): Exercise => ({ type: 'fill', prompt, answers, explanation })
const o = (prompt: string, words: string[], answer: string, explanation: string): Exercise => ({ type: 'order', prompt, words, answer, explanation })

// Hai câu bổ sung cho mỗi bài: luyện nhận diện quy tắc và áp dụng trong câu mới.
export const extraExercises: Record<string, Exercise[]> = {
  'word-classes': [
    c('Trong “a fast train”, fast đóng vai trò gì?', ['Động từ', 'Tính từ', 'Giới từ'], 1, 'Fast đứng trước và mô tả danh từ train nên là tính từ.'),
    f('Chọn đúng dạng trong ngoặc: “She is a ___ singer.” (beautiful / beautifully)', ['beautiful'], 'Singer là danh từ, nên cần tính từ beautiful.'),
  ],
  'sentence-parts': [
    c('Trong “The soup smells delicious”, delicious là gì?', ['Tân ngữ', 'Bổ ngữ', 'Chủ ngữ'], 1, 'Delicious mô tả chủ ngữ the soup sau động từ nối smells.'),
    f('Điền chủ ngữ hình thức: “___ is raining.”', ['it'], 'Câu thời tiết cần chủ ngữ hình thức it.'),
  ],
  'phrases-clauses': [
    c('Nhóm nào chỉ là cụm từ, chưa phải mệnh đề?', ['after she arrived', 'under the table', 'because it rained'], 1, 'Under the table không có cặp chủ ngữ–động từ.'),
    o('Sắp xếp thành một câu hoàn chỉnh.', ['I', 'because', 'was tired', 'left', 'I'], 'I left because I was tired', 'Mệnh đề because I was tired cần gắn với mệnh đề chính I left.'),
  ],
  'basic-word-order': [
    c('Cụm nào có trật tự tính từ–danh từ đúng?', ['a book useful', 'a useful book', 'useful a book'], 1, 'Tính từ đứng trước danh từ trong cụm danh từ thông thường.'),
    o('Sắp xếp câu có trạng ngữ thời gian ở cuối.', ['English', 'every day', 'studies', 'An'], 'An studies English every day', 'Thứ tự cơ bản là chủ ngữ, động từ, tân ngữ, rồi trạng ngữ thời gian.'),
  ],
  'agreement': [
    c('Chọn dạng đúng: “The box of books ___ heavy.”', ['are', 'is', 'be'], 1, 'Danh từ chính của chủ ngữ là box, số ít.'),
    f('Điền be: “Everyone ___ ready.”', ['is'], 'Everyone được xem là chủ ngữ số ít.'),
  ],
  'be-have-do': [
    c('Trong “I have finished”, have làm nhiệm vụ gì?', ['Động từ chính chỉ sở hữu', 'Trợ động từ tạo thì hoàn thành', 'Giới từ'], 1, 'Have đứng trước V3 finished để tạo hiện tại hoàn thành.'),
    f('Điền trợ động từ: “She ___ not like coffee.”', ['does'], 'Câu phủ định hiện tại đơn với she cần does not.'),
  ],
  'there-and-it': [
    c('Chọn câu giới thiệu sự tồn tại của một vấn đề.', ['It is a problem.', 'There is a problem.', 'There have a problem.'], 1, 'There is giới thiệu một đối tượng/sự việc đang tồn tại.'),
    f('Điền be: “There ___ two chairs in the room.”', ['are'], 'Two chairs là số nhiều nên dùng are.'),
  ],
  'nouns-countability': [
    c('Danh từ nào thường không đếm được?', ['idea', 'chair', 'advice'], 2, 'Advice là danh từ không đếm được trong nghĩa lời khuyên.'),
    f('Điền đơn vị: “a ___ of advice”', ['piece'], 'A piece of advice là cách nói một lời khuyên.'),
  ],
  'plural-nouns': [
    c('Số nhiều của city là gì?', ['citys', 'cities', 'cityes'], 1, 'Phụ âm + y đổi y thành ies.'),
    f('Điền số nhiều: “One person, two ___.”', ['people'], 'People là dạng số nhiều thông dụng của person.'),
  ],
  'articles': [
    c('Bạn nói về âm nhạc nói chung. Chọn câu tự nhiên.', ['I like the music.', 'I like music.', 'I like a music.'], 1, 'Music không đếm được; khi nói chung thường không dùng mạo từ.'),
    f('Điền mạo từ: “She waited for ___ hour.”', ['an'], 'Hour bắt đầu bằng âm nguyên âm vì h không phát âm.'),
  ],
  'articles-special': [
    c('Tên địa lý nào thường có the?', ['Mount Everest', 'Lake Victoria', 'the Pacific Ocean'], 2, 'Tên đại dương thường dùng the.'),
    f('Điền mạo từ: “She lives in ___ United States.”', ['the'], 'Tên quốc gia chứa States thường dùng the.'),
  ],
  'determiners': [
    c('Chọn cách nói về nhiều đồ vật ở xa.', ['those books', 'this books', 'that books'], 0, 'Those dùng với danh từ số nhiều ở xa.'),
    f('Điền từ chỉ định: “___ apple in my hand is red.” (gần, số ít)', ['this'], 'This chỉ vật ở gần và số ít.'),
  ],
  'pronouns': [
    c('Sau giới từ “for”, dùng đại từ nào để chỉ “cô ấy”?', ['she', 'her', 'hers'], 1, 'Sau giới từ cần đại từ tân ngữ her.'),
    f('Điền đại từ sở hữu: “This is my bag. That one is ___.” (của cô ấy)', ['hers'], 'Hers đứng độc lập, thay cho her bag.'),
  ],
  'possessives': [
    c('“Phòng của các giáo viên” viết thế nào?', ["the teachers' room", "the teacher's room", 'the teachers room'], 0, 'Sở hữu số nhiều kết thúc bằng s chỉ thêm dấu nháy.'),
    f('Điền từ đúng: “The dog wagged ___ tail.” (its / it’s)', ['its'], 'Its là từ sở hữu; it’s là it is hoặc it has.'),
  ],
  'quantifiers': [
    c('Chọn lượng từ đúng: “___ students passed the test.”', ['Much', 'Many', 'Little'], 1, 'Students là danh từ đếm được số nhiều, dùng many.'),
    f('Điền từ thể hiện còn một ít nước: “We have ___ water left.”', ['a little'], 'A little nói vẫn còn một lượng nhỏ của danh từ không đếm được.'),
  ],
  'each-every-either': [
    c('Câu nào nói cả hai lựa chọn đều phù hợp?', ['Neither option works.', 'Both options work.', 'Either options work.'], 1, 'Both + danh từ số nhiều diễn tả cả hai.'),
    f('Điền dạng đúng: “Every child ___ a book.” (have)', ['has'], 'Every child là chủ ngữ số ít nên dùng has.'),
  ],
  'noun-phrases': [
    c('Danh từ chính trong “a useful grammar book” là gì?', ['useful', 'grammar', 'book'], 2, 'Book là trung tâm; useful và grammar bổ nghĩa cho book.'),
    o('Sắp xếp cụm danh từ tự nhiên.', ['wooden', 'a', 'small', 'box'], 'a small wooden box', 'Từ hạn định đứng trước, rồi tính từ kích thước và chất liệu, cuối cùng là danh từ chính.'),
  ],
  'present-simple': [
    c('Tình huống nào thường dùng hiện tại đơn?', ['Hành động đang diễn ra ngay lúc nói', 'Lịch tàu cố định', 'Hành động đã hoàn tất hôm qua'], 1, 'Lịch trình cố định thường được diễn đạt bằng hiện tại đơn.'),
    f('Điền dạng đúng: “My train ___ at six.” (leave)', ['leaves'], 'Train là ngôi thứ ba số ít; lịch trình dùng hiện tại đơn leaves.'),
  ],
  'present-continuous': [
    c('Câu nào nhấn tình huống tạm thời trong tuần này?', ['I stay with a friend every week.', 'I am staying with a friend this week.', 'I stayed with a friend last week.'], 1, 'Am staying nhấn tình huống đang kéo dài nhưng chỉ tạm thời.'),
    f('Điền dạng đúng: “They ___ a bridge now.” (build)', ['are building'], 'Now gợi quá trình đang diễn ra; they đi với are + V-ing.'),
  ],
  'past-simple': [
    c('Sau did trong câu hỏi, động từ chính ở dạng nào?', ['V2', 'V3', 'Nguyên mẫu'], 2, 'Did đã mang dấu quá khứ nên động từ chính ở nguyên mẫu.'),
    f('Điền dạng đúng: “Did she ___ home early?” (go)', ['go'], 'Sau did dùng go, không dùng went.'),
  ],
  'past-continuous': [
    c('Trong “I was sleeping when the alarm rang”, hành động nào làm bối cảnh?', ['was sleeping', 'rang', 'Cả hai đều là sự kiện ngắn'], 0, 'Was sleeping là quá trình đang diễn ra khi chuông reo.'),
    f('Điền dạng đúng: “At 8 last night, we ___ dinner.” (have)', ['were having'], 'At 8 last night đặt người nghe vào giữa quá trình ăn tối.'),
  ],
  'present-perfect-form': [
    c('Câu nào nói một trải nghiệm không nêu thời điểm?', ['I visited London in 2020.', 'I have visited London.', 'I visit London yesterday.'], 1, 'Have visited nói trải nghiệm trước hiện tại mà không nêu mốc đã kết thúc.'),
    f('Điền từ: “She has lived here ___ 2019.”', ['since'], 'Since đi với mốc bắt đầu; for đi với khoảng thời gian.'),
  ],
  'present-perfect-vs-past': [
    c('Bạn hỏi chi tiết thời điểm sau “Have you been to Hue?”. Chọn câu tiếp.', ['When have you gone?', 'When did you go?', 'When do you go yesterday?'], 1, 'Khi hỏi mốc quá khứ cụ thể, dùng quá khứ đơn.'),
    f('Điền động từ: “I ___ my keys yesterday, but found them.” (lose)', ['lost'], 'Yesterday là mốc quá khứ đã khép lại nên dùng lost.'),
  ],
  'present-perfect-continuous': [
    c('Câu nào nhấn quá trình đọc kéo dài tới hiện tại?', ['I have read three books.', 'I have been reading all morning.', 'I read yesterday.'], 1, 'Have been reading nhấn hoạt động và thời lượng.'),
    f('Điền dạng đúng: “It ___ all morning.” (rain; nhấn quá trình)', ['has been raining'], 'Has been raining nhấn việc mưa kéo dài từ trước đến hiện tại.'),
  ],
  'past-perfect': [
    c('“When I arrived, the train had left” cho biết điều gì?', ['Tàu đi sau khi tôi đến', 'Tàu đã đi trước khi tôi đến', 'Tàu đang đi lúc tôi đến'], 1, 'Had left đặt việc tàu rời đi trước mốc I arrived.'),
    f('Điền dạng đúng: “She realized she ___ her phone at home.” (leave)', ['had left'], 'Việc để quên xảy ra trước lúc cô ấy nhận ra.'),
  ],
  'past-habits': [
    c('Câu nào nói tình trạng từng đúng nhưng nay đã đổi?', ['I used to live here.', 'I am used to live here.', 'I will live here.'], 0, 'Used to + V diễn tả tình trạng/thói quen cũ.'),
    f('Điền dạng đúng: “I am used to ___ early.” (wake up)', ['waking up'], 'Be used to có to là giới từ, theo sau bởi V-ing.'),
  ],
  'future-forms': [
    c('Cuộc hẹn đã được sắp xếp. Câu nào tự nhiên?', ['I am meeting Hoa tomorrow.', 'I meet Hoa yesterday.', 'I have met Hoa tomorrow.'], 0, 'Hiện tại tiếp diễn có thể nói về sắp xếp tương lai đã chốt.'),
    f('Điền dạng đúng: “When I ___, I will call you.” (arrive)', ['arrive'], 'Sau when chỉ thời gian tương lai thường dùng hiện tại đơn.'),
  ],
  'future-continuous-perfect': [
    c('“At this time tomorrow” phù hợp nhất với cấu trúc nào khi nhấn quá trình?', ['will be working', 'had worked', 'has worked'], 0, 'Tương lai tiếp diễn nhìn vào một quá trình tại mốc tương lai.'),
    f('Điền dạng đúng: “By Friday, she ___ the draft.” (complete; nhấn đã xong)', ['will have completed'], 'By Friday là hạn trước đó việc sẽ hoàn tất: will have + V3.'),
  ],
  'gerund-infinitive': [
    c('“Stop to drink water” có nghĩa gì?', ['Ngừng uống nước', 'Dừng việc khác để uống nước', 'Không bao giờ uống nước'], 1, 'Stop to do là dừng lại để làm một việc khác.'),
    f('Điền dạng đúng: “I look forward to ___ you.” (meet)', ['meeting'], 'To trong look forward to là giới từ, theo sau bằng V-ing.'),
  ],
  'verb-complements': [
    c('Câu nào dùng đúng mẫu của give?', ['She gave Tom a book.', 'She gave to Tom a book.', 'She gave Tom to a book.'], 0, 'Give có thể nhận người nhận rồi vật: give somebody something.'),
    o('Sắp xếp mẫu “gửi vật cho người”.', ['a message', 'sent', 'He', 'to Mai'], 'He sent a message to Mai', 'Vật được gửi đứng trước cụm to + người nhận.'),
  ],
  'phrasal-verbs': [
    c('Cụm nào không tách được trong nghĩa “chăm sóc”?', ['turn off', 'look after', 'pick up'], 1, 'Look after giữ tân ngữ sau cả cụm: look after her.'),
    f('Điền đại từ đúng vị trí: “Please turn ___ off.” (the light = it)', ['it'], 'Với turn off tách được, đại từ it đứng giữa turn và off.'),
  ],
  'stative-verbs': [
    c('Trong câu nào have diễn tả hoạt động đang diễn ra?', ['I have a car.', 'I am having lunch.', 'I have two sisters.'], 1, 'Have lunch là hoạt động ăn trưa nên có thể dùng tiếp diễn.'),
    f('Điền dạng đúng: “I ___ the answer.” (know)', ['know'], 'Know ở nghĩa biết là động từ trạng thái, thường dùng dạng đơn.'),
  ],
  'modal-ability': [
    c('Câu nào nhờ giúp đỡ lịch sự hơn?', ['Open the door.', 'Could you open the door?', 'You open the door.'], 1, 'Could you…? thường mềm hơn một mệnh lệnh trực tiếp.'),
    f('Điền cụm đúng: “After trying for hours, we ___ to fix it.” (khả năng thành công cụ thể)', ['were able'], 'Were able to phù hợp với một lần thành công cụ thể trong quá khứ.'),
  ],
  'modal-obligation': [
    c('“You must not enter” nghĩa là gì?', ['Bạn không cần vào', 'Bạn bị cấm vào', 'Bạn nên vào'], 1, 'Must not diễn tả cấm đoán, không phải thiếu nghĩa vụ.'),
    f('Điền modal lời khuyên: “You ___ rest if you feel ill.”', ['should'], 'Should đưa lời khuyên, không phải nghĩa vụ bắt buộc.'),
  ],
  'modal-deduction': [
    c('Đèn sáng, bạn đoán có thể họ còn thức. Chọn câu.', ['They must not be awake.', 'They might be awake.', 'They cannot be awake.'], 1, 'Might diễn tả một khả năng chưa chắc chắn.'),
    f('Điền modal suy luận phủ định mạnh: “That ___ be true; I saw the opposite.”', ["can't", 'cannot'], 'Can’t/cannot diễn tả điều người nói suy luận là không thể đúng.'),
  ],
  'modal-perfect': [
    c('“He must have forgotten” nói về điều gì?', ['Nghĩa vụ trong tương lai', 'Suy luận mạnh về quá khứ', 'Lời khuyên hiện tại'], 1, 'Must have + V3 là suy luận mạnh về việc trước hiện tại.'),
    f('Điền dạng đúng: “She might ___ the bus.” (miss; suy đoán quá khứ)', ['have missed'], 'Sau might dùng have + V3 để suy đoán chuyện đã qua.'),
  ],
  'negation': [
    c('“Not all students passed” có nghĩa gì?', ['Không ai đỗ', 'Có ít nhất một người không đỗ', 'Tất cả đều đỗ'], 1, 'Not all phủ định tính toàn bộ, không phủ định mọi học sinh.'),
    f('Điền trợ động từ: “They ___ not understand the rule.” (hiện tại đơn)', ['do'], 'They đi với do trong phủ định hiện tại đơn.'),
  ],
  'questions': [
    c('Trong “Who did Anna call?”, who là thành phần nào?', ['Chủ ngữ', 'Tân ngữ', 'Trợ động từ'], 1, 'Anna là người gọi; who là người được gọi, tức tân ngữ.'),
    o('Sắp xếp câu hỏi về nơi ở.', ['do', 'live', 'you', 'where'], 'where do you live', 'Wh-word đứng đầu, tiếp đến do, chủ ngữ và động từ nguyên mẫu.'),
  ],
  'imperatives': [
    c('Câu mệnh lệnh phủ định đúng là câu nào?', ["Don't worry.", "Don't to worry.", 'Not worry.'], 0, 'Don’t + động từ nguyên mẫu tạo mệnh lệnh phủ định.'),
    f('Điền từ để mời cùng làm: “___ check the answer together.”', ["let's", 'let us'], 'Let’s + V đề nghị người nói và người nghe cùng làm.'),
  ],
  'question-tags': [
    c('Đuôi đúng của “She is ready, ___?” là gì?', ["is she", "isn't she", "doesn't she"], 1, 'Mệnh đề chính khẳng định với is thường có đuôi phủ định isn’t she.'),
    f('Điền từ: “Do you know where she ___?” (be)', ['is'], 'Trong câu hỏi gián tiếp giữ trật tự chủ ngữ–động từ: where she is.'),
  ],
  'adjectives-adverbs': [
    c('Chọn câu diễn tả món súp ngon.', ['The soup tastes well.', 'The soup tastes good.', 'The soup tastes nicely.'], 1, 'Taste là động từ nối trong câu này, theo sau là tính từ good.'),
    f('Điền dạng đúng: “She drives ___.” (careful / carefully)', ['carefully'], 'Trạng từ carefully bổ nghĩa cho hành động drives.'),
  ],
  'comparison': [
    c('Cách so sánh nhất của bad là gì?', ['baddest', 'worst', 'most bad'], 1, 'Bad có dạng so sánh bất quy tắc: worse, worst.'),
    f('Điền từ: “This room is as large ___ that one.”', ['as'], 'Cấu trúc so sánh bằng là as + tính từ + as.'),
  ],
  'adverb-position': [
    c('“I only told Mai the news” nhấn điều gì?', ['Tôi chỉ làm việc kể tin, không làm việc khác', 'Tôi chỉ kể cho Mai, không kể ai khác', 'Tôi chỉ kể tin đó, không kể tin khác'], 0, 'Only đứng trước told nên giới hạn hành động được làm.'),
    o('Sắp xếp trạng từ tần suất ở vị trí thông thường.', ['often', 'she', 'travels'], 'she often travels', 'Often đứng trước động từ thường travels.'),
  ],
  'prepositions-time-place': [
    c('Điền: “We met ___ July.”', ['at', 'on', 'in'], 2, 'In đi với tháng, năm, mùa hoặc khoảng thời gian dài.'),
    f('Điền giới từ: “The picture is ___ the wall.”', ['on'], 'On diễn tả vị trí trên bề mặt bức tường.'),
  ],
  'preposition-patterns': [
    c('Chọn cụm đúng cho “phụ thuộc vào”.', ['depend of', 'depend on', 'depend at'], 1, 'Depend thường đi với giới từ on.'),
    f('Điền giới từ: “She is good ___ solving problems.”', ['at'], 'Good at + V-ing là mẫu diễn tả giỏi việc gì.'),
  ],
  'conjunctions': [
    c('Từ nào nối hai mệnh đề để nêu nguyên nhân?', ['because', 'despite', 'however'], 0, 'Because là liên từ mở đầu mệnh đề chỉ nguyên nhân.'),
    f('Điền liên từ: “___ it was cold, we went out.” (mặc dù)', ['although', 'even though', 'though'], 'Although/even though/though mở đầu mệnh đề nhượng bộ.'),
  ],
  'relative-clauses': [
    c('Trong “The book, which I bought yesterday, …”, phần giữa dấu phẩy có vai trò gì?', ['Xác định duy nhất cuốn sách', 'Thêm thông tin phụ', 'Là câu hỏi'], 1, 'Mệnh đề quan hệ không xác định bổ sung thông tin và có dấu phẩy.'),
    f('Điền từ quan hệ: “The woman ___ called you is my teacher.”', ['who', 'that'], 'Who/that làm chủ ngữ cho mệnh đề quan hệ xác định chỉ người.'),
  ],
  'relative-clauses-advanced': [
    c('Cụm nào trang trọng và đúng?', ['the person to who I spoke', 'the person to whom I spoke', 'the person whom to I spoke'], 1, 'Khi giới từ đứng trước đại từ quan hệ chỉ người, dùng whom.'),
    f('Điền đại từ quan hệ: “He missed the train, ___ upset him.” (chỉ cả sự việc)', ['which'], 'Which sau dấu phẩy có thể chỉ cả mệnh đề phía trước.'),
  ],
  'noun-clauses': [
    c('Câu nào có mệnh đề danh từ làm chủ ngữ?', ['What you said surprised me.', 'You said a surprising thing.', 'You surprised me.'], 0, 'What you said là cả một mệnh đề giữ vai trò chủ ngữ.'),
    f('Điền từ mở đầu: “I wonder ___ she will come.” (liệu)', ['whether', 'if'], 'Whether hoặc if mở đầu câu hỏi Yes/No gián tiếp.'),
  ],
  'adverbial-clauses': [
    c('Cụm nào theo sau được bằng một mệnh đề hoàn chỉnh?', ['despite', 'because of', 'although'], 2, 'Although mở đầu mệnh đề; despite và because of thường đi với cụm danh từ/V-ing.'),
    f('Điền dạng đúng: “Call me as soon as she ___.” (arrive; tương lai)', ['arrives'], 'Mệnh đề thời gian tương lai sau as soon as thường dùng hiện tại đơn.'),
  ],
  'conditionals-basic': [
    c('“If you heat ice, it melts” diễn tả điều gì?', ['Giả định trái quá khứ', 'Quan hệ chung', 'Kế hoạch đã chốt'], 1, 'Hai vế hiện tại đơn thường dùng cho quy luật hoặc sự thật chung.'),
    f('Điền từ: “___ it rains, we will go.” (nếu không)', ['unless'], 'Unless gần nghĩa if…not trong điều kiện này.'),
  ],
  'conditionals-unreal': [
    c('Câu nào là giả định hiện tại?', ['If I had more time, I would study.', 'If I have time, I will study.', 'If I had studied, I would have passed.'], 0, 'Quá khứ đơn trong mệnh đề if và would + V nói giả định hiện tại/tương lai.'),
    f('Điền dạng đúng: “If she had left earlier, she ___ the train.” (catch)', ['would have caught'], 'Điều kiện loại 3 dùng would have + V3 ở mệnh đề kết quả.'),
  ],
  'participle-clauses': [
    c('Câu nào mắc lỗi chủ thể lơ lửng?', ['Walking home, I saw a cat.', 'Walking home, the rain started.', 'Built in 1900, the house still stands.'], 1, 'Câu khiến the rain trở thành chủ thể của walking một cách vô lý.'),
    f('Điền phân từ: “___ in 1900, the house is still beautiful.” (build)', ['built'], 'Built là V3 mang nghĩa bị động: ngôi nhà được xây.'),
  ],
  'linking-ideas': [
    c('Từ nào nêu kết quả của ý trước?', ['however', 'therefore', 'moreover'], 1, 'Therefore liên kết với kết quả hoặc kết luận.'),
    f('Điền từ nối: “It was raining. ___, we went out.” (tuy nhiên)', ['however'], 'However nêu đối lập giữa hai câu độc lập.'),
  ],
  'passive': [
    c('Câu nào không thể đổi bị động theo mẫu thông thường?', ['Mai wrote the report.', 'The accident happened.', 'They built the bridge.'], 1, 'Happen không có tân ngữ trực tiếp để đưa lên làm chủ ngữ bị động.'),
    f('Điền dạng bị động: “The report ___ by Mai yesterday.” (write)', ['was written'], 'Quá khứ đơn bị động dùng was + V3 written.'),
  ],
  'passive-advanced': [
    c('Câu nào chuyển trọng tâm sang người nhận giải thưởng?', ['They gave her a prize.', 'She was given a prize.', 'A prize gave her.'], 1, 'Her trở thành chủ ngữ she trong bị động với give.'),
    f('Điền dạng đúng: “The work ___.” (complete; hiện tại hoàn thành bị động)', ['has been completed'], 'Hiện tại hoàn thành bị động dùng has been + V3.'),
  ],
  'causative': [
    c('“I had my hair cut” thường có nghĩa gì?', ['Tôi tự cắt tóc', 'Tôi nhờ người khác cắt tóc', 'Tôi không cắt tóc'], 1, 'Have + object + V3 thường nhấn việc được người khác làm cho mình.'),
    f('Điền dạng đúng: “The teacher made us ___ the essay.” (rewrite)', ['rewrite'], 'Sau make + người ở chủ động dùng động từ nguyên mẫu không to.'),
  ],
  'reported-speech': [
    c('Câu tường thuật mệnh lệnh đúng là câu nào?', ['She told me to wait.', 'She said me to wait.', 'She told to me wait.'], 0, 'Tell + người + to V là mẫu tường thuật lời yêu cầu/mệnh lệnh.'),
    f('Điền từ: “He asked me ___ I lived.”', ['where'], 'Where mở đầu nội dung câu hỏi gián tiếp về nơi ở.'),
  ],
  'emphasis': [
    c('Câu nào nhấn Mai là người gọi?', ['Mai called.', 'It was Mai who called.', 'Who called Mai?'], 1, 'It-cleft đặt Mai vào vị trí thông tin được nhấn mạnh.'),
    f('Điền động từ đúng: “I did ___ the email.” (send)', ['send'], 'Sau did nhấn mạnh dùng động từ nguyên mẫu.'),
  ],
  'inversion': [
    c('Câu nào là đảo ngữ điều kiện tương đương “If I had known…”?', ['Had I known…', 'Have I known…', 'Did I had known…'], 0, 'Had + chủ ngữ + V3 là một dạng đảo ngữ điều kiện trang trọng.'),
    f('Điền trợ động từ: “Never ___ I seen such care.”', ['have'], 'Sau never đứng đầu, trợ động từ have đảo trước chủ ngữ I.'),
  ],
  'wish-subjunctive': [
    c('“I wish I knew” nói về điều gì?', ['Tôi biết trong quá khứ', 'Hiện tại tôi không biết', 'Tôi chắc sẽ biết ngày mai'], 1, 'Dạng quá khứ sau wish diễn tả điều trái với thực tế hiện tại.'),
    f('Điền dạng giả định: “They suggested that he ___ present.” (be)', ['be'], 'Sau suggest that trong thức giả định dùng nguyên mẫu be.'),
  ],
  'cleft-sentences': [
    c('Câu nào là câu giả chẻ dùng what?', ['What I need is a break.', 'I need a break.', 'What do I need?'], 0, 'What I need là mệnh đề mở đầu, a break là thông tin được nhấn ở cuối.'),
    f('Điền từ: “It was Mai ___ solved the problem.”', ['who', 'that'], 'Who hoặc that nối thành phần chỉ người được nhấn với phần còn lại.'),
  ],
  'nominalisation': [
    c('Câu nào dùng động từ trực tiếp, gọn hơn?', ['The team made an improvement to the process.', 'The team improved the process.', 'An improvement was made by the team.'], 1, 'Improved diễn đạt hành động rõ và gọn khi không cần biến sự cải thiện thành chủ đề.'),
    f('Điền danh từ: “Their ___ surprised us.” (decide)', ['decision'], 'Decision là danh từ tương ứng với decide.'),
  ],
  'ellipsis-substitution': [
    c('“I hope so” dùng so thay cho gì?', ['Một mệnh đề đã rõ từ ngữ cảnh', 'Một danh từ số ít', 'Một giới từ'], 0, 'So có thể thay cho cả nội dung mệnh đề sau hope.'),
    f('Điền từ thay thế: “My pen broke. I need a new ___.”', ['one'], 'One thay cho một cây bút khác cùng loại, không phải chính cây bút cũ.'),
  ],
  'hedging-register': [
    c('Bằng chứng chỉ gợi ý xu hướng. Câu nào chính xác hơn?', ['The data proves the cause.', 'The data may indicate a link.', 'The data definitely confirms everything.'], 1, 'May indicate diễn đạt mức chắc chắn phù hợp với bằng chứng còn hạn chế.'),
    f('Điền cụm thận trọng: “This approach is ___ to reduce costs.” (có khả năng)', ['likely'], 'Likely to diễn tả một kết quả có khả năng xảy ra, không khẳng định tuyệt đối.'),
  ],
  'punctuation': [
    c('Dấu nào nối đúng hai mệnh đề độc lập liên quan chặt?', ['Dấu phẩy đơn', 'Dấu chấm phẩy', 'Dấu nháy đơn'], 1, 'Dấu chấm phẩy có thể nối hai mệnh đề độc lập liên quan.'),
    f('Điền dấu câu: “The plan was simple___ leave before dawn.”', [':'], 'Dấu hai chấm giới thiệu phần giải thích sau một mệnh đề hoàn chỉnh.'),
  ],
}
