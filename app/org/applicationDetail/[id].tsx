import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { Opportunity } from "@/constants/types";
import { Application } from "@/constants/types";
import { useApplicationListStore } from "@/userStore/orgApplicationStore";

const applicationDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const { addApplication } = useApplicationListStore();

  const [apps, setApps] = useState<Application[]>([]);
};

export default applicationDetail;
