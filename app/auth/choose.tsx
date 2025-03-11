import {
  View,
  Text,
  Button,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Link } from "expo-router";

const choose = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View style={{ alignItems: "center", marginTop: 100 }}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{
            width: 200,
            height: 300,
            resizeMode: "contain",
            borderRadius: 50,
          }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => router.push("/auth/authVolunteer")}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonText}>You are a volunteer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/auth/authOrganisation")}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonText}>You are a organisaiton</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default choose;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "#0d528f",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
