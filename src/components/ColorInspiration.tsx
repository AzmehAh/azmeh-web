import React, { useState } from 'react';

const ColorInspiration = () => {
  const [selectedColor, setSelectedColor] = useState(0);

  const colorSwatches = [
    {
      name: 'Ocean Breeze',
      code: 'N°0050',
      color: '#7BA7BC',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    {
      name: 'Sage Whisper',
      code: 'N°2555',
      color: '#B8C5A1',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    {
      name: 'Sunset Glow',
      code: 'N°2570',
      color: '#E4A853',
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    {
      name: 'Charcoal Depth',
      code: 'N°8800',
      color: '#4A4A4A',
      image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    }
  ];

  const features = [
    'Weather-resistant formula for long-lasting protection',
    'Low-VOC composition for healthier indoor air quality',
    'Superior coverage with fewer coats required',
    'Advanced color retention technology',
    'Easy application and cleanup process'
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Features */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              New drops
            </h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-[#2C5DB6] rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-600 text-lg leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Color Swatches and Image */}
          <div>
            {/* Color Swatches */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              {colorSwatches.map((swatch, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{swatch.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{swatch.code}</p>
                  <button
                    onClick={() => setSelectedColor(index)}
                    className={`w-24 h-24 mx-auto rounded-full shadow-lg hover:scale-110 transition-all duration-300 border-4 ${
                      selectedColor === index ? 'border-white shadow-2xl' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: swatch.color }}
                  />
                </div>
              ))}
            </div>

            {/* Featured Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={colorSwatches[selectedColor].image}
                  alt={colorSwatches[selectedColor].name}
                  className="w-full h-80 object-cover transition-all duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-2xl font-bold mb-1">{colorSwatches[selectedColor].name}</h4>
                <p className="text-sm opacity-90">{colorSwatches[selectedColor].code}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColorInspiration;