'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Database } from '../api/auth/interfaces';
import { DatabaseResponse } from '../api/db/[pageId]/route';
import axios, { AxiosResponse } from 'axios';

const redirectUri = 'https://kirook.vercel.app/auth';

export default function Auth() {
  const params = useSearchParams();
  const code = params.get('code');
  const router = useRouter();

  const handlePost = async () => {
    if (!code) {
      alert('no code');
      return;
    }

    const res = await axios.post<any, AxiosResponse<any>>('/api/auth', {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
    });

    const { accessToken, pageId } = res.data;
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('pageId', pageId);

      const res = await axios.get<DatabaseResponse>(`/api/db/${pageId}`, {
        headers: {
          Authorization: accessToken,
        },
      });

      const { databases } = res.data;
      setDatabase(databases);

      router.push('/todo');
    }
    // TODO:
    /**
     * access_token 등으로 todolist 추가하는 로직
     */
  };

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
      <button onClick={handlePost}>click</button>
    </section>
  );
}
