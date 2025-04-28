// stores/useFilterStore.ts
import { create } from "zustand";

interface FilterState {
  category: string;
  commitment: string;
  location: string;
  setCategory: (category: string) => void;
  setCommitment: (commitment: string) => void;
  setLocation: (location: string) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  category: "",
  commitment: "",
  location: "",

  setCategory: (category) => set({ category }),
  setCommitment: (commitment) => set({ commitment }),
  setLocation: (location) => set({ location }),

  clearFilters: () =>
    set({
      category: "",
      commitment: "",
      location: "",
    }),
}));
