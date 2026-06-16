import type { AuthUser } from '@/types/auth'

export const PERMISSIONS = {
  MANAGE_USERS: 'manage_users',
  VIEW_DASHBOARD: 'view_dashboard',
} as const

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS]

export function hasPermission(user: AuthUser | null, permission: string): boolean {
  if (!user) return false
  // Basic implementation: replace with actual role-based logic
  if (user.role === 'admin') return true
  return false
}
