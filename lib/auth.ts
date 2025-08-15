"use client"

import { supabase } from "./supabase"
import type { User } from "@supabase/supabase-js"

// Admin credentials for fallback authentication
const ADMIN_CREDENTIALS = {
  email: "admin@ibag-ghana.org",
  password: "ibag2024admin",
}

export interface AdminUser {
  email: string
  name: string
  role: string
}

export const authService = {
  // Check if user has admin role
  isAdmin: (user: User | null): boolean => {
    if (!user) return false
    return user.email === ADMIN_CREDENTIALS.email
  },

  // Get user profile with admin role check
  getUserProfile: (user: User | null): AdminUser | null => {
    if (!user) return null
    
    return {
      email: user.email || '',
      name: user.user_metadata?.name || user.email || 'User',
      role: authService.isAdmin(user) ? 'admin' : 'user'
    }
  },

  // Legacy login method for backward compatibility
  login: async (email: string, password: string): Promise<AdminUser | null> => {
    // Try Supabase authentication first
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (data.user && !error) {
      return authService.getUserProfile(data.user)
    }

    // Fallback to admin credentials for existing admin login
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      // Create admin user in Supabase if it doesn't exist
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: ADMIN_CREDENTIALS.email,
        password: ADMIN_CREDENTIALS.password,
      })

      if (signUpData.user || signUpError?.message?.includes('already registered')) {
        // Try to sign in again
        const { data: signInData } = await supabase.auth.signInWithPassword({
          email: ADMIN_CREDENTIALS.email,
          password: ADMIN_CREDENTIALS.password,
        })
        
        if (signInData.user) {
          return authService.getUserProfile(signInData.user)
        }
      }

      // Fallback to session storage for compatibility
      const adminUser: AdminUser = {
        email: email,
        name: "IBAG Administrator",
        role: "admin",
      }

      if (typeof window !== "undefined") {
        sessionStorage.setItem("ibag_admin_user", JSON.stringify(adminUser))
      }

      return adminUser
    }

    return null
  },

  logout: async () => {
    await supabase.auth.signOut()
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("ibag_admin_user")
    }
  },

  getCurrentUser: (): AdminUser | null => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("ibag_admin_user")
      return stored ? JSON.parse(stored) : null
    }
    return null
  },

  isAuthenticated: (): boolean => {
    return authService.getCurrentUser() !== null
  },
}
