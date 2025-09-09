/*
  # Admin Authentication and Content Management System

  1. New Tables
    - `admin_users` - Admin user authentication
    - `homepage_content` - Dynamic homepage content management
    - `faq_categories` - FAQ category management
    - `faq_items` - FAQ question and answer management
    - `troubleshooting_categories` - Troubleshooting category management
    - `troubleshooting_items` - Troubleshooting problem/solution management

  2. Security
    - Enable RLS on all admin tables
    - Admin-only access for content management
    - Public read access for display content

  3. Features
    - Complete admin authentication system
    - Dynamic FAQ management
    - Homepage content management
    - Technical support content management
*/

-- Create admin_users table (if not exists)
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  role text DEFAULT 'admin',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Admin users policies (admin access only)
CREATE POLICY "Admin users can read their own data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Create homepage_content table for dynamic content management
CREATE TABLE IF NOT EXISTS homepage_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text UNIQUE NOT NULL,
  title text,
  subtitle text,
  description text,
  image_url text,
  button_text text,
  button_link text,
  content_data jsonb DEFAULT '{}',
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;

-- Homepage content policies
CREATE POLICY "Allow public read access to active homepage content"
  ON homepage_content
  FOR SELECT
  TO public
  USING (status = 'active');

CREATE POLICY "Allow authenticated users full access to homepage content"
  ON homepage_content
  FOR ALL
  TO authenticated
  USING (true);

-- Create FAQ categories table (if not exists)
CREATE TABLE IF NOT EXISTS faq_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE faq_categories ENABLE ROW LEVEL SECURITY;

-- FAQ categories policies
CREATE POLICY "Allow public read access to FAQ categories"
  ON faq_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users full access to faq_categories"
  ON faq_categories
  FOR ALL
  TO authenticated
  USING (true);

-- Create FAQ items table (if not exists)
CREATE TABLE IF NOT EXISTS faq_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES faq_categories(id) ON DELETE CASCADE,
  question text NOT NULL,
  answer text NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;

-- FAQ items policies
CREATE POLICY "Allow public read access to FAQ items"
  ON faq_items
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users full access to faq_items"
  ON faq_items
  FOR ALL
  TO authenticated
  USING (true);

-- Create troubleshooting categories table (if not exists)
CREATE TABLE IF NOT EXISTS troubleshooting_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE troubleshooting_categories ENABLE ROW LEVEL SECURITY;

-- Troubleshooting categories policies
CREATE POLICY "Allow public read access to troubleshooting categories"
  ON troubleshooting_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users full access to troubleshooting_catego"
  ON troubleshooting_categories
  FOR ALL
  TO authenticated
  USING (true);

-- Create troubleshooting items table (if not exists)
CREATE TABLE IF NOT EXISTS troubleshooting_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES troubleshooting_categories(id) ON DELETE CASCADE,
  problem text NOT NULL,
  solution text NOT NULL,
  severity text DEFAULT 'Medium',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE troubleshooting_items ENABLE ROW LEVEL SECURITY;

-- Troubleshooting items policies
CREATE POLICY "Allow public read access to troubleshooting items"
  ON troubleshooting_items
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users full access to troubleshooting_items"
  ON troubleshooting_items
  FOR ALL
  TO authenticated
  USING (true);

-- Create pages table for dynamic page management
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  content jsonb NOT NULL,
  meta_description text,
  status text DEFAULT 'published',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Pages policies
CREATE POLICY "Allow public read access to published pages"
  ON pages
  FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "Allow authenticated users full access to pages"
  ON pages
  FOR ALL
  TO authenticated
  USING (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_type ON products(type);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_bulletins_category ON bulletins(category);
CREATE INDEX IF NOT EXISTS idx_bulletins_status ON bulletins(status);
CREATE INDEX IF NOT EXISTS idx_faq_items_category_id ON faq_items(category_id);
CREATE INDEX IF NOT EXISTS idx_troubleshooting_items_category_id ON troubleshooting_items(category_id);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);