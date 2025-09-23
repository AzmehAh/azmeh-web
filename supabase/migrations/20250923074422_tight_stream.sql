/*
  # Add image_url column to product_categories

  1. Changes
    - Add `image_url` column to `product_categories` table to store category images for Hero component
  
  2. Notes
    - Column is nullable to allow existing categories without images
    - Uses TEXT type for storing image URLs
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'product_categories' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE product_categories ADD COLUMN image_url text;
  END IF;
END $$;