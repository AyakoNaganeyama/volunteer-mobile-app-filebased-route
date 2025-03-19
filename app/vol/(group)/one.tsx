import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

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
    location: "Auckland, NZ",
    category: "Environmental",
    commitmentPeriod: "Weekend",
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
    location: "Wellington, NZ",
    category: "Humanitarian",
    commitmentPeriod: "Flexible",
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
    location: "Christchurch, NZ",
    category: "Education",
    commitmentPeriod: "6 months",
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
    location: "Dunedin, NZ",
    category: "Animal Welfare",
    commitmentPeriod: "Weekly",
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
    location: "Auckland, NZ",
    category: "Event Planning",
    commitmentPeriod: "Project-based",
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
    location: "Hamilton, NZ",
    category: "Technology",
    commitmentPeriod: "3 months",
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
    location: "Tauranga, NZ",
    category: "Sports & Recreation",
    commitmentPeriod: "Seasonal",
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
            style={{ width: "90%", alignSelf: "center", marginVertical: 10 }}
          >
            <Image
              source={opportunity.imageURL}
              style={{ width: "100%", height: 200 }}
            />
            {/* <View style={{ alignSelf: "center" }}> */}
            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 8 }}>
              {opportunity.title}
            </Text>
            <Text style={{ fontSize: 14, color: "grey" }}>
              {opportunity.commitmentPeriod}
            </Text>
            {/* </View> */}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default one;
