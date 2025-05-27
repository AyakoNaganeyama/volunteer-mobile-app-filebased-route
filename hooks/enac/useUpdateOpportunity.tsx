import { Opportunity } from "@/constants/types";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebaseConfig";

import { useToast } from "../useToast";
import { useOppStore } from "@/userStore/oppArrayStore";

const useUpdateOpportunity = () => {
  const updateStore = useOppStore((s) => s.updateOpportunity);
  const { showSuccessToast, showErrorToast } = useToast();

  const update = async (form: Opportunity) => {
    try {
      const docRef = doc(firestore, "opportunities", form.id);
      await updateDoc(docRef, {
        title: form.title,
        description: form.description,
        location: form.location,
        category: form.category,
        commitmentPeriod: form.commitmentPeriod,
        registrationFormUrl: form.registrationFormUrl,
        isOpen: form.isOpen,
      });

      // update Zustand store
      updateStore(form.id, {
        title: form.title,
        description: form.description,
        location: form.location,
        category: form.category,
        commitmentPeriod: form.commitmentPeriod,
        registrationFormUrl: form.registrationFormUrl,
        isOpen: form.isOpen,
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

  return { update };
};

export default useUpdateOpportunity;
