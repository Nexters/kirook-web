import { NextResponse } from 'next/server';
import { fetchOgTags } from './fetcher';
import axios from 'axios';

export interface LinkPreviewResponse {
  siteName?: string;
  title?: string;
  description?: string;
  image?: string;
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    await checkURLExist(body.url);

    const res = await fetchOgTags(body.url);

    return NextResponse.json<LinkPreviewResponse>(res);
  } catch (error) {
    if (error instanceof Error && error.message === 'URL is not exist') {
      return new Response('URL is not exist', { status: 404 });
    }
    return new Response('unexpected server error', { status: 500 });
  }
}

async function checkURLExist(url: string) {
  try {
    const response = await axios.head(url);
    return response;
  } catch (err) {
    throw new Error('URL is not exist');
  }
}
