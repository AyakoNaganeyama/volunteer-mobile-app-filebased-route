import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { mockOpportunities } from "@/constants/mockListing";
import { Opportunity } from "@/constants/mockListing";
import { useEffect, useState } from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import * as MailComposer from "expo-mail-composer";
import * as Linking from "expo-linking";

const Page = () => {
  const handleRedirect = async () => {
    const url = "https://www.everynationauckland.city/";
    // Optionally, you can check if the URL can be opened
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("Don't know how to open URI: " + url);
    }
  };

  // const handleApply = async () => {
  //   const isAvailable = await MailComposer.isAvailableAsync();
  //   if (isAvailable) {
  //     await MailComposer.composeAsync({
  //       recipients: ["user@example.com"], // dynamically set user's email
  //       subject: "Application Received",
  //       body: "Thank you for applying!",
  //     });
  //   } else {
  //     // Fallback or alert if email client is unavailable
  //     alert("Email client is not available on this device.");
  //   }
  // };

  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);

  useEffect(() => {
    const foundOpportunity = mockOpportunities.find((opp) => opp.id === id);
    setOpportunity(foundOpportunity || null);
  }, [id]);
  if (!opportunity) {
    return <Text>Loading opportunity...</Text>;
  }
  return (
    <>
      <Image
        source={opportunity!.imageURL}
        style={{ width: "100%", height: 200 }}
      />
      <View
        style={{ alignSelf: "center", marginHorizontal: 20, marginBottom: 30 }}
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

        <View
          style={{
            width: "90%",
            paddingHorizontal: 30,
          }}
        >
          <Text style={{ fontSize: 14, color: "grey", fontWeight: "bold" }}>
            Time Required
          </Text>
          <Text style={{ fontSize: 16 }}>
            At least 2 hrs monthly 3.30pm-5.30pm, usually last Thursday of the
            month plus some events through the year
          </Text>
        </View>

        <View
          style={{
            alignSelf: "center",
            width: "90%",
            paddingHorizontal: 30,
            gap: 5,
            marginTop: 30,
          }}
        ></View>
        <View style={{ marginBottom: 100 }}>
          <TouchableOpacity onPress={handleRedirect} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Page;
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
  },
  heading: {
    fontSize: 32,
    color: "#007aff",
    fontWeight: "bold",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderColor: "#007aff",
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 20,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#333333",
    fontSize: 16,
  },
  Button: {
    backgroundColor: "#007aff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonDisabled: {
    backgroundColor: "#c7c7c7",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ff5252",
    fontSize: 13,
    marginBottom: 10,
  },

  buttonStyle: {
    backgroundColor: "#0d528f",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignSelf: "center",
    marginBottom: 30,
  },
});
