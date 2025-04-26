import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import useLogout from "@/hooks/org/useLogout";
import { useRouter } from "expo-router";

const two = () => {
  const router = useRouter();
  const { handleLogout } = useLogout();

  const Logout = async () => {
    await handleLogout(); // Execute logout logic
    router.replace("/"); // Redirect to the index page
  };

  return (
    <View>
      <TouchableOpacity onPress={Logout} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default two;

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

  button: {
    backgroundColor: "#0d528f",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderColor: "#007aff",
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "gray",
    fontSize: 16,
  },

  buttonStyle: {
    backgroundColor: "#0d528f",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
