import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import apiClient from '@/lib/axios'
import { useAuthStore } from '@/store/useAuthStore'
import type { AuthUser, LoginPayload, AuthResponse } from '@/types/auth'

export function useLogin() {
  const setCredentials = useAuthStore((state) => state.setCredentials)

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await apiClient.post<AuthResponse>('/auth/login', payload)
      return data
    },
    onSuccess: (data) => {
      setCredentials(data.user)
    },
  })
}

export function useMe() {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const { data } = await apiClient.get<AuthUser>('/auth/me')
      return data
    },
  })
}
