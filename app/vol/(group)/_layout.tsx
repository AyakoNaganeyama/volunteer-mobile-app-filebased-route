import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const _layout = () => {
  const rounter = useRouter();
  const handleFIlter = () => {
    rounter.push("/vol/filter");
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0d528f",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="one"
        options={{
          tabBarLabel: "Opportunities",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sparkles-outline" size={24} color={color} />
          ),
          headerTitle: () => (
            <Image
              source={require("../../../assets/images/logo.png")}
              style={{ width: 100, height: 40, resizeMode: "contain" }}
            />
          ),
          headerTitleAlign: "center",
          headerRight: () => (
            <View style={{ marginRight: 20 }}>
              <AntDesign
                name="search1"
                size={24}
                color="#0d528f"
                onPress={() => handleFIlter()}
              />
            </View>
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
          headerTitle: () => (
            <Image
              source={require("../../../assets/images/logo.png")}
              style={{ width: 100, height: 40, resizeMode: "contain" }}
            />
          ),
          headerTitleAlign: "center",
        }}
      />
    </Tabs>
  );
};

export default _layout;
