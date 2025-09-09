/*
  # Extended Content Management System

  1. New Tables
    - `homepage_sections` - Dynamic homepage content management
    - `site_settings` - Global site configuration
    - `content_blocks` - Reusable content blocks for pages

  2. Enhanced Tables  
    - Enhanced `pages` table with additional fields for better content management
    - Added metadata fields to existing tables

  3. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users to manage content
    - Public read access for published content

  4. Indexes
    - Performance indexes for filtering and searching
*/

-- Homepage sections for dynamic content
CREATE TABLE IF NOT EXISTS homepage_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name text UNIQUE NOT NULL,
  title text NOT NULL,
  subtitle text,
  content jsonb NOT NULL DEFAULT '{}',
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE homepage_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access to homepage_sections"
  ON homepage_sections
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Allow public read access to active homepage sections"
  ON homepage_sections
  FOR SELECT
  TO public
  USING (is_active = true);

-- Site settings for global configuration
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value jsonb NOT NULL,
  description text,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access to site_settings"
  ON site_settings
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Allow public read access to public settings"
  ON site_settings
  FOR SELECT
  TO public
  USING (is_public = true);

-- Content blocks for reusable content
CREATE TABLE IF NOT EXISTS content_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  block_key text UNIQUE NOT NULL,
  title text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  block_type text NOT NULL DEFAULT 'text',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access to content_blocks"
  ON content_blocks
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Allow public read access to active content blocks"
  ON content_blocks
  FOR SELECT
  TO public
  USING (is_active = true);

-- Product categories for better filtering
CREATE TABLE IF NOT EXISTS product_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  parent_id uuid REFERENCES product_categories(id) ON DELETE CASCADE,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access to product_categories"
  ON product_categories
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Allow public read access to active product categories"
  ON product_categories
  FOR SELECT
  TO public
  USING (is_active = true);

-- Add category relationship to products
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'category_id'
  ) THEN
    ALTER TABLE products ADD COLUMN category_id uuid REFERENCES product_categories(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Add additional fields to bulletins for better management
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bulletins' AND column_name = 'featured'
  ) THEN
    ALTER TABLE bulletins ADD COLUMN featured boolean DEFAULT false;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bulletins' AND column_name = 'author'
  ) THEN
    ALTER TABLE bulletins ADD COLUMN author text DEFAULT 'Al Azmeh Paints';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bulletins' AND column_name = 'tags'
  ) THEN
    ALTER TABLE bulletins ADD COLUMN tags text[] DEFAULT '{}';
  END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_homepage_sections_section_name ON homepage_sections(section_name);
CREATE INDEX IF NOT EXISTS idx_homepage_sections_active_sort ON homepage_sections(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_content_blocks_key ON content_blocks(block_key);
CREATE INDEX IF NOT EXISTS idx_content_blocks_type ON content_blocks(block_type);
CREATE INDEX IF NOT EXISTS idx_product_categories_parent ON product_categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_bulletins_featured ON bulletins(featured);
CREATE INDEX IF NOT EXISTS idx_bulletins_tags ON bulletins USING gin(tags);

-- Seed some initial data for content management
INSERT INTO homepage_sections (section_name, title, subtitle, content, sort_order) 
VALUES 
  ('hero', 'Welcome to Al Azmeh Paints', 'Excellence in Paint Solutions Since 1955', '{"description": "Professional paint systems for every application"}', 1),
  ('about', 'About Al Azmeh Paints', 'Our Legacy of Excellence', '{"text": "Al Azmeh Paints has been delivering excellence since 1955..."}', 2),
  ('services', 'Our Services', 'Professional Solutions', '{"services": []}', 3)
ON CONFLICT (section_name) DO NOTHING;

INSERT INTO site_settings (setting_key, setting_value, description, is_public)
VALUES 
  ('company_name', '"Al Azmeh Paints"', 'Company name', true),
  ('company_phone', '"(+963) 988 691 712"', 'Company phone number', true),
  ('company_email', '"manager@dkl-syria.com"', 'Company email', true),
  ('company_address', '{"street": "Fayez Mansour Street", "city": "Damascus", "country": "Syria", "area": "Mazzeh"}', 'Company address', true),
  ('social_media', '{"facebook": "#", "instagram": "#", "linkedin": "#", "youtube": "#"}', 'Social media links', true)
ON CONFLICT (setting_key) DO NOTHING;

INSERT INTO content_blocks (block_key, title, content, block_type)
VALUES 
  ('contact_intro', 'Contact Us', '{"text": "Get in touch with our team of paint specialists..."}', 'text'),
  ('about_intro', 'About Our Company', '{"text": "Al Azmeh Paints - Excellence Since 1955..."}', 'text'),
  ('footer_description', 'Footer Description', '{"text": "Excellence in paint systems and coatings since 1955..."}', 'text')
ON CONFLICT (block_key) DO NOTHING;

-- Create some default product categories
INSERT INTO product_categories (name, description, sort_order)
VALUES 
  ('Primers & Sealers', 'Surface preparation and sealing products', 1),
  ('Interior Paints', 'Paint systems for interior applications', 2),
  ('Exterior Paints', 'Weather-resistant exterior coatings', 3),
  ('Industrial Coatings', 'Heavy-duty industrial paint systems', 4),
  ('Decorative Finishes', 'Aesthetic and decorative paint systems', 5),
  ('Specialty Products', 'Specialized coating solutions', 6)
ON CONFLICT (name) DO NOTHING;