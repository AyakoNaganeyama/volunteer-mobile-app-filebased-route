import { View, Text } from "react-native";
import React from "react";

import { Opportunity } from "@/constants/mockListing";
import { mockOpportunities } from "@/constants/mockListing";
import { useState, useEffect } from "react";
const useOpportunities = () => {
  const [opps, setOpps] = useState<Opportunity[]>([]);

  //import from z stand here later

  const fetchListings = async () => {
    setOpps(mockOpportunities);
  };

  return { opps, setOpps, fetchListings };
};

export default useOpportunities;
