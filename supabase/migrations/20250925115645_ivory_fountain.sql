/*
  # Add related_bulletin_ids column to bulletins table

  1. New Columns
    - `related_bulletin_ids` (uuid array, nullable)
      - Stores array of bulletin IDs that are related to the current bulletin
      - Allows null values for bulletins without related content

  2. Security
    - No RLS changes needed as the column inherits existing policies
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bulletins' AND column_name = 'related_bulletin_ids'
  ) THEN
    ALTER TABLE bulletins ADD COLUMN related_bulletin_ids uuid[];
  END IF;
END $$;