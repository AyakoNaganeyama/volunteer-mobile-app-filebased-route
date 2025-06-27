import { Opportunity } from "@/constants/types";
import {
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { firestore } from "@/firebaseConfig";
import { useOpportunitiesStore } from "@/userStore/orgOpportunityStore";
import { useToast } from "../useToast";
import { useApplicationListStore } from "@/userStore/orgApplicationStore";

const useRemoveOpportunity = () => {
  const removeFromStore = useOpportunitiesStore((s) => s.removeOpportunity);
  const removeAppFromStore = useApplicationListStore(
    (s) => s.removeApplication
  );
  const { showSuccessToast, showErrorToast } = useToast();

  const deleteOpportunity = async (opp: Opportunity | null) => {
    if (!opp?.id) return;
    console.log("Deleting opportunity with id:", opp.id);

    try {
      const appsQuery = query(
        collection(firestore, "applications"),
        where("opportunity.id", "==", opp.id)
      );
      const appsSnap = await getDocs(appsQuery);

      // for (const appDoc of appsSnap.docs) {
      //   // remove in Firestore
      //   await deleteDoc(doc(firestore, "applications", appDoc.id));
      //   // remove in your local store
      //   removeAppFromStore(appDoc.id);
      // }

      if (!appsSnap.empty) {
        for (const appDoc of appsSnap.docs) {
          await deleteDoc(doc(firestore, "applications", appDoc.id));
          removeAppFromStore(appDoc.id);
        }
      } else {
        console.log("No applications to delete");
      }

      // Delete from Firestore
      await deleteDoc(doc(firestore, "opportunities", opp.id));
      // Remove from Zustand store
      removeFromStore(opp.id);
      // console.log("Deleted successfully");
      showSuccessToast("Deleted successfully", opp.title);
    } catch (err) {
      showErrorToast("Error deleting opportunity:", "error");
    }
  };

  return { deleteOpportunity }; //test
};

export default useRemoveOpportunity;
