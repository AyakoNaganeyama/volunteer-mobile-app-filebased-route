import { View, Text } from "react-native";
import React from "react";
import { Opportunity } from "@/constants/mockListing";
import useListing from "@/hooks/vol/useListing";
import useOpportunities from "@/hooks/org/useOpportunities";

const one = () => {
  const { opps, setOpps, fetchListings } = useOpportunities();
  return (
    <View>
      <Text>one</Text>
    </View>
  );
};

export default one;
