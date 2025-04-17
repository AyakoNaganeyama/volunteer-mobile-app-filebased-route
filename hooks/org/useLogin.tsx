import { View, Text } from "react-native";
import React from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { authentication, firestore } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useOrgStore } from "@/userStore/orgStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Organisation } from "@/constants/types";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useToast } from "../useToast";
const useLogin = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(authentication);
  const { setOrg, org } = useOrgStore();
  const { showSuccessToast, showErrorToast } = useToast();
  const rounter = useRouter();

  useEffect(() => {
    if (org) {
      console.log("Volunteer state updated:", org.organisationName);
    }
  }, [org]);

  const login = async (inputs: { email: string; pass: string }) => {
    if (!inputs.email || !inputs.pass) {
      console.log("Error: please fill all the fields");
      showErrorToast("Error", "please fill all the fields");

      return;
    }

    try {
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.pass
      );
      if (userCred) {
        const docRef = doc(firestore, "organisation", userCred.user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          console.log("org document does not exist");

          return;
        }

        const data = docSnap.data();
        // At this point, data is of type DocumentData, but we are sure it exists.
        // To satisfy TypeScript, we can cast it to Volunteer if the structure matches.
        const orgData: Organisation = data as Organisation;

        console.log(orgData.organisationName);

        // Store the volunteer data in AsyncStorage and update the Zustand store.
        await AsyncStorage.setItem("org-info", JSON.stringify(orgData));

        const storedUserString = await AsyncStorage.getItem("org-info");
        if (storedUserString !== null) {
          const storedUser = JSON.parse(storedUserString);
          console.log("Stored User Full Name:", storedUser.organisationName);
        } else {
          console.log("No user info found in AsyncStorage.");
        }

        setOrg(orgData);

        console.log("Org logged in:", orgData.organisationName);

        if (userCred) {
          rounter.replace("/org/(tabs)/one");
          showSuccessToast(
            `Welcome back, ${orgData.organisationName}!`,
            orgData.email
          );
        }
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return { login, user, loading, error };
};

export default useLogin;
