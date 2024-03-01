import { useSuspenseQuery } from '@tanstack/react-query';
import { linksKey } from './queryKey';
import { getLink } from '@/app/(route)/link/services/link';

export function useGetLink(linkId: string) {
  return useSuspenseQuery({
    ...linksKey.detail(linkId),
    queryFn: async () => getLink(linkId),
  });
}
