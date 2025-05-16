import { View, Text } from "react-native";
import React from "react";
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
import { Organisation } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useOrgStore } from "@/userStore/orgStore";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useToast } from "../useToast";
import { useState } from "react";
const useSignup = () => {
  const { showSuccessToast, showErrorToast } = useToast();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(authentication);
  const { setOrg, org } = useOrgStore();
  interface SignupInputs {
    fullName: string;
    orgName: string;
    email: string;
    pass: string;
  }

  const router = useRouter();
  const [passError, setPassError] = useState("");

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

  useEffect(() => {
    if (org) {
      console.log("Org state updated in store:", org.organisationName);
    }
  }, [org]);

  const signup = async (inputs: SignupInputs) => {
    if (!inputs.email || !inputs.pass || !inputs.orgName) {
      console.log("Error", "please fill all the fields", "error");
      showErrorToast("Error", "please fill all the (full name is optional)");
      return;
    }

    const pwError = validateComplexPassword(inputs.pass);
    if (pwError) {
      showErrorToast("Weak password", pwError);
      setPassError(pwError);
      return;
    }

    try {
      // this only checks if use name and pass exist
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.pass
      );
      if (!newUser && error) {
        console.log("Error", error.message, "error");
        showErrorToast("Error", "Please enter a valid email");
        return;
      }
      if (newUser) {
        const userDoc: Organisation = {
          id: newUser.user.uid,
          fullName: inputs.fullName,
          organisationName: inputs.orgName,
          email: inputs.email,
        };
        await setDoc(doc(firestore, "organisation", newUser.user.uid), userDoc);
        await AsyncStorage.setItem("org-info", JSON.stringify(userDoc));
        setOrg(userDoc);

        const storedUserString = await AsyncStorage.getItem("org-info");
        if (storedUserString !== null) {
          const storedUser = JSON.parse(storedUserString);
          console.log("AsyncStored org Name:", storedUser.organisationName);
        } else {
          console.log("No user info found in AsyncStorage.");
        }

        if (newUser) {
          router.replace("/org/(tabs)/one");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { signup, user, loading, error, passError };
};

export default useSignup;
