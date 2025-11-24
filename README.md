# 🌟 Portfolio Website - Full Stack Developer

Modern, responsive portfolio website built with React, TailwindCSS, and Supabase.

![Portfolio Preview](public/assets/images/avatars/avthero.jpg)

## ✨ Features

- 🎨 **Modern UI/UX** - Beautiful, responsive design với animations
- 💬 **AI Chatbot** - Intelligent assistant powered by Gemini AI
- 📧 **Contact Form** - Integrated với EmailJS và Supabase
- 🗄️ **Dynamic Content** - All content managed via Supabase database
- 🚀 **Fast Performance** - Built với Vite và optimized assets
- 📱 **Mobile Responsive** - Perfect trên mọi devices
- 🎭 **Smooth Animations** - Framer Motion animations throughout

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Font Awesome** - Icons
- **AOS** - Scroll animations

### Backend & Services
- **Supabase** - Database & Auth
- **EmailJS** - Email service
- **Gemini AI** - Chatbot intelligence

## 📂 Project Structure

```
my-portfolio/
├── public/                 # Static assets
│   └── assets/
│       ├── images/         # Images (avatars, projects, etc.)
│       └── resume/         # CV/Resume files
├── src/
│   ├── components/         # Reusable components
│   │   ├── ErrorMessage.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── Navbar.jsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useChatbot.js
│   │   ├── usePortfolioData.js
│   │   ├── useProjectsWithTech.js
│   │   ├── useSupabaseQuery.js
│   │   └── useTypedText.js
│   ├── lib/                # Libraries & utilities
│   │   └── supabase.js
│   ├── pages/              # Page components
│   │   ├── About.jsx
│   │   ├── Certificates.jsx
│   │   ├── Chatbot.jsx
│   │   ├── Contact.jsx
│   │   ├── Hero.jsx
│   │   ├── Landing.jsx
│   │   └── Projects.jsx
│   ├── services/           # API services
│   │   ├── chatbotService.js
│   │   └── contactService.js
│   ├── types/              # TypeScript definitions
│   │   └── database.ts
│   ├── App.jsx             # Main app component
│   ├── index.css           # Global styles
│   └── main.jsx            # Entry point
├── database_schema.sql     # Database setup SQL
├── MIGRATION_GUIDE.md      # Migration instructions
├── QUICK_REFERENCE.md      # Quick reference guide
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ và npm/yarn
- Supabase account
- EmailJS account (optional)
- Gemini API key (optional, for AI chatbot)

### Installation

1. **Clone repository**
```bash
git clone https://github.com/nvdekay/my-portfolio.git
cd my-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**

Create `.env.local` file:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Optional
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

4. **Setup Database**

- Open Supabase Dashboard
- Go to SQL Editor
- Copy và run `database_schema.sql`
- Verify tables created successfully

5. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:5173`

## 📊 Database Schema

### Tables:
- **`profile`** - Personal information (1 record only)
- **`content_blocks`** - Universal content storage (projects, skills, certificates, etc.)
- **`chat_data`** - Chat history và knowledge base
- **`contact_messages`** - Messages từ contact form
- **`site_settings`** - Website configuration

📖 **Detailed documentation:** See `MIGRATION_GUIDE.md` và `QUICK_REFERENCE.md`

## 🎨 Content Management

### Adding new content qua SQL:

**Add Project:**
```sql
INSERT INTO content_blocks (type, title, description, url, metadata, display_order)
VALUES (
  'project',
  'My Project',
  'Description...',
  '/assets/images/projects/project.png',
  '{"type": "WEB", "demo_url": "https://...", "technologies": [...]}'::jsonb,
  1
);
```

**Add Skill:**
```sql
INSERT INTO content_blocks (type, title, subtitle, display_order)
VALUES ('skill', 'React', 'Frontend', 1);
```

**Update Settings:**
```sql
UPDATE site_settings 
SET setting_value = 'New Value' 
WHERE setting_key = 'hero_title';
```

## 🔧 Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📱 Features Breakdown

### 🏠 Hero Section
- Dynamic personal info từ database
- Typing animation với multiple roles
- Social media links
- Smooth scroll navigation

### 👤 About Section
- Personal bio và information
- Skills grouped by category
- Resume download button
- Animated entrance effects

### 💼 Projects Section
- Dynamic project cards
- Filter by type (WEB, APP, AI, LANDING)
- Pagination support
- Technology tags với colors
- Demo và GitHub links

### 🎓 Certificates Section
- Certificate cards với images
- External links để verify
- Issuer information
- Dynamic loading từ database

### 📧 Contact Section
- Contact form với validation
- Save messages vào database
- EmailJS integration
- Success/error feedback

### 💬 AI Chatbot
- Floating chatbot button
- Knowledge base từ database
- Gemini AI integration
- Chat history tracking
- Quick action suggestions

## 🎯 Customization

### Colors
Edit `tailwind.config.js` để thay đổi color scheme.

### Content
Update database qua Supabase Dashboard hoặc SQL.

### Styles
Modify component styles trong respective `.jsx` files.

## 📝 Documentation Files

- `MIGRATION_GUIDE.md` - Step-by-step migration guide
- `DATABASE_MIGRATION_SUMMARY.md` - Schema changes overview
- `QUICK_REFERENCE.md` - Quick SQL queries và examples
- `COMPLETED_MIGRATION.md` - Migration completion status
- `database_schema.sql` - Complete database setup

## 🐛 Troubleshooting

### Common Issues:

**"Missing Supabase environment variables"**
- Check `.env.local` file exists và có đúng format
- Restart dev server sau khi update env

**"Failed to fetch data"**
- Verify Supabase RLS policies
- Check anon role permissions
- Confirm tables exist

**"Technologies không hiển thị"**
- Check `metadata` field có valid JSON
- Ensure `technologies` là array

See `MIGRATION_GUIDE.md` for more troubleshooting tips.

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 👤 Author

**Nguyễn Vũ Đăng Khánh**
- GitHub: [@nvdekay](https://github.com/nvdekay)
- Email: your-email@example.com

## 🙏 Acknowledgments

- Supabase team for amazing BaaS platform
- Framer Motion for smooth animations
- TailwindCSS for utility-first CSS
- React community for excellent ecosystem

---

**⭐ If you find this project helpful, please give it a star!**

Built with ❤️ using React + Vite + Supabase
