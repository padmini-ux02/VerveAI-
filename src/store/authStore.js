import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      role: null,

      login: (userData, token) => set({
        user: userData,
        token,
        isAuthenticated: true,
        role: userData.role || 'STUDENT',
      }),

      logout: () => set({
        user: null,
        token: null,
        isAuthenticated: false,
        role: null,
      }),

      updateUser: (updates) => set((state) => ({
        user: { ...state.user, ...updates },
      })),

      // Demo login for testing
      demoLogin: () => set({
        user: {
          id: 'demo-001',
          name: 'Alex Johnson',
          email: 'alex@verveai.com',
          role: 'STUDENT',
          avatar: null,
          level: 12,
          xp: 3450,
          xpNext: 4000,
          streak: 7,
          badges: ['First Interview', 'Code Warrior', 'Resume Pro'],
          joinDate: '2026-01-15',
        },
        token: 'demo-token-xxx',
        isAuthenticated: true,
        role: 'STUDENT',
      }),
    }),
    {
      name: 'verveai-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        role: state.role,
      }),
    }
  )
)
