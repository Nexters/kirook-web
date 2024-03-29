import { useQuery } from '@tanstack/react-query';
import { linksKey } from './queryKey';
import { getLink } from '@/app/(route)/link/services/link';

export function useGetLink(linkId: string | null) {
  return useQuery({
    ...linksKey.detail(linkId!),
    queryFn: async () => getLink(linkId!),
    enabled: !!linkId,
  });
}
