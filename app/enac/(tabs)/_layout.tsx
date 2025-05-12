import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import useLogout from "@/hooks/org/useLogout";
import { useRouter } from "expo-router";

const _layout = () => {
  const router = useRouter();
  const { handleLogout } = useLogout();
  const Logout = async () => {
    await handleLogout(); // Execute logout logic
    router.replace("/"); // Redirect to the index page
  };

  return (
    <Tabs
      screenOptions={{
        // hide the tab bar completely
        tabBarStyle: { display: "none" },

        tabBarActiveTintColor: "#0d528f",
        tabBarInactiveTintColor: "gray",
        headerTitle: () => (
          <Image
            source={require("../../../assets/images/logo.png")}
            style={{ width: 100, height: 40, resizeMode: "contain" }}
          />
        ),
        headerTitleAlign: "center",
        headerRight: () => (
          <TouchableOpacity
            onPress={Logout}
            style={{
              marginRight: 16,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="log-out-outline" size={20} color="#0d528f" />
            <Text style={{ color: "#0d528f", marginLeft: 4 }}>Logout</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="one"
        options={{
          tabBarLabel: "Manage",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="post-add" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
