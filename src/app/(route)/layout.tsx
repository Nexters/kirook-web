'use client';

import { Fragment } from 'react';
import { Navigation } from '@/shared/components';

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <div>{children}</div>
      <Navigation />
    </Fragment>
  );
}
