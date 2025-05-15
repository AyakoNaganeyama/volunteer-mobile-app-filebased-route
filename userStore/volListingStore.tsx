// useOpportunitiesStore.ts
import { create } from "zustand";
import { Opportunity } from "@/constants/types";

interface OpportunitiesState {
  opportunities: Opportunity[]; // original copy
  filteredOpportunities: Opportunity[];
  wholeOpportunities: Opportunity[];
  addOpportunity: (opp: Opportunity) => void;
  addWholeOpportunity: (opp: Opportunity) => void;
  setFilteredOpportunity: (opp: Opportunity) => void;

  clearOpportunities: () => void;
  clearFiltered: () => void;
  setFilteredAll: () => void;
  removeOpportunity: (id: string) => void;
  clearWholeOpportunities: () => void;
}

export const useListingStore = create<OpportunitiesState>((set) => ({
  opportunities: [],
  filteredOpportunities: [],
  wholeOpportunities: [],

  addOpportunity: (opp) =>
    set((state) => ({
      opportunities: [...state.opportunities, opp],
    })),

  addWholeOpportunity: (opp) =>
    set((state) => ({
      wholeOpportunities: [...state.wholeOpportunities, opp],
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

  clearWholeOpportunities: () => set({ wholeOpportunities: [] }),
}));
