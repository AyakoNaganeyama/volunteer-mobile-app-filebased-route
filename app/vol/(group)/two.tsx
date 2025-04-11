import {
  Button,
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import useLogout from "@/hooks/vol/useLogout";
import { useVolunteerStore } from "@/userStore/volSore";

const defaultProfileIcon = require("../../../assets/images/blankIcon.png");

const Two = () => {
  const router = useRouter();
  const { handleLogout } = useLogout();
  const { volunteer } = useVolunteerStore();

  const Logout = async () => {
    await handleLogout(); // Execute logout logic
    router.replace("/"); // Redirect to the index page
  };

  return (
    <>
      <View style={{ alignSelf: "center", width: "80%", marginTop: 50 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image
            source={defaultProfileIcon}
            style={[
              styles.image,
              { width: 100, height: 100, borderRadius: 50 },
            ]}
          />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Replace Photo</Text>
          </TouchableOpacity>
          {/* <Text style={{ marginLeft: 10, textAlign: "center", fontSize: 18 }}>
            {volunteer?.fullName}
          </Text> */}
        </View>

        <View style={{ flexDirection: "column", marginTop: 20, gap: 10 }}>
          <View style={styles.inputContainer}>
            <TextInput
              value={volunteer?.fullName}
              style={styles.input}
              keyboardType="email-address"
              editable={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              value={volunteer?.email}
              style={styles.input}
              keyboardType="email-address"
              editable={false}
            />
          </View>

          <TouchableOpacity onPress={Logout} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
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
