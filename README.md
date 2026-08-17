# 🌏 VietTravel - Khám phá Việt Nam

VietTravel là website giới thiệu các địa điểm du lịch nổi bật tại Việt Nam, được xây dựng bằng HTML, CSS và JavaScript.

Website cho phép người dùng tìm kiếm, lọc và khám phá các địa điểm du lịch, đồng thời hỗ trợ lưu địa điểm yêu thích, xem thông tin chi tiết và mở vị trí trên Google Maps.

---

## ✨ Tính năng chính

### 🔎 Tìm kiếm địa điểm
- Tìm kiếm theo tên địa điểm, tỉnh/thành hoặc nội dung mô tả.
- Hỗ trợ tìm kiếm tiếng Việt không dấu.
- Hỗ trợ nhiều từ khóa.

Ví dụ:

```text
da lat
bien
quang ninh
pho co
```

---

### 🏙️ Lọc theo tỉnh/thành

Người dùng có thể chọn tỉnh/thành để chỉ hiển thị các địa điểm thuộc khu vực tương ứng.

---

### 🔤 Sắp xếp địa điểm

Hỗ trợ:

- Tên A → Z
- Tên Z → A

---

### ❤️ Địa điểm yêu thích

Người dùng có thể nhấn biểu tượng trái tim trên mỗi địa điểm để thêm hoặc xóa khỏi danh sách yêu thích.

Danh sách yêu thích được lưu bằng `localStorage`, vì vậy dữ liệu vẫn được giữ lại sau khi tải lại trang.

---

### ⭐ Rating và lượt yêu thích

Mỗi địa điểm hiển thị:

- ⭐ Điểm đánh giá
- ❤️ Lượt yêu thích

Dữ liệu được lấy từ file:

```text
data/location.json
```

---

### 📄 Phân trang

Danh sách địa điểm được chia thành nhiều trang để giao diện gọn gàng và dễ sử dụng hơn.

Mỗi trang hiển thị tối đa 6 địa điểm.

---

### 🎲 Gợi ý điểm đến

Nút **"Gợi ý cho tôi"** sẽ chọn ngẫu nhiên một địa điểm trong danh sách và mở thông tin chi tiết của địa điểm đó.

---

### 🗺️ Xem bản đồ

Trong cửa sổ thông tin chi tiết, người dùng có thể chọn:

```text
🗺️ Xem bản đồ
```

Website sẽ mở Google Maps và tìm kiếm vị trí của địa điểm tương ứng.

---

### 🌙 Dark Mode

Website hỗ trợ:

- ☀️ Light Mode
- 🌙 Dark Mode

Chế độ giao diện được lưu bằng `localStorage`.

---

### 📱 Responsive Design

Giao diện được tối ưu cho nhiều kích thước màn hình:

- Desktop
- Laptop
- Tablet
- Smartphone

---

### ✨ Scroll Animation

Các thành phần trên website sử dụng hiệu ứng xuất hiện khi người dùng cuộn trang.

Animation được xử lý bằng JavaScript `IntersectionObserver`.

---

### ⬆️ Back To Top

Khi người dùng cuộn xuống trang, nút quay lại đầu trang sẽ xuất hiện.

Nhấn nút để cuộn mượt về đầu trang.

---

## 🛠️ Công nghệ sử dụng

Project sử dụng:

- HTML5
- CSS3
- JavaScript
- JSON
- LocalStorage
- Intersection Observer API
- Google Maps Search

Project không sử dụng framework JavaScript bên ngoài.

---

## 📁 Cấu trúc thư mục

```text
VietNam Travel/
│
├── css/
│   └── style.css
│
├── data/
│   └── location.json
│
├── images/
│   │
│   ├── logo/
│   │   └── logo_icon.png
│   │
│   ├── halong.jpg
│   ├── hoian.jpg
│   ├── danang.jpg
│   ├── dalat.jpg
│   ├── phuquoc.jpg
│   ├── sapa.jpg
│   ├── trangan.jpg
│   ├── hue.jpg
│   ├── nhatrang.jpg
│   ├── muine.jpg
│   ├── phongnha.jpg
│   ├── hagiang.jpg
│   ├── hoankiem.jpg
│   ├── condao.jpg
│   └── baden.jpg
│
├── js/
│   └── app.js
│
├── index.html
│
└── README.md
```

---

## 🗺️ Các địa điểm hiện có

Website hiện có 15 địa điểm du lịch:

1. Vịnh Hạ Long
2. Phố cổ Hội An
3. Đà Nẵng
4. Đà Lạt
5. Phú Quốc
6. Sa Pa
7. Tràng An
8. Cố đô Huế
9. Nha Trang
10. Mũi Né
11. Phong Nha - Kẻ Bàng
12. Hà Giang
13. Hồ Hoàn Kiếm
14. Côn Đảo
15. Núi Bà Đen

---

## 🚀 Cách chạy project

### Cách 1 - Visual Studio Code + Live Server

Mở thư mục project bằng Visual Studio Code.

Sau đó mở:

```text
index.html
```

Chọn:

```text
Open with Live Server
```

Website sẽ chạy trên địa chỉ tương tự:

```text
127.0.0.1:5500/index.html
```

---

### Cách 2 - Web server khác

Có thể chạy project bằng bất kỳ local web server nào hỗ trợ file tĩnh.

Không nên mở trực tiếp `index.html` bằng `file://` vì JavaScript cần tải dữ liệu từ:

```text
data/location.json
```

---

## 📊 Dữ liệu địa điểm

Thông tin địa điểm được lưu trong:

```text
data/location.json
```

Ví dụ:

```json
{
    "id": 1,
    "name": "Vịnh Hạ Long",
    "province": "Quảng Ninh",
    "description": "Vịnh Hạ Long nổi tiếng với hàng nghìn đảo đá và cảnh quan thiên nhiên tuyệt đẹp.",
    "image": "halong.jpg",
    "rating": 4.9,
    "likes": 128
}
```

JavaScript sử dụng `fetch()` để đọc dữ liệu và tự động tạo các card địa điểm trên giao diện.

---

## 💾 LocalStorage

VietTravel sử dụng `localStorage` để lưu một số dữ liệu trên trình duyệt.

### Danh sách yêu thích

```text
favorites
```

### Giao diện sáng/tối

```text
theme
```

Nhờ đó dữ liệu vẫn được giữ lại sau khi người dùng tải lại website.

---

## 🎯 Mục tiêu project

Project được xây dựng nhằm thực hành các kiến thức:

- Xây dựng giao diện website bằng HTML và CSS
- Responsive Web Design
- DOM Manipulation
- JavaScript Event Handling
- Đọc dữ liệu JSON bằng Fetch API
- Tìm kiếm và lọc dữ liệu
- Sắp xếp dữ liệu
- Phân trang
- LocalStorage
- Modal
- Dark Mode
- Scroll Animation
- Tích hợp liên kết Google Maps

---

## 🔮 Hướng phát triển

Trong tương lai có thể bổ sung:

- Đăng nhập / đăng ký
- Tài khoản người dùng
- Đánh giá địa điểm
- Bình luận
- Hệ thống đặt tour
- Tìm kiếm nâng cao
- Bản đồ tương tác
- Backend và database
- Trang chi tiết riêng cho từng địa điểm

---

## 👨‍💻 Tác giả

Project: **VietTravel - Khám phá Việt Nam**

Năm thực hiện: **2026**

---

## 📌 Ghi chú

Đây là project website phục vụ mục đích học tập và thực hành lập trình web.