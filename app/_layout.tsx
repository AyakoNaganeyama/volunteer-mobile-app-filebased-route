import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="filter"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default _layout;
