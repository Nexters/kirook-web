import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type FormEventHandler, Fragment, MutableRefObject, useRef, useState } from 'react';
import ContentEditable, { type ContentEditableEvent } from 'react-contenteditable';
import { LinkTagCreateModal, type PaletteColors } from './LinkTagCreateModal';
import { useCreateLink } from '@/app/(route)/link/queries/useCreateLink';
import { useUpdateLink } from '@/app/(route)/link/queries/useUpdateLink';
import type { MultiSelect } from '@/app/api/links/interface';
import DefaultOGImage from '@/assets/images/og-image.png';
import { Confirm, Icon, Tag } from '@/shared/components';
import { Alert } from '@/shared/components/Alert';
import { Header } from '@/shared/components/layout/Header';
import { useModal } from '@/shared/components/modal/useModal';
import { toKRDateString } from '@/shared/utils/date';
import { useToastShowStore } from '@/stores/useToastShowStore';
import { v4 as uuidv4 } from 'uuid';

type EditMode = 'create' | 'update';

interface TagType {
  id: string;
  name: string;
  color: PaletteColors;
}
export interface FormValues {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  tags?: MultiSelect[];
}
interface LinkCreateFormProps {
  editMode?: EditMode;
  linkId?: string;
  initialFormValue: FormValues;
}

