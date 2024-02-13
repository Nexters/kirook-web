import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');

  if (!accessToken) {
    return NextResponse.redirect('/');
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('Authorization', `Bearer ${accessToken.value}`);
  requestHeaders.set('Notion-Version', '2022-06-28');

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

// TODO: accessToken이 필요한 api에 대해서만 적용하도록 수정
export const config = {
  matcher: ['/api/todos/:path*'],
};
