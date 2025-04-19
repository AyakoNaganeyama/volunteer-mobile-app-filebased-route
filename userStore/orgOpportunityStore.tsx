// useOpportunitiesStore.ts
import { create } from "zustand";
import { Opportunity } from "@/constants/types";

interface OpportunitiesState {
  opportunities: Opportunity[];
  addOpportunity: (opp: Opportunity) => void;
  updateOpportunity: (id: string, updates: Partial<Opportunity>) => void;
  removeOpportunity: (id: string) => void;
  clearOpportunities: () => void;
}

export const useOpportunitiesStore = create<OpportunitiesState>((set) => ({
  opportunities: [],

  addOpportunity: (opp) =>
    set((state) => ({
      opportunities: [...state.opportunities, opp],
    })),

  updateOpportunity: (id, updates) =>
    set((state) => ({
      opportunities: state.opportunities.map((o) =>
        o.id === id ? { ...o, ...updates } : o
      ),
    })),

  removeOpportunity: (id) =>
    set((state) => ({
      opportunities: state.opportunities.filter((o) => o.id !== id),
    })),

  clearOpportunities: () => set({ opportunities: [] }),
}));
