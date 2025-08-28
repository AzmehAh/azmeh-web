export interface SystemData {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  applications: string[];
  features: string[];
  technicalSpecs: {
    coverage: string;
    dryingTime: string;
    thickness: string;
    temperature: string;
    durability: string;
    finish: string;
  };
  advantages: string[];
  applicationMethod: string[];
  safetyInfo: string[];
  relatedProducts: string[];
  images: string[];
}

export const systemsData: Record<string, SystemData> = {
  'concrete-exterior': {
    id: 'concrete-exterior',
    title: 'Concrete Exterior Systems',
    category: 'Paint Systems',
    description: 'Advanced exterior concrete coating systems designed for maximum durability and weather resistance.',
    fullDescription: 'Our concrete exterior systems provide comprehensive protection against harsh environmental conditions while maintaining aesthetic appeal. These high-performance coatings are specifically formulated to withstand UV radiation, moisture, temperature fluctuations, and chemical exposure, ensuring long-lasting protection for concrete structures.',
    applications: [
      'Building facades and exterior walls',
      'Parking structures and garages',
      'Bridge and infrastructure projects',
      'Industrial facility exteriors',
      'Commercial building exteriors',
      'Residential concrete walls'
    ],
    features: [
      'Superior weather resistance',
      'UV-stable pigment system',
      'Excellent adhesion to concrete',
      'Crack-bridging properties',
      'Breathable membrane formation',
      'Chemical resistance'
    ],
    technicalSpecs: {
      coverage: '8-12 m²/L per coat',
      dryingTime: '2-4 hours (touch dry)',
      thickness: '150-200 microns DFT',
      temperature: 'Application: 5°C to 35°C',
      durability: '15-20 years',
      finish: 'Matt, Satin, Semi-gloss'
    },
    advantages: [
      'Extended service life of concrete structures',
      'Reduces maintenance costs',
      'Improves thermal insulation properties',
      'Enhances aesthetic appearance',
      'Prevents carbonation of concrete',
      'Easy application and maintenance'
    ],
    applicationMethod: [
      'Brush application for detailed work',
      'Roller application for large surfaces',
      'Spray application for industrial projects',
      'Primer application recommended'
    ],
    safetyInfo: [
      'Wear appropriate PPE during application',
      'Ensure adequate ventilation',
      'Avoid contact with skin and eyes',
      'Store in cool, dry place'
    ],
    relatedProducts: [
      'Concrete Primer',
      'Crack Repair Compounds',
      'Protective Sealers'
    ],
    images: [
      'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'
    ]
  },
  'concrete-lining': {
    id: 'concrete-lining',
    title: 'Concrete Lining Systems',
    category: 'Paint Systems',
    description: 'Specialized protective lining systems for concrete structures in aggressive environments.',
    fullDescription: 'Concrete lining systems are engineered to provide exceptional protection for concrete structures exposed to aggressive chemicals, high temperatures, and severe environmental conditions. These advanced coatings create an impermeable barrier that prevents substrate deterioration while maintaining structural integrity.',
    applications: [
      'Chemical processing facilities',
      'Wastewater treatment plants',
      'Storage tanks and vessels',
      'Underground structures',
      'Marine environments',
      'Food processing facilities'
    ],
    features: [
      'Chemical resistance to acids and alkalis',
      'High temperature resistance',
      'Impermeable barrier formation',
      'Excellent mechanical properties',
      'Long-term adhesion stability',
      'Thermal shock resistance'
    ],
    technicalSpecs: {
      coverage: '4-6 m²/L per coat',
      dryingTime: '6-8 hours (full cure)',
      thickness: '300-500 microns DFT',
      temperature: 'Service: -20°C to 120°C',
      durability: '20-25 years',
      finish: 'High build protective'
    },
    advantages: [
      'Superior chemical resistance',
      'Prevents concrete degradation',
      'Extends structure lifespan',
      'Reduces long-term maintenance',
      'Excellent adhesion properties',
      'Cost-effective protection solution'
    ],
    applicationMethod: [
      'Airless spray application',
      'Multi-coat system application',
      'Surface preparation critical',
      'Environmental conditions controlled'
    ],
    safetyInfo: [
      'Use respiratory protection',
      'Ensure proper ventilation',
      'Handle with chemical-resistant gloves',
      'Follow MSDS guidelines strictly'
    ],
    relatedProducts: [
      'Epoxy Primers',
      'Chemical Resistant Topcoats',
      'Joint Sealers'
    ],
    images: [
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg'
    ]
  },
  'concrete-repair': {
    id: 'concrete-repair',
    title: 'Concrete Repair & Protection',
    category: 'Paint Systems',
    description: 'Comprehensive repair and protection systems for damaged concrete structures.',
    fullDescription: 'Our concrete repair and protection systems are designed to restore and protect deteriorated concrete structures. These advanced formulations address various types of concrete damage including cracking, spalling, carbonation, and chemical attack, providing long-term structural integrity and protection.',
    applications: [
      'Structural concrete repairs',
      'Crack injection and sealing',
      'Spalling concrete restoration',
      'Carbonation protection',
      'Bridge deck rehabilitation',
      'Building restoration projects'
    ],
    features: [
      'High bond strength to concrete',
      'Shrinkage compensating properties',
      'Crack bridging capabilities',
      'Carbonation resistance',
      'Freeze-thaw stability',
      'Chloride ion barrier'
    ],
    technicalSpecs: {
      coverage: '6-10 m²/L depending on application',
      dryingTime: '4-6 hours (initial set)',
      thickness: '2-5mm for repair mortars',
      temperature: 'Application: 5°C to 30°C',
      durability: '25+ years',
      finish: 'Textured repair finish'
    },
    advantages: [
      'Restores structural integrity',
      'Prevents further deterioration',
      'Cost-effective rehabilitation',
      'Compatible with existing concrete',
      'Improves load bearing capacity',
      'Extends service life significantly'
    ],
    applicationMethod: [
      'Hand trowel application for repairs',
      'Pump application for large areas',
      'Injection for crack repairs',
      'Multi-layer system application'
    ],
    safetyInfo: [
      'Wear dust masks during mixing',
      'Use eye protection',
      'Prevent skin contact with wet material',
      'Wash hands thoroughly after use'
    ],
    relatedProducts: [
      'Bonding Agents',
      'Injection Resins',
      'Protective Coatings'
    ],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    ]
  },
  'concrete-sealer': {
    id: 'concrete-sealer',
    title: 'Concrete Sealer Systems',
    category: 'Paint Systems',
    description: 'High-performance sealing systems for concrete protection and enhancement.',
    fullDescription: 'Concrete sealer systems provide essential protection for concrete surfaces by creating an effective barrier against moisture, chemicals, and environmental contaminants. These advanced sealers enhance the durability and appearance of concrete while allowing for breathability and maintaining the natural texture.',
    applications: [
      'Concrete floors and slabs',
      'Driveways and walkways',
      'Warehouse flooring',
      'Parking decks',
      'Decorative concrete surfaces',
      'Industrial flooring systems'
    ],
    features: [
      'Deep penetration sealing',
      'Breathable membrane formation',
      'Stain and water repellency',
      'Enhanced surface hardness',
      'Dust-proofing properties',
      'UV resistance'
    ],
    technicalSpecs: {
      coverage: '12-16 m²/L per coat',
      dryingTime: '1-2 hours (touch dry)',
      thickness: '50-100 microns DFT',
      temperature: 'Application: 10°C to 40°C',
      durability: '10-15 years',
      finish: 'Natural, Low Sheen'
    },
    advantages: [
      'Prevents moisture ingress',
      'Reduces dusting and chalking',
      'Easy maintenance and cleaning',
      'Enhances concrete appearance',
      'Cost-effective protection',
      'Quick and easy application'
    ],
    applicationMethod: [
      'Low-pressure spray application',
      'Brush application for small areas',
      'Roller application possible',
      'Single or multiple coat systems'
    ],
    safetyInfo: [
      'Ensure adequate ventilation',
      'Use appropriate skin protection',
      'Avoid breathing vapors',
      'Keep away from ignition sources'
    ],
    relatedProducts: [
      'Surface Cleaners',
      'Etching Solutions',
      'Maintenance Coatings'
    ],
    images: [
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg'
    ]
  },
  'car-coating': {
    id: 'car-coating',
    title: 'Car Coating Systems',
    category: 'Technical Solutions',
    description: 'Professional automotive coating systems for superior protection and finish.',
    fullDescription: 'Our car coating systems represent the pinnacle of automotive surface protection technology. These advanced ceramic and polymer-based coatings provide exceptional gloss, durability, and protection against environmental contaminants, UV radiation, and mechanical wear, ensuring your vehicle maintains its pristine appearance.',
    applications: [
      'Automotive paint protection',
      'Commercial fleet vehicles',
      'Luxury car detailing',
      'Motorcycle surfaces',
      'Marine vessel hulls',
      'Aviation surface coating'
    ],
    features: [
      'Ceramic-based protection',
      'Hydrophobic surface properties',
      'Scratch and swirl resistance',
      'UV protection and color stability',
      'Chemical resistance',
      'Self-cleaning properties'
    ],
    technicalSpecs: {
      coverage: '40-60 vehicles per liter',
      dryingTime: '12-24 hours cure time',
      thickness: '2-5 microns coating',
      temperature: 'Application: 15°C to 25°C',
      durability: '2-5 years protection',
      finish: 'High gloss mirror finish'
    },
    advantages: [
      'Long-lasting protection',
      'Reduces washing frequency',
      'Maintains resale value',
      'Superior gloss enhancement',
      'Easy maintenance',
      'Professional grade results'
    ],
    applicationMethod: [
      'Panel-by-panel application',
      'Microfiber cloth application',
      'Controlled environment required',
      'Professional training recommended'
    ],
    safetyInfo: [
      'Use in well-ventilated areas',
      'Wear nitrile gloves',
      'Avoid skin contact',
      'Keep away from children'
    ],
    relatedProducts: [
      'Paint Correction Compounds',
      'Surface Preparation Products',
      'Maintenance Sprays'
    ],
    images: [
      'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg'
    ]
  },
  'concrete-walls': {
    id: 'concrete-walls',
    title: 'Concrete Walls Coating',
    category: 'Technical Solutions',
    description: 'Specialized coating systems for concrete wall protection and aesthetics.',
    fullDescription: 'Concrete walls coating systems are specifically designed to protect and beautify concrete wall surfaces in various environments. These high-performance coatings provide excellent adhesion, weather resistance, and aesthetic enhancement while maintaining the structural integrity of the concrete substrate.',
    applications: [
      'Interior concrete walls',
      'Exterior building walls',
      'Basement and foundation walls',
      'Retaining walls',
      'Precast concrete panels',
      'Architectural concrete features'
    ],
    features: [
      'Excellent adhesion to concrete',
      'Breathable yet protective',
      'Wide color selection available',
      'Crack bridging properties',
      'Mold and mildew resistance',
      'Easy application and maintenance'
    ],
    technicalSpecs: {
      coverage: '10-14 m²/L per coat',
      dryingTime: '2-4 hours (recoat)',
      thickness: '100-150 microns DFT',
      temperature: 'Application: 5°C to 35°C',
      durability: '12-18 years',
      finish: 'Matt, Eggshell, Satin'
    },
    advantages: [
      'Improves thermal performance',
      'Prevents efflorescence',
      'Enhances acoustic properties',
      'Reduces dust and chalking',
      'Provides moisture regulation',
      'Cost-effective solution'
    ],
    applicationMethod: [
      'Brush application for texture',
      'Roller for smooth finish',
      'Spray for large areas',
      'Two-coat system recommended'
    ],
    safetyInfo: [
      'Wear eye protection',
      'Use drop cloths',
      'Ensure proper ventilation',
      'Clean tools promptly'
    ],
    relatedProducts: [
      'Wall Primers',
      'Texture Coatings',
      'Sealers and Topcoats'
    ],
    images: [
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg'
    ]
  }
  // Add more systems data as needed...
};