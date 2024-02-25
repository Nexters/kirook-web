import { createQueryKeys } from '@lukemorales/query-key-factory';

export const linksKey = createQueryKeys('links', {
  all: null,
  detail: (id: string) => [id],
});
