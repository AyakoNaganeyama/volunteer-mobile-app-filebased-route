import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Opportunity, Organisation } from "@/constants/types";
import { useEffect, useState } from "react";
import { useOppStore } from "@/userStore/oppArrayStore";
import { useOrganisationStore } from "@/userStore/orgArrayStore";
import { Link, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

export interface OpportunitywithOrg {
  id: string;
  title: string;
  description: string;
  isApproved: boolean;
  location: string;
  category: string;
  commitmentPeriod: string;
  registrationFormUrl: string;
  imageURL?: string;
  date?: Date | null | string;
  organisation: Organisation;
  isOpen: boolean;
}

const opportunityApproval = () => {
  const { opportunities } = useOppStore();
  const { orgList } = useOrganisationStore();
  const [oppwithOrg, setOppwithOrg] = useState<OpportunitywithOrg[]>([]);
  const router = useRouter();

  useEffect(() => {
    const merged = opportunities.map((opp) => {
      const org =
        orgList.find((o) => o.id === opp.companyId) ||
        ({
          id: opp.companyId,
          organisationName: "Unknown Org",
          email: "",
        } as Organisation);

      const { companyId, companyName, ...rest } = opp as any;
      return { ...rest, organisation: org } as OpportunitywithOrg;
    });

    setOppwithOrg(merged);
  }, [opportunities, orgList]);

  return (
    <>
      <View style={{ flex: 1 }}>
        {/* header */}
        <View style={{ width: "90%", alignSelf: "center", marginTop: 30 }}>
          <AntDesign
            name="arrowleft"
            size={24}
            onPress={() => router.push("/enac/(tabs)/one")}
          />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#0d528f",
              marginTop: 20,
            }}
          >
            Approval Waiting List
          </Text>
        </View>

        {/* scrollable list */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
        >
          {oppwithOrg
            .filter((o) => !o.isApproved)
            .map((o) => (
              <View key={o.id} style={styles.card}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Link href={`./editApprove/${o.id}`}>
                      <Text style={styles.title}>{o.title}</Text>
                    </Link>
                    <Link href={`./editApprove/${o.id}`}>
                      <Text style={styles.orgName}>
                        {o.organisation.organisationName}
                      </Text>
                    </Link>
                    <Link href={`./editApprove/${o.id}`}>
                      <Text style={styles.subtitle}>{o.description}</Text>
                    </Link>
                  </View>
                  <AntDesign name="right" size={24} color="black" />
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
    </>
  );
};

export default opportunityApproval;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
  },
  card: {
    width: "95%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  orgName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
  },
});
