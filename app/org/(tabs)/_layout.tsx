import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0d528f",
        tabBarInactiveTintColor: "gray",
        headerTitle: () => (
          <Image
            source={require("../../../assets/images/logo.png")}
            style={{ width: 100, height: 40, resizeMode: "contain" }}
          />
        ),
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="one"
        options={{
          tabBarLabel: "Manage",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="post-add" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
