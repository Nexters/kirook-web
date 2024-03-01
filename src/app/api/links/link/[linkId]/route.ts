import { NextRequest, NextResponse } from 'next/server';
import { LinkItem, NotionLink } from '../../interface';
import axios, { AxiosError } from 'axios';

export async function GET(request: NextRequest, { params }: { params: { linkId: string } }) {
  const slug = params.linkId;
  const reqUrl = `https://api.notion.com/v1/pages/${slug}`;

  const accessToken = request.cookies.get('accessToken')?.value;
  try {
    const resp = await axios.get<NotionLink>(reqUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Notion-Version': '2022-06-28',
      },
    });

    const { id, properties } = resp.data;
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
  } catch (e) {
    const error = e as AxiosError;
    return new Response(error.message, {
      status: error.status,
    });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { linkId: string } }) {
  const slug = params.linkId;
  const body = await request.json();

  const accessToken = request.cookies.get('accessToken')?.value;
  const url = `https://api.notion.com/v1/pages/${slug}`;

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
              link:
                body.image.length > 0
                  ? {
                      url: body.image,
                    }
                  : null,
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
        multi_select: body.tags.map((tag: { name: string; color: string }) => ({ name: tag.name, color: tag.color })),
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
    const res = await axios.patch<NotionLink>(url, data, {
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
    return new Response(error.message, {
      status: error.status,
    });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { linkId: string } }) {
  const slug = params.linkId;
  const url = `https://api.notion.com/v1/pages/${slug}`;

  const accessToken = request.cookies.get('accessToken')?.value;
  try {
    const resp = await axios.patch<NotionLink>(
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

    if (resp.status === 200) {
      return NextResponse.json({ message: 'ok' });
    } else {
      return new Response('request failed', { status: resp.status });
    }
  } catch (e) {
    const error = e as AxiosError;
    return new Response(error.message, {
      status: error.status,
    });
  }
}
