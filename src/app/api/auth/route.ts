import { NextResponse } from 'next/server';
import axios, { AxiosResponse } from 'axios';

interface Resp {
  access_token: string;
  bot_id: string;
  duplicated_template_id?: string;
  owner: any;
  workspace_icon?: string;
  workspace_id: string;
  workspace_name?: string;
}

export async function POST(request: Request) {
  const encoded = Buffer.from(`${process.env.OAUTH_CLIENT_ID}:${process.env.OAUTH_CLIENT_SECRET}`).toString('base64');
  const res = await request.json();
  try {
    const resp = await axios.post<any, AxiosResponse<Resp>>('https://api.notion.com/v1/oauth/token', res, {
      headers: {
        Authorization: `Basic ${encoded}`,
      },
    });
    return NextResponse.json(resp.data);
  } catch (e) {
    return NextResponse.json(e);
  }
}
