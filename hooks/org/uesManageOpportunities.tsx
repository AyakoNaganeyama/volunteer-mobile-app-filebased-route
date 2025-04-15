import { collection, doc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useToast } from "../useToast";
import { Opportunity } from "@/constants/types";
import { firestore } from "@/firebaseConfig";

const useManageOpportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const { showSuccessToast, showErrorToast } = useToast();

  useEffect(() => {
    console.log("list", opportunities);
  }, [opportunities]);
  // This function adds the opportunity to Firestore using a custom document ID,
  // then updates local state.
  const createOpportunity = async (opp: Opportunity): Promise<void> => {
    try {
      // Use setDoc with a custom document id (opp.id)
      //   await setDoc(doc(firestore, "opportunities", opp.id), opp);
      console.log("Opportunity added with custom ID:", opp);

      // Update local state to keep an array of opportunities
      setOpportunities((prev) => [...prev, opp]);
      showSuccessToast("Success", "Opportunity added successfully");
    } catch (error) {
      console.error("Error adding opportunity:", error);
      showErrorToast("Error", "Could not add opportunity");
      throw error;
    }
  };

  return { createOpportunity, opportunities };
};

export default useManageOpportunities;
