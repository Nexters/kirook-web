'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Database } from '../api/auth/interfaces';
import { DatabaseResponse } from '../api/db/[pageId]/route';
import axios, { AxiosResponse } from 'axios';

const redirectUri = 'https://kirook.vercel.app/auth';

export default function Auth() {
  const params = useSearchParams();
  const code = params.get('code');
  const [token, setToken] = useState('');
  const [pageId, setPageId] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleCodePost = async () => {
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
      setToken(accessToken);
      setPageId(pageId);
    };

    if (code) {
      handleCodePost();
    }
  }, [code]);

  useEffect(() => {
    const handleDBLookup = async () => {
      try {
        const res = await axios.get<DatabaseResponse>(`/api/db/${pageId}`, {
          headers: {
            Authorization: token,
          },
        });

        if (res.status !== 200) {
          console.log(res.status, res.data);
          throw new Error('fetch failed');
        }

        const { databases } = res.data;
        setDatabase(databases);

        router.push('/todo');
      } catch (e) {
        console.log(e);
      }
    };
    if (token && pageId) {
      setTimeout(() => {
        handleDBLookup();
      }, 1000);
    }
  }, [token, pageId, router]);

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
    </section>
  );
}
