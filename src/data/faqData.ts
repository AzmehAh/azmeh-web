export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const industrialFAQData: FAQItem[] = [
  {
    id: 'industrial-1',
    question: 'What are the key differences between epoxy and polyurethane coatings for industrial applications?',
    answer: 'Epoxy coatings provide excellent chemical resistance and adhesion, making them ideal for chemical plants and manufacturing facilities. Polyurethane coatings offer superior UV resistance and flexibility, perfect for outdoor industrial equipment and structures exposed to weather conditions. Epoxy is harder and more chemical resistant, while polyurethane maintains color and gloss better outdoors.',
    category: 'Industrial and Protective Coating'
  },
  {
    id: 'industrial-2',
    question: 'How long does industrial protective coating typically last?',
    answer: 'Industrial protective coatings typically last 15-25 years depending on the environment and coating system used. In highly corrosive environments, properly applied zinc-rich primers with polyurethane topcoats can provide 20+ years of protection. Regular maintenance and inspection can extend the coating life significantly.',
    category: 'Industrial and Protective Coating'
  },
  {
    id: 'industrial-3',
    question: 'What surface preparation is required for steel structures before coating application?',
    answer: 'Steel surfaces require thorough preparation including degreasing, removal of rust and mill scale, and abrasive blasting to Sa 2.5 or Sa 3 standards (ISO 8501). The surface must be clean, dry, and free from contaminants. Proper surface preparation accounts for 80% of coating performance and longevity.',
    category: 'Industrial and Protective Coating'
  },
  {
    id: 'industrial-4',
    question: 'Can industrial coatings be applied in cold weather conditions?',
    answer: 'Most industrial coatings can be applied in temperatures as low as 5°C, provided the surface temperature is at least 3°C above the dew point. Special winter-grade formulations are available for application in sub-zero conditions. Proper curing may take longer in cold weather, and heating may be required for optimal performance.',
    category: 'Industrial and Protective Coating'
  },
  {
    id: 'industrial-5',
    question: 'What is the recommended maintenance schedule for industrial protective coatings?',
    answer: 'Industrial coatings should be inspected annually for signs of wear, damage, or corrosion. Touch-up maintenance should be performed immediately when damage is detected. Full recoating is typically required every 15-20 years, depending on the environment. High-stress areas may require more frequent attention.',
    category: 'Industrial and Protective Coating'
  },
  {
    id: 'industrial-6',
    question: 'How do you ensure coating compatibility when applying multiple layers?',
    answer: 'Coating compatibility is ensured through proper system selection, adhesion testing, and following manufacturer specifications. Always use recommended primer/topcoat combinations. Conduct adhesion tests on small areas before full application. Inter-coat adhesion times must be strictly followed to prevent delamination.',
    category: 'Industrial and Protective Coating'
  },
  {
    id: 'industrial-7',
    question: 'What safety considerations are important during industrial coating application?',
    answer: 'Key safety considerations include proper ventilation, use of appropriate PPE (respirators, chemical-resistant suits, gloves), fire prevention measures for flammable coatings, confined space entry procedures, and proper disposal of waste materials. All personnel should be trained in MSDS requirements and emergency procedures.',
    category: 'Industrial and Protective Coating'
  },
  {
    id: 'industrial-8',
    question: 'How do environmental conditions affect industrial coating performance?',
    answer: 'Temperature, humidity, UV exposure, and chemical exposure significantly impact coating performance. High temperatures accelerate degradation, while thermal cycling causes stress. UV radiation breaks down polymer chains, and chemicals can cause swelling or degradation. Proper coating selection based on environmental analysis is crucial.',
    category: 'Industrial and Protective Coating'
  }
];

