import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Package, FileText, CheckCircle, Wrench, Shield } from "lucide-react";
import { supabase, api } from "../lib/supabase";
import DOMPurify from 'dompurify';

// تعريف واجهة المنتج - محدثة
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
  // الحقول الجديدة للتطبيق
  application?: {
    method_of_application?: string;
    mixing_ratio?: string;
    mixing_note?: string;
    pot_life?: string;
    cleaner_thinner?: string;
    application_temperature?: string;
    curing_note?: string;
    number_of_coats?: string;
  dry_to_touch?: string;
  dry_to_handle?: string;
  complete_setting?: string;
  grouting_time?: string;
  adjustability_time?: string;
  dry_to_topcoat?: string;
  initial_setting?: string;
  fully_cured?: string;
  dry_to_sand?: string;
  drying_time_note?: string;
   storing_conditions?: string;
    joint_preparation?: string;
  joint_size?: string;
  movement_capacity?: string;
  substrate_treatment?: string;
  surface_preparation?: string;
  recommended_uses?: string[];

  };
}

const TECHNICAL_FIELDS = [
  { key: 'number_of_coats', label: 'Number of Coats' },
  { key: 'tensile_adhesion_strength', label: 'Tensile Adhesion Strength' },
  { key: 'material_consumption', label: 'Material Consumption' },
  { key: 'viscosity', label: 'Viscosity' },
  { key: 'weather_resistance', label: 'Weather Resistance' },
  { key: 'compressive_strength', label: 'Compressive Strength' },
  { key: 'tear_resistance', label: 'Tear Resistance' },
  { key: 'elongation_at_rupture', label: 'Elongation at Rupture' },
  { key: 'tensile_strength_100', label: 'Tensile Strength at 100% Elongation' },
  { key: 'tensile_strength_50', label: 'Tensile Strength at 50% Elongation' },
  { key: 'specific_gravity_mixed', label: 'Specific Gravity (Mixed)' },
  { key: 'solvent_resistance', label: 'Solvent Resistance' },
  { key: 'chemical_resistance', label: 'Chemical Resistance' },
  { key: 'abrasion_resistance', label: 'Abrasion Resistance' },
  { key: 'friction_resistance', label: 'Friction Resistance' },
  { key: 'washability', label: 'Washability' },
  { key: 'water_resistance', label: 'Water Resistance' },
  { key: 'theoretical_spreading_rate', label: 'Theoretical Spreading Rate' },
  { key: 'recommended_film_thickness', label: 'Recommended Film Thickness' },
  { key: 'temperature_resistance', label: 'Temperature Resistance' },
  { key: 'solvent_splash_resistance', label: 'Solvent Splash Resistance' },
  { key: 'sandability', label: 'Sandability' },
  { key: 'adhesion', label: 'Adhesion' },
  { key: 'flexibility', label: 'Flexibility' },
  { key: 'voc', label: 'VOC' },
  { key: 'volume_solids', label: 'Volume Solids' },
  { key: 'gloss', label: 'Gloss' },
  { key: 'color', label: 'Color' },
  { key: 'component_a', label: 'Component A' },
  { key: 'component_b', label: 'Component B' },
  { key: 'note', label: 'Note' },
];

