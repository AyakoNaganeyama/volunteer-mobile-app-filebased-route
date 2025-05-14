// useFetchListings.ts
import { getDocs, collection, Timestamp } from "firebase/firestore";
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
  const addClosedApplication = useApplicationsStore(
    (s) => s.addClosedApplication
  );
  const clearApplications = useApplicationsStore((s) => s.clearApplications);
  const clearClosedApplications = useApplicationsStore(
    (s) => s.clearClosedApplications
  );
  const { volunteer } = useVolunteerStore();

  const fetchListings = async () => {
    // 1) clear old data
    clearOpportunities();
    clearSearchClicked();
    clearApplications();
    clearClosedApplications();

    // 2) fetch all opportunities & build a lookup map
    const oppSnap = await getDocs(collection(firestore, "opportunities"));
    const oppMap = new Map<string, Opportunity>();
    oppSnap.forEach((doc) => {
      const data = doc.data() as Omit<Opportunity, "id">;
      // only store approved ones
      if (data.isApproved) {
        oppMap.set(doc.id, { id: doc.id, ...data });
      }
    });

    // 3) fetch all applications
    const appSnap = await getDocs(collection(firestore, "applications"));
    const appliedOppIds = new Set<string>();

    appSnap.forEach((doc) => {
      const raw = doc.data() as Omit<Application, "id">;

      // only for this volunteer
      if (!volunteer || raw.volunteer.id !== volunteer.id) return;

      // look up the fresh opportunity by ID
      const freshOpp = oppMap.get(raw.opportunity.id);
      if (!freshOpp) return; // no matching opp, skip

      // remember we've applied here
      appliedOppIds.add(freshOpp.id);

      // convert Firestore Timestamp → JS Date
      const appliedDate =
        raw.appliedDate instanceof Timestamp
          ? raw.appliedDate.toDate()
          : new Date(raw.appliedDate);

      // assemble a fully‐typed Application object
      const app: Application = {
        id: doc.id,
        opportunity: freshOpp, // <— fresh data
        volunteer: raw.volunteer,
        appliedDate,
        status: raw.status,
      };

      // branch on the live isOpen flag
      if (freshOpp.isOpen) {
        addApplication(app);
      } else {
        addClosedApplication(app);
      }
    });

    // 4) seed your “discover” list with any remaining, un-applied opps
    for (const [id, opp] of oppMap) {
      if (!appliedOppIds.has(id) && opp.isOpen) {
        addOpportunity(opp);
      }
    }
  };

  return { fetchListings };
};

export default useFetchListings;
