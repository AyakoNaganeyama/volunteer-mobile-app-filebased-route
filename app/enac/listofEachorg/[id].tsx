import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter, Link } from "expo-router";
import { useOppStore } from "@/userStore/oppArrayStore";
import { Opportunity } from "@/constants/types";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

const EachList = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { opportunities } = useOppStore();
  const [opps, setOpps] = useState<Opportunity[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const filtered = opportunities.filter((o) => o.companyId === id);
    setOpps(filtered);
  }, [opportunities, id]);

  return (
    <>
      <Text onPress={() => router.back()} style={styles.backText}>
        ← Back
      </Text>
      <Link href={`../createOppforOrg/${id}`} asChild>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#007AFF",
            borderRadius: 8,
            paddingVertical: 10,
            paddingHorizontal: 16,
            marginRight: 10,
            justifyContent: "center",
            // iOS shadow
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            // Android shadow
            elevation: 3,
            width: "30%",
            alignSelf: "flex-end",
          }}
        >
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "600",
              marginLeft: 8,
            }}
          >
            Add New
          </Text>
        </TouchableOpacity>
      </Link>

      {opps.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            No listings yet for this organisation.
          </Text>
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, padding: 16 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {opps.map((item) => (
            <Link
              href={`../detailofAppandOpp/${item.id}`}
              key={item.id}
              asChild
            >
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.8}
                key={item.id}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={styles.icons}>
                    <AntDesign name="right" size={24} color="black" />
                  </View>
                </View>

                <View style={styles.statusRow}>
                  <Text style={styles.label}>Approval:</Text>
                  <Text
                    style={[
                      styles.badge,
                      item.isApproved ? styles.approved : styles.pending,
                    ]}
                  >
                    {item.isApproved ? "Approved" : "Pending"}
                  </Text>
                </View>

                <View style={styles.statusRow}>
                  <Text style={styles.label}>Open:</Text>
                  <Text
                    style={[
                      styles.badge,
                      item.isOpen ? styles.approved : styles.pending,
                    ]}
                  >
                    {item.isOpen ? "Active" : "Inactive"}
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default EachList;

const styles = StyleSheet.create({
  backText: { fontSize: 16, color: "#0d528f", margin: 16 },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  emptyText: { fontSize: 16, color: "#666" },
  scroll: { padding: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: { fontSize: 16, fontWeight: "600" },
  icons: { flexDirection: "row", gap: 6 },
  statusRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  label: { width: 100, fontSize: 14 },
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
