import { useOppStore } from "@/userStore/oppArrayStore";
import { useToast } from "../useToast";
import { Opportunity } from "@/constants/types";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebaseConfig";
import { useRouter } from "expo-router";

const useApproveOpportunity = () => {
  const updateOpportunity = useOppStore((s) => s.updateOpportunity);
  const { showSuccessToast, showErrorToast } = useToast();
  const router = useRouter();

  const approveOpportunity = async (opp: Opportunity) => {
    try {
      const ref = doc(firestore, "opportunities", opp.id);
      await updateDoc(ref, { isApproved: true });

      updateOpportunity(opp.id, { isApproved: true });
      showSuccessToast("Opportunity Approved", opp.title);

      // only navigate on success
      router.push("/enac/opportunityApproval");
    } catch (err: any) {
      console.error("Failed to approve opportunity:", err);
      showErrorToast(
        "Update failed",
        err.message || "An unexpected error occurred."
      );
    }
  };

  return { approveOpportunity };
};

export default useApproveOpportunity;
