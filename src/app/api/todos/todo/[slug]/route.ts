import { NextRequest, NextResponse } from 'next/server';
import { Todo } from '@/app/api/todos/[slug]/route';
import { NotionTodo } from '@/app/api/todos/interfaces';
import http from '@/shared/utils/fetch';

// Update Todo
export async function PATCH(request: NextRequest, { params }: { params: { slug: string } }) {
  const todoId = params.slug;
  const body = await request.json();

  console.log(body);
  const accessToken = request.cookies.get('accessToken')?.value;
  const url = `https://api.notion.com/v1/pages/${todoId}`;

  const data = {
    properties: {
      status: {
        type: 'checkbox',
        checkbox: body.status,
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
    const response = await http.patch<NotionTodo>(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Notion-Version': '2022-06-28',
      },
    });

    const { id, properties } = response;
    return NextResponse.json<Todo>(
      {
        id,
        text: properties.text.title[0].plain_text,
        createdAt: properties.created_at.date.start,
        status: properties.status.checkbox,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
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

    return NextResponse.json({ message: 'ok', response });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
