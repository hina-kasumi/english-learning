# Grammar Atlas

Kho ngữ pháp tiếng Anh bằng tiếng Việt. Người học có thể tìm và đọc bài theo chủ đề, hoặc đi theo roadmap từ nền tảng đến nâng cao. Bài học luôn mở, không bị khóa theo cấp độ.

## Chạy dự án

```bash
npm install
npm run dev
```

Kiểm tra trước khi bàn giao:

```bash
npm run build
npm run lint
```

## Cấu trúc nội dung

- `src/data/grammar.ts` chứa danh mục chủ đề, bài học, bài tập và roadmap.
- `src/data/more-exercises.ts` bổ sung hai câu thực hành cho mỗi bài, tạo thành ba câu mỗi bài.
- Mỗi bài có một `id` duy nhất và thuộc một nhóm chủ đề. Roadmap chỉ lưu danh sách `id` theo thứ tự học; một bài có thể xuất hiện ở nhiều chặng mà không nhân đôi nội dung.
- `prerequisites` liên kết đến bài nên biết trước. Hàm `validateContent()` kiểm tra liên kết và tính đầy đủ cơ bản của dữ liệu.

Tiến độ đã đọc, bài gần nhất và điểm tốt nhất được lưu trong `localStorage` của trình duyệt (`grammar-atlas-progress-v2`). Khi chuyển từ bản cũ, trang giữ bài đã đọc và bài gần nhất; điểm cũ được đặt lại vì mỗi bài nay có ba câu thay vì một. Dữ liệu chỉ nằm trên thiết bị đang dùng; xóa dữ liệu trang trong trình duyệt sẽ xóa tiến độ.
