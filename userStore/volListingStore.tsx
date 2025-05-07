// useOpportunitiesStore.ts
import { create } from "zustand";
import { Opportunity } from "@/constants/types";

interface OpportunitiesState {
  opportunities: Opportunity[]; // original copy
  filteredOpportunities: Opportunity[];
  addOpportunity: (opp: Opportunity) => void;
  setFilteredOpportunity: (opp: Opportunity) => void;

  clearOpportunities: () => void;
  clearFiltered: () => void;
  setFilteredAll: () => void;
  removeOpportunity: (id: string) => void;
}

export const useListingStore = create<OpportunitiesState>((set) => ({
  opportunities: [],
  filteredOpportunities: [],

  addOpportunity: (opp) =>
    set((state) => ({
      opportunities: [...state.opportunities, opp],
    })),

  setFilteredOpportunity: (opp) =>
    set((state) => ({
      filteredOpportunities: [...state.filteredOpportunities, opp],
    })),

  clearOpportunities: () => set({ opportunities: [] }),
  clearFiltered: () => set({ filteredOpportunities: [] }),

  setFilteredAll: () =>
    set((state) => ({
      filteredOpportunities: [...state.opportunities],
    })),
  removeOpportunity: (id: string) =>
    set((state) => ({
      opportunities: state.opportunities.filter((o) => o.id !== id),
    })),
}));
