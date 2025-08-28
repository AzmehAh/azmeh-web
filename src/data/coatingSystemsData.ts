export interface CoatingSystem {
  id: string;
  name: string;
  category: 'paint-systems' | 'technical-solutions';
  title: string;
  subtitle?: string;
  description: string;
  purpose: string;
  applications: string[];
  instructions: {
    surfacePreparation: string[];
    mixing: string;
    application: string[];
    dryingTime: string;
    conditions: string[];
  };
  technicalSpecs: {
    property: string;
    value: string;
    unit?: string;
  }[];
  advantages: string[];
  images: string[];
  colors: string[];
  packaging: string[];
  shelfLife: string;
  safety: string[];
}

export const coatingSystemsData: CoatingSystem[] = [
  {
    id: 'concrete-exterior',
    name: 'Concrete Exterior',
    category: 'paint-systems',
    title: 'Concrete Exterior Coating System',
    subtitle: 'High-Performance Protective Coating for Concrete Surfaces',
    description: 'Advanced protective coating system specifically designed for exterior concrete surfaces, providing exceptional weather resistance, UV protection, and long-lasting durability against harsh environmental conditions.',
    purpose: 'To protect and beautify exterior concrete surfaces while providing superior resistance to weathering, carbonation, chloride penetration, and mechanical wear.',
    applications: [
      'Concrete building facades',
      'Bridge structures and infrastructure',
      'Parking decks and garages',
      'Industrial concrete surfaces',
      'Precast concrete elements',
      'Concrete walls and foundations'
    ],
    instructions: {
      surfacePreparation: [
        'Remove all loose particles, dirt, oil, and contaminants',
        'Repair cracks and surface defects with appropriate concrete repair materials',
        'Surface must be clean, dry, and sound',
        'pH should be between 6-9',
        'Moisture content should not exceed 6%'
      ],
      mixing: 'Mix thoroughly with mechanical mixer for 3-5 minutes. Do not add water or other thinners.',
      application: [
        'Apply primer coat if required on highly porous surfaces',
        'Apply first coat with brush, roller, or spray in thin, even layers',
        'Allow proper drying time between coats',
        'Apply second coat perpendicular to first coat direction',
        'Final thickness: 150-200 microns'
      ],
      dryingTime: 'Touch dry: 2-4 hours, Recoat time: 6-8 hours, Full cure: 7 days',
      conditions: [
        'Temperature: 10-35°C',
        'Relative humidity: <85%',
        'No application during rain or high wind',
        'Avoid direct sunlight during application'
      ]
    },
    technicalSpecs: [
      { property: 'Density', value: '1.4-1.6', unit: 'g/cm³' },
      { property: 'Viscosity', value: '90-110', unit: 'KU' },
      { property: 'Solid Content', value: '45-50', unit: '%' },
      { property: 'VOC Content', value: '<50', unit: 'g/L' },
      { property: 'Adhesion', value: '>2.5', unit: 'MPa' },
      { property: 'Water Permeability', value: '<0.1', unit: 'kg/m²h⁰·⁵' },
      { property: 'UV Resistance', value: 'Excellent', unit: '-' },
      { property: 'Carbonation Resistance', value: '>50', unit: 'mm' },
      { property: 'Chloride Resistance', value: 'High', unit: '-' }
    ],
    advantages: [
      'Excellent weather resistance and UV stability',
      'Superior adhesion to concrete surfaces',
      'Reduces carbonation and chloride penetration',
      'Breathable coating allows moisture vapor transmission',
      'Easy application and maintenance',
      'Long-term durability with minimal maintenance',
      'Available in wide range of colors'
    ],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'
    ],
    colors: ['White', 'Light Gray', 'Medium Gray', 'Beige', 'Custom colors available'],
    packaging: ['20L', '4L', '1L'],
    shelfLife: '24 months from date of manufacture when stored properly',
    safety: [
      'Use in well-ventilated areas',
      'Wear appropriate protective equipment',
      'Keep away from heat and ignition sources',
      'Avoid contact with skin and eyes',
      'Refer to Safety Data Sheet for complete information'
    ]
  },
  {
    id: 'concrete-lining',
    name: 'Concrete Lining',
    category: 'paint-systems',
    title: 'Concrete Lining System',
    subtitle: 'Advanced Protective Lining for Concrete Structures',
    description: 'High-performance lining system designed to provide comprehensive protection for concrete surfaces in aggressive environments, offering exceptional chemical resistance and mechanical protection.',
    purpose: 'To provide long-term protection for concrete structures against chemical attack, abrasion, and environmental degradation while maintaining structural integrity.',
    applications: [
      'Wastewater treatment plants',
      'Chemical processing facilities',
      'Food processing plants',
      'Pharmaceutical facilities',
      'Marine structures',
      'Underground concrete structures'
    ],
    instructions: {
      surfacePreparation: [
        'Concrete must be minimum 28 days old and fully cured',
        'Surface preparation by mechanical grinding or shot blasting',
        'Remove all contamination, laitance, and weak surface layers',
        'Fill cracks and voids with appropriate repair materials',
        'Surface profile: CSP 3-4 according to ICRI guidelines'
      ],
      mixing: 'Mix components A and B in specified ratio (4:1) using low-speed mechanical mixer for 3-4 minutes until homogeneous.',
      application: [
        'Apply primer coat using brush or roller',
        'Apply base coat at specified thickness using notched trowel',
        'Apply intermediate coats as required',
        'Apply final topcoat for smooth finish',
        'Total system thickness: 3-5mm'
      ],
      dryingTime: 'Initial cure: 16-24 hours, Service conditions: 7 days, Full chemical resistance: 14 days',
      conditions: [
        'Temperature: 15-30°C',
        'Relative humidity: 40-80%',
        'Surface temperature 3°C above dew point',
        'Protect from moisture during cure'
      ]
    },
    technicalSpecs: [
      { property: 'Compressive Strength', value: '>80', unit: 'MPa' },
      { property: 'Flexural Strength', value: '>25', unit: 'MPa' },
      { property: 'Adhesion to Concrete', value: '>3.0', unit: 'MPa' },
      { property: 'Chemical Resistance', value: 'Excellent', unit: '-' },
      { property: 'Abrasion Resistance', value: '<50', unit: 'mg loss' },
      { property: 'Water Absorption', value: '<0.1', unit: '%' },
      { property: 'Service Temperature', value: '-10 to +80', unit: '°C' }
    ],
    advantages: [
      'Excellent chemical resistance to acids, alkalis, and solvents',
      'Superior mechanical properties and durability',
      'Seamless application with excellent adhesion',
      'Low maintenance requirements',
      'Suitable for food contact applications',
      'Resistant to thermal cycling',
      'Easy to clean and maintain'
    ],
    images: [
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
      'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg'
    ],
    colors: ['Gray', 'White', 'Green', 'Blue', 'Custom colors available'],
    packaging: ['30kg kit', '15kg kit', '6kg kit'],
    shelfLife: '12 months when stored in original sealed containers',
    safety: [
      'Contains epoxy resins - may cause allergic reactions',
      'Use adequate ventilation during application',
      'Wear nitrile gloves and safety glasses',
      'Avoid skin and eye contact',
      'Keep out of reach of children'
    ]
  },
  {
    id: 'concrete-repair-protection',
    name: 'Concrete Repair & Protection',
    category: 'paint-systems',
    title: 'Concrete Repair & Protection System',
    subtitle: 'Complete Solution for Concrete Restoration and Long-term Protection',
    description: 'Comprehensive concrete repair and protection system that combines structural repair capabilities with advanced protective coatings to restore and protect deteriorated concrete structures.',
    purpose: 'To repair structural damage in concrete and provide long-term protection against further deterioration while restoring original structural capacity and appearance.',
    applications: [
      'Bridge repair and rehabilitation',
      'Building facade restoration',
      'Parking structure repairs',
      'Industrial floor repairs',
      'Marine structure restoration',
      'Infrastructure maintenance'
    ],
    instructions: {
      surfacePreparation: [
        'Remove all deteriorated and contaminated concrete',
        'Clean reinforcement steel and treat with anti-corrosion primer',
        'Surface preparation to achieve SSD condition',
        'Pre-wet surface with clean water',
        'Remove excess water leaving surface damp'
      ],
      mixing: 'Mix repair mortar with specified amount of water using mechanical mixer. Add bonding agent as required.',
      application: [
        'Apply bonding bridge to prepared surface',
        'Place repair mortar while bonding bridge is tacky',
        'Build up in layers not exceeding 25mm per application',
        'Finish surface to required profile',
        'Cure properly with curing compound or wet covering'
      ],
      dryingTime: 'Initial set: 2-4 hours, Final set: 6-8 hours, Full strength: 28 days',
      conditions: [
        'Temperature: 5-35°C',
        'Protect from direct sunlight and wind',
        'Maintain moisture during curing period',
        'Avoid application in freezing conditions'
      ]
    },
    technicalSpecs: [
      { property: 'Compressive Strength (28 days)', value: '>40', unit: 'MPa' },
      { property: 'Flexural Strength', value: '>8', unit: 'MPa' },
      { property: 'Modulus of Elasticity', value: '25-30', unit: 'GPa' },
      { property: 'Bond Strength', value: '>2.5', unit: 'MPa' },
      { property: 'Shrinkage', value: '<0.1', unit: '%' },
      { property: 'Chloride Permeability', value: 'Very Low', unit: '-' },
      { property: 'Freeze-Thaw Resistance', value: '>300', unit: 'cycles' }
    ],
    advantages: [
      'Excellent bond to old concrete',
      'Non-shrink formulation prevents cracking',
      'High durability and weather resistance',
      'Can be applied in various thicknesses',
      'Compatible with existing concrete',
      'Provides corrosion protection to steel reinforcement',
      'Fast strength development'
    ],
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg'
    ],
    colors: ['Concrete Gray', 'Light Gray', 'Custom match available'],
    packaging: ['25kg bag', '50kg bag'],
    shelfLife: '12 months in dry storage conditions',
    safety: [
      'Contains cement - alkaline material',
      'Wear protective gloves and eye protection',
      'Avoid inhalation of dust',
      'Wash thoroughly after handling',
      'Seek medical attention if irritation persists'
    ]
  },
  {
    id: 'steel-coatings',
    name: 'Steel Coatings',
    category: 'paint-systems',
    title: 'Steel Protective Coating System',
    subtitle: 'Advanced Corrosion Protection for Steel Structures',
    description: 'High-performance coating system specifically formulated for steel structures, providing superior corrosion protection, mechanical resistance, and long-term durability in aggressive environments.',
    purpose: 'To provide comprehensive corrosion protection for steel structures while maintaining aesthetic appearance and reducing maintenance costs over the service life.',
    applications: [
      'Structural steel frameworks',
      'Industrial equipment and machinery',
      'Storage tanks and vessels',
      'Pipeline systems',
      'Marine and offshore structures',
      'Architectural steelwork'
    ],
    instructions: {
      surfacePreparation: [
        'Remove all rust, scale, and old coatings by blast cleaning to Sa 2.5',
        'Degrease surfaces to remove all oil and contamination',
        'Surface roughness: 50-100 microns',
        'Apply coating within 4 hours of blast cleaning',
        'Surface must be clean and dry'
      ],
      mixing: 'Stir base component thoroughly. Add hardener in specified ratio and mix for 5 minutes. Pot life: 4 hours at 20°C.',
      application: [
        'Apply primer coat immediately after surface preparation',
        'Apply intermediate coats as specified',
        'Apply topcoat for final protection and appearance',
        'Use brush, roller, or spray application',
        'Maintain wet edge during application'
      ],
      dryingTime: 'Touch dry: 4-6 hours, Hard dry: 12-16 hours, Overcoat time: 16-72 hours',
      conditions: [
        'Temperature: 10-40°C',
        'Relative humidity: <85%',
        'Steel temperature 3°C above dew point',
        'No application during rain or fog'
      ]
    },
    technicalSpecs: [
      { property: 'Dry Film Thickness', value: '250-400', unit: 'microns' },
      { property: 'Volume Solids', value: '75-80', unit: '%' },
      { property: 'Salt Spray Resistance', value: '>1000', unit: 'hours' },
      { property: 'Impact Resistance', value: '>160', unit: 'inch-lbs' },
      { property: 'Adhesion', value: '5B', unit: 'ASTM D3359' },
      { property: 'Flexibility', value: '6mm', unit: 'mandrel' },
      { property: 'Gloss Retention', value: '>80', unit: '%' }
    ],
    advantages: [
      'Excellent corrosion protection in harsh environments',
      'Superior adhesion and mechanical properties',
      'Long-term color and gloss retention',
      'Chemical and solvent resistance',
      'Fast curing and easy application',
      'Suitable for immersion and atmospheric exposure',
      'Wide color range available'
    ],
    images: [
      'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg',
      'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg'
    ],
    colors: ['RAL colors', 'Custom colors', 'Metallic finishes available'],
    packaging: ['20L', '4L', 'Custom packaging available'],
    shelfLife: '24 months when stored in original sealed containers',
    safety: [
      'Use only in well-ventilated areas',
      'Wear appropriate respiratory protection',
      'Avoid skin and eye contact',
      'Keep away from ignition sources',
      'Dispose of waste according to regulations'
    ]
  }
];

