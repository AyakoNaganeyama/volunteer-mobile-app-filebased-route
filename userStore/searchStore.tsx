// stores/useSearchStore.ts
import { create } from "zustand";

interface SearchState {
  searchClicked: boolean;
  setSearchClicked: () => void;
  clearSearchClicked: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  // initial value
  searchClicked: false,

  // flip it to true
  setSearchClicked: () => set({ searchClicked: true }),

  // optionally flip back to false
  clearSearchClicked: () => set({ searchClicked: false }),
}));
