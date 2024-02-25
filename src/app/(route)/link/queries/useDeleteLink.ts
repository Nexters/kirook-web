import { useMutation, useQueryClient } from '@tanstack/react-query';
import { linksKey } from './queryKey';
import { deleteLink } from '@/app/(route)/link/services/link';

export function useDeleteLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (linkId: string) => deleteLink(linkId),
    onSuccess: () => {
      // queryClient.invalidateQueries(linksKey.all);
    },
  });
}
