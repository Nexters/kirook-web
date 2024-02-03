import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Block, Database, NotionBlockResponse } from '../../auth/interfaces';
import axios, { AxiosError, AxiosResponse } from 'axios';

export interface DatabaseResponse {
  databases: Database[];
}

export async function GET(request: Request, { params }: { params: { pageId: string } }) {
  const accessToken = headers().get('Authorization') || '';

  // // Get databases
  try {
    const blockUrl = `https://api.notion.com/v1/blocks/${params.pageId}/children?page_size=10`;
    const blockResp = await axios.get<any, AxiosResponse<NotionBlockResponse>>(blockUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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

        return { id: v.id, title: v.child_database?.title || '' };
      });
    return NextResponse.json<DatabaseResponse>({ databases });
  } catch (e) {
    const error = e as AxiosError;
    console.log(error.message);

    return new Response(error.message, { status: error.status });
  }
}
