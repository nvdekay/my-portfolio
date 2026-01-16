# 🌟 Modern AI-Powered Portfolio Website

![Status](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-18.1-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase&logoColor=white)
![Gemini AI](https://img.shields.io/badge/AI-Gemini_Pro-8E75B2?logo=google&logoColor=white)

> **Một website portfolio hiện đại, năng động và thông minh.**
> Được xây dựng với công nghệ mới nhất: React, TailwindCSS, Supabase và tích hợp AI Chatbot.

---

## 📖 Giới Thiệu (Overview)

Dự án này là một **Portfolio Cá Nhân Động (Dynamic Personal Portfolio)** giúp các lập trình viên giới thiệu bản thân, kỹ năng và dự án của mình một cách chuyên nghiệp. 

Không giống như các trang web tĩnh thông thường, toàn bộ nội dung của website này (bao gồm thông tin cá nhân, dự án, chứng chỉ, và kỹ năng) đều được quản lý thông qua **Database (Supabase)**. Điều này giúp bạn cập nhật portfolio của mình ngay lập tức mà không cần sửa code.

Đặc biệt, dự án tích hợp một **AI Chatbot thông minh** (sử dụng Google Gemini Pro), đóng vai trò như một trợ lý ảo trả lời các câu hỏi của nhà tuyển dụng hoặc khách ghé thăm về bạn 24/7.

---

## ✨ Tính Năng Nổi Bật (Features)

### 🎨 Giao Diện & Trải Nghiệm (UI/UX)
- **Thiết kế hiện đại**: Dark mode sang trọng, glassy effect (hiệu ứng kính), và typography tinh tế.
- **Hiệu ứng mượt mà**: Sử dụng **Framer Motion** và **AOS** cho các hiệu ứng xuất hiện, chuyển cảnh và scroll.
- **Responsive hoàn hảo**: Hiển thị đẹp mắt trên mọi thiết bị từ Mobile, Tablet đến Desktop.

### 🧠 AI Assistant (Chatbot)
- **Gemini Pro Integration**: Chatbot được tích hợp AI mạnh mẽ từ Google, có khả năng hiểu và trả lời tự nhiên.
- **Context-Aware**: Chatbot "học" thông tin từ database của bạn để trả lời chính xác về kỹ năng, dự án và kinh nghiệm của bạn.
- **Fallback thông minh**: Tự động chuyển sang chế độ trả lời theo kịch bản (Rule-based) nếu AI gặp sự cố.

### ⚡ Hệ Thống Dữ Liệu Động (Dynamic Data)
- **Quản lý tập trung**: Thay đổi nội dung hiển thị (Projects, Skills, Bio) trực tiếp từ Database.
- **Supabase Realtime**: Tốc độ tải dữ liệu cực nhanh và bảo mật.

### 🛠️ Các Tính Năng Khác
- **Email Contact Form**: Tích hợp **EmailJS** gửi email trực tiếp từ website.
- **Resume Viewer**: Xem và tải xuống CV dễ dàng.
- **Tối ưu hóa SEO**: Cấu trúc HTML chuẩn SEO.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

| Lĩnh Vực | Công Nghệ | Mô Tả |
| :--- | :--- | :--- |
| **Frontend** | ![React](https://img.shields.io/badge/-React-black?logo=react) | Thư viện UI chính |
| | ![Vite](https://img.shields.io/badge/-Vite-black?logo=vite) | Build tool siêu tốc |
| | ![Tailwind](https://img.shields.io/badge/-TailwindCSS-black?logo=tailwindcss) | Styling framework |
| | ![Framer Motion](https://img.shields.io/badge/-Framer_Motion-black?logo=framer) | Animation library |
| **Backend** | ![Supabase](https://img.shields.io/badge/-Supabase-black?logo=supabase) | Database (PostgreSQL) & Authentication |
| **AI** | ![Gemini](https://img.shields.io/badge/-Gemini_Pro-black?logo=google) | Generative AI Model |
| **Services** | ![EmailJS](https://img.shields.io/badge/-EmailJS-black?logo=gmail) | Dịch vụ gửi email |

---

## 📂 Cấu Trúc Dự Án (Project Structure)

```bash
my-portfolio/
├── public/                 # Tài nguyên tĩnh (Images, Icons)
├── src/
│   ├── components/         # Các thành phần giao diện tái sử dụng (Navbar, Cards...)
│   ├── hooks/              # Custom React Hooks (Logic xử lý dữ liệu, AI)
│   ├── lib/                # Cấu hình thư viện (Supabase client)
│   ├── pages/              # Các trang chính (Hero, About, Projects, Contact)
│   ├── services/           # Services gọi API (Chatbot, Contact)
│   ├── App.jsx             # Component gốc, quản lý Routing
│   └── main.jsx            # Entry point của ứng dụng
└── database_schema.sql     # Script SQL để khởi tạo database
```

---

## 🚀 Hướng Dẫn Cài Đặt (Getting Started)

Làm theo các bước sau để chạy dự án trên máy của bạn:

### 1️⃣ Điều Kiện Tiên Quyết
- **Node.js**: Phiên bản 18 trở lên.
- **Tài khoản Supabase**: Để tạo database.
- **Tài khoản Google AI Studio** (Optional): Để lấy API Key cho Chatbot.

### 2️⃣ Clone Dự Án
```bash
git clone https://github.com/nvdekay/my-portfolio.git
cd my-portfolio
```

### 3️⃣ Cài Đặt Thư Viện
```bash
npm install
```

### 4️⃣ Cấu Hình Môi Trường (.env)
Tạo file `.env` tại thư mục gốc và điền các thông tin sau:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Gemini AI (Optional - cho Chatbot)
VITE_GEMINI_API_KEY=your_gemini_api_key

# EmailJS (Optional - cho Contact Form)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 5️⃣ Thiết Lập Database
1.  Truy cập **Supabase Dashboard**.
2.  Vào mục **SQL Editor**.
3.  Copy toàn bộ nội dung trong file `database_schema.sql` của dự án.
4.  Paste vào SQL Editor và nhấn **Run** để tạo bảng và dữ liệu mẫu.

### 6️⃣ Chạy Dự Án
```bash
npm run dev
```
Truy cập: `http://localhost:5173`

---

## 📊 Database Schema (Cơ Sở Dữ Liệu)

Dự án sử dụng 5 bảng chính trong Supabase:

1.  **`profile`**: Chứa thông tin cá nhân duy nhất (Tên, Bio, Title...).
2.  **`content_blocks`**: Bảng đa năng lưu trữ Projects, Skills, Certificates, Roles (dùng cột `type` để phân loại).
3.  **`chat_data`**: Lưu lịch sử chat và Knowledge Base cho AI học.
4.  **`contact_messages`**: Lưu tin nhắn từ form liên hệ.
5.  **`site_settings`**: Các cài đặt cấu hình website (Ví dụ: Tiêu đề Hero, tốc độ gõ chữ...).

---

## 🤝 Đóng Góp (Contributing)

Mọi đóng góp đều được hoan nghênh! Nếu bạn muốn cải thiện dự án:

1.  Fork repository này.
2.  Tạo branch mới (`git checkout -b feature/AmazingFeature`).
3.  Commit thay đổi (`git commit -m 'Add some AmazingFeature'`).
4.  Push lên branch (`git push origin feature/AmazingFeature`).
5.  Tạo Pull Request.

---

## 👤 Tác Giả (Author)

**Nguyễn Vũ Đăng Khánh**

- **GitHub**: [@nvdekay](https://github.com/nvdekay)
- **Role**: Full Stack Developer

---

<p align="center">
  <i>Được xây dựng với niềm đam mê và ❤️. Nếu thấy dự án hữu ích, hãy tặng 1 ⭐ nhé!</i>
</p>
