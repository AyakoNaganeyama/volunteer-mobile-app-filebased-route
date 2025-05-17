import { View, Text } from "react-native";
import React from "react";
import { useApplicationListStore } from "@/userStore/enacApplicationStore";
import { useOppStore } from "@/userStore/oppArrayStore";
import { Opportunity } from "@/constants/types";
import { useRouter } from "expo-router";

const useDeleteOpportunity = () => {
  const { removeApplication } = useApplicationListStore();
  const { removeOpportunity } = useOppStore();
  const router = useRouter();

  const deleteOpportunity = async (opp: Opportunity | null) => {
    if (!opp?.companyId) {
      // nothing to navigate to
      return;
    }
    console.log(opp?.title);
    router.push({
      pathname: "/enac/listofEachorg/[id]",
      params: { id: opp.companyId },
    });
  };
  return { deleteOpportunity };
};

export default useDeleteOpportunity;
