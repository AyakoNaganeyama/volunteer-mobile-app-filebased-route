import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";

export interface Opportunity {
  id: string;
  title: string;
  companyName: string;
  description: string;
  isApproved: boolean;
  location: string;
  category: string;
  commitmentPeriod: string;
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
  },
];

const one = () => {
  return (
    <View>
      <Link href="/vol/detail">
        <Text>Open Detail</Text>
      </Link>
    </View>
  );
};

export default one;
