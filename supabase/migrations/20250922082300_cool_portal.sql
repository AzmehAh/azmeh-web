/*
  # Add Featured Field to Products Table

  1. Schema Changes
    - Add `featured` boolean field to `products` table with default false
    - Add index on featured field for better query performance

  2. Security
    - No changes to existing RLS policies needed
    - Featured field will be managed by authenticated users only
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'featured'
  ) THEN
    ALTER TABLE products ADD COLUMN featured boolean DEFAULT false;
  END IF;
END $$;

-- Add index for featured products queries
CREATE INDEX IF NOT EXISTS idx_products_featured ON products (featured) WHERE featured = true;