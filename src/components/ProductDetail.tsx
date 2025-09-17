import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Package, FileText, CheckCircle, Wrench, Shield } from "lucide-react";
import { supabase, api } from "../lib/supabase"; // مسار معدل
import DOMPurify from 'dompurify';

// تعريف واجهة المنتج
interface Product {
  id: string;
  name: string;
  code: string;
  description: string;
  technical_description: string;
  image_url: string;
  images: string[];
  type: string;
  brand: string;
  material: string;
  usage: string;
  packaging: { size: string }[];
  technical_specs: { property: string; value: string; standard: string }[];
  features: string[];
  applications: string[];
  instructions: string[];
  storage: string;
  safety_precautions: string[];
  safety_first_aid: string[];
}

const brands = [
  { name: "Azmeh Paints", logo: "/images/Azmeh-Paints-Logo.png" },
  { name: "SRT",         logo: "/images/SRT-.gif" },
  { name: "Original",    logo: "/images/Original.gif" },
  { name: "Omegan",      logo: "/images/Omegan.gif" },
  { name: "Mlonati",     logo: "/images/Mlonati.gif" },
  { name: "Jupiter",     logo: "/images/Jupiter.gif" },
  { name: "COPRAbEL",    logo: "/images/COPRAbEL.jpg" },
  { name: "Capric",      logo: "/images/Capric.gif" },
  { name: "Azur",        logo: "/images/Azur-.png" },
  { name: "AlDahab",     logo: "/images/AlDahab.png" },
];


