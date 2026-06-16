import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { AuthUser } from '@/types/auth'

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  setCredentials: (user: AuthUser) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setCredentials: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
