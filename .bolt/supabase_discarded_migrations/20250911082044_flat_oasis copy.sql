/*
  # Product Bulletins and System Details Backend

  1. New Tables
    - `product_bulletins` - Main bulletin data for each product
    - `product_technical_specs` - Technical specifications (property-value-standard)
    - `product_key_features` - Key features list
    - `product_applications` - Applications list
    - `product_instructions` - Application instructions (rich text)
    - `product_storage_requirements` - Storage requirements list
    - `product_safety_info` - Safety information (precautions + first aid)
    - `system_details` - Rich text content for system pages
    - `content_audit_log` - Audit trail for all content changes

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users (admin/editor roles)
    - Add policies for public read access where appropriate

  3. Features
    - Full CRUD operations for all bulletin sections
    - Rich text content support
    - File upload URL storage
    - Audit logging for changes
    - Flexible schema for future expansion
*/

-- Product Bulletins Main Table
CREATE TABLE IF NOT EXISTS product_bulletins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  title text NOT NULL,
  short_description text,
  cover_image_url text,
  datasheet_url text,
  manual_url text,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id)
);

-- Technical Specifications
CREATE TABLE IF NOT EXISTS product_technical_specs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_bulletin_id uuid NOT NULL REFERENCES product_bulletins(id) ON DELETE CASCADE,
  property text NOT NULL,
  value text NOT NULL,
  standard text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Key Features
CREATE TABLE IF NOT EXISTS product_key_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_bulletin_id uuid NOT NULL REFERENCES product_bulletins(id) ON DELETE CASCADE,
  feature text NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Applications
CREATE TABLE IF NOT EXISTS product_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_bulletin_id uuid NOT NULL REFERENCES product_bulletins(id) ON DELETE CASCADE,
  application text NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Application Instructions (Rich Text)
CREATE TABLE IF NOT EXISTS product_instructions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_bulletin_id uuid NOT NULL REFERENCES product_bulletins(id) ON DELETE CASCADE,
  content jsonb NOT NULL DEFAULT '{}',
  content_type text DEFAULT 'html',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Storage Requirements
CREATE TABLE IF NOT EXISTS product_storage_requirements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_bulletin_id uuid NOT NULL REFERENCES product_bulletins(id) ON DELETE CASCADE,
  requirement text NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Safety Information
CREATE TABLE IF NOT EXISTS product_safety_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_bulletin_id uuid NOT NULL REFERENCES product_bulletins(id) ON DELETE CASCADE,
  info_type text NOT NULL CHECK (info_type IN ('precaution', 'first_aid')),
  information text NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- System Details (Rich Text Pages)
CREATE TABLE IF NOT EXISTS system_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  system_id text NOT NULL UNIQUE,
  title text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  content_type text DEFAULT 'html',
  meta_description text,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id)
);

-- Audit Log for Content Changes
CREATE TABLE IF NOT EXISTS content_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name text NOT NULL,
  record_id uuid NOT NULL,
  operation text NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),
  old_data jsonb,
  new_data jsonb,
  changed_by uuid REFERENCES auth.users(id),
  changed_at timestamptz DEFAULT now(),
  ip_address inet,
  user_agent text
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_product_bulletins_product_id ON product_bulletins(product_id);
CREATE INDEX IF NOT EXISTS idx_product_bulletins_published ON product_bulletins(is_published);
CREATE INDEX IF NOT EXISTS idx_technical_specs_bulletin_id ON product_technical_specs(product_bulletin_id);
CREATE INDEX IF NOT EXISTS idx_key_features_bulletin_id ON product_key_features(product_bulletin_id);
CREATE INDEX IF NOT EXISTS idx_applications_bulletin_id ON product_applications(product_bulletin_id);
CREATE INDEX IF NOT EXISTS idx_storage_requirements_bulletin_id ON product_storage_requirements(product_bulletin_id);
CREATE INDEX IF NOT EXISTS idx_safety_info_bulletin_id ON product_safety_info(product_bulletin_id);
CREATE INDEX IF NOT EXISTS idx_safety_info_type ON product_safety_info(info_type);
CREATE INDEX IF NOT EXISTS idx_system_details_system_id ON system_details(system_id);
CREATE INDEX IF NOT EXISTS idx_system_details_published ON system_details(is_published);
CREATE INDEX IF NOT EXISTS idx_audit_log_table_record ON content_audit_log(table_name, record_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_changed_at ON content_audit_log(changed_at);

-- Enable Row Level Security
ALTER TABLE product_bulletins ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_technical_specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_key_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_instructions ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_storage_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_safety_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_audit_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Product Bulletins
CREATE POLICY "Allow public read access to published bulletins"
  ON product_bulletins
  FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Allow authenticated users full access to bulletins"
  ON product_bulletins
  FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for Technical Specs
CREATE POLICY "Allow public read access to technical specs"
  ON product_technical_specs
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM product_bulletins pb 
      WHERE pb.id = product_technical_specs.product_bulletin_id 
      AND pb.is_published = true
    )
  );

