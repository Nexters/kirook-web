import { create } from 'zustand';

interface State {
  isToastShow: boolean;
}

interface Action {
  setToastShow(): void;
  reset(): void;
}

const initialState = {
  isToastShow: false,
};

export const useToastShowStore = create<State & Action>((set) => ({
  ...initialState,

  setToastShow: () => set({ isToastShow: true }),
  reset: () => set(initialState),
}));
