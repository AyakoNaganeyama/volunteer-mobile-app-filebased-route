import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useOppStore } from "@/userStore/oppArrayStore";
import { Opportunity } from "@/constants/types";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

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
            <View key={item.id} style={styles.card}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity>
                  <Text style={styles.todoText}>{item.title}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <EvilIcons name="pencil" size={24} color="#8e8e93" />
                  <Text>|</Text>
                  <AntDesign name="delete" size={20} color="#8e8e93" />
                </View>
              </View>

              <View>
                <View style={styles.statusRow}>
                  <Text style={styles.label}>Approval Status:</Text>
                  <Text
                    style={[
                      styles.statusBadge,
                      item.isApproved ? styles.approved : styles.pending,
                    ]}
                  >
                    {item.isApproved ? "Approved" : "Pending"}
                  </Text>
                </View>

                <View style={styles.statusRow}>
                  <Text style={styles.label}>Open Status:</Text>
                  <Text
                    style={[
                      styles.statusBadge,
                      item.isOpen ? styles.approved : styles.pending,
                    ]}
                  >
                    {item.isOpen ? "Active" : "Inactive"}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default EachList;

const styles = StyleSheet.create({
  backText: {
    fontSize: 16,
    color: "#0d528f",
    margin: 16,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderColor: "#0d528f",
    borderWidth: 1,
    gap: 10,
  },
  todoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  label: {
    width: 120,
    marginRight: 6,
    fontSize: 14,
    color: "#333",
  },
  statusBadge: {
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "600",
  },
  approved: {
    backgroundColor: "#28a745",
  },
  pending: {
    backgroundColor: "#ffc107",
  },
});
