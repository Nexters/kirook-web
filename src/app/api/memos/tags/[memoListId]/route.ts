import { NextRequest, NextResponse } from 'next/server';
import { MultiSelectOption, NotionMemo } from '../../[mmid]/interface';
import axios, { AxiosError } from 'axios';

export async function GET(request: NextRequest, { params }: { params: { memoId: string } }) {
  const slug = params.memoId;
  const url = `https://api.notion.com/v1/pages/${slug}`;

  const accessToken = request.headers.get('Authorization');
  try {
    const resp = await axios.get<NotionMemo>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Notion-Version': '2022-06-28',
      },
    });

    const { properties } = resp.data;
    const { tags } = properties;

    return NextResponse.json<MultiSelectOption[]>(tags.multi_select);
  } catch (e) {
    const error = e as AxiosError;
    return new Response(error.message, {
      status: error.status,
    });
  }
}
