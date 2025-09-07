import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Meet 13 top interior designers, architects, and professional painters shaping the industry",
      image: "https://images.pexels.com/photos/5824899/pexels-photo-5824899.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      publishDate: "2024-01-15",
      excerpt: "Discover the leading professionals who are transforming the design and painting industry with their innovative approaches."
    },
    {
      id: 2,
      title: "Transform outdoor wood furniture with exterior wood stain",
      image: "https://images.pexels.com/photos/5824905/pexels-photo-5824905.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      publishDate: "2024-01-10",
      excerpt: "Learn expert techniques to revitalize your outdoor wood furniture using high-quality exterior wood stains."
    },
    {
      id: 3,
      title: "Eco Spec®: Benjamin Moore's greenest and lowest-odor interior paint",
      image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      publishDate: "2024-01-05",
      excerpt: "Explore the benefits of Eco Spec®, the environmentally friendly paint solution with minimal odor and maximum performance."
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Benjamin Moore Insights
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover the latest trends, professional tips, and innovative products from the world of premium paints.
          </motion.p>
        </div>

        {/* Special Offer Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#2C5DB6] text-white p-6 rounded-xl mb-12 text-center"
        >
          <h3 className="text-2xl font-bold mb-2">Special Offer</h3>
          <p className="text-lg">
            Save 20%* on up to 3 gallons of Regal® Select Interior paint using code <span className="font-mono font-bold">REGAL20</span> in your cart.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
            >
              {/* Post Image */}
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                {/* Publish Date */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{formatDate(post.publishDate)}</span>
                </div>

                {/* Post Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#2C5DB6] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Post Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link
            to="/blog"
            className="inline-flex items-center bg-[#2C5DB6] text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
          >
            View All Articles
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default BlogSection;