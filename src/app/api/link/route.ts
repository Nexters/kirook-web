import { NextResponse } from 'next/server';
import { fetchOgTags } from './fetcher';

export interface LinkPreviewResponse {
  siteName?: string;
  title?: string;
  description?: string;
  image?: string;
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const res = await fetchOgTags(body.url);

    return NextResponse.json<LinkPreviewResponse>(res);
  } catch (e) {
    return new Response('unexpected server error', { status: 500 });
  }
}
