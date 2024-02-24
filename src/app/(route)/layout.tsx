import { Navigation } from '@/shared/components';

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Navigation />
    </>
  );
}
