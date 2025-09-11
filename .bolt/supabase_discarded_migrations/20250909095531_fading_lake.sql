/*
  # Seed FAQ Data

  1. Initial Data
    - FAQ Categories (Industrial and Architectural Coating)
    - FAQ Items with questions and answers
    - Troubleshooting Categories
    - Sample troubleshooting items
*/

-- Insert FAQ Categories
INSERT INTO faq_categories (id, name, description, sort_order) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Industrial and Protective Coating', 'Technical information about industrial coatings, protective systems, and heavy-duty applications.', 1),
  ('550e8400-e29b-41d4-a716-446655440002', 'Architectural Coating', 'Guidance on residential and commercial painting, color selection, and surface preparation.', 2)
ON CONFLICT (id) DO NOTHING;

-- Insert Industrial FAQ Items
INSERT INTO faq_items (category_id, question, answer, sort_order) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'What are the key differences between epoxy and polyurethane coatings for industrial applications?', 'Epoxy coatings provide excellent chemical resistance and adhesion, making them ideal for chemical plants and manufacturing facilities. Polyurethane coatings offer superior UV resistance and flexibility, perfect for outdoor industrial equipment and structures exposed to weather conditions. Epoxy is harder and more chemical resistant, while polyurethane maintains color and gloss better outdoors.', 1),
  ('550e8400-e29b-41d4-a716-446655440001', 'How long does industrial protective coating typically last?', 'Industrial protective coatings typically last 15-25 years depending on the environment and coating system used. In highly corrosive environments, properly applied zinc-rich primers with polyurethane topcoats can provide 20+ years of protection. Regular maintenance and inspection can extend the coating life significantly.', 2),
  ('550e8400-e29b-41d4-a716-446655440001', 'What surface preparation is required for steel structures before coating application?', 'Steel surfaces require thorough preparation including degreasing, removal of rust and mill scale, and abrasive blasting to Sa 2.5 or Sa 3 standards (ISO 8501). The surface must be clean, dry, and free from contaminants. Proper surface preparation accounts for 80% of coating performance and longevity.', 3),
  ('550e8400-e29b-41d4-a716-446655440001', 'Can industrial coatings be applied in cold weather conditions?', 'Most industrial coatings can be applied in temperatures as low as 5°C, provided the surface temperature is at least 3°C above the dew point. Special winter-grade formulations are available for application in sub-zero conditions. Proper curing may take longer in cold weather, and heating may be required for optimal performance.', 4);

-- Insert Architectural FAQ Items
INSERT INTO faq_items (category_id, question, answer, sort_order) VALUES
  ('550e8400-e29b-41d4-a716-446655440002', 'What is the difference between interior and exterior architectural paints?', 'Interior paints are formulated for low VOC emissions, washability, and aesthetic appeal with excellent coverage and color retention indoors. Exterior paints contain UV stabilizers, water repellents, and weather-resistant resins to withstand sun, rain, temperature changes, and pollution. Exterior paints also have higher flexibility to accommodate substrate movement.', 1),
  ('550e8400-e29b-41d4-a716-446655440002', 'How do I choose the right paint finish for different rooms?', 'Flat/Matt finishes are ideal for ceilings and low-traffic areas as they hide imperfections. Eggshell and satin finishes work well in living rooms and bedrooms, offering some washability. Semi-gloss is perfect for kitchens, bathrooms, and trim work due to moisture resistance and easy cleaning. High-gloss provides maximum durability for doors and high-touch surfaces.', 2),
  ('550e8400-e29b-41d4-a716-446655440002', 'What primer should I use for different wall surfaces?', 'New drywall requires a high-build primer to seal the surface and provide uniform coverage. Previously painted surfaces may only need a bonding primer if the existing paint is in good condition. Stained or damaged walls require stain-blocking primers. Masonry and concrete surfaces need alkali-resistant primers to prevent paint failure.', 3),
  ('550e8400-e29b-41d4-a716-446655440002', 'How long should I wait between primer and paint application?', 'Most water-based primers can be topcoated after 1-4 hours, while oil-based primers typically require 12-16 hours. Always check the product datasheet for specific recoat times. Environmental conditions like temperature and humidity affect drying times. Never apply topcoat before the primer has properly cured.', 4);

-- Insert Troubleshooting Categories
INSERT INTO troubleshooting_categories (id, name, description, sort_order) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'Car Coating Problems', 'Common automotive coating problems and their solutions.', 1),
  ('660e8400-e29b-41d4-a716-446655440002', 'Coating Application Defects', 'Common coating application defects and troubleshooting solutions.', 2)
ON CONFLICT (id) DO NOTHING;

-- Insert sample troubleshooting items
INSERT INTO troubleshooting_items (category_id, problem, solution, severity, sort_order) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'Poor adhesion between coats', 'Ensure proper surface preparation and cleaning. Check that the previous coat is properly cured before applying the next layer. Use appropriate adhesion promoter if necessary. Verify compatibility between coating systems.', 'High', 1),
  ('660e8400-e29b-41d4-a716-446655440001', 'Orange peel texture on finish', 'Reduce spray gun distance to 6-8 inches. Lower spray pressure and increase fluid flow. Ensure proper thinner ratio (10-15%). Apply in thinner, more even coats. Check environmental conditions - avoid high humidity.', 'Medium', 2),
  ('660e8400-e29b-41d4-a716-446655440002', 'Blistering of coating surface', 'Ensure surface is completely dry before coating application. Remove moisture sources and improve ventilation. Use proper primer system. Apply thinner coats and allow adequate drying time between applications. Check for substrate contamination.', 'High', 1),
  ('660e8400-e29b-41d4-a716-446655440002', 'Premature coating failure', 'Verify surface preparation meets specifications. Use compatible primer and topcoat systems. Ensure proper application thickness. Check environmental conditions during application. Verify coating storage conditions were appropriate.', 'High', 2);