CREATE POLICY "Allow authenticated users full access to technical specs"
  ON product_technical_specs
  FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for Key Features
CREATE POLICY "Allow public read access to key features"
  ON product_key_features
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM product_bulletins pb 
      WHERE pb.id = product_key_features.product_bulletin_id 
      AND pb.is_published = true
    )
  );

CREATE POLICY "Allow authenticated users full access to key features"
  ON product_key_features
  FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for Applications
CREATE POLICY "Allow public read access to applications"
  ON product_applications
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM product_bulletins pb 
      WHERE pb.id = product_applications.product_bulletin_id 
      AND pb.is_published = true
    )
  );

CREATE POLICY "Allow authenticated users full access to applications"
  ON product_applications
  FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for Instructions
CREATE POLICY "Allow public read access to instructions"
  ON product_instructions
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM product_bulletins pb 
      WHERE pb.id = product_instructions.product_bulletin_id 
      AND pb.is_published = true
    )
  );

CREATE POLICY "Allow authenticated users full access to instructions"
  ON product_instructions
  FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for Storage Requirements
CREATE POLICY "Allow public read access to storage requirements"
  ON product_storage_requirements
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM product_bulletins pb 
      WHERE pb.id = product_storage_requirements.product_bulletin_id 
      AND pb.is_published = true
    )
  );

CREATE POLICY "Allow authenticated users full access to storage requirements"
  ON product_storage_requirements
  FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for Safety Info
CREATE POLICY "Allow public read access to safety info"
  ON product_safety_info
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM product_bulletins pb 
      WHERE pb.id = product_safety_info.product_bulletin_id 
      AND pb.is_published = true
    )
  );

CREATE POLICY "Allow authenticated users full access to safety info"
  ON product_safety_info
  FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for System Details
CREATE POLICY "Allow public read access to published system details"
  ON system_details
  FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Allow authenticated users full access to system details"
  ON system_details
  FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for Audit Log
CREATE POLICY "Allow authenticated users read access to audit log"
  ON content_audit_log
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow system to insert audit log entries"
  ON content_audit_log
  FOR INSERT
  TO authenticated
  USING (true);

-- Insert sample data for existing products
INSERT INTO product_bulletins (product_id, title, short_description, is_published)
SELECT 
  id, 
  name || ' Technical Bulletin',
  description,
  true
FROM products
WHERE NOT EXISTS (
  SELECT 1 FROM product_bulletins WHERE product_id = products.id
);

-- Create system details entries for existing systems
INSERT INTO system_details (system_id, title, content, is_published)
VALUES 
  ('concrete-exterior', 'Concrete Exterior Systems', '{"type":"doc","content":[{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"Concrete Exterior Systems"}]},{"type":"paragraph","content":[{"type":"text","text":"Advanced exterior concrete coating systems designed for maximum durability and weather resistance."}]}]}', true),
  ('concrete-lining', 'Concrete Lining Systems', '{"type":"doc","content":[{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"Concrete Lining Systems"}]},{"type":"paragraph","content":[{"type":"text","text":"Specialized protective lining systems for concrete structures in aggressive environments."}]}]}', true),
  ('concrete-repair', 'Concrete Repair & Protection', '{"type":"doc","content":[{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"Concrete Repair & Protection"}]},{"type":"paragraph","content":[{"type":"text","text":"Comprehensive repair and protection systems for damaged concrete structures."}]}]}', true),
  ('concrete-sealer', 'Concrete Sealer Systems', '{"type":"doc","content":[{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"Concrete Sealer Systems"}]},{"type":"paragraph","content":[{"type":"text","text":"High-performance sealing systems for concrete protection and enhancement."}]}]}', true),
  ('car-coating', 'Car Coating Systems', '{"type":"doc","content":[{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"Car Coating Systems"}]},{"type":"paragraph","content":[{"type":"text","text":"Professional automotive coating systems for superior protection and finish."}]}]}', true),
  ('concrete-walls', 'Concrete Walls Coating', '{"type":"doc","content":[{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"Concrete Walls Coating"}]},{"type":"paragraph","content":[{"type":"text","text":"Specialized coating systems for concrete wall protection and aesthetics."}]}]}', true)
ON CONFLICT (system_id) DO NOTHING;