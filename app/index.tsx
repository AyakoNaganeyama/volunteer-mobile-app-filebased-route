import { View, Text, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Link } from "expo-router";

const index = () => {
  const router = useRouter();

  const name = null;
  return (
    <View>
      {name ? (
        <Button
          title="Open"
          onPress={() => router.replace("/auth/authOrganisation")}
        />
      ) : (
        <Button
          title="Open"
          onPress={() => router.replace("/auth/authVolunteer")}
        />
      )}
    </View>
  );
};

export default index;
