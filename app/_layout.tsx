import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";

import { useToast, toastConfig } from "@/hooks/useToast";
import Toast from "react-native-toast-message";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="filter"
        options={{
          presentation: "modal",
        }}
      />
      <Toast config={toastConfig} />
    </Stack>
  );
};

export default _layout;
