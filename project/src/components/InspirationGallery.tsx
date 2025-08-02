import React, { useState } from 'react';

const InspirationGallery = () => {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  const galleryImages = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      title: 'Modern Kitchen Design',
      category: 'Interior'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      title: 'Contemporary Living Space',
      category: 'Interior'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      title: 'Elegant Bathroom',
      category: 'Interior'
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      title: 'Warm Bedroom Tones',
      category: 'Interior'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Gallery Grid */}
          <div className="grid grid-cols-2 gap-4">
            {galleryImages.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-xl group cursor-pointer"
                onMouseEnter={() => setHoveredImage(item.id)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-64 object-cover transition-all duration-500 ${
                      hoveredImage === item.id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                </div>
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
                  hoveredImage === item.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-xs uppercase tracking-wide opacity-80 mb-1">{item.category}</p>
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Inspiration on everything from colors to design
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover endless possibilities with our curated collection of color schemes and design inspirations. From bold statement walls to subtle accent tones, find the perfect palette for your vision.
            </p>
            <button className="bg-transparent border-2 border-[#2C5DB6] text-[#2C5DB6] px-8 py-4 rounded-full hover:bg-[#2C5DB6] hover:text-white transition-all duration-300 font-semibold">
              View Gallery
            </button>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600">
                FIND MORE INSPIRATION ON OUR{' '}
                <a href="#gallery" className="text-[#2C5DB6] font-semibold underline hover:no-underline transition-all duration-200">
                  GALLERY
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InspirationGallery;