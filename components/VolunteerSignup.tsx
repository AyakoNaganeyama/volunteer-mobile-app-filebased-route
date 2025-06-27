// VolunteerSignup.tsx
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import useSignup from "@/hooks/vol/useSignup";
import { useToast } from "@/hooks/useToast";

interface InputFields {
  fullName: string;
  email: string;
  pass: string;
}

const VolunteerSignup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { showErrorToast } = useToast();
  const [inputs, setInputs] = useState<InputFields>({
    fullName: "",
    email: "",
    pass: "",
  });
  const [errors, setErrors] = useState({ email: "", pass: "" });
  const [showPass, setShowPass] = useState(false);

  // Destructure the signup function (and optionally other properties) from useSignup
  const { signup, passError } = useSignup();

  const handleSignup = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      await signup({
        fullName: inputs.fullName,
        email: inputs.email,
        pass: inputs.pass,
      });

      // router.replace("/volunteer/welcome");
    } catch (err) {
      showErrorToast("Signup failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

          {passError ? <Text style={styles.errorText}>{passError}</Text> : null}

          {/* Signup Button */}
          <TouchableOpacity
            onPress={handleSignup}
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
              {loading ? "Signining up..." : "Join now!"}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default VolunteerSignup;

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
  buttonDisabled: {
    opacity: 0.6,
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 12,
    marginLeft: 16,
  },
});
