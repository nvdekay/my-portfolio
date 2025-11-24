-- ============================================
-- Portfolio Database Schema - New Version
-- ============================================

-- 1. Profile Table
CREATE TABLE IF NOT EXISTS profile (
    id INT4 PRIMARY KEY DEFAULT 1,
    name VARCHAR NOT NULL,
    display_name VARCHAR,
    brand_name VARCHAR,
    title VARCHAR,
    bio TEXT,
    email VARCHAR,
    phone VARCHAR,
    location VARCHAR,
    avatar_url TEXT,
    about_image_url TEXT,
    resume_url TEXT,
    resume_filename VARCHAR,
    website_last_updated DATE,
    birth_year INT4,
    start_career_year INT4,
    education_level VARCHAR,
    relationship_status VARCHAR,
    hobbies TEXT,
    social_links JSONB,
    navigation JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CHECK (id = 1) -- Ensure only one profile record
);

-- 2. Content Blocks Table (Universal Content Storage)
CREATE TABLE IF NOT EXISTS content_blocks (
    id SERIAL PRIMARY KEY,
    type VARCHAR NOT NULL, -- 'project', 'skill', 'certificate', 'social', 'role', etc.
    title VARCHAR NOT NULL,
    subtitle VARCHAR,
    description TEXT,
    long_description TEXT,
    url TEXT, -- for images, external links, etc.
    metadata JSONB, -- flexible JSON data for type-specific fields
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT4 DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on type for faster queries
CREATE INDEX IF NOT EXISTS idx_content_blocks_type ON content_blocks(type);
CREATE INDEX IF NOT EXISTS idx_content_blocks_display_order ON content_blocks(display_order);

-- 3. Chat Data Table (Chat History + Knowledge Base)
CREATE TABLE IF NOT EXISTS chat_data (
    id SERIAL PRIMARY KEY,
    type VARCHAR, -- 'chat_history', 'knowledge_base', etc.
    session_id UUID,
    question TEXT,
    answer TEXT,
    user_message TEXT,
    bot_response TEXT,
    response_time_ms INT4,
    category VARCHAR,
    keywords TEXT[], -- PostgreSQL array type
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_data_session ON chat_data(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_data_type ON chat_data(type);

-- 4. Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    replied_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at DESC);

-- 5. Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Sample Data Insert
-- ============================================

-- Insert Profile (only one record allowed)
INSERT INTO profile (
    name,
    display_name,
    brand_name,
    title,
    bio,
    email,
    phone,
    location,
    avatar_url,
    about_image_url,
    resume_url
) VALUES (
    'Nguyễn Vũ Đăng Khánh',
    'Nguyễn Vũ Đăng Khánh',
    'nvdeekay.07',
    'Full Stack Developer',
    'Passionate developer with experience in web development',
    'your-email@example.com',
    '+84 XXX XXX XXX',
    'Vietnam',
    '/assets/images/avatars/avthero.jpg',
    '/assets/images/avatars/about.png',
    '/assets/resume/cv.pdf'
) ON CONFLICT (id) DO NOTHING;

-- Insert Roles (for typing animation)
INSERT INTO content_blocks (type, title, display_order) VALUES
('role', 'Full Stack Developer', 1),
('role', 'Web Developer', 2),
('role', 'Software Engineer', 3)
ON CONFLICT DO NOTHING;

-- Insert Skills
INSERT INTO content_blocks (type, title, subtitle, display_order, is_featured) VALUES
('skill', 'ReactJS', 'Frontend', 1, TRUE),
('skill', 'Spring Boot', 'Backend', 2, TRUE),
('skill', 'JavaScript', 'Programming Language', 3, TRUE),
('skill', 'TailwindCSS', 'Styling', 4, TRUE),
('skill', 'PostgreSQL', 'Database', 5, TRUE),
('skill', 'Git', 'Version Control', 6, TRUE)
ON CONFLICT DO NOTHING;

-- Insert Social Links
INSERT INTO content_blocks (type, title, url, metadata, display_order) VALUES
('social', 'GitHub', 'https://github.com/nvdekay', '{"icon_url": "/assets/images/socials/github.svg", "platform": "GitHub"}', 1),
('social', 'LinkedIn', 'https://linkedin.com/in/nvdekay', '{"icon_url": "/assets/images/socials/linkedin.svg", "platform": "LinkedIn"}', 2),
('social', 'Facebook', 'https://facebook.com/nvdekay', '{"icon_url": "/assets/images/socials/facebook.svg", "platform": "Facebook"}', 3)
ON CONFLICT DO NOTHING;

-- Insert Projects
INSERT INTO content_blocks (type, title, description, url, metadata, display_order, is_featured) VALUES
('project', 
 'Portfolio Website',
 'Personal portfolio website built with React and TailwindCSS',
 '/assets/images/projects/portfolio.png',
 '{"type": "WEB", "demo_url": "https://example.com", "github_url": "https://github.com/example", "technologies": [{"id": 1, "name": "React", "color": "#61DAFB"}, {"id": 2, "name": "TailwindCSS", "color": "#06B6D4"}]}',
 1,
 TRUE
)
ON CONFLICT DO NOTHING;

-- Insert Certificates
INSERT INTO content_blocks (type, title, subtitle, description, url, metadata, display_order) VALUES
('certificate',
 'Web Design for Everybody',
 'Coursera',
 'This Specialization covers how to write syntactically correct HTML5 and CSS3',
 '/assets/images/certificates/Coursera1.png',
 '{"link": "https://www.coursera.org/...", "credential_id": "LQF8AYHJVVLU"}',
 1
)
ON CONFLICT DO NOTHING;

-- Insert Site Settings
INSERT INTO site_settings (setting_key, setting_value, description) VALUES
('hero_title', 'Hello, I am', 'Hero section title'),
('hero_subtitle', 'I am a', 'Hero section subtitle'),
('about_title', 'About me', 'About section title'),
('projects_title', 'My Projects', 'Projects section title'),
('projects_subtitle', 'Here are some of the projects I have worked on', 'Projects section subtitle'),
('certificates_title', 'My Certificates', 'Certificates section title'),
('certificates_subtitle', 'A collection of certifications I''ve earned through continuous learning.', 'Certificates section subtitle'),
('typing_speed', '3000', 'Typing animation speed in ms'),
('typing_delay', '2500', 'Typing animation delay in ms'),
('hero_image_left', '/assets/images/avatars/imghero.png', 'Left decoration image'),
('hero_image_right', '/assets/images/avatars/imghero.png', 'Right decoration image')
ON CONFLICT (setting_key) DO NOTHING;

-- Insert Chat Knowledge Base
INSERT INTO chat_data (type, question, answer, category, keywords, is_active) VALUES
('knowledge_base',
 'Kỹ năng của bạn là gì?',
 'Tôi có kinh nghiệm với ReactJS, Spring Boot, JavaScript, TailwindCSS, PostgreSQL và nhiều công nghệ khác. Bạn muốn biết chi tiết về công nghệ nào?',
 'skills',
 ARRAY['kỹ năng', 'skill', 'công nghệ', 'technology'],
 TRUE
),
('knowledge_base',
 'Liên hệ với bạn như thế nào?',
 'Bạn có thể liên hệ với tôi qua email, GitHub, LinkedIn hoặc form contact trên website này. Tôi luôn sẵn sàng trả lời!',
 'contact',
 ARRAY['liên hệ', 'contact', 'email'],
 TRUE
)
ON CONFLICT DO NOTHING;

-- ============================================
-- Create Updated At Trigger
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tables
DROP TRIGGER IF EXISTS update_profile_updated_at ON profile;
CREATE TRIGGER update_profile_updated_at BEFORE UPDATE ON profile
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_content_blocks_updated_at ON content_blocks;
CREATE TRIGGER update_content_blocks_updated_at BEFORE UPDATE ON content_blocks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_chat_data_updated_at ON chat_data;
CREATE TRIGGER update_chat_data_updated_at BEFORE UPDATE ON chat_data
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Enable Row Level Security (RLS)
-- ============================================

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for profile" ON profile FOR SELECT USING (true);
CREATE POLICY "Public read access for content_blocks" ON content_blocks FOR SELECT USING (true);
CREATE POLICY "Public read access for chat_data" ON chat_data FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access for site_settings" ON site_settings FOR SELECT USING (true);

-- Create policies for insert access
CREATE POLICY "Public insert for chat_data" ON chat_data FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert for contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- ============================================
-- Grant Permissions
-- ============================================

GRANT SELECT ON profile TO anon, authenticated;
GRANT SELECT ON content_blocks TO anon, authenticated;
GRANT SELECT, INSERT ON chat_data TO anon, authenticated;
GRANT SELECT, INSERT ON contact_messages TO anon, authenticated;
GRANT SELECT ON site_settings TO anon, authenticated;