const brands = [
  { name: "Azmeh Paints", logo: "/images/Azmeh-Paints-Logo.png" },
  { name: "SRT", logo: "/images/SRT-.gif" },
  { name: "Original", logo: "/images/Original.gif" },
  { name: "Omegan", logo: "/images/Omegan.gif" },
  { name: "Mlonati", logo: "/images/Mlonati.gif" },
  { name: "Jupiter", logo: "/images/Jupiter.gif" },
  { name: "COPRAbEL", logo: "/images/COPRAbEL.jpg" },
  { name: "Capric", logo: "/images/Capric.gif" },
  { name: "Azur", logo: "/images/Azur-.png" },
  { name: "AlDahab", logo: "/images/AlDahab.png" },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

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

  // دالة مساعدة لتحليل الحقول المصفوفة - محسنة
  const parseArrayField = (field: any): any[] => {
    if (Array.isArray(field)) return field;
    if (typeof field === 'string') {
      try {
        const parsed = JSON.parse(field);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        // إذا فشل التحليل، حاول تقسيم النص بالفاصلة
        if (field.includes(',')) {
          return field.split(',').map((item: string) => item.trim()).filter(Boolean);
        }
        return field ? [field] : [];
      }
    }
    return [];
  };

  // دالة لإنشاء كائن التطبيق
  const createApplicationObject = (productData: any) => {
    const applicationFields = [
      'method_of_application',
      'mixing_ratio',
      'mixing_note',
      'pot_life',
      'cleaner_thinner',
      'application_temperature',
      'curing_note',
      'number_of_coats'
    ];

    const application: any = {};
    let hasApplicationData = false;

    applicationFields.forEach(field => {
      if (productData[field]) {
        application[field] = productData[field];
        hasApplicationData = true;
      }
    });

    return hasApplicationData ? application : undefined;
  };

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching product with ID:', productId);
      
      // جلب بيانات المنتج
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (productError) {
        console.error('Supabase error:', productError);
        throw productError;
      }

      if (!productData) {
        console.log('No product data found');
        setProduct(null);
        return;
      }

      console.log('Product data received:', productData);

      // جلب صور المنتج
      let imagesData = [];
      try {
        const { data: images, error: imagesError } = await supabase
          .from('product_images')
          .select('*')
          .eq('product_id', productId)
          .order('is_main', { ascending: false })
          .order('sort_order', { ascending: true });

        if (imagesError) {
          console.error('Error fetching images:', imagesError);
        } else {
          imagesData = images || [];
        }
      } catch (imagesError) {
        console.error('Exception fetching images:', imagesError);
      }

      // جلب الصورة الرئيسية
      let mainImage = null;
      try {
        mainImage = await api.getMainProductImage(productId);
      } catch (imageError) {
        console.error('Error fetching main image:', imageError);
      }

      // إنشاء كائن المنتج المنسق
      const formattedProduct: Product = {
        id: productData.id,
        name: productData.name || 'No Name',
        code: productData.code || 'No Code',
        description: productData.description || '',
        technical_description: productData.technical_description || "",
        image_url: mainImage?.image_url || 
                  (imagesData.length > 0 ? imagesData[0].image_url : "") ||
                  productData.image_url || 
                  "/images/placeholder.jpg",
        images: imagesData.map(img => img.image_url).filter(Boolean),
        type: productData.type || "",
        brand: productData.brand || "",
        material: productData.material || "",
        usage: productData.usage || "",
        packaging: parseArrayField(productData.packaging),
        technical_specs: TECHNICAL_FIELDS
          .map(({ key, label }) => ({
            property: label,
            value: productData[key] || '',
            standard: ''
            
          }))
          .filter(spec => spec.value && spec.value.toString().trim() !== ''),
        features: parseArrayField(productData.features),
        applications: parseArrayField(productData.applications),
        instructions: parseArrayField(productData.instructions),
        storage: productData.storage || "",
        safety_precautions: parseArrayField(productData.safety_precautions),
        safety_first_aid: parseArrayField(productData.safety_first_aid),
        application: createApplicationObject(productData),
         
  joint_preparation: productData.joint_preparation || '',
  joint_size: productData.joint_size || '',
  movement_capacity: productData.movement_capacity || '',
  substrate_treatment: productData.substrate_treatment || '',
  surface_preparation: productData.surface_preparation || '',
  recommended_uses: parseArrayField(productData.recommended_uses),

       
         storing_conditions: productData.storing_conditions || '',
  dry_to_touch: productData.dry_to_touch || '',
  dry_to_handle: productData.dry_to_handle || '',
  complete_setting: productData.complete_setting || '',
  grouting_time: productData.grouting_time || '',
  adjustability_time: productData.adjustability_time || '',
  dry_to_topcoat: productData.dry_to_topcoat || '',
  initial_setting: productData.initial_setting || '',
  fully_cured: productData.fully_cured || '',
  dry_to_sand: productData.dry_to_sand || '',
  drying_time_note: productData.drying_time_note || ''
      };

      console.log('Formatted product:', formattedProduct);
      setProduct(formattedProduct);

    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product. Please try again.');
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadDatasheet = () => {
    console.log("Download datasheet for product:", product?.id);
    alert("سيتم تنزيل ورقة البيانات الفنية قريباً");
  };

  const brandLogo = product && brands.find((b) =>
    product.brand ? product.brand.toLowerCase().includes(b.name.toLowerCase()) : false
  )?.logo;

  // إضافة ديباج للتسجيل
  console.log('Current product state:', { product, loading, error });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0055A3]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Product</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            to="/products"
            className="bg-[#2C5DB6] text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/products"
            className="bg-[#2C5DB6] text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors inline-block"
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
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#2C5DB6] to-[#1e4080] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="relative mb-10">
            <div className="flex items-center text-sm text-white">
              <Link to="/" className="hover:text-[#0055A3] transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/products" className="hover:text-[#0055A3] transition-colors">Products</Link>
              {product && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-white">{product.name}</span>
                </>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">{product.name}</h1>
                <p className="text-xl text-blue-100 mb-6 leading-relaxed">{product.description}</p>

                <div className="flex flex-wrap gap-4 mb-8">
                  {product.type && (
                    <span className="px-5 py-2.5 bg-white/20 rounded-full text-white font-medium backdrop-blur-sm">{product.type}</span>
                  )}
                  {product.material && (
                    <span className="px-5 py-2.5 bg-white/20 rounded-full text-white font-medium backdrop-blur-sm">{product.material}</span>
                  )}
                  {product.usage && (
                    <span className="px-5 py-2.5 bg-white/20 rounded-full text-white font-medium backdrop-blur-sm">{product.usage}</span>
                  )}
                </div>
              </div>

              {product.technical_description && (
                <p className="text-blue-100/90 leading-relaxed text-lg">{product.technical_description}</p>
              )}

              {product.packaging && product.packaging.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Package className="w-6 h-6 text-white mr-3" />
                    Packaging & Sizes
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {product.packaging.map((pack, index) => (
                      <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center min-w-[120px]">
                        <h4 className="text-sm font-bold text-white">{pack.size}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleDownloadDatasheet}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-10 py-5 rounded-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center text-lg"
              >
                <Download className="w-6 h-6 mr-3" />
                Download Technical Datasheet
              </button>
            </div>

            {/* Right Column */}
            <div className="relative">
              {brandLogo && (
                <div className="mb-8 text-right">
                  <img src={brandLogo} alt={product.brand || "Brand"} className="w-32 h-auto object-contain inline-block" />
                </div>
              )}

              {product.images && product.images.length > 0 ? (
                <div className="relative">
                  <motion.img
                    key={currentImageIndex}
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-80 lg:h-96 object-cover rounded-3xl shadow-2xl"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    onError={(e) => {
                      e.currentTarget.src = "/images/placeholder.jpg";
                    }}
                  />

                  {product.images.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-4 h-4 rounded-full transition-all ${
                            index === currentImageIndex ? "bg-white shadow-lg" : "bg-white/50 hover:bg-white/70"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-80 lg:h-96 bg-gray-200 rounded-3xl flex items-center justify-center shadow-2xl">
                  <p className="text-gray-500 text-lg">No images available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Guidelines */}
      {(
        product.joint_preparation ||
        product.joint_size ||
        product.movement_capacity ||
        product.substrate_treatment ||
        product.surface_preparation ||
        (product.recommended_uses && product.recommended_uses.length > 0)
      ) && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                Technical Guidelines
              </h2>
              <div className="bg-gray-50 rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {product.joint_preparation && (
                    <div className="px-8 py-6">
                      <p className="text-gray-800 text-lg">
                        <span className="font-semibold">Joint Preparation:</span> {product.joint_preparation}
                      </p>
                    </div>
                  )}
                  {product.joint_size && (
                    <div className="px-8 py-6">
                      <p className="text-gray-800 text-lg">
                        <span className="font-semibold">Joint Size:</span> {product.joint_size}
                      </p>
                    </div>
                  )}
                  {product.movement_capacity && (
                    <div className="px-8 py-6">
                      <p className="text-gray-800 text-lg">
                        <span className="font-semibold">Movement Capacity:</span> {product.movement_capacity}
                      </p>
                    </div>
                  )}
                  {product.substrate_treatment && (
                    <div className="px-8 py-6">
                      <p className="text-gray-800 text-lg">
                        <span className="font-semibold">Substrate Treatment:</span> {product.substrate_treatment}
                      </p>
                    </div>
                  )}
                  {product.surface_preparation && (
                    <div className="px-8 py-6">
                      <p className="text-gray-800 text-lg">
                        <span className="font-semibold">Surface Preparation:</span> {product.surface_preparation}
                      </p>
                    </div>
                  )}
                  {product.recommended_uses && product.recommended_uses.length > 0 && (
                    <div className="px-8 py-6">
                      <p className="text-gray-800 mb-4 font-semibold text-lg">Recommended Uses:</p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
                        {product.recommended_uses.map((use, index) => (
                          <li key={index}>{use}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Technical Specifications */}
      {product.technical_specs && product.technical_specs.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-[#2C5DB6] px-8 py-8">
                <h2 className="text-3xl font-bold text-white flex items-center">
                  <FileText className="w-8 h-8 mr-4" />
                  Technical Specifications
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-8 py-6 text-left font-bold text-gray-800 text-lg">Property</th>
                      <th className="px-8 py-6 text-left font-bold text-gray-800 text-lg">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.technical_specs.map((spec, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-8 py-6 font-semibold text-gray-800 text-lg">{spec.property}</td>
                        <td className="px-8 py-6 text-[#2C5DB6] font-bold text-lg">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {product.features && product.features.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-12 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-500 mr-4" />
                Key Features
              </h2>
              <div className="space-y-6">
                {product.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                  >
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-6 flex-shrink-0" />
                    <span className="text-gray-700 font-semibold text-lg">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Application Details */}
      {product.application && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
              Application Details
            </h2>
            <div className="max-w-5xl mx-auto relative">
              <div className="absolute left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-[#2C5DB6] to-blue-300" />

              {Object.entries(product.application)
                .filter(([, value]) => value)
                .map(([key, value], index) => {
                  const label = key
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, char => char.toUpperCase());

                  return (
                    <motion.div
                      key={key}
                      className="relative flex items-start mb-16 last:mb-0"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }} 
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="absolute left-6 w-12 h-12 bg-[#2C5DB6] rounded-full flex items-center justify-center z-10 shadow-lg">
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      </div>

                      <div className="ml-24 bg-white rounded-2xl p-8 flex-1 shadow-lg border border-gray-100">
                        <div className="flex items-center flex-wrap gap-x-3 gap-y-2">
                          <span className="font-bold text-gray-800 text-lg">{label}:</span>
                          <span className="text-gray-700 leading-relaxed text-lg">{value}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {/* Drying Time */}
      {(
        product.dry_to_touch ||
        product.dry_to_handle ||
        product.complete_setting ||
        product.grouting_time ||
        product.adjustability_time ||
        product.dry_to_topcoat ||
        product.initial_setting ||
        product.fully_cured ||
        product.dry_to_sand ||
        product.drying_time_note
      ) && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 flex items-center justify-center">
                <Wrench className="w-8 h-8 text-blue-600 mr-4" />
                Drying Time
              </h2>
              <div className="bg-gray-50 rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {product.dry_to_touch && (
                    <div className="px-8 py-6">
                      <p className="text-gray-800 text-lg">
                        <span className="font-semibold">Dry to Touch:</span> {product.dry_to_touch}
                      </p>
                    </div>
                  )}
                  {product.dry_to_handle && (
                    <div className="px-8 py-6">
                      <p className="text-gray-800 text-lg">
                        <span className="font-semibold">Dry to Handle:</span> {product.dry_to_handle}
                      </p>
                    </div>
                  )}
                  {product.complete_setting && (
                    <div className="px-8 py-6">
                      <p className="text-gray-800 text-lg">
                        <span className="font-semibold">Complete Setting:</span> {product.complete_setting}
                      </p>
                    </div>
                  )}
                  {product.grouting_time && (
                    <div className="px-8 py-6">
                      <p className="text-gray-800 text-lg">
                        <span className="font-semibold">Grouting Time:</span> {product.grouting_time}
                      </p>
                    </div>
                  )}
                  {product.adjustability_time && (
                    <div className="px-8 py-6">
                      <p className="text-gray-800 text-lg">
                        <span className="font-semibold">Adjustability Time:</span> {product.adjustability_time}
                      </p>
                    </div>
                  )}
                  {product.dry_to_topcoat && (
                    <div className="px-8 py-6">
                      <p className="text-gray-800 text-lg">
                        <span className="font-semibold">Dry to Topcoat:</span> {product.dry_to_topcoat}
                      </p>
                    </div>
                  )}
                  {product.initial_setting && (
                    <div className="px-8 py-6">
                      <p className="text-gray-800 text-lg">
                        <span className="font-semibold">Initial Setting:</span> {product.initial_setting}
                      </p>
                    </div>
                  )}
                  {product.fully_cured && (
                    <div className="px-8 py-6">
                      <p className="text-gray-800 text-lg">
                        <span className="font-semibold">Fully Cured:</span> {product.fully_cured}
                      </p>
                    </div>
                  )}
                  {product.dry_to_sand && (
                    <div className="px-8 py-6">
                      <p className="text-gray-800 text-lg">
                        <span className="font-semibold">Dry to Sand:</span> {product.dry_to_sand}
                      </p>
                    </div>
                  )}
                  {product.drying_time_note && (
                    <div className="px-8 py-6">
                      <p className="text-gray-800 text-lg">
                        <span className="font-semibold">Note:</span> {product.drying_time_note}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Storage */}
      {product.storing_conditions && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-16 flex items-center justify-center">
              <Shield className="w-8 h-8 text-green-600 mr-4" />
              Storing Conditions
            </h2>
            <div
              className="max-w-5xl prose prose-xl mx-auto bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-10 shadow-lg"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.storing_conditions) }}
            />
          </div>
        </section>
      )}

      {/* Safety */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16 flex items-center justify-center">
            <Shield className="w-8 h-8 text-red-500 mr-4" />
            Safety Information
          </h2>
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
            {/* Precautions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="bg-red-500 px-8 py-6">
                <h3 className="text-2xl font-bold text-white">Safety Precautions</h3>
              </div>
              <div className="p-8">
                {product.safety_precautions && product.safety_precautions.length > 0 ? (
                  <div className="space-y-4">
                    {product.safety_precautions.map((precaution, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-5 flex-shrink-0" />
                        <p className="text-gray-700 text-lg">{precaution}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-lg">No safety precautions available.</p>
                )}
              </div>
            </motion.div>

            {/* First Aid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="bg-orange-500 px-8 py-6">
                <h3 className="text-2xl font-bold text-white">First Aid</h3>
              </div>
              <div className="p-8">
                {product.safety_first_aid && product.safety_first_aid.length > 0 ? (
                  <div className="space-y-4">
                    {product.safety_first_aid.map((aid, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 mr-5 flex-shrink-0" />
                        <p className="text-gray-700 text-lg">{aid}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-lg">No first aid information available.</p>
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