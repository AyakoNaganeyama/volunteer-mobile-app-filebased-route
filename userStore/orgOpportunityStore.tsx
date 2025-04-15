// useOpportunitiesStore.ts
import { create } from "zustand";
import { Opportunity } from "@/constants/types";

interface OpportunitiesState {
  opportunities: Opportunity[];
  addOpportunity: (opp: Opportunity) => void;
  clearOpportunities: () => void;
}

export const useOpportunitiesStore = create<OpportunitiesState>((set) => ({
  opportunities: [],
  addOpportunity: (opp) =>
    set((state) => ({ opportunities: [...state.opportunities, opp] })),
  clearOpportunities: () => set({ opportunities: [] }),
}));
