import { NextRequest, NextResponse } from 'next/server';
import { Todo } from '../../[slug]/route';
import { NotionTodo } from '../../interfaces';
import http from '@/shared/utils/fetch';
import axios, { AxiosError } from 'axios';

// Update Todo
export async function PATCH(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const body = await request.json();

  const accessToken = request.headers.get('Authorization');
  const url = `https://api.notion.com/v1/pages/${slug}`;

  const data = {
    parent: {
      database_id: slug,
    },
    properties: {
      status: {
        type: 'checkbox',
        checkbox: false,
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
    const res = await axios.patch<NotionTodo>(url, data, {
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

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  const todoId = params.slug;
  const url = `https://api.notion.com/v1/pages/${todoId}`;
  const accessToken = request.cookies.get('accessToken')?.value;

  try {
    const response = await http.patch(
      url,
      {
        archived: true,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Notion-Version': '2022-06-28',
        },
      },
    );
    console.log(response);

    return NextResponse.json({ message: 'ok' });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
