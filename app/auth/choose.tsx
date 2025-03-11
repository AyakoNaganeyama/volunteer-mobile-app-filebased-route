import { View, Text, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Link } from "expo-router";

const choose = () => {
  const router = useRouter();
  return (
    <View>
      <Button
        title="Are you volunteer"
        onPress={() => router.replace("/auth/authVolunteer")}
      />

      <Button
        title="Are you organisation"
        onPress={() => router.replace("/auth/authOrganisation")}
      />
    </View>
  );
};

export default choose;
