import { View, Text } from "react-native";
import React from "react";
import { useEnactore } from "@/userStore/enacStore";

const one = () => {
  const { enac } = useEnactore();
  return (
    <View>
      <Text>{enac?.fullName}</Text>
    </View>
  );
};

export default one;
