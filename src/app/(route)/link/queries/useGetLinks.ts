import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { linksKey } from './queryKey';
import { getLinks } from '@/app/(route)/link/services/link';

export function useGetLinks() {
  const [linkListId, setLinkListId] = useState<string>();

  useEffect(() => {
    const id = localStorage.getItem('link');
    if (!id) return;

    setLinkListId(id);
  }, []);

  return useQuery({
    ...linksKey.all,
    queryFn: () => getLinks(linkListId!),
    enabled: !!linkListId,
  });
}