export const architecturalFAQData: FAQItem[] = [
  {
    id: 'architectural-1',
    question: 'What is the difference between interior and exterior architectural paints?',
    answer: 'Interior paints are formulated for low VOC emissions, washability, and aesthetic appeal with excellent coverage and color retention indoors. Exterior paints contain UV stabilizers, water repellents, and weather-resistant resins to withstand sun, rain, temperature changes, and pollution. Exterior paints also have higher flexibility to accommodate substrate movement.',
    category: 'Architectural Coating'
  },
  {
    id: 'architectural-2',
    question: 'How do I choose the right paint finish for different rooms?',
    answer: 'Flat/Matt finishes are ideal for ceilings and low-traffic areas as they hide imperfections. Eggshell and satin finishes work well in living rooms and bedrooms, offering some washability. Semi-gloss is perfect for kitchens, bathrooms, and trim work due to moisture resistance and easy cleaning. High-gloss provides maximum durability for doors and high-touch surfaces.',
    category: 'Architectural Coating'
  },
  {
    id: 'architectural-3',
    question: 'What primer should I use for different wall surfaces?',
    answer: 'New drywall requires a high-build primer to seal the surface and provide uniform coverage. Previously painted surfaces may only need a bonding primer if the existing paint is in good condition. Stained or damaged walls require stain-blocking primers. Masonry and concrete surfaces need alkali-resistant primers to prevent paint failure.',
    category: 'Architectural Coating'
  },
  {
    id: 'architectural-4',
    question: 'How long should I wait between primer and paint application?',
    answer: 'Most water-based primers can be topcoated after 1-4 hours, while oil-based primers typically require 12-16 hours. Always check the product datasheet for specific recoat times. Environmental conditions like temperature and humidity affect drying times. Never apply topcoat before the primer has properly cured.',
    category: 'Architectural Coating'
  },
  {
    id: 'architectural-5',
    question: 'What causes paint to peel or blister, and how can it be prevented?',
    answer: 'Peeling is usually caused by poor surface preparation, moisture infiltration, or incompatible coatings. Blistering occurs from trapped moisture or solvents. Prevention includes proper surface cleaning, using appropriate primers, ensuring surfaces are dry, and following manufacturer application guidelines. Address underlying moisture issues before repainting.',
    category: 'Architectural Coating'
  },
  {
    id: 'architectural-6',
    question: 'How do I calculate the amount of paint needed for my project?',
    answer: 'Measure the total wall area (length × height) and subtract windows and doors. Divide by the coverage rate listed on the paint can (typically 10-14 m²/L). Add 10% for waste and touch-ups. Textured or porous surfaces may require 20-30% more paint. Most projects require 2 coats, so double your calculation.',
    category: 'Architectural Coating'
  },
  {
    id: 'architectural-7',
    question: 'What are low-VOC paints and why should I choose them?',
    answer: 'Low-VOC (Volatile Organic Compounds) paints contain fewer harmful chemicals that can affect indoor air quality. They produce less odor, dry faster, and are safer for occupants, especially children and those with sensitivities. Modern low-VOC paints perform as well as traditional paints while being environmentally responsible.',
    category: 'Architectural Coating'
  },
  {
    id: 'architectural-8',
    question: 'How should I maintain painted surfaces to extend their lifespan?',
    answer: 'Regular cleaning with mild soap and water helps maintain paint appearance. Inspect annually for damage and touch up small areas promptly. Avoid harsh cleaners or abrasive scrubbing. For exterior surfaces, trim vegetation away from painted areas and address moisture issues quickly. Proper maintenance can double the lifespan of architectural coatings.',
    category: 'Architectural Coating'
  },
  {
    id: 'architectural-9',
    question: 'What color trends are popular for modern architectural design?',
    answer: 'Current trends include warm neutrals like greige and soft whites, bold accent walls in deep blues or forest greens, and earth tones that connect with nature. Monochromatic schemes with varying shades of the same color create sophisticated looks. Consider lighting and room function when selecting colors.',
    category: 'Architectural Coating'
  },
  {
    id: 'architectural-10',
    question: 'Can I paint over existing wallpaper?',
    answer: 'Painting over wallpaper is possible but not recommended. If the wallpaper is well-adhered and not textured, apply an oil-based primer first to prevent the wallpaper adhesive from reactivating. However, removing the wallpaper and properly preparing the wall surface will always provide better, longer-lasting results.',
    category: 'Architectural Coating'
  }
];

export const faqCategories = [
  {
    id: 'industrial',
    title: 'Industrial and Protective Coating',
    description: 'Technical information about industrial coatings, protective systems, and heavy-duty applications.',
    data: industrialFAQData
  },
  {
    id: 'architectural', 
    title: 'Architectural Coating',
    description: 'Guidance on residential and commercial painting, color selection, and surface preparation.',
    data: architecturalFAQData
  }
];