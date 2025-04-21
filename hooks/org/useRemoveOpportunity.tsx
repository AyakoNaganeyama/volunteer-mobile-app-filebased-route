import { Opportunity } from "@/constants/types";
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "@/firebaseConfig";
import { useOpportunitiesStore } from "@/userStore/orgOpportunityStore";
import { useToast } from "../useToast";

const useRemoveOpportunity = () => {
  const removeFromStore = useOpportunitiesStore((s) => s.removeOpportunity);
  const { showSuccessToast, showErrorToast } = useToast();

  const deleteOpportunity = async (opp: Opportunity | null) => {
    if (!opp?.id) return;
    console.log("Deleting opportunity with id:", opp.id);

    try {
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
