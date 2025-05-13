import { create } from "zustand";
import { Application } from "@/constants/types";

interface ApplicationListState {
  /** Array of all applications in the store */
  ApplicationList: Application[];
  /** Replace the entire application list */
  setApplicationList: (applications: Application[]) => void;
  /** Add a new application */
  addApplication: (application: Application) => void;
  /** Update an existing application by ID */
  updateApplication: (id: string, updatedData: Partial<Application>) => void;
  /** Remove an application by ID */
  removeApplication: (id: string) => void;
  /** Clear all applications */
  clearApplications: () => void;
}

export const useApplicationListStore = create<ApplicationListState>((set) => ({
  ApplicationList: [],

  setApplicationList: (applications) => set({ ApplicationList: applications }),

  addApplication: (application) =>
    set((state) => ({
      ApplicationList: [...state.ApplicationList, application],
    })),

  updateApplication: (id, updatedData) =>
    set((state) => ({
      ApplicationList: state.ApplicationList.map((app) =>
        app.id === id ? { ...app, ...updatedData } : app
      ),
    })),

  removeApplication: (id) =>
    set((state) => ({
      ApplicationList: state.ApplicationList.filter((app) => app.id !== id),
    })),

  clearApplications: () => set({ ApplicationList: [] }),
}));
