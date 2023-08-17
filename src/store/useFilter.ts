import { create } from 'zustand';

interface Filter {
  filter: string;
  setFilter: (value: string) => void;
}

export const useFilter = create<Filter>()((set => ({
  filter: 'all',
  setFilter: (value) => set({ filter: value })
})));