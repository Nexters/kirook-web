import { createQueryKeys } from '@lukemorales/query-key-factory';

export const links = createQueryKeys('links', {
  all: null,
  detail: (id: string) => [id],
});
