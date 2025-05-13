import { View, Text } from "react-native";
import React from "react";
import { Opportunity } from "@/constants/types";
import { useOppStore } from "@/userStore/oppArrayStore";
import { useToast } from "../useToast";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { firestore } from "@/firebaseConfig";
const useCreateOpportunityforOrg = () => {
  const addOpportunity = useOppStore((state) => state.addOpportunity);
  const { showSuccessToast, showErrorToast } = useToast();
  const createOpportunityforOrg = async (opp: Opportunity): Promise<void> => {
    try {
      // Use setDoc with a custom document id (opp.id)
      // const docRef = await addDoc(collection(firestore, "opportunities"), opp);
      // console.log("Opportunity added with ID:", docRef.id);

      const docRef = doc(firestore, "opportunities", opp.id);
      await setDoc(docRef, opp);
      console.log("Opportunity added with custom ID:", opp.id);

      // Update local state to keep an array of opportunities
      addOpportunity(opp);
      showSuccessToast("Success", "Opportunity added successfully");
    } catch (error) {
      console.error("Error adding opportunity:", error);
      showErrorToast("Error", "Could not add opportunity");
    }
  };

  return { createOpportunityforOrg };
};

export default useCreateOpportunityforOrg;
