import { cn } from '@/shared/utils/cn';
import { changwonDangamAsac } from '@/styles/fonts';

export default function LinkPage() {
  return (
    <div className='flex flex-col'>
      <h1 className={cn('text-logo mb-5 mt-[12px]', changwonDangamAsac.className)}>Link</h1>
    </div>
  );
}
