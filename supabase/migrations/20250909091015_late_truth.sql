/*
  # Create Complete Admin Schema

  1. New Tables
    - `products` - Product catalog with specifications
    - `product_images` - Multiple images per product
    - `bulletins` - Technical bulletins/system details  
    - `faq_categories` - FAQ organization
    - `faq_items` - Questions and answers
    - `pages` - Dynamic page content management
    - `contact_messages` - Contact form submissions
    - `job_applications` - Career applications
    - `admin_users` - Admin access control

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for admin access
    - Public read access for display content
    - Admin-only write access for management

  3. Storage
    - Create buckets for product images, documents
    - Set up proper storage policies
*/

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  role text DEFAULT 'admin',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text UNIQUE NOT NULL,
  brand text NOT NULL,
  type text NOT NULL,
  material text NOT NULL,
  usage text NOT NULL,
  description text NOT NULL,
  technical_description text,
  features text[] DEFAULT '{}',
  applications text[] DEFAULT '{}',
  instructions text[] DEFAULT '{}',
  packaging jsonb DEFAULT '[]',
  storage text[] DEFAULT '{}',
  safety_precautions text[] DEFAULT '{}',
  safety_first_aid text[] DEFAULT '{}',
  technical_specs jsonb DEFAULT '[]',
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Product Images Table
CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Bulletins/System Details Table
CREATE TABLE IF NOT EXISTS bulletins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  short_description text,
  cover_image text,
  category text NOT NULL,
  subcategory text NOT NULL,
  content jsonb NOT NULL,
  status text DEFAULT 'published',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- FAQ Categories Table
CREATE TABLE IF NOT EXISTS faq_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- FAQ Items Table
CREATE TABLE IF NOT EXISTS faq_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES faq_categories(id) ON DELETE CASCADE,
  question text NOT NULL,
  answer text NOT NULL,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Dynamic Pages Table
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

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  status text DEFAULT 'unread',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Job Applications Table
CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  cover_letter text NOT NULL,
  resume_url text,
  status text DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Troubleshooting Categories Table
CREATE TABLE IF NOT EXISTS troubleshooting_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Troubleshooting Items Table
CREATE TABLE IF NOT EXISTS troubleshooting_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES troubleshooting_categories(id) ON DELETE CASCADE,
  problem text NOT NULL,
  solution text NOT NULL,
  severity text DEFAULT 'Medium',
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE bulletins ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE troubleshooting_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE troubleshooting_items ENABLE ROW LEVEL SECURITY;

-- Public read access for display content
CREATE POLICY "Allow public read access to published products" 
  ON products FOR SELECT 
  USING (status = 'active');

CREATE POLICY "Allow public read access to product images" 
  ON product_images FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to published bulletins" 
  ON bulletins FOR SELECT 
  USING (status = 'published');

CREATE POLICY "Allow public read access to FAQ categories" 
  ON faq_categories FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to FAQ items" 
  ON faq_items FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to published pages" 
  ON pages FOR SELECT 
  USING (status = 'published');

CREATE POLICY "Allow public read access to troubleshooting categories" 
  ON troubleshooting_categories FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to troubleshooting items" 
  ON troubleshooting_items FOR SELECT 
  USING (true);

-- Admin access policies (will be updated when auth is implemented)
CREATE POLICY "Allow authenticated users full access to products" 
  ON products FOR ALL 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated users full access to product_images" 
  ON product_images FOR ALL 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated users full access to bulletins" 
  ON bulletins FOR ALL 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated users full access to faq_categories" 
  ON faq_categories FOR ALL 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated users full access to faq_items" 
  ON faq_items FOR ALL 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated users full access to pages" 
  ON pages FOR ALL 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated users full access to contact_messages" 
  ON contact_messages FOR ALL 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated users full access to job_applications" 
  ON job_applications FOR ALL 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated users full access to troubleshooting_categories" 
  ON troubleshooting_categories FOR ALL 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated users full access to troubleshooting_items" 
  ON troubleshooting_items FOR ALL 
  TO authenticated 
  USING (true);

-- Allow public to insert contact messages and job applications
CREATE POLICY "Allow public to insert contact messages" 
  ON contact_messages FOR INSERT 
  TO anon 
  WITH CHECK (true);

CREATE POLICY "Allow public to insert job applications" 
  ON job_applications FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_type ON products(type);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_bulletins_status ON bulletins(status);
CREATE INDEX IF NOT EXISTS idx_bulletins_category ON bulletins(category);
CREATE INDEX IF NOT EXISTS idx_faq_items_category_id ON faq_items(category_id);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_troubleshooting_items_category_id ON troubleshooting_items(category_id);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('products', 'products', true),
  ('bulletins', 'bulletins', true),
  ('pages', 'pages', true),
  ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Allow public read access to products bucket" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'products');

CREATE POLICY "Allow authenticated users to upload to products bucket" 
  ON storage.objects FOR INSERT 
  TO authenticated 
  WITH CHECK (bucket_id = 'products');

CREATE POLICY "Allow public read access to bulletins bucket" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'bulletins');

CREATE POLICY "Allow authenticated users to upload to bulletins bucket" 
  ON storage.objects FOR INSERT 
  TO authenticated 
  WITH CHECK (bucket_id = 'bulletins');

CREATE POLICY "Allow public read access to pages bucket" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'pages');

CREATE POLICY "Allow authenticated users to upload to pages bucket" 
  ON storage.objects FOR INSERT 
  TO authenticated 
  WITH CHECK (bucket_id = 'pages');

CREATE POLICY "Allow authenticated users full access to resumes bucket" 
  ON storage.objects FOR ALL 
  TO authenticated 
  USING (bucket_id = 'resumes');

CREATE POLICY "Allow public to upload resumes" 
  ON storage.objects FOR INSERT 
  TO anon 
  WITH CHECK (bucket_id = 'resumes');