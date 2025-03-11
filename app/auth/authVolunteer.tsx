import { View, Text } from "react-native";
import React, { useState } from "react";
import VolunteerLogin from "@/components/VolunteerLogin";
import VolunteerSignup from "@/components/VolunteerSignup";

const authVolunteer = () => {
  const [isAccount, setAccount] = useState(false);
  return (
    <View>
      <Text>authVolunteer</Text>
      {isAccount ? <VolunteerLogin /> : <VolunteerSignup />}
    </View>
  );
};

export default authVolunteer;
