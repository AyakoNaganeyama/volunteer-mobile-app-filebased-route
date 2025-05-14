import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import usegetImage from "@/hooks/vol/usegetImage";

import { mockOpportunities } from "@/constants/mockListing";
import useListing from "@/hooks/vol/useListing";
import { useGlobalSearchParams } from "expo-router";
import { useVolunteerStore } from "@/userStore/volSore";
import { Application, Opportunity } from "@/constants/types";
import { useListingStore } from "@/userStore/volListingStore";
import useFetchListings from "@/hooks/vol/useFetchListings";
import { useSearchStore } from "@/userStore/searchStore";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useApplicationsStore } from "@/userStore/volApplicationStore";
import { useFilterStore } from "@/userStore/useFilterStore";

const one = () => {
  const { volunteer } = useVolunteerStore();
  const { category, commitment, location, fromDate, toDate } = useFilterStore();
  const { opportunities, filteredOpportunities, setFilteredAll } =
    useListingStore();
  const { fetchListings } = useFetchListings();
  const { getImage } = usegetImage();
  const { searchClicked, clearSearchClicked } = useSearchStore();
  const [refreshing, setRefreshing] = useState(false);
  const { applications, closedApplication } = useApplicationsStore();
  const [apps, setApps] = useState<Application[]>(applications);
  const [loading, setLoading] = useState(true);
  const [closedApp, setClosedApp] = useState<Application[]>();
  const [isCurrent, setIsCurrent] = useState(true);

  useEffect(() => {
    setApps(applications);
    setClosedApp(closedApplication);
    console.log("Closed", closedApplication);
  }, [applications, closedApplication]);

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
    // wrap in an async IIFE so we can await fetchListings
    (async () => {
      setLoading(true);
      await fetchListings();
      console.log("list fetched");
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setOpps(opportunities);
  }, [opportunities]);

  useEffect(() => {
    setOpps(filteredOpportunities);
  }, [filteredOpportunities]);

  const backtoOriginalList = () => {
    clearSearchClicked();
    setFilteredAll();
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    clearSearchClicked();

    // 2) copy the full list into filteredOpportunities
    setFilteredAll();

    // 3) update the local view

    setRefreshing(false);
  }, [clearSearchClicked, setFilteredAll]);

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

  if (loading) {
    // full-screen loader
    return (
      <View style={styles.loaderContainer}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <ActivityIndicator size="large" color="#0d528f" />
        <Text style={styles.loadingText}>Loading…</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {searchClicked && (
        <>
          <View style={styles.filterRow}>
            {category && <Text style={styles.filterTag}>{category}</Text>}
            {commitment && <Text style={styles.filterTag}>{commitment}</Text>}
            {location && <Text style={styles.filterTag}>{location}</Text>}
          </View>
          <View
            style={{
              width: "90%",
              alignSelf: "center",
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              onPress={backtoOriginalList}
            />
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <MaterialCommunityIcons
                name="text-search"
                size={24}
                color="#0d528f"
              />
              <Text style={{ color: "#0d528f", fontSize: 16 }}>
                Search Result:
              </Text>
              <Text
                style={{ fontWeight: "bold", fontSize: 16, color: "#0d528f" }}
              >
                {filteredOpportunities.length}
              </Text>
            </View>
          </View>
        </>
      )}

      {!searchClicked && (apps.length > 0 || closedApp.length > 0) && (
        <>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => setIsCurrent(true)}>
              <Text
                style={{
                  color: isCurrent ? "#0d528f" : "grey",
                  fontSize: 14,
                  fontWeight: "bold",
                  marginLeft: 16,
                  marginTop: 16,
                  textDecorationLine: isCurrent ? "underline" : "none",
                }}
              >
                Applied
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsCurrent(false)}>
              <Text
                style={{
                  color: !isCurrent ? "#0d528f" : "grey",
                  fontSize: 14,
                  fontWeight: "bold",
                  marginLeft: 16,
                  marginTop: 16,
                  textDecorationLine: !isCurrent ? "underline" : "none",
                }}
              >
                Past/Closed
              </Text>
            </TouchableOpacity>
          </View>

          {isCurrent && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
              contentContainerStyle={styles.horizontalContent}
            >
              {apps.map((item) => (
                <TouchableOpacity key={item.id} style={styles.card}>
                  <Image
                    source={getImage(item.opportunity.category)}
                    style={styles.cardImage}
                  />
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {item.opportunity.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {!isCurrent && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
              contentContainerStyle={styles.horizontalContent}
            >
              {closedApp.map((item) => (
                <TouchableOpacity key={item.id} style={styles.card}>
                  <Image
                    source={getImage(item.opportunity.category)}
                    style={styles.cardImage}
                  />
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {item.opportunity.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </>
      )}
      {/* closed */}

      {/* {!searchClicked && closedApp.length > 0 && (
        <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.horizontalContent}
          >
            {closedApp.map((item) => (
              <TouchableOpacity key={item.id} style={styles.card}>
                <Image
                  source={getImage(item.opportunity.category)}
                  style={styles.cardImage}
                />
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {item.opportunity.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )} */}

      <Text
        style={{
          color: "#0d528f",
          fontSize: 18,
          fontWeight: "bold",
          marginLeft: 16,
          marginTop: 30,
        }}
      >
        Discover
      </Text>

      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#0d528f" // iOS
            colors={["#0d528f"]} // Android
          />
        }
      >
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
            <View
              style={{
                flexDirection: "column",

                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {opportunity.title}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Entypo name="awareness-ribbon" size={24} color="#0d528f" />
                <Text style={{ fontSize: 14, color: "grey" }}>
                  {opportunity.category}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", gap: 10, marginTop: 5 }}>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  horizontalScroll: {
    maxHeight: 140,
    marginVertical: 10,
  },
  horizontalContent: {
    paddingHorizontal: 16,
  },
  card: {
    width: 120,
    marginRight: 12,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 2,
  },
  cardImage: {
    width: "100%",
    height: 80,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 8,
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  searchInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  searchText: {
    color: "#0d528f",
    fontSize: 16,
  },
  searchCount: {
    color: "#0d528f",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 4,
  },
  listScroll: {
    flex: 1,
  },
  listItem: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 15,
  },
  listImage: {
    width: "100%",
    height: 200,
  },
  listContent: {
    marginTop: 8,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  listMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  listMetaText: {
    fontSize: 14,
    color: "grey",
    marginLeft: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 12,
    color: "#0d528f",
    fontSize: 16,
    fontWeight: "500",
  },
  filterRow: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 12,
  },
  filterTag: {
    backgroundColor: "#0d528f",
    color: "#fff",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "500",
    marginRight: 8,
  },
});
