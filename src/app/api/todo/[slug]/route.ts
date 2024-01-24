import { NextRequest, NextResponse } from 'next/server';
import { NotionTodoAllResponse } from '../interfaces';
import axios from 'axios';

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
  const authToken = request.headers.get('Authorization');
  const url = `https://api.notion.com/v1/databases/${slug}/query`;
  const req = {
    filter: {
      and: [
        {
          property: 'status',
          checkbox: {
            equals: false,
          },
        },
      ],
    },
  };
  try {
    const resp = await axios.post<NotionTodoAllResponse>(url, req, {
      headers: {
        Authorization: authToken,
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
export async function POST() {}

// Update Todo
export async function PATCH() {}
