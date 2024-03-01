import { FormValues } from '@/app/(route)/link/components/LinkCreateForm';
import { create } from 'zustand';

interface State {
  formValue: FormValues;
}

interface Action {
  setFormValue(value: Partial<FormValues>): void;
  reset(): void;
}

const initialState = {
  formValue: {
    title: '',
    description: '',
    url: '',
    image: '',
    tags: [],
  },
};

export const useLinkFormValueStore = create<State & Action>((set) => ({
  ...initialState,

  setFormValue: (newValue) => set((state) => ({ ...state, formValue: { ...state.formValue, ...newValue } })),
  reset: () => set(initialState),
}));
