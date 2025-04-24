import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import usegetImage from "@/hooks/vol/usegetImage";

import { mockOpportunities } from "@/constants/mockListing";
import useListing from "@/hooks/vol/useListing";
import { useGlobalSearchParams } from "expo-router";
import { useVolunteerStore } from "@/userStore/volSore";
import { Opportunity } from "@/constants/types";
import { useListingStore } from "@/userStore/volListingStore";
import useFetchListings from "@/hooks/vol/useFetchListings";

const one = () => {
  const { volunteer } = useVolunteerStore();
  const { opportunities, filteredOpportunities } = useListingStore();
  const { fetchListings } = useFetchListings();
  const { getImage } = usegetImage();

  const [opps, setOpps] = useState<Opportunity[]>([]);
  // Helper to convert parameter to a string (if it's an array, take the first element)
  const getStringParam = (
    param: string | string[] | undefined
  ): string | undefined => {
    if (!param) return undefined;
    return Array.isArray(param) ? param[0] : param;
  };

  const params = useGlobalSearchParams();

  useEffect(() => {
    fetchListings();
    console.log("listfetched");
  }, []);

  useEffect(() => {
    setOpps(opportunities);
  }, [opportunities]);

  useEffect(() => {
    setOpps(filteredOpportunities);
  }, [filteredOpportunities]);

  // useEffect(() => {
  //   const categoryParam = getStringParam(params.category);
  //   const commitmentParam = getStringParam(params.commitment);
  //   const locationParam = getStringParam(params.location);

  //   const filtered = mockOpportunities.filter((opp) => {
  //     // Check if the parameter exists and if so, do a case-insensitive "includes" check
  //     if (
  //       categoryParam &&
  //       !opp.category.toLowerCase().includes(categoryParam.toLowerCase())
  //     )
  //       return false;
  //     if (
  //       commitmentParam &&
  //       !opp.commitmentPeriod
  //         .toLowerCase()
  //         .includes(commitmentParam.toLowerCase())
  //     )
  //       return false;
  //     if (
  //       locationParam &&
  //       !opp.location.toLowerCase().includes(locationParam.toLowerCase())
  //     )
  //       return false;
  //     return true;
  //   });

  //   setOpps(filtered);
  // }, [params]);

  // const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, marginVertical: 20 }}>
        {opps.map((opportunity) => (
          <View
            key={opportunity.id}
            style={{ width: "90%", alignSelf: "center", marginVertical: 15 }}
          >
            <Link href={`../more/${opportunity.id}`}>
              <Image
                source={getImage(opportunity.category)}
                style={{ width: "100%", height: 200 }}
              />
            </Link>
            {/* <View style={{ alignSelf: "center" }}> */}
            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 8 }}>
              {opportunity.title}
            </Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <AntDesign name="calendar" size={24} color="#0d528f" />
                <Text style={{ fontSize: 14, color: "grey" }}>
                  {opportunity.commitmentPeriod}
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <EvilIcons name="location" size={24} color="#0d528f" />
                <Text style={{ fontSize: 14, color: "grey" }}>
                  {opportunity.location}
                </Text>
              </View>
            </View>
            {/* </View> */}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default one;
