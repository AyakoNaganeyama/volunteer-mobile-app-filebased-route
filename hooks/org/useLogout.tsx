import { View, Text } from "react-native";
import React from "react";
import { useOrgStore } from "@/userStore/orgStore";
import { useSignOut } from "react-firebase-hooks/auth";
import { authentication } from "@/firebaseConfig";
import { useToast } from "../useToast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEnactore } from "@/userStore/enacStore";

const useLogout = () => {
  const { clearOrg, org } = useOrgStore();
  const [signOut, loading, error] = useSignOut(authentication);
  const { showSuccessToast, showErrorToast } = useToast();
  const { enac, clearEnac } = useEnactore();

  const handleLogout = async () => {
    try {
      await signOut(); // Interact with Firebase

      //orglogout
      const storedOrgString = await AsyncStorage.getItem("org-info");
      if (storedOrgString !== null) {
        await AsyncStorage.removeItem("org-info"); // Remove from AsyncStorage
        clearOrg(); // Clear volunteer data from store
        console.log("Org logged out");
        console.log(org);
      }

      //Enac logout
      const storedEnacString = await AsyncStorage.getItem("enac-info");
      if (storedEnacString !== null) {
        await AsyncStorage.removeItem("enac-info"); // Remove from AsyncStorage
        clearEnac(); // Clear volunteer data from store
        console.log("Enac logged out");
        console.log(enac);
      }
    } catch (err) {
      showErrorToast("Logout error:", "error");
    }
  };

  return { handleLogout, loading, error };
};

export default useLogout;
