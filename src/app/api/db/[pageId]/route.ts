import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type { Database, NotionBlockResponse } from '@/app/api/auth/interfaces';
import http from '@/shared/utils/fetch';

export interface DatabaseResponse {
  databases: Database[];
}

export async function GET(request: Request, { params }: { params: { pageId: string } }) {
  const accessToken = headers().get('Authorization') || '';

  // Get databases
  const blockUrl = `https://api.notion.com/v1/blocks/${params.pageId}/children?page_size=10`;
  const response = await http.get<NotionBlockResponse>(blockUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Notion-Version': '2022-06-28',
    },
  });

  const { results } = response;
  const databases = results
    .filter((block) => block.type === 'child_database')
    .map((block) => {
      if (!block.child_database?.title) {
        // throw new Error('Database fetch error');
      }

      return { id: block.id, title: block.child_database?.title || '' };
    });

  const res = NextResponse.json({ databases });

  databases.forEach((db) => {
    switch (db.title) {
      case 'todo':
        res.cookies.set('todo', db.id);
        return;
      case 'memo':
        res.cookies.set('memo', db.id);
        return;
      case 'link':
        res.cookies.set('link', db.id);
        return;
      default:
        return;
    }
  });

  return res;
}
