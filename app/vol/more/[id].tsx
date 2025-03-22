import { View, Text } from "react-native";
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
  return <Text>{opportunity?.title}</Text>;
};

export default Page;
