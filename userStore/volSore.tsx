import { create } from "zustand";
import { Volunteer } from "@/constants/types";

interface VolunteerState {
  volunteer: Volunteer | null; // Initial state: no volunteer selected/logged in
  setVolunteer: (volunteer: Volunteer) => void; // Function to set the volunteer data
  clearVolunteer: () => void; // Function to clear the volunteer data
}

export const useVolunteerStore = create<VolunteerState>((set) => ({
  volunteer: null, // Initial state
  setVolunteer: (volunteer) => set({ volunteer }), // Set volunteer data
  clearVolunteer: () => set({ volunteer: null }), // Clear volunteer data
}));
