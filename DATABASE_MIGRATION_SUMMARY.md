# Database Schema Migration Summary

## ✅ Đã cập nhật (Completed):

### 1. **supabase.js**
- Thay đổi test connection từ `personal_info` → `profile`

### 2. **usePortfolioData.js**
- `usePersonalInfo()`: `personal_info` → `profile`
- `useSocialLinks()`: `social_links` → `content_blocks` (type='social')
- `useRoles()`: `roles` → `content_blocks` (type='role')
- `useSkills()`: `skills` → `content_blocks` (type='skill')
- `useProjects()`: `projects` → `content_blocks` (type='project')
- `useCertificates()`: `certificates` → `content_blocks` (type='certificate')
- Giữ nguyên `useSiteSettings()` (table vẫn là `site_settings`)
- `useProjectsWithTech()`: transformed từ `content_blocks`

### 3. **useProjectsWithTech.js**
- Fetch từ `content_blocks` với type='project'
- Parse `metadata` field để lấy `technologies`, `demo_url`, `github_url`, `type`

### 4. **chatbotService.js**  
- `getPortfolioContext()`: Updated để fetch từ `profile` và `content_blocks`
- `saveChatHistory()`: Lưu vào `chat_data` thay vì `chat_history`
- Map `chat_data` → `knowledgeBase` format

### 5. **Certificates.jsx**
- Sử dụng `useCertificates()` hook thay vì hardcoded data
- Hiển thị dữ liệu dynamic từ database

### 6. **contactService.js** (NEW)
- Service để lưu contact messages vào `contact_messages` table
- Methods: saveContactMessage, getAllMessages, markAsRead

### 7. **Contact.jsx**
- Import ContactService
- Lưu messages vào Supabase trước khi gửi email

---

## Database Schema Mới (From Image):

### Tables:
1. **profile** - Thông tin cá nhân
   - id, name, display_name, brand_name, title, bio, email, phone, location
   - avatar_url, about_image_url, resume_url, resume_filename
   - website_last_updated, birth_year, start_career_year
   - education_level, relationship_status, hobbies, social_links, navigation
   - created_at, updated_at

2. **content_blocks** - Universal content storage
   - id, type (VARCHAR) - 'project', 'skill', 'certificate', 'social', 'role', etc.
   - title, subtitle, description, long_description
   - url (JSONB) - for images, links, etc.
   - metadata (JSONB) - flexible data storage
   - is_featured, display_order
   - created_at, updated_at

3. **chat_data** - Chat & Knowledge Base
   - id, type, session_id (UUID)
   - question, answer, user_message, bot_response
   - response_time_ms, category, keywords (text array)
   - is_active
   - created_at, updated_at

4. **contact_messages** - Contact form submissions
   - id, name, email, message
   - is_read, replied_at
   - created_at

5. **site_settings** - Site configuration
   - id, setting_key, setting_value, description
   - created_at, updated_at

---

## Migration Benefits:

✅ **Simplified Schema**: Giảm từ ~10 tables xuống 5 tables
✅ **Flexible**: `content_blocks` với JSONB metadata cho phép mở rộng dễ dàng
✅ **Maintainable**: Dễ quản lý và cập nhật
✅ **Type-safe**: Sử dụng `type` field để phân loại content
✅ **Scalable**: Có thể thêm content types mới mà không cần alter schema

---

## Lưu ý khi setup database:

### content_blocks.metadata examples:

**For Projects:**
```json
{
  "type": "WEB|APP|AI|LANDING",
  "demo_url": "https://...",
  "github_url": "https://...",
  "technologies": [
    {"id": 1, "name": "React", "color": "#61DAFB"},
    {"id": 2, "name": "Node.js", "color": "#339933"}
  ]
}
```

**For Skills:**
```json
{
  "proficiency": "expert|intermediate|beginner",
  "years_experience": 3
}
```

**For Certificates:**
```json
{
  "link": "https://...",
  "credential_id": "ABC123",
  "issue_date": "2024-01-01"
}
```

**For Social Links:**
```json
{
  "icon_url": "https://...",
  "platform": "GitHub|LinkedIn|Facebook..."
}
```
