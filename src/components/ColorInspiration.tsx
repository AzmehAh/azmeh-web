import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { supabase } from '../lib/supabase';

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
        const allImages = product.product_images || [];
        
        // جلب الصورة الرئيسية
        const mainImage = allImages.find(img => img.is_main) || allImages[0];
        
        // جلب الصورة الثانية (أول صورة غير رئيسية)
        const secondaryImage = allImages.find(img => !img.is_main) || allImages[1] || mainImage;

        return {
          id: product.id,
          name: product.name,
          mainImage: mainImage?.image_url || 'https://via.placeholder.com/300x300?text=No+Image',
          secondaryImage: secondaryImage?.image_url || 'https://via.placeholder.com/300x300?text=No+Image'
        };
      });

      setFeaturedProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      setFeaturedProducts([]);
      alert('Failed to load featured products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white">
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
        ) : featuredProducts.length > 0 ? ( 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-20">
            {featuredProducts.map((product, index) => (
<div
  key={product.id}
  className="relative group cursor-pointer w-52 h-[280px] mx-auto overflow-hidden"
  onMouseEnter={() => setHoveredColor(index)}
  onMouseLeave={() => setHoveredColor(null)}
>
  {/* الصورة الأساسية */}
  <img
    src={product.mainImage}
    alt={`${product.name} main`}
    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
      hoveredColor === index ? 'opacity-0' : 'opacity-100'
    }`}
  />

  {/* الصورة الثانية - تتحرك من الأسفل للأعلى لتغطي العنوان */}
  <img
    src={product.secondaryImage}
    alt={`${product.name} secondary`}
    className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ${
      hoveredColor === index
        ? 'opacity-100 transform translate-y-0'
        : 'opacity-0 transform translate-y-full'
    }`}
  />

  {/* العنوان */}
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-gray-800 z-20">
    <span className="block text-lg font-semibold">{product.name}</span>
  </div>
</div>
     
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No featured products available at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default ColorInspiration;