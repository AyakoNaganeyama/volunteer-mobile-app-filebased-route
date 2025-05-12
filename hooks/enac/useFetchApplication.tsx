import { View, Text } from "react-native";
import React from "react";
import { useApplicationListStore } from "@/userStore/enacApplicationStore";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebaseConfig";
import { Application } from "@/constants/types";

const useFetchApp = () => {
  const setApp = useApplicationListStore((state) => state.setApplicationList);
  const getAppList = async () => {
    try {
      const colRef = collection(firestore, "applications");
      const snap = await getDocs(colRef);

      const apps: Application[] = snap.docs.map((docSnap) => {
        const data = docSnap.data() as Omit<Application, "id">;
        return {
          id: docSnap.id,
          opportunity: data.opportunity,
          volunteer: data.volunteer,
          appliedDate: data.appliedDate,
          status: data.status,
        };
      });

      setApp(apps);

      snap.docs.forEach((docSnap) => {
        console.log(`Apps [${docSnap.id}]:`, docSnap.data());
      });

      console.log();
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  return { getAppList };
};

export default useFetchApp;
