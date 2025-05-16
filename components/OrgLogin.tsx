import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import useLogin from "@/hooks/org/useLogin";

interface InputFields {
  email: string;
  pass: string;
}

const OrgLogin = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState<InputFields>({
    email: "",
    pass: "",
  });
  const [errors, setErrors] = useState({ email: "", pass: "" });
  const [showPass, setShowPass] = useState(false);
  const { login, loading, error } = useLogin();

  // Handle login when button is pressed.
  const handleLogin = async () => {
    try {
      await login(inputs);
      // You can uncomment the router.replace in useLogin if you prefer redirect there
    } catch (e) {
      console.log("Login error:", e);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
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
            placeholderTextColor="#8e8e93"
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
            placeholderTextColor="#8e8e93"
            secureTextEntry={!showPass}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.buttonStyle, loading && styles.buttonDisabled]}
          disabled={loading}
        >
          {loading && (
            <ActivityIndicator
              size="small"
              color="#fff"
              style={{ marginRight: 8 }}
            />
          )}
          <Text style={styles.buttonText}>
            {loading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>

        {/* Optionally display an error message if login fails */}
        {error && (
          <Text style={styles.errorText}>
            The email or password you entered is incorrect
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default OrgLogin;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
    flexDirection: "row",
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
  buttonDisabled: {
    opacity: 0.6,
  },
});
