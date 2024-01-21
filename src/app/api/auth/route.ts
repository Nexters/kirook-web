import { NextResponse } from 'next/server';

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
  const reqBody = Response.json({ res });
  try {
    // const resp = await axios.post<any, AxiosResponse<Resp>>('https://api.notion.com/v1/oauth/token', req.body, {
    //   headers: {
    //     Authorization: `Basic ${encoded}`,
    //   },
    // });
    const resp = await fetch('https://api.notion.com/v1/oauth/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${encoded}`,
      },
      body: JSON.stringify(reqBody),
    });
    const data = await resp.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(null);
  }
}
