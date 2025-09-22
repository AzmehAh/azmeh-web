import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  mainImage: string; // الصورة الرئيسية
  featured: boolean; // للتحقق إذا كان منتج مميز
}

const ColorInspiration = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // جلب المنتجات المميزة من الباك إند
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // ✅ غير الرابط ده لرابط API الحقيقي عندك
        const response = await fetch('/api/products?featured=true');
        const products: Product[] = await response.json();
        
        // ✅ تأكد أن المنتجات فيها featured=true فقط (إحتياطًا)
        const featured = products.filter(p => p.featured);
        setFeaturedProducts(featured);
      } catch (error) {
        console.error("فشل جلب المنتجات:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500">جاري التحميل...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-10 lg:px-14">
        {/* العنوان */}
        <div className="text-center mb-10">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase text-[#0055A3] mb-2"
          >
            مميزات جديدة
          </motion.h3>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            منتجات مميزة
          </motion.h2>
        </div>

        {/* الشبكة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-20">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product, index) => (
              <div
                key={product.id} // ✅ استخدم ID حقيقي بدل index
                className="relative overflow-hidden group cursor-pointer w-52 h-[280px] mx-auto"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* الصورة الرئيسية — نستخدمها كصورة Bucket و Square معًا */}
                {/* يمكنك لاحقًا إضافة صورة ثانية إذا أردت تأثير التبديل */}
                <img
                  src={product.mainImage}
                  alt={`${product.name} bucket`}
                  className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ease-out ${
                    hoveredProduct === product.id ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                  }`}
                />

                {/* نفس الصورة — لكن مع تأثير hover (يمكنك لاحقًا تغييرها لصورة أخرى) */}
                <img
                  src={product.mainImage}
                  alt={`${product.name} square`}
                  className={`absolute inset-0 z-10 w-full h-full object-cover shadow-xl transition-all duration-700 ease-out ${
                    hoveredProduct === product.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                />

                {/* الاسم */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-gray-800">
                  <span className="block text-lg font-semibold">{product.name}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              لا توجد منتجات مميزة حالياً
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ColorInspiration;