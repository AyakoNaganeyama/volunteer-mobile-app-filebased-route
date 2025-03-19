import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

const _layout = () => {
  const rounter = useRouter();
  const handleFIlter = () => {
    rounter.push("/vol/filter");
  };
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
  );
};

export default _layout;
