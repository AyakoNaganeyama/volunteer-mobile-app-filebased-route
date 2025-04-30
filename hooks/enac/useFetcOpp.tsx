import { View, Text } from "react-native";
import React from "react";
import { Opportunity } from "@/constants/types";
import { useOppStore } from "@/userStore/oppArrayStore";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebaseConfig";

const useFetcOpp = () => {
  const setOppList = useOppStore((s) => s.setOppList);

  const getOppList = async () => {
    try {
      const colRef = collection(firestore, "opportunities");
      const snap = await getDocs(colRef);

      const opps: Opportunity[] = snap.docs.map((docSnap) => {
        const data = docSnap.data() as Omit<Opportunity, "id">;
        return {
          id: docSnap.id,
          title: data.title,
          companyName: data.companyName,
          description: data.description,
          isApproved: data.isApproved,
          location: data.location,
          category: data.category,
          commitmentPeriod: data.commitmentPeriod,
          registrationFormUrl: data.registrationFormUrl,
          imageURL: data.imageURL,
          date: data.date,
          companyId: data.companyId,
          isOpen: data.isOpen,
        };
      });

      setOppList(opps);

      snap.docs.forEach((docSnap) => {
        console.log(`Opps [${docSnap.id}]:`, docSnap.data());
      });

      console.log();
    } catch (err) {
      console.error("Error fetching Opps:", err);
    }
  };

  return { getOppList };
};

export default useFetcOpp;
