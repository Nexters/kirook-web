import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { linksKey } from './queryKey';
import { createLink } from '@/app/(route)/link/services/link';
import { MultiSelect } from '@/app/api/links/interface';

export function useCreateLink() {
  const queryClient = useQueryClient();
  const [linkListId, setLinkListId] = useState<string>();

  useEffect(() => {
    const id = localStorage.getItem('link');
    if (!id) return;

    setLinkListId(id);
  }, []);

  return useMutation({
    mutationFn: (payload: { text: string; title: string; url: string; image: string; tags: MultiSelect[] }) =>
      createLink(payload, linkListId),
    onSuccess: () => {
      queryClient.invalidateQueries(linksKey.all);
    },
  });
}
