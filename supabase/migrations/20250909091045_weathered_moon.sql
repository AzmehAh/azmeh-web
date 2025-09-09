/*
  # Seed Initial Data

  1. FAQ Categories and Items
  2. Troubleshooting Categories and Items  
  3. Sample Products
  4. Initial Bulletins
*/

-- Insert FAQ Categories
INSERT INTO faq_categories (name, description, sort_order) VALUES 
  ('Industrial and Protective Coating', 'Technical information about industrial coatings, protective systems, and heavy-duty applications.', 1),
  ('Architectural Coating', 'Guidance on residential and commercial painting, color selection, and surface preparation.', 2)
ON CONFLICT (name) DO NOTHING;

-- Insert Troubleshooting Categories
INSERT INTO troubleshooting_categories (name, description, sort_order) VALUES 
  ('Car Coating Problems', 'Comprehensive guide to common automotive coating problems and their solutions.', 1),
  ('Coating Application Defects', 'Common coating application defects and troubleshooting solutions.', 2)
ON CONFLICT (name) DO NOTHING;

-- Insert sample FAQ items
WITH category_ids AS (
  SELECT id, name FROM faq_categories
)
INSERT INTO faq_items (category_id, question, answer, sort_order)
SELECT 
  c.id,
  'What are the key differences between epoxy and polyurethane coatings for industrial applications?',
  'Epoxy coatings provide excellent chemical resistance and adhesion, making them ideal for chemical plants and manufacturing facilities. Polyurethane coatings offer superior UV resistance and flexibility, perfect for outdoor industrial equipment and structures exposed to weather conditions.',
  1
FROM category_ids c WHERE c.name = 'Industrial and Protective Coating'
UNION ALL
SELECT 
  c.id,
  'What is the difference between interior and exterior architectural paints?',
  'Interior paints are formulated for low VOC emissions, washability, and aesthetic appeal with excellent coverage and color retention indoors. Exterior paints contain UV stabilizers, water repellents, and weather-resistant resins to withstand sun, rain, temperature changes, and pollution.',
  1
FROM category_ids c WHERE c.name = 'Architectural Coating';

-- Insert sample troubleshooting items
WITH category_ids AS (
  SELECT id, name FROM troubleshooting_categories
)
INSERT INTO troubleshooting_items (category_id, problem, solution, severity, sort_order)
SELECT 
  c.id,
  'Poor adhesion between coats',
  'Ensure proper surface preparation and cleaning. Check that the previous coat is properly cured before applying the next layer. Use appropriate adhesion promoter if necessary. Verify compatibility between coating systems.',
  'High',
  1
FROM category_ids c WHERE c.name = 'Car Coating Problems'
UNION ALL
SELECT 
  c.id,
  'Orange peel texture on finish',
  'Reduce spray gun distance to 6-8 inches. Lower spray pressure and increase fluid flow. Ensure proper thinner ratio (10-15%). Apply in thinner, more even coats. Check environmental conditions - avoid high humidity.',
  'Medium',
  2
FROM category_ids c WHERE c.name = 'Car Coating Problems'
UNION ALL
SELECT 
  c.id,
  'Blistering of coating surface',
  'Ensure surface is completely dry before coating application. Remove moisture sources and improve ventilation. Use proper primer system. Apply thinner coats and allow adequate drying time between applications.',
  'High',
  1
FROM category_ids c WHERE c.name = 'Coating Application Defects';

