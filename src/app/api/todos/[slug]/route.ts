import { NextRequest, NextResponse } from 'next/server';
import { NotionTodo, NotionTodoAllResponse } from '@/app/api/todos/interfaces';
import http from '@/shared/utils/fetch';

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
  const todolistId = params.slug;
  const accessToken = request.cookies.get('accessToken')?.value;
  const url = `https://api.notion.com/v1/databases/${todolistId}/query`;
  const req = {
    // filter: {
    //   and: [
    //     {
    //       property: 'created_at',
    //       date: {
    //         after: new Date(), // 오늘 00시 이후
    //       },
    //     },
    //     {
    //       property: 'created_at',
    //       date: {
    //         before: new Date(), // 내일 00시 이전
    //       },
    //     },
    //   ],
    // },
  };

  try {
    const response = await http.post<NotionTodoAllResponse>(url, req, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Notion-Version': '2022-06-28',
      },
    });

    const todos = response.results.map<Todo>((todo) => {
      const { status, created_at: createdAt, text } = todo.properties;

      return { status: status.checkbox, createdAt: createdAt.date.start, text: text.title[0].plain_text, id: todo.id };
    });

    return NextResponse.json<TodoResponse>({ todos }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}

// Create Todo
export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const accessToken = request.cookies.get('accessToken')?.value;
  const body = await request.json();

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
          start: body.created_at,
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
    const response = await http.post<NotionTodo>(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Notion-Version': '2022-06-28',
      },
    });

    const { id, properties } = response;
    return NextResponse.json<Todo>({
      id,
      text: properties.text.title[0].plain_text,
      createdAt: properties.created_at.date.start,
      status: properties.status.checkbox,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
