export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'industrial-coating-trends-2024',
    title: 'Latest Trends in Industrial Coating Technologies',
    slug: 'industrial-coating-trends-2024',
    excerpt: 'Discover the newest innovations in industrial coatings that are transforming manufacturing and construction industries.',
    content: `
      <p>The industrial coating industry is experiencing a revolutionary transformation driven by technological advancements and environmental consciousness. As we navigate through 2024, several key trends are reshaping how we approach industrial surface protection.</p>
      
      <h2>Smart Coatings Technology</h2>
      <p>Smart coatings represent the cutting edge of industrial protection. These advanced formulations can respond to environmental changes, self-heal minor damage, and even provide real-time feedback on coating condition through integrated sensors.</p>
      
      <h2>Sustainability Focus</h2>
      <p>Environmental responsibility has become paramount in coating formulation. New water-based and bio-based coatings are achieving performance levels that rival traditional solvent-based systems while significantly reducing environmental impact.</p>
      
      <h2>Nanotechnology Integration</h2>
      <p>Nanomaterials are enhancing coating performance in unprecedented ways. From improved scratch resistance to enhanced thermal properties, nanotech is opening new possibilities for industrial applications.</p>
    `,
    coverImage: 'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    author: {
      name: 'Dr. Sarah Ahmed',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    publishDate: '2024-01-15',
    readTime: '8 min read',
    category: 'Industrial',
    tags: ['Industrial Coatings', 'Technology', 'Innovation'],
    featured: true
  },
  {
    id: 'home-interior-paint-guide-2024',
    title: 'Choosing the Right Paint for Your Home Interior',
    slug: 'home-interior-paint-guide-2024',
    excerpt: 'A comprehensive guide to selecting the perfect interior paint colors and finishes for every room in your home.',
    content: `
      <p>Selecting the right paint for your home interior is more than just choosing colors—it's about creating the perfect atmosphere for each space while ensuring durability and functionality.</p>
      
      <h2>Understanding Paint Finishes</h2>
      <p>Different rooms require different paint finishes. Matte finishes work well in bedrooms and living areas, while semi-gloss is ideal for kitchens and bathrooms where moisture resistance is important.</p>
      
      <h2>Color Psychology in Interior Design</h2>
      <p>Colors have a profound impact on mood and perception. Cool blues and greens create calming environments, while warm yellows and oranges energize spaces. Understanding color psychology helps create the desired ambiance.</p>
      
      <h2>Quality Matters</h2>
      <p>Investing in high-quality paint pays off in the long run. Premium paints offer better coverage, durability, and color retention, reducing the need for frequent touch-ups.</p>
    `,
    coverImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    publishDate: '2024-01-10',
    readTime: '6 min read',
    category: 'Residential',
    tags: ['Interior Design', 'Home Improvement', 'Color Selection'],
    featured: true
  },
  {
    id: 'sustainable-paint-solutions-2024',
    title: 'Sustainable Paint Solutions for Environmental Responsibility',
    slug: 'sustainable-paint-solutions-2024',
    excerpt: 'Learn about eco-friendly paint options that reduce environmental impact without compromising on quality and durability.',
    content: `
      <p>As environmental consciousness grows, the paint industry is responding with innovative sustainable solutions that don't compromise on performance or aesthetics.</p>
      
      <h2>Low-VOC and Zero-VOC Formulations</h2>
      <p>Volatile Organic Compounds (VOCs) have been largely eliminated from modern eco-friendly paints. These formulations provide excellent performance while maintaining healthy indoor air quality.</p>
      
      <h2>Bio-Based Raw Materials</h2>
      <p>Many manufacturers are incorporating bio-based materials derived from renewable resources. These ingredients reduce dependence on petroleum-based components without sacrificing performance.</p>
      
      <h2>Recycling and Waste Reduction</h2>
      <p>Paint recycling programs and concentrated formulas are reducing waste throughout the supply chain. These initiatives demonstrate the industry's commitment to circular economy principles.</p>
    `,
    coverImage: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    author: {
      name: 'Emma Rodriguez',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    publishDate: '2024-01-05',
    readTime: '7 min read',
    category: 'Sustainability',
    tags: ['Eco-Friendly', 'Sustainability', 'Green Building'],
    featured: true
  },
  {
    id: 'automotive-paint-protection-guide',
    title: 'Ultimate Guide to Automotive Paint Protection',
    slug: 'automotive-paint-protection-guide',
    excerpt: 'Comprehensive guide to protecting your vehicle\'s paint with ceramic coatings, PPF, and traditional wax methods.',
    content: `
      <p>Your vehicle's paint is constantly exposed to environmental hazards. Understanding the various protection options available can help maintain its appearance and value.</p>
      
      <h2>Ceramic Coatings</h2>
      <p>Ceramic coatings provide long-lasting protection with hydrophobic properties. These advanced formulations create a hard, durable layer that resists scratches and chemical damage.</p>
      
      <h2>Paint Protection Film (PPF)</h2>
      <p>PPF offers physical protection against stone chips and scratches. Modern films are virtually invisible and self-healing, making them ideal for high-impact areas.</p>
    `,
    coverImage: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    author: {
      name: 'James Wilson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    publishDate: '2024-01-01',
    readTime: '10 min read',
    category: 'Automotive',
    tags: ['Automotive', 'Protection', 'Ceramic Coatings'],
    featured: false
  },
  {
    id: 'marine-coating-challenges',
    title: 'Overcoming Marine Coating Challenges',
    slug: 'marine-coating-challenges',
    excerpt: 'Explore the unique challenges of marine environments and how modern coatings are designed to protect vessels.',
    content: `
      <p>Marine environments present some of the most challenging conditions for protective coatings. Salt water, UV exposure, and constant moisture create a perfect storm for coating degradation.</p>
      
      <h2>Antifouling Technologies</h2>
      <p>Modern antifouling coatings prevent marine growth while minimizing environmental impact. These formulations balance effectiveness with ecological responsibility.</p>
      
      <h2>Corrosion Protection</h2>
      <p>Multi-layer systems provide comprehensive protection against corrosion in marine environments. Proper application and maintenance are crucial for long-term performance.</p>
    `,
    coverImage: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    author: {
      name: 'Captain Marina Torres',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    publishDate: '2023-12-28',
    readTime: '9 min read',
    category: 'Marine',
    tags: ['Marine', 'Antifouling', 'Corrosion Protection'],
    featured: false
  },
  {
    id: 'future-of-paint-technology',
    title: 'The Future of Paint Technology: What\'s Coming Next',
    slug: 'future-of-paint-technology',
    excerpt: 'Explore emerging technologies that will shape the future of paint and coating applications.',
    content: `
      <p>The paint industry is on the cusp of revolutionary changes. From self-healing coatings to color-changing formulations, the future holds exciting possibilities.</p>
      
      <h2>AI-Driven Color Matching</h2>
      <p>Artificial intelligence is revolutionizing color matching and formulation. These systems can predict optimal color combinations and performance characteristics.</p>
      
      <h2>Self-Healing Properties</h2>
      <p>Advanced polymers that can repair minor damage automatically are becoming reality. These coatings extend service life and reduce maintenance requirements.</p>
    `,
    coverImage: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    author: {
      name: 'Dr. Alex Kumar',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    publishDate: '2023-12-25',
    readTime: '12 min read',
    category: 'Technology',
    tags: ['Future Tech', 'Innovation', 'AI'],
    featured: false
  }
];

export const blogCategories = [
  'All',
  'Industrial',
  'Residential', 
  'Automotive',
  'Marine',
  'Sustainability',
  'Technology'
];

// Get featured posts
export const getFeaturedPosts = () => blogPosts.filter(post => post.featured);

// Get latest posts
export const getLatestPosts = (limit?: number) => {
  const sorted = [...blogPosts].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  return limit ? sorted.slice(0, limit) : sorted;
};

// Get post by slug
export const getPostBySlug = (slug: string) => blogPosts.find(post => post.slug === slug);

// Get posts by category
export const getPostsByCategory = (category: string) => {
  if (category === 'All') return blogPosts;
  return blogPosts.filter(post => post.category === category);
};