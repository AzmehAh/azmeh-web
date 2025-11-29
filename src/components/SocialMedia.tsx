import React from 'react';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

const SocialMedia = () => {
  const { t, i18n } = useTranslation(''); // استخدام namespace 'social'
  const isRTL = i18n.language === 'ar';

  const socialPosts = [
    { 
      iframe: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fazmehpaints%2Fposts%2Fpfbid02J7BXbrpepYK7wqLU62JxrTdeRGQMx9zGBKZAsNVgR75NX5inQr2bMq3capk9H9oVl&show_text=true&width=500',
      platform: 'facebook' 
    },
    { 
      iframe: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fazmehpaints%2Fposts%2Fpfbid02Hj83iA1H8YkNq4CB1ZqytrX2QHLtT6WpV5o9SVowXaXUDbFJHQzQjYWPLcTYs2Qrl&show_text=true&width=500',
      platform: 'facebook'
    },
    { 
      iframe: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fazmehpaints%2Fposts%2Fpfbid0aZu4z3Fhu2XyXBFcgcApn7YqhaQ1kyAqH3byaUJpAttfu9VHoV3kAZYJAWaqeoFKl&showxt=true&width=500',   
      platform: 'facebook'
    },
    { 
      iframe: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fazmehpaints%2Fposts%2Fpfbid0295iKhD5X7pF24SGFABL1coKL786cHKxmYGe9M28KoCmBWpRu22LRkj4FqeTMzkCl&show_text=true&width=500',
      platform: 'facebook'
    },
  ];

  return (
    <section className="py-20 relative bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* العنوان والنص */}
        <div className="text-center mb-3">
       
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            {t('social.followUsTitle')}
          </motion.h2>
         
          <div className="mt-6 w-24 h-1 bg-white/50 mx-auto rounded"></div>
        </div>

        {/* Social Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {socialPosts.map((post, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="aspect-square w-full h-full rounded-xl overflow-hidden">
                <iframe
                  src={post.iframe}
                  title={`social-post-${index}`}
                  className="w-full h-full rounded-xl"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </div>
            </div>
          ))}
        </div>

        {/* Social Follow Buttons */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
          
          {/* Instagram */}
          <a
            href="https://www.instagram.com/azmehpaints/"
            className="flex items-center justify-start bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] 
            text-white rounded-full px-3.5 py-3 h-12 overflow-hidden transition-all duration-500 ease-in-out 
            w-[47px] hover:w-[220px] group shadow-lg hover:shadow-2xl origin-left whitespace-nowrap"
          >
            <Instagram className="w-5 h-5 flex-shrink-0" />
            <span className="ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
              {t('social.followInstagram')}
            </span> 
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/azmehpaints/about?locale=ar_AR"
            className="flex items-center justify-start bg-[#1877F2] text-white rounded-full px-3.5 py-3 h-12 
            overflow-hidden transition-all duration-500 ease-in-out w-[47px] hover:w-[200px] 
            group shadow-lg hover:shadow-2xl origin-left whitespace-nowrap"
          >
            <Facebook className="w-5 h-5 flex-shrink-0" />
            <span className="ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
              {t('social.likeFacebook')}
            </span>
          </a>

          {/* WhatsApp */} 
          <a
            href="#"
            className="flex items-center justify-start bg-[#25D366] text-white rounded-full px-3.5 py-3 h-12 
            overflow-hidden transition-all duration-500 ease-in-out w-[47px] hover:w-[200px] 
            group shadow-lg hover:shadow-2xl origin-left whitespace-nowrap"
          >
            <MessageCircle className="w-5 h-5 flex-shrink-0" />
            <span className="ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
              {t('social.whatsappSupport')}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;