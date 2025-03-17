import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerTitle: () => (
          <Image
            source={require("../../../assets/images/logo.png")}
            style={{ width: 100, height: 40, resizeMode: "contain" }}
          />
        ),
        headerTitleAlign: "center",
      }}
    />
  );
};

export default _layout;
