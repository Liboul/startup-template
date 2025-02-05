import { betterFetch } from '@better-fetch/fetch';
import { NextMiddleware, MiddlewareConfig, NextResponse } from 'next/server';
import { Session } from 'better-auth';

// From better-auth docs
export const middleware: NextMiddleware = async (request) => {
  const { data: session } = await betterFetch<Session>(
    '/api/auth/get-session',
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    },
  );

  if (!session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackURL', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
};

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - / (root)
     * - api (API routes)
     * - login (login page)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login).+)',
  ],
};
