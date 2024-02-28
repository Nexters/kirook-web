import { LinkBox } from './LinkBox';
import { type LinkItem } from '@/app/api/links/interface';

interface LinkListProps {
  isEditMode: boolean;
  selectedLinks: Set<string>;
  links?: LinkItem[];
  toggleLinkSelectState(id: string): void;
}

export function LinkList({ isEditMode, selectedLinks, links, toggleLinkSelectState }: LinkListProps) {
  const isLinksEmpty = !links || links.length === 0;

  return (
    <div className='flex grow flex-col items-center overflow-y-scroll bg-grayscale-50 px-[15px] pt-[20px]'>
      {links?.map((link) => (
        <LinkBox
          key={link.id}
          isSelected={selectedLinks.has(link.id)}
          isEditMode={isEditMode}
          title={link.title}
          content={link.text}
          createdAt={link.createdAt}
          imageSrc={link.image}
          tags={link.tags}
          link={link.url}
          selectLink={() => toggleLinkSelectState(link.id)}
        />
      ))}
      {isLinksEmpty && <p className='mt-[158px] text-title3 text-grayscale-700'>아직 스크랩한 링크가 없어요</p>}
    </div>
  );
}
