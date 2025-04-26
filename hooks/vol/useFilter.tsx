import { View, Text } from "react-native";
import React from "react";
import { useListingStore } from "@/userStore/volListingStore";
import { Opportunity } from "@/constants/types";
import { useSearchStore } from "@/userStore/searchStore";

const useFilter = () => {
  const { setSearchClicked } = useSearchStore();
  const {
    opportunities,
    clearOpportunities,
    addOpportunity,
    filteredOpportunities,
    setFilteredOpportunity,
    clearFiltered,
  } = useListingStore();
  const applyFilter = (
    category: string,
    commitment: string,
    location: string
  ) => {
    // clear the store
    clearFiltered();

    // run filter on the full list
    const filtered = opportunities.filter(
      (o) =>
        (category ? o.category === category : true) &&
        (commitment ? o.commitmentPeriod === commitment : true) &&
        (location ? o.location === location : true)
    );

    // re-populate store with only the matches
    filtered.forEach((o) => setFilteredOpportunity(o));
    setSearchClicked();
  };

  return { applyFilter };
};

export default useFilter;
