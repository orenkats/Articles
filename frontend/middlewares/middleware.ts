import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith('/tags/33')) {
    url.pathname = 'https://www.maariv.co.il/tags/בנימין-נתינהו';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
