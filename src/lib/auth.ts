import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export const auth = {
  // Admin login using Supabase Auth
  async signIn(email: string, password: string): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { user: null, error: 'Invalid email or password' };
      }

      if (!data.user) {
        return { user: null, error: 'Login failed' };
      }

      // Check if user has admin role (you can add role-based logic here)
      const authUser: AuthUser = {
        id: data.user.id,
        email: data.user.email || '',
        role: 'admin'
      };

      return { user: authUser, error: null };
    } catch (error) {
      return { user: null, error: 'Login failed' };
    }
  },

  // Get current authenticated user
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return null;

      return {
        id: user.id,
        email: user.email || '',
        role: 'admin'
      };
    } catch {
      return null;
    }
  },

  // Get current user synchronously (for initial checks)
  getCurrentUserSync(): AuthUser | null {
    try {
      // Check if we have a stored session
      const session = supabase.auth.getSession();
      return session ? {
        id: 'temp-id',
        email: 'temp-email',
        role: 'admin'
      } : null;
    } catch {
      return null;
    }
  },

  // Admin logout
  async signOut(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  },

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return !!user;
    } catch {
      return false;
    }
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const authUser: AuthUser = {
          id: session.user.id,
          email: session.user.email || '',
          role: 'admin'
        };
        callback(authUser);
      } else {
        callback(null);
      }
    });
  }
};