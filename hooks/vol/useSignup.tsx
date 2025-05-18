import { View, Text } from "react-native";
import React, { useState } from "react";
import { authentication, firestore } from "../../firebaseConfig";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Volunteer } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useVolunteerStore } from "@/userStore/volSore";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useToast } from "../useToast";
import { useNewUserStore } from "@/userStore/isNew";

const useSignup = () => {
  const { showSuccessToast, showErrorToast } = useToast();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(authentication);
  const { setVolunteer, volunteer } = useVolunteerStore();
  interface SignupInputs {
    fullName: string;
    email: string;
    pass: string;
  }

  const router = useRouter();
  const [passError, setPassError] = useState("");
  const { setNew } = useNewUserStore();

  useEffect(() => {
    if (volunteer) {
      console.log("Volunteer state updated:", volunteer.fullName);
    }
  }, [volunteer]);

  function validateComplexPassword(pw: string): string | null {
    if (pw.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (!/[a-z]/.test(pw)) {
      return "Lowercase character required.";
    }
    if (!/[A-Z]/.test(pw)) {
      return "Uppercase character required.";
    }
    if (!/[0-9]/.test(pw)) {
      return "Numeric character required.";
    }
    if (!/[^A-Za-z0-9]/.test(pw)) {
      return "Non-alphanumeric character required.";
    }
    return null; // all checks passed
  }

  const signup = async (inputs: SignupInputs) => {
    if (!inputs.email || !inputs.pass || !inputs.fullName) {
      console.log("Error", "please fill all the fields", "error");
      showErrorToast("Error", "please fill all the fields");
      return;
    }

    const pwError = validateComplexPassword(inputs.pass);
    if (pwError) {
      showErrorToast("Weak password", pwError);
      setPassError(pwError);
      return;
    }

    // checking if user has the same use name

    //     const usersRef = collection(firestore, "users");

    // const q = query(usersRef, where("userName", "==", inputs.userName));
    // const querySnapshot = await getDocs(q);

    // if(!querySnapshot.empty){

    // ShowToast("Error", "Username already exists", "error");
    // return;

    // }

    try {
      // this only checks if use name and pass exist
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.pass
      );
      if (!newUser && error) {
        // console.log("Error", error.message, "error");
        showErrorToast("Error", "An account with this email already exists.");
        return;
      }
      if (newUser) {
        const userDoc: Volunteer = {
          id: newUser.user.uid,
          fullName: inputs.fullName,
          email: inputs.email,
        };
        await setDoc(doc(firestore, "volunteer", newUser.user.uid), userDoc);
        await AsyncStorage.setItem("user-info", JSON.stringify(userDoc));
        setVolunteer(userDoc);

        const storedUserString = await AsyncStorage.getItem("user-info");
        if (storedUserString !== null) {
          const storedUser = JSON.parse(storedUserString);
          console.log("Stored User Full Name:", storedUser.fullName);
        } else {
          console.log("No user info found in AsyncStorage.");
        }

        if (newUser) {
          setNew();
          router.replace("/vol/(group)/one");
          showSuccessToast(`Welcome ${userDoc.fullName}`, userDoc.email);
        }
      }
    } catch (error) {
      showErrorToast("Something went wrong", "Error");
    }
  };

  return { signup, user, loading, error, passError };
};

export default useSignup;