export function LinkCreateForm({ editMode, linkId, initialFormValue }: LinkCreateFormProps) {
  const router = useRouter();
  const { openModal } = useModal();
  const { mutate: createLink } = useCreateLink();
  const { mutate: updateLink } = useUpdateLink();
  const { setToastShow } = useToastShowStore();

  const { title, description, image, url, tags: initialTags } = initialFormValue;
  const tagList = (initialTags || []) as TagType[];
  const [tags, setTags] = useState<Array<TagType>>([...tagList]);

  const titleRef = useRef(title || '');
  const descriptionRef = useRef(description || '');

  const goBack = async () => {
    const currentFormValue = {
      title: titleRef.current,
      description: descriptionRef.current,
      image,
      url,
      tags: tags.map((tag) => ({ id: tag.id, name: tag.name, color: tag.color })),
    };

    if (!isUpdated(initialFormValue, currentFormValue)) {
      router.back();
      return;
    }

    const isConfirm = await openModal<boolean>((close) => (
      <Confirm
        title='삭제하실건가요?'
        message='뒤로가기 시 작성한 내용은 저장되지 않아요'
        close={() => close(false)}
        confirm={() => close(true)}
      />
    ));

    if (isConfirm) {
      router.back();
    }
  };

  const addTag = (tagName: string, tagColor: PaletteColors) => {
    setTags((prev) => [{ id: uuidv4(), name: tagName, color: tagColor }, ...prev]);
  };

  const openLinkTagCreateModal = async () => {
    await openModal((close) => (
      <LinkTagCreateModal close={() => close(false)} onCreateTag={(tagName, tagColor) => addTag(tagName, tagColor)} />
    ));
  };

  const removeTag = (id: string) => {
    setTags((tags) => tags.filter((tag) => tag.id !== id));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!url) {
      await openModal((close) => (
        <Alert message='링크가 존재하지 않습니다. 링크를 입력해주세요' close={() => close(true)} />
      ));
      router.push('/link');
      return;
    }

    if (!titleRef.current || !descriptionRef.current) {
      await openModal((close) => <Alert message='내용을 입력해 주세요' close={() => close(true)} />);
      return;
    }

    if (editMode === 'create') {
      createLink({
        text: descriptionRef.current,
        title: titleRef.current,
        url: url || '',
        image: image || '',
        tags: tags.map((tag) => ({ id: tag.id, name: tag.name, color: tag.color })),
      });
    } else {
      if (!linkId) {
        return;
      }

      updateLink({
        linkId,
        text: descriptionRef.current,
        title: titleRef.current,
        url: url || '',
        image: image || '',
        tags: tags.map((tag) => ({ id: tag.id, name: tag.name, color: tag.color })),
      });
    }

    setToastShow();
    router.push('/link');
  };

  return (
    <Fragment>
      <form className='absolute left-0 top-0 h-full w-full bg-white' onSubmit={handleSubmit}>
        <Header
          logoText='Link'
          leftSideButton={
            <button className='flex' type='button' onClick={() => goBack()}>
              <Icon iconType='ChevronLeft' width={24} height={24} className='stroke-grayscale-900' />
            </button>
          }
          rightSideButton={
            <button className='justify-self-end text-title1 text-accent-600' type='submit'>
              저장
            </button>
          }
        />
        <div className='overflow-y-scroll px-[15px] pt-5' style={{ height: `calc(100% - 86px - 44px)` }}>
          <span className='text-body2 text-grayscale-700 '>{toKRDateString(new Date())}</span>
          <Link href={url!} passHref target='_blank'>
            <p className='my-3 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-text text-grayscale-600'>
              {url}
            </p>
          </Link>
          <div className='relative h-[182px] w-full overflow-hidden'>
            <Image
              src={image || DefaultOGImage}
              className='rounded object-cover'
              alt='og-image'
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              priority
              quality={100}
            />
          </div>
          <div className='mt-[28px] flex flex-col gap-5 *:flex *:flex-col [&_label]:text-title1'>
            <div>
              <label>제목</label>
              <Input textRef={titleRef} />
            </div>
            <div>
              <label>내용</label>
              <Input textRef={descriptionRef} />
            </div>
            <div>
              <label>태그</label>
              <div
                className='flex cursor-pointer items-center justify-between rounded bg-grayscale-100 px-[13px] py-2 text-title3'
                onClick={() => openLinkTagCreateModal()}
              >
                <input
                  className='bg-transparent text-grayscale-600 outline-none'
                  placeholder='태그를 입력해주세요'
                  readOnly
                />
                <button type='button'>
                  <Add />
                </button>
              </div>
              <div className='mt-3 flex flex-wrap gap-2 py-2'>
                {tags.map((tag) => (
                  <Tag key={tag.id} color={tag.color}>
                    {tag.name}
                    <button type='button' onClick={() => removeTag(tag.id)}>
                      <Icon iconType='XMono' width={14} height={14} />
                    </button>
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
}

interface InputProps {
  textRef: MutableRefObject<string>;
}

function Input({ textRef }: InputProps) {
  const handleChange = (e: ContentEditableEvent) => {
    textRef.current = e.target.value;
  };

  return (
    <ContentEditable
      className='rounded py-2 text-title3 text-grayscale-900 outline-none transition-colors duration-300 focus:bg-grayscale-50'
      html={textRef.current}
      onChange={handleChange}
    />
  );
}

function Add() {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M0 12.0873C0 5.36056 5.13803 1 12 1C18.862 1 24 5.36056 24 12.0873C24 18.8479 18.862 23.2084 12 23.2084C5.13803 23.2084 0 18.8817 0 12.0873Z'
        fill='#CDCED6'
      />
      <mask
        id='mask0_390_4058'
        style={{ maskType: 'luminance' }}
        maskUnits='userSpaceOnUse'
        x='3'
        y='3'
        width='18'
        height='18'
      >
        <rect x='3' y='3' width='18' height='18' fill='white' />
      </mask>
      <g mask='url(#mask0_390_4058)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M12.9886 11.1V5.84995C12.9886 5.61126 12.8938 5.38234 12.725 5.21356C12.5562 5.04477 12.3273 4.94995 12.0886 4.94995C11.8499 4.94995 11.621 5.04477 11.4522 5.21356C11.2834 5.38234 11.1886 5.61126 11.1886 5.84995V11.1H5.93857C5.69988 11.1 5.47096 11.1948 5.30218 11.3636C5.1334 11.5323 5.03857 11.7613 5.03857 12C5.03857 12.2386 5.1334 12.4676 5.30218 12.6363C5.47096 12.8051 5.69988 12.9 5.93857 12.9H11.1886V18.15C11.1886 18.3886 11.2834 18.6176 11.4522 18.7863C11.621 18.9551 11.8499 19.0499 12.0886 19.0499C12.3273 19.0499 12.5562 18.9551 12.725 18.7863C12.8938 18.6176 12.9886 18.3886 12.9886 18.15V12.9H18.2386C18.4773 12.9 18.7062 12.8051 18.875 12.6363C19.0438 12.4676 19.1386 12.2386 19.1386 12C19.1386 11.7613 19.0438 11.5323 18.875 11.3636C18.7062 11.1948 18.4773 11.1 18.2386 11.1H12.9886Z'
          fill='#858899'
        />
      </g>
    </svg>
  );
}

function isUpdated(prev: FormValues, current: FormValues) {
  return Object.keys(prev).some((key) => {
    if (key === 'tags') {
      const prevTags = prev['tags']?.map((tag) => tag.id).toSorted();
      const currentTags = current['tags']?.map((tag) => tag.id).toSorted();
      console.log(prevTags, currentTags);
      return JSON.stringify(prevTags) !== JSON.stringify(currentTags);
    }

    return prev[key as keyof FormValues] !== current[key as keyof FormValues];
  });
}
