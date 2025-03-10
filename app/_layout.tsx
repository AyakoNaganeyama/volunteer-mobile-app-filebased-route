import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";

const _layout = () => {
  // Render navigation stack (only for index page)
  return <Stack screenOptions={{ headerShown: false }}></Stack>;
};

export default _layout;
