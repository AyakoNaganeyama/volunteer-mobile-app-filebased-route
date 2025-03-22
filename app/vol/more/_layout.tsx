import { View, Text, Image } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
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
        }}
      />
    </Stack>
  );
};

export default _layout;
