import { NextResponse } from 'next/server';
import { LinkItem, LinkResponse, NotionLink, NotionLinkResponse } from '../interface';
import axios, { AxiosError } from 'axios';

export async function GET(request: Request, { params }: { params: { linkListId: string } }) {
  const slug = params.linkListId;

  const accessToken = request.headers.get('Authorization');
  const url = `https://api.notion.com/v1/databases/${slug}/query`;

  try {
    const resp = await axios.post<NotionLinkResponse>(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Notion-Version': '2022-06-28',
        },
      },
    );

    const links = resp.data.results.map<LinkItem>((link) => {
      const { tags, text, title, image, link: url } = link.properties;

      const { created_time } = link.properties['created_at'];

      return {
        id: link.id,
        tags: tags.multi_select,
        title: title.title[0].plain_text,
        text: text.rich_text[0].plain_text,
        createdAt: created_time,
        image: image.rich_text[0].text.content,
        url: url.rich_text[0].text.content,
      };
    });

    return NextResponse.json<LinkResponse>({ links });
  } catch (e) {
    const error = e as AxiosError;
    return NextResponse.json({ message: 'error', error: error.message });
  }
}

export async function POST(request: Request, { params }: { params: { linkListId: string } }) {
  const slug = params.linkListId;
  const body = await request.json();

  const accessToken = request.headers.get('Authorization');
  const url = 'https://api.notion.com/v1/pages';

  const data = {
    parent: {
      database_id: slug,
    },
    properties: {
      text: {
        type: 'rich_text',
        rich_text: [
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
      link: {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content: body.url,
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
            plain_text: body.url,
            href: body.url,
          },
        ],
      },
      image: {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content: body.image,
              link: body.image,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default',
            },
            plain_text: body.image,
            href: body.image,
          },
        ],
      },
      tags: {
        type: 'multi_select',
        multi_select: body.tgas,
      },
      title: {
        id: 'title',
        type: 'title',
        title: [
          {
            type: 'text',
            text: {
              content: body.title,
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
            plain_text: body.title,
            href: null,
          },
        ],
      },
    },
  };

  try {
    const res = await axios.post<NotionLink>(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Notion-Version': '2022-06-28',
      },
    });

    if (res.status === 200) {
      const { properties, id } = res.data;
      const { tags, text, title, image, link: url } = properties;
      const { created_time } = properties['created_at'];
      return NextResponse.json<LinkItem>({
        id,
        tags: tags.multi_select,
        title: title.title[0].plain_text,
        text: text.rich_text[0].plain_text,
        createdAt: created_time,
        image: image.rich_text[0].text.content,
        url: url.rich_text[0].text.content,
      });
    } else {
      return new Response('request failed', { status: 500 });
    }
  } catch (e) {
    const error = e as AxiosError;
    return NextResponse.json({ message: 'error', error: error.message });
  }
}
