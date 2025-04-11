import { View, Text } from "react-native";
import React from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { authentication, firestore } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useVolunteerStore } from "@/userStore/volSore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Volunteer } from "@/constants/types";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useToast } from "../useToast";

const useLogin = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(authentication);
  const { setVolunteer, volunteer } = useVolunteerStore();
  const { showSuccessToast, showErrorToast } = useToast();
  const rounter = useRouter();

  useEffect(() => {
    if (volunteer) {
      console.log("Volunteer state updated:", volunteer.fullName);
    }
  }, [volunteer]);

  const login = async (inputs: { email: string; pass: string }) => {
    if (!inputs.email || !inputs.pass) {
      console.log("Error: please fill all the fields");
      showErrorToast("Error: please fill all the fields", "error");
      return;
    }

    try {
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.pass
      );
      if (userCred) {
        const docRef = doc(firestore, "volunteer", userCred.user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          console.log("Volunteer document does not exist");
          return;
        }

        const data = docSnap.data();
        // At this point, data is of type DocumentData, but we are sure it exists.
        // To satisfy TypeScript, we can cast it to Volunteer if the structure matches.
        const volunteerData: Volunteer = data as Volunteer;

        console.log(volunteerData.fullName);

        // Store the volunteer data in AsyncStorage and update the Zustand store.
        await AsyncStorage.setItem("user-info", JSON.stringify(volunteerData));

        const storedUserString = await AsyncStorage.getItem("user-info");
        if (storedUserString !== null) {
          const storedUser = JSON.parse(storedUserString);
          console.log("Stored User Full Name:", storedUser.fullName);
        } else {
          console.log("No user info found in AsyncStorage.");
        }

        setVolunteer(volunteerData);

        console.log("Volunteer logged in:", volunteerData.fullName);

        if (userCred) {
          rounter.replace("/vol/(group)/one");
        }
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return { login, user, loading, error };
};

export default useLogin;
