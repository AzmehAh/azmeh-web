import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

interface Bulletin {
  id: string;
  title: string;
  cover_image: string;
  created_at: string;
  short_description: string;
}

const BlogSection = () => {
  const [featuredPosts, setFeaturedPosts] = useState<Bulletin[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data, error } = await supabase
        .from('bulletins')
        .select('id, title, cover_image, created_at, short_description')
        .eq('featured', true)  
        .order('created_at', { ascending: false }) 
        .limit(3); 

      if (error) {
        console.error('Error fetching featured bulletins:', error.message);
      } else {
        setFeaturedPosts(data || []);
      }
    };

    fetchFeatured();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase text-[#0055A3] mb-2"
          >
            Paint Inspiration
          </motion.h3>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            Latest from Our Blog
          </motion.h2>

         
        </div>

        {/* Blog Posts Grid */}
        
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 sm:mb-12">
  {featuredPosts.map((post, index) => (
    <Link 
      key={post.id}
      to={`/bulletin/${post.id}`}
      className="h-full"
    >
      <motion.article
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer flex flex-col h-full"
      >
        {/* Post Image */}
        <div className="relative overflow-hidden">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-48 sm:h-56 lg:h-60 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Post Content */}
        <div className="p-4 sm:p-6 flex flex-col flex-grow">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(post.created_at)}</span>
          </div>

          <h1
            className="text-lg sm:text-xl font-bold text-gray-900 mb-3 min-h-[64px] group-hover:text-[#2C5DB6] transition-colors line-clamp-2"
          >
            {post.title}
          </h1>

          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-grow">
            {post.short_description}
          </p>
        </div>
      </motion.article>
    </Link>
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
            className="inline-flex items-center bg-[#2C5DB6] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold text-sm sm:text-base"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
