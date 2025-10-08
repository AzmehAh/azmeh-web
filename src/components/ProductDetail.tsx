import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Package, FileText, CheckCircle, Wrench, Shield, Info, Layers,Lightbulb} from "lucide-react";
import { supabase, api } from "../lib/supabase";
import DOMPurify from 'dompurify';
import { useTranslation } from "react-i18next";


type FilterValueMap = Record<string, Record<string, string>>;


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
  safety_note: string;
  safety_first_aid: string[];
  application?: {
    note_application?: string;
    method_of_application?: string;
    mixing_ratio?: string;
    mixing_note?: string;
    mixing_steps?: string;
    pot_life?: string;
    thinner?: string;
    cleaner?: string;
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
  { key: 'component_a', label: 'Component A', keyAr: 'component_a_ar' },
  { key: 'component_b', label: 'Component B', keyAr: 'component_b_ar' },
  { key: 'gloss', label: 'Gloss', keyAr: 'gloss_ar' },
  { key: 'color', label: 'Color', keyAr: 'color_ar' },
  { key: 'number_of_coats', label: 'Number of Coats', keyAr: 'number_of_coats_ar' },
  { key: 'tensile_adhesion_strength', label: 'Tensile Adhesion Strength', keyAr: 'tensile_adhesion_strength_ar' },
  { key: 'material_consumption', label: 'Material Consumption', keyAr: 'material_consumption_ar' },
  { key: 'viscosity', label: 'Viscosity', keyAr: 'viscosity_ar' },
  { key: 'weather_resistance', label: 'Weather Resistance', keyAr: 'weather_resistance_ar' },
  { key: 'compressive_strength', label: 'Compressive Strength', keyAr: 'compressive_strength_ar' },
  { key: 'tear_resistance', label: 'Tear Resistance', keyAr: 'tear_resistance_ar' },
  { key: 'elongation_at_rupture', label: 'Elongation at Rupture', keyAr: 'elongation_at_rupture_ar' },
  { key: 'tensile_strength_100', label: 'Tensile Strength at 100% Elongation', keyAr: 'tensile_strength_100_ar' },
  { key: 'tensile_strength_50', label: 'Tensile Strength at 50% Elongation', keyAr: 'tensile_strength_50_ar' },
  { key: 'specific_gravity_mixed', label: 'Specific Gravity (Mixed)', keyAr: 'specific_gravity_mixed_ar' },
  { key: 'solvent_resistance', label: 'Solvent Resistance', keyAr: 'solvent_resistance_ar' },
  { key: 'chemical_resistance', label: 'Chemical Resistance', keyAr: 'chemical_resistance_ar' },
  { key: 'abrasion_resistance', label: 'Abrasion Resistance', keyAr: 'abrasion_resistance_ar' },
  { key: 'friction_resistance', label: 'Friction Resistance', keyAr: 'friction_resistance_ar' },
  { key: 'washability', label: 'Washability', keyAr: 'washability_ar' },
  { key: 'water_resistance', label: 'Water Resistance', keyAr: 'water_resistance_ar' },
  { key: 'theoretical_spreading_rate', label: 'Theoretical Spreading Rate', keyAr: 'theoretical_spreading_rate_ar' },
  { key: 'recommended_film_thickness', label: 'Recommended Film Thickness', keyAr: 'recommended_film_thickness_ar' },
  { key: 'temperature_resistance', label: 'Temperature Resistance', keyAr: 'temperature_resistance_ar' },
  { key: 'solvent_splash_resistance', label: 'Solvent Splash Resistance', keyAr: 'solvent_splash_resistance_ar' },
  { key: 'sandability', label: 'Sandability', keyAr: 'sandability_ar' },
  { key: 'adhesion', label: 'Adhesion', keyAr: 'adhesion_ar' },
  { key: 'flexibility', label: 'Flexibility', keyAr: 'flexibility_ar' },
  { key: 'voc', label: 'VOC', keyAr: 'voc_ar' },
  { key: 'volume_solids', label: 'Volume Solids', keyAr: 'volume_solids_ar' },
  { key: 'note', label: 'Note', keyAr: 'note_ar' },
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
  const { t, i18n } = useTranslation();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  

  const [filterValueMap, setFilterValueMap] = useState<FilterValueMap>({});
  const [filtersLoading, setFiltersLoading] = useState(true);


  const translateFilterValue = (
    category: string,
    value: string,
    map: FilterValueMap
  ): string => {
    if (!map[category]) return value;
    return map[category][value] || value;
  };


  const fetchFilterTranslations = async () => {
    try {
      const data = await api.getProductFilterTypes();
      const map: FilterValueMap = {};
      data?.forEach(filterType => {
        const key = filterType.name.toLowerCase();
        map[key] = {};
        filterType.product_filter_values
          .filter(v => v.is_active)
          .forEach(value => {
            const displayValue = i18n.language === 'ar' && value.value_ar ? value.value_ar : value.value;
            map[key][value.value] = displayValue;
          });
      });
      setFilterValueMap(map);
    } catch (error) {
      console.error('Error fetching filter translations:', error);
    } finally {
      setFiltersLoading(false);
    }
  };

  const getLocalizedField = (enValue: any, arValue: any) => {
    if (i18n.language === 'ar') {
      return arValue || enValue;
    }
    return enValue;
  };

  const parseArrayField = (field: any): any[] => {
    if (Array.isArray(field)) return field;
    if (typeof field === 'string') {
      try {
        const parsed = JSON.parse(field);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        if (field.includes(',')) {
          return field.split(',').map((item: string) => item.trim()).filter(Boolean);
        }
        return field ? [field] : [];
      }
    }
    return [];
  };

  const createApplicationObject = (productData: any) => {
    const appFields = [
      'method_of_application', 'mixing_ratio', 'mixing_note', 'mixing_steps',
      'pot_life', 'cleaner', 'thinner', 'note_application',
      'application_temperature', 'curing_note',
      'dry_to_touch', 'dry_to_handle', 'complete_setting',
      'grouting_time', 'adjustability_time', 'dry_to_topcoat',
      'initial_setting', 'fully_cured', 'dry_to_sand', 'drying_time_note'
    ];

    const application: any = {};
    let hasData = false;

    appFields.forEach(field => {
      const value = getLocalizedField(productData[field], productData[`${field}_ar`]);
      if (value) {
        application[field] = value;
        hasData = true;
      }
    });

    return hasData ? application : undefined;
  };

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      setError(null);

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

      let imagesData = [];
      try {
        const { data: images } = await supabase
          .from('product_images')
          .select('*')
          .eq('product_id', productId)
          .order('is_main', { ascending: false })
          .order('sort_order', { ascending: true });
        imagesData = images || [];
      } catch (e) {
        console.error('Error fetching images:', e);
      }

      let mainImage = null;
      try {
        mainImage = await api.getMainProductImage(productId);
      } catch (e) {
        console.error('Error fetching main image:', e);
      }

      const formattedProduct: Product = {
        id: productData.id,
        name: getLocalizedField(productData.name, productData.name_ar) || 'No Name',
        code: productData.code || 'No Code',
        description: getLocalizedField(productData.description, productData.description_ar) || '',
        technical_description: getLocalizedField(productData.technical_description, productData.technical_description_ar) || "",
        image_url: mainImage?.image_url || 
                   (imagesData.length > 0 ? imagesData[0].image_url : "") ||
                   productData.image_url || 
                   "/images/placeholder.jpg",
        images: imagesData.map(img => img.image_url).filter(Boolean),
        type: productData.type || "",
        brand: productData.brand || "",
        material: productData.material || "",
        usage: productData.usage || "",
        packaging: parseArrayField(getLocalizedField(productData.packaging, productData.packaging_ar)),
        technical_specs: TECHNICAL_FIELDS
          .map(({ key, keyAr }) => {
            const value = getLocalizedField(productData[key], productData[keyAr]);
            return { key, value: value || '', standard: '' }; 
          })
          .filter(spec => spec.value.trim() !== ''),
        features: parseArrayField(getLocalizedField(productData.features, productData.features_ar)),
        applications: parseArrayField(getLocalizedField(productData.applications, productData.applications_ar)),
        instructions: parseArrayField(getLocalizedField(productData.instructions, productData.instructions_ar)),
        storage: getLocalizedField(productData.storage, productData.storage_ar) || "",
        safety_precautions: parseArrayField(getLocalizedField(productData.safety_precautions, productData.safety_precautions_ar)),
        safety_note: getLocalizedField(productData.safety_note, productData.safety_note_ar) || "",
        safety_first_aid: parseArrayField(getLocalizedField(productData.safety_first_aid, productData.safety_first_aid_ar)),
        application: createApplicationObject(productData),
        joint_preparation: getLocalizedField(productData.joint_preparation, productData.joint_preparation_ar) || '',
        joint_size: getLocalizedField(productData.joint_size, productData.joint_size_ar) || '',
        movement_capacity: getLocalizedField(productData.movement_capacity, productData.movement_capacity_ar) || '',
        substrate_treatment: getLocalizedField(productData.substrate_treatment, productData.substrate_treatment_ar) || '',
        surface_preparation: getLocalizedField(productData.surface_preparation, productData.surface_preparation_ar) || '',
        recommended_uses: parseArrayField(getLocalizedField(productData.recommended_uses, productData.recommended_uses_ar)),
        storing_conditions: getLocalizedField(productData.storing_conditions, productData.storing_conditions_ar) || '',
        dry_to_touch: getLocalizedField(productData.dry_to_touch, productData.dry_to_touch_ar) || '',
        dry_to_handle: getLocalizedField(productData.dry_to_handle, productData.dry_to_handle_ar) || '',
        complete_setting: getLocalizedField(productData.complete_setting, productData.complete_setting_ar) || '',
        grouting_time: getLocalizedField(productData.grouting_time, productData.grouting_time_ar) || '',
        adjustability_time: getLocalizedField(productData.adjustability_time, productData.adjustability_time_ar) || '',
        dry_to_topcoat: getLocalizedField(productData.dry_to_topcoat, productData.dry_to_topcoat_ar) || '',
        initial_setting: getLocalizedField(productData.initial_setting, productData.initial_setting_ar) || '',
        fully_cured: getLocalizedField(productData.fully_cured, productData.fully_cured_ar) || '',
        dry_to_sand: getLocalizedField(productData.dry_to_sand, productData.dry_to_sand_ar) || '',
        drying_time_note: getLocalizedField(productData.drying_time_note, productData.drying_time_note_ar) || ''
      };

      setProduct(formattedProduct);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError(t('error_loading_product'));
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilterTranslations();
  }, [i18n.language]);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id, i18n.language]);

  useEffect(() => {
    if (product && product.images && product.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [product]);

  const handleDownloadDatasheet = () => {
    alert(t('download_datasheet') + " قريباً");
  };

  const brandLogo = product && brands.find((b) =>
    product.brand ? product.brand.toLowerCase().includes(b.name.toLowerCase()) : false
  )?.logo;

  if (loading || filtersLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0055A3]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('error_loading_product')}</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/products"
            className="bg-[#2C5DB6] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('back_to_products')}
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('product_not_found')}</h1>
          <p className="text-gray-600 mb-8">{t('product_not_found_desc')}</p>
          <Link
            to="/products"
            className="bg-[#2C5DB6] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('back_to_products')}
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
          <div className="relative mb-8">
            <div className="flex items-center text-sm text-white">
              <Link to="/" className="hover:text-[#0055A3] transition-colors">{t('products.home')}</Link>
              <span className="mx-2">/</span>
              <Link to="/products" className="hover:text-[#0055A3] transition-colors">{t('products.title')}</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{product.name}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">{product.name}</h1>
              <p className="text-xl text-blue-100 mb-4 leading-relaxed">{product.description}</p>

              <div className="flex flex-wrap gap-4 mb-8">
                {product.type && (
                  <span className="px-4 py-2 bg-white/20 rounded-full text-white font-medium">
                    {translateFilterValue('type', product.type, filterValueMap)}
                  </span>
                )}
                {product.material && (
                  <span className="px-4 py-2 bg-white/20 rounded-full text-white font-medium">
                    {translateFilterValue('material', product.material, filterValueMap)}
                  </span>
                )}
                {product.usage && (
                  <span className="px-4 py-2 bg-white/20 rounded-full text-white font-medium">
                    {translateFilterValue('usage', product.usage, filterValueMap)}
                  </span>
                )}
              </div>
  
             {product.recommended_uses && (
  <>
    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
      <Lightbulb className="w-5 h-5 text-white mr-2" />
      {t('products.recommended_uses')}
    </h3>
    <p className="text-blue-100/90 mb-6 leading-relaxed">
      {product.recommended_uses}
    </p>
  </>
)}
     
              {product.packaging && product.packaging.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Package className="w-5 h-5 text-white mr-2" />
                    {t('products.packaging_sizes')}
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {product.packaging.map((pack, index) => (
                      <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center w-28">
                        <h4 className="text-sm font-bold text-white">{pack.size}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleDownloadDatasheet}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center"
              >
                <Download className="w-6 h-6 mr-3" />
                {t('products.download_datasheet')}
              </button>
            </div>
 <div className="relative">
  {product.images && product.images.length > 0 ? (
    <>
      {/* حاوية متحركة واحدة تحتوي الصورة + اللوغو */}
      <motion.div
        key={currentImageIndex} // مهم لتكرار التأثير عند التغيير
        className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* الصورة */}
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.src = "/images/placeholder.jpg"; }}
        />

        {/* Brand Logo - Top Right */}
        {brandLogo && (
          <div className="absolute top-0 right-10 flex items-center justify-center">
            <div className="bg-white rounded-t-none rounded-b-md p-4 shadow-md">
              <img
                src={brandLogo}
                alt=""
                className="w-16 h-16 object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Indicators (dots) - خارج الحركة لأنها ثابتة */}
      {product.images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
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
 {/* Placeholder */}
    <div className="w-full h-80 lg:h-96 bg-gray-200 rounded-2xl flex items-center justify-center relative">
      {brandLogo && (
        <div className="absolute top-0 right-10 flex items-center justify-center">
          <div className="bg-white rounded-t-none rounded-b-md p-4 shadow-md">
            <img
              src={brandLogo}
              alt=""
              className="w-16 h-16 object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        </div>
      )}
      <p className="text-gray-500">No images available</p>
    </div>
  )}
</div>
          
          </div>
        </div>
      </section>

         {/* Features */}
      {product.features && product.features.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                {t('products.key_features')}
              </h2>
              <div className="space-y-4">
                {product.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center bg-white p-4 rounded-xl shadow-sm"
                  >
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-4 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
{/* Application Instructions */}
{product.application && (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center">
          <Layers className="w-8 h-8 text-green-600 mr-3" />
          {t('products.application_instructions')}
        </h2>
        <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {product.application.method_of_application && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.method_of_application')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.application.method_of_application}</span>
                </div>
              </div>
            )}
            {product.application.mixing_ratio && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.mixing_ratio')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.application.mixing_ratio}</span>
                </div>
              </div>
            )}
            {product.application.mixing_note && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.mixing_note')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.application.mixing_note}</span>
                </div>
              </div>
            )}
            {product.application.mixing_steps && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.mixing_steps')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.application.mixing_steps}</span>
                </div>
              </div>
            )}
            {product.application.cleaner && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.cleaner')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.application.cleaner}</span>
                </div>
              </div>
            )}
            {product.application.thinner && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.thinner')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.application.thinner}</span>
                </div>
              </div>
            )}
            {product.application.application_temperature && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.application_temperature')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.application.application_temperature}</span>
                </div>
              </div>
            )}
            {product.application.curing_note && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.curing_note')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.application.curing_note}</span>
                </div>
              </div>
            )}
            {product.application.note_application && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.note_application')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.application.note_application}</span>
                </div>
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-[#2C5DB6] px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    {t('products.technical_specifications')}
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody>
                      {product.technical_specs.map((spec, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="px-4 py-3 font-bold text-gray-800">{t(`products.${spec.key}`)}</td>
                          <td className="px-4 py-3 text-[#2C5DB6] font-medium">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
{/* Surface Preparation */}
{product.surface_preparation && (
  <section className="py-16 bg-white">
    <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center">
        <Shield className="w-8 h-8 text-green-600 mr-3" />
        {t('products.surface_preparation')}
      </h2>
      <div className="max-w-6xl mx-auto bg-gray-50 rounded-2xl p-8">
        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
          {product.surface_preparation}
        </p>
      </div>
    </div>
  </section>

      )}
      
    
{/* General Information */}
{(
  product.joint_preparation ||
  product.joint_size ||
  product.movement_capacity ||
  product.substrate_treatment ||
  product.surface_preparation ||
  (product.recommended_uses && product.recommended_uses.length > 0)
) && (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center">
          <Info className="w-8 h-8 text-green-600 mr-3" />
          {t('products.general_information')}
        </h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {product.joint_preparation && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.joint_preparation')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.joint_preparation}</span>
                </div>
              </div>
            )}
            {product.joint_size && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.joint_size')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.joint_size}</span>
                </div>
              </div>
            )}
            {product.movement_capacity && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.movement_capacity')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.movement_capacity}</span>
                </div>
              </div>
            )}
            {product.substrate_treatment && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.substrate_treatment')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.substrate_treatment}</span>
                </div>
              </div>
            )}
            {product.surface_preparation && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.surface_preparation')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.surface_preparation}</span>
                </div>
              </div>
            )}
            {product.recommended_uses && product.recommended_uses.length > 0 && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.recommended_uses')}:</span>
                  <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                    {product.recommended_uses.map((use, index) => (
                      <li key={index}>{use}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
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
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center">
          <Wrench className="w-8 h-8 text-blue-600 mr-3" />
          {t('products.drying_time')}
        </h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {product.dry_to_touch && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.dry_to_touch')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.dry_to_touch}</span>
                </div>
              </div>
            )}
            {product.dry_to_handle && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.dry_to_handle')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.dry_to_handle}</span>
                </div>
              </div>
            )}
            {product.complete_setting && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.complete_setting')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.complete_setting}</span>
                </div>
              </div>
            )}
            {product.grouting_time && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.grouting_time')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.grouting_time}</span>
                </div>
              </div>
            )}
            {product.adjustability_time && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.adjustability_time')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.adjustability_time}</span>
                </div>
              </div>
            )}
            {product.dry_to_topcoat && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.dry_to_topcoat')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.dry_to_topcoat}</span>
                </div>
              </div>
            )}
            {product.initial_setting && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.initial_setting')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.initial_setting}</span>
                </div>
              </div>
            )}
            {product.fully_cured && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.fully_cured')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.fully_cured}</span>
                </div>
              </div>
            )}
            {product.dry_to_sand && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.dry_to_sand')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.dry_to_sand}</span>
                </div>
              </div>
            )}
            {product.drying_time_note && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                  <span className="font-bold text-gray-800">{t('products.drying_time_note')}:</span>
                  <span className="text-gray-700 leading-relaxed">{product.drying_time_note}</span>
                </div>
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
        <section className="py-16 bg-white">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-green-600 mr-3" />
              {t('products.storing_conditions')}
            </h2>
            <div
              className="max-w-4xl prose prose-lg mx-auto bg-gray-50 rounded-2xl p-8"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.storing_conditions) }}
            />
          </div>
        </section>
      )}

      {/* Safety Note */}
      {product.safety_note && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-6xl mx-auto">
              <div className=" rounded-2xl p-8">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                 {product.safety_note}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;