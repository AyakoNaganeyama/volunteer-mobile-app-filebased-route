import { View, Text, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { mockOpportunities } from "@/constants/mockListing";
import { Opportunity } from "@/constants/mockListing";
import { useEffect, useState } from "react";
const Page = () => {
  const { id } = useLocalSearchParams();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);

  useEffect(() => {
    const foundOpportunity = mockOpportunities.find((opp) => opp.id === id);
    setOpportunity(foundOpportunity || null);
  }, [id]);
  if (!opportunity) {
    return <Text>Loading opportunity...</Text>;
  }
  return (
    <>
      <Image
        source={opportunity!.imageURL}
        style={{ width: "100%", height: 200 }}
      />

      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          fontWeight: "bold",
          marginTop: 20,
          marginBottom: 5,
        }}
      >
        {opportunity.title}
      </Text>
      <Text style={{ fontSize: 14, color: "grey", textAlign: "center" }}>
        {opportunity.companyName}
      </Text>

      <View
        style={{
          alignSelf: "center",
          width: "90%",
          paddingHorizontal: 30,
          gap: 5,
          marginBottom: 20,
          marginTop: 30,
        }}
      >
        <Text style={{ fontSize: 14, color: "grey", fontWeight: "bold" }}>
          Description
        </Text>
        <Text style={{ fontSize: 16 }}>{opportunity.description}</Text>
      </View>

      <View
        style={{
          alignSelf: "center",
          width: "90%",
          paddingHorizontal: 30,
          gap: 5,
        }}
      >
        <Text style={{ fontSize: 14, color: "grey" }}>Description</Text>
        <Text>{opportunity.description}</Text>
      </View>
    </>
  );
};

export default Page;
