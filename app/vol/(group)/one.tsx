import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";

const one = () => {
  return (
    <View>
      <Link href="/vol/detail">
        <Text>Open Detail</Text>
      </Link>
    </View>
  );
};

export default one;
