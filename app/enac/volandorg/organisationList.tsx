import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import React from "react";
import { useOrganisationStore } from "@/userStore/orgArrayStore";
import { Volunteer } from "@/constants/types";
import { useState, useEffect } from "react";
import { useRouter, Link } from "expo-router";
import { Organisation } from "@/constants/types";
const organisationList = () => {
  const { orgList } = useOrganisationStore();
  const [orgs, setOrgs] = useState<Organisation[]>(orgList);
  const defaultProfileIcon = require("../../../assets/images/blankIcon.png");
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setOrgs(orgList);
  }, [orgList]);

  const filtered = orgs.filter((v) => {
    const q = searchText.toLowerCase();
    return (
      v.organisationName.toLowerCase().includes(q) ||
      v.email.toLowerCase().includes(q)
    );
  });

  return (
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
        {searchText !== "" && (
          <TouchableOpacity
            onPress={() => setSearchText("")}
            style={styles.clearButton}
          >
            <Text style={styles.clearButtonText}>×</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {filtered.length === 0 && (
          <View style={styles.empty}>
            <Text>No volunteers match your search.</Text>
          </View>
        )}
        {filtered.map((item) => (
          <Link key={item.id} href={`../oppsofeachorg/${item.id}`} asChild>
            <TouchableOpacity style={styles.item}>
              <Image source={defaultProfileIcon} style={styles.avatar} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.organisationName}</Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default organisationList;

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

    // make the container look like the input
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    height: 40, // match TextInput height
    position: "relative",
  },
  searchInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 12,
    paddingRight: 32, // leave room for the clear icon
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
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
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
});
