// useFetchListings.ts
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebaseConfig";
import { Opportunity } from "@/constants/types";
import { useListingStore } from "@/userStore/volListingStore";
import { useSearchStore } from "@/userStore/searchStore";

const useFetchListings = () => {
  const { clearOpportunities, addOpportunity } = useListingStore();
  const { clearSearchClicked } = useSearchStore();

  const fetchListings = async () => {
    // 1) clear any stale data
    clearOpportunities();
    clearSearchClicked();

    // 2) grab every doc in "opportunities"
    const snap = await getDocs(collection(firestore, "opportunities"));

    // 3) push each one into your Zustand store
    snap.forEach((d) => {
      const data = d.data() as Omit<Opportunity, "id">;

      if (data.isApproved) {
        addOpportunity({ id: d.id, ...data });
      }
    });
  };

  return { fetchListings };
};

export default useFetchListings;