-- Insert sample products
INSERT INTO products (
  name, code, brand, type, material, usage, description, technical_description,
  features, applications, instructions, 
  packaging, technical_specs, storage, safety_precautions, safety_first_aid
) VALUES (
  'Premium Zinc Primer',
  'AZ-ZP-001',
  'Azur',
  'Primer / Surfacer / Sealer',
  'Zinc Silicate',
  'Industrial',
  'High-performance zinc-rich primer for steel protection',
  'Advanced zinc silicate primer formulated with high-grade zinc dust and inorganic silicate binder. Provides cathodic protection to steel substrates through sacrificial zinc action and forms a hard, durable coating that chemically bonds to the steel surface.',
  ARRAY['Excellent corrosion protection', 'Long-lasting durability', 'Superior adhesion', 'Chemical resistance', 'Temperature stability'],
  ARRAY['Steel structures', 'Marine environments', 'Industrial facilities', 'Oil and gas installations', 'Power plants'],
  ARRAY['Clean surface thoroughly to remove rust, oil, and dirt', 'Apply primer in thin, even coats using spray or brush', 'Allow 24 hours curing time between coats', 'Apply topcoat within 7 days for optimal performance'],
  '[{"size": "1L", "type": "Metal Can", "coverage": "8-10 m²"}, {"size": "4L", "type": "Metal Can", "coverage": "32-40 m²"}, {"size": "20L", "type": "Metal Pail", "coverage": "160-200 m²"}]'::jsonb,
  '[{"property": "Zinc Content", "value": "80-85%", "standard": "ASTM D520"}, {"property": "VOC Content", "value": "<340 g/L", "standard": "EPA Method 24"}, {"property": "Dry Film Thickness", "value": "75-100 μm", "standard": "ISO 2808"}]'::jsonb,
  ARRAY['Store in cool, dry place below 30°C', 'Keep container tightly closed', 'Protect from direct sunlight', 'Use within 24 months from date of manufacture'],
  ARRAY['Wear protective clothing and gloves', 'Use respiratory protection in confined spaces', 'Ensure adequate ventilation during application', 'Avoid contact with skin and eyes'],
  ARRAY['Eye contact: Flush with water for 15 minutes', 'Skin contact: Wash with soap and water', 'Inhalation: Move to fresh air immediately', 'Ingestion: Do not induce vomiting, seek medical attention']
),
(
  'Exterior Wall Paint',
  'CP-EW-002', 
  'Caprice',
  'Paints',
  'Acrylic',
  'Exterior',
  'Weather-resistant acrylic paint for exterior walls',
  'Premium acrylic emulsion paint formulated with high-quality resins and weather-resistant pigments. Features advanced UV protection and water repellent properties for long-lasting exterior protection.',
  ARRAY['UV resistance', 'Water repellent', 'Fade resistant', 'Breathable finish', 'Easy cleaning'],
  ARRAY['Building facades', 'Exterior walls', 'Concrete surfaces', 'Masonry walls', 'Stucco surfaces'],
  ARRAY['Prepare surface by cleaning and filling cracks', 'Apply primer if surface is highly porous', 'Apply paint in thin, even coats', 'Allow 4-6 hours between coats'],
  '[{"size": "1L", "type": "Plastic Can", "coverage": "12-14 m²"}, {"size": "4L", "type": "Plastic Can", "coverage": "48-56 m²"}, {"size": "15L", "type": "Plastic Bucket", "coverage": "180-210 m²"}]'::jsonb,
  '[{"property": "Coverage", "value": "12-14 m²/L", "standard": "BS EN ISO 6504"}, {"property": "Drying Time", "value": "2-4 hours", "standard": "ISO 3678"}, {"property": "Gloss Level", "value": "10-15 GU", "standard": "ISO 2813"}]'::jsonb,
  ARRAY['Store in temperature between 5°C to 35°C', 'Keep from freezing', 'Stir well before use', 'Shelf life: 36 months'],
  ARRAY['Ensure adequate ventilation', 'Wear protective equipment', 'Avoid skin and eye contact', 'Keep away from heat sources'],
  ARRAY['Eye contact: Rinse with clean water', 'Skin contact: Wash with soap and water', 'Inhalation: Move to fresh air', 'Seek medical advice if symptoms persist']
);

-- Insert sample bulletins
INSERT INTO bulletins (slug, title, short_description, cover_image, category, subcategory, content) VALUES (
  'ceramic-coating-automotive',
  'Advanced Ceramic Coating Solutions for Automotive Applications',
  'Discover the latest in ceramic coating technology for superior vehicle protection and enhanced aesthetic appeal.',
  'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  'Technical Solutions',
  'Car Coating Systems',
  '[
    {"type": "heading", "level": 1, "content": "Revolutionary Ceramic Coating Technology"},
    {"type": "paragraph", "content": "Modern automotive ceramic coatings represent a breakthrough in vehicle surface protection. These advanced nano-ceramic formulations create an ultra-durable, transparent layer that bonds chemically with the vehicle''s paintwork, providing exceptional protection against environmental contaminants, UV radiation, and mechanical wear."},
    {"type": "heading", "level": 2, "content": "Key Performance Characteristics"},
    {"type": "table", "headers": ["Property", "Standard Coating", "Ceramic Coating", "Performance Gain"], "rows": [["Hardness (Pencil)", "2H-3H", "8H-9H", "+200%"], ["Gloss Retention", "6 months", "2-3 years", "+400%"], ["Chemical Resistance", "Moderate", "Excellent", "+300%"]]}
  ]'::jsonb
),
(
  'concrete-waterproofing-systems',
  'Waterproof Coating Systems for Concrete Structures', 
  'Comprehensive guide to protecting concrete walls from moisture infiltration and environmental damage.',
  'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  'Technical Solutions',
  'Concrete Walls Coating',
  '[
    {"type": "heading", "level": 1, "content": "Concrete Wall Protection Systems"},
    {"type": "paragraph", "content": "Concrete structures face constant threats from moisture infiltration, chemical exposure, and environmental weathering. Our advanced coating systems provide comprehensive protection while maintaining the aesthetic appeal of architectural concrete."},
    {"type": "heading", "level": 2, "content": "Moisture Protection Technology"},
    {"type": "paragraph", "content": "Our waterproof coating systems utilize advanced polymer technology to create a breathable yet impermeable barrier. This allows moisture vapor to escape while preventing liquid water penetration, crucial for maintaining structural integrity."}
  ]'::jsonb
);