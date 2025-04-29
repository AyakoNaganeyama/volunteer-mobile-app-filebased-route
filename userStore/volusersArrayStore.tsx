import { create } from "zustand";
import { Volunteer } from "@/constants/types";

interface VolunteerListState {
  /** Array of all volunteers in the store */
  volunteerList: Volunteer[];
  /** Replace the entire volunteer list */
  setVolunteerList: (volunteers: Volunteer[]) => void;
  /** Add a new volunteer */
  addVolunteer: (volunteer: Volunteer) => void;
  /** Update an existing volunteer by ID */
  updateVolunteer: (id: string, updatedData: Partial<Volunteer>) => void;
  /** Remove a volunteer by ID */
  removeVolunteer: (id: string) => void;
  /** Clear all volunteers */
  clearVolunteers: () => void;
}

export const useVolunteerListStore = create<VolunteerListState>((set) => ({
  volunteerList: [],

  setVolunteerList: (volunteers) => set({ volunteerList: volunteers }),

  addVolunteer: (volunteer) =>
    set((state) => ({
      volunteerList: [...state.volunteerList, volunteer],
    })),

  updateVolunteer: (id, updatedData) =>
    set((state) => ({
      volunteerList: state.volunteerList.map((v) =>
        v.id === id ? { ...v, ...updatedData } : v
      ),
    })),

  removeVolunteer: (id) =>
    set((state) => ({
      volunteerList: state.volunteerList.filter((v) => v.id !== id),
    })),

  clearVolunteers: () => set({ volunteerList: [] }),
}));
