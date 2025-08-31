export interface BulletinItem {
  id: string;
  title: string;
  shortDescription: string;
  coverImage: string;
  category: string;
  subcategory: string;
  content: BulletinContent[];
}

export interface BulletinContent {
  type: 'heading' | 'paragraph' | 'table' | 'image' | 'list';
  content: any;
  level?: number; // for headings (h1, h2, h3, etc.)
  caption?: string; // for images
  headers?: string[]; // for tables
  rows?: string[][]; // for tables
  items?: string[]; // for lists
}

export const bulletinsData: BulletinItem[] = [
  {
    id: 'car-coating-ceramic-protection',
    title: 'Advanced Ceramic Coating Solutions for Automotive Applications',
    shortDescription: 'Discover the latest in ceramic coating technology for superior vehicle protection and enhanced aesthetic appeal.',
    coverImage: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Technical Solutions',
    subcategory: 'Car Coating Systems',
    content: [
      {
        type: 'heading',
        level: 1,
        content: 'Revolutionary Ceramic Coating Technology'
      },
      {
        type: 'paragraph',
        content: 'Modern automotive ceramic coatings represent a breakthrough in vehicle surface protection. These advanced nano-ceramic formulations create an ultra-durable, transparent layer that bonds chemically with the vehicle\'s paintwork, providing exceptional protection against environmental contaminants, UV radiation, and mechanical wear.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Key Performance Characteristics'
      },
      {
        type: 'table',
        headers: ['Property', 'Standard Coating', 'Ceramic Coating', 'Performance Gain'],
        rows: [
          ['Hardness (Pencil)', '2H-3H', '8H-9H', '+200%'],
          ['Gloss Retention', '6 months', '2-3 years', '+400%'],
          ['Chemical Resistance', 'Moderate', 'Excellent', '+300%'],
          ['UV Protection', 'Good', 'Superior', '+250%'],
          ['Hydrophobic Angle', '90°', '110°+', '+22%']
        ]
      },
      {
        type: 'paragraph',
        content: 'The superior performance of ceramic coatings stems from their unique molecular structure, which forms cross-linked networks at the nano level, creating an incredibly hard and durable surface.'
      },
      {
        type: 'image',
        content: 'https://images.pexels.com/photos/1231622/pexels-photo-1231622.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
        caption: 'Microscopic view of ceramic coating structure showing nano-level protection'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Application Process'
      },
      {
        type: 'list',
        items: [
          'Thorough surface preparation and decontamination',
          'Paint correction to eliminate swirl marks and scratches',
          'Panel-by-panel ceramic coating application',
          'Precise curing under controlled conditions',
          'Quality inspection and final detailing'
        ]
      }
    ]
  },
  {
    id: 'concrete-walls-waterproofing',
    title: 'Waterproof Coating Systems for Concrete Structures',
    shortDescription: 'Comprehensive guide to protecting concrete walls from moisture infiltration and environmental damage.',
    coverImage: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Technical Solutions',
    subcategory: 'Concrete Walls Coating',
    content: [
      {
        type: 'heading',
        level: 1,
        content: 'Concrete Wall Protection Systems'
      },
      {
        type: 'paragraph',
        content: 'Concrete structures face constant threats from moisture infiltration, chemical exposure, and environmental weathering. Our advanced coating systems provide comprehensive protection while maintaining the aesthetic appeal of architectural concrete.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Moisture Protection Technology'
      },
      {
        type: 'paragraph',
        content: 'Our waterproof coating systems utilize advanced polymer technology to create a breathable yet impermeable barrier. This allows moisture vapor to escape while preventing liquid water penetration, crucial for maintaining structural integrity.'
      },
      {
        type: 'table',
        headers: ['Coating Type', 'Penetration Depth', 'Water Resistance', 'Breathability', 'Service Life'],
        rows: [
          ['Silane/Siloxane', '5-15mm', 'Excellent', 'High', '10-15 years'],
          ['Acrylic Membrane', 'Surface', 'Superior', 'Medium', '8-12 years'],
          ['Polymer Modified', '2-5mm', 'Excellent', 'High', '12-18 years']
        ]
      },
      {
        type: 'image',
        content: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
        caption: 'Professional application of waterproof coating on concrete wall surface'
      }
    ]
  },
  {
    id: 'facade-protection-systems',
    title: 'Façade Protection and Restoration Solutions',
    shortDescription: 'Advanced coating systems designed to protect and restore building facades while enhancing architectural beauty.',
    coverImage: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Technical Solutions',
    subcategory: 'Façade Protection',
    content: [
      {
        type: 'heading',
        level: 1,
        content: 'Façade Protection Systems'
      },
      {
        type: 'paragraph',
        content: 'Building facades require specialized protection against weathering, pollution, and UV radiation. Our comprehensive façade coating systems provide long-term protection while enhancing the building\'s architectural features.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Multi-Layer Protection Strategy'
      },
      {
        type: 'list',
        items: [
          'Deep penetrating primer for substrate consolidation',
          'Intermediate coating for crack bridging and flexibility',
          'Weather-resistant topcoat with UV stabilizers',
          'Optional protective clear coat for enhanced durability'
        ]
      },
      {
        type: 'paragraph',
        content: 'This layered approach ensures comprehensive protection against all environmental factors while providing flexibility for building movement and thermal expansion.'
      }
    ]
  },
  {
    id: 'industrial-flooring-solutions',
    title: 'Heavy-Duty Industrial Flooring Systems',
    shortDescription: 'Engineered flooring solutions designed to withstand extreme industrial conditions and heavy traffic.',
    coverImage: 'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Technical Solutions',
    subcategory: 'Industrial Flooring',
    content: [
      {
        type: 'heading',
        level: 1,
        content: 'Industrial Flooring Solutions'
      },
      {
        type: 'paragraph',
        content: 'Industrial environments demand flooring systems that can withstand heavy machinery, chemical spills, thermal shock, and continuous heavy traffic. Our epoxy and polyurethane flooring systems are engineered for maximum durability and performance.'
      },
      {
        type: 'table',
        headers: ['System Type', 'Thickness', 'Chemical Resistance', 'Traffic Load', 'Temperature Range'],
        rows: [
          ['Standard Epoxy', '2-3mm', 'Good', 'Medium', '-10°C to +60°C'],
          ['Heavy Duty Epoxy', '4-6mm', 'Excellent', 'Heavy', '-20°C to +80°C'],
          ['Polyurethane', '3-5mm', 'Superior', 'Very Heavy', '-40°C to +120°C']
        ]
      }
    ]
  },
  {
    id: 'joint-sealant-technology',
    title: 'Advanced Joint Sealing Solutions',
    shortDescription: 'High-performance sealants for structural joints, expansion gaps, and weatherproofing applications.',
    coverImage: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Technical Solutions',
    subcategory: 'Joint Sealant',
    content: [
      {
        type: 'heading',
        level: 1,
        content: 'Joint Sealant Technology'
      },
      {
        type: 'paragraph',
        content: 'Structural joints require specialized sealing solutions that can accommodate movement while maintaining weatherproof integrity. Our range of joint sealants includes silicone, polyurethane, and hybrid polymer formulations for various applications.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Sealant Selection Guide'
      },
      {
        type: 'list',
        items: [
          'Silicone sealants: High movement capability, excellent weather resistance',
          'Polyurethane sealants: Superior adhesion, paintable surface',
          'Hybrid polymer: Best of both technologies, low odor application',
          'Structural glazing: High-strength bonding for curtain wall systems'
        ]
      }
    ]
  },
  {
    id: 'steel-surface-protection',
    title: 'Steel Surface Coating Technologies',
    shortDescription: 'Comprehensive protection systems for steel structures against corrosion and environmental damage.',
    coverImage: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Technical Solutions',
    subcategory: 'Steel Surface Coatings',
    content: [
      {
        type: 'heading',
        level: 1,
        content: 'Steel Surface Protection'
      },
      {
        type: 'paragraph',
        content: 'Steel structures require comprehensive protection against corrosion, chemical attack, and environmental degradation. Our multi-layer coating systems provide long-term protection through advanced primer, intermediate, and topcoat technologies.'
      },
      {
        type: 'image',
        content: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
        caption: 'Professional steel coating application in industrial environment'
      }
    ]
  },
  {
    id: 'concrete-exterior-systems',
    title: 'Exterior Concrete Coating Systems',
    shortDescription: 'Advanced protective and decorative coatings for exterior concrete surfaces.',
    coverImage: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Paint Systems',
    subcategory: 'Concrete Exterior',
    content: [
      {
        type: 'heading',
        level: 1,
        content: 'Exterior Concrete Coating Systems'
      },
      {
        type: 'paragraph',
        content: 'Exterior concrete surfaces face harsh environmental conditions including UV radiation, moisture, temperature fluctuations, and chemical exposure. Our specialized coating systems provide comprehensive protection while enhancing aesthetic appeal.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'System Components'
      },
      {
        type: 'list',
        items: [
          'Penetrating primer for substrate preparation',
          'Flexible intermediate coat for crack bridging',
          'UV-resistant topcoat with superior weather protection',
          'Optional textured finish for enhanced aesthetics'
        ]
      },
      {
        type: 'table',
        headers: ['Property', 'Specification', 'Test Method', 'Performance'],
        rows: [
          ['Coverage Rate', '10-12 m²/L', 'ISO 6504', 'Excellent'],
          ['Weather Resistance', '>2000 hours', 'ASTM G154', 'Superior'],
          ['Crack Bridging', '2mm at -20°C', 'ASTM D6083', 'Excellent'],
          ['Service Life', '15-20 years', 'Field Testing', 'Proven']
        ]
      }
    ]
  },
  {
    id: 'fire-retardant-technology',
    title: 'Fire Retardant Paint Technologies',
    shortDescription: 'Advanced fire-resistant coatings for enhanced building safety and compliance with fire protection standards.',
    coverImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Paint Systems',
    subcategory: 'Fire Retardant Paints',
    content: [
      {
        type: 'heading',
        level: 1,
        content: 'Fire Retardant Paint Systems'
      },
      {
        type: 'paragraph',
        content: 'Fire retardant paints play a crucial role in building safety by slowing flame spread and reducing smoke generation. Our intumescent and non-intumescent fire retardant systems meet international fire safety standards while maintaining excellent decorative properties.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Intumescent Coating Mechanism'
      },
      {
        type: 'paragraph',
        content: 'When exposed to fire, intumescent coatings expand to form a thick, insulating char layer that protects the underlying substrate. This expansion can increase thickness by 10-50 times the original coating thickness.'
      },
      {
        type: 'image',
        content: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
        caption: 'Fire retardant coating application in commercial building'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Fire Rating Classifications'
      },
      {
        type: 'table',
        headers: ['Classification', 'Fire Resistance', 'Application', 'Standard'],
        rows: [
          ['Class A', '0-25 flame spread', 'High-risk areas', 'ASTM E84'],
          ['Class B', '26-75 flame spread', 'Medium-risk areas', 'ASTM E84'],
          ['Class I', '30-60 minutes', 'Structural steel', 'BS 476'],
          ['Class II', '60-120 minutes', 'Critical structures', 'BS 476']
        ]
      }
    ]
  },
  {
    id: 'steel-linings-protection',
    title: 'Steel Lining Systems for Harsh Environments',
    shortDescription: 'Specialized protective linings for steel structures in chemically aggressive and high-temperature environments.',
    coverImage: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Paint Systems',
    subcategory: 'Steel Linings',
    content: [
      {
        type: 'heading',
        level: 1,
        content: 'Advanced Steel Lining Technologies'
      },
      {
        type: 'paragraph',
        content: 'Steel structures in industrial environments require specialized lining systems that can withstand extreme temperatures, chemical corrosion, and mechanical stress. Our steel lining solutions provide comprehensive protection for tanks, vessels, and structural components.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Lining System Options'
      },
      {
        type: 'list',
        items: [
          'Glass flake epoxy for superior chemical resistance',
          'Vinyl ester systems for high-temperature applications',
          'Novolac epoxy for maximum chemical protection',
          'Ceramic-filled coatings for abrasion resistance'
        ]
      },
      {
        type: 'paragraph',
        content: 'Each lining system is carefully selected based on the specific operating conditions, chemical exposure, and performance requirements of the application.'
      }
    ]
  },
  {
    id: 'wooden-surface-coating',
    title: 'Wooden Surface Coating Solutions',
    shortDescription: 'Professional wood coating systems for protection, preservation, and aesthetic enhancement.',
    coverImage: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Technical Solutions',
    subcategory: 'Wooden Surface Coatings',
    content: [
      {
        type: 'heading',
        level: 1,
        content: 'Wooden Surface Protection'
      },
      {
        type: 'paragraph',
        content: 'Wood surfaces require specialized coatings that protect against moisture, UV radiation, and biological deterioration while enhancing the natural beauty of the wood grain.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Wood Coating Technologies'
      },
      {
        type: 'table',
        headers: ['Coating Type', 'Protection Level', 'Appearance', 'Durability', 'Maintenance'],
        rows: [
          ['Penetrating Stain', 'Good', 'Natural', '3-5 years', 'Easy'],
          ['Semi-Transparent', 'Very Good', 'Wood Grain Visible', '5-8 years', 'Moderate'],
          ['Solid Color', 'Excellent', 'Opaque Finish', '8-12 years', 'Low'],
          ['Clear Protective', 'Good', 'Natural Wood', '2-4 years', 'Regular']
        ]
      }
    ]
  },
  {
    id: 'adhesives-grouts-systems',
    title: 'Advanced Adhesives and Grout Systems',
    shortDescription: 'High-performance adhesives and grouts for construction and repair applications.',
    coverImage: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Paint Systems',
    subcategory: 'Adhesives and Grouts',
    content: [
      {
        type: 'heading',
        level: 1,
        content: 'Adhesives and Grout Technologies'
      },
      {
        type: 'paragraph',
        content: 'Modern construction requires advanced adhesive and grout systems that provide superior bonding strength, chemical resistance, and long-term durability. Our formulations are designed for critical structural and non-structural applications.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Product Categories'
      },
      {
        type: 'list',
        items: [
          'Structural adhesives for high-stress bonding',
          'Tile adhesives for ceramic and stone installation',
          'Injection grouts for crack repair and void filling',
          'Decorative grouts for aesthetic applications'
        ]
      }
    ]
  },
  {
    id: 'roof-coating-systems',
    title: 'Protective Roof Coating Systems',
    shortDescription: 'Weather-resistant roof coatings for energy efficiency and long-term protection.',
    coverImage: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Technical Solutions',
    subcategory: 'Roof Coatings',
    content: [
      {
        type: 'heading',
        level: 1,
        content: 'Roof Coating Technologies'
      },
      {
        type: 'paragraph',
        content: 'Roof surfaces endure extreme weather conditions and require specialized coatings for protection and energy efficiency. Our roof coating systems provide superior weather resistance while reducing energy costs through reflective technology.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Energy Efficiency Benefits'
      },
      {
        type: 'table',
        headers: ['Coating Type', 'Solar Reflectance', 'Thermal Emittance', 'Energy Savings'],
        rows: [
          ['Standard White', '85%', '90%', '15-20%'],
          ['Cool Roof Technology', '95%', '95%', '25-30%'],
          ['Infrared Reflective', '90%', '85%', '20-25%']
        ]
      }
    ]
  },
  {
    id: 'concrete-repair-technology',
    title: 'Concrete Repair and Restoration Systems',
    shortDescription: 'Comprehensive solutions for concrete repair, strengthening, and life extension.',
    coverImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Paint Systems',
    subcategory: 'Concrete Repair & Protection',
    content: [
      {
        type: 'heading',
        level: 1,
        content: 'Concrete Repair Technologies'
      },
      {
        type: 'paragraph',
        content: 'Concrete structures inevitably develop defects over time due to environmental exposure, loading, and aging. Our repair systems restore structural integrity while providing long-term protection against future deterioration.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Repair System Components'
      },
      {
        type: 'list',
        items: [
          'Bonding agents for optimal adhesion',
          'Structural repair mortars for load-bearing repairs',
          'Crack injection resins for fine crack sealing',
          'Protective coatings for long-term durability'
        ]
      },
      {
        type: 'image',
        content: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
        caption: 'Professional concrete repair and protection system application'
      }
    ]
  },
  {
    id: 'wall-ceiling-paints',
    title: 'Interior Wall and Ceiling Paint Systems',
    shortDescription: 'Premium interior coatings for residential and commercial applications with superior performance.',
    coverImage: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Paint Systems',
    subcategory: 'Home & Industrial Wall/Ceiling Paints',
    content: [
      {
        type: 'heading',
        level: 1,
        content: 'Interior Wall and Ceiling Systems'
      },
      {
        type: 'paragraph',
        content: 'Interior environments require coatings that provide excellent coverage, durability, and aesthetic appeal while maintaining healthy indoor air quality. Our water-based and low-VOC formulations deliver superior performance for residential and commercial applications.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Performance Features'
      },
      {
        type: 'table',
        headers: ['Property', 'Standard Paint', 'Premium System', 'Performance Benefit'],
        rows: [
          ['Coverage', '10-12 m²/L', '14-16 m²/L', '+30% efficiency'],
          ['Washability', '1000 cycles', '5000+ cycles', '+400% durability'],
          ['VOC Content', '<50 g/L', '<10 g/L', '80% reduction'],
          ['Hide Rating', '95%', '99%', 'Superior coverage']
        ]
      }
    ]
  }
];

export const systemCategories = {
  'Technical Solutions': [
    'Car Coating Systems',
    'Concrete Walls Coating',
    'Façade Protection',
    'Industrial Flooring',
    'Joint Sealant', 
    'Steel Surface Coatings',
    'Roof Coatings',
    'Wooden Surface Coatings'
  ],
  'Paint Systems': [
    'Concrete Exterior',
    'Concrete Lining',
    'Concrete Repair & Protection',
    'Concrete Sealer',
    'Ferrous & Steel Substrate Treatment',
    'Fire Retardant Paints',
    'Home & Industrial Wall/Ceiling Paints',
    'Steel Coatings',
    'Steel Linings',
    'Floorings',
    'Adhesives and Grouts',
    'Joint Sealants'
  ]
};</parameter>