import {
  View,
  Text,
  Image,
  Switch,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import { useOppStore } from "@/userStore/oppArrayStore";
import { Opportunity } from "@/constants/types";
import { useState, useEffect } from "react";
import usegetImage from "@/hooks/vol/usegetImage";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Entypo from "@expo/vector-icons/Entypo";
import * as Linking from "expo-linking";
import Approve from "@/components/enac/Approve";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Application } from "@/constants/types";
import { useOrganisationStore } from "@/userStore/orgArrayStore";
import { useApplicationListStore } from "@/userStore/enacApplicationStore";
import { Organisation } from "@/constants/types";
import * as MailComposer from "expo-mail-composer";

const detail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getImage } = usegetImage();

  const { opportunities } = useOppStore();
  const { orgList } = useOrganisationStore();
  const { ApplicationList } = useApplicationListStore();

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [org, setOrg] = useState<Organisation | null>(null);
  const [apps, setApps] = useState<Application[]>([]);

  useEffect(() => {
    if (!id) return;

    //Find the opportunity by its own ID
    const foundOpp = opportunities.find((o) => o.id === id) || null;
    setOpportunity(foundOpp);

    if (foundOpp) {
      // Find the org whose ID matches that opportunity’s companyId
      const foundOrg = orgList.find((o) => o.id === foundOpp.companyId) || null;
      setOrg(foundOrg);

      // Filter applications for those whose opportunity.id === id
      const filteredApps = ApplicationList.filter(
        (app) => app.opportunity.id === id
      );
      setApps(filteredApps);
    } else {
      // if no opp, clear downstream state
      setOrg(null);
      setApps([]);
    }
  }, [id, opportunities, orgList, ApplicationList]);

  const sendEmail = async (address: string) => {
    // Try MailComposer first
    if (await MailComposer.isAvailableAsync()) {
      await MailComposer.composeAsync({
        recipients: [address],
        subject: "",
        body: "",
      });
    } else {
      // fallback to mailto:
      Linking.openURL(`mailto:${address}`);
    }
  };

  if (!opportunity || !org) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading…</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Text
        onPress={() => router.back()}
        style={{ fontSize: 16, color: "#0d528f", margin: 16 }}
      >
        ← Back
      </Text>

      {/* Organisation Info */}
      {org && (
        <View
          style={{
            backgroundColor: "#eef5ff",
            marginVertical: 8,
            borderRadius: 8,
            width: "90%",
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            {org.organisationName}
          </Text>
          <TouchableOpacity onPress={() => sendEmail(org.email)}>
            <Text
              style={{
                fontSize: 16,
                color: "blue",
                textDecorationLine: "underline",
              }}
            >
              {org.email}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Full opportunity details */}
      <View>
        <>
          <Image
            source={getImage(opportunity.category)}
            style={{ width: "100%", height: 200 }}
          />

          <View
            style={{
              marginBottom: 30,
              backgroundColor: "#eef5ff",
            }}
          >
            <View style={{ width: "90%", paddingHorizontal: 30 }}>
              <Text
                style={{
                  fontSize: 18,

                  fontWeight: "bold",
                  marginTop: 20,
                  marginBottom: 5,
                }}
              >
                {opportunity.title}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <View style={styles.statusRow}>
                  <Text
                    style={[
                      styles.badge,
                      opportunity.isApproved ? styles.approved : styles.pending,
                    ]}
                  >
                    {opportunity.isApproved ? "Approved" : "Pending"}
                  </Text>
                </View>

                <View style={styles.statusRow}>
                  <Text
                    style={[
                      styles.badge,
                      opportunity.isOpen ? styles.approved : styles.pending,
                    ]}
                  >
                    {opportunity.isOpen ? "Active" : "Inactive"}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                width: "90%",
                gap: 30,

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
              <Text style={{ fontSize: 16 }}>
                {opportunity.commitmentPeriod}
              </Text>
            </View>

            <View
              style={{
                width: "90%",
                paddingHorizontal: 30,

                marginBottom: 20,
              }}
            >
              <Text style={{ fontSize: 14, color: "grey", fontWeight: "bold" }}>
                Organisation Form URL
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    color: "blue",
                    textDecorationLine: "underline",
                  }}
                >
                  {opportunity.registrationFormUrl}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      </View>

      {/* Applied Volunteers */}
      <View style={{ paddingVertical: 16, paddingHorizontal: 30 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
          Applied Volunteers
        </Text>

        {apps.length === 0 ? (
          <Text style={{ color: "#666" }}>No one has applied yet.</Text>
        ) : (
          apps.map((app) => {
            // look up the volunteer’s name

            return (
              <View
                key={app.id}
                style={{
                  padding: 12,
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: "#ddd",
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: "500" }}>
                  {app.volunteer.fullName}
                </Text>
                <TouchableOpacity onPress={() => sendEmail(org.email)}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "blue",
                      textDecorationLine: "underline",
                    }}
                  >
                    {app.volunteer.email}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </View>

      {/* ← your Approve switch & modal, etc. */}
    </ScrollView>
  );
};

export default detail;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  backText: {
    fontSize: 16,
    color: "#0d528f",
    marginBottom: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  orgSection: {
    backgroundColor: "#eef5ff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  orgName: {
    fontSize: 18,
    fontWeight: "600",
  },
  orgEmail: {
    fontSize: 14,
    color: "gray",
    marginTop: 4,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginTop: 4,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowText: {
    marginLeft: 6,
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    color: "gray",
    fontWeight: "600",
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  link: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
  },
  approveSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  volCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
  },
  volName: {
    fontSize: 15,
    fontWeight: "500",
  },
  volEmail: {
    fontSize: 13,
    color: "gray",
    marginTop: 2,
  },
  volDetail: {
    fontSize: 13,
    color: "gray",
    marginTop: 4,
  },
  statusRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },

  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  approved: { backgroundColor: "#28a745" },
  pending: { backgroundColor: "#ffc107" },
});
