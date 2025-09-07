import React from 'react';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';

const SocialMedia = () => {
  const socialPosts = [
    { 
      iframe: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fazmehpaints%2Fposts%2Fpfbid02JwdafQwMtxfNuq767fjKzWeWRf12YYs6giSBtNGDQCHqiDjduh9f7gThS8dhmMtil&show_text=true&width=500',
      platform: 'facebook'
    },
    { 
      iframe :'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fazmehpaints%2Fposts%2Fpfbid02DSC5xcLaR4pAGbVZbC5fSvJDdWnDtr8Dd35eBzvfAVCfxkk8nFGXEe4URi6f98p7l&show_text=true&width=500',
      platform: 'facebook'
    },
    { 
      iframe :'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fazmehpaints%2Fposts%2Fpfbid02XK9BgwYfHT9DBXXNnk67s4CLq8QAGckipURTrYuwLW9ujtuiATAGbzZExN9HbkzQl&show_text=true&width=500',   
      platform: 'facebook'
    },
    { 
      iframe :'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fazmehpaints%2Fposts%2Fpfbid0uQcazGWJCnbXYvWbAppKAjP9Fz3peutyfG62SL97q1uaJsfD79taqKhskcDLmkdTl&show_text=true&width=500',
      platform: 'facebook'
    },
  ];

  return (
    <section className="py-20 relative  bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* العنوان والنص */}
        <div className="text-center mb-16">
          <h3 className="text-sm uppercase text-[#0055A3] mb-2 tracking-widest">
      Creative Vibes
    </h3>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Follow us for inspiration
          </h2>
          
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
<a
  href="#"
  className="flex items-center bg-[#0055a3] text-white rounded-full h-12 w-12 hover:w-60 overflow-hidden transition-all duration-500 ease-in-out shadow-lg hover:shadow-2xl origin-left group"
>
  <div className="flex items-center justify-center w-full px-2 transition-all duration-500 group-hover:justify-start">
    <Instagram className="w-5 h-5 flex-shrink-0" />
    <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
      Follow on Instagram
    </span>
  </div>
</a>


          <a
            href="#"
            className="flex items-center bg-[#0055a3] text-white rounded-full px-4 py-3 h-12 overflow-hidden transition-all duration-500 ease-in-out w-12 hover:w-52 hover:scale-105 group shadow-lg hover:shadow-2xl"
          >
            <div className="flex items-center justify-center transition-all duration-300 group-hover:justify-start w-full">
              <Facebook className="w-5 h-5 flex-shrink-0 group-hover:ml-2 transition-all duration-300" />
              <span
                className="ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden group-hover:inline"
              >
                Like on Facebook
              </span>
            </div>
          </a>

          <a
            href="#"
            className="flex items-center bg-[#0055a3] text-white rounded-full px-4 py-3 h-12 overflow-hidden transition-all duration-500 ease-in-out w-12 hover:w-52 hover:scale-105 group shadow-lg hover:shadow-2xl"
          >
            <div className="flex items-center justify-center transition-all duration-300 group-hover:justify-start w-full">
              <MessageCircle className="w-5 h-5 flex-shrink-0 group-hover:ml-2 transition-all duration-300" />
              <span
                className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden group-hover:inline"
              >
                WhatsApp Support
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
