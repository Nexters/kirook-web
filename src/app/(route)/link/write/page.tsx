'use client';

import { useSearchParams } from 'next/navigation';
import { LinkCreateForm } from '@/app/(route)/link/components/LinkCreateForm';
import { useGetLink } from '@/app/(route)/link/queries/useGetLink';
import { Loading } from '@/shared/components';
import { useLinkFormValueStore } from '@/stores/useLinkFormValueStore';

export default function LinkWritePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { formValue } = useLinkFormValueStore();
  const { isLoading, data: link } = useGetLink(id);

  const initialFormValue = {
    title: link?.title,
    description: link?.text,
    image: link?.image,
    url: link?.url,
    tags: link?.tags,
  };

  if (isLoading) {
    return <Loading type='fetching' />;
  }

  return id ? (
    <LinkCreateForm editMode='update' linkId={id} initialFormValue={initialFormValue} />
  ) : (
    <LinkCreateForm editMode='create' initialFormValue={formValue} />
  );
}
