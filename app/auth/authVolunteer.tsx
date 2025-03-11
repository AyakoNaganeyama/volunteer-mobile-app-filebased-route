import { View, Text } from "react-native";
import React, { useState } from "react";
import VolunteerLogin from "@/components/VolunteerLogin";
import VolunteerSignup from "@/components/VolunteerSignup";

const authVolunteer = () => {
  const [isAccount, setAccount] = useState(false);
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

        {isAccount ? <VolunteerLogin /> : <VolunteerSignup />}
      </View>
    </View>
  );
};

export default authVolunteer;
