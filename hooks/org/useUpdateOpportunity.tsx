import { Opportunity } from "@/constants/types";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebaseConfig";
import { useOpportunitiesStore } from "@/userStore/orgOpportunityStore";
import { useToast } from "../useToast";

const useUpdateOpportunity = () => {
  const update = useOpportunitiesStore((s) => s.updateOpportunity);

  const updateOpportunity = async (form: Opportunity) => {
    const docRef = doc(firestore, "opportunities", form.id);
    await updateDoc(docRef, {
      title: form.title,
      description: form.description,
      location: form.location,
      category: form.category,
      commitmentPeriod: form.commitmentPeriod,
      registrationFormUrl: form.registrationFormUrl,
    });

    update(form.id, {
      title: form.title,
      description: form.description,
      location: form.location,
      category: form.category,
      commitmentPeriod: form.commitmentPeriod,
      registrationFormUrl: form.registrationFormUrl,
    });
  };

  return { updateOpportunity };
};

export default useUpdateOpportunity;
