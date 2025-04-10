import { useSignOut } from "react-firebase-hooks/auth";
import { authentication } from "@/firebaseConfig";
import { useVolunteerStore } from "@/userStore/volSore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLogout = () => {
  const { clearVolunteer, volunteer } = useVolunteerStore();
  const [signOut, loading, error] = useSignOut(authentication);

  const handleLogout = async () => {
    try {
      await signOut(); // Interact with Firebase
      await AsyncStorage.removeItem("user-info"); // Remove from AsyncStorage
      clearVolunteer(); // Clear volunteer data from store
      console.log("User logged out");
      console.log(volunteer);
    } catch (err) {
      console.log("Logout error:", error);
    }
  };

  return { handleLogout, loading, error };
};

export default useLogout;
