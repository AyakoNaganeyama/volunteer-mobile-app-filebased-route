import { View, Text, Image } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const HeaderLeft = () => {
  const router = useRouter();
  return (
    <Ionicons
      name="arrow-back"
      size={24}
      color="black"
      style={{ marginLeft: 10 }}
      onPress={() => {
        console.log("Back button pressed"); // Debug: Check if pressed
        router.back();
      }}
    />
  );
};

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: () => (
            <Image
              source={require("../../../assets/images/logo.png")}
              style={{ width: 100, height: 40, resizeMode: "contain" }}
            />
          ),
          headerTitleAlign: "center",
          // Hide the default back button so only your custom one shows:
          headerBackVisible: false,
          headerLeft: () => <HeaderLeft />,
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default _layout;
