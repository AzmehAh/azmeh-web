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
  content: BulletinContent[];
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
      .eq('slug', slug)
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
  }
};