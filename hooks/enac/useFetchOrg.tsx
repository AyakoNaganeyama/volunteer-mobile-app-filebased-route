import { View, Text } from "react-native";
import React from "react";
import { useOrganisationStore } from "@/userStore/orgArrayStore";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebaseConfig";
import { Organisation } from "@/constants/types";

const useFetchOrg = () => {
  const setOrg = useOrganisationStore((state) => state.setOrgList);
  const getOrgList = async () => {
    try {
      const colRef = collection(firestore, "organisation");
      const snap = await getDocs(colRef);

      const orgs: Organisation[] = snap.docs.map((docSnap) => {
        const data = docSnap.data() as Omit<Organisation, "id">;
        return {
          id: docSnap.id,
          fullName: data.fullName,
          organisationName: data.organisationName,
          email: data.email,
        };
      });

      setOrg(orgs);

      snap.docs.forEach((docSnap) => {
        console.log(`Orgs [${docSnap.id}]:`, docSnap.data());
      });

      console.log();
    } catch (err) {
      console.error("Error fetching Orgs:", err);
    }
  };

  return { getOrgList };
};

export default useFetchOrg;
