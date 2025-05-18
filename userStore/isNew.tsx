// stores/useSearchStore.ts
import { create } from "zustand";

interface NewUserState {
  isNew: boolean;
  setNew: () => void;
  clearNew: () => void;
}

export const useNewUserStore = create<NewUserState>((set) => ({
  // initial value
  isNew: false,

  // flip it to true
  setNew: () => set({ isNew: true }),

  // optionally flip back to false
  clearNew: () => set({ isNew: false }),
}));
