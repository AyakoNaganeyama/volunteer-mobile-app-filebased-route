import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import VolunteerLogin from "@/components/VolunteerLogin";
import VolunteerSignup from "@/components/VolunteerSignup";

const authVolunteer = () => {
  const [isAccount, setIsAccount] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        width: "100%",
        marginTop: 100,
      }}
    >
      <View style={{ width: "85%" }}>
        {!isAccount ? (
          <Text
            style={{
              marginBottom: 10,
              textAlign: "left",
              alignSelf: "flex-start",
              fontSize: 20,
              fontWeight: "bold",
              color: "#0d528f",
            }}
          >
            Let's get familiar
          </Text>
        ) : (
          <Text
            style={{
              marginBottom: 10,
              textAlign: "left",
              alignSelf: "flex-start",
              fontSize: 20,
              fontWeight: "bold",
              color: "#0d528f",
            }}
          >
            Let's begin!
          </Text>
        )}

        {isAccount ? <VolunteerLogin /> : <VolunteerSignup />}

        <TouchableOpacity onPress={() => setIsAccount(!isAccount)}>
          <Text style={{ color: "#0d528f", fontSize: 16, textAlign: "center" }}>
            {isAccount ? "Don't have an account?" : "Already have an account?"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default authVolunteer;
