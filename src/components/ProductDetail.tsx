import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Download, Package, Lightbulb
} from "lucide-react";
import { supabase, api } from "../lib/supabase";
import DOMPurify from 'dompurify';
import { useTranslation } from "react-i18next";
import html2pdf from 'html2pdf.js';

type FilterValueMap = Record<string, Record<string, string>>;

interface Product {
  id: string;
  name: string;
  name_ar?: string;
  code: string;
  description: string;
  description_ar?: string;
  technical_description: string;
  technical_description_ar?: string;
  image_url: string;
  images: string[];
  type: string;
  brand: string; // now will contain localized brand name (not id) for easy display
  material: string[]; // ids (kept) but translations available in filterValueMap
  usage: string[];    // ids
  packaging: string[];
  technical_specs: { key: string; value: string; standard: string }[];
  features: string[];
  applications: string[];
  instructions: string[];
  storage: string;
  safety_precautions: string[];
  safety_note: string;
  safety_note_ar?: string;
  safety_first_aid: string[];
  application?: Record<string, any>;
  joint_preparation?: string;
  joint_size?: string;
  movement_capacity?: string;
  substrate_treatment?: string;
  surface_preparation?: string;
  recommended_uses?: string[];
  storing_conditions?: string;
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
  { key: 'specific_gravity', label: 'Specific Gravity ', keyAr: 'specific_gravity_ar' },
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

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [filterValueMap, setFilterValueMap] = useState<FilterValueMap>({});
  const [filtersLoading, setFiltersLoading] = useState(true);
  const isRTL = i18n.language === 'ar';

  const translateFilterValue = (
    category: string,
    value: string,
    map: FilterValueMap
  ): string => {
    if (!value) return '';
    if (!map[category]) return value;
    return map[category][value] || value;
  };

