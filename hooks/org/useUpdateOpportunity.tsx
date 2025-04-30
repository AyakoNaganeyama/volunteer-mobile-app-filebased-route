import { Opportunity } from "@/constants/types";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebaseConfig";
import { useOpportunitiesStore } from "@/userStore/orgOpportunityStore";
import { useToast } from "../useToast";

const useUpdateOpportunity = () => {
  const updateStore = useOpportunitiesStore((s) => s.updateOpportunity);
  const { showSuccessToast, showErrorToast } = useToast();

  const updateOpportunity = async (form: Opportunity) => {
    try {
      const docRef = doc(firestore, "opportunities", form.id);
      await updateDoc(docRef, {
        title: form.title,
        description: form.description,
        location: form.location,
        category: form.category,
        commitmentPeriod: form.commitmentPeriod,
        registrationFormUrl: form.registrationFormUrl,
      });

      // update Zustand store
      updateStore(form.id, {
        title: form.title,
        description: form.description,
        location: form.location,
        category: form.category,
        commitmentPeriod: form.commitmentPeriod,
        registrationFormUrl: form.registrationFormUrl,
      });

      // success toast
      showSuccessToast("Opportunity updated successfully", form.title);
    } catch (error: any) {
      console.error("Failed to update opportunity:", error);
      showErrorToast(
        "Update failed",
        error.message || "An unexpected error occurred."
      );
    }
  };

  return { updateOpportunity };
};

export default useUpdateOpportunity;
