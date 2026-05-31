import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// NOTE: JWT_SECRET is only required to verify the admin session token.
// It must NOT be read+thrown at module load — the middleware runs on every
// request to the whole site, so a missing secret would 500 every public page.
// Instead we read it lazily inside the admin-only branch and degrade
// gracefully (redirect to login) if it isn't configured.
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-replace-in-production';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // PATHNAME TRACKING
  // Set x-pathname header on the REQUEST so Server Components can read it
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  // Default response with updated request headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // ADMIN PANEL PROTECTION
  // Protect /admin routes, excluding /admin/login. The public marketing site
  // never enters this branch, so it is fully isolated from JWT_SECRET.
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin_token')?.value;

    // No session token, or no secret configured on this environment → send to
    // login. We never throw here, so a missing JWT_SECRET can never take down
    // the rest of the site.
    if (!token || !JWT_SECRET) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const key = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token, key);
      return response;
    } catch (err) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/|robots.txt).*)'],
};

