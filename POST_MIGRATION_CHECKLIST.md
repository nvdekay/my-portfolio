# ✅ POST-MIGRATION CHECKLIST

## 📋 Sau khi cập nhật code, làm theo checklist này:

---

## 1️⃣ Database Setup

### Bước 1: Tạo Database Schema
- [ ] Mở Supabase Dashboard
- [ ] Navigate to **SQL Editor**
- [ ] Copy toàn bộ nội dung `database_schema.sql`
- [ ] Paste vào SQL Editor
- [ ] Click **Run** để execute
- [ ] Kiểm tra logs, đảm bảo không có errors

### Bước 2: Verify Tables
- [ ] Mở **Table Editor** trong Supabase
- [ ] Confirm 5 tables đã được tạo:
  - `profile`
  - `content_blocks`
  - `chat_data`
  - `contact_messages`
  - `site_settings`

### Bước 3: Check Sample Data
- [ ] Table `profile` có 1 record
- [ ] Table `content_blocks` có sample data (roles, skills, social links)
- [ ] Table `site_settings` có settings
- [ ] Table `chat_data` có knowledge base entries

---

## 2️⃣ Environment Configuration

### Check .env.local file
- [ ] File `.env.local` exists trong root folder
- [ ] `VITE_SUPABASE_URL` được set
- [ ] `VITE_SUPABASE_ANON_KEY` được set
- [ ] (Optional) `VITE_GEMINI_API_KEY` được set
- [ ] (Optional) EmailJS keys được set

### Verify Environment
```bash
# Run this trong terminal
node -e "console.log(require('fs').readFileSync('.env.local', 'utf8'))"
```

- [ ] All keys có values
- [ ] No extra spaces hoặc quotes
- [ ] No syntax errors

---

## 3️⃣ Dependencies Check

### Install & Verify
```bash
npm install
```

- [ ] No errors during installation
- [ ] `node_modules` folder created
- [ ] `package-lock.json` updated

### Key Dependencies
- [ ] `@supabase/supabase-js`
- [ ] `react` và `react-dom`
- [ ] `framer-motion`
- [ ] `@fortawesome/react-fontawesome`
- [ ] `@emailjs/browser`

---

## 4️⃣ Start Development Server

```bash
npm run dev
```

### Initial Load Checks
- [ ] Server starts without errors
- [ ] No console errors về missing modules
- [ ] Vite dev server running on port 5173
- [ ] Hot reload working

---

## 5️⃣ Browser Testing

### Open http://localhost:5173

#### Hero Section
- [ ] Page loads successfully
- [ ] No console errors
- [ ] Personal info hiển thị (name, title)
- [ ] Avatar image loads
- [ ] Social links hiển thị
- [ ] Typing animation hoạt động
- [ ] Smooth scroll buttons work

#### About Section
- [ ] About image loads
- [ ] Bio text hiển thị
- [ ] Skills grouped by category
- [ ] Resume download button present

#### Projects Section
- [ ] Projects load từ database
- [ ] Filter buttons work (ALL, WEB, APP, etc.)
- [ ] Project cards hiển thị đầy đủ info
- [ ] Technologies tags hiển thị
- [ ] Demo/GitHub links work (if có)
- [ ] Pagination works (if có > 6 projects)

#### Certificates Section
- [ ] Certificates load từ database
- [ ] Certificate images hiển thị
- [ ] "View Certificate" buttons work
- [ ] Empty state shows nếu no certificates

#### Contact Section
- [ ] Form renders correctly
- [ ] All input fields work
- [ ] Submit button enabled
- [ ] Form validation works

#### Chatbot
- [ ] Chatbot button visible
- [ ] Click để open chatbot window
- [ ] Welcome message hiển thị
- [ ] Quick action buttons work
- [ ] Send message works
- [ ] Bot responds (rule-based or AI)

---

## 6️⃣ Functional Testing

### Test Database Operations

#### Test 1: Add New Project
```sql
INSERT INTO content_blocks (type, title, description, url, display_order)
VALUES ('project', 'Test Project', 'Test description', '/test.png', 999);
```
- [ ] Execute trong Supabase SQL Editor
- [ ] Refresh website
- [ ] New project hiển thị trong Projects section

#### Test 2: Add New Skill
```sql
INSERT INTO content_blocks (type, title, subtitle, display_order)
VALUES ('skill', 'Test Skill', 'Test Category', 999);
```
- [ ] Execute query
- [ ] Refresh website
- [ ] New skill hiển thị trong About section

