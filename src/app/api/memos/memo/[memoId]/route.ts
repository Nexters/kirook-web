import { NextResponse } from 'next/server';
import { Memo, NotionMemo } from '../../[memoListId]/interface';
import axios, { AxiosError } from 'axios';

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
    const res = await axios.patch<NotionMemo>(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Notion-Version': '2022-06-28',
      },
    });
    if (res.status === 200) {
      const { properties } = res.data;
      const { tags, text, title } = properties;
      const { created_time } = properties['Created time'];
      return NextResponse.json<Memo>({
        tags: tags.multi_select,
        text: text.rich_text[0].plain_text,
        title: title.title[0].plain_text,
        createdAt: created_time,
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
