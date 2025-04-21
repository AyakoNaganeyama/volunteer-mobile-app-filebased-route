// useFetchListings.ts
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebaseConfig";
import { Opportunity } from "@/constants/types";
import { useListingStore } from "@/userStore/volListingStore";

const useFetchListings = () => {
  const { clearOpportunities, addOpportunity } = useListingStore();

  const fetchListings = async () => {
    // 1) clear any stale data
    clearOpportunities();

    // 2) grab every doc in "opportunities"
    const snap = await getDocs(collection(firestore, "opportunities"));

    // 3) push each one into your Zustand store
    snap.forEach((d) => {
      const data = d.data() as Omit<Opportunity, "id">;
      addOpportunity({ id: d.id, ...data });
    });
  };

  return { fetchListings };
};

export default useFetchListings;
