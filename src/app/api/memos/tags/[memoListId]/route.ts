import { NextRequest, NextResponse } from 'next/server';
import { MultiSelectOption, NotionTag } from '../../[memoListId]/interface';
import axios, { AxiosError } from 'axios';

export async function GET(request: NextRequest, { params }: { params: { memoListId: string } }) {
  const slug = params.memoListId;
  const url = `https://api.notion.com/v1/databases/${slug}`;

  const accessToken = request.headers.get('Authorization');
  try {
    const resp = await axios.get<NotionTag>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Notion-Version': '2022-06-28',
      },
    });

    const { properties } = resp.data;
    const { options } = properties.tags.multi_select;
    const tagList = options.map(({ color, name, id }) => ({ color, name, id }));

    return NextResponse.json<Omit<MultiSelectOption, 'description'>[]>(tagList);
  } catch (e) {
    const error = e as AxiosError;
    console.log(error.message, error.code, error.toJSON());
    return new Response(error.message, {
      status: error.status,
    });
  }
}
