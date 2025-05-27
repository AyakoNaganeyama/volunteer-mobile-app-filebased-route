import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SectionList,
} from "react-native";
import React from "react";
import { useOrganisationStore } from "@/userStore/orgArrayStore";
import { useState, useEffect, useMemo } from "react";
import { Organisation } from "@/constants/types";
import { useRouter, Link } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import Octicons from "@expo/vector-icons/Octicons";

const orgListPage = () => {
  const { orgList } = useOrganisationStore();
  const [localOrgList, setLocalOrgList] = useState<Organisation[]>(orgList);
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const sorted = [...orgList].sort((a, b) =>
      a.organisationName.localeCompare(b.organisationName)
    );
    setLocalOrgList(sorted);
  }, [orgList]);

  const filtered = localOrgList.filter((v) => {
    const q = searchText.toLowerCase();
    return (
      v.organisationName.toLowerCase().includes(q) ||
      v.email.toLowerCase().includes(q)
    );
  });
  const sections = useMemo(() => {
    const groups: Record<string, Organisation[]> = {};
    filtered.forEach((org) => {
      const letter = org.organisationName[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(org);
    });
    return Object.keys(groups)
      .sort()
      .map((letter) => ({ title: letter, data: groups[letter] }));
  }, [filtered]);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Text onPress={() => router.back()} style={styles.backText}>
          ← Back
        </Text>
        <View
          style={{
            width: "90%",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#0d528f",
              marginBottom: 20,
            }}
          >
            Please Choose an Organisation
          </Text>
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

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          renderItem={({ item }) => (
            <Link key={item.id} href={`./listofEachorg/${item.id}`} asChild>
              <TouchableOpacity style={styles.card} activeOpacity={0.8}>
                <View style={styles.cardRow}>
                  <View style={styles.cardLeft}>
                    <Octicons name="organization" size={24} color="gray" />
                    <Text style={styles.title}>{item.organisationName}</Text>
                  </View>
                  <AntDesign name="right" size={20} color="black" />
                </View>
              </TouchableOpacity>
            </Link>
          )}
          ListEmptyComponent={() => (
            <View style={styles.empty}>
              <Text>No organisations match your search.</Text>
            </View>
          )}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          style={{ flex: 1 }}
        />
      </SafeAreaView>
    </>
  );
};

export default orgListPage;

const styles = StyleSheet.create({
  backText: {
    fontSize: 16,
    color: "#0d528f",
    margin: 16,
  },
  header: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 12,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0d528f",
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
    paddingVertical: 6,
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: "700",
  },
  container: {
    paddingBottom: 80,
  },
  card: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: "2.5%",
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  empty: {
    alignItems: "center",
    marginTop: 50,
  },
});
