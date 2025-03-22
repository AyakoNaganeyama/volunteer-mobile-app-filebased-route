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
          marginVertical: 20,
        }}
      >
        {opportunity.title}
      </Text>
    </>
  );
};

export default Page;