#### Test 3: Submit Contact Form
- [ ] Fill out contact form
- [ ] Submit
- [ ] Check `contact_messages` table trong Supabase
- [ ] Verify new message was saved

#### Test 4: Chat with Bot
- [ ] Open chatbot
- [ ] Ask: "Kỹ năng của bạn là gì?"
- [ ] Bot responds với relevant answer
- [ ] Check `chat_data` table (if saving history)

---

## 7️⃣ Console Checks

### Browser Console (F12)

#### No Critical Errors
- [ ] No "Missing Supabase environment variables"
- [ ] No "Failed to fetch" errors
- [ ] No "Cannot read properties of undefined"

#### Expected Logs
- [ ] "✅ Supabase connection successful!" (if testConnection runs)
- [ ] Component render logs (if any)

#### Network Tab
- [ ] Check Supabase API calls
- [ ] All requests return 200 OK
- [ ] No 401 Unauthorized errors
- [ ] No 500 Server errors

---

## 8️⃣ Performance Testing

### Loading Speed
- [ ] Initial page load < 3 seconds
- [ ] Images load progressively
- [ ] No layout shift during load

### Animations
- [ ] Smooth scroll animations
- [ ] Framer Motion transitions smooth
- [ ] No janky animations
- [ ] Typing animation smooth

### Responsiveness
- [ ] Test on mobile size (375px)
- [ ] Test on tablet size (768px)
- [ ] Test on desktop size (1920px)
- [ ] All sections responsive
- [ ] No horizontal scroll

---

## 9️⃣ Cross-Browser Testing

### Desktop Browsers
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (if available)

### Mobile Browsers
- [ ] Chrome Mobile
- [ ] Safari Mobile
- [ ] Samsung Internet (if available)

---

## 🔟 Production Build Test

### Build Production
```bash
npm run build
```

- [ ] Build completes without errors
- [ ] `dist` folder created
- [ ] No TypeScript errors (if using TS)
- [ ] No ESLint errors

### Preview Production
```bash
npm run preview
```

- [ ] Preview server starts
- [ ] Website works same as dev
- [ ] No console errors
- [ ] Assets load correctly

---

## 1️⃣1️⃣ Optional Enhancements

### Upload Real Images
- [ ] Upload avatar to Supabase Storage
- [ ] Upload project images
- [ ] Upload certificate images
- [ ] Update URLs trong database

### Add Real Data
- [ ] Replace sample projects với real projects
- [ ] Add all real skills
- [ ] Add all certificates
- [ ] Update bio và personal info

### Setup EmailJS (if not done)
- [ ] Create EmailJS account
- [ ] Create email service
- [ ] Create email template
- [ ] Get Service ID, Template ID, Public Key
- [ ] Update .env.local
- [ ] Test contact form email

### Setup Gemini AI (if not done)
- [ ] Get Gemini API key
- [ ] Add to .env.local
- [ ] Test chatbot với AI responses

---

## 1️⃣2️⃣ Security Checks

### Environment Variables
- [ ] `.env.local` trong `.gitignore`
- [ ] No sensitive keys trong code
- [ ] No keys trong git history

### Supabase RLS
- [ ] Check RLS policies enabled
- [ ] Test anon user can read data
- [ ] Test anon user cannot update sensitive data
- [ ] Contact form can insert messages

---

## 1️⃣3️⃣ Documentation Review

### Read Documentation
- [ ] Read `MIGRATION_GUIDE.md`
- [ ] Read `QUICK_REFERENCE.md`
- [ ] Understand database schema
- [ ] Know how to add new content

### Keep for Future
- [ ] Bookmark documentation files
- [ ] Save SQL snippets
- [ ] Note common issues/solutions

---

## ✅ Final Verification

### Overall System Check
- [ ] All pages load without errors
- [ ] All features work as expected
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Mobile responsive
- [ ] Ready for deployment

---

## 🎉 Congratulations!

If tất cả checkboxes đều ✅, bạn đã hoàn thành migration thành công!

### Next Steps:
1. **Deploy to Production**
   - Vercel, Netlify, hoặc hosting khác
   - Update environment variables on hosting platform

2. **Monitor & Maintain**
   - Check Supabase logs
   - Monitor error rates
   - Update content regularly

3. **Optimize**
   - Add more projects
   - Improve chatbot knowledge base
   - Add analytics (Google Analytics, etc.)

---

**Need help?** Review troubleshooting section trong `MIGRATION_GUIDE.md`

**Found a bug?** Check console errors và Supabase logs first.

---

**Status:** 🚀 Ready to go live!
