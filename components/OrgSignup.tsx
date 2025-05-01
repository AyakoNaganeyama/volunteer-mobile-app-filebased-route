import {
  View,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";

import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";
interface SignupInputs {
  fullName: string;
  orgName: string;
  email: string;
  pass: string;
}
import useSignup from "@/hooks/org/useSignup";

const OrgSignup = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState<SignupInputs>({
    fullName: "",
    orgName: "",
    email: "",
    pass: "",
  });
  const [errors, setErrors] = useState({ email: "", pass: "" });

  const [showPass, setShowPass] = useState(false);

  const { signup } = useSignup();

  const handleSignup = () => {
    // You can perform additional validation here if needed
    // Then call the signup function from the hook.
    signup({
      fullName: inputs.fullName,
      orgName: inputs.orgName,
      email: inputs.email,
      pass: inputs.pass,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {/* Full Name Input */}
          <View style={styles.inputContainer}>
            <Fontisto
              name="person"
              size={20}
              color="#8e8e93"
              style={styles.icon}
            />
            <TextInput
              placeholder="Enter Full Name"
              value={inputs.fullName}
              onChangeText={(text) =>
                setInputs((prev) => ({ ...prev, fullName: text }))
              }
              style={styles.input}
              placeholderTextColor={"#8e8e93"}
            />
          </View>

          {/* Org Name Input */}
          <View style={styles.inputContainer}>
            <Octicons
              name="organization"
              size={20}
              color="#8e8e93"
              style={styles.icon}
            />
            <TextInput
              placeholder="Enter Organisation Name"
              value={inputs.orgName}
              onChangeText={(text) =>
                setInputs((prev) => ({ ...prev, orgName: text }))
              }
              style={styles.input}
              placeholderTextColor={"#8e8e93"}
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Fontisto
              name="email"
              size={20}
              color="#8e8e93"
              style={styles.icon}
            />
            <TextInput
              placeholder="Enter Email"
              value={inputs.email}
              onChangeText={(text) =>
                setInputs((prev) => ({ ...prev, email: text }))
              }
              style={styles.input}
              placeholderTextColor={"#8e8e93"}
              keyboardType="email-address"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <AntDesign
              name="lock"
              size={20}
              color="#8e8e93"
              style={styles.icon}
            />
            <TextInput
              placeholder="Enter Password"
              value={inputs.pass}
              onChangeText={(text) =>
                setInputs((prev) => ({ ...prev, pass: text }))
              }
              style={styles.input}
              placeholderTextColor={"#8e8e93"}
              secureTextEntry={!showPass}
            />
          </View>

          <TouchableOpacity onPress={handleSignup} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Join now! </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrgSignup;

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
