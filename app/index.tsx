import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useVolunteerStore } from "@/userStore/volSore";

const Index = () => {
  const router = useRouter();
  const { setVolunteer, volunteer } = useVolunteerStore();
  const [loadingVolunteer, setLoadingVolunteer] = useState(true);

  useEffect(() => {
    const loadVolunteer = async () => {
      try {
        const storedUserString = await AsyncStorage.getItem("user-info");
        if (storedUserString !== null) {
          const storedUser = JSON.parse(storedUserString);
          setVolunteer(storedUser);
          console.log(
            "Volunteer loaded from AsyncStorage:",
            storedUser.fullName
          );
          console.log("store", volunteer);
        } else {
          console.log("No volunteer info found in AsyncStorage.");
          console.log("store", volunteer);
        }
      } catch (error) {
        console.error("Error loading volunteer info:", error);
      } finally {
        setLoadingVolunteer(false);
      }
    };

    loadVolunteer();
  }, []);

  // While we're loading, do not redirect yet.
  if (loadingVolunteer) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Now, if volunteer is loaded, redirect to the tab view.
  if (volunteer) {
    // return <Redirect href="/org/(tabs)/one" />;
    return <Redirect href="/vol/(group)/one" />;
  }

  // If volunteer is not found, redirect to auth/choose.
  return <Redirect href="/auth/choose" />;
};

export default Index;
