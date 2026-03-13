import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    // Check if the user has an admin_session cookie set by the client
    const session = request.cookies.get('admin_session');

    // If no session, redirect to login
    if (!session && pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
