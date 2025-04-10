import { Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import useLogout from "@/hooks/vol/useLogout";

const Two = () => {
  const router = useRouter();
  const { handleLogout } = useLogout();

  const Logout = async () => {
    await handleLogout(); // Execute logout logic
    router.replace("/"); // Redirect to the index page
  };

  return <Button onPress={Logout} title="Logout" />;
};

export default Two;
