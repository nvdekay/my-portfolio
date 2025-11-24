# 🚀 Database Migration Guide

## Hướng dẫn chuyển đổi Database Schema

### Bước 1: Backup Database hiện tại (NẾU CÓ)
```bash
# Trong Supabase Dashboard -> SQL Editor
# Export data từ các bảng cũ nếu cần
```

### Bước 2: Chạy SQL Script
1. Mở Supabase Dashboard
2. Vào **SQL Editor**
3. Copy nội dung từ file `database_schema.sql`
4. Paste và chạy script
5. Kiểm tra logs để đảm bảo không có lỗi

### Bước 3: Cập nhật Environment Variables
Đảm bảo file `.env.local` có đầy đủ:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_GEMINI_API_KEY=your_gemini_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Bước 4: Install Dependencies (nếu cần)
```bash
npm install
```

### Bước 5: Test Connection
```bash
npm run dev
```

Kiểm tra console browser để xem kết nối Supabase thành công chưa.

---

## 📊 Cấu trúc Database Mới

### 1. `profile` Table
Lưu thông tin cá nhân (chỉ 1 record)

**Key fields:**
- `name`, `display_name`, `title`, `bio`, `email`, `phone`
- `avatar_url`, `about_image_url`, `resume_url`
- `social_links` (JSONB), `navigation` (JSONB)

### 2. `content_blocks` Table
Universal storage cho tất cả content types

**Types hỗ trợ:**
- `'project'` - Dự án
- `'skill'` - Kỹ năng
- `'certificate'` - Chứng chỉ
- `'social'` - Social links
- `'role'` - Roles cho typing animation

**Key fields:**
- `type` (VARCHAR) - Phân loại content
- `title`, `subtitle`, `description`, `long_description`
- `url` (TEXT) - Image/link URL
- `metadata` (JSONB) - Dữ liệu linh hoạt
- `is_featured`, `display_order`

**Metadata examples:**
```json
// For projects
{
  "type": "WEB",
  "demo_url": "https://...",
  "github_url": "https://...",
  "technologies": [
    {"id": 1, "name": "React", "color": "#61DAFB"}
  ]
}

// For skills
{
  "proficiency": "expert",
  "years_experience": 3
}

// For certificates
{
  "link": "https://coursera.org/...",
  "credential_id": "ABC123"
}

// For social links
{
  "icon_url": "/assets/images/socials/github.svg",
  "platform": "GitHub"
}
```

### 3. `chat_data` Table
Chat history + Knowledge base

**Key fields:**
- `type` - 'chat_history' hoặc 'knowledge_base'
- `session_id` (UUID)
- `question`, `answer`
- `user_message`, `bot_response`
- `category`, `keywords` (text array)
- `is_active`

### 4. `contact_messages` Table
Lưu tin nhắn từ contact form

**Key fields:**
- `name`, `email`, `message`
- `is_read`, `replied_at`
- `created_at`

### 5. `site_settings` Table
Cấu hình website

**Key fields:**
- `setting_key` (UNIQUE)
- `setting_value`
- `description`

**Common settings:**
- `hero_title`, `hero_subtitle`
- `about_title`
- `projects_title`, `projects_subtitle`
- `certificates_title`, `certificates_subtitle`
- `typing_speed`, `typing_delay`
- `hero_image_left`, `hero_image_right`

---

## 🔧 Cách thêm dữ liệu mới

### Thêm Project mới
```sql
INSERT INTO content_blocks (type, title, description, url, metadata, display_order, is_featured)
VALUES (
  'project',
  'My Awesome Project',
  'Short description',
  '/assets/images/projects/awesome.png',
  '{
    "type": "WEB",
    "demo_url": "https://demo.com",
    "github_url": "https://github.com/...",
    "technologies": [
      {"id": 1, "name": "React", "color": "#61DAFB"},
      {"id": 2, "name": "Node.js", "color": "#339933"}
    ]
  }'::jsonb,
  999,
  TRUE
);
```

