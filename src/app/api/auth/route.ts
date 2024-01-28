import { NextResponse } from 'next/server';
import { Block, Database, NotionAuthResponse, NotionBlockResponse } from './interfaces';
import axios, { AxiosError, AxiosResponse } from 'axios';

export interface AuthResponse {
  databases: Database[];
  accessToken: string;
}

export async function POST(request: Request) {
  const encoded = Buffer.from(`${process.env.OAUTH_CLIENT_ID}:${process.env.OAUTH_CLIENT_SECRET}`).toString('base64');
  const res = await request.json();
  try {
    // Get token and page ID
    const authResp = await axios.post<any, AxiosResponse<NotionAuthResponse>>(
      'https://api.notion.com/v1/oauth/token',
      res,
      {
        headers: {
          Authorization: `Basic ${encoded}`,
          'Notion-Version': '2022-06-28',
        },
      },
    );
    const { access_token: accessToken, duplicated_template_id: pageId } = authResp.data;

    return NextResponse.json({ accessToken, pageId });

    // TODO: auth와 block api 분리 후 각각 호출
  } catch (e) {
    return NextResponse.json(e);
  }
}
