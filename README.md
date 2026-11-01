# Đi Chùa Online

App không gian thư giãn có chánh điện 3D để live TikTok. Người xem gõ `adidaphat` là có nhân vật mang tên và avatar TikTok của họ đi lên dâng hương. Ai tặng quà thì sen vàng nở và cánh sen hồng rơi khắp chùa, giọng đọc gọi tên cảm ơn và gửi lời chúc. Thả đủ tim thì mưa hoa.

Đây là không gian thư giãn mang tính giải trí, không phải chùa và không đại diện cho tổ chức tôn giáo nào. Quà tặng chỉ để nhận lời chúc, không phải tiền cúng dường hay để cầu may.

## Tính năng

- Nhân vật 3D lên dâng hương khi người xem gõ `adidaphat` hoặc tặng quà, tối đa 5 người cùng lúc, người sau xếp hàng chờ.
- Hội trường hơn trăm phật tử ngồi kín hai bên lối đi, mỗi người tự lạy lệch nhịp nhau. Người xem mới vào được ngồi vào hội trường, có avatar trên đầu.
- Hiệu ứng quà theo giá trị: quà càng lớn thì sen vàng càng chói, cánh hoa rơi càng nhiều.
- Thanh tim: đủ 666 tim là mưa hoa 60 giây.
- Bảng công đức top 10: 1 comment được 1 điểm, 1 xu quà được 10 điểm.
- Giọng đọc tiếng Việt chào người mới vào, cảm ơn người tặng quà, chúc theo điều người xem cầu trong comment, và tự chúc khi live im lặng.
- Nhạc nền, bài thuyết giảng bật bằng tay, chuông, mõ, thi thoảng có hạc bay ngang.
- Từ cấm được lọc khỏi tên và comment trước khi hiện hay đọc.

## Cần có

- Máy tính Windows có card đồ họa tương đối (để chạy nhân vật 3D).
- [Node.js](https://nodejs.org) bản LTS.
- TikTok LIVE Studio, đăng nhập tài khoản sẽ live.
- Internet (giọng đọc, font chữ và tên miền `lvh.me` cần mạng).

## Chạy app

1. Tải về: nút **Code → Download ZIP** rồi giải nén, hoặc `git clone` repo này.
2. Bấm đúp `BAT-LIVE.bat`. Lần đầu nó tự cài thư viện (1–2 phút), sau đó mở trang điều khiển ở `http://localhost:3000`.
3. Trong TikTok LIVE Studio, thêm nguồn **Link**:
   - Link: `http://lvh.me:3000/?view=stage`
   - Kích thước: 1080 × 1920
4. Bắt đầu live, rồi ở trang điều khiển nhập username TikTok của bạn (không cần @) và bấm kết nối.

Giữ cửa sổ `BAT-LIVE.bat` mở suốt buổi live, đóng nó là tắt app. Chỉ trang trong LIVE Studio phát tiếng; trang điều khiển im lặng, nên mở bao nhiêu tab điều khiển cũng không bị hai giọng. Đừng mở thêm link `?view=stage` ở trình duyệt khác trong lúc live, vì mỗi trang stage đều phát tiếng.

`BAT-LIVE.bat` chạy ở chế độ live: sửa code không làm trang stage tự tải lại. Muốn trang nhận bản mới thì bấm làm mới nguồn Link trong LIVE Studio.

## Ghi chú

- `lvh.me` là tên miền công khai trỏ về chính máy của bạn (127.0.0.1). LIVE Studio không nhận `localhost`, nên app dùng tên này.
- Không cần file `.env`. Khóa Gemini (`GEMINI_API_KEY`) chỉ dùng cho một tính năng phụ trong trang điều khiển.
- Điểm công đức, thanh tim và người trong hội trường chỉ lưu trong trang stage. Tải lại trang là đếm lại từ đầu.
- Giọng đọc dùng Edge TTS (giọng `vi-VN-NamMinhNeural`), lỗi thì chuyển sang giọng Google.
