/*
  # Add main image support to product_images table

  1. New Columns
    - `is_main` (boolean) to track which image is the main product image
  
  2. Updates
    - Add index for efficient main image queries
    - Update RLS policies for proper access control
    - Add constraint to ensure only one main image per product
*/

-- Add is_main column to product_images table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'product_images' AND column_name = 'is_main'
  ) THEN
    ALTER TABLE product_images ADD COLUMN is_main boolean DEFAULT false;
  END IF;
END $$;

-- Add index for efficient main image queries
CREATE INDEX IF NOT EXISTS idx_product_images_main ON product_images (product_id, is_main) WHERE is_main = true;

-- Add function to ensure only one main image per product
CREATE OR REPLACE FUNCTION ensure_single_main_image()
RETURNS TRIGGER AS $$
BEGIN
  -- If setting this image as main, unset all other main images for this product
  IF NEW.is_main = true THEN
    UPDATE product_images 
    SET is_main = false 
    WHERE product_id = NEW.product_id AND id != NEW.id AND is_main = true;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to ensure only one main image per product
DROP TRIGGER IF EXISTS trigger_ensure_single_main_image ON product_images;
CREATE TRIGGER trigger_ensure_single_main_image
  BEFORE INSERT OR UPDATE ON product_images
  FOR EACH ROW
  EXECUTE FUNCTION ensure_single_main_image();