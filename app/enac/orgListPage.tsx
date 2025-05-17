import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React from "react";
import { useOrganisationStore } from "@/userStore/orgArrayStore";
import { useState, useEffect } from "react";
import { Organisation } from "@/constants/types";
import { useRouter, Link } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";

const orgListPage = () => {
  const { orgList } = useOrganisationStore();
  const [localOrgList, setLocalOrgList] = useState<Organisation[]>(orgList);
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setLocalOrgList(orgList);
  }, [orgList]);

  const filtered = localOrgList.filter((v) => {
    const q = searchText.toLowerCase();
    return (
      v.organisationName.toLowerCase().includes(q) ||
      v.email.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <SafeAreaView>
        <Text onPress={() => router.back()} style={styles.backText}>
          ← Back
        </Text>
        <View
          style={{
            width: "90%",
            alignSelf: "center",
          }}
        >
          {/* <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#0d528f",
            }}
          >
            Choose an Organisation
          </Text> */}
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search organisations by name or email"
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

        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {filtered.map((org) => (
            <Link key={org.id} href={`./listofEachorg/${org.id}`} asChild>
              <TouchableOpacity style={styles.card} activeOpacity={0.8}>
                <View style={styles.cardRow}>
                  <View>
                    <Text style={styles.title}>{org.organisationName}</Text>
                    <Text style={styles.subtitle}>{org.email}</Text>
                  </View>
                  <AntDesign name="right" size={24} color="black" />
                </View>
              </TouchableOpacity>
            </Link>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default orgListPage;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
  },
  card: {
    width: "95%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Android elevation
    elevation: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
});
