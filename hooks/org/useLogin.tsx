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
import { useEnactore } from "@/userStore/enacStore";
import { Enac } from "@/constants/types";
const useLogin = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(authentication);
  const { setOrg, org } = useOrgStore();
  const { setEnac, enac } = useEnactore();
  const { showSuccessToast, showErrorToast } = useToast();
  const rounter = useRouter();

  useEffect(() => {
    if (org) {
      console.log("Org state updated:", org.organisationName);
    }
  }, [org]);

  useEffect(() => {
    if (enac) {
      console.log("Enac state updated:", enac.fullName);
    }
  }, [enac]);

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
        const docRefOrg = doc(firestore, "organisation", userCred.user.uid);
        const docSnapOrg = await getDoc(docRefOrg);

        const docRefEnac = doc(firestore, "enac", userCred.user.uid);
        const docSnapEnac = await getDoc(docRefEnac);

        if (!docSnapOrg.exists() && !docSnapEnac.exists()) {
          console.log("document does not exist in org and enac");

          return;
        }
        if (docSnapOrg.exists()) {
          const data = docSnapOrg.data();
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

          rounter.replace("/org/(tabs)/one");
          showSuccessToast(
            `Welcome back, ${orgData.organisationName}!`,
            orgData.email
          );
          return;
        }

        if (docSnapEnac.exists()) {
          const data = docSnapEnac.data();
          // At this point, data is of type DocumentData, but we are sure it exists.
          // To satisfy TypeScript, we can cast it to Volunteer if the structure matches.
          const enacData: Enac = data as Enac;

          console.log(enacData.fullName, enacData.id);

          // Store the volunteer data in AsyncStorage and update the Zustand store.
          await AsyncStorage.setItem("enac-info", JSON.stringify(enacData));

          const storedUserString = await AsyncStorage.getItem("enac-info");
          if (storedUserString !== null) {
            const storedUser = JSON.parse(storedUserString);
            console.log(
              "Stored User Full Name:",
              storedUser.fullName,
              storedUser.id
            );
          } else {
            console.log("No user info found in AsyncStorage.");
          }

          setEnac(enacData);

          console.log("Enac logged in:", enacData.fullName);

          rounter.replace("/enac/(tabs)/one");
          showSuccessToast(
            `Welcome back, ${enacData.fullName}!`,
            enacData.email
          );

          return;
        }
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return { login, user, loading, error };
};

export default useLogin;
