import { NextRequest, NextResponse } from 'next/server';
import { NotionTodo, NotionTodoAllResponse } from '../../interfaces';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';

export interface Todo {
  status: boolean;
  createdAt: string;
  text: string;
  id: string;
}

export interface TodoResponse {
  todos: Todo[];
}

// Get Todos
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const accessToken = request.headers.get('Authorization');
  const url = `https://api.notion.com/v1/databases/${slug}/query`;
  const req = {
    filter: {
      property: 'created_at',
      date: {
        after: dayjs().add(1, 'day').toISOString(), // 오늘 00시 이후
      },
    },
  };
  try {
    const resp = await axios.post<NotionTodoAllResponse>(url, req, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Notion-Version': '2022-06-28',
      },
    });

    const todos = resp.data.results.map<Todo>((todo) => {
      const { status, created_at: createdAt, text } = todo.properties;

      return { status: status.checkbox, createdAt: createdAt.date.start, text: text.title[0].plain_text, id: todo.id };
    });

    return NextResponse.json<TodoResponse>({ todos });
  } catch (e) {
    return NextResponse.json(e);
  }
}

// Create Todo
export async function POST(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const body = await request.json();

  const accessToken = request.headers.get('Authorization');
  const url = 'https://api.notion.com/v1/pages';

  const data = {
    parent: {
      database_id: slug,
    },
    properties: {
      status: {
        type: 'checkbox',
        checkbox: false,
      },
      created_at: {
        type: 'date',
        date: {
          start: dayjs().add(1, 'day').toISOString(),
          end: null,
          time_zone: null,
        },
      },
      text: {
        type: 'title',
        title: [
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
    const res = await axios.post<NotionTodo>(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Notion-Version': '2022-06-28',
      },
    });

    if (res.status === 200) {
      const { id, properties } = res.data;
      return NextResponse.json<Todo>({
        id,
        text: properties.text.title[0].plain_text,
        createdAt: properties.created_at.date.start,
        status: properties.status.checkbox,
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
