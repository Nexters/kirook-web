import type { LinkItem, LinkResponse, MultiSelect } from '@/app/api/links/interface';
import { LinkPreviewResponse } from '@/app/api/links/scraping/route';
import http from '@/shared/utils/fetch';

export async function getLinks(linkListId: string) {
  const response = await http.get<LinkResponse>(`/api/links/${linkListId}`);

  return response.links;
}

export async function createLink(
  payload: { text: string; title: string; url: string; image: string; tags: MultiSelect[] },
  linkListId?: string,
) {
  if (!linkListId) return {} as LinkItem;

  const response = await http.post<LinkItem>(`/api/links/${linkListId}`, {
    ...payload,
  });

  return response;
}

export async function deleteLink() {}

export async function scrapLink(url: string) {
  const response = await http.post<LinkPreviewResponse>(`/api/links/scraping`, {
    url,
  });

  return response;
}
