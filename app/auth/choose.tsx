import { View, Text, Button, Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Link } from "expo-router";

const choose = () => {
  const router = useRouter();
  return (
    <>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../assets/images/logo.jpg")}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            borderRadius: 50,
          }}
        />
      </View>
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
    </>
  );
};

export default choose;
