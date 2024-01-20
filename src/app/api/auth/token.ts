import type { NextApiRequest, NextApiResponse } from 'next';
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

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const encoded = Buffer.from(`${process.env.OAUTH_CLIENT_ID}:${process.env.OAUTH_CLIENT_SECRET}`).toString('base64');

  try {
    const resp = await axios.post<any, AxiosResponse<Resp>>('https://api.notion.com/v1/oauth/token', req.body, {
      headers: {
        Authorization: `Basic ${encoded}`,
      },
    });

    res.status(200).json(resp.data);
  } catch (e) {
    res.status(401).json({ message: 'failed' });
  }
}
