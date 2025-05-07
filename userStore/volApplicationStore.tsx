// useApplicationsStore.ts
import { create } from "zustand";
import { Application } from "@/constants/types";

interface ApplicationsState {
  applications: Application[];
  addApplication: (app: Application) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  removeApplication: (id: string) => void;
  clearApplications: () => void;
}

export const useApplicationsStore = create<ApplicationsState>((set) => ({
  applications: [],

  addApplication: (app) =>
    set((state) => ({
      applications: [...state.applications, app],
    })),

  updateApplication: (id, updates) =>
    set((state) => ({
      applications: state.applications.map((a) =>
        a.id === id ? { ...a, ...updates } : a
      ),
    })),

  removeApplication: (id) =>
    set((state) => ({
      applications: state.applications.filter((a) => a.id !== id),
    })),

  clearApplications: () => set({ applications: [] }),
}));
