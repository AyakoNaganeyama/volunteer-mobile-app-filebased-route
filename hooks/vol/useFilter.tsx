import { View, Text } from "react-native";
import React from "react";
import { useListingStore } from "@/userStore/volListingStore";
import { Opportunity } from "@/constants/types";
import { useSearchStore } from "@/userStore/searchStore";
import { useFilterStore } from "@/userStore/useFilterStore";

const useFilter = () => {
  const { setSearchClicked, clearSearchClicked } = useSearchStore();
  const {
    setCategory,
    setCommitment,
    setLocation,
    clearFilters,
    setFromDate,
    setToDate,
  } = useFilterStore();
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
    location: string,
    fromDate: Date | null,
    toDate: Date | null
  ) => {
    // clear the store
    clearFiltered();
    setCategory(category);
    setCommitment(commitment);
    setLocation(location);
    setFromDate(fromDate);
    setToDate(toDate);

    const formatLocalDate = (d: Date | null): string | null => {
      if (!d) return null;
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    };

    const converted = formatLocalDate(fromDate);

    // run filter on the full list
    const filtered = opportunities.filter(
      (o) =>
        (category ? o.category === category : true) &&
        (commitment ? o.commitmentPeriod === commitment : true) &&
        (location ? o.location === location : true)
    );

    // re-populate store with only the matches
    filtered.forEach((o) => setFilteredOpportunity(o));

    if (commitment == "" && category == "" && location == "") {
      clearSearchClicked();
    } else {
      setSearchClicked();
    }
  };

  return { applyFilter };
};

export default useFilter;
