"use client"

// Simple authentication system - can be upgraded to use database later
const ADMIN_CREDENTIALS = {
  email: "admin@ibag-ghana.org",
  password: "ibag2024admin", // In production, this would be hashed and stored securely
}

export interface User {
  email: string
  name: string
  role: string
}

export const authService = {
  login: async (email: string, password: string): Promise<User | null> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const user: User = {
        email: email,
        name: "IBAG Administrator",
        role: "admin",
      }

      // Store in sessionStorage for persistence
      if (typeof window !== "undefined") {
        sessionStorage.setItem("ibag_admin_user", JSON.stringify(user))
      }

      return user
    }

    return null
  },

  logout: () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("ibag_admin_user")
    }
  },

  getCurrentUser: (): User | null => {
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
