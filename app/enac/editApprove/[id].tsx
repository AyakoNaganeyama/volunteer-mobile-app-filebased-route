import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";

const approvePage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text
        onPress={() => {
          router.back();
        }}
      >
        Back
      </Text>
      <Text>{id}</Text>
    </View>
  );
};

export default approvePage;
