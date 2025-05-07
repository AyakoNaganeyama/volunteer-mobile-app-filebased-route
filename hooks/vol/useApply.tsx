import { View, Text } from "react-native";
import React from "react";
import { useVolunteerStore } from "@/userStore/volSore";
import { Opportunity, Volunteer, Application } from "@/constants/types";
import uuid from "react-native-uuid";
import { useApplicationsStore } from "@/userStore/volApplicationStore";
import { useEffect } from "react";
import { useToast } from "../useToast";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { firestore } from "@/firebaseConfig";

const useApply = () => {
  const { volunteer } = useVolunteerStore();
  const addApplication = useApplicationsStore((s) => s.addApplication);
  const { applications } = useApplicationsStore();
  const { showSuccessToast, showErrorToast } = useToast();

  useEffect(() => {
    console.log("application store", applications);
  }, [applications]);

  const applyOpportunity = async (opportunity: Opportunity) => {
    try {
      if (!volunteer) {
        throw new Error("No volunteer is logged in");
      }

      const application: Application = {
        id: uuid.v4() as string,
        opportunity,
        volunteer,
        appliedDate: new Date(),
        status: "pending",
      };

      //firestore

      await setDoc(doc(firestore, "applications", application.id), application);
      addApplication(application);
      showSuccessToast("Applied successfully", opportunity.title);
    } catch (err: any) {
      console.error("Firestore write failed:", err);
      showErrorToast("Failed to apply", err.message);
    }
  };

  return { applyOpportunity };
};

export default useApply;
