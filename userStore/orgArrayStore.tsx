import { create } from "zustand";
import { Organisation } from "@/constants/types";

interface OrganisationListState {
  /** Array of all organisations in the store */
  orgList: Organisation[];
  /** Replace the entire organisation list */
  setOrgList: (organisations: Organisation[]) => void;
  /** Add a new organisation */
  addOrg: (organisation: Organisation) => void;
  /** Update an existing organisation by ID */
  updateOrg: (id: string, updatedData: Partial<Organisation>) => void;
  /** Remove an organisation by ID */
  removeOrg: (id: string) => void;
  /** Clear all organisations */
  clearOrg: () => void;
}

export const useOrganisationStore = create<OrganisationListState>((set) => ({
  orgList: [],

  setOrgList: (organisations) => set({ orgList: organisations }),

  addOrg: (organisation) =>
    set((state) => ({ orgList: [...state.orgList, organisation] })),

  updateOrg: (id, updatedData) =>
    set((state) => ({
      orgList: state.orgList.map((org) =>
        org.id === id ? { ...org, ...updatedData } : org
      ),
    })),

  removeOrg: (id) =>
    set((state) => ({
      orgList: state.orgList.filter((org) => org.id !== id),
    })),

  clearOrg: () => set({ orgList: [] }),
}));