### Thêm Skill mới
```sql
INSERT INTO content_blocks (type, title, subtitle, display_order, is_featured)
VALUES ('skill', 'Next.js', 'Frontend Framework', 7, TRUE);
```

### Thêm Certificate mới
```sql
INSERT INTO content_blocks (type, title, subtitle, description, url, metadata, display_order)
VALUES (
  'certificate',
  'AWS Certified Developer',
  'Amazon Web Services',
  'AWS certification for cloud development',
  '/assets/images/certificates/aws.png',
  '{"link": "https://...", "credential_id": "AWS123"}'::jsonb,
  2
);
```

### Thêm Social Link mới
```sql
INSERT INTO content_blocks (type, title, url, metadata, display_order)
VALUES (
  'social',
  'Twitter',
  'https://twitter.com/username',
  '{"icon_url": "/assets/images/socials/twitter.svg", "platform": "Twitter"}'::jsonb,
  4
);
```

### Thêm Chat Knowledge
```sql
INSERT INTO chat_data (type, question, answer, category, keywords, is_active)
VALUES (
  'knowledge_base',
  'Bạn có kinh nghiệm gì?',
  'Tôi có 3 năm kinh nghiệm làm Full Stack Developer...',
  'experience',
  ARRAY['kinh nghiệm', 'experience', 'work'],
  TRUE
);
```

### Cập nhật Site Settings
```sql
UPDATE site_settings 
SET setting_value = 'New Title' 
WHERE setting_key = 'hero_title';
```

---

## 🎯 Testing Checklist

- [ ] Kết nối Supabase thành công
- [ ] Hero section hiển thị đúng thông tin từ `profile`
- [ ] Social links hiển thị từ `content_blocks`
- [ ] Typing animation hoạt động với `roles`
- [ ] Skills hiển thị theo categories
- [ ] Projects hiển thị với filters và pagination
- [ ] Certificates load từ database
- [ ] Contact form lưu vào `contact_messages`
- [ ] Chatbot sử dụng knowledge base từ `chat_data`
- [ ] Site settings áp dụng đúng

---

## 🐛 Troubleshooting

### Lỗi: "Missing Supabase environment variables"
- Kiểm tra file `.env.local` có đúng format không
- Restart dev server sau khi thay đổi env

### Lỗi: "Failed to fetch data"
- Kiểm tra RLS policies trong Supabase
- Đảm bảo `anon` role có quyền SELECT

### Lỗi: "Cannot read properties of undefined"
- Data chưa load xong, kiểm tra loading states
- Thêm optional chaining `?.` khi access nested data

### Projects không hiển thị technologies
- Kiểm tra `metadata` field có đúng format JSON không
- Đảm bảo `technologies` là array trong metadata

---

## 📝 Notes

- `profile` table chỉ cho phép **1 record duy nhất** (có constraint)
- `content_blocks.metadata` là JSONB nên rất linh hoạt
- `chat_data.keywords` dùng PostgreSQL array type
- Tất cả tables có RLS enabled để bảo mật
- Timestamps tự động update với trigger

---

## 🎨 Frontend Components đã cập nhật

- ✅ `Hero.jsx` - Fetch từ profile và content_blocks
- ✅ `About.jsx` - Group skills by category
- ✅ `Projects.jsx` - Filter và pagination với metadata
- ✅ `Certificates.jsx` - Dynamic từ content_blocks
- ✅ `Contact.jsx` - Lưu vào contact_messages
- ✅ `Chatbot.jsx` - Sử dụng chat_data knowledge base

---

## 🚀 Next Steps

1. Upload images vào Supabase Storage
2. Cập nhật URLs trong database
3. Thêm dữ liệu thực tế
4. Test toàn bộ chức năng
5. Deploy lên production

---

**Need help?** Check `DATABASE_MIGRATION_SUMMARY.md` for detailed changes.
