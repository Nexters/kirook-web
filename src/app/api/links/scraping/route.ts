import { NextResponse } from 'next/server';
import { fetchOgTags } from './fetcher';
import urlExist from 'url-exist';

export interface LinkPreviewResponse {
  siteName?: string;
  title?: string;
  description?: string;
  image?: string;
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    // const isURLExist = await urlExist('test');

    const res = await fetchOgTags(body.url);

    return NextResponse.json<LinkPreviewResponse>(res);
  } catch (e) {
    return new Response('unexpected server error', { status: 500 });
  }
}
