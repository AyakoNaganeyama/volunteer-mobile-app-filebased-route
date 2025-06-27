import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";

import useListing from "@/hooks/vol/useListing";
import { Opportunity } from "@/constants/types";
import useOpportunities from "@/hooks/org/useOpportunities";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react";
import { useRouter, Link } from "expo-router";
import index from "@/app";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Detail from "@/components/orgpost/Detail";
import createOpp from "../createOpp";
import useManageOpportunities from "@/hooks/org/uesManageOpportunities";
import { useFetchOpportunities } from "@/hooks/org/useFetchOpportunities";
import { useOpportunitiesStore } from "@/userStore/orgOpportunityStore";
import AskIfDelete from "@/components/orgpost/AskIfDelete";
import { useNewUserStore } from "@/userStore/isNew";

const one = () => {
  const { createOpportunity } = useManageOpportunities();
  const [opps, setOpps] = useState<Opportunity[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const router = useRouter();
  const { fetchOpportunities } = useFetchOpportunities();
  const { clearOpportunities, addOpportunity, opportunities } =
    useOpportunitiesStore();
  const [isLoading, setIsLoading] = useState(true);
  const { isNew, clearNew } = useNewUserStore();

  useEffect(() => {
    fetchOpportunities()
      .catch(console.error)
      .finally(() => setIsLoading(false));
    console.log("listfetched");
  }, []);

  useEffect(() => {
    setOpps(opportunities);
  }, [opportunities]);

  function handleOpenModal(opp: Opportunity) {
    setSelectedOpp(opp);
    setModalVisible(true);
  }

  function handleDleteModal(opp: Opportunity) {
    setSelectedOpp(opp);
    setDeleteModal(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
    setSelectedOpp(null);
  }

  function handleCloseDeleteModal() {
    setDeleteModal(false);
    setSelectedOpp(null);
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0d528f" />
        <Text>Loading…</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView style={styles.container}>
        {/* <LinearGradient
        colors={['#e0f7fa', '#ffffff']}
        style={styles.background}
      > */}

        <View style={{ flex: 1, justifyContent: "space-between" }}>
          {/* Input Section */}
          <View style={styles.todos}>
            <View style={styles.inputHead}>
              <TouchableOpacity
                onPress={() => router.push("../createOpp")}
                activeOpacity={0.8}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#007AFF", // blue button
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  marginRight: 10,
                  justifyContent: "center",
                  shadowColor: "#000", // iOS shadow
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                  elevation: 3, // Android shadow
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
            </View>
            {isNew && (
              <>
                <View style={styles.con}>
                  <View style={styles.arrow} />
                  <View style={styles.bubble}>
                    <Text style={styles.text}>
                      Tip: you can add opportunities
                    </Text>
                    <TouchableOpacity onPress={() => clearNew()}>
                      <Ionicons name="close" size={16} color="#555" />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}

            {/* Opportunity List */}
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
            >
              {opps.length > 0 && (
                <View>
                  {opps.map((item) => (
                    <View
                      key={item.id}
                      style={{
                        flexDirection: "column",

                        backgroundColor: "#ffffff",
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
                      }}
                    >
                      <View>
                        <TouchableOpacity
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <TouchableOpacity>
                            <Link
                              href={`../applicationDetail/${item.id}`}
                              asChild
                            >
                              <Text style={styles.todoText}>{item.title}</Text>
                            </Link>
                          </TouchableOpacity>

                          <View style={{ flexDirection: "row", gap: 5 }}>
                            <EvilIcons
                              name="pencil"
                              size={24}
                              color="#8e8e93"
                              onPress={() => handleOpenModal(item)}
                            />
                            <Text>|</Text>
                            <AntDesign
                              name="delete"
                              size={20}
                              color="#8e8e93"
                              onPress={() => handleDleteModal(item)}
                            />
                          </View>
                        </TouchableOpacity>

                        <Text>{item.isOpen}</Text>
                      </View>

                      <Link href={`../applicationDetail/${item.id}`} asChild>
                        <TouchableOpacity>
                          <View style={styles.todoItem}>
                            <View style={{ flexDirection: "column" }}>
                              {/* Approval row */}
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                {/* give the label a fixed width */}
                                <Text style={{ width: 120, marginRight: 6 }}>
                                  Approval Status:
                                </Text>
                                <Text
                                  style={{
                                    backgroundColor: item.isApproved
                                      ? "#28a745"
                                      : "#ffc107",
                                    color: "#fff",
                                    paddingHorizontal: 8,
                                    paddingVertical: 4,
                                    borderRadius: 12,
                                    fontSize: 12,
                                    fontWeight: "600",
                                  }}
                                >
                                  {item.isApproved
                                    ? "Approved"
                                    : "Pending Approval"}
                                </Text>
                              </View>

                              {/* Open row */}
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  marginTop: 8,
                                }}
                              >
                                {/* same fixed width here */}
                                <Text style={{ width: 120, marginRight: 6 }}>
                                  Open Status:
                                </Text>
                                <Text
                                  style={{
                                    backgroundColor: item.isOpen
                                      ? "#28a745"
                                      : "#ffc107",
                                    color: "#fff",
                                    paddingHorizontal: 8,
                                    paddingVertical: 4,
                                    borderRadius: 12,
                                    fontSize: 12,
                                    fontWeight: "600",
                                  }}
                                >
                                  {item.isOpen ? "Active" : "Inactive"}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </Link>
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        </View>

        {selectedOpp && modalVisible && (
          <Detail
            visible={modalVisible}
            onClose={handleCloseModal}
            opp={selectedOpp}
          />
        )}

        {selectedOpp && deleteModal && (
          <AskIfDelete
            visible={deleteModal}
            onClose={handleCloseDeleteModal}
            opp={selectedOpp}
          />
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default one;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    marginTop: 20,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0d528f",
    textAlign: "center",
  },
  todos: {
    padding: 20,
    flex: 1,
  },
  inputHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  AddButton: {
    backgroundColor: "#007aff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#c7c7c7",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todoText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  logoutButtonContainer: {
    padding: 10,
  },
  buttonStyle: {
    backgroundColor: "#0d528f",
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bubble: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // Elevation for Android
    elevation: 2,
    width: 150,
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    marginRight: 8,
  },
  arrow: {
    width: 0,
    height: 0,

    borderBottomWidth: 10,
    borderBottomColor: "#fff",
    borderLeftWidth: 10,
    borderLeftColor: "transparent",
    borderRightWidth: 10,
    borderRightColor: "transparent",

    marginLeft: 16,
    marginBottom: -1,
  },
  con: {
    alignItems: "flex-start",
  },
});
