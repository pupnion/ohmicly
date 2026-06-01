-- OhmiclyLearn Admin Panel Database Schema
-- Run this in Supabase SQL Editor

-- 1. Admin users table (linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  role text NOT NULL DEFAULT 'admin',
  created_at timestamptz DEFAULT now()
);

-- 2. Tools table
CREATE TABLE IF NOT EXISTS tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  title_en text NOT NULL DEFAULT '',
  desc text NOT NULL DEFAULT '',
  desc_long text NOT NULL DEFAULT '',
  standard text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'Excel',
  category text NOT NULL DEFAULT 'Calculator',
  color text NOT NULL DEFAULT 'blue',
  icon text NOT NULL DEFAULT 'FileSpreadsheet',
  downloads int NOT NULL DEFAULT 0,
  is_free boolean NOT NULL DEFAULT true,
  is_popular boolean NOT NULL DEFAULT false,
  standard_badges jsonb NOT NULL DEFAULT '[]',
  how_to_use jsonb NOT NULL DEFAULT '[]',
  audience jsonb NOT NULL DEFAULT '[]',
  faqs jsonb NOT NULL DEFAULT '[]',
  related_slugs jsonb NOT NULL DEFAULT '[]',
  file_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'General',
  color text NOT NULL DEFAULT 'bg-brand-blue',
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 4. FAQs table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 5. Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Admin can do everything
CREATE POLICY "Admin full access on tools" ON tools
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

CREATE POLICY "Admin full access on blog_posts" ON blog_posts
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

CREATE POLICY "Admin full access on faqs" ON faqs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

CREATE POLICY "Admin full access on site_settings" ON site_settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

CREATE POLICY "Admin can read admin_users" ON admin_users
  FOR SELECT USING (auth.uid() = id);

-- Public read access for published content
CREATE POLICY "Public read published tools" ON tools
  FOR SELECT USING (true);

CREATE POLICY "Public read published blog" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Public read faqs" ON faqs
  FOR SELECT USING (true);

CREATE POLICY "Public read settings" ON site_settings
  FOR SELECT USING (true);

-- Create storage bucket for tool files
INSERT INTO storage.buckets (id, name, public)
VALUES ('tool-files', 'tool-files', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy
CREATE POLICY "Admin can upload tool files" ON storage.objects
  FOR ALL USING (
    bucket_id = 'tool-files' AND
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

CREATE POLICY "Public can download tool files" ON storage.objects
  FOR SELECT USING (bucket_id = 'tool-files');
