import { NextRequest, NextResponse } from 'next/server';
import { Todo, TodoResponse } from '../../todos/[slug]/route';
import { NotionTodo, NotionTodoAllResponse } from '../../todos/interfaces';
import { Memo, MemoResponse, NotionMemo, NotionMemoResponse } from './interface';
import axios, { AxiosError } from 'axios';

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

export async function POST(request: Request, { params }: { params: { memoListId: string } }) {
  const slug = params.memoListId;
  const body = await request.json();

  const accessToken = request.headers.get('Authorization');
  const url = 'https://api.notion.com/v1/pages';

  const data = {
    parent: {
      database_id: slug,
    },
    properties: {
      tags: body.tags,
      title: {
        type: 'title',
        rich_text: [
          {
            type: 'text',
            text: {
              content: body.text,
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default',
            },
            plain_text: body.title,
            href: null,
          },
        ],
      },
      text: {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content: body.text,
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default',
            },
            plain_text: body.text,
            href: null,
          },
        ],
      },
    },
  };
  try {
    const res = await axios.post<NotionMemo>(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Notion-Version': '2022-06-28',
      },
    });

    if (res.status === 200) {
      const { tags, title, text } = res.data.properties;
      const { created_time } = res.data.properties['Created time'];
      //   const { created_time } = memo.properties['Created time'];
      return NextResponse.json<Memo>({
        tags: tags.multi_select,
        title: title.title[0].plain_text,
        text: text.rich_text[0].plain_text,
        createdAt: created_time,
      });
    } else {
      return new Response('request failed', { status: 500 });
    }
  } catch (e) {
    const error = e as AxiosError;
    console.log(error.message, error.toJSON());
    return NextResponse.json({ message: 'error', error: error.message });
  }
}
