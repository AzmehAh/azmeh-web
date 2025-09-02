import React from 'react';
import { Instagram, Facebook, MessageCircle, ExternalLink } from 'lucide-react';

const SocialMedia = () => {
  const socialPosts = [
    { 
      iframe: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fazmehpaints%2Fposts%2Fpfbid02JwdafQwMtxfNuq767fjKzWeWRf12YYs6giSBtNGDQCHqiDjduh9f7gThS8dhmMtil&show_text=true&width=500',
      platform: 'facebook'
    },
 { 
iframe :'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fazmehpaints%2Fposts%2Fpfbid02DSC5xcLaR4pAGbVZbC5fSvJDdWnDtr8Dd35eBzvfAVCfxkk8nFGXEe4URi6f98p7l&show_text=true&width=500" width="500" height="653" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share',
   platform: 'facebook'
    },
     { 
iframe :'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fazmehpaints%2Fposts%2Fpfbid02XK9BgwYfHT9DBXXNnk67s4CLq8QAGckipURTrYuwLW9ujtuiATAGbzZExN9HbkzQl&show_text=true&width=500" width="500" height="673" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share',   
       platform: 'facebook'
    },
     { 
<iframe 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fazmehpaints%2Fposts%2Fpfbid0uQcazGWJCnbXYvWbAppKAjP9Fz3peutyfG62SL97q1uaJsfD79taqKhskcDLmkdTl&show_text=true&width=500" width="500" height="659" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share',
      platform: 'facebook'
    },
    // أضف أي منشورات أخرى بنفس الشكل
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {socialPosts.map((post, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square w-full h-full">
                <iframe
                  src={post.iframe}
                  title={`social-post-${index}`}
                  className="w-full h-full rounded-lg"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </div>
            </div>
          ))}
        </div>

        {/* Social Follow Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Follow us for inspiration
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Stay updated with our latest projects, color trends, and design inspiration. Join our community of paint enthusiasts and professionals.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 group"
            >
              <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-semibold">Follow on Instagram</span>
            </a>
            
            <a
              href="#"
              className="flex items-center space-x-3 bg-[#1877F2] text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 group"
            >
              <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-semibold">Like on Facebook</span>
            </a>
            
            <a
              href="#"
              className="flex items-center space-x-3 bg-[#25D366] text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 group"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-semibold">WhatsApp Support</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
