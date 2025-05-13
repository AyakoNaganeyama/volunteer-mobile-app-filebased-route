// hooks/org/useFetchOpportunities.ts
import { useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/firebaseConfig";
import { Opportunity } from "@/constants/types";
import { useOpportunitiesStore } from "@/userStore/orgOpportunityStore";
import { useOrgStore } from "@/userStore/orgStore";
import { useApplicationListStore } from "@/userStore/orgApplicationStore";
import { Application } from "@/constants/types";

export const useFetchOpportunities = () => {
  const { clearOpportunities, addOpportunity } = useOpportunitiesStore();
  const { org } = useOrgStore();
  const setApp = useApplicationListStore((state) => state.setApplicationList);
  const { clearApplications } = useApplicationListStore();

  const fetchOpportunities = async () => {
    clearOpportunities();
    clearApplications();

    // if we don't have an org ID yet, bail
    if (!org?.id) return;

    try {
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

      // fetching applications

      const colRef2 = collection(firestore, "applications");
      const snap2 = await getDocs(colRef2);

      const apps: Application[] = snap2.docs.map((docSnap) => {
        const data = docSnap.data() as Omit<Application, "id">;
        return {
          id: docSnap.id,
          opportunity: data.opportunity,
          volunteer: data.volunteer,
          appliedDate: data.appliedDate,
          status: data.status,
        };
      });

      setApp(apps);

      snap.docs.forEach((docSnap) => {
        console.log(`Apps [${docSnap.id}]:`, docSnap.data());
      });
    } catch (error) {
      console.error("Error fetching opportunities or applications:", error);
    }
  };

  return { fetchOpportunities };
};
