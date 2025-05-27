import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  SectionList,
} from "react-native";
import React from "react";
import { useVolunteerListStore } from "@/userStore/volusersArrayStore";
import { Volunteer } from "@/constants/types";
import { useState, useEffect, useMemo } from "react";
import { useRouter, Link } from "expo-router";

const volandorg = () => {
  const { volunteerList } = useVolunteerListStore();
  const [volunteers, setVolunteers] = useState<Volunteer[]>(volunteerList);
  const defaultProfileIcon = require("../../../assets/images/blankIcon.png");
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const sorted = [...volunteerList].sort((a, b) =>
      a.fullName.localeCompare(b.fullName)
    );
    setVolunteers(sorted);
  }, [volunteerList]);

  const filtered = volunteers.filter((v) => {
    const q = searchText.toLowerCase();
    return (
      v.fullName.toLowerCase().includes(q) || v.email.toLowerCase().includes(q)
    );
  });

  const sections = useMemo(() => {
    const groups: Record<string, Volunteer[]> = {};
    filtered.forEach((v) => {
      const letter = v.fullName[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(v);
    });
    return Object.keys(groups)
      .sort()
      .map((letter) => ({
        title: letter,
        data: groups[letter],
      }));
  }, [filtered]);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Text onPress={() => router.back()} style={styles.backText}>
          ← Back
        </Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or email"
            value={searchText}
            onChangeText={setSearchText}
            autoCapitalize="none"
          />
          {!!searchText && (
            <TouchableOpacity
              onPress={() => setSearchText("")}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>×</Text>
            </TouchableOpacity>
          )}
        </View>

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          renderItem={({ item }) => (
            <Link key={item.id} href={`../eachvolunteer/${item.id}`} asChild>
              <TouchableOpacity style={styles.item}>
                <Image source={defaultProfileIcon} style={styles.avatar} />
                <View style={styles.info}>
                  <Text style={styles.name}>{item.fullName}</Text>
                  <Text style={styles.email}>{item.email}</Text>
                </View>
              </TouchableOpacity>
            </Link>
          )}
          ListEmptyComponent={() => (
            <View style={styles.empty}>
              <Text>No volunteers match your search.</Text>
            </View>
          )}
          contentContainerStyle={styles.container}
        />
      </SafeAreaView>
    </>
  );
};

export default volandorg;

const styles = StyleSheet.create({
  backText: {
    fontSize: 16,
    color: "#0d528f",
    margin: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    height: 40,
    position: "relative",
  },
  searchInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 12,
    paddingRight: 32,
  },
  clearButton: {
    position: "absolute",
    right: 8,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
  clearButtonText: {
    fontSize: 18,
    color: "#888",
  },
  sectionHeader: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 4,
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: "700",
  },
  container: {
    paddingBottom: 24,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 6,
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
});
