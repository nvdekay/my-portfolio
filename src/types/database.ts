/**
 * TypeScript Type Definitions for Database Schema
 * Dùng cho autocomplete và type checking
 */

// ============================================
// Profile Types
// ============================================

export interface Profile {
  id: number;
  name: string;
  display_name?: string;
  brand_name?: string;
  title?: string;
  bio?: string;
  email?: string;
  phone?: string;
  location?: string;
  avatar_url?: string;
  about_image_url?: string;
  resume_url?: string;
  resume_filename?: string;
  website_last_updated?: string;
  birth_year?: number;
  start_career_year?: number;
  education_level?: string;
  relationship_status?: string;
  hobbies?: string;
  social_links?: any; // JSONB
  navigation?: any; // JSONB
  created_at: string;
  updated_at: string;
}

// ============================================
// Content Block Types
// ============================================

export type ContentBlockType = 
  | 'project'
  | 'skill'
  | 'certificate'
  | 'social'
  | 'role'
  | 'custom';

export interface ContentBlock {
  id: number;
  type: ContentBlockType;
  title: string;
  subtitle?: string;
  description?: string;
  long_description?: string;
  url?: string;
  metadata?: ContentBlockMetadata;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Metadata types for different content block types
export interface ProjectMetadata {
  type: 'WEB' | 'APP' | 'AI' | 'LANDING';
  demo_url?: string;
  github_url?: string;
  technologies?: Technology[];
}

export interface Technology {
  id: number;
  name: string;
  color: string;
}

export interface SkillMetadata {
  proficiency?: 'expert' | 'intermediate' | 'beginner';
  years_experience?: number;
}

export interface CertificateMetadata {
  link?: string;
  credential_id?: string;
  issue_date?: string;
}

export interface SocialMetadata {
  icon_url?: string;
  platform?: string;
}

export type ContentBlockMetadata = 
  | ProjectMetadata 
  | SkillMetadata 
  | CertificateMetadata 
  | SocialMetadata
  | Record<string, any>;

// ============================================
// Transformed Types (for frontend use)
// ============================================

export interface Project {
  id: number;
  title: string;
  description?: string;
  image_url?: string;
  demo_url?: string;
  github_url?: string;
  type?: 'WEB' | 'APP' | 'AI' | 'LANDING';
  technologies?: Technology[];
  display_order: number;
  created_at: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  display_order: number;
  is_featured: boolean;
}

export interface Certificate {
  id: number;
  title: string;
  issuer?: string;
  description?: string;
  image_url?: string;
  link?: string;
  display_order: number;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon_url?: string;
  display_order: number;
}

export interface Role {
  id: number;
  title: string;
  display_order: number;
}

// ============================================
// Chat Data Types
// ============================================

export interface ChatData {
  id: number;
  type?: string;
  session_id?: string;
  question?: string;
  answer?: string;
  user_message?: string;
  bot_response?: string;
  response_time_ms?: number;
  category?: string;
  keywords?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface KnowledgeBase {
  question: string;
  answer: string;
  keywords: string[];
  category?: string;
}

// ============================================
// Contact Message Types
// ============================================

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  replied_at?: string;
  created_at: string;
}

// ============================================
// Site Settings Types
// ============================================

export interface SiteSetting {
  id: number;
  setting_key: string;
  setting_value?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface SiteSettingsMap {
  hero_title?: string;
  hero_subtitle?: string;
  about_title?: string;
  projects_title?: string;
  projects_subtitle?: string;
  certificates_title?: string;
  certificates_subtitle?: string;
  typing_speed?: string;
  typing_delay?: string;
  hero_image_left?: string;
  hero_image_right?: string;
  [key: string]: string | undefined;
}

// ============================================
// API Response Types
// ============================================

export interface SupabaseResponse<T> {
  data: T | null;
  error: Error | null;
}

export interface UseQueryResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch?: () => void;
}

// ============================================
// Chatbot Types
// ============================================

export interface ChatMessage {
  id: number;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export interface PortfolioContext {
  personalInfo?: Profile;
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
  socialLinks: SocialLink[];
  knowledgeBase: KnowledgeBase[];
}

// ============================================
// Example Usage
// ============================================

/*
// In your components:

import type { Project, Skill, Certificate } from './types/database';

const MyComponent = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  
  // TypeScript will now provide autocomplete and type checking
  const projectTitles = projects.map(p => p.title);
  const skillNames = skills.map(s => s.name);
  
  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
};
*/
