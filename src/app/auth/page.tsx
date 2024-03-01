'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import type { Database } from '@/app/api/auth/interfaces';
import type { AuthRequestResponse } from '@/app/api/auth/route';
import type { DatabaseResponse } from '@/app/api/db/[pageId]/route';
import { Loading } from '@/shared/components';
import http from '@/shared/utils/fetch';

const REDIRECT_URL = 'https://kirook.vercel.app/auth';

export default function Auth() {
  const params = useSearchParams();
  const code = params.get('code');
  const router = useRouter();

  const authenticate = useCallback(async () => {
    const response = await http.post<AuthRequestResponse>('/api/auth', {
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URL,
    });

    const { accessToken, pageId } = response;
    if (accessToken) {
      const dbResponse = await http.get<DatabaseResponse>(`/api/db/${pageId}`, {
        headers: {
          Authorization: accessToken,
        },
      });
      const { databases } = dbResponse;
      setDatabase(databases);

      router.push('/todo');
    }
  }, [code, router]);

  useEffect(() => {
    if (!code) {
      alert('no code');
      router.push('/');
    }

    try {
      authenticate();
    } catch (err) {
      throw new Error('인증에 오류가 발생했습니다. 다시 시도해주세요');
    }
  }, [router, code, authenticate]);

  const setDatabase = (databases: Database[]) => {
    databases.forEach((db) => {
      switch (db.title) {
        case 'todo':
          localStorage.setItem('todo', db.id);
          return;
        case 'memo':
          localStorage.setItem('memo', db.id);
          return;
        case 'link':
          localStorage.setItem('link', db.id);
          return;
        default:
          return;
      }
    });
  };

  return <Loading type='fetching' />;
}
