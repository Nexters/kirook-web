import { LinkBox } from './LinkBox';
import { type LinkItem } from '@/app/api/links/interface';

interface LinkListProps {
  links?: LinkItem[];
}

export function LinkList({ links }: LinkListProps) {
  const isLinksEmpty = !links || links.length === 0;

  return (
    <div className='flex grow flex-col items-center overflow-y-scroll bg-grayscale-50 px-[15px] pt-[20px]'>
      {links?.map((link) => (
        <LinkBox
          key={link.id}
          title={link.title}
          content={link.text}
          createdAt={link.createdAt}
          imageSrc={link.image}
          tags={link.tags}
        />
      ))}
      {isLinksEmpty && <p className='mt-[158px] text-title3 text-grayscale-700'>아직 스크랩한 링크가 없어요</p>}
    </div>
  );
}
