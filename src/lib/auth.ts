import { supabase } from './supabase';

export interface AdminUser {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export const auth = {
  // Admin login
  async signIn(email: string, password: string): Promise<{ user: AdminUser | null; error: string | null }> {
    try {
      // For demo purposes, we'll use a simple check
      // In production, you'd want proper password hashing
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !data) {
        return { user: null, error: 'Invalid email or password' };
      }

      // Store admin session in localStorage
      localStorage.setItem('admin_user', JSON.stringify(data));
      
      return { user: data, error: null };
    } catch (error) {
      return { user: null, error: 'Login failed' };
    }
  },

  // Get current admin user
  getCurrentAdmin(): AdminUser | null {
    try {
      const stored = localStorage.getItem('admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  // Admin logout
  signOut(): void {
    localStorage.removeItem('admin_user');
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getCurrentAdmin() !== null;
  }
};