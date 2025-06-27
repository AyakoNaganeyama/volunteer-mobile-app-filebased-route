import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useVolunteerStore } from "@/userStore/volSore";
import { useOrgStore } from "@/userStore/orgStore";
import Loader from "@/components/Loader";
import { useEnactore } from "@/userStore/enacStore";

const Index = () => {
  const router = useRouter();
  const { setVolunteer, volunteer } = useVolunteerStore();
  const { setOrg, org } = useOrgStore();
  const { setEnac, enac } = useEnactore();
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

        // Check if enac info is logged in (independent check)
        const storedEnacString = await AsyncStorage.getItem("enac-info");
        if (storedEnacString !== null) {
          console.log("Raw enac-info string:", storedEnacString);
          const storedEnac = JSON.parse(storedEnacString);
          setEnac(storedEnac);
          console.log("Stored Enac object:", storedEnac);
          console.log("Enac loaded from AsyncStorage:", storedEnac.fullName);
        } else {
          console.log("No enac info found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Error loading info:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInfo();
  }, []); // Run once on mount

  if (loading) {
    return <Loader />;
  }

  if (volunteer) {
    // If volunteer info is found, redirect to volunteer screen.
    return <Redirect href="/vol/(group)/one" />;
  }

  if (org) {
    // If org info is found (and volunteer info is not), redirect to org screen.
    return <Redirect href="/org/(tabs)/one" />;
  }

  if (enac) {
    // If org info is found (and volunteer info is not), redirect to org screen.
    return <Redirect href="/enac/(tabs)/one" />;
  }

  // If neither is found, redirect to auth/choose.
  return <Redirect href="/auth/choose" />;
};

export default Index;
