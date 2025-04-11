import { create } from "zustand";
import { Organisation } from "@/constants/types";

interface OrgState {
  org: Organisation | null; // Initial state: no organisation selected/logged in
  setOrg: (org: Organisation) => void; // Function to set the organisation data
  clearOrg: () => void; // Function to clear the organisation data
}

export const useOrgStore = create<OrgState>((set) => ({
  org: null, // Initial state
  setOrg: (org) => set({ org }), // Set organisation data
  clearOrg: () => set({ org: null }), // Clear organisation data
}));
