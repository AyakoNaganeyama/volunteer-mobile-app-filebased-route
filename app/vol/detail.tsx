import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const detail = () => {
  const router = useRouter();
  return (
    <>
      <View>
        <Text>detail</Text>
      </View>
      <TouchableOpacity
        onPress={() => router.push("/vol/(group)/one")}
        style={styles.buttonStyle}
      >
        <Text style={styles.buttonText}>Login </Text>
      </TouchableOpacity>
    </>
  );
};

export default detail;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
  },
  heading: {
    fontSize: 32,
    color: "#007aff",
    fontWeight: "bold",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderColor: "#007aff",
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 20,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#333333",
    fontSize: 16,
  },
  Button: {
    backgroundColor: "#007aff",
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
  buttonDisabled: {
    backgroundColor: "#c7c7c7",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ff5252",
    fontSize: 13,
    marginBottom: 10,
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
