import { cookies } from 'next/headers'

export const REFRESH_TOKEN_KEY = 'refreshToken'
export const ACCESS_TOKEN_KEY = 'accessToken'

export async function getServerAccessToken() {
  const cookieStore = await cookies()
  return cookieStore.get(ACCESS_TOKEN_KEY)?.value
}

export async function hasRefreshSession() {
  const cookieStore = await cookies()
  return Boolean(cookieStore.get(REFRESH_TOKEN_KEY)?.value)
}
