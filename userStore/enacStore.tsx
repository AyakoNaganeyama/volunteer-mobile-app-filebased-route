import { create } from "zustand";
import { Enac } from "@/constants/types";

interface EnacState {
  enac: Enac | null; // Initial state: no organisation selected/logged in
  setEnac: (enac: Enac) => void; // Function to set the organisation data
  clearEnac: () => void; // Function to clear the organisation data
}

export const useEnactore = create<EnacState>((set) => ({
  enac: null, // Initial state
  setEnac: (enac) => set({ enac }), // Set organisation data
  clearEnac: () => set({ enac: null }), // Clear organisation data
}));
