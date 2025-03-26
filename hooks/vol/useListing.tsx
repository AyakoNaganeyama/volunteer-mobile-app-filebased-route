import { View, Text } from "react-native";
import React from "react";
import { Opportunity } from "@/constants/mockListing";

import { mockOpportunities } from "@/constants/mockListing";
import { useState } from "react";
import { Filter } from "@/constants/types";

const useListing = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  const fetchList = async () => {
    setOpportunities(mockOpportunities);
  };

  return { opportunities, fetchList, setOpportunities };
};

export default useListing;
