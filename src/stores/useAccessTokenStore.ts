import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AccessTokenState {
  accessToken: string | null;

  setAccessToken: (token: string) => void;
}

export const useAccessTokenStore = create(
  persist<AccessTokenState>(
    (set) => ({
      accessToken: null,

      setAccessToken: (token: string) => set({ accessToken: token }),
    }),
    {
      name: 'accessToken',
    },
  ),
);
