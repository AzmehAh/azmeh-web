/*
  # Add Arabic Language Support to All Tables

  This migration adds Arabic (_ar) fields to all content tables to support bilingual functionality.

  ## 1. Tables Modified
    ### Products
      - `name_ar` (text) - Arabic product name
      - `description_ar` (text) - Arabic product description
      - `technical_description_ar` (text) - Arabic technical description
      - `features_ar` (text[]) - Arabic features list
      - `applications_ar` (text[]) - Arabic applications list
      - `instructions_ar` (text[]) - Arabic instructions list
      - `storage_ar` (text[]) - Arabic storage instructions
      - `safety_precautions_ar` (text[]) - Arabic safety precautions
      - `safety_first_aid_ar` (text[]) - Arabic first aid instructions

    ### Product Categories
      - `name_ar` (text) - Arabic category name
      - `description_ar` (text) - Arabic category description

    ### Bulletins
      - `title_ar` (text) - Arabic bulletin title
      - `short_description_ar` (text) - Arabic short description

    ### FAQ Categories
      - `name_ar` (text) - Arabic category name
      - `description_ar` (text) - Arabic category description

    ### FAQ Items
      - `question_ar` (text) - Arabic question
      - `answer_ar` (text) - Arabic answer

    ### Troubleshooting Categories
      - `name_ar` (text) - Arabic category name
      - `description_ar` (text) - Arabic category description

    ### Troubleshooting Items
      - `problem_ar` (text) - Arabic problem description
      - `solution_ar` (text) - Arabic solution description

    ### Pages
      - `title_ar` (text) - Arabic page title
      - `meta_description_ar` (text) - Arabic meta description

    ### Contact Messages & Job Applications
      - No Arabic fields needed (user-generated content)

  ## 2. Important Notes
    - All Arabic fields are nullable (optional)
    - Frontend will handle fallback to English if Arabic content is missing
    - Existing data remains unchanged
    - UTF-8 support is already enabled in Supabase

  ## 3. Security
    - No RLS changes needed - columns inherit existing policies
*/

-- Add Arabic fields to products table
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'name_ar') THEN
    ALTER TABLE products ADD COLUMN name_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'description_ar') THEN
    ALTER TABLE products ADD COLUMN description_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'technical_description_ar') THEN
    ALTER TABLE products ADD COLUMN technical_description_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'features_ar') THEN
    ALTER TABLE products ADD COLUMN features_ar text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'applications_ar') THEN
    ALTER TABLE products ADD COLUMN applications_ar text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'instructions_ar') THEN
    ALTER TABLE products ADD COLUMN instructions_ar text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'storage_ar') THEN
    ALTER TABLE products ADD COLUMN storage_ar text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'safety_precautions_ar') THEN
    ALTER TABLE products ADD COLUMN safety_precautions_ar text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'safety_first_aid_ar') THEN
    ALTER TABLE products ADD COLUMN safety_first_aid_ar text[] DEFAULT '{}';
  END IF;
END $$;

-- Add Arabic fields to product_categories table
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product_categories' AND column_name = 'name_ar') THEN
    ALTER TABLE product_categories ADD COLUMN name_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'product_categories' AND column_name = 'description_ar') THEN
    ALTER TABLE product_categories ADD COLUMN description_ar text;
  END IF;
END $$;

-- Add Arabic fields to bulletins table
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bulletins' AND column_name = 'title_ar') THEN
    ALTER TABLE bulletins ADD COLUMN title_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bulletins' AND column_name = 'short_description_ar') THEN
    ALTER TABLE bulletins ADD COLUMN short_description_ar text;
  END IF;
END $$;

-- Add Arabic fields to faq_categories table
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'faq_categories' AND column_name = 'name_ar') THEN
    ALTER TABLE faq_categories ADD COLUMN name_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'faq_categories' AND column_name = 'description_ar') THEN
    ALTER TABLE faq_categories ADD COLUMN description_ar text;
  END IF;
END $$;

-- Add Arabic fields to faq_items table
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'faq_items' AND column_name = 'question_ar') THEN
    ALTER TABLE faq_items ADD COLUMN question_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'faq_items' AND column_name = 'answer_ar') THEN
    ALTER TABLE faq_items ADD COLUMN answer_ar text;
  END IF;
END $$;

-- Add Arabic fields to troubleshooting_categories table
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'troubleshooting_categories' AND column_name = 'name_ar') THEN
    ALTER TABLE troubleshooting_categories ADD COLUMN name_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'troubleshooting_categories' AND column_name = 'description_ar') THEN
    ALTER TABLE troubleshooting_categories ADD COLUMN description_ar text;
  END IF;
END $$;

-- Add Arabic fields to troubleshooting_items table
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'troubleshooting_items' AND column_name = 'problem_ar') THEN
    ALTER TABLE troubleshooting_items ADD COLUMN problem_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'troubleshooting_items' AND column_name = 'solution_ar') THEN
    ALTER TABLE troubleshooting_items ADD COLUMN solution_ar text;
  END IF;
END $$;

-- Add Arabic fields to pages table
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pages' AND column_name = 'title_ar') THEN
    ALTER TABLE pages ADD COLUMN title_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pages' AND column_name = 'meta_description_ar') THEN
    ALTER TABLE pages ADD COLUMN meta_description_ar text;
  END IF;
END $$;
