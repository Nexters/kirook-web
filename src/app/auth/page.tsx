'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import React from 'react';
import { AuthResponse } from '../api/auth/route';
import axios, { AxiosResponse } from 'axios';

const redirectUri = 'https://kkirook.vercel.app/auth';

export default function Auth() {
  const params = useSearchParams();
  const code = params.get('code');

  const handlePost = async () => {
    if (!code) {
      alert('no code');
      return;
    }

    const res = await axios.post<any, AxiosResponse<AuthResponse>>('/api/auth', {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
    });

    const { accessToken, databases } = res.data;
    if (accessToken && databases.length) {
      alert('성공했습니다');
      localStorage.setItem('access_token', accessToken);
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
    }
    // TODO:
    /**
     * access_token 등으로 todolist 추가하는 로직
     */
  };

  useEffect(() => {
    handlePost();
  }, [code]);

  return (
    <section className='h-full w-full p-6'>
      <div>auth succeed</div>
    </section>
  );
}
