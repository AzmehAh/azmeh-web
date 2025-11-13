const fetchProduct = async (productId: string) => {
  try {
    setLoading(true);
    setError(null);

    // 1. جلب بيانات المنتج الأساسية
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

    // 2. جلب الصور
    const { data: imagesData } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', productId)
      .order('is_main', { ascending: false })
      .order('sort_order', { ascending: true });

    // 3. جلب material_id و usage_id من الجدول الوسيط
    const { data: linkedItems, error: linkError } = await supabase
      .from('product_materials')
      .select('material_id')
      .eq('product_id', productId);

    if (linkError) throw linkError;

    const allLinkedIds = linkedItems?.map(item => item.material_id) || [];

    // 4. جلب تصنيفات المواد والاستخدامات
    const { data: filterValues } = await supabase
      .from('product_filter_values')
      .select('id, filter_type_id, product_filter_types(name)')
      .eq('is_active', true);

    const materialTypeIds = filterValues
      ?.filter(v => v.product_filter_types?.name === 'Material Type')
      .map(v => v.id) || [];

    const usageTypeIds = filterValues
      ?.filter(v => v.product_filter_types?.name === 'Application Fields')
      .map(v => v.id) || [];

    const materialArray = allLinkedIds.filter(id => materialTypeIds.includes(id));
    const usageArray = allLinkedIds.filter(id => usageTypeIds.includes(id));

    // 5. جلب الصورة الرئيسية
    let mainImage = null;
    try {
      mainImage = await api.getMainProductImage(productId);
    } catch (e) {
      console.warn('Main image fallback used');
    }

    // 6. بناء الكائن النهائي - تصحيح مشكلة البراند هنا
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
                 (imagesData && imagesData.length > 0 ? imagesData[0].image_url : "") ||
                 productData.image_url ||
                 "/images/placeholder.jpg",
      images: imagesData?.map(img => img.image_url).filter(Boolean) || [],
      type: productData.type_id || "",
      // ✅ تصحيح مشكلة البراند هنا
      brand: productData.brand || productData.brand_id || "",
      material: materialArray,
      usage: usageArray,
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