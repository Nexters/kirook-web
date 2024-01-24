import { NextResponse } from 'next/server';
import { Block, Database, NotionAuthResponse, NotionBlockResponse } from './interfaces';
import axios, { AxiosResponse } from 'axios';

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
        },
      },
    );
    const { access_token: accessToken, duplicated_template_id: pageId } = authResp.data;

    // Get databases
    const blockUrl = `https://api.notion.com/v1/blocks/${pageId}/children?page_size=10`;
    const blockResp = await axios.get<any, AxiosResponse<NotionBlockResponse>>(blockUrl, {
      headers: {
        Authorization: `Basic ${accessToken}`,
        'Notion-Version': '2022-06-28',
      },
    });
    const { results } = blockResp.data;
    const databases = results
      .filter((v: Block) => v.type === 'child_database')
      .map((v: Block) => {
        if (!v.child_database?.title) {
          throw new Error('Database fetch error');
        }

        return { id: v.id, title: v.child_database.title };
      });
    return NextResponse.json<AuthResponse>({ databases, accessToken });
  } catch (e) {
    return NextResponse.json(e);
  }
}
