import { create } from "zustand";

interface FilterState {
  category: string;
  commitment: string;
  location: string;
  fromDate: Date | null;
  toDate: Date | null;
  setCategory: (category: string) => void;
  setCommitment: (commitment: string) => void;
  setLocation: (location: string) => void;
  setFromDate: (fromDate: Date | null) => void;
  setToDate: (toDate: Date | null) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  category: "",
  commitment: "",
  location: "",
  fromDate: null,
  toDate: null,

  setCategory: (category) => set({ category }),
  setCommitment: (commitment) => set({ commitment }),
  setLocation: (location) => set({ location }),
  setFromDate: (fromDate) => set({ fromDate }),
  setToDate: (toDate) => set({ toDate }),

  clearFilters: () =>
    set({
      category: "",
      commitment: "",
      location: "",
      fromDate: null,
      toDate: null,
    }),
}));
