import { View, Text, Button, Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import { Redirect } from "expo-router";

const index = () => {
  const router = useRouter();

  const name = null;

  if (name) {
    return <Redirect href="/org/(tabs)/one" />;
  }
  return <View>{!name && <Redirect href="/auth/choose" />}</View>;
};

export default index;
