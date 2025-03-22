import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RoleEnum } from '@/types/user'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { refreshAccessToken } from './actions/auth/refresh'

// Route configurations
const ROUTES = {
  protected: ['/account'],
  admin: ['/admin'],
  auth: ['/login', '/register']
}

// Extended JWT payload type
interface AuthToken extends JwtPayload {
  scope: string
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value
  
  // Set up response with path header
  const headers = new Headers(request.headers)
  headers.set('x-current-path', pathname)
  const response = NextResponse.next({ request: { headers } })

  // Handle token refresh if needed
  if (accessToken && refreshToken) {
    await handleTokenRefresh(accessToken, refreshToken, response)
  }

  // Route protection logic
  if (accessToken) {
    // Redirect authenticated users away from auth pages
    if (isMatchingRoute(pathname, ROUTES.auth)) {
      return NextResponse.redirect(new URL('/account', request.url))
    }
    
    // Restrict admin routes to admin users
    if (isMatchingRoute(pathname, ROUTES.admin)) {
      const decoded = decodeToken(accessToken)
      if (!decoded?.scope.includes(RoleEnum.ADMIN)) {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
  } else {
    // Redirect unauthenticated users away from protected routes
    if (isMatchingRoute(pathname, [...ROUTES.protected, ...ROUTES.admin])) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return response
}

/**
 * Checks if token needs refresh and handles the refresh process
 */
async function handleTokenRefresh(accessToken: string, refreshToken: string, response: NextResponse) {
  try {
    const decoded = decodeToken(accessToken)
    
    if (decoded?.exp && decoded.exp < Date.now() / 1000) {
      const payload = await refreshAccessToken(refreshToken)
      
      if (payload?.data?.accessToken && payload?.data?.refreshToken) {
        response.cookies.set('accessToken', payload.data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          sameSite: 'lax',
        })
        response.cookies.set('refreshToken', payload.data.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          sameSite: 'lax',
        })
      }
    }
  } catch (error) {
    console.error('Token decode error:', error)
    response.cookies.delete('accessToken')
    response.cookies.delete('refreshToken')
  }
}

/**
 * Safely decodes a JWT token
 */
function decodeToken(token: string): AuthToken | null {
  try {
    return jwtDecode<AuthToken>(token)
  } catch {
    return null
  }
}

/**
 * Checks if a pathname matches any route in the routes array
 */
function isMatchingRoute(pathname: string, routes: string[]): boolean {
  return routes.some(route => pathname.startsWith(route))
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
