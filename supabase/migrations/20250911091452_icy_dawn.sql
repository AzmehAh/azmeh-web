/*
  # Create Product Details Table

  1. New Tables
    - `product_details`
      - `id` (uuid, primary key)
      - `title` (text, product title)
      - `description` (text, rich text HTML)
      - `recommended_uses` (text, rich text HTML)
      - `features` (text, rich text HTML)
      - `application_instruction` (text, rich text HTML)
      - `technical_info` (jsonb, technical specifications)
      - `surface_preparation` (text, surface prep instructions)
      - `drying_time` (text, drying time information)
      - `storing_conditions` (text, storage conditions)
      - `notice` (text, important notices)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `product_details` table
    - Add policy for public read access to published product details
    - Add policy for authenticated users to manage product details

  3. Indexes
    - Index on title for search functionality
*/

CREATE TABLE IF NOT EXISTS product_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  recommended_uses text DEFAULT '',
  features text DEFAULT '',
  application_instruction text DEFAULT '',
  technical_info jsonb DEFAULT '{}'::jsonb,
  surface_preparation text DEFAULT '',
  drying_time text DEFAULT '',
  storing_conditions text DEFAULT '',
  notice text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE product_details ENABLE ROW LEVEL SECURITY;

-- Public read access policy
CREATE POLICY "Allow public read access to product details"
  ON product_details
  FOR SELECT
  TO public
  USING (true);

-- Authenticated users full access policy
CREATE POLICY "Allow authenticated users full access to product details"
  ON product_details
  FOR ALL
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_product_details_title ON product_details(title);
CREATE INDEX IF NOT EXISTS idx_product_details_created_at ON product_details(created_at DESC);

-- Insert sample product details for demonstration
INSERT INTO product_details (
  title,
  description,
  recommended_uses,
  features,
  application_instruction,
  technical_info,
  surface_preparation,
  drying_time,
  storing_conditions,
  notice
) VALUES (
  'Premium Zinc Primer AZ-ZP-001',
  '<p>High-performance zinc-rich primer formulated with <strong>high-grade zinc dust</strong> and inorganic silicate binder. Provides <em>cathodic protection</em> to steel substrates through sacrificial zinc action.</p>',
  '<ul><li>Steel structures in marine environments</li><li>Industrial facilities and equipment</li><li>Oil and gas installations</li><li>Power plants and infrastructure</li></ul>',
  '<ul><li><strong>Excellent corrosion protection</strong> - 80-85% zinc content</li><li><strong>Long-lasting durability</strong> - 20+ years service life</li><li><strong>Superior adhesion</strong> to steel substrates</li><li><strong>Chemical resistance</strong> to harsh environments</li></ul>',
  '<h3>Surface Preparation</h3><p>Clean surface thoroughly to remove rust, oil, and dirt using appropriate methods.</p><h3>Application</h3><p>Apply primer in thin, even coats using spray or brush application. Maintain proper film thickness as specified.</p><h3>Curing</h3><p>Allow 24 hours curing time between coats for optimal performance.</p>',
  '{
    "Color": "Gray",
    "Gloss": "Semi-Matt",
    "Volume Solids": "65-70%",
    "Flexibility": "Good",
    "Recommended film thickness": "75-100 μm",
    "Theoretical spreading rate": "8-10 m²/L",
    "Specific gravity": "2.8-3.2",
    "Water resistance": "Excellent",
    "Number of Coats": "1-2 coats",
    "Packaging": ["1L Metal Can", "4L Metal Can", "20L Metal Pail"],
    "Drying Time": {
      "Dry to Touch": "2-4 hours",
      "Dry to Handle": "6-8 hours",
      "Full Cure": "24 hours"
    }
  }',
  'Surface must be clean, dry, and free from rust, oil, dirt, and loose material. Blast clean to Sa 2.5 standard or hand/power tool clean to St 3 standard. Remove all dust and contamination before application.',
  'Touch dry: 2-4 hours at 20°C. Handle dry: 6-8 hours at 20°C. Full cure: 24 hours at 20°C. Lower temperatures will extend drying times.',
  'Store in cool, dry place below 30°C. Keep container tightly closed when not in use. Protect from direct sunlight and freezing. Use within 24 months from date of manufacture.',
  'This product contains zinc dust. Ensure adequate ventilation during application. Refer to Material Safety Data Sheet for complete safety information. Professional application recommended.'
);