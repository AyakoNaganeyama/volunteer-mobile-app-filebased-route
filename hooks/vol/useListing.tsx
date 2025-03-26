import { View, Text } from "react-native";
import React from "react";
import { Opportunity } from "@/constants/mockListing";

import { mockOpportunities } from "@/constants/mockListing";
import { useState } from "react";

const useListing = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  const fetchList = async () => {
    setOpportunities(mockOpportunities);
  };

  return { opportunities, fetchList };
};

export default useListing;
