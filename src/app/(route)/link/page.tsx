'use client';

import { Fragment, useReducer, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { LinkList } from './components/LInkList';
import { FormValues, LinkCreateForm } from './components/LinkCreateForm';
import { LinkInput } from './components/LinkInput';
import { ALL_FILTER_ID } from './const';
import { linksKey } from './queries/queryKey';
import { useDeleteLink } from './queries/useDeleteLink';
import { useGetLinks } from './queries/useGetLinks';
import { scrapLink } from './services/link';
import { unionItemsBy } from './utils';
import { LinkItem } from '@/app/api/links/interface';
import { Button, Icon, Loading, Modal, Portal } from '@/shared/components';
import { TagFilter, TagFilterColors } from '@/shared/components/TagFilter';
import { Header } from '@/shared/components/layout/Header';

export default function LinkPage() {
  const queryClient = useQueryClient();
  const { isLoading, data: links } = useGetLinks();
  const { mutateAsync: deleteLink } = useDeleteLink();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedLinks, setSelectedLinks] = useState<Set<string>>(new Set());
  const [selectedFilterId, setSelectedFilterId] = useState(ALL_FILTER_ID);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [initialFormValue, setInitialFormValue] = useState<FormValues>({});
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const linkTextRef = useRef('');

  const combinedFilters = links ? unionItemsBy([...links.map(({ tags }) => tags)].flat(), 'name') : [];

  const selectFilter = (id: string) => {
    setSelectedFilterId(id);
  };

  const resetLinkText = () => {
    linkTextRef.current = '';
    // ref의 변화를 rendering하기 위해 실행
    forceUpdate();
  };

  const closeCreateForm = () => {
    setIsCreateFormOpen(false);
  };

  const toggleLinkSelectState = (id: string) => {
    const newSet = new Set(selectedLinks);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedLinks(newSet);
  };

  const deleteLinks = async () => {
    try {
      await Promise.all([Array.from(selectedLinks).map((id) => deleteLink(id))]);
      // queryClient.invalidateQueries(linksKey.all);
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditMode(false);
    }
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

  const handleClickEditCompleteButton = () => {
    setIsEditMode(false);
    setSelectedLinks(new Set());
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
          {links?.length && (
            <Fragment>
              <div className='no-scrollbar flex gap-2 overflow-hidden overflow-x-scroll py-2'>
                {[{ id: ALL_FILTER_ID, color: 'gray', name: 'ALL' }, ...combinedFilters].map(({ id, name, color }) => (
                  <TagFilter
                    key={id}
                    isSelected={id === selectedFilterId}
                    color={color as TagFilterColors}
                    onClick={() => selectFilter(id)}
                  >
                    {name}
                  </TagFilter>
                ))}
              </div>
              <div className='mt-[20px] flex justify-between'>
                <span className='text-body2 text-grayscale-600'>{links.length}개의 링크</span>
                {isEditMode ? (
                  <div className='flex items-center gap-2 text-body1'>
                    <button type='button' className='text-grayscale-900' onClick={() => deleteLinks()}>
                      삭제
                    </button>
                    <div className='h-[10px] w-[1px] bg-gray-400' />
                    <button type='button' className='text-accent-600' onClick={handleClickEditCompleteButton}>
                      완료
                    </button>
                  </div>
                ) : (
                  <button className='text-body1 text-grayscale-900' type='button' onClick={() => setIsEditMode(true)}>
                    편집하기
                  </button>
                )}
              </div>
            </Fragment>
          )}
        </div>
        <LinkList
          isEditMode={isEditMode}
          selectedLinks={selectedLinks}
          links={filterLinks(selectedFilterId, links || [])}
          toggleLinkSelectState={toggleLinkSelectState}
        />
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

function filterLinks(id: string, links: LinkItem[]) {
  if (id === ALL_FILTER_ID) {
    return links;
  }

  return links.filter((link) => link.tags.some((tag) => tag.id === id));
}
