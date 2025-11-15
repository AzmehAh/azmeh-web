import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';

interface Bulletin {
  id: string;
  title: string;
  title_ar?: string;
  cover_image: string;
  created_at: string;
  
  featured?: boolean;
}

const BlogSection = () => {
  const { t, i18n } = useTranslation();
  const [featuredPosts, setFeaturedPosts] = useState<Bulletin[]>([]);
  const isArabic = i18n.language.startsWith('ar');

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data, error } = await supabase
          .from('bulletins')
          .select('id, title, title_ar, cover_image, created_at, short_description, short_description_ar, featured')
          .eq('featured', true)
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) {
          console.error('Error fetching bulletins:', error);
          setFeaturedPosts([]);
        } else {
          setFeaturedPosts(data || []);
        }
      } catch (err) {
        console.error('Unexpected error fetching bulletins:', err);
      }
    };

    fetchFeatured();
  }, [i18n.language]); // إعادة الجلب عند تغيير اللغة

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const locale = isArabic ? 'ar-EG' : 'en-US';
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
         

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            {t('blog.sectionTitle')}
          </motion.h2>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 sm:mb-12">
          {featuredPosts.length > 0 ? (
            featuredPosts.map((post, index) => (
              <Link key={post.id} to={`/bulletin/${post.id}`} className="h-full">
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
                      alt={isArabic ? post.title_ar || post.title : post.title}
                      className="w-full h-48 sm:h-56 lg:h-60 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Post Content */}
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <div
                      className={`flex items-center text-sm text-gray-500 mb-3 ${
                        isArabic ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <Calendar className={`w-4 h-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                      <span>{formatDate(post.created_at)}</span> 
                    </div>

                    <h1 className="text-lg sm:text-xl font-bold text-gray-900  min-h-[50px] group-hover:text-[#2C5DB6] transition-colors line-clamp-2">
                      {isArabic ? post.title_ar || post.title : post.title}
                    </h1>

                    
                  </div>
                </motion.article>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              {t('blog.noPosts')}
            </div>
          )}
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
  className="inline-flex items-center but group px-6 py-3 sm:px-8 sm:py-4 rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-logo/20 
             font-semibold text-sm sm:text-base"
>
  {t('blog.viewAllButton')}
  <ArrowRight
    className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
      isArabic
        ? 'mr-2 rotate-180 group-hover:-translate-x-1'
        : 'ml-2 group-hover:translate-x-1'
    }`}
  />
</Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
