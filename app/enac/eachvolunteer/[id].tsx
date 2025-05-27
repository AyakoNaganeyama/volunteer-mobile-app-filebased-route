import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useApplicationListStore } from "@/userStore/enacApplicationStore";
import { useOppStore } from "@/userStore/oppArrayStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Application } from "@/constants/types";
import { Volunteer } from "@/constants/types";
import { useVolunteerListStore } from "@/userStore/volusersArrayStore";

const eachVol = () => {
  const { ApplicationList } = useApplicationListStore();
  const { opportunities } = useOppStore();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [myApps, setMyApps] = useState<Application[]>([]);
  const { volunteerList } = useVolunteerListStore();
  const [vol, setVol] = useState<Volunteer>();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    // filter applications for this volunteer
    const filtered = ApplicationList.filter((app) => app.volunteer.id === id);
    setMyApps(filtered);
    const found = volunteerList.find((v) => v.id === id);
    setVol(found);
  }, [ApplicationList, id, volunteerList]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text
        onPress={() => router.back()}
        style={{ fontSize: 16, color: "#0d528f", margin: 16 }}
      >
        ← Back
      </Text>
      {vol && (
        <>
          <View
            style={{
              backgroundColor: "#eef5ff",
              marginVertical: 8,
              borderRadius: 8,
              width: "90%",

              paddingVertical: 20,
              paddingLeft: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              {vol.fullName}
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text
                style={{
                  fontSize: 16,
                  color: "blue",
                  textDecorationLine: "underline",
                }}
              >
                {vol.email}
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#0d528f",

              marginVertical: 12,
              marginLeft: 10,
            }}
          >
            {vol.fullName}'s application list
          </Text>
        </>
      )}

      <ScrollView contentContainerStyle={styles.list}>
        {myApps.length === 0 && (
          <Text style={styles.noApps}>No applications found.</Text>
        )}
        {myApps.map((app) => (
          <View key={app.id} style={styles.card}>
            <Text style={styles.company}>
              Company: {app.opportunity.companyName}
            </Text>
            <Text style={styles.title}>Title: {app.opportunity.title}</Text>
            <Text style={styles.category}>
              Category: {app.opportunity.category}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default eachVol;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#0d528f",
  },
  list: {
    paddingBottom: 24,
  },
  noApps: {
    textAlign: "center",
    color: "#666",
    marginTop: 32,
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    // shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // elevation for Android
    elevation: 2,
  },
  company: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    marginBottom: 2,
  },
  category: {
    fontSize: 14,
    color: "#666",
  },
});
