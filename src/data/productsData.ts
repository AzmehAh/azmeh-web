{/*export interface Product {
  id: string;
  name: string;
  code: string;
  brand: string;
  type: string;
  material: string;
  usage: string;
  description: string;
  technicalDescription: string;
  images: string[];
  features: string[];
  applications: string[];
  instructions: string[];
  technicalSpecs: {
    property: string;
    value: string;
    standard: string;
  }[];
  packaging: {
    size: string;
    type: string;
    coverage: string;
  }[];
  storage: string[];
  safety: {
    precautions: string[];
    firstAid: string[];
  };
}

export const productsData: Product[] = [
  {
    id: 'azur-primer-001',
    name: 'Premium Zinc Primer',
    code: 'AZ-ZP-001',
    brand: 'Azur',
    type: 'Primer / Surfacer / Sealer',
    material: 'Zinc Silicate',
    usage: 'Industrial',
    description: 'High-performance zinc-rich primer for steel protection',
    technicalDescription: 'Advanced zinc silicate primer formulated with high-grade zinc dust and inorganic silicate binder. Provides cathodic protection to steel substrates through sacrificial zinc action and forms a hard, durable coating that chemically bonds to the steel surface.',
    images: [
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
    ],
    features: ['Excellent corrosion protection', 'Long-lasting durability', 'Superior adhesion', 'Chemical resistance', 'Temperature stability'],
    applications: ['Steel structures', 'Marine environments', 'Industrial facilities', 'Oil and gas installations', 'Power plants'],
    instructions: [
      'Clean surface thoroughly to remove rust, oil, and dirt',
      'Apply primer in thin, even coats using spray or brush',
      'Allow 24 hours curing time between coats',
      'Apply topcoat within 7 days for optimal performance'
    ],
    technicalSpecs: [
      { property: 'Zinc Content', value: '80-85%', standard: 'ASTM D520' },
      { property: 'VOC Content', value: '<340 g/L', standard: 'EPA Method 24' },
      { property: 'Dry Film Thickness', value: '75-100 μm', standard: 'ISO 2808' },
      { property: 'Adhesion', value: 'Grade 0', standard: 'ISO 4624' },
      { property: 'Salt Spray Resistance', value: '>1000 hours', standard: 'ASTM B117' }
    ],
    packaging: [
      { size: '1L', type: 'Metal Can', coverage: '8-10 m²' },
      { size: '4L', type: 'Metal Can', coverage: '32-40 m²' },
      { size: '20L', type: 'Metal Pail', coverage: '160-200 m²' }
    ],
    storage: [
      'Store in cool, dry place below 30°C',
      'Keep container tightly closed',
      'Protect from direct sunlight',
      'Use within 24 months from date of manufacture'
    ],
    safety: {
      precautions: [
        'Wear protective clothing and gloves',
        'Use respiratory protection in confined spaces',
        'Ensure adequate ventilation during application',
        'Avoid contact with skin and eyes'
      ],
      firstAid: [
        'Eye contact: Flush with water for 15 minutes',
        'Skin contact: Wash with soap and water',
        'Inhalation: Move to fresh air immediately',
        'Ingestion: Do not induce vomiting, seek medical attention'
      ]
    }
  },
  {
    id: 'caprice-paint-002',
    name: 'Exterior Wall Paint',
    code: 'CP-EW-002',
    brand: 'Caprice',
    type: 'Paints',
    material: 'Acrylic',
    usage: 'Exterior',
    description: 'Weather-resistant acrylic paint for exterior walls',
    technicalDescription: 'Premium acrylic emulsion paint formulated with high-quality resins and weather-resistant pigments. Features advanced UV protection and water repellent properties for long-lasting exterior protection.',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
    ],
    features: ['UV resistance', 'Water repellent', 'Fade resistant', 'Breathable finish', 'Easy cleaning'],
    applications: ['Building facades', 'Exterior walls', 'Concrete surfaces', 'Masonry walls', 'Stucco surfaces'],
    instructions: [
      'Prepare surface by cleaning and filling cracks',
      'Apply primer if surface is highly porous',
      'Apply paint in thin, even coats',
      'Allow 4-6 hours between coats'
    ],
    technicalSpecs: [
      { property: 'Coverage', value: '12-14 m²/L', standard: 'BS EN ISO 6504' },
      { property: 'Drying Time', value: '2-4 hours', standard: 'ISO 3678' },
      { property: 'Gloss Level', value: '10-15 GU', standard: 'ISO 2813' },
      { property: 'Washability', value: 'Class 2', standard: 'ISO 11998' },
      { property: 'UV Resistance', value: 'Excellent', standard: 'ASTM G154' }
    ],
    packaging: [
      { size: '1L', type: 'Plastic Can', coverage: '12-14 m²' },
      { size: '4L', type: 'Plastic Can', coverage: '48-56 m²' },
      { size: '15L', type: 'Plastic Bucket', coverage: '180-210 m²' }
    ],
    storage: [
      'Store in temperature between 5°C to 35°C',
      'Keep container sealed when not in use',
      'Stir well before use',
      'Shelf life: 36 months'
    ],
    safety: {
      precautions: [
        'Ensure adequate ventilation',
        'Wear protective equipment',
        'Avoid skin and eye contact',
        'Keep away from heat sources'
      ],
      firstAid: [
        'Eye contact: Rinse with clean water',
        'Skin contact: Wash with soap and water',
        'Inhalation: Move to fresh air',
        'Seek medical advice if symptoms persist'
      ]
    }
  },
  {
    id: 'omygan-putty-003',
    name: 'Smooth Wall Putty',
    code: 'OM-SW-003',
    brand: 'Omygan',
    type: 'Putties',
    material: 'Acrylic Emulsion',
    usage: 'Interior',
    description: 'High-quality wall putty for smooth interior finishes',
    technicalDescription: 'Ready-to-use acrylic emulsion-based wall putty designed to provide smooth, uniform surfaces for interior painting. Formulated with fine fillers and high-grade binders for excellent workability and adhesion.',
    images: [
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
    ],
    features: ['Easy application', 'Fast drying', 'Excellent coverage', 'Crack resistance', 'Smooth finish'],
    applications: ['Interior walls', 'Ceiling preparation', 'Decorative surfaces', 'Drywall finishing', 'Surface smoothing'],
    instructions: [
      'Ensure surface is clean and dry',
      'Apply putty with putty knife in thin layers',
      'Allow to dry completely between coats',
      'Sand smooth when fully dry'
    ],
    technicalSpecs: [
      { property: 'Consistency', value: 'Smooth paste', standard: 'Internal Standard' },
      { property: 'Drying Time', value: '4-6 hours', standard: 'ASTM D1640' },
      { property: 'Coverage', value: '1.5-2 m²/kg', standard: 'BS EN 1062' },
      { property: 'Adhesion', value: '>1.5 MPa', standard: 'EN 24624' },
      { property: 'Workability', value: '2-3 hours', standard: 'Internal Test' }
    ],
    packaging: [
      { size: '5kg', type: 'Plastic Bucket', coverage: '7.5-10 m²' },
      { size: '20kg', type: 'Plastic Bucket', coverage: '30-40 m²' },
      { size: '25kg', type: 'Plastic Bucket', coverage: '37.5-50 m²' }
    ],
    storage: [
      'Store in cool, dry conditions',
      'Protect from freezing',
      'Keep container tightly closed',
      'Use within 12 months'
    ],
    safety: {
      precautions: [
        'Wear gloves during application',
        'Avoid dust inhalation',
        'Use in well-ventilated areas',
        'Wash hands after use'
      ],
      firstAid: [
        'Eye contact: Flush with water immediately',
        'Skin contact: Wash with soap and water',
        'Inhalation: Move to fresh air',
        'Consult physician if irritation persists'
      ]
    }
  },
  {
    id: 'original-lacquer-004',
    name: 'Wood Lacquer Finish',
    code: 'OR-WL-004',
    brand: 'Original',
    type: 'Lacquer',
    material: 'Nitrocellulose',
    usage: 'Decorative',
    description: 'Premium lacquer for high-gloss wood finishes',
    technicalDescription: 'High-performance nitrocellulose lacquer formulated for superior gloss and durability on wooden surfaces. Fast-drying formula with excellent flow and leveling properties for professional finishing applications.',
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
    ],
    features: ['High gloss finish', 'Quick drying', 'Excellent durability', 'Superior flow', 'Water resistance'],
    applications: ['Furniture', 'Wooden surfaces', 'Decorative items', 'Cabinets', 'Musical instruments'],
    instructions: [
      'Sand surface to 320 grit finish',
      'Remove all dust with tack cloth',
      'Apply thin, even coats with spray gun',
      'Sand lightly between coats with 400 grit'
    ],
    technicalSpecs: [
      { property: 'Viscosity', value: '18-22 seconds', standard: 'DIN Cup 4' },
      { property: 'Solid Content', value: '25-30%', standard: 'ISO 3251' },
      { property: 'Gloss Level', value: '85-95 GU', standard: 'ISO 2813' },
      { property: 'Hardness', value: '2H-3H', standard: 'ISO 15184' },
      { property: 'Adhesion', value: 'Grade 0', standard: 'ISO 2409' }
    ],
    packaging: [
      { size: '1L', type: 'Metal Can', coverage: '12-15 m²' },
      { size: '4L', type: 'Metal Can', coverage: '48-60 m²' },
      { size: '20L', type: 'Metal Drum', coverage: '240-300 m²' }
    ],
    storage: [
      'Store in temperatures below 30°C',
      'Keep away from ignition sources',
      'Store upright in original container',
      'Use within 18 months of manufacture'
    ],
    safety: {
      precautions: [
        'Use only in well-ventilated areas',
        'Wear respiratory protection',
        'Avoid skin contact',
        'Keep away from flames and sparks'
      ],
      firstAid: [
        'Eye contact: Flush with water for 15 minutes',
        'Skin contact: Remove contaminated clothing, wash skin',
        'Inhalation: Move to fresh air, seek medical attention',
        'Ingestion: Do not induce vomiting, seek medical help'
      ]
    }
  },
  {
    id: 'miracle-solvent-005',
    name: 'Paint Thinner',
    code: 'MR-PT-005',
    brand: 'Miracle',
    type: 'Solvents (Thinners)',
    material: 'Solvents',
    usage: 'Industrial',
    description: 'High-quality paint thinner for various applications',
    technicalDescription: 'Premium grade paint thinner blend of aromatic and aliphatic hydrocarbons designed for thinning alkyd paints, cleaning equipment, and surface preparation. Low odor formulation with controlled evaporation rate.',
    images: [
      'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
    ],
    features: ['Fast evaporation', 'Clean mixing', 'Low odor', 'High solvency', 'Controlled evaporation'],
    applications: ['Paint thinning', 'Cleaning', 'Surface preparation', 'Equipment cleaning', 'Degreasing'],
    instructions: [
      'Add slowly to paint while stirring',
      'Use recommended thinning ratios',
      'Ensure proper ventilation during use',
      'Clean tools immediately after use'
    ],
    technicalSpecs: [
      { property: 'Specific Gravity', value: '0.78-0.82', standard: 'ASTM D891' },
      { property: 'Flash Point', value: '38°C', standard: 'ASTM D93' },
      { property: 'Evaporation Rate', value: '3.2 (n-BuAc=1)', standard: 'ASTM D3539' },
      { property: 'Kauri-Butanol Value', value: '105-115', standard: 'ASTM D1133' },
      { property: 'Water Content', value: '<0.1%', standard: 'ASTM D1364' }
    ],
    packaging: [
      { size: '1L', type: 'Metal Can', coverage: 'Varies by application' },
      { size: '4L', type: 'Metal Can', coverage: 'Varies by application' },
      { size: '20L', type: 'Metal Drum', coverage: 'Varies by application' }
    ],
    storage: [
      'Store in cool, well-ventilated area',
      'Keep away from heat and ignition sources',
      'Keep container tightly closed',
      'Ground containers during transfer'
    ],
    safety: {
      precautions: [
        'Highly flammable - keep away from flames',
        'Use explosion-proof equipment',
        'Ground all equipment during transfer',
        'Use only with adequate ventilation'
      ],
      firstAid: [
        'Eye contact: Flush with water for 15 minutes',
        'Skin contact: Wash with soap and water',
        'Inhalation: Move to fresh air, get medical attention',
        'Ingestion: Do not induce vomiting, seek immediate medical help'
      ]
    }
  },
  {
    id: 'srt-epoxy-006',
    name: 'Industrial Epoxy Coating',
    code: 'SRT-IE-006',
    brand: 'SRT',
    type: 'Paints',
    material: 'Epoxy',
    usage: 'Industrial',
    description: 'Heavy-duty epoxy coating for industrial applications',
    technicalDescription: 'Two-component epoxy coating system designed for heavy-duty industrial applications. Provides excellent chemical resistance, mechanical strength, and long-term durability in aggressive environments.',
    images: [
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
    ],
    features: ['Chemical resistance', 'High durability', 'Easy maintenance', 'Abrasion resistance', 'Seamless finish'],
    applications: ['Factory floors', 'Chemical plants', 'Storage tanks', 'Food processing areas', 'Pharmaceutical facilities'],
    instructions: [
      'Mix components in correct ratio (2:1 by volume)',
      'Ensure surface is clean and dry',
      'Apply with roller or squeegee',
      'Maintain wet edge during application'
    ],
    technicalSpecs: [
      { property: 'Pot Life', value: '45 minutes at 25°C', standard: 'ASTM D2471' },
      { property: 'Coverage', value: '4-6 m²/L at 250μm', standard: 'ISO 6504' },
      { property: 'Compressive Strength', value: '80 MPa', standard: 'ASTM D695' },
      { property: 'Chemical Resistance', value: 'Excellent', standard: 'ASTM D1308' },
      { property: 'Abrasion Resistance', value: '15 mg loss', standard: 'ASTM D4060' }
    ],
    packaging: [
      { size: '5L Kit', type: 'Metal Cans', coverage: '20-30 m²' },
      { size: '20L Kit', type: 'Metal Pails', coverage: '80-120 m²' },
      { size: '200L Kit', type: 'Metal Drums', coverage: '800-1200 m²' }
    ],
    storage: [
      'Store components separately',
      'Keep in dry conditions below 25°C',
      'Use within 12 months',
      'Protect from moisture'
    ],
    safety: {
      precautions: [
        'Avoid skin contact with uncured material',
        'Use in well-ventilated areas',
        'Wear chemical-resistant gloves',
        'Use respiratory protection if needed'
      ],
      firstAid: [
        'Eye contact: Flush with water, seek medical attention',
        'Skin contact: Wash immediately with soap and water',
        'Inhalation: Move to fresh air',
        'Get medical attention for any adverse reactions'
      ]
    }
  },
  {
    id: 'alzahab-polyurethane-007',
    name: 'Polyurethane Topcoat',
    code: 'AZ-PT-007',
    brand: 'Al Zahab',
    type: 'Paints',
    material: 'Polyurethane',
    usage: 'Exterior',
    description: 'Premium polyurethane topcoat for superior protection',
    technicalDescription: 'High-performance polyurethane topcoat offering exceptional weather resistance and durability. Formulated with advanced UV absorbers and light stabilizers for long-term color and gloss retention.',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
    ],
    features: ['Weather resistance', 'High gloss', 'Long lasting', 'Color retention', 'Chemical resistance'],
    applications: ['Marine structures', 'Bridges', 'Industrial equipment', 'Offshore platforms', 'Heavy machinery'],
    instructions: [
      'Apply over properly cured primer',
      'Ensure surface is clean and dry',
      'Apply in controlled environmental conditions',
      'Maintain recommended film thickness'
    ],
    technicalSpecs: [
      { property: 'Gloss Retention', value: '>80% after 2000h', standard: 'ASTM G154' },
      { property: 'Impact Resistance', value: '50 inch-lbs', standard: 'ASTM D2794' },
      { property: 'Flexibility', value: '1/8" mandrel', standard: 'ASTM D522' },
      { property: 'Salt Spray', value: '>2000 hours', standard: 'ASTM B117' },
      { property: 'Temperature Range', value: '-40°C to +120°C', standard: 'Service Range' }
    ],
    packaging: [
      { size: '1L Kit', type: 'Metal Cans', coverage: '8-10 m²' },
      { size: '4L Kit', type: 'Metal Cans', coverage: '32-40 m²' },
      { size: '20L Kit', type: 'Metal Pails', coverage: '160-200 m²' }
    ],
    storage: [
      'Store in dry place below 25°C',
      'Keep containers tightly sealed',
      'Protect from direct sunlight',
      'Shelf life: 24 months'
    ],
    safety: {
      precautions: [
        'Use appropriate PPE',
        'Ensure adequate ventilation',
        'Avoid inhalation of vapors',
        'Keep away from ignition sources'
      ],
      firstAid: [
        'Eye contact: Irrigate with water for 15 minutes',
        'Skin contact: Wash with soap and water',
        'Inhalation: Remove to fresh air',
        'Seek medical attention if symptoms develop'
      ]
    }
  },
  {
    id: 'coprabel-alkyd-008',
    name: 'Alkyd Enamel Paint',
    code: 'CB-AE-008',
    brand: 'Coprabel',
    type: 'Paints',
    material: 'Alkyd Synthetic',
    usage: 'Decorative',
    description: 'High-quality alkyd enamel for decorative applications',
    technicalDescription: 'Premium alkyd synthetic enamel paint formulated with high-grade resins and pigments. Provides excellent flow, leveling, and gloss retention for decorative and protective applications on various substrates.',
    images: [
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
    ],
    features: ['Smooth finish', 'Good coverage', 'Easy application', 'Excellent flow', 'Durable protection'],
    applications: ['Interior trim', 'Furniture', 'Decorative elements', 'Doors and windows', 'Metal surfaces'],
    instructions: [
      'Prepare surface according to substrate requirements',
      'Apply primer if necessary',
      'Stir paint thoroughly before use',
      'Apply in thin, even coats'
    ],
    technicalSpecs: [
      { property: 'Coverage', value: '12-14 m²/L', standard: 'ISO 6504' },
      { property: 'Drying Time', value: '6-8 hours', standard: 'ISO 3678' },
      { property: 'Gloss Level', value: '80-90 GU', standard: 'ISO 2813' },
      { property: 'Viscosity', value: '85-95 KU', standard: 'ASTM D562' },
      { property: 'VOC Content', value: '<450 g/L', standard: 'EPA Method 24' }
    ],
    packaging: [
      { size: '1L', type: 'Metal Can', coverage: '12-14 m²' },
      { size: '4L', type: 'Metal Can', coverage: '48-56 m²' },
      { size: '20L', type: 'Metal Pail', coverage: '240-280 m²' }
    ],
    storage: [
      'Store in cool, dry place',
      'Keep container tightly sealed',
      'Avoid extreme temperatures',
      'Shelf life: 36 months'
    ],
    safety: {
      precautions: [
        'Ensure adequate ventilation',
        'Avoid prolonged skin contact',
        'Use appropriate protective equipment',
        'Keep away from heat sources'
      ],
      firstAid: [
        'Eye contact: Flush with clean water',
        'Skin contact: Wash with soap and water',
        'Inhalation: Move to fresh air',
        'Consult doctor if symptoms persist'
      ]
    }
  },
  {
    id: 'jupiter-misc-009',
    name: 'Surface Cleaner',
    code: 'JP-SC-009',
    brand: 'Jupiter',
    type: 'Miscellaneous materials',
    material: 'Miscellaneous materials',
    usage: 'Industrial',
    description: 'Professional surface cleaner for paint preparation',
    technicalDescription: 'Advanced surface cleaner formulated to remove oil, grease, dirt, and other contaminants from surfaces prior to painting. Contains specialized surfactants and degreasers for effective cleaning action.',
    images: [
      'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
    ],
    features: ['Deep cleaning', 'Fast acting', 'Residue free', 'Biodegradable', 'Multi-surface'],
    applications: ['Surface preparation', 'Paint removal', 'Maintenance', 'Degreasing', 'Equipment cleaning'],
    instructions: [
      'Dilute according to contamination level',
      'Apply to surface and allow contact time',
      'Agitate with brush or cloth if needed',
      'Rinse thoroughly with clean water'
    ],
    technicalSpecs: [
      { property: 'pH Value', value: '9.5-10.5', standard: 'ASTM D1293' },
      { property: 'Specific Gravity', value: '1.02-1.05', standard: 'ASTM D891' },
      { property: 'Dilution Ratio', value: '1:5 to 1:20', standard: 'Application Dependent' },
      { property: 'Foam Level', value: 'Low', standard: 'Internal Test' },
      { property: 'Biodegradability', value: '>90%', standard: 'OECD 301D' }
    ],
    packaging: [
      { size: '1L', type: 'Plastic Bottle', coverage: '20-100 m²' },
      { size: '5L', type: 'Plastic Can', coverage: '100-500 m²' },
      { size: '25L', type: 'Plastic Drum', coverage: '500-2500 m²' }
    ],
    storage: [
      'Store in original container',
      'Keep in cool, dry place',
      'Protect from freezing',
      'Use within 24 months'
    ],
    safety: {
      precautions: [
        'Wear rubber gloves',
        'Avoid eye contact',
        'Use in ventilated areas',
        'Do not mix with other chemicals'
      ],
      firstAid: [
        'Eye contact: Flush with water immediately',
        'Skin contact: Wash with soap and water',
        'Inhalation: Move to fresh air',
        'Ingestion: Rinse mouth, drink water, seek medical advice'
      ]
    }
  },
  {
    id: 'azur-acrylic-010',
    name: 'Interior Wall Paint',
    code: 'AZ-IW-010',
    brand: 'Azur',
    type: 'Paints',
    material: 'Acrylic Emulsion',
    usage: 'Interior',
    description: 'Premium acrylic emulsion paint for interior walls',
    technicalDescription: 'High-quality acrylic emulsion paint formulated with premium resins and titanium dioxide for excellent coverage and durability. Low VOC formulation suitable for interior environments with superior hiding power.',
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
    ],
    features: ['Low VOC', 'Washable', 'Excellent coverage', 'Stain resistance', 'Mold resistance'],
    applications: ['Living rooms', 'Bedrooms', 'Offices', 'Healthcare facilities', 'Educational buildings'],
    instructions: [
      'Ensure surface is clean and properly prepared',
      'Apply primer on highly porous surfaces',
      'Apply paint with brush, roller, or spray',
      'Allow 4 hours drying time between coats'
    ],
    technicalSpecs: [
      { property: 'Coverage', value: '14-16 m²/L', standard: 'BS EN ISO 6504' },
      { property: 'VOC Content', value: '<30 g/L', standard: 'EPA Method 24' },
      { property: 'Hiding Power', value: '98% at 6 m²/L', standard: 'ISO 6504-3' },
      { property: 'Scrub Resistance', value: '>5000 cycles', standard: 'ASTM D2486' },
      { property: 'Sheen Level', value: '5-15 GU', standard: 'ASTM D523' }
    ],
    packaging: [
      { size: '1L', type: 'Plastic Can', coverage: '14-16 m²' },
      { size: '4L', type: 'Plastic Can', coverage: '56-64 m²' },
      { size: '15L', type: 'Plastic Bucket', coverage: '210-240 m²' }
    ],
    storage: [
      'Store between 5°C to 35°C',
      'Keep from freezing',
      'Stir well before use',
      'Shelf life: 36 months'
    ],
    safety: {
      precautions: [
        'Ensure good ventilation',
        'Avoid eye and skin contact',
        'Wear appropriate protective clothing',
        'Keep container closed when not in use'
      ],
      firstAid: [
        'Eye contact: Flush with water for 15 minutes',
        'Skin contact: Wash with soap and water',
        'Inhalation: Move to fresh air',
        'Ingestion: Rinse mouth, do not induce vomiting'
      ]
    }
  },
  {
    id: 'original-melamine-011',
    name: 'Melamine Furniture Paint',
    code: 'OR-MF-011',
    brand: 'Original',
    type: 'Paints',
    material: 'Melamine',
    usage: 'Decorative',
    description: 'Durable melamine paint for furniture applications',
    technicalDescription: 'High-performance melamine-formaldehyde resin coating designed for furniture and interior woodwork. Provides exceptional hardness, scratch resistance, and chemical resistance for demanding applications.',
    images: [
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
    ],
    features: ['Scratch resistant', 'High durability', 'Smooth finish', 'Chemical resistance', 'Heat resistance'],
    applications: ['Kitchen cabinets', 'Furniture', 'Interior woodwork', 'Office furniture', 'Decorative panels'],
    instructions: [
      'Sand surface to remove existing finish',
      'Clean with degreaser and allow to dry',
      'Apply sealer coat if required',
      'Spray apply in controlled environment'
    ],
    technicalSpecs: [
      { property: 'Hardness', value: '4H-5H', standard: 'ISO 15184' },
      { property: 'Scratch Resistance', value: '2N load', standard: 'ISO 1518' },
      { property: 'Chemical Resistance', value: 'Excellent', standard: 'ASTM D1308' },
      { property: 'Heat Resistance', value: '120°C', standard: 'ISO 2809' },
      { property: 'Gloss Level', value: '85-95 GU', standard: 'ISO 2813' }
    ],
    packaging: [
      { size: '1L', type: 'Metal Can', coverage: '10-12 m²' },
      { size: '4L', type: 'Metal Can', coverage: '40-48 m²' },
      { size: '20L', type: 'Metal Drum', coverage: '200-240 m²' }
    ],
    storage: [
      'Store in temperature controlled environment',
      'Keep away from moisture',
      'Use within 18 months',
      'Store upright'
    ],
    safety: {
      precautions: [
        'Use only in spray booth environment',
        'Wear full respiratory protection',
        'Avoid skin contact',
        'Use explosion-proof equipment'
      ],
      firstAid: [
        'Eye contact: Flush with water, get medical attention',
        'Skin contact: Wash immediately with soap',
        'Inhalation: Move to fresh air, seek medical help',
        'Ingestion: Do not induce vomiting, get medical attention'
      ]
    }
  },
  {
    id: 'miracle-sealer-012',
    name: 'Concrete Sealer',
    code: 'MR-CS-012',
    brand: 'Miracle',
    type: 'Primer / Surfacer / Sealer',
    material: 'Silicone / Siloxane',
    usage: 'Exterior',
    description: 'Advanced siloxane sealer for concrete protection',
    technicalDescription: 'Penetrating siloxane sealer that chemically reacts with concrete to form a permanent water-repellent barrier. Maintains breathability while providing excellent protection against water ingress and freeze-thaw damage.',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
    ],
    features: ['Breathable', 'Water repellent', 'Long lasting', 'UV stable', 'Penetrating protection'],
    applications: ['Concrete walls', 'Building facades', 'Parking structures', 'Bridge decks', 'Precast concrete'],
    instructions: [
      'Ensure concrete is fully cured (min 28 days)',
      'Clean surface of all contaminants',
      'Apply by low-pressure spray or brush',
      'Apply to refusal until surface is saturated'
    ],
    technicalSpecs: [
      { property: 'Penetration Depth', value: '5-15mm', standard: 'EN 13577' },
      { property: 'Water Absorption', value: '<5%', standard: 'EN 13580' },
      { property: 'Vapor Permeability', value: '>90%', standard: 'EN ISO 7783' },
      { property: 'Chloride Reduction', value: '>95%', standard: 'EN 13580' },
      { property: 'Active Content', value: '40%', standard: 'Internal Standard' }
    ],
    packaging: [
      { size: '1L', type: 'Plastic Bottle', coverage: '4-8 m²' },
      { size: '5L', type: 'Plastic Can', coverage: '20-40 m²' },
      { size: '25L', type: 'Plastic Drum', coverage: '100-200 m²' }
    ],
    storage: [
      'Store in original sealed container',
      'Protect from freezing',
      'Keep in dry conditions',
      'Use within 60 months'
    ],
    safety: {
      precautions: [
        'Avoid skin and eye contact',
        'Use in well-ventilated areas',
        'Wear protective gloves',
        'Do not contaminate water sources'
      ],
      firstAid: [
        'Eye contact: Flush with water for 15 minutes',
        'Skin contact: Wash with soap and water',
        'Inhalation: Move to fresh air',
        'Seek medical advice if irritation occurs'
      ]
    }
  }
];

export const filterOptions = {
  type: [
    'Primer / Surfacer / Sealer',
    'Paints',
    'Putties',
    'Lacquer',
    'Solvents (Thinners)',
    'Miscellaneous materials'
  ],
  brand: [
    'Azur',
    'Caprice',
    'Omygan',
    'Original',
    'Miracle',
    'SRT',
    'Al Zahab',
    'Coprabel',
    'Jupiter'
  ],
  material: [
    'Zinc Silicate',
    'Epoxy',
    'Polyurethane',
    'Acrylic',
    'Alkyd Synthetic',
    'Nitrocellulose',
    'Melamine',
    'Chlorinated Rubber',
    'Silicone / Siloxane',
    'Acrylic Emulsion',
    'Miscellaneous materials',
    'Solvents',
    'PVA-based Emulsion'
  ],
  usage: [
    'Exterior',
    'Interior',
    'Industrial',
    'Decorative',
    'Marine',
    'Automotive'
  ]
};