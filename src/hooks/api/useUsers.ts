import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '@/lib/axios'
import type { AuthUser } from '@/types/auth'
import type { PaginatedResponse, PaginationParams } from '@/types/pagination'

export function useGetUsers(params: PaginationParams) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedResponse<AuthUser>>('/users', { params })
      return data
    },
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: Partial<AuthUser>) => apiClient.post('/users', body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/users/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  })
}
