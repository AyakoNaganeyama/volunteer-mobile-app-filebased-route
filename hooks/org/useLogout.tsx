import { View, Text } from "react-native";
import React from "react";
import { useOrgStore } from "@/userStore/orgStore";
import { useSignOut } from "react-firebase-hooks/auth";
import { authentication } from "@/firebaseConfig";
import { useToast } from "../useToast";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLogout = () => {
  const { clearOrg, org } = useOrgStore();
  const [signOut, loading, error] = useSignOut(authentication);
  const { showSuccessToast, showErrorToast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(); // Interact with Firebase
      await AsyncStorage.removeItem("org-info"); // Remove from AsyncStorage
      clearOrg(); // Clear volunteer data from store
      console.log("Org logged out");
      console.log(org);
    } catch (err) {
      showErrorToast("Logout error:", "error");
    }
  };

  return { handleLogout, loading, error };
};

export default useLogout;
