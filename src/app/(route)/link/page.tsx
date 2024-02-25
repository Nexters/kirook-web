'use client';

import { Fragment, useState } from 'react';
import { LinkList } from './components/LInkList';
import { LinkBox } from './components/LinkBox';
import { FormValues, LinkCreateForm } from './components/LinkCreateForm';
import { LinkInput } from './components/LinkInput';
import { useGetLinks } from './queries/useGetLinks';
import { scrapLink } from './services/link';
import { Button, Loading, Modal, Portal } from '@/shared/components';
import { TagFilter } from '@/shared/components/TagFilter';
import { Header } from '@/shared/components/layout/Header';

export default function LinkPage() {
  const { isLoading, data: links } = useGetLinks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [initialFormValue, setInitialFormValue] = useState<FormValues>({});

  const handleSubmitLink = async (link: string) => {
    if (link.length === 0) {
      return;
    }

    const response = await scrapLink(link);

    setInitialFormValue({
      ...response,
      link,
    });
    setIsCreateFormOpen(true);
  };

  return (
    <div className='flex h-full flex-col'>
      <Header logoText='Link' showBackButton={isCreateFormOpen} />
      <div className='relative flex h-full flex-col'>
        <div className='px-[15px] pb-[12px] pt-[12px]'>
          <LinkInput onSubmit={handleSubmitLink} />
          <div className='mt-[32px] flex items-center justify-between'>
            <strong className='text-grayscale text-black'>내 링크 목록</strong>
          </div>
          {links && links.length > 0 && (
            <Fragment>
              <div className='no-scrollbar flex gap-2 overflow-hidden overflow-x-scroll py-2'>
                <TagFilter color='red' isSelected onClick={() => {}}>
                  tag filter
                </TagFilter>
                <TagFilter color='yellow' onClick={() => {}}>
                  tag filter
                </TagFilter>
                <TagFilter color='green' onClick={() => {}}>
                  tag filter
                </TagFilter>
                <TagFilter color='blue' onClick={() => {}}>
                  tag filter
                </TagFilter>
                <TagFilter color='purple' onClick={() => {}}>
                  tag filter
                </TagFilter>
              </div>
              <div className='mt-[20px] flex justify-between'>
                <span className='text-body2 text-grayscale-600'>n개의 링크</span>
                <button className='text-body1 text-grayscale-900' type='button'>
                  편집하기
                </button>
              </div>
            </Fragment>
          )}
        </div>
        <LinkList links={links} />
        {isCreateFormOpen && <LinkCreateForm initialFormValue={initialFormValue} />}
      </div>
      {isLoading && (
        <Portal targetRoot='loading-root'>
          <Loading type='fetching' />
        </Portal>
      )}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title='유효하지 않은 링크입니다'
          message='링크를 다시 확인해주세요'
          close={() => setIsModalOpen(false)}
          firstButton={
            <Button color='secondary' onClick={() => setIsModalOpen(false)}>
              확인
            </Button>
          }
        />
      )}
    </div>
  );
}
