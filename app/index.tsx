import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useVolunteerStore } from "@/userStore/volSore";
import { useOrgStore } from "@/userStore/orgStore";
import Loader from "@/components/Loader";

const Index = () => {
  const router = useRouter();
  const { setVolunteer, volunteer } = useVolunteerStore();
  const { setOrg, org } = useOrgStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInfo = async () => {
      try {
        // Check if volunteer info is logged in
        const storedVolString = await AsyncStorage.getItem("user-info");
        if (storedVolString !== null) {
          const storedVolunteer = JSON.parse(storedVolString);
          setVolunteer(storedVolunteer);
          console.log(
            "Volunteer loaded from AsyncStorage:",
            storedVolunteer.fullName
          );
        } else {
          console.log("No volunteer info found in AsyncStorage.");
        }

        // Check if organisation info is logged in (independent check)
        const storedOrgString = await AsyncStorage.getItem("org-info");
        if (storedOrgString !== null) {
          console.log("Raw org-info string:", storedOrgString);
          const storedOrg = JSON.parse(storedOrgString);
          setOrg(storedOrg);
          console.log("Stored Org object:", storedOrg);
          console.log(
            "Org loaded from AsyncStorage:",
            storedOrg.organisationName
          );
        } else {
          console.log("No organisation info found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Error loading info:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInfo();
  }, []); // Run once on mount

  // While we're loading, do not redirect.
  if (loading) {
    return <Loader />;
  }

  // Now, redirect based on what's loaded:
  if (volunteer) {
    // If volunteer info is found, redirect to volunteer screen.
    return <Redirect href="/vol/(group)/one" />;
  }

  if (org) {
    // If org info is found (and volunteer info is not), redirect to org screen.
    return <Redirect href="/org/(tabs)/one" />;
  }

  // If neither is found, redirect to auth/choose.
  return <Redirect href="/auth/choose" />;
};

export default Index;
