# 🚀 Quick Reference - Database Schema

## 📊 Tables Overview

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| `profile` | Personal info (1 record) | name, email, avatar_url, resume_url |
| `content_blocks` | Universal content storage | type, title, url, metadata |
| `chat_data` | Chat history + KB | question, answer, keywords |
| `contact_messages` | Contact form messages | name, email, message |
| `site_settings` | Website config | setting_key, setting_value |

---

## 🏷️ Content Block Types

| Type | Usage | Metadata Example |
|------|-------|------------------|
| `project` | Projects | `{"type": "WEB", "demo_url": "...", "technologies": [...]}` |
| `skill` | Skills | `{"proficiency": "expert", "years_experience": 3}` |
| `certificate` | Certificates | `{"link": "...", "credential_id": "..."}` |
| `social` | Social links | `{"icon_url": "...", "platform": "GitHub"}` |
| `role` | Typing animation | None needed |

---

## ⚡ Quick SQL Queries

### Get all projects
```sql
SELECT * FROM content_blocks WHERE type = 'project' ORDER BY display_order;
```

### Get featured skills
```sql
SELECT * FROM content_blocks 
WHERE type = 'skill' AND is_featured = TRUE 
ORDER BY display_order;
```

### Get unread messages
```sql
SELECT * FROM contact_messages 
WHERE is_read = FALSE 
ORDER BY created_at DESC;
```

### Get active knowledge base
```sql
SELECT * FROM chat_data 
WHERE type = 'knowledge_base' AND is_active = TRUE;
```

### Update site setting
```sql
UPDATE site_settings 
SET setting_value = 'New Value' 
WHERE setting_key = 'hero_title';
```

---

## 🔌 React Hooks Usage

```jsx
// Profile & Personal Info
const { data: personalInfo } = usePersonalInfo()

// Social Links
const { data: socialLinks } = useSocialLinks()

// Skills
const { data: skills } = useSkills()

// Projects with Technologies
const { data: projects } = useProjectsWithTech()

// Certificates
const { data: certificates } = useCertificates()

// Site Settings
const { data: settings } = useSiteSettings()

// Roles for typing animation
const { data: roles } = useRoles()
```

---

## 📝 Common Operations

### Add new project
```sql
INSERT INTO content_blocks (type, title, description, url, metadata, display_order)
VALUES (
  'project',
  'Project Title',
  'Short description',
  '/assets/images/projects/image.png',
  '{
    "type": "WEB",
    "demo_url": "https://demo.com",
    "github_url": "https://github.com/...",
    "technologies": [
      {"id": 1, "name": "React", "color": "#61DAFB"},
      {"id": 2, "name": "Node.js", "color": "#339933"}
    ]
  }'::jsonb,
  999
);
```

### Add new skill
```sql
INSERT INTO content_blocks (type, title, subtitle, display_order, is_featured)
VALUES ('skill', 'TypeScript', 'Programming Language', 8, TRUE);
```

### Add chat knowledge
```sql
INSERT INTO chat_data (type, question, answer, category, keywords, is_active)
VALUES (
  'knowledge_base',
  'Bạn có kinh nghiệm gì?',
  'Tôi có 3 năm kinh nghiệm...',
  'experience',
  ARRAY['kinh nghiệm', 'experience'],
  TRUE
);
```

---

## 🎨 Frontend Data Access

### Projects
```jsx
const { data: projects } = useProjectsWithTech()

projects?.map(project => ({
  title: project.title,
  image: project.image_url,
  demoUrl: project.demo_url,
  githubUrl: project.github_url,
  type: project.type, // 'WEB', 'APP', 'AI', 'LANDING'
  technologies: project.technologies // Array of {id, name, color}
}))
```

### Skills grouped by category
```jsx
const { data: skills } = useSkills()

const grouped = skills?.reduce((acc, skill) => {
  if (!acc[skill.category]) acc[skill.category] = []
  acc[skill.category].push(skill.name)
  return acc
}, {})

// Result:
// {
//   "Frontend": ["React", "Vue"],
//   "Backend": ["Node.js", "Spring Boot"],
//   ...
// }
```

---

## 🔐 Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Optional
VITE_GEMINI_API_KEY=your_gemini_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 📊 Metadata JSON Examples

### Project metadata
```json
{
  "type": "WEB",
  "demo_url": "https://example.com",
  "github_url": "https://github.com/username/repo",
  "technologies": [
    {"id": 1, "name": "React", "color": "#61DAFB"},
    {"id": 2, "name": "TailwindCSS", "color": "#06B6D4"}
  ]
}
```

### Skill metadata
```json
{
  "proficiency": "expert",
  "years_experience": 3,
  "icon": "react-icon"
}
```

### Certificate metadata
```json
{
  "link": "https://coursera.org/verify/ABC123",
  "credential_id": "ABC123",
  "issue_date": "2024-01-15",
  "expiry_date": null
}
```

### Social metadata
```json
{
  "icon_url": "/assets/images/socials/github.svg",
  "platform": "GitHub",
  "username": "nvdekay"
}
```

---

## 🎯 Default Settings

```sql
INSERT INTO site_settings (setting_key, setting_value) VALUES
('hero_title', 'Hello, I am'),
('hero_subtitle', 'I am a'),
('typing_speed', '3000'),
('typing_delay', '2500'),
('about_title', 'About me'),
('projects_title', 'My Projects'),
('certificates_title', 'My Certificates');
```

---

## 🐛 Debug Commands

```sql
-- Check data in content_blocks by type
SELECT type, COUNT(*) FROM content_blocks GROUP BY type;

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'content_blocks';

-- View recent contact messages
SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 10;

-- Count chat interactions
SELECT COUNT(*) FROM chat_data WHERE type = 'chat_history';
```

---

## ⚠️ Important Notes

- `profile` table chỉ cho phép **1 record** (có constraint)
- `content_blocks.type` phải lowercase
- `metadata` phải là valid JSON
- `keywords` trong `chat_data` là PostgreSQL array
- Tất cả tables có RLS enabled
- Timestamps tự động update với triggers

---

**Last Updated:** 2024
**Version:** 2.0 (New Schema)
