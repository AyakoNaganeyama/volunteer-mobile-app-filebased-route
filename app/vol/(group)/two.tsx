import { Button, View, Image, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import useLogout from "@/hooks/vol/useLogout";

const defaultProfileIcon = require("../../../assets/images/blankIcon.png");

const Two = () => {
  const router = useRouter();
  const { handleLogout } = useLogout();

  const Logout = async () => {
    await handleLogout(); // Execute logout logic
    router.replace("/"); // Redirect to the index page
  };

  return (
    <>
      <Image
        source={defaultProfileIcon}
        style={[styles.image, { width: 30, height: 30, borderRadius: 15 }]}
      />
      <Button onPress={Logout} title="Logout" />
    </>
  );
};

export default Two;

const styles = StyleSheet.create({
  avatar: {
    overflow: "hidden",
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
  },
});
