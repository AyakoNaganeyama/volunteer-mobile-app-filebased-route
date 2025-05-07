// useFetchListings.ts
import { useEffect } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { firestore } from "@/firebaseConfig";
import { Application, Opportunity } from "@/constants/types";
import { useListingStore } from "@/userStore/volListingStore";
import { useSearchStore } from "@/userStore/searchStore";
import { useApplicationsStore } from "@/userStore/volApplicationStore";
import { useVolunteerStore } from "@/userStore/volSore";

const useFetchListings = () => {
  const { clearOpportunities, addOpportunity } = useListingStore();
  const { clearSearchClicked } = useSearchStore();
  const addApplication = useApplicationsStore((s) => s.addApplication);
  const clearApplications = useApplicationsStore((s) => s.clearApplications);
  const { volunteer } = useVolunteerStore();

  const fetchListings = async () => {
    // 1) clear any stale data
    clearOpportunities();
    clearSearchClicked();
    clearApplications();

    // 2) grab every doc in "opportunities"
    const snap = await getDocs(collection(firestore, "opportunities"));
    const snap2 = await getDocs(collection(firestore, "applications"));

    // 3) push each one into your Zustand store

    const appliedOppIds = new Set<string>();

    snap2.forEach((a) => {
      const raw = a.data() as Omit<Application, "id">;
      // only add if this application belongs to the logged-in volunteer
      if (volunteer && raw.volunteer.id === volunteer.id) {
        appliedOppIds.add(raw.opportunity.id);

        // also seed application store
        const appliedDate =
          raw.appliedDate instanceof Timestamp
            ? raw.appliedDate.toDate()
            : new Date(raw.appliedDate);
        addApplication({ id: a.id, ...raw, appliedDate });
      }
    });

    snap.forEach((d) => {
      const data = d.data() as Omit<Opportunity, "id">;

      if (data.isApproved && !appliedOppIds.has(d.id)) {
        addOpportunity({ id: d.id, ...data });
      }
    });
  };

  return { fetchListings };
};

export default useFetchListings;
