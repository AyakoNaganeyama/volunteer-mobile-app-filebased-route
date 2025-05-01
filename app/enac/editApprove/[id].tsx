import { View, Text, Image, Switch } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import { useOppStore } from "@/userStore/oppArrayStore";
import { Opportunity } from "@/constants/types";
import { useState, useEffect } from "react";
import usegetImage from "@/hooks/vol/usegetImage";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Entypo from "@expo/vector-icons/Entypo";

const approvePage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { opportunities } = useOppStore();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const { getImage } = usegetImage();
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    console.log("Switch is now:", isEnabled);
  }, [isEnabled]);

  const handleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  useEffect(() => {
    const foundOpportunity = opportunities.find((opp) => opp.id === id);
    setOpportunity(foundOpportunity || null);
  }, [id]);
  if (!opportunity) {
    return <Text>Loading opportunity...</Text>;
  }

  return (
    <View>
      <Text
        onPress={() => {
          router.back();
        }}
      >
        Back
      </Text>
      <>
        <Image
          source={getImage(opportunity.category)}
          style={{ width: "100%", height: 200 }}
        />

        <View
          style={{
            alignSelf: "center",
            marginHorizontal: 20,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
              marginTop: 20,
              marginBottom: 5,
            }}
          >
            {opportunity.title}
          </Text>
          <Text style={{ fontSize: 14, color: "grey", textAlign: "center" }}>
            {opportunity.companyName}
          </Text>

          <View
            style={{
              width: "90%",
              gap: 30,
              alignSelf: "center",
              marginTop: 30,
              paddingHorizontal: 30,
              flexDirection: "row",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <EvilIcons name="location" size={24} color="black" />
              <Text>{opportunity.location}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Entypo name="awareness-ribbon" size={24} color="black" />
              <Text>{opportunity.category}</Text>
            </View>
          </View>

          <View
            style={{
              width: "90%",
              paddingHorizontal: 30,

              marginBottom: 20,
              marginTop: 30,
            }}
          >
            <Text style={{ fontSize: 14, color: "grey", fontWeight: "bold" }}>
              Description
            </Text>
            <Text style={{ fontSize: 16 }}>{opportunity.description}</Text>
          </View>

          <View
            style={{
              width: "90%",
              paddingHorizontal: 30,

              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 14, color: "grey", fontWeight: "bold" }}>
              Commitment Period
            </Text>
            <Text style={{ fontSize: 16 }}>{opportunity.commitmentPeriod}</Text>
          </View>
        </View>
      </>
      <View
        style={{
          width: "90%",
          alignSelf: "flex-end", // aligns the whole block to the right
          marginTop: 30,
          paddingHorizontal: 30,
          flexDirection: "row",
          justifyContent: "flex-end", // pushes content to the right
          alignItems: "center",
          gap: 10, // optional spacing
        }}
      >
        <Text>Approve</Text>
        <View style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </View>
  );
};

export default approvePage;
