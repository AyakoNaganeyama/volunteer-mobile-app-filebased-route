import { View, Text } from "react-native";
import React from "react";
import { useApplicationListStore } from "@/userStore/enacApplicationStore";
import { useOppStore } from "@/userStore/oppArrayStore";
import { Opportunity } from "@/constants/types";
import { useRouter } from "expo-router";
import { useToast } from "../useToast";
import {
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { firestore } from "@/firebaseConfig";

const useDeleteOpportunity = () => {
  const { removeApplication } = useApplicationListStore();
  const { removeOpportunity } = useOppStore();
  const router = useRouter();
  const { showSuccessToast, showErrorToast } = useToast();

  const deleteOpportunity = async (opp: Opportunity | null) => {
    if (!opp?.companyId) {
      // nothing to navigate to
      return;
    }
    console.log(opp?.title);

    try {
      const appsQuery = query(
        collection(firestore, "applications"),
        where("opportunity.id", "==", opp.id)
      );
      const appsSnap = await getDocs(appsQuery);

      // 2) delete each matching application (Firestore + Zustand)
      // for (const appDoc of appsSnap.docs) {
      //   // remove in Firestore
      //   await deleteDoc(doc(firestore, "applications", appDoc.id));
      //   // remove in your local store
      //   removeAppFromStore(appDoc.id);
      // }

      if (!appsSnap.empty) {
        for (const appDoc of appsSnap.docs) {
          await deleteDoc(doc(firestore, "applications", appDoc.id));
          removeApplication(appDoc.id);
        }
      } else {
        console.log("No applications to delete");
      }

      // Delete from Firestore
      await deleteDoc(doc(firestore, "opportunities", opp.id));
      // Remove from Zustand store
      removeOpportunity(opp.id);
      // console.log("Deleted successfully");
      showSuccessToast("Deleted successfully", opp.title);
    } catch (err) {
      showErrorToast("Error deleting opportunity:", "error");
    }

    // await router.push({
    //   pathname: "/enac/listofEachorg/[id]",
    //   params: { id: opp.companyId },
    // });
  };
  return { deleteOpportunity };
};

export default useDeleteOpportunity;
