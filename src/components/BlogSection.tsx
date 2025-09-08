import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Latest Trends in Industrial Coating Technologies",
      image: "https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      publishDate: "2024-01-15",
      excerpt: "Discover the newest innovations in industrial coatings that are transforming manufacturing and construction industries."
    },
    {
      id: 2,
      title: "Choosing the Right Paint for Your Home Interior",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      publishDate: "2024-01-10",
      excerpt: "A comprehensive guide to selecting the perfect interior paint colors and finishes for every room in your home."
    },
    {
      id: 3,
      title: "Sustainable Paint Solutions for Environmental Responsibility",
      image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      publishDate: "2024-01-05",
      excerpt: "Learn about eco-friendly paint options that reduce environmental impact without compromising on quality and durability."
    }
  ];

  const formatDate = (dateString: string) => {
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
        
      {/* Section Header - Blog */}
<div className="text-center mb-16">
  {/* العنوان الصغير */}
  <motion.h3
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-sm uppercase text-[#0055A3] mb-2"
  >
    Paint Inspiration
  </motion.h3>

  {/* العنوان الكبير */}
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.1 }}
    className="text-4xl font-bold text-gray-900 mb-4"
  >
    Latest from Our Blog
  </motion.h2>

  {/* الخط الأزرق */}
  <motion.div
    initial={{ width: 0 }}
    whileInView={{ width: "80%" }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="h-1 bg-[#0055A3] mx-auto rounded"
  />
</div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white  shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
            >
              {/* Post Image */}
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-60 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
 
              {/* Post Content */}
              <div className="p-6">
                {/* Publish Date */}
                <div className="flex items-center text-sm  text-gray-500 mb-3">
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
            to="/systems"
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