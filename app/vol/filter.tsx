import { View, Text } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const filter = () => {
  const router = useRouter();
  return (
    <View>
      <Ionicons
        name="arrow-back"
        size={24}
        color="black"
        onPress={() => router.back()}
      />
      <Text>filter</Text>
    </View>
  );
};

export default filter;
