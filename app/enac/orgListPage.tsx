import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useOrganisationStore } from "@/userStore/orgArrayStore";
import { useState, useEffect } from "react";
import { Organisation } from "@/constants/types";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const orgListPage = () => {
  const { orgList } = useOrganisationStore();
  const [localOrgList, setLocalOrgList] = useState<Organisation[]>(orgList);
  const router = useRouter();

  useEffect(() => {
    setLocalOrgList(orgList);
  }, [orgList]);

  return (
    <>
      <AntDesign name="arrowleft" size={24} onPress={() => router.back()} />
      <View
        style={{
          flex: 1,
          width: "90%",
          alignSelf: "center",
          marginTop: 30,
        }}
      >
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          onPress={() => {
            router.back();
          }}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#0d528f",
            marginTop: 20,
          }}
        >
          Choose an Organisation
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {localOrgList.map((org) => (
          <TouchableOpacity
            key={org.id}
            style={styles.card}
            activeOpacity={0.8}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={styles.title}>{org.organisationName}</Text>
                <Text style={styles.subtitle}>{org.email}</Text>
              </View>

              <View>
                <AntDesign name="right" size={24} color="black" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
});
