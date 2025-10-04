/*
  # Add Complete Arabic Field Support for Products

  This migration adds Arabic (_ar) fields for ALL text fields in the products table
  to enable comprehensive bilingual content management in the admin dashboard.

  ## Fields Added (all nullable/optional):

  ### General Info Section
    - storing_conditions_ar
    - joint_preparation_ar
    - joint_size_ar
    - movement_capacity_ar
    - substrate_treatment_ar
    - surface_preparation_ar
    - recommended_uses_ar

  ### Application Section
    - method_of_application_ar
    - mixing_ratio_ar
    - mixing_note_ar
    - mixing_steps_ar
    - pot_life_ar
    - cleaner_ar
    - thinner_ar
    - application_temperature_ar
    - curing_note_ar
    - note_application_ar

  ### Technical Section
    - number_of_coats_ar
    - tensile_adhesion_strength_ar
    - material_consumption_ar
    - viscosity_ar
    - weather_resistance_ar
    - compressive_strength_ar
    - tear_resistance_ar
    - elongation_at_rupture_ar
    - tensile_strength_100_ar
    - tensile_strength_50_ar
    - specific_gravity_mixed_ar
    - solvent_resistance_ar
    - chemical_resistance_ar
    - abrasion_resistance_ar
    - friction_resistance_ar
    - washability_ar
    - water_resistance_ar
    - theoretical_spreading_rate_ar
    - recommended_film_thickness_ar
    - temperature_resistance_ar
    - solvent_splash_resistance_ar
    - sandability_ar
    - adhesion_ar
    - flexibility_ar
    - voc_ar
    - volume_solids_ar
    - gloss_ar
    - color_ar
    - component_a_ar
    - component_b_ar
    - note_ar

  ### Drying Time Section
    - dry_to_touch_ar
    - dry_to_handle_ar
    - complete_setting_ar
    - grouting_time_ar
    - adjustability_time_ar
    - dry_to_topcoat_ar
    - initial_setting_ar
    - fully_cured_ar
    - dry_to_sand_ar
    - drying_time_note_ar

  ### Safety Section
    - safety_note_ar

  ## Notes:
    - All Arabic fields are nullable (optional)
    - English fields remain required where applicable
    - Frontend will fallback to English if Arabic content is missing
*/

-- General Info Section Arabic Fields
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'storing_conditions_ar') THEN
    ALTER TABLE products ADD COLUMN storing_conditions_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'joint_preparation_ar') THEN
    ALTER TABLE products ADD COLUMN joint_preparation_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'joint_size_ar') THEN
    ALTER TABLE products ADD COLUMN joint_size_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'movement_capacity_ar') THEN
    ALTER TABLE products ADD COLUMN movement_capacity_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'substrate_treatment_ar') THEN
    ALTER TABLE products ADD COLUMN substrate_treatment_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'surface_preparation_ar') THEN
    ALTER TABLE products ADD COLUMN surface_preparation_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'recommended_uses_ar') THEN
    ALTER TABLE products ADD COLUMN recommended_uses_ar text;
  END IF;
END $$;

-- Application Section Arabic Fields
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'method_of_application_ar') THEN
    ALTER TABLE products ADD COLUMN method_of_application_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'mixing_ratio_ar') THEN
    ALTER TABLE products ADD COLUMN mixing_ratio_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'mixing_note_ar') THEN
    ALTER TABLE products ADD COLUMN mixing_note_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'mixing_steps_ar') THEN
    ALTER TABLE products ADD COLUMN mixing_steps_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'pot_life_ar') THEN
    ALTER TABLE products ADD COLUMN pot_life_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'cleaner_ar') THEN
    ALTER TABLE products ADD COLUMN cleaner_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'thinner_ar') THEN
    ALTER TABLE products ADD COLUMN thinner_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'application_temperature_ar') THEN
    ALTER TABLE products ADD COLUMN application_temperature_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'curing_note_ar') THEN
    ALTER TABLE products ADD COLUMN curing_note_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'note_application_ar') THEN
    ALTER TABLE products ADD COLUMN note_application_ar text;
  END IF;
END $$;

