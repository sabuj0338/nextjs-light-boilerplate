import { NextRequest, NextResponse } from 'next/server'

const PRIVATE_ROUTE_PREFIXES = ['/dashboard', '/users', '/settings']
const AUTH_ROUTE_PREFIXES = ['/login', '/register']
const DEFAULT_LOGIN_REDIRECT = '/login'
const DEFAULT_AUTH_REDIRECT = '/dashboard'

function matchesRoutePrefix(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`)
}

export function proxy(request: NextRequest) {
  const hasSession = Boolean(request.cookies.get('refreshToken')?.value)
  const { pathname } = request.nextUrl

  if (pathname === '/') {
    return NextResponse.redirect(new URL(hasSession ? DEFAULT_AUTH_REDIRECT : DEFAULT_LOGIN_REDIRECT, request.url))
  }

  const isPrivateRoute = PRIVATE_ROUTE_PREFIXES.some((prefix) =>
    matchesRoutePrefix(pathname, prefix)
  )
  const isAuthRoute = AUTH_ROUTE_PREFIXES.some((prefix) =>
    matchesRoutePrefix(pathname, prefix)
  )

  if (isPrivateRoute && !hasSession) {
    const loginUrl = new URL(DEFAULT_LOGIN_REDIRECT, request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(new URL(DEFAULT_AUTH_REDIRECT, request.url))
  }

  const response = NextResponse.next()
  
  if (!request.cookies.has('locale')) {
    response.cookies.set('locale', 'en')
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