export const getTechnicalSolutions = (): CoatingSystem[] => [
  {
    id: 'car-coating-systems',
    name: 'Car Coating Systems',
    category: 'technical-solutions',
    title: 'Automotive Coating Systems',
    subtitle: 'Professional Vehicle Protection and Enhancement',
    description: 'Advanced automotive coating systems designed to provide superior protection, durability, and aesthetic enhancement for vehicles, offering resistance to environmental factors and maintaining showroom finish.',
    purpose: 'To protect vehicle surfaces from environmental damage while enhancing appearance and providing long-lasting protection against UV, chemicals, and mechanical wear.',
    applications: [
      'Passenger vehicles',
      'Commercial vehicles',
      'Fleet maintenance',
      'Classic car restoration',
      'Marine vessels',
      'Recreational vehicles'
    ],
    instructions: {
      surfacePreparation: [
        'Thoroughly clean vehicle surface',
        'Remove all contaminants, wax, and old coatings',
        'Clay bar treatment if required',
        'Surface must be completely dry and cool',
        'Work in shaded area away from direct sunlight'
      ],
      mixing: 'Product ready to use. Do not dilute. Shake well before application.',
      application: [
        'Apply in thin, even coats using microfiber applicator',
        'Work in small sections (2x2 feet)',
        'Allow flash time between coats',
        'Buff with clean microfiber cloth',
        'Apply 2-3 coats for optimal protection'
      ],
      dryingTime: 'Flash time: 1-2 minutes, Cure time: 12-24 hours',
      conditions: [
        'Temperature: 15-25°C',
        'Humidity: <70%',
        'Avoid direct sunlight',
        'Ensure adequate ventilation'
      ]
    },
    technicalSpecs: [
      { property: 'Hardness', value: '9H', unit: 'pencil test' },
      { property: 'Water Contact Angle', value: '>110', unit: 'degrees' },
      { property: 'UV Protection', value: '99%', unit: '-' },
      { property: 'Chemical Resistance', value: 'pH 2-12', unit: '-' },
      { property: 'Durability', value: '2-5', unit: 'years' },
      { property: 'Gloss Enhancement', value: '+20-40', unit: '%' },
      { property: 'Thickness', value: '2-5', unit: 'microns' }
    ],
    advantages: [
      'Superior protection against environmental damage',
      'Hydrophobic properties for self-cleaning effect',
      'Enhanced gloss and depth of color',
      'Resistance to bird droppings and tree sap',
      'Easy maintenance and cleaning',
      'Long-lasting protection up to 5 years',
      'UV stable and weather resistant'
    ],
    images: [
      'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg',
      'https://images.pexels.com/photos/1719647/pexels-photo-1719647.jpeg'
    ],
    colors: ['Clear', 'Enhances existing paint color'],
    packaging: ['500ml', '50ml sample size'],
    shelfLife: '36 months when stored properly',
    safety: [
      'Use in well-ventilated area',
      'Wear nitrile gloves',
      'Avoid eye contact',
      'Keep away from children',
      'Do not ingest'
    ]
  }
];