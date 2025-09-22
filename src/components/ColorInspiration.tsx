import React, { useState } from 'react';
import { useEffect } from 'react';
import { motion } from "framer-motion";
import { api } from '../lib/supabase';

const ColorInspiration = () => {
  const [hoveredColor, setHoveredColor] = useState<number | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_images (*)
        `)
        .eq('status', 'active')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) throw error;

      const formattedProducts = (data || []).map(product => {
        const mainImage = product.product_images.find(img => img.is_main) || 
                          product.product_images[0];
        
        return {
          id: product.id,
          name: product.name,
          image: mainImage?.image_url || 'https://i.postimg.cc/850wmJTV/Whats-App-Image-2025-08-17-at-2-34-35-PM.jpg'
        };
      });

      setFeaturedProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      // Fallback to static data if database fetch fails
      setFeaturedProducts([
        { 
          id: '1',
          name: 'Little Kiwi',
          image: 'https://i.postimg.cc/850wmJTV/Whats-App-Image-2025-08-17-at-2-34-35-PM.jpg'
        },
        {
          id: '2',
          name: 'Ocean',
          image: 'https://i.postimg.cc/850wmJTV/Whats-App-Image-2025-08-17-at-2-34-35-PM.jpg'
        },
        {
          id: '3',
          name: 'Lemon',
          image: 'https://i.postimg.cc/850wmJTV/Whats-App-Image-2025-08-17-at-2-34-35-PM.jpg'
        },
        {
          id: '4',
          name: 'Charcoal',
          image: 'https://i.postimg.cc/850wmJTV/Whats-App-Image-2025-08-17-at-2-34-35-PM.jpg'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-10 lg:px-14">
        {/* Title */}
        <div className="text-center mb-10">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase text-[#0055A3] mb-2"
          >
            Fresh & Exclusive
          </motion.h3>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            New Drops
          </motion.h2>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0055A3]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-20">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="relative overflow-hidden group cursor-pointer w-52 h-[280px] mx-auto"
                onMouseEnter={() => setHoveredColor(index)}
                onMouseLeave={() => setHoveredColor(null)}
              >
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={`${product.name} product`}
                  className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ease-out ${
                    hoveredColor === index ? 'opacity-80 scale-105' : 'opacity-100 scale-100'
                  }`}
                />

                {/* Title */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-gray-800">
                  <span className="block text-lg font-semibold">{product.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ColorInspiration;
