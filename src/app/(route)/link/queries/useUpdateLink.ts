import { useMutation, useQueryClient } from '@tanstack/react-query';
import { linksKey } from './queryKey';
import { updateLink } from '@/app/(route)/link/services/link';

export function useUpdateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (linkId: string) => updateLink(linkId),
    onSuccess: () => {
      queryClient.invalidateQueries(linksKey.all);
    },
  });
}
