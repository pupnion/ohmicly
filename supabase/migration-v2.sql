-- Migration v2: Add missing columns and tables
-- Run this in Supabase SQL Editor

-- ============================================
-- PROFILES TABLE (for public users)
-- ============================================

-- Create profiles table if not exists
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text DEFAULT '',
  email text DEFAULT '',
  avatar_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Admin can read all profiles
CREATE POLICY "Admin can read all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

-- ============================================
-- TOOLS TABLE
-- ============================================

-- Add is_published column (default false for draft mode)
ALTER TABLE tools ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT false;

-- Add price column (for premium tools)
ALTER TABLE tools ADD COLUMN IF NOT EXISTS price int NOT NULL DEFAULT 0;

-- Add thumbnail_url column
ALTER TABLE tools ADD COLUMN IF NOT EXISTS thumbnail_url text DEFAULT '';

-- ============================================
-- FAQS TABLE
-- ============================================

-- Add is_published column
ALTER TABLE faqs ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT true;

-- ============================================
-- BLOG POSTS TABLE
-- ============================================

-- Add cover_image_url column
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS cover_image_url text DEFAULT '';

-- Add tags column (jsonb array)
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS tags jsonb NOT NULL DEFAULT '[]';

-- Add reading_time column (minutes)
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS reading_time int DEFAULT 5;

-- Create downloads table if not exists
CREATE TABLE IF NOT EXISTS downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_slug text NOT NULL,
  user_id uuid,
  downloaded_at timestamptz DEFAULT now()
);

-- Enable RLS on downloads
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

-- Admin can manage downloads
CREATE POLICY "Admin full access on downloads" ON downloads
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

-- Public can insert downloads (for tracking)
CREATE POLICY "Public can insert downloads" ON downloads
  FOR INSERT WITH CHECK (true);

-- Public can read downloads
CREATE POLICY "Public can read downloads" ON downloads
  FOR SELECT USING (true);

-- Create testimonials table if not exists
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text DEFAULT '',
  company text DEFAULT '',
  district text DEFAULT '',
  content text NOT NULL,
  avatar_url text DEFAULT '',
  rating int DEFAULT 5,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Add district column if table already exists
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS district text DEFAULT '';

-- Update is_published default to false
ALTER TABLE testimonials ALTER COLUMN is_published SET DEFAULT false;

-- Enable RLS on testimonials
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Admin can manage testimonials
CREATE POLICY "Admin full access on testimonials" ON testimonials
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

-- Public can read published testimonials
CREATE POLICY "Public can read published testimonials" ON testimonials
  FOR SELECT USING (is_published = true);
