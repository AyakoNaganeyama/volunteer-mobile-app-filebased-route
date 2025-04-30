import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Opportunity, Organisation } from "@/constants/types";
import { useEffect, useState } from "react";
import { useOppStore } from "@/userStore/oppArrayStore";
import { useOrganisationStore } from "@/userStore/orgArrayStore";

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
    <ScrollView contentContainerStyle={styles.container}>
      {oppwithOrg.map((o) => (
        <View key={o.id} style={styles.card}>
          <Text style={styles.title}>{o.title}</Text>
          <Text style={styles.orgName}>{o.organisation.organisationName}</Text>
          <Text style={styles.subtitle}>{o.description}</Text>
        </View>
      ))}
    </ScrollView>
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
