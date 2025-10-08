import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';

const ColorInspiration = () => {
  const { t, i18n } = useTranslation(); // ← أضف t هنا
  const [hoveredColor, setHoveredColor] = useState<number | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [i18n.language]); // إعادة الجلب عند تغيير اللغة

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
        const mainImage = allImages.find(img => img.is_main) || allImages[0];
        const secondaryImage = allImages.find(img => !img.is_main) || allImages[1] || mainImage;

        return {
          id: product.id,
          name: i18n.language === 'ar' ? product.name_ar : product.name,
          mainImage: mainImage?.image_url || 'https://via.placeholder.com/300x300?text=No+Image',
          secondaryImage: secondaryImage?.image_url || 'https://via.placeholder.com/300x300?text=No+Image'
        };
      });

      setFeaturedProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      setFeaturedProducts([]);
      alert(t('errors.failedToLoadProducts')); 
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
            className="text-sm uppercase text-logo mb-2"
          >
            {t('colorInspiration.subtitle')} 
          </motion.h3>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            {t('colorInspiration.title')} 
          </motion.h2>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-logo"></div>
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-20">
            {featuredProducts.map((product, index) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="relative group cursor-pointer w-52 h-[280px] mx-auto overflow-hidden block"
                onMouseEnter={() => setHoveredColor(index)}
                onMouseLeave={() => setHoveredColor(null)}
              >
                <img
                  src={product.mainImage}
                  alt={`${product.name} main`}
                  className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ${
                    hoveredColor === index ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <img
                  src={product.secondaryImage}
                  alt={`${product.name} secondary`}
                  className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ${
                    hoveredColor === index ? 'opacity-100 scale-y-125' : 'opacity-0 scale-y-100'
                  }`}
                />
                {hoveredColor !== index && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center text-gray-800 z-20">
                    <span className="block text-lg font-semibold">{product.name}</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            {t('colorInspiration.noProducts')}
          </div>
        )}
      </div>
    </section>
  );
};

export default ColorInspiration;