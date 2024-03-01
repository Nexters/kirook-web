'use client';

import { LinkCreateForm } from '@/app/(route)/link/components/LinkCreateForm';
import { useGetLink } from '@/app/(route)/link/queries/useGetLink';

export default function LinkDetailPage({ params }: { params: { id: string } }) {
  const linkId = params.id;
  const { data: link } = useGetLink(linkId);

  const initialFormValue = {
    title: link.title,
    description: link.text,
    image: link.image,
    url: link.url,
    tags: link.tags,
  };

  return <LinkCreateForm linkId={link.id} editMode='update' initialFormValue={initialFormValue} />;
}
