'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import type { Database } from '@/app/api/auth/interfaces';
import type { AuthRequestResponse } from '@/app/api/auth/route';
import type { DatabaseResponse } from '@/app/api/db/[pageId]/route';
import http from '@/shared/utils/fetch';

const REDIRECT_URL = 'https://kirook.vercel.app/auth';

export default function Auth() {
  const params = useSearchParams();
  const code = params.get('code');
  const [token, setToken] = useState('');
  const [pageId, setPageId] = useState('');
  const router = useRouter();

  // useEffect(() => {
  //   const handleCodePost = async () => {
  //     if (!code) {
  //       alert('no code');
  //       return;
  //     }

  //     const res = await axios.post<any, AxiosResponse<any>>('/api/auth', {
  //       grant_type: 'authorization_code',
  //       code: code,
  //       redirect_uri: redirectUri,
  //     });

  //     const { accessToken, pageId } = res.data;

  //     localStorage.setItem('accessToken', accessToken);
  //     setToken(accessToken);
  //     setPageId(pageId);
  //   };

  //   if (code) {
  //     handleCodePost();
  //   }
  // }, [code]);

  // useEffect(() => {
  //   const handleDBLookup = async () => {
  //     try {
  //       const res = await axios.get<DatabaseResponse>(`/api/db/${pageId}`, {
  //         headers: {
  //           Authorization: token,
  //         },
  //       });

  //       if (res.status !== 200) {
  //         console.log(res.status, res.data);
  //         throw new Error('fetch failed');
  //       }

  //       const { databases } = res.data;
  //       setDatabase(databases);

  //       router.push('/todo');
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   if (token && pageId) {
  //     setTimeout(() => {
  //       handleDBLookup();
  //     }, 1000);
  //   }
  // }, [token, pageId, router]);
  const authenticate = useCallback(async () => {
    const response = await http.post<AuthRequestResponse>('/api/auth', {
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URL,
    });

    const { accessToken, pageId } = response;
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);

      const dbResponse = await http.get<DatabaseResponse>(`/api/db/${pageId}`, {
        headers: {
          Authorization: accessToken,
        },
      });
      const { databases } = dbResponse;
      setDatabase(databases);

      router.push('todo');
    }
  }, [code, router]);

  useEffect(() => {
    if (!code) {
      alert('no code');
      return;
    }

    authenticate();
  }, [code, authenticate]);

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

  return (
    <section className='h-full w-full p-6'>
      <div>auth succeed</div>
      <button className='text-green-500' onClick={() => authenticate()}>
        연동완료
      </button>
    </section>
  );
}