  // fetch translations for all filter types via API (original)
  const fetchFilterTranslations = async (): Promise<FilterValueMap> => {
    try {
      const data = await api.getProductFilterTypes();
      const map: FilterValueMap = {};
      data?.forEach((filterType: any) => {
        const categoryKey = filterType.name;
        map[categoryKey] = {};
        (filterType.product_filter_values || [])
          .filter((v: any) => v.is_active)
          .forEach((value: any) => {
            const displayValue = i18n.language === 'ar' && value.value_ar ? value.value_ar : value.value;
            map[categoryKey][value.id] = displayValue;
          });
      });
      setFilterValueMap(prev => ({ ...prev, ...map }));
      return map;
    } catch (err) {
      console.error('Error fetching filter translations:', err);
      return {};
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
      let cleanField = field.trim();
      if (cleanField.startsWith('[') && cleanField.endsWith(']')) {
        try {
          const parsed = JSON.parse(cleanField);
          if (Array.isArray(parsed)) {
            return parsed.map(item => typeof item === 'string' ? item.trim() : item).filter(Boolean);
          }
        } catch (e: any) {
          console.warn('Failed to parse as JSON array:', e.message);
        }
      }
      if (cleanField.includes(',')) {
        return cleanField.split(',')
          .map((item: string) => item.trim())
          .filter((item: string) => item.length > 0);
      }
      return cleanField ? [cleanField] : [];
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

  // fetch product + associated small lookups (brand name, material/usage names)
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

      // images
      let imagesData: any[] = [];
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

      let mainImage: any = null;
      try {
        mainImage = await api.getMainProductImage(productId);
      } catch (e) {
        console.error('Error fetching main image:', e);
      }

      // convert ids to arrays (if stored as single id)
      const materialArray = Array.isArray(productData.material_id)
        ? productData.material_id
        : productData.material_id
          ? [productData.material_id]
          : [];

      const usageArray = Array.isArray(productData.usage_id)
        ? productData.usage_id
        : productData.usage_id
          ? [productData.usage_id]
          : [];

      // Fetch brand name if brand_id exists
      let brandNameLocalized = productData.brand_id || '';
      if (productData.brand_id) {
        try {
          const { data: brandRow } = await supabase
            .from('brands')
            .select('id, name, name_ar, logo')
            .eq('id', productData.brand_id)
            .maybeSingle();
          if (brandRow) {
            brandNameLocalized = i18n.language === 'ar' ? (brandRow.name_ar || brandRow.name) : (brandRow.name || '');
            // optionally you can store brandRow.logo somewhere or use local brands array to match logo
          }
        } catch (e) {
          console.error('Error fetching brand:', e);
        }
      }

      // Fetch product_filter_values for material & usage ids to ensure we have translations locally
      const combinedIds = Array.from(new Set([...materialArray, ...usageArray].filter(Boolean)));
      const localMap: FilterValueMap = {};
      if (combinedIds.length > 0) {
        try {
          // fetch rows where id IN combinedIds
          const { data: valuesRows, error: valsErr } = await supabase
            .from('product_filter_values')
            .select('id, value, value_ar, product_filter_type_id')
            .in('id', combinedIds as any[]);
          if (!valsErr && valuesRows) {
            // We don't know exact filter type names here; to be safe, add entries under
            // 'Material Type' and 'Application Fields' keys (used by UI)
            localMap['Material Type'] = localMap['Material Type'] || {};
            localMap['Application Fields'] = localMap['Application Fields'] || {};

            valuesRows.forEach((r: any) => {
              const display = i18n.language === 'ar' && r.value_ar ? r.value_ar : r.value;
              // decide whether this id belongs to material or usage based on original arrays
              if (materialArray.includes(r.id)) {
                localMap['Material Type'][r.id] = display;
              }
              if (usageArray.includes(r.id)) {
                localMap['Application Fields'][r.id] = display;
              }
            });
            // merge into global filterValueMap so translateFilterValue can use them
            setFilterValueMap(prev => ({ ...prev, ...localMap }));
          }
        } catch (e) {
          console.error('Error fetching filter values for material/usage:', e);
        }
      }

      const formattedProduct: Product = {
        id: productData.id,
        name: getLocalizedField(productData.name, productData.name_ar) || 'No Name',
        name_ar: productData.name_ar,
        code: productData.code || 'No Code',
        description: getLocalizedField(productData.description, productData.description_ar) || '',
        description_ar: productData.description_ar,
        technical_description: getLocalizedField(productData.technical_description, productData.technical_description_ar) || "",
        technical_description_ar: productData.technical_description_ar,
        image_url: mainImage?.image_url ||
                   (imagesData.length > 0 ? imagesData[0].image_url : "") ||
                   productData.image_url ||
                   "/images/placeholder.jpg",
        images: imagesData.map(img => img.image_url).filter(Boolean),
        type: productData.type_id || "",
        brand: brandNameLocalized || (productData.brand_id || ""),
        material: materialArray,
        usage: usageArray,
        packaging: parseArrayField(getLocalizedField(productData.packaging, productData.packaging_ar)),
        technical_specs: TECHNICAL_FIELDS
          .map(({ key, keyAr }) => {
            const value = getLocalizedField(productData[key], productData[keyAr]);
            return { key, value: value || '', standard: '' };
          })
          .filter(spec => (spec.value || '').toString().trim() !== ''),
        features: parseArrayField(getLocalizedField(productData.features, productData.features_ar)),
        applications: parseArrayField(getLocalizedField(productData.applications, productData.applications_ar)),
        instructions: parseArrayField(getLocalizedField(productData.instructions, productData.instructions_ar)),
        storage: getLocalizedField(productData.storage, productData.storage_ar) || "",
        safety_precautions: parseArrayField(getLocalizedField(productData.safety_precautions, productData.safety_precautions_ar)),
        safety_note: getLocalizedField(productData.safety_note, productData.safety_note_ar) || "",
        safety_note_ar: productData.safety_note_ar,
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

  const getSafetyNoteFallback = (): string => {
    return i18n.language === 'ar'
      ? 'كافة المعلومات الواردة في نشرتنا هذه وفي جميع نشراتنا الفنية هي نتيجة لتجارب مخبرية وخبرات عملية وتبقى النتائج النهائية متوقفة على مهارة المستهلك ومدى التزامه بالتعليمات، وتنحصر مسؤوليتنا بتقديم منتجات مطابقة للمساطر والعينات المقدمة من قبلنا كما تحتفظ الشركة بحق تغيير المواصفات بدون إعلام مسبق.'
      : 'Information in this data sheet and in all our data sheets are given to the best of our knowledge based on laboratory testing and practical experience. Final results depend on following instructions and on consumer skill. Our responsibility is limited to providing products that conform to samples and specimens provided by us. Due to technical needs, we reserve the right to change any given specification without notice.';
  };

  // Ensure we load filter translations first, then product (to avoid race conditions)
  useEffect(() => {
    const load = async () => {
      setFiltersLoading(true);
      await fetchFilterTranslations();
      if (id) {
        await fetchProduct(id);
      } else {
        setLoading(false);
        setFiltersLoading(false);
      }
    };
    load();
    // re-run when language or id changes
  }, [id, i18n.language]);

  useEffect(() => {
    if (product && product.images && product.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [product]);

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
            className="bg-logo text-white px-6 py-3 rounded-lg hover:bg-logo transition-colors"
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
            className="bg-logo text-white px-6 py-3 rounded-lg hover:bg-logo transition-colors"
          >
            {t('back_to_products')}
          </Link>
        </div>
      </div>
    );
  }

  // display translated values using filterValueMap (which now contains entries for Material Type & Application Fields)
  const displayType = product.type ? translateFilterValue('Type', product.type, filterValueMap) : '';
  const displayMaterial = product.material && product.material.length
    ? product.material.map(id => translateFilterValue('Material Type', id, filterValueMap)).join(', ')
    : '';
  const displayUsage = product.usage && product.usage.length
    ? product.usage.map(id => translateFilterValue('Application Fields', id, filterValueMap)).join(', ')
    : '';

  const displayedSafetyNote = product.safety_note || getSafetyNoteFallback();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-24 bg-logo text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-8">
            <div className="flex items-center text-sm text-white">
              <Link to="/" className=" transition-colors">{t('products.home')}</Link>
              <span className="mx-2">/</span>
              <Link to="/products" className=" transition-colors">{t('products.title')}</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{product.name}</span>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">{product.name}</h1>
              <p className="text-xl text-white mb-4 leading-relaxed">{product.description}</p>
              <div className="flex flex-wrap gap-4 mb-8">
                {displayType && (
                  <span className="px-4 py-2 bg-white/20 rounded-full text-white font-medium">
                    {displayType}
                  </span>
                )}
                {displayMaterial && (
                  <span className="px-4 py-2 bg-white/20 rounded-full text-white font-medium">
                    {displayMaterial}
                  </span>
                )}
                {displayUsage && (
                  <span className="px-4 py-2 bg-white/20 rounded-full text-white font-medium">
                    {displayUsage}
                  </span>
                )}
              </div>

              {product.recommended_uses?.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Lightbulb className="w-5 h-5 text-white mr-2" />
                    {t('products.recommended_uses')}
                  </h3>
                  <p className="text-white mb-6 leading-relaxed">
                    {product.recommended_uses.join(', ')}
                  </p>
                </>
              )}
              {product.packaging?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Package className="w-5 h-5 text-white mr-2" />
                    {t('products.packaging_sizes')}
                  </h3>
                  <div className="flex flex-wrap gap-4 items-start">
                    {product.packaging.map((pack, index) => (
                      <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center w-28">
                        <h4 className="text-sm font-bold text-white">{pack}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={() => { /* handleDownloadPDF (not copied here for brevity) */ }}
                className="bg-white/20 text-white px-8 py-4 rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center"
              >
                <Download className="w-6 h-6 mr-3" />
                {t('products.download_datasheet')}
              </button>
            </div>
            <div className="relative">
              {product.images?.length > 0 ? (
                <>
                  <motion.div
                    key={currentImageIndex}
                    className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                  >
                    <img
                      src={product.images[currentImageIndex]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = "/images/placeholder.jpg"; }}
                    />
                    {/* brand logo from local list if matches brand name */}
                    {product.brand && brands.find(b => product.brand.toLowerCase().includes(b.name.toLowerCase()))?.logo && (
                      <div className={`absolute top-0 flex items-center justify-center ${isRTL ? "left-10" : "right-10"}`}>
                        <div className="bg-white rounded-t-none rounded-b-md p-4 shadow-md">
                          <img
                            src={brands.find(b => product.brand.toLowerCase().includes(b.name.toLowerCase()))!.logo}
                            alt=""
                            className="w-16 h-16 object-contain"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                  {product.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? "bg-white shadow-lg" : "bg-white/50 hover:bg-white/70"}`}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-80 lg:h-96 bg-gray-200 rounded-2xl flex items-center justify-center relative">
                  {product.brand && brands.find(b => product.brand.toLowerCase().includes(b.name.toLowerCase()))?.logo && (
                    <div className={`absolute top-0 flex items-center justify-center ${isRTL ? "left-10" : "right-10"}`}>
                      <div className="bg-white rounded-t-none rounded-b-md p-4 shadow-md">
                        <img
                          src={brands.find(b => product.brand.toLowerCase().includes(b.name.toLowerCase()))!.logo}
                          alt=""
                          className="w-16 h-16 object-contain"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      </div>
                    </div>
                  )}
                  <p className="text-gray-500">{t('products.image')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>



      {/* Features */}
      {product.features?.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-logo mr-3" />
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
                    <div className="w-3 h-3 bg-logo rounded-full mr-4 flex-shrink-0" />
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
                <Layers className="w-8 h-8 text-logo mr-3" />
                {t('products.application_instructions')}
              </h2>
              <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {Object.entries(product.application).map(([key, value]) => {
                    if (!value) return null;
                    return (
                      <div key={key} className="px-6 py-4">
                        <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[200px_1fr] md:gap-x-6 items-start">
                          <span className="font-bold text-gray-800">{t(`products.${key}`)}:</span>
                          <span className="text-gray-700 leading-relaxed">{value}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Technical Specifications */}
      {product.technical_specs?.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center">
              <FileText className="w-5 h-5 mr-2 text-logo" />
              {t('products.technical_specifications')}
            </h2>
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-logo px-6 py-4"></div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody>
                      {product.technical_specs.map((spec, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="px-4 py-3 font-bold text-gray-800">{t(`products.${spec.key}`)}</td>
                          <td className="px-4 py-3 text-gray-700 font-medium">{spec.value}</td>
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
              <Brush className="w-8 h-8 text-logo mr-3" />
              {t('products.surface_preparation')}
            </h2>
            <div className="max-w-6xl mx-auto bg-gray-50 rounded-2xl p-8">
              <p className="text-gray-700 text-lg">
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
        product.substrate_treatment
      ) && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center">
                <Info className="w-8 h-8 text-logo mr-3" />
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center">
                <Wrench className="w-8 h-8 text-logo mr-3" />
                {t('products.drying_time')}
              </h2>
              <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
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
              <Shield className="w-8 h-8 text-logo mr-3" />
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-logo mr-3" />
              {t('products.safety_note')}
            </h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-8">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {displayedSafetyNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;