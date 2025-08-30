export interface Product {
  id: string;
  name: string;
  code: string;
  brand: string;
  type: string;
  material: string;
  usage: string;
  description: string;
  image: string;
  features: string[];
  applications: string[];
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
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    features: ['Excellent corrosion protection', 'Long-lasting durability', 'Superior adhesion'],
    applications: ['Steel structures', 'Marine environments', 'Industrial facilities']
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
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    features: ['UV resistance', 'Water repellent', 'Fade resistant'],
    applications: ['Building facades', 'Exterior walls', 'Concrete surfaces']
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
    image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    features: ['Easy application', 'Fast drying', 'Excellent coverage'],
    applications: ['Interior walls', 'Ceiling preparation', 'Decorative surfaces']
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
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    features: ['High gloss finish', 'Quick drying', 'Excellent durability'],
    applications: ['Furniture', 'Wooden surfaces', 'Decorative items']
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
    image: 'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    features: ['Fast evaporation', 'Clean mixing', 'Low odor'],
    applications: ['Paint thinning', 'Cleaning', 'Surface preparation']
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
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    features: ['Chemical resistance', 'High durability', 'Easy maintenance'],
    applications: ['Factory floors', 'Chemical plants', 'Storage tanks']
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
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    features: ['Weather resistance', 'High gloss', 'Long lasting'],
    applications: ['Marine structures', 'Bridges', 'Industrial equipment']
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
    image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    features: ['Smooth finish', 'Good coverage', 'Easy application'],
    applications: ['Interior trim', 'Furniture', 'Decorative elements']
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
    image: 'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    features: ['Deep cleaning', 'Fast acting', 'Residue free'],
    applications: ['Surface preparation', 'Paint removal', 'Maintenance']
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
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    features: ['Low VOC', 'Washable', 'Excellent coverage'],
    applications: ['Living rooms', 'Bedrooms', 'Offices']
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
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    features: ['Scratch resistant', 'High durability', 'Smooth finish'],
    applications: ['Kitchen cabinets', 'Furniture', 'Interior woodwork']
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
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    features: ['Breathable', 'Water repellent', 'Long lasting'],
    applications: ['Concrete walls', 'Building facades', 'Parking structures']
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