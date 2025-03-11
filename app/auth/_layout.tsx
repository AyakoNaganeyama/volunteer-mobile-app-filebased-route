import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { View, ActivityIndicator, Image } from "react-native";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="choose" options={{ headerShown: false }} />

      <Stack.Screen
        name="authOrganisation"
        options={{
          headerTitle: () => (
            <Image
              source={require("../../assets/images/logo.png")}
              style={{ width: 100, height: 40, resizeMode: "contain" }}
            />
          ),
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="authVolunteer"
        options={{
          headerTitle: () => (
            <Image
              source={require("../../assets/images/logo.png")}
              style={{ width: 100, height: 40, resizeMode: "contain" }}
            />
          ),
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};

export default _layout;
