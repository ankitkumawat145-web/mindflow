import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session')?.value;
  const { pathname } = request.nextUrl;

  const protectedPaths = ['/dashboard'];
  const guestPaths = ['/login', '/signup'];

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  const isGuestOnly = guestPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isGuestOnly && sessionToken) {
    const { data: { user } } = await supabase.auth.getUser(sessionToken);
    if (user) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
};
