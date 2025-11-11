import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Package, FileText, CheckCircle, Wrench, Shield, Info, Layers, Lightbulb, Brush } from "lucide-react";
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
  brand: string;
  material: string;
  usage: string;
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

const ProductDetail = () => {
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
    if (!map[category]) return value;
    return map[category][value] || value;
  };

  const fetchFilterTranslations = async () => {
    try {
      const data = await api.getProductFilterTypes();
      const map: FilterValueMap = {};
      data?.forEach(filterType => {
        const categoryKey = filterType.name;
        map[categoryKey] = {};
        filterType.product_filter_values
          .filter(v => v.is_active)
          .forEach(value => {
            const displayValue = i18n.language === 'ar' && value.value_ar ? value.value_ar : value.value;
            map[categoryKey][value.id] = displayValue;
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
      let cleanField = field.trim();
      if (cleanField.startsWith('[') && cleanField.endsWith(']')) {
        try {
          const parsed = JSON.parse(cleanField);
          if (Array.isArray(parsed)) {
            return parsed.map(item => typeof item === 'string' ? item.trim() : item).filter(Boolean);
          }
        } catch (e) {
          console.warn('Failed to parse as JSON array:', e.message);
        }
      }
      if (cleanField.includes(',')) {
        return cleanField.split(',')
          .map(item => item.trim())
          .filter(item => item.length > 0);
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
        brand: productData.brand_id || "",
        material: productData.material_id || "",
        usage: productData.usage_id || "",
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

  // 🔽 دالة تنزيل PDF كاملة - مصححة
  const handleDownloadPDF = () => {
    if (!product) return;

    const isRTL = i18n.language === 'ar';

    const getTranslated = (enVal: string, arVal?: string) => 
      isRTL ? (arVal || enVal) : enVal;

    const name = getTranslated(product.name, product.name_ar);
    const description = getTranslated(product.description, product.description_ar);
    const technicalDescription = getTranslated(product.technical_description, product.technical_description_ar);

    const printElement = document.createElement('div');
    printElement.dir = isRTL ? 'rtl' : 'ltr';
    printElement.style.fontFamily = isRTL ? "'Tajawal', system-ui, sans-serif" : "system-ui, sans-serif";
    printElement.style.padding = '20mm';
    printElement.style.lineHeight = '1.6';
    printElement.style.color = '#000';
    printElement.style.fontSize = '14px';
    printElement.style.maxWidth = '210mm';
    
    // منع تقطيع النص بين الصفحات
    printElement.style.pageBreakInside = 'avoid';
    printElement.style.breakInside = 'avoid';
    printElement.style.pageBreakBefore = 'auto';
    printElement.style.pageBreakAfter = 'auto';

    // العنوان والصورة
    const header = document.createElement('div');
    header.style.textAlign = isRTL ? 'right' : 'left';
    header.style.marginBottom = '20px';
    header.style.pageBreakInside = 'avoid';
    header.style.breakInside = 'avoid';

    if (product.image_url) {
      const img = document.createElement('img');
      img.src = product.image_url;
      img.alt = name;
      img.style.width = '100px';
      img.style.height = '100px';
      img.style.objectFit = 'contain';
      img.style.marginBottom = '15px';
      header.appendChild(img);
    }

    const title = document.createElement('h1');
    title.textContent = name;
    title.style.fontSize = '24px';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '10px';
    header.appendChild(title);

    const desc = document.createElement('p');
    desc.textContent = description;
    desc.style.marginBottom = '20px';
    desc.style.fontSize = '16px';
    header.appendChild(desc);

    printElement.appendChild(header);

    // دالة إضافة قسم - مصححة لمنع التقاطع
    const addSection = (titleText: string, content: string | string[] | null, asList = false) => {
      if (!content) return;
      const isEmptyArray = Array.isArray(content) && content.length === 0;
      if (isEmptyArray) return;

      const section = document.createElement('div');
      section.style.marginBottom = '20px';
      section.style.pageBreakInside = 'avoid';
      section.style.breakInside = 'avoid';

      const secTitle = document.createElement('h2');
      secTitle.textContent = titleText;
      secTitle.style.fontSize = '18px';
      secTitle.style.fontWeight = 'bold';
      secTitle.style.marginBottom = '10px';
      secTitle.style.color = '#0055A3';
      section.appendChild(secTitle);

      if (asList && Array.isArray(content)) {
        const list = document.createElement('ul');
        list.style.paddingInlineStart = '20px';
        list.style.pageBreakInside = 'avoid';
        list.style.breakInside = 'avoid';
        content.forEach(item => {
          if (!item) return;
          const li = document.createElement('li');
          li.textContent = item;
          li.style.marginBottom = '5px';
          li.style.pageBreakInside = 'avoid';
          li.style.breakInside = 'avoid';
          list.appendChild(li);
        });
        section.appendChild(list);
      } else {
        const text = document.createElement('div');
        text.innerHTML = typeof content === 'string' 
          ? DOMPurify.sanitize(content) 
          : (Array.isArray(content) ? content.join(', ') : '');
        text.style.pageBreakInside = 'avoid';
        text.style.breakInside = 'avoid';
        section.appendChild(text);
      }

      printElement.appendChild(section);
    };

    // التصنيفات
    const type = product.type ? translateFilterValue('Type', product.type, filterValueMap) : '';
    const material = product.material ? translateFilterValue('Material Type', product.material, filterValueMap) : '';
    const usage = product.usage ? translateFilterValue('Application Fields', product.usage, filterValueMap) : '';
    if (type || material || usage) {
      const cats = [type, material, usage].filter(Boolean).join(' • ');
      const catDiv = document.createElement('div');
      catDiv.textContent = cats;
      catDiv.style.backgroundColor = '#eef5ff';
      catDiv.style.padding = '8px 12px';
      catDiv.style.borderRadius = '6px';
      catDiv.style.marginBottom = '20px';
      catDiv.style.pageBreakInside = 'avoid';
      catDiv.style.breakInside = 'avoid';
      printElement.appendChild(catDiv);
    }

    addSection(t('products.technical_description'), technicalDescription);
    addSection(t('products.packaging_sizes'), product.packaging);
    
    if (product.recommended_uses && product.recommended_uses.length > 0) {
      addSection(t('products.recommended_uses'), product.recommended_uses.join(', '));
    } 
    
    addSection(t('products.key_features'), product.features, true);

    // قسم التطبيق
    if (product.application) {
      const appSection = document.createElement('div');
      appSection.style.marginBottom = '20px';
      appSection.style.pageBreakInside = 'avoid';
      appSection.style.breakInside = 'avoid';
      
      const appTitle = document.createElement('h2');
      appTitle.textContent = t('products.application_instructions');
      appTitle.style.fontSize = '18px';
      appTitle.style.fontWeight = 'bold';
      appTitle.style.marginBottom = '10px';
      appTitle.style.color = '#0055A3';
      appSection.appendChild(appTitle);

      const appFields: { key: keyof Product['application']; label: string }[] = [
        { key: 'method_of_application', label: t('products.method_of_application') },
        { key: 'mixing_ratio', label: t('products.mixing_ratio') },
        { key: 'mixing_note', label: t('products.mixing_note') },
        { key: 'mixing_steps', label: t('products.mixing_steps') },
        { key: 'thinner', label: t('products.thinner') },
        { key: 'cleaner', label: t('products.cleaner') },
        { key: 'application_temperature', label: t('products.application_temperature') },
        { key: 'curing_note', label: t('products.curing_note') },
        { key: 'note_application', label: t('products.note_application') },
      ];

      const appTable = document.createElement('table');
      appTable.style.width = '100%';
      appTable.style.borderCollapse = 'collapse';
      appTable.style.fontSize = '13px';
      appTable.style.pageBreakInside = 'avoid';
      appTable.style.breakInside = 'avoid';

      appFields.forEach(({ key, label }) => {
        const value = product.application?.[key];
        if (!value) return;
        const row = document.createElement('tr');
        row.style.pageBreakInside = 'avoid';
        row.style.breakInside = 'avoid';
        
        const lblCell = document.createElement('td');
        lblCell.style.fontWeight = 'bold';
        lblCell.style.padding = '6px 8px';
        lblCell.style.border = '1px solid #ddd';
        lblCell.style.width = '40%';
        lblCell.textContent = label;
        
        const valCell = document.createElement('td');
        valCell.style.padding = '6px 8px';
        valCell.style.border = '1px solid #ddd';
        valCell.textContent = value;
        
        row.appendChild(lblCell);
        row.appendChild(valCell);
        appTable.appendChild(row);
      });

      if (appTable.children.length > 0) {
        appSection.appendChild(appTable);
        printElement.appendChild(appSection);
      }
    }

    // المواصفات الفنية - مصححة لعرض العناوين العربية
    if (product.technical_specs && product.technical_specs.length > 0) {
      const specsTable = document.createElement('table');
      specsTable.style.width = '100%';
      specsTable.style.borderCollapse = 'collapse';
      specsTable.style.fontSize = '13px';
      specsTable.style.pageBreakInside = 'avoid';
      specsTable.style.breakInside = 'avoid';

      // استخدم TECHNICAL_FIELDS للحفاظ على الترتيب الأصلي
      TECHNICAL_FIELDS.forEach(({ key, label, keyAr }) => {
        // ابحث عن القيمة المقابلة في technical_specs
        const spec = product.technical_specs.find(s => s.key === key);
        if (!spec || !spec.value) return; // تخطي إذا لم يكن هناك قيمة

        const row = document.createElement('tr');
        row.style.pageBreakInside = 'avoid';
        row.style.breakInside = 'avoid';
        
        const keyCell = document.createElement('td');
        keyCell.style.fontWeight = 'bold';
        keyCell.style.padding = '6px 8px';
        keyCell.style.border = '1px solid #ddd';
        keyCell.style.width = '40%';

        // استخدم getTranslated للحصول على الترجمة الصحيحة
        const fieldLabel = isRTL ? 
          (keyAr ? getTranslated(label, t(`products.${keyAr}`)) : label) : 
          label;
        keyCell.textContent = fieldLabel;

        const valCell = document.createElement('td');
        valCell.style.padding = '6px 8px';
        valCell.style.border = '1px solid #ddd';
        valCell.textContent = spec.value;

        row.appendChild(keyCell);
        row.appendChild(valCell);
        specsTable.appendChild(row);
      });

      const specsSection = document.createElement('div');
      specsSection.style.marginBottom = '20px';
      specsSection.style.pageBreakInside = 'avoid';
      specsSection.style.breakInside = 'avoid';
      
      const specsTitle = document.createElement('h2');
      specsTitle.textContent = t('products.technical_specifications');
      specsTitle.style.fontSize = '18px';
      specsTitle.style.fontWeight = 'bold';
      specsTitle.style.marginBottom = '10px';
      specsTitle.style.color = '#0055A3';
      specsSection.appendChild(specsTitle);
      specsSection.appendChild(specsTable);
      printElement.appendChild(specsSection);
    }
   
    addSection(t('products.surface_preparation'), product.surface_preparation);

    // أوقات الجفاف
    const dryingFields: { key: string; label: string }[] = [
      { key: 'dry_to_touch', label: t('products.dry_to_touch') },
      { key: 'dry_to_handle', label: t('products.dry_to_handle') },
      { key: 'complete_setting', label: t('products.complete_setting') },
      { key: 'grouting_time', label: t('products.grouting_time') },
      { key: 'adjustability_time', label: t('products.adjustability_time') },
      { key: 'dry_to_topcoat', label: t('products.dry_to_topcoat') },
      { key: 'initial_setting', label: t('products.initial_setting') },
      { key: 'fully_cured', label: t('products.fully_cured') },
      { key: 'dry_to_sand', label: t('products.dry_to_sand') },
      { key: 'drying_time_note', label: t('products.drying_time_note') },
    ];

    const dryingData = dryingFields
      .map(({ key, label }) => {
        const value = (product as any)[key];
        return value ? { label, value } : null;
      })
      .filter(Boolean);

    if (dryingData.length > 0) {
      const dryingSection = document.createElement('div');
      dryingSection.style.marginBottom = '20px';
      dryingSection.style.pageBreakInside = 'avoid';
      dryingSection.style.breakInside = 'avoid';
      
      const dryingTitle = document.createElement('h2');
      dryingTitle.textContent = t('products.drying_time');
      dryingTitle.style.fontSize = '18px';
      dryingTitle.style.fontWeight = 'bold';
      dryingTitle.style.marginBottom = '10px';
      dryingTitle.style.color = '#0055A3';
      dryingSection.appendChild(dryingTitle);

      const dryingTable = document.createElement('table');
      dryingTable.style.width = '100%';
      dryingTable.style.borderCollapse = 'collapse';
      dryingTable.style.fontSize = '13px';
      dryingTable.style.pageBreakInside = 'avoid';
      dryingTable.style.breakInside = 'avoid';

      dryingData.forEach(({ label, value }: any) => {
        const row = document.createElement('tr');
        row.style.pageBreakInside = 'avoid';
        row.style.breakInside = 'avoid';
        
        const lblCell = document.createElement('td');
        lblCell.style.fontWeight = 'bold';
        lblCell.style.padding = '6px 8px';
        lblCell.style.border = '1px solid #ddd';
        lblCell.style.width = '40%';
        lblCell.textContent = label;
        
        const valCell = document.createElement('td');
        valCell.style.padding = '6px 8px';
        valCell.style.border = '1px solid #ddd';
        valCell.textContent = value;
        
        row.appendChild(lblCell);
        row.appendChild(valCell);
        dryingTable.appendChild(row);
      });

      dryingSection.appendChild(dryingTable);
      printElement.appendChild(dryingSection);
    } 

    addSection(t('products.storing_conditions'), product.storing_conditions);
    addSection(t('products.safety_note'), product.safety_note);

    // إنشاء اسم الملف
    const safeName = name
      .replace(/[^a-zA-Z0-9\u0600-\u06FF\s]/g, '_')
      .replace(/\s+/g, '_')
      .trim();

    const options = {
      margin: 10,
      filename: `${safeName}_Datasheet.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(printElement).set(options).save();
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
                {product.type && (
                  <span className="px-4 py-2 bg-white/20 rounded-full text-white font-medium">
                    {translateFilterValue('Type', product.type, filterValueMap)}
                  </span>
                )}
                {product.material && (
                  <span className="px-4 py-2 bg-white/20 rounded-full text-white font-medium">
                    {translateFilterValue('Material Type', product.material, filterValueMap)}
                  </span>
                )}
                {product.usage && (
                  <span className="px-4 py-2 bg-white/20 rounded-full text-white font-medium">
                    {translateFilterValue('Application Fields', product.usage, filterValueMap)}
                  </span>
                )}
              </div>

              {product.recommended_uses && product.recommended_uses.length > 0 && (
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

              {product.packaging && product.packaging.length > 0 && (
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
                onClick={handleDownloadPDF}
                className="bg-white/20 text-white px-8 py-4 rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center"
              >
                <Download className="w-6 h-6 mr-3" />
                {t('products.download_datasheet')}
              </button>
            </div>
            <div className="relative">
              {product.images && product.images.length > 0 ? (
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
                    {brands.find(b => product.brand && product.brand.toLowerCase().includes(b.name.toLowerCase()))?.logo && (
                      <div className={`absolute top-0 flex items-center justify-center ${isRTL ? "left-10" : "right-10"}`}>
                        <div className="bg-white rounded-t-none rounded-b-md p-4 shadow-md">
                          <img
                            src={brands.find(b => product.brand && product.brand.toLowerCase().includes(b.name.toLowerCase()))!.logo}
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
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === currentImageIndex ? "bg-white shadow-lg" : "bg-white/50 hover:bg-white/70"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-80 lg:h-96 bg-gray-200 rounded-2xl flex items-center justify-center relative">
                  {brands.find(b => product.brand && product.brand.toLowerCase().includes(b.name.toLowerCase()))?.logo && (
                    <div className={`absolute top-0 flex items-center justify-center ${isRTL ? "left-10" : "right-10"}`}>
                      <div className="bg-white rounded-t-none rounded-b-md p-4 shadow-md">
                        <img
                          src={brands.find(b => product.brand && product.brand.toLowerCase().includes(b.name.toLowerCase()))!.logo}
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
      {product.features && product.features.length > 0 && (
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
  {/* Safety Note - إصلاح العرض */}
      {hasSafetyNote && (
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
                    {product.safety_note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      
      )}
    </div>
  );
};

export default ProductDetail;