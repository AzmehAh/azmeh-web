import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Product {
  id: string;
  name: string;
  code: string;
  brand: string;
  type: string;
  material: string;
  usage: string;
  description: string;
  technical_description?: string;
  features: string[];
  applications: string[];
  instructions: string[];
  packaging: Array<{
    size: string;
    type: string;
    coverage: string;
  }>;
  technical_specs: Array<{
    property: string;
    value: string;
    standard: string;
  }>;
  storage: string[];
  safety_precautions: string[];
  safety_first_aid: string[];
  status: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text?: string;
  sort_order: number;
}

export interface Bulletin {
  id: string;
  slug: string;
  title: string;
  short_description?: string;
  cover_image?: string;
  category: string;
  subcategory: string;
  content: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface BulletinContent {
  type: 'heading' | 'paragraph' | 'table' | 'image' | 'list';
  content: any;
  level?: number;
  caption?: string;
  headers?: string[];
  rows?: string[][];
  items?: string[];
}

export interface FAQCategory {
  id: string;
  name: string;
  description?: string;
  sort_order: number;
}

export interface FAQItem {
  id: string;
  category_id: string;
  question: string;
  answer: string;
  sort_order: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  cover_letter: string;
  resume_url?: string;
  status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface TroubleshootingCategory {
  id: string;
  name: string;
  description?: string;
  sort_order: number;
}

export interface TroubleshootingItem {
  id: string;
  category_id: string;
  problem: string;
  solution: string;
  severity: string;
  sort_order: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  parent_id?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface HomepageSection {
  id: string;
  section_name: string;
  title: string;
  subtitle?: string;
  content: Record<string, any>;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: any;
  description?: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContentBlock {
  id: string;
  block_key: string;
  title: string;
  content: Record<string, any>;
  block_type: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductFilterType {
  id: string;
  name: string;
  description?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface ProductFilterValue {
  id: string;
  filter_type_id: string;
  value: string;
  display_name?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface BulletinCategoryConfig {
  id: string;
  name: string;
  description?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// API Functions
export const api = {
  // Products
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images (*)
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getProduct(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images (*)
      `)
      .eq('id', id)
      .eq('status', 'active')
      .single();
    
    if (error) throw error;
    return data;
  },

  // Bulletins
  async getBulletins() {
    const { data, error } = await supabase
      .from('bulletins')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getBulletin(slug: string) {
    const { data, error } = await supabase
      .from('bulletins')
      .select('*')
      .eq('id', slug)
      .eq('status', 'published')
      .single();
    
    if (error) throw error;
    return data;
  },

  // FAQ
  async getFAQCategories() {
    const { data, error } = await supabase
      .from('faq_categories')
      .select(`
        *,
        faq_items (*)
      `)
      .order('sort_order', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async getFAQItems(categoryId?: string) {
    let query = supabase
      .from('faq_items')
      .select(`
        *,
        faq_categories (name)
      `)
      .order('sort_order', { ascending: true });

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // Troubleshooting
  async getTroubleshootingCategories() {
    const { data, error } = await supabase
      .from('troubleshooting_categories')
      .select(`
        *,
        troubleshooting_items (*)
      `)
      .order('sort_order', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  // Contact Messages
  async submitContactMessage(message: Omit<ContactMessage, 'id' | 'status' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([message])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Job Applications
  async submitJobApplication(application: Omit<JobApplication, 'id' | 'status' | 'notes' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('job_applications')
      .insert([application])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // File Upload
  async uploadFile(bucket: string, path: string, file: File) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);
    
    if (error) throw error;
    
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    
    return urlData.publicUrl;
  },

  // Product Categories
  async getProductCategories() {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async createProductCategory(category: Omit<ProductCategory, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('product_categories')
      .insert([category])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateProductCategory(id: string, updates: Partial<ProductCategory>) {
    const { data, error } = await supabase
      .from('product_categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteProductCategory(id: string) {
    const { error } = await supabase
      .from('product_categories')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Homepage Sections
  async getHomepageSections() {
    const { data, error } = await supabase
      .from('homepage_sections')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async updateHomepageSection(id: string, updates: Partial<HomepageSection>) {
    const { data, error } = await supabase
      .from('homepage_sections')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Site Settings
  async getSiteSettings() {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .order('setting_key', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async getPublicSiteSettings() {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('is_public', true);
    
    if (error) throw error;
    return data;
  },

  async updateSiteSetting(key: string, value: any) {
    const { data, error } = await supabase
      .from('site_settings')
      .upsert({
        setting_key: key,
        setting_value: value,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Content Blocks
  async getContentBlocks() {
    const { data, error } = await supabase
      .from('content_blocks')
      .select('*')
      .eq('is_active', true);
    
    if (error) throw error;
    return data;
  },

  async getContentBlock(key: string) {
    const { data, error } = await supabase
      .from('content_blocks')
      .select('*')
      .eq('block_key', key)
      .eq('is_active', true)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateContentBlock(id: string, updates: Partial<ContentBlock>) {
    const { data, error } = await supabase
      .from('content_blocks')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Product Filter Management
  async getProductFilterTypes() {
    const { data, error } = await supabase
      .from('product_filter_types')
      .select(`
        *,
        product_filter_values (*)
      `)
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async createProductFilterType(filterType: Omit<ProductFilterType, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('product_filter_types')
      .insert([filterType])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateProductFilterType(id: string, updates: Partial<ProductFilterType>) {
    const { data, error } = await supabase
      .from('product_filter_types')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteProductFilterType(id: string) {
    const { error } = await supabase
      .from('product_filter_types')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getProductFilterValues(filterTypeId?: string) {
    let query = supabase
      .from('product_filter_values')
      .select(`
        *,
        product_filter_types (name)
      `)
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (filterTypeId) {
      query = query.eq('filter_type_id', filterTypeId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async createProductFilterValue(filterValue: Omit<ProductFilterValue, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('product_filter_values')
      .insert([filterValue])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateProductFilterValue(id: string, updates: Partial<ProductFilterValue>) {
    const { data, error } = await supabase
      .from('product_filter_values')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteProductFilterValue(id: string) {
    const { error } = await supabase
      .from('product_filter_values')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Product Images Management
  async getProductImages(productId: string) {
    const { data, error } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', productId)
      .order('sort_order', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async uploadProductImage(productId: string, file: File, altText?: string) {
    // Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `products/${productId}/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    // Save image record to database
    const { data, error } = await supabase
      .from('product_images')
      .insert([{
        product_id: productId,
        image_url: urlData.publicUrl,
        alt_text: altText || null,
        sort_order: 0,
        is_main: false
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteProductImage(imageId: string) {
    // Get image info first to delete from storage
    const { data: imageData, error: fetchError } = await supabase
      .from('product_images')
      .select('image_url')
      .eq('id', imageId)
      .single();

    if (fetchError) throw fetchError;

    // Extract file path from URL for storage deletion
    if (imageData.image_url) {
      const url = new URL(imageData.image_url);
      const pathParts = url.pathname.split('/');
      const filePath = pathParts.slice(-3).join('/'); // products/{productId}/{fileName}
      
      // Delete from storage (ignore errors if file doesn't exist)
      await supabase.storage
        .from('product-images')
        .remove([filePath]);
    }

    // Delete from database
    const { error } = await supabase
      .from('product_images')
      .delete()
      .eq('id', imageId);
    
    if (error) throw error;
  },

  async setMainProductImage(productId: string, imageId: string) {
    // First, unset all main images for this product
    await supabase
      .from('product_images')
      .update({ is_main: false })
      .eq('product_id', productId);

    // Then set the selected image as main
    const { data, error } = await supabase
      .from('product_images')
      .update({ is_main: true })
      .eq('id', imageId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getMainProductImage(productId: string) {
    const { data, error } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', productId)
      .eq('is_main', true)
      .maybeSingle();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
    return data;
  },

  async updateProductImageOrder(imageId: string, sortOrder: number) {
    const { data, error } = await supabase
      .from('product_images')
      .update({ sort_order: sortOrder })
      .eq('id', imageId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Bulletin Category Management
  async getBulletinCategoriesConfig() {
    const { data, error } = await supabase
      .from('bulletin_categories_config')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async createBulletinCategoryConfig(category: Omit<BulletinCategoryConfig, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('bulletin_categories_config')
      .insert([{ ...category, updated_at: new Date().toISOString() }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateBulletinCategoryConfig(id: string, updates: Partial<BulletinCategoryConfig>) {
    const { data, error } = await supabase
      .from('bulletin_categories_config')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteBulletinCategoryConfig(id: string) {
    const { error } = await supabase
      .from('bulletin_categories_config')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getBulletinCategoryByName(name: string) {
    const { data, error } = await supabase
      .from('bulletin_categories_config')
      .select('*')
      .eq('name', name)
      .maybeSingle();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
    return data;
  },

  // Enhanced Products API
  async getProductsWithFilters(filters: {
    category?: string;
    brand?: string;
    type?: string;
    material?: string;
    usage?: string;
    search?: string;
  } = {}) {
    let query = supabase
      .from('products')
      .select(`
        *,
        product_images (*),
        product_categories (name)
      `)
      .eq('status', 'active');

    if (filters.category) {
      query = query.eq('category_id', filters.category);
    }
    if (filters.brand) {
      query = query.eq('brand', filters.brand);
    }
    if (filters.type) {
      query = query.eq('type', filters.type);
    }
    if (filters.material) {
      query = query.eq('material', filters.material);
    }
    if (filters.usage) {
      query = query.eq('usage', filters.usage);
    }
    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,code.ilike.%${filters.search}%`);
    }

    query = query.order('created_at', { ascending: false });
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getRelatedBulletins(currentBulletinId: string, category: string, subcategory: string) {
    const { data, error } = await supabase
      .from('bulletins')
      .select('*')
      .eq('status', 'published')
      .eq('category', category)
      .eq('subcategory', subcategory)
      .neq('id', currentBulletinId)
      .order('created_at', { ascending: false })
      .limit(3);
    
    if (error) throw error;
    return data;
  },

  // Enhanced Bulletins API
  async getBulletinsWithFilters(filters: {
    category?: string;
    subcategory?: string;
    featured?: boolean;
    search?: string;
  } = {}) {
    let query = supabase
      .from('bulletins')
      .select('*')
      .eq('status', 'published');

    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    if (filters.subcategory) {
      query = query.eq('subcategory', filters.subcategory);
    }
    if (filters.featured !== undefined) {
      query = query.eq('featured', filters.featured);
    }
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,short_description.ilike.%${filters.search}%`);
    }

    query = query.order('created_at', { ascending: false });
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
};