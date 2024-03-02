import { NextResponse } from 'next/server';
import type { Database, NotionAuthResponse } from './interfaces';
import http from '@/shared/utils/fetch';

export interface AuthResponse {
  databases: Database[];
  accessToken: string;
}

// TODO: 타입이 알아서 잘 추론되게 할 순 없나.?
export interface AuthRequestResponse {
  accessToken: string;
  pageId: string;
}

export async function POST(request: Request) {
  const encoded = Buffer.from(`${process.env.OAUTH_CLIENT_ID}:${process.env.OAUTH_CLIENT_SECRET}`).toString('base64');
  const body = await request.json();

  try {
    const response = await http.post<NotionAuthResponse>('https://api.notion.com/v1/oauth/token', body, {
      headers: {
        Authorization: `Basic ${encoded}`,
        'Notion-Version': '2022-06-28',
      },
    });
    const { access_token: accessToken, duplicated_template_id: pageId } = response;

    const res = NextResponse.json(
      { accessToken, pageId },
      {
        status: 200,
      },
    );

    res.cookies.set({
      name: 'accessToken',
      value: accessToken,
      maxAge: 34560000,
    });
    return res;
    // TODO: auth와 block api 분리 후 각각 호출
  } catch (error) {
    // TODO: status code는 봐야할듯
    return NextResponse.json({ error }, { status: 401 });
  }
}
