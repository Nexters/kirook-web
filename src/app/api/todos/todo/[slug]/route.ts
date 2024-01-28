import { NextResponse } from 'next/server';
import { Todo } from '../../[slug]/route';
import { NotionTodo } from '../../interfaces';
import axios, { AxiosError } from 'axios';

// Update Todo
export async function PATCH(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const body = await request.json();

  const accessToken = request.headers.get('Authorization');
  const url = `https://api.notion.com/v1/pages/${slug}`;

  const data = {
    properties: {
      ...body,
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
    return new Response(error.message, {
      status: error.status,
    });
  }
}
