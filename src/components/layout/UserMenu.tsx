'use client'

import { useTranslations } from 'next-intl'
import { LogOut } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export function UserMenu() {
  const t = useTranslations('auth')
  const router = useRouter()
  const { user, logout } = useAuthStore()

  const handleLogout = () => { logout(); router.push('/login') }
  const initials = user?.fullName?.split(' ').map((n) => n[0]).join('').toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative h-9 w-9 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground outline-none">
        <Avatar className="h-9 w-9"><AvatarFallback>{initials || 'U'}</AvatarFallback></Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <p className="text-sm font-medium">{user?.fullName}</p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
          <LogOut className="mr-2 h-4 w-4" />{t('logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