const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  useEffect(() => {
    if (product && product.images && product.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [product]);

  // دالة مساعدة لتحليل الحقول المصفوفة
  const parseArrayField = (field: any): any[] => {
    if (Array.isArray(field)) return field;
    if (typeof field === 'string') {
      try {
        return JSON.parse(field);
      } catch (e) {
        return [];
      }
    }
    return [];
  };

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      
      // جلب بيانات المنتج
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (productError) throw productError;
      if (!productData) {
        setProduct(null);
        return;
      }

      // جلب صور المنتج مع ترتيب الصورة الرئيسية أولاً
      const { data: imagesData, error: imagesError } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', productId)
        .order('is_main', { ascending: false })
        .order('sort_order', { ascending: true });

      if (imagesError) throw imagesError;

      // جلب الصورة الرئيسية
      const mainImage = await api.getMainProductImage(productId);

      const formattedProduct: Product = {
        id: productData.id,
        name: productData.name,
        code: productData.code,
        description: productData.description,
        technical_description: productData.technical_description || "",
        image_url: mainImage?.image_url || (imagesData && imagesData.length > 0 ? imagesData[0].image_url : ""),
        images: imagesData ? imagesData.map(img => img.image_url) : [],
        type: productData.type,
        brand: productData.brand,
        material: productData.material,
        usage: productData.usage,
        packaging: parseArrayField(productData.packaging),
        technical_specs: parseArrayField(productData.technical_specs),
        features: parseArrayField(productData.features),
        applications: parseArrayField(productData.applications),
        instructions: parseArrayField(productData.instructions),
        storage: productData.storage || "",
        safety_precautions: parseArrayField(productData.safety_precautions),
        safety_first_aid: parseArrayField(productData.safety_first_aid)
      };

      setProduct(formattedProduct);
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadDatasheet = () => {
    // يمكنك تنفيذ هذه الوظيفة لاحقاً
    console.log("Download datasheet for product:", product?.id);
    alert("سيتم تنزيل ورقة البيانات الفنية قريباً");
  };

  const brandLogo =
    product &&
    brands.find((b) =>
      product.brand ? product.brand.toLowerCase().includes(b.name.toLowerCase()) : false
    )?.logo;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0055A3]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/products"
            className="bg-[#2C5DB6] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#2C5DB6] to-[#1e4080] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="relative mb-8">
            <div className="flex items-center text-sm text-white">
              <Link to="/" className="hover:underline">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/products" className="hover:underline">Products</Link>
              {product && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-white">{product.name}</span>
                </>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">{product.name}</h1>
              <p className="text-xl text-blue-100 mb-4 leading-relaxed">{product.description}</p>

              <div className="flex flex-wrap gap-4 mb-8">
                <span className="px-4 py-2 bg-white/20 rounded-full text-white font-medium">{product.type}</span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-white font-medium">{product.material}</span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-white font-medium">{product.usage}</span>
              </div>

              <p className="text-blue-100/90 mb-6 leading-relaxed">{product.technical_description}</p>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Package className="w-5 h-5 text-white mr-2" />
                  Packaging & Sizes
                </h3>
                <div className="flex flex-wrap gap-4">
                  {product.packaging.map((pack, index) => (
                    <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center w-28">
                      <h4 className="text-sm font-bold text-white">{pack.size}</h4>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleDownloadDatasheet}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center"
              >
                <Download className="w-6 h-6 mr-3" />
                Download Technical Datasheet
              </button>
            </div>

            {/* Right Column */}
            <div className="relative">
              {brandLogo && (
                <div className="mb-4 text-right">
                  <img src={brandLogo} alt={product.brand || "Brand"} className="w-24 h-auto object-contain inline-block" />
                </div>
              )}

              {product.images.length > 0 ? (
                <>
                  <motion.img
                    key={currentImageIndex}
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-80 lg:h-96 object-cover rounded-2xl"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                  />

                  {product.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === currentImageIndex ? "bg-white shadow-lg" : "bg-white/50 hover:bg-white/70"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-80 lg:h-96 bg-gray-200 rounded-2xl flex items-center justify-center">
                  <p className="text-gray-500">No images available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      {product.technical_specs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
              <div className="bg-[#2C5DB6] px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <FileText className="w-6 h-6 mr-3" />
                  Technical Specifications
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-8 py-4 text-left font-semibold text-gray-800">Property</th>
                      <th className="px-8 py-4 text-left font-semibold text-gray-800">Value</th>
                      <th className="px-8 py-4 text-left font-semibold text-gray-800">Standard</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.technical_specs.map((spec, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-8 py-4 font-medium text-gray-800">{spec.property}</td>
                        <td className="px-8 py-4 text-[#2C5DB6] font-semibold">{spec.value}</td>
                        <td className="px-8 py-4 text-gray-600">{spec.standard}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features & Applications */}
      {(product.features.length > 0 || product.applications.length > 0) && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Features */}
              {product.features.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                    <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                    Key Features
                  </h2>
                  <div className="space-y-4">
                    {product.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-4 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Applications */}
              {product.applications.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                    <Wrench className="w-8 h-8 text-[#2C5DB6] mr-3" />
                    Applications
                  </h2>
                  <div className="space-y-4">
                    {product.applications.map((application, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="w-3 h-3 bg-[#2C5DB6] rounded-full mr-4 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{application}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Instructions */}
      {product.instructions.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Application Instructions
            </h2>
            <div className="max-w-4xl mx-auto relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2C5DB6] to-blue-300" />
              {product.instructions.map((instruction, index) => (
                <motion.div
                  key={index}
                  className="relative flex items-start mb-12 last:mb-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="absolute left-4 w-8 h-8 bg-[#2C5DB6] rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                    {index + 1}
                  </div>
                  <div className="ml-20 bg-gray-50 rounded-xl p-6 flex-1">
                    <p className="text-gray-700 leading-relaxed">{instruction}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Storage */}
      {product.storage && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 flex items-center justify-center">
              <Shield className="w-8 h-8 text-green-600 mr-3" />
              Storage Requirements
            </h2>
            <div
              className="max-w-4xl mx-auto bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.storage) }}
            />
          </div>
        </section>
      )}

      {/* Safety */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 flex items-center justify-center">
            <Shield className="w-8 h-8 text-red-500 mr-3" />
            Safety Information
          </h2>
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
            {/* Precautions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="bg-red-500 px-6 py-4">
                <h3 className="text-xl font-bold text-white">Safety Precautions</h3>
              </div>
              <div className="p-6">
                {product.safety_precautions.length > 0 ? (
                  <div className="space-y-3">
                    {product.safety_precautions.map((precaution, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0" />
                        <p className="text-gray-700">{precaution}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No safety precautions available.</p>
                )}
              </div>
            </motion.div>

            {/* First Aid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="bg-orange-500 px-6 py-4">
                <h3 className="text-xl font-bold text-white">First Aid</h3>
              </div>
              <div className="p-6">
                {product.safety_first_aid.length > 0 ? (
                  <div className="space-y-3">
                    {product.safety_first_aid.map((aid, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0" />
                        <p className="text-gray-700">{aid}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No first aid information available.</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;