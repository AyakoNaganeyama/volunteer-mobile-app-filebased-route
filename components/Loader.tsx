import { View, Text, Image } from "react-native";
import React from "react";

const Loader = () => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Image
        source={require("../assets/images/image003.png")}
        style={{ width: 200, height: 200, resizeMode: "contain" }}
      />
    </View>
  );
};

export default Loader;
