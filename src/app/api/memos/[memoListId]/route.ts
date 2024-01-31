import { NextRequest, NextResponse } from 'next/server';
import { Todo, TodoResponse } from '../../todos/[slug]/route';
import { NotionTodoAllResponse } from '../../todos/interfaces';
import { Memo, MemoResponse, NotionMemoResponse, Page } from './interface';
import axios from 'axios';

// Get Todos
export async function GET(request: NextRequest, { params }: { params: { memoListId: string } }) {
  const slug = params.memoListId;
  const accessToken = request.headers.get('Authorization');
  const url = `https://api.notion.com/v1/databases/${slug}/query`;
  const req = {};
  try {
    const resp = await axios.post<NotionMemoResponse>(url, req, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Notion-Version': '2022-06-28',
      },
    });

    const memos = resp.data.results.map<Memo>((memo) => {
      const { tags, text, title } = memo.properties;

      const { created_time } = memo.properties['Created time'];

      return {
        tags: tags.multi_select,
        title: title.title[0].plain_text,
        text: text.rich_text[0].plain_text,
        createdAt: created_time,
      };
    });

    return NextResponse.json<MemoResponse>({ memos });
  } catch (e) {
    return NextResponse.json(e);
  }
}
