import { NextRequest, NextResponse } from 'next/server';
import { Todo, TodoResponse } from '../../todos/[slug]/route';
import { NotionTodoAllResponse } from '../../todos/interfaces';
import axios from 'axios';

// Get Todos
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const accessToken = request.headers.get('Authorization');
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
    const resp = await axios.post(url, req, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Notion-Version': '2022-06-28',
      },
    });

    // const todos = resp.data.results.map<any>((todo) => {
    //   const { status, created_at: createdAt, text } = todo.properties;

    //   return { status: status.checkbox, createdAt: createdAt.date.start, text: text.title[0].plain_text, id: todo.id };
    // });

    console.log(resp.data);

    // return NextResponse.json<TodoResponse>({ todos });
  } catch (e) {
    return NextResponse.json(e);
  }
}
