'use client';

import { Fragment, useReducer, useRef, useState } from 'react';
import { LinkList } from './components/LInkList';
import { FormValues, LinkCreateForm } from './components/LinkCreateForm';
import { LinkInput } from './components/LinkInput';
import { useGetLinks } from './queries/useGetLinks';
import { scrapLink } from './services/link';
import { Button, Icon, Loading, Modal, Portal } from '@/shared/components';
import { TagFilter } from '@/shared/components/TagFilter';
import { Header } from '@/shared/components/layout/Header';

export default function LinkPage() {
  const { isLoading, data: links } = useGetLinks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [initialFormValue, setInitialFormValue] = useState<FormValues>({});
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const linkTextRef = useRef('');

  const resetLinkText = () => {
    linkTextRef.current = '';
    // ref의 변화를 rendering하기 위해 실행
    forceUpdate();
  };

  const closeCreateForm = () => {
    setIsCreateFormOpen(false);
  };

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

  if (isLoading)
    return (
      <Portal targetRoot='loading-root'>
        <Loading type='fetching' />
      </Portal>
    );

  return (
    <div style={{ height: `calc(100% - 86px)` }} className='flex flex-col'>
      <Header
        logoText='Link'
        leftSideButton={
          isCreateFormOpen && (
            <button className='flex' type='button' onClick={() => closeCreateForm()}>
              <Icon iconType='ChevronLeft' width={24} height={24} className='stroke-grayscale-900' />
            </button>
          )
        }
      />
      <div className='flex h-full flex-col overflow-hidden'>
        <div className='px-[15px] pb-[12px] pt-[12px]'>
          <LinkInput textRef={linkTextRef} onSubmit={handleSubmitLink} />
          <div className='mt-[32px] flex items-center justify-between'>
            <strong className='text-grayscale text-black'>내 링크 목록</strong>
          </div>
          {links && links.length > 0 && (
            <Fragment>
              <div className='no-scrollbar flex gap-2 overflow-hidden overflow-x-scroll py-2'>
                <TagFilter color='gray' isSelected onClick={() => {}}>
                  ALL
                </TagFilter>
              </div>
              <div className='mt-[20px] flex justify-between'>
                <span className='text-body2 text-grayscale-600'>{links.length}개의 링크</span>
                <button className='text-body1 text-grayscale-900' type='button'>
                  편집하기
                </button>
              </div>
            </Fragment>
          )}
        </div>
        <LinkList links={links} />
        {isCreateFormOpen && (
          <LinkCreateForm
            initialFormValue={initialFormValue}
            close={() => setIsCreateFormOpen(false)}
            resetLinkText={() => resetLinkText()}
          />
        )}
      </div>
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
