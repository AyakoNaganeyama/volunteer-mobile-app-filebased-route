// useApplicationsStore.ts
import { create } from "zustand";
import { Application } from "@/constants/types";

interface ApplicationsState {
  applications: Application[];
  closedApplication: Application[];
  addApplication: (app: Application) => void;
  addClosedApplication: (app: Application) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  removeApplication: (id: string) => void;
  clearApplications: () => void;
  clearClosedApplications: () => void;
}

export const useApplicationsStore = create<ApplicationsState>((set) => ({
  applications: [],
  closedApplication: [],

  addApplication: (app) =>
    set((state) => ({
      applications: [...state.applications, app],
    })),

  addClosedApplication: (app) =>
    set((state) => ({
      closedApplication: [...state.closedApplication, app],
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

  clearClosedApplications: () => set({ closedApplication: [] }),
}));
