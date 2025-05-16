import { useSignOut } from "react-firebase-hooks/auth";
import { authentication } from "@/firebaseConfig";
import { useVolunteerStore } from "@/userStore/volSore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "../useToast";
import { useApplicationsStore } from "@/userStore/volApplicationStore";
import { useFilterStore } from "@/userStore/useFilterStore";

const useLogout = () => {
  const { clearVolunteer, volunteer } = useVolunteerStore();
  const [signOut, loading, error] = useSignOut(authentication);
  const { showSuccessToast, showErrorToast } = useToast();
  const clearApplications = useApplicationsStore((s) => s.clearApplications);
  const { clearFilters } = useFilterStore();

  const handleLogout = async () => {
    try {
      clearFilters();
      await signOut(); // Interact with Firebase
      await AsyncStorage.removeItem("user-info"); // Remove from AsyncStorage
      clearVolunteer(); // Clear volunteer data from store
      console.log("User logged out");
      console.log(volunteer);
    } catch (err) {
      showErrorToast("Logout error:", "error");
    }
  };

  return { handleLogout, loading, error };
};

export default useLogout;
