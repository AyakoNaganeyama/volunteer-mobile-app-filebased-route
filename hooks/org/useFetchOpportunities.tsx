// hooks/org/useFetchOpportunities.ts
import { useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/firebaseConfig";
import { Opportunity } from "@/constants/types";
import { useOpportunitiesStore } from "@/userStore/orgOpportunityStore";
import { useOrgStore } from "@/userStore/orgStore";

export const useFetchOpportunities = () => {
  const { clearOpportunities, addOpportunity } = useOpportunitiesStore();
  const { org } = useOrgStore();

  const fetchOpportunities = async () => {
    clearOpportunities();

    // if we don't have an org ID yet, bail
    if (!org?.id) return;

    // build a query that only returns this org's opportunities
    const q = query(
      collection(firestore, "opportunities"),
      where("companyId", "==", org.id)
    );

    const snap = await getDocs(q);
    snap.forEach((doc) => {
      const data = doc.data() as Omit<Opportunity, "id">;
      addOpportunity({ id: doc.id, ...data });
    });
  };

  return { fetchOpportunities };
};
