export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  category: string;
  tags: string[];
  readTime: number;
  image: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'automotive-coating-trends-2024',
    title: 'Latest Trends in Automotive Coating Technology for 2024',
    excerpt: 'Discover the cutting-edge innovations in automotive paint systems, from ceramic coatings to eco-friendly formulations that are revolutionizing vehicle protection.',
    content: 'Full blog content here...',
    author: 'Technical Team',
    publishDate: '2024-01-15',
    category: 'Automotive',
    tags: ['automotive', 'coating', 'technology', 'innovation'],
    readTime: 5,
    image: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    featured: true
  },
  {
    id: 'industrial-coatings-guide',
    title: 'Complete Guide to Industrial Protective Coatings',
    excerpt: 'Learn about the different types of industrial coatings, their applications, and how to choose the right protection system for your facility.',
    content: 'Full blog content here...',
    author: 'Engineering Team',
    publishDate: '2024-01-12',
    category: 'Industrial',
    tags: ['industrial', 'protective', 'coating', 'guide'],
    readTime: 8,
    image: 'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    featured: true
  },
  {
    id: 'sustainable-paint-solutions',
    title: 'Sustainable Paint Solutions: Our Environmental Commitment',
    excerpt: 'Explore our eco-friendly paint formulations and sustainable manufacturing processes that reduce environmental impact without compromising quality.',
    content: 'Full blog content here...',
    author: 'Sustainability Team',
    publishDate: '2024-01-10',
    category: 'Environment',
    tags: ['sustainability', 'environment', 'eco-friendly'],
    readTime: 6,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    featured: false
  },
  {
    id: 'color-matching-technology',
    title: 'Advanced Color Matching Technology in Modern Paint Systems',
    excerpt: 'Discover how spectrophotometric color matching and digital tools ensure perfect color reproduction across different surfaces and applications.',
    content: 'Full blog content here...',
    author: 'Color Lab Team',
    publishDate: '2024-01-08',
    category: 'Technology',
    tags: ['color', 'technology', 'matching', 'innovation'],
    readTime: 4,
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    featured: false
  },
  {
    id: 'furniture-finishing-techniques',
    title: 'Professional Furniture Finishing Techniques and Tips',
    excerpt: 'Master the art of furniture finishing with our comprehensive guide covering preparation, application methods, and troubleshooting common issues.',
    content: 'Full blog content here...',
    author: 'Application Team',
    publishDate: '2024-01-05',
    category: 'Furniture',
    tags: ['furniture', 'finishing', 'techniques', 'woodwork'],
    readTime: 7,
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    featured: false
  },
  {
    id: 'concrete-protection-systems',
    title: 'Concrete Protection Systems for Harsh Environments',
    excerpt: 'Learn about specialized concrete coatings designed to withstand extreme weather conditions, chemical exposure, and heavy traffic.',
    content: 'Full blog content here...',
    author: 'Technical Team',
    publishDate: '2024-01-03',
    category: 'Concrete',
    tags: ['concrete', 'protection', 'durability', 'industrial'],
    readTime: 9,
    image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    featured: true
  }
];

export const blogCategories = [
  'All',
  'Automotive',
  'Industrial',
  'Environment',
  'Technology',
  'Furniture',
  'Concrete'
];