import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";

import { Opportunity } from "@/constants/mockListing";
import { mockOpportunities } from "@/constants/mockListing";
import useListing from "@/hooks/vol/useListing";

const one = () => {
  const { opportunities, fetchList } = useListing();
  useEffect(() => {
    fetchList();
  }, []);

  // const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, marginVertical: 20 }}>
        {opportunities.map((opportunity) => (
          <View
            key={opportunity.id}
            style={{ width: "90%", alignSelf: "center", marginVertical: 15 }}
          >
            <Link href={`../more/${opportunity.id}`}>
              <Image
                source={opportunity.imageURL}
                style={{ width: "100%", height: 200 }}
              />
            </Link>
            {/* <View style={{ alignSelf: "center" }}> */}
            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 8 }}>
              {opportunity.title}
            </Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <AntDesign name="calendar" size={24} color="#0d528f" />
                <Text style={{ fontSize: 14, color: "grey" }}>
                  {opportunity.commitmentPeriod}
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <EvilIcons name="location" size={24} color="#0d528f" />
                <Text style={{ fontSize: 14, color: "grey" }}>
                  {opportunity.location}
                </Text>
              </View>
            </View>
            {/* </View> */}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default one;
