import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";

interface InputFields {
  email: string;
  pass: string;
}

const filter = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState<InputFields>({
    email: "",
    pass: "",
  });
  const [showPass, setShowPass] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        {/* Arrow-back at the top */}
        <View style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => router.back()}
          />
        </View>

        {/* Category */}
        <View style={styles.centerContainer}>
          <Text
            style={{
              fontWeight: "bold",
              color: "#0d528f",
              fontSize: 16,
              alignSelf: "flex-start",
              padding: 5,
            }}
          >
            What
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="What are you interested in? "
              value={inputs.email}
              onChangeText={(text) =>
                setInputs((prev) => ({ ...prev, email: text }))
              }
              style={styles.input}
              placeholderTextColor="#8e8e93"
              keyboardType="email-address"
            />
          </View>

          {/* Commitment */}
          <Text
            style={{
              fontWeight: "bold",
              color: "#0d528f",
              fontSize: 16,
              alignSelf: "flex-start",
              padding: 5,
            }}
          >
            Commitment
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Any Commitment"
              value={inputs.pass}
              onChangeText={(text) =>
                setInputs((prev) => ({ ...prev, pass: text }))
              }
              style={styles.input}
              placeholderTextColor="#8e8e93"
              secureTextEntry={!showPass}
            />
          </View>

          {/* Where */}
          <Text
            style={{
              fontWeight: "bold",
              color: "#0d528f",
              fontSize: 16,
              alignSelf: "flex-start",
              padding: 5,
            }}
          >
            Where
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter town or city"
              value={inputs.pass}
              onChangeText={(text) =>
                setInputs((prev) => ({ ...prev, pass: text }))
              }
              style={styles.input}
              placeholderTextColor="#8e8e93"
              secureTextEntry={!showPass}
            />
          </View>

          <TouchableOpacity
            onPress={() => router.replace("/org/(tabs)/one")}
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonText}>Discover</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default filter;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 10,
  },
  centerContainer: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
    marginHorizontal: 30,
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
  input: {
    flex: 1,
    color: "#333333",
    fontSize: 16,
  },
  buttonStyle: {
    backgroundColor: "#0d528f",
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
    width: "100%",
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
