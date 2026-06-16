'use client'

import { hasPermission } from './permissions'
import { useAuthStore } from '@/store/useAuthStore'

export function Can({ permission, children, fallback = null }: {
  permission: string; children: React.ReactNode; fallback?: React.ReactNode
}) {
  const user = useAuthStore((state) => state.user)
  if (!hasPermission(user, permission)) return fallback
  return <>{children}</>
}
