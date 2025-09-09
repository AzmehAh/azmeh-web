/*
  # Product Filter Management System

  1. New Tables
    - `product_filter_types`
      - `id` (uuid, primary key)
      - `name` (text, unique) - e.g., "Type", "Brand", "Material", "Usage"
      - `description` (text, optional)
      - `sort_order` (integer)
      - `is_active` (boolean)
      
    - `product_filter_values`  
      - `id` (uuid, primary key)
      - `filter_type_id` (uuid, foreign key)
      - `value` (text) - e.g., "Primer", "Azur", "Epoxy", "Industrial"
      - `display_name` (text) - optional pretty name
      - `sort_order` (integer)
      - `is_active` (boolean)

    - `bulletin_categories_config`
      - `id` (uuid, primary key) 
      - `name` (text, unique) - e.g., "Technical Solutions", "Paint Systems"
      - `description` (text, optional)
      - `sort_order` (integer)
      - `is_active` (boolean)

  2. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users (full access) and public users (read-only for active items)

  3. Relations
    - product_filter_values.filter_type_id -> product_filter_types.id
    - bulletins.category references bulletin_categories_config.name
*/

-- Product Filter Types Table
CREATE TABLE IF NOT EXISTS product_filter_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE product_filter_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access to product_filter_types"
  ON product_filter_types
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Allow public read access to active product filter types"
  ON product_filter_types
  FOR SELECT
  TO public
  USING (is_active = true);

-- Product Filter Values Table
CREATE TABLE IF NOT EXISTS product_filter_values (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filter_type_id uuid REFERENCES product_filter_types(id) ON DELETE CASCADE,
  value text NOT NULL,
  display_name text,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE product_filter_values ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access to product_filter_values"
  ON product_filter_values
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Allow public read access to active product filter values"
  ON product_filter_values
  FOR SELECT
  TO public
  USING (is_active = true);

-- Bulletin Categories Configuration Table
CREATE TABLE IF NOT EXISTS bulletin_categories_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bulletin_categories_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access to bulletin_categories_config"
  ON bulletin_categories_config
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Allow public read access to active bulletin categories"
  ON bulletin_categories_config
  FOR SELECT
  TO public
  USING (is_active = true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_product_filter_values_filter_type ON product_filter_values(filter_type_id);
CREATE INDEX IF NOT EXISTS idx_product_filter_types_active_sort ON product_filter_types(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_product_filter_values_active_sort ON product_filter_values(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_bulletin_categories_config_active_sort ON bulletin_categories_config(is_active, sort_order);

-- Insert default product filter types
INSERT INTO product_filter_types (name, description, sort_order) VALUES
('Type', 'Product type categories', 1),
('Brand', 'Product brand categories', 2),
('Material', 'Material composition categories', 3),
('Usage', 'Usage application categories', 4);

-- Insert default filter values for Type
INSERT INTO product_filter_values (filter_type_id, value, sort_order) 
SELECT id, 'Primer / Surfacer / Sealer', 1 FROM product_filter_types WHERE name = 'Type'
UNION ALL
SELECT id, 'Paints', 2 FROM product_filter_types WHERE name = 'Type'
UNION ALL
SELECT id, 'Putties', 3 FROM product_filter_types WHERE name = 'Type'
UNION ALL
SELECT id, 'Lacquer', 4 FROM product_filter_types WHERE name = 'Type'
UNION ALL
SELECT id, 'Solvents (Thinners)', 5 FROM product_filter_types WHERE name = 'Type'
UNION ALL
SELECT id, 'Miscellaneous materials', 6 FROM product_filter_types WHERE name = 'Type';

-- Insert default filter values for Brand
INSERT INTO product_filter_values (filter_type_id, value, sort_order) 
SELECT id, 'Azur', 1 FROM product_filter_types WHERE name = 'Brand'
UNION ALL
SELECT id, 'Caprice', 2 FROM product_filter_types WHERE name = 'Brand'
UNION ALL
SELECT id, 'Omygan', 3 FROM product_filter_types WHERE name = 'Brand'
UNION ALL
SELECT id, 'Original', 4 FROM product_filter_types WHERE name = 'Brand'
UNION ALL
SELECT id, 'Miracle', 5 FROM product_filter_types WHERE name = 'Brand'
UNION ALL
SELECT id, 'SRT', 6 FROM product_filter_types WHERE name = 'Brand'
UNION ALL
SELECT id, 'Al Zahab', 7 FROM product_filter_types WHERE name = 'Brand'
UNION ALL
SELECT id, 'Coprabel', 8 FROM product_filter_types WHERE name = 'Brand'
UNION ALL
SELECT id, 'Jupiter', 9 FROM product_filter_types WHERE name = 'Brand';

-- Insert default filter values for Material
INSERT INTO product_filter_values (filter_type_id, value, sort_order) 
SELECT id, 'Zinc Silicate', 1 FROM product_filter_types WHERE name = 'Material'
UNION ALL
SELECT id, 'Epoxy', 2 FROM product_filter_types WHERE name = 'Material'
UNION ALL
SELECT id, 'Polyurethane', 3 FROM product_filter_types WHERE name = 'Material'
UNION ALL
SELECT id, 'Acrylic', 4 FROM product_filter_types WHERE name = 'Material'
UNION ALL
SELECT id, 'Alkyd Synthetic', 5 FROM product_filter_types WHERE name = 'Material'
UNION ALL
SELECT id, 'Nitrocellulose', 6 FROM product_filter_types WHERE name = 'Material'
UNION ALL
SELECT id, 'Melamine', 7 FROM product_filter_types WHERE name = 'Material'
UNION ALL
SELECT id, 'Silicone / Siloxane', 8 FROM product_filter_types WHERE name = 'Material'
UNION ALL
SELECT id, 'Acrylic Emulsion', 9 FROM product_filter_types WHERE name = 'Material'
UNION ALL
SELECT id, 'Miscellaneous materials', 10 FROM product_filter_types WHERE name = 'Material'
UNION ALL
SELECT id, 'Solvents', 11 FROM product_filter_types WHERE name = 'Material';

-- Insert default filter values for Usage
INSERT INTO product_filter_values (filter_type_id, value, sort_order) 
SELECT id, 'Exterior', 1 FROM product_filter_types WHERE name = 'Usage'
UNION ALL
SELECT id, 'Interior', 2 FROM product_filter_types WHERE name = 'Usage'
UNION ALL
SELECT id, 'Industrial', 3 FROM product_filter_types WHERE name = 'Usage'
UNION ALL
SELECT id, 'Decorative', 4 FROM product_filter_types WHERE name = 'Usage'
UNION ALL
SELECT id, 'Marine', 5 FROM product_filter_types WHERE name = 'Usage'
UNION ALL
SELECT id, 'Automotive', 6 FROM product_filter_types WHERE name = 'Usage';

-- Insert default bulletin categories
INSERT INTO bulletin_categories_config (name, description, sort_order) VALUES
('Technical Solutions', 'Advanced technical solutions and specialized applications', 1),
('Paint Systems', 'Comprehensive paint system solutions and methodologies', 2);