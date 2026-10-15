import type { Exercise } from './grammar'

const c = (prompt: string, options: string[], answer: number, explanation: string): Exercise => ({ type: 'choice', prompt, options, answer, explanation })
const f = (prompt: string, answers: string[], explanation: string): Exercise => ({ type: 'fill', prompt, answers, explanation })
const o = (prompt: string, words: string[], answer: string, explanation: string): Exercise => ({ type: 'order', prompt, words, answer, explanation })

// Bài tập bổ sung: luyện nhận diện quy tắc và áp dụng trong câu mới.
export const extraExercises: Record<string, Exercise[]> = {
  'word-classes': [
    c('Trong “a fast train”, fast đóng vai trò gì?', ['Động từ', 'Tính từ', 'Giới từ'], 1, 'Fast đứng trước và mô tả danh từ train nên là tính từ.'),
    c('Trong “I work every day”, work đóng vai trò gì?', ['Danh từ', 'Động từ', 'Tính từ'], 1, 'Work đứng sau chủ ngữ I và diễn tả hành động, nên là động từ ở câu này; trong hard work, cùng từ đó là danh từ.'),
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
    f('Điền be ở hiện tại: “Everyone ___ ready now.”', ['is'], 'Everyone là chủ ngữ số ít; now đặt câu ở hiện tại nên dùng is.'),
  ],
  'be-have-do': [
    c('Trong “I have finished”, have làm nhiệm vụ gì?', ['Động từ chính chỉ sở hữu', 'Trợ động từ tạo thì hoàn thành', 'Giới từ'], 1, 'Have đứng trước V3 finished để tạo hiện tại hoàn thành.'),
    c('Trong “She is reading”, is giữ vai trò gì?', ['Trợ động từ tạo thì tiếp diễn', 'Động từ chính mang nghĩa “là”', 'Giới từ'], 0, 'Is đứng trước V-ing reading để tạo hiện tại tiếp diễn; đây là vai trò trợ động từ của be.'),
  ],
  'there-and-it': [
    c('Chọn câu giới thiệu sự tồn tại của một vấn đề.', ['It is a problem.', 'There is a problem.', 'There have a problem.'], 1, 'There is giới thiệu một đối tượng/sự việc đang tồn tại.'),
    f('Điền be ở hiện tại: “There ___ two chairs in the room now.”', ['are'], 'Two chairs là số nhiều; now đặt câu ở hiện tại nên dùng are.'),
  ],
  'nouns-countability': [
    c('Danh từ nào thường không đếm được?', ['idea', 'chair', 'advice'], 2, 'Advice là danh từ không đếm được trong nghĩa lời khuyên.'),
    c('Chọn cách nói hai lời khuyên.', ['two pieces of advice', 'two advices', 'two piece of advice'], 0, 'Advice không đếm được; muốn đếm hai lời khuyên, dùng two pieces of advice với đơn vị pieces ở số nhiều.'),
  ],
  'plural-nouns': [
    c('Số nhiều của city là gì?', ['citys', 'cities', 'cityes'], 1, 'Phụ âm + y đổi y thành ies.'),
    f('Điền số nhiều thông dụng nhất: “One person, two ___.”', ['people'], 'People là dạng số nhiều thông dụng; persons cũng tồn tại trong một số ngữ cảnh trang trọng hoặc chuyên biệt.'),
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
    c('Câu nào dùng từ hạn định đúng để nói “Đây là sách của tôi”?', ['This is my book.', 'This my book.', 'My this book.'], 0, 'This có thể đứng độc lập làm chủ ngữ của is; my hạn định cho book. Không đặt this và my cạnh nhau trước cùng một danh từ.'),
    c('Trong lời mời trà thông thường, câu nào tự nhiên nhất?', ['Would you like some tea?', 'Would you like any tea?', 'Would you like many tea?'], 0, 'Some thường dùng trong lời mời. Any có thể xuất hiện khi hỏi liệu người nghe muốn chút trà nào không, nhưng some là cách mời trung tính tự nhiên hơn ở đây.'),
  ],
  'pronouns': [
    c('Sau giới từ “for”, dùng đại từ nào để chỉ “cô ấy”?', ['she', 'her', 'hers'], 1, 'Sau giới từ cần đại từ tân ngữ her.'),
    f('Điền đại từ làm chủ ngữ: “___ sent me her notes.” (cô ấy)', ['she'], 'She là đại từ chủ ngữ của sent; her đứng trước notes để chỉ sở hữu. Đại từ sở hữu hers đã được kiểm tra ở câu đầu bài.'),
  ],
  'possessives': [
    c('“Bàn của một giáo viên” viết thế nào?', ["the teacher's desk", "the teachers' desk", 'the teachers desk'], 0, 'Một giáo viên là số ít nên thêm ’s vào teacher; teachers’ chỉ nhiều giáo viên.'),
    f('Điền từ đúng: “The dog wagged ___ tail.” (its / it’s)', ['its'], 'Its là từ sở hữu; it’s là it is hoặc it has.'),
  ],
  'quantifiers': [
    c('Chọn lượng từ đúng: “___ students passed the test.”', ['Much', 'Many', 'Little'], 1, 'Students là danh từ đếm được số nhiều, dùng many.'),
    c('Bạn mang nhiều nước hơn mức cần thiết. Câu nào diễn đạt đúng?', ['We brought too much water.', 'We brought too many water.', 'We brought too little water.'], 0, 'Water không đếm được nên dùng too much; too many cần danh từ đếm được số nhiều, còn too little mang nghĩa quá ít.'),
  ],
  'each-every-either': [
    c('Câu nào nói cả hai lựa chọn đều phù hợp?', ['Neither option works.', 'Both options work.', 'Either options work.'], 1, 'Both + danh từ số nhiều diễn tả cả hai.'),
    f('Điền dạng đúng: “Every child ___ a book.” (have)', ['has'], 'Every child là chủ ngữ số ít nên dùng has.'),
  ],
  'noun-phrases': [
    c('Trong “the report on your desk”, phần nào đứng sau và bổ nghĩa cho danh từ chính report?', ['on your desk', 'the', 'report'], 0, 'On your desk là cụm giới từ đứng sau report để xác định bản báo cáo nào; report là danh từ chính.'),
    o('Sắp xếp cụm danh từ tự nhiên.', ['wooden', 'a', 'small', 'box'], 'a small wooden box', 'Từ hạn định đứng trước, rồi tính từ kích thước và chất liệu, cuối cùng là danh từ chính.'),
  ],
  'present-simple': [
    c('Tình huống nào thường dùng hiện tại đơn?', ['Hành động đang diễn ra ngay lúc nói', 'Lịch tàu cố định', 'Hành động đã hoàn tất hôm qua'], 1, 'Lịch trình cố định thường được diễn đạt bằng hiện tại đơn.'),
    f('Điền dạng phủ định hiện tại đơn: “He ___ work on Sundays.” (do)', ["doesn't", 'does not'], 'He dùng does not/doesn’t trước động từ nguyên mẫu work.'),
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
    f('Điền dạng đúng: “We ___ dinner when the lights went out, interrupting our meal.” (have)', ['were having'], 'Việc đèn tắt đã cắt ngang bữa tối đang diễn ra, nên dùng quá khứ tiếp diễn were having.'),
  ],
  'present-perfect-form': [
    c('Câu nào nói một trải nghiệm không nêu thời điểm?', ['I visited London in 2020.', 'I have visited London.', 'I visit London yesterday.'], 1, 'Have visited nói trải nghiệm trước hiện tại mà không nêu mốc đã kết thúc.'),
    c('Cả hai người vẫn sống ở đây. Điền đúng hai chỗ: “She has lived here ___ 2019; I have lived here ___ ten years.”', ['since / for', 'for / since', 'since / since'], 0, 'Since đi với mốc bắt đầu 2019; for đi với khoảng thời gian ten years. Cả hai trạng thái vẫn tiếp diễn đến hiện tại.'),
  ],
  'present-perfect-vs-past': [
    c('Bạn hỏi chi tiết thời điểm sau “Have you been to Hue?”. Chọn câu tiếp.', ['When have you gone?', 'When did you go?', 'When do you go yesterday?'], 1, 'Khi hỏi mốc quá khứ cụ thể, dùng quá khứ đơn.'),
    f('Cửa hàng mở từ mười năm trước và vẫn mở đến nay. Điền dạng của be: “The shop ___ open for ten years.”', ['has been'], 'Has been nối mốc bắt đầu trong quá khứ với trạng thái vẫn tiếp tục hiện nay; was thường nhìn giai đoạn như đã kết thúc.'),
  ],
  'present-perfect-continuous': [
    c('Câu nào nhấn quá trình đọc kéo dài tới hiện tại?', ['I have read three books.', 'I have been reading all morning.', 'I read yesterday.'], 1, 'Have been reading nhấn hoạt động và thời lượng.'),
    f('Trời vẫn đang mưa. Điền dạng nhấn quá trình: “It is still raining; it ___ all morning.” (rain)', ['has been raining'], 'Still raining cho biết quá trình chưa dừng; has been raining nhấn mưa kéo dài từ trước đến hiện tại.'),
  ],
  'past-perfect': [
    c('“When I arrived, the train had left” cho biết điều gì?', ['Tàu đi sau khi tôi đến', 'Tàu đã đi trước khi tôi đến', 'Tàu đang đi lúc tôi đến'], 1, 'Had left đặt việc tàu rời đi trước mốc I arrived.'),
    c('Cô ấy nhận ra điện thoại không ở trong túi. Câu nào dùng quá khứ hoàn thành để nhấn việc đã để quên trước đó?', ['She realized she had left her phone at home.', 'She realized she has left her phone at home.', 'She realized she will leave her phone at home.'], 0, 'Had left đặt việc để quên trước lúc nhận ra. Khi trình tự đã rõ, quá khứ đơn left cũng có thể dùng, nhưng câu này hỏi riêng cách nhấn mốc trước bằng quá khứ hoàn thành.'),
  ],
  'past-habits': [
    c('Câu nào dùng would tự nhiên để kể một hành động lặp lại trong quá khứ?', ['Every summer, we would visit our grandparents.', 'When I was young, I would own a house.', 'I would living here as a child.'], 0, 'Would + V kể hành động lặp lại khi bối cảnh quá khứ đã rõ; với tình trạng sở hữu như own, dùng used to tự nhiên hơn.'),
    f('Điền dạng đúng: “I am used to ___ early.” (wake up)', ['waking up'], 'Be used to có to là giới từ, theo sau bởi V-ing.'),
  ],
  'future-forms': [
    c('Bạn đã hẹn gặp Hoa và đặt bàn cho tối mai. Câu nào nhấn cuộc hẹn cá nhân đã sắp xếp?', ["I'm meeting Hoa tomorrow; we've reserved a table.", 'The restaurant opens at seven tomorrow.', "I'll call Hoa now to arrange a meeting."], 0, 'Am meeting diễn tả cuộc hẹn đã chốt. Opens là lịch hoạt động của nhà hàng; will call nói quyết định liên hệ để sắp xếp, chưa phải cuộc hẹn đã có.'),
    c('Trong câu “I’ll answer it” nói ngay khi điện thoại vừa reo, will diễn tả điều gì?', ['Quyết định ngay lúc nói', 'Lịch trình cố định', 'Một trải nghiệm đã qua'], 0, 'I’ll = I will; người nói vừa quyết định nghe máy ở thời điểm nói.'),
    c('Bạn thông báo giờ tàu chạy theo bảng giờ, không nói kế hoạch đi tàu của mình. Câu nào phù hợp?', ['The train leaves at seven tomorrow.', "I'm taking the train at seven tomorrow.", "I'll take the train at seven tomorrow."], 0, 'Present simple leaves nêu lịch trình cố định của tàu; hai câu còn lại nói kế hoạch hoặc quyết định đi tàu của người nói.'),
  ],
  'future-continuous-perfect': [
    c('“At this time tomorrow” phù hợp nhất với cấu trúc nào khi nhấn quá trình?', ['will be working', 'had worked', 'has worked'], 0, 'Tương lai tiếp diễn nhìn vào một quá trình tại mốc tương lai.'),
    f('Dùng tương lai hoàn thành tiếp diễn của work để nhấn thời lượng: “By next June, she ___ here for ten years.”', ['will have been working'], 'Will have been working nhấn quá trình làm việc tích lũy đến mốc next June; will have worked cũng có thể nói về thời lượng nhưng không nhấn quá trình bằng dạng tiếp diễn.'),
  ],
  'gerund-infinitive': [
    c('“Stop to drink water” có nghĩa gì?', ['Ngừng uống nước', 'Dừng việc khác để uống nước', 'Không bao giờ uống nước'], 1, 'Stop to do là dừng lại để làm một việc khác.'),
    f('Điền dạng đúng: “I look forward to ___ you.” (meet)', ['meeting'], 'To trong look forward to là giới từ, theo sau bằng V-ing.'),
  ],
  'verb-complements': [
    c('Câu nào dùng đúng mẫu của give?', ['She gave Tom a book.', 'She gave to Tom a book.', 'She gave Tom to a book.'], 0, 'Give có thể nhận người nhận rồi vật: give somebody something.'),
    c('Trong “They called him a hero”, a hero giữ vai trò gì?', ['Bổ ngữ cho tân ngữ him', 'Chủ ngữ của câu', 'Trạng ngữ chỉ nơi chốn'], 0, 'A hero mô tả hoặc định danh tân ngữ him nên là bổ ngữ cho tân ngữ.'),
  ],
  'phrasal-verbs': [
    c('Cụm nào không tách được trong nghĩa “chăm sóc”?', ['turn off', 'look after', 'pick up'], 1, 'Look after giữ tân ngữ sau cả cụm: look after her.'),
    c('Bạn muốn nhờ tắt đèn bằng turn off, với tân ngữ là cụm danh từ “the light”. Câu nào phù hợp?', ['Please turn the light off.', 'Please turn off it.', 'Please turn the light.'], 0, 'Turn off là cụm tách được: có thể nói turn the light off hoặc turn off the light. Với đại từ it, phải nói turn it off như câu đầu bài. Turn the light thiếu off nên không diễn tả yêu cầu tắt đèn.'),
  ],
  'stative-verbs': [
    c('Trong câu nào have diễn tả hoạt động đang diễn ra?', ['I have a car.', 'I am having lunch.', 'I have two sisters.'], 1, 'Have lunch là hoạt động ăn trưa nên có thể dùng tiếp diễn.'),
    f('Tôi đang cân nhắc đề xuất này ngay lúc nói. Điền dạng của think: “I ___ about your proposal at the moment.”', ['am thinking'], 'Am thinking about diễn tả quá trình cân nhắc đang diễn ra; think trong “I think you are right” diễn tả ý kiến.'),
  ],
  'modal-ability': [
    c('Câu nào nhờ giúp đỡ lịch sự hơn?', ['Open the door.', 'Could you open the door?', 'You open the door.'], 1, 'Could you…? thường mềm hơn một mệnh lệnh trực tiếp.'),
    f('Điền cụm đúng: “After trying for hours, we ___ to fix it.” (thành công cụ thể trong quá khứ)', ['were able', 'managed'], 'Were able to và managed to đều có thể diễn tả một lần thành công cụ thể trong quá khứ.'),
  ],
  'modal-obligation': [
    c('“You must not enter” nghĩa là gì?', ['Bạn không cần vào', 'Bạn bị cấm vào', 'Bạn nên vào'], 1, 'Must not diễn tả cấm đoán, không phải thiếu nghĩa vụ.'),
    c('Câu nào đưa lời khuyên, thay vì diễn tả cấm đoán hoặc bắt buộc?', ['You should rest.', 'You must not rest.', 'You have to rest.'], 0, 'Should đưa lời khuyên; must not diễn tả cấm đoán và have to diễn tả sự cần thiết/bắt buộc.'),
  ],
  'modal-deduction': [
    c('Đèn sáng, bạn đoán có thể họ còn thức. Chọn câu.', ['They must not be awake.', 'They might be awake.', 'They cannot be awake.'], 1, 'Might diễn tả một khả năng chưa chắc chắn.'),
    f('Điền modal suy luận phủ định mạnh: “That ___ be true; I saw the opposite.”', ["can't", 'cannot'], 'Can’t/cannot diễn tả điều người nói suy luận là không thể đúng.'),
  ],
  'modal-perfect': [
    c('“He must have forgotten” nói về điều gì?', ['Nghĩa vụ trong tương lai', 'Suy luận mạnh về quá khứ', 'Lời khuyên hiện tại'], 1, 'Must have + V3 là suy luận mạnh về việc trước hiện tại.'),
    f('Điền dạng đúng: “She might ___ the bus.” (miss; suy đoán quá khứ)', ['have missed'], 'Sau might dùng have + V3 để suy đoán chuyện đã qua.'),
    c('Hôm qua cô ấy có vé miễn phí nhưng đã chọn ở nhà. Câu nào có thể nêu cơ hội đi mà không nhất thiết đánh giá việc ở nhà là sai?', ['She could have gone to the concert.', 'She must have gone to the concert.', 'She should have gone to the concert.'], 0, 'Could have gone có thể nêu cơ hội đã không dùng; must have gone trái với việc cô ấy ở nhà, còn should have gone đánh giá cô ấy lẽ ra nên đi.'),
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
    f('Điền đuôi hỏi: “They are not ready, ___?”', ['are they'], 'Mệnh đề chính phủ định với are thường có đuôi khẳng định are they.'),
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
    c('Nếu không biết trọng âm hay ngữ cảnh của “I only told Mai the news”, kết luận nào hợp lý?', ['Only luôn giới hạn hành động kể.', 'Phạm vi của only có thể thay đổi theo trọng âm và ngữ cảnh.', 'Only luôn giới hạn người được kể là Mai.'], 1, 'Vị trí của only gợi cách hiểu, nhưng trọng âm và ngữ cảnh có thể đổi phần được nhấn. Đặt only sát thành phần muốn giới hạn thường giúp câu rõ hơn.'),
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
    f('Điền từ quan hệ chỉ sở hữu: “The student ___ essay won the prize is in my class.”', ['whose'], 'Whose + noun diễn tả quan hệ sở hữu: bài luận của học sinh đó giành giải.'),
    o('Dựng câu có mệnh đề quan hệ xác định, lược đại từ quan hệ làm tân ngữ: “Cuốn sách tôi mua hôm qua rất hay.”', ['is', 'I', 'excellent', 'The book', 'bought yesterday'], 'The book I bought yesterday is excellent', 'I bought yesterday bổ nghĩa cho the book; book là tân ngữ của bought nên có thể lược which/that. Không lược đại từ quan hệ khi nó làm chủ ngữ.'),
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
    c('Lan nói chậm để mọi người hiểu. Câu nào diễn đạt mục đích của việc nói chậm?', ['Lan spoke slowly so that everyone could understand.', 'Lan spoke slowly because everyone understood.', 'Lan spoke slowly although everyone understood.'], 0, 'So that giới thiệu mục đích; because nêu nguyên nhân, although nêu nhượng bộ nên hai câu còn lại không diễn tả mục đích đã cho.'),
  ],
  'conditionals-basic': [
    c('“If you heat ice, it melts” diễn tả điều gì?', ['Giả định trái quá khứ', 'Quan hệ chung', 'Kế hoạch đã chốt'], 1, 'Hai vế hiện tại đơn thường dùng cho quy luật hoặc sự thật chung.'),
    f('Điền từ: “___ it rains, we will go.” (nếu không)', ['unless'], 'Unless gần nghĩa if…not trong điều kiện này.'),
    o('Sắp xếp lời cho phép: “Nếu bạn làm xong sớm, bạn có thể về.”', ['can leave', 'you', 'If', 'finish early,', 'you'], 'If you finish early, you can leave', 'If + hiện tại đơn nêu điều kiện có thể xảy ra; can leave nêu quyền được về, không phải dự đoán chắc chắn bằng will.'),
  ],
  'conditionals-unreal': [
    c('Câu nào là giả định hiện tại?', ['If I had more time, I would study.', 'If I have time, I will study.', 'If I had studied, I would have passed.'], 0, 'Quá khứ đơn trong mệnh đề if và would + V nói giả định hiện tại/tương lai.'),
    c('Câu nào nói một lựa chọn trong quá khứ khiến hiện tại khác đi?', ['If she had studied medicine, she would be a doctor now.', 'If she studies medicine, she will be a doctor.', 'If she had studied medicine, she would have become a doctor.'], 0, 'Điều kiện hỗn hợp dùng had + V3 cho giả định quá khứ và would + V cho kết quả hiện tại.'),
    f('Dùng dạng giả định trang trọng của be: “If I ___ you, I would ask for help.”', ['were'], 'Trong cách diễn đạt giả định trang trọng, dùng If I were you; was có thể gặp trong lời nói thân mật nhưng không phải dạng được yêu cầu ở đây.'),
  ],
  'participle-clauses': [
    c('Câu nào dùng phân từ hoàn thành để nhấn mạnh việc hoàn tất công việc trước khi về nhà?', ['Having finished her work, she went home.', 'Finishing her work, she went home.', 'Finished her work, she went home.'], 0, 'Having + V3 đánh dấu hành động hoàn tất trước hành động ở mệnh đề chính.'),
    f('Điền phân từ: “___ in 1900, the house is still beautiful.” (build)', ['built'], 'Built là V3 mang nghĩa bị động: ngôi nhà được xây.'),
  ],
  'linking-ideas': [
    c('Từ nào nêu kết quả của ý trước?', ['however', 'therefore', 'moreover'], 1, 'Therefore liên kết với kết quả hoặc kết luận.'),
    c('Câu nào đặt dấu câu đúng khi dùng however để nối hai mệnh đề độc lập?', ['It was raining; however, we went out.', 'It was raining, however, we went out.', 'It was raining; however; we went out.'], 0, 'Dấu chấm phẩy tách hai mệnh đề độc lập; dấu phẩy đặt sau trạng từ nối however.'),
  ],
  'passive': [
    c('Câu nào không thể đổi bị động theo mẫu thông thường?', ['Mai wrote the report.', 'The accident happened.', 'They built the bridge.'], 1, 'Happen không có tân ngữ trực tiếp để đưa lên làm chủ ngữ bị động.'),
    f('Điền dạng bị động: “The report ___ by Mai yesterday.” (write)', ['was written'], 'Quá khứ đơn bị động dùng was + V3 written.'),
  ],
  'passive-advanced': [
    c('Câu nào chuyển trọng tâm sang người nhận giải thưởng?', ['They gave her a prize.', 'She was given a prize.', 'A prize gave her.'], 1, 'Her trở thành chủ ngữ she trong bị động với give.'),
    c('Chuyển “People say she is honest” sang bị động tường thuật. Câu nào đúng?', ['She is said to be honest.', 'She said to be honest.', 'She is said being honest.'], 0, 'Mẫu bị động tường thuật là chủ ngữ + be said + to V.'),
  ],
  'causative': [
    c('Câu nào dùng đúng mẫu get + người + to V?', ['I got him to help me.', 'I got him help me.', 'I got him to helping me.'], 0, 'Với nghĩa thuyết phục hoặc nhờ ai làm việc gì, dùng get + người + to V.'),
    f('Điền dạng đúng: “The teacher made us ___ the essay.” (rewrite)', ['rewrite'], 'Sau make + người ở chủ động dùng động từ nguyên mẫu không to.'),
  ],
  'reported-speech': [
    c('Câu tường thuật mệnh lệnh đúng là câu nào?', ['She told me to wait.', 'She said me to wait.', 'She told to me wait.'], 0, 'Tell + người + to V là mẫu tường thuật lời yêu cầu/mệnh lệnh.'),
    c('Hôm qua Mai nói “I am tired”. Hôm nay hãy tường thuật với phép lùi thì thông thường. Chọn câu đúng.', ['Mai said she was tired.', 'Mai said she is tired yesterday.', 'Mai said that she tired.'], 0, 'Khi động từ tường thuật ở quá khứ, am thường lùi thành was; nếu tình trạng vẫn đúng hiện tại, is cũng có thể dùng trong ngữ cảnh khác.'),
  ],
  'emphasis': [
    c('Câu nào nhấn Mai là người gọi?', ['Mai called.', 'It was Mai who called.', 'Who called Mai?'], 1, 'It-cleft đặt Mai vào vị trí thông tin được nhấn mạnh.'),
    c('Bạn đính chính rằng cuộc gặp diễn ra vào thứ Hai. Câu nào dùng câu chẻ để nhấn rõ ngày gặp trong văn viết?', ['We met on Monday.', 'It was on Monday that we met.', 'It was Mai who called.'], 1, 'Câu chẻ It was on Monday that we met đặt on Monday làm trọng tâm; câu đầu không dùng câu chẻ, còn câu cuối nhấn người gọi. Trong lời nói, trọng âm cũng có thể nhấn Monday ở câu đầu.'),
  ],
  'inversion': [
    c('Câu nào là đảo ngữ điều kiện tương đương “If I had known…”?', ['Had I known…', 'Have I known…', 'Did I had known…'], 0, 'Had + chủ ngữ + V3 là một dạng đảo ngữ điều kiện trang trọng.'),
    f('Điền dạng đảo ngữ điều kiện trang trọng tương đương “If I were in your position”: “___ I in your position, I would ask for help.”', ['were'], 'Bỏ if trong mẫu trang trọng này và đảo were lên trước chủ ngữ I: Were I in your position. Dạng Had I known đã được kiểm tra ở câu trước.'),
  ],
  'wish-subjunctive': [
    c('“I wish I knew” nói về điều gì?', ['Tôi biết trong quá khứ', 'Hiện tại tôi không biết', 'Tôi chắc sẽ biết ngày mai'], 1, 'Dạng quá khứ sau wish diễn tả điều trái với thực tế hiện tại.'),
    f('Điền dạng giả định: “They suggested that he ___ present.” (be)', ['be', 'should be'], 'Sau suggest that có thể dùng nguyên mẫu be hoặc should be để diễn đạt lời đề nghị.'),
    c('Hàng xóm vẫn bật nhạc to vào ban đêm; bạn mong họ thay đổi hành vi từ nay. Câu nào phù hợp?', ['I wish they would turn the music down.', 'I wish they had turned the music down yesterday.', 'I wish I knew what music they liked.'], 0, 'Wish + would phù hợp với mong muốn người khác thay đổi hành vi đang lặp lại; had turned nói tiếc một lần trong quá khứ, knew nói thiếu thông tin hiện tại.'),
  ],
  'cleft-sentences': [
    c('Câu nào là câu giả chẻ dùng what?', ['What I need is a break.', 'I need a break.', 'What do I need?'], 0, 'What I need là mệnh đề mở đầu, a break là thông tin được nhấn ở cuối.'),
    f('Điền từ: “It was Mai ___ solved the problem.”', ['who', 'that'], 'Who hoặc that nối thành phần chỉ người được nhấn với phần còn lại.'),
  ],
  'nominalisation': [
    c('Câu nào dùng động từ trực tiếp, gọn hơn?', ['The team made an improvement to the process.', 'The team improved the process.', 'An improvement was made by the team.'], 1, 'Improved diễn đạt hành động rõ và gọn khi không cần biến sự cải thiện thành chủ đề.'),
    c('Câu nào dùng danh từ hóa để đưa quyết định thành chủ đề?', ['The decision to expand surprised the team.', 'The team decided to expand.', 'The team will decide soon.'], 0, 'Decision là danh từ hóa từ decide và giữ vai trò chủ ngữ của câu.'),
  ],
  'ellipsis-substitution': [
    c('“I hope so” dùng so thay cho gì?', ['Một mệnh đề đã rõ từ ngữ cảnh', 'Một danh từ số ít', 'Một giới từ'], 0, 'So có thể thay cho cả nội dung mệnh đề sau hope.'),
    f('Lược bỏ động từ swim đã rõ: “She can swim, and he ___ too.”', ['can'], 'Giữ lại trợ động từ can và lược bỏ swim để tránh lặp lại.'),
  ],
  'hedging-register': [
    c('Trong báo cáo học thuật, bằng chứng còn hạn chế. Cách diễn đạt nào vừa trang trọng vừa thận trọng?', ['The results may indicate a trend.', 'The results totally prove everything.', 'The results are, like, super clear.'], 0, 'May indicate dùng giọng trang trọng và mức chắc chắn phù hợp với bằng chứng hạn chế.'),
    f('Điền cụm thận trọng: “This approach is ___ to reduce costs.” (có khả năng)', ['likely'], 'Likely to diễn tả một kết quả có khả năng xảy ra, không khẳng định tuyệt đối.'),
  ],
  'punctuation': [
    c('Câu nào dùng dấu nháy đơn đúng để viết it is?', ["It's raining.", 'Its raining.', "Its' raining."], 0, "It's là dạng viết tắt của it is; its không có dấu nháy là tính từ sở hữu."),
    c('Câu nào đặt dấu hai chấm đúng để giới thiệu phần giải thích?', ['The plan was simple: leave before dawn.', 'The plan: was simple leave before dawn.', 'The plan was: simple leave before dawn.'], 0, 'Đặt dấu hai chấm sau mệnh đề hoàn chỉnh The plan was simple để giới thiệu phần giải thích.'),
  ],
}
