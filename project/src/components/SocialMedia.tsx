import React from 'react';
import { Instagram, Facebook, MessageCircle, ExternalLink } from 'lucide-react';

const SocialMedia = () => {
  const socialPosts = [
    {
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      caption: 'Transform your space with our premium interior paint collection',
      platform: 'instagram'
    },
    {
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      caption: 'Exterior facade restoration project completed in downtown',
      platform: 'instagram'
    },
    {
      image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      caption: 'Modern kitchen design with our latest color trends',
      platform: 'facebook'
    },
    {
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      caption: 'Industrial coating solutions for maximum durability',
      platform: 'instagram'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Media Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {socialPosts.map((post, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square">
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm leading-relaxed mb-2">
                    {post.caption}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {post.platform === 'instagram' ? (
                        <Instagram className="w-4 h-4 text-white" />
                      ) : (
                        <Facebook className="w-4 h-4 text-white" />
                      )}
                      <span className="text-white text-xs capitalize">{post.platform}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white" />
                  </div>
                </div>
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