-- Technical Section Arabic Fields (Part 1)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'number_of_coats_ar') THEN
    ALTER TABLE products ADD COLUMN number_of_coats_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'tensile_adhesion_strength_ar') THEN
    ALTER TABLE products ADD COLUMN tensile_adhesion_strength_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'material_consumption_ar') THEN
    ALTER TABLE products ADD COLUMN material_consumption_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'viscosity_ar') THEN
    ALTER TABLE products ADD COLUMN viscosity_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'weather_resistance_ar') THEN
    ALTER TABLE products ADD COLUMN weather_resistance_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'compressive_strength_ar') THEN
    ALTER TABLE products ADD COLUMN compressive_strength_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'tear_resistance_ar') THEN
    ALTER TABLE products ADD COLUMN tear_resistance_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'elongation_at_rupture_ar') THEN
    ALTER TABLE products ADD COLUMN elongation_at_rupture_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'tensile_strength_100_ar') THEN
    ALTER TABLE products ADD COLUMN tensile_strength_100_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'tensile_strength_50_ar') THEN
    ALTER TABLE products ADD COLUMN tensile_strength_50_ar text;
  END IF;
END $$;

-- Technical Section Arabic Fields (Part 2)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'specific_gravity_mixed_ar') THEN
    ALTER TABLE products ADD COLUMN specific_gravity_mixed_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'solvent_resistance_ar') THEN
    ALTER TABLE products ADD COLUMN solvent_resistance_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'chemical_resistance_ar') THEN
    ALTER TABLE products ADD COLUMN chemical_resistance_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'abrasion_resistance_ar') THEN
    ALTER TABLE products ADD COLUMN abrasion_resistance_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'friction_resistance_ar') THEN
    ALTER TABLE products ADD COLUMN friction_resistance_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'washability_ar') THEN
    ALTER TABLE products ADD COLUMN washability_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'water_resistance_ar') THEN
    ALTER TABLE products ADD COLUMN water_resistance_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'theoretical_spreading_rate_ar') THEN
    ALTER TABLE products ADD COLUMN theoretical_spreading_rate_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'recommended_film_thickness_ar') THEN
    ALTER TABLE products ADD COLUMN recommended_film_thickness_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'temperature_resistance_ar') THEN
    ALTER TABLE products ADD COLUMN temperature_resistance_ar text;
  END IF;
END $$;

-- Technical Section Arabic Fields (Part 3)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'solvent_splash_resistance_ar') THEN
    ALTER TABLE products ADD COLUMN solvent_splash_resistance_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'sandability_ar') THEN
    ALTER TABLE products ADD COLUMN sandability_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'adhesion_ar') THEN
    ALTER TABLE products ADD COLUMN adhesion_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'flexibility_ar') THEN
    ALTER TABLE products ADD COLUMN flexibility_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'voc_ar') THEN
    ALTER TABLE products ADD COLUMN voc_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'volume_solids_ar') THEN
    ALTER TABLE products ADD COLUMN volume_solids_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'gloss_ar') THEN
    ALTER TABLE products ADD COLUMN gloss_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'color_ar') THEN
    ALTER TABLE products ADD COLUMN color_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'component_a_ar') THEN
    ALTER TABLE products ADD COLUMN component_a_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'component_b_ar') THEN
    ALTER TABLE products ADD COLUMN component_b_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'note_ar') THEN
    ALTER TABLE products ADD COLUMN note_ar text;
  END IF;
END $$;

-- Drying Time Section Arabic Fields
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'dry_to_touch_ar') THEN
    ALTER TABLE products ADD COLUMN dry_to_touch_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'dry_to_handle_ar') THEN
    ALTER TABLE products ADD COLUMN dry_to_handle_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'complete_setting_ar') THEN
    ALTER TABLE products ADD COLUMN complete_setting_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'grouting_time_ar') THEN
    ALTER TABLE products ADD COLUMN grouting_time_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'adjustability_time_ar') THEN
    ALTER TABLE products ADD COLUMN adjustability_time_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'dry_to_topcoat_ar') THEN
    ALTER TABLE products ADD COLUMN dry_to_topcoat_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'initial_setting_ar') THEN
    ALTER TABLE products ADD COLUMN initial_setting_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'fully_cured_ar') THEN
    ALTER TABLE products ADD COLUMN fully_cured_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'dry_to_sand_ar') THEN
    ALTER TABLE products ADD COLUMN dry_to_sand_ar text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'drying_time_note_ar') THEN
    ALTER TABLE products ADD COLUMN drying_time_note_ar text;
  END IF;
END $$;

-- Safety Section Arabic Fields
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'safety_note_ar') THEN
    ALTER TABLE products ADD COLUMN safety_note_ar text;
  END IF;
END $$;
