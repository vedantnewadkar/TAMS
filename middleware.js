import { NextResponse } from 'next/server';

/**
 * TAMS Middleware — Hackathon Edition
 * Pure cookie-based auth check. No Supabase. No DB calls.
 * Everything validated client-side. This just protects routes from direct URL access.
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. Always allow public routes
  const isPublic =
    pathname === '/' ||
    pathname === '/login' ||
    pathname === '/register' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/csv') ||
    pathname.includes('.');   // static files

  if (isPublic) return NextResponse.next();

  // 2. Check auth cookie (set by useAuth on login)
  const authToken = request.cookies.get('auth-token')?.value;
  const userRole = request.cookies.get('user-role')?.value;

  // Not logged in — redirect to login
  if (!authToken || !userRole) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 3. Role-path guard (prevent admin from accessing /student, etc.)
  const rolePaths = ['admin', 'teacher', 'mentor', 'student', 'parent'];
  const pathRole = rolePaths.find(r => pathname.startsWith(`/${r}`));

  if (pathRole && pathRole !== userRole) {
    const url = request.nextUrl.clone();
    url.pathname = `/${userRole}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
