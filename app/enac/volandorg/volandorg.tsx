import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { useVolunteerListStore } from "@/userStore/volusersArrayStore";
import { Volunteer } from "@/constants/types";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";

const volandorg = () => {
  const { volunteerList } = useVolunteerListStore();
  const [volunteers, setVolunteers] = useState<Volunteer[]>(volunteerList);
  const defaultProfileIcon = require("../../../assets/images/blankIcon.png");
  const router = useRouter();

  useEffect(() => {
    setVolunteers(volunteerList);
  }, [volunteerList]);

  return (
    <>
      <Text onPress={() => router.back()} style={styles.backText}>
        ← Back
      </Text>
      <ScrollView contentContainerStyle={styles.container}>
        {volunteers.length === 0 && (
          <View style={styles.empty}>
            <Text>No volunteers to display.</Text>
          </View>
        )}
        {volunteers.map((item) => (
          <View key={item.id} style={styles.item}>
            <Image source={defaultProfileIcon} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.fullName}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default volandorg;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: "#eee",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  empty: {
    alignItems: "center",
    marginTop: 50,
  },
  backText: { fontSize: 16, color: "#0d528f", margin: 16 },
});
