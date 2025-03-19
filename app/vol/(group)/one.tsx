import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
export interface Opportunity {
  id: string;
  title: string;
  companyName: string;
  description: string;
  isApproved: boolean;
  location: string;
  category: string;
  commitmentPeriod: string;
  registrationFormUrl: string;
  imageURL: any;
}

export const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Community Cleanup Volunteer",
    companyName: "Green Earth Initiative",
    description: "Help clean up parks and streets in your local community.",
    isApproved: true,
    location: "Auckland CBD",
    category: "Environmental",
    commitmentPeriod: "One off - an event",
    registrationFormUrl: "https://example.com/register/cleanup",
    imageURL: require("../../../assets/images/exampleImage.jpg"),
  },
  {
    id: "2",
    title: "Food Bank Assistant",
    companyName: "Hope Food Bank",
    description:
      "Assist in sorting, packing, and distributing food to those in need.",
    isApproved: true,
    location: "North Shore",
    category: "Humanitarian",
    commitmentPeriod: "One off - a few hours",
    registrationFormUrl: "https://example.com/register/foodbank",
    imageURL: require("../../../assets/images/exampleImage.jpg"),
  },
  {
    id: "3",
    title: "Youth Mentor",
    companyName: "Future Leaders Program",
    description:
      "Guide and mentor young students to help them develop leadership skills.",
    isApproved: false,
    location: "Online or Remote",
    category: "Education",
    commitmentPeriod: "Regular - less than 6 months",
    registrationFormUrl: "https://example.com/register/youthmentor",
    imageURL: require("../../../assets/images/exampleImage.jpg"),
  },
  {
    id: "4",
    title: "Animal Shelter Helper",
    companyName: "Paws & Claws Rescue",
    description:
      "Assist in taking care of rescued animals and helping with adoptions.",
    isApproved: true,
    location: "East Auckland",
    category: "Animal Welfare",
    commitmentPeriod: "Regular - more than 6 months",
    registrationFormUrl: "https://example.com/register/animalshelter",
    imageURL: require("../../../assets/images/exampleImage.jpg"),
  },
  {
    id: "5",
    title: "Event Coordinator",
    companyName: "Charity Events NZ",
    description:
      "Plan and coordinate fundraising events for various charitable causes.",
    isApproved: true,
    location: "Auckland CBD",
    category: "Event Planning",
    commitmentPeriod: "One off - an event",
    registrationFormUrl: "https://example.com/register/eventcoordinator",
    imageURL: require("../../../assets/images/exampleImage.jpg"),
  },
  {
    id: "6",
    title: "Tech Support Volunteer",
    companyName: "Digital Inclusion Initiative",
    description:
      "Help seniors and underserved communities learn basic digital skills.",
    isApproved: false,
    location: "Online or Remote",
    category: "Technology",
    commitmentPeriod: "Regular - less than 6 months",
    registrationFormUrl: "https://example.com/register/techsupport",
    imageURL: require("../../../assets/images/exampleImage.jpg"),
  },
  {
    id: "7",
    title: "Sports Coach Volunteer",
    companyName: "Youth Sports Academy",
    description:
      "Coach young athletes in basketball and soccer to promote active lifestyles.",
    isApproved: true,
    location: "West Auckland",
    category: "Sports & Recreation",
    commitmentPeriod: "Regular - more than 6 months",
    registrationFormUrl: "https://example.com/register/sportscoach",
    imageURL: require("../../../assets/images/exampleImage.jpg"),
  },
];

const one = () => {
  const [opportunities, setOpportunities] =
    useState<Opportunity[]>(mockOpportunities);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, marginVertical: 20 }}>
        {opportunities.map((opportunity) => (
          <View
            key={opportunity.id}
            style={{ width: "90%", alignSelf: "center", marginVertical: 15 }}
          >
            <Image
              source={opportunity.imageURL}
              style={{ width: "100%", height: 200 }}
            />
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
