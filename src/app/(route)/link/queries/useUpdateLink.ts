import { useMutation, useQueryClient } from '@tanstack/react-query';
import { linksKey } from './queryKey';
import { updateLink } from '@/app/(route)/link/services/link';
import { MultiSelect } from '@/app/api/links/interface';

export function useUpdateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      linkId: string;
      text: string;
      title: string;
      url: string;
      image: string;
      tags: MultiSelect[];
    }) => {
      const { linkId, ...rest } = params;
      return updateLink(linkId, rest);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(linksKey.all);
    },
  });
}
