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
} from "react-native";
import React from "react";
import { Opportunity } from "@/constants/mockListing";
import useListing from "@/hooks/vol/useListing";
import useOpportunities from "@/hooks/org/useOpportunities";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import index from "@/app";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Detail from "@/components/orgpost/Detail";
import createOpp from "../createOpp";
import useManageOpportunities from "@/hooks/org/uesManageOpportunities";
const one = () => {
  const { createOpportunity } = useManageOpportunities();
  const { opps, setOpps, fetchListings } = useOpportunities();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchListings();
  }, []);

  function handleOpenModal(opp: Opportunity) {
    setSelectedOpp(opp);
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
    setSelectedOpp(null);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        {/* <LinearGradient
        colors={['#e0f7fa', '#ffffff']}
        style={styles.background}
      > */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Manage Opportunities</Text>
        </View>

        <View style={{ flex: 1, justifyContent: "space-between" }}>
          {/* Input Section */}
          <View style={styles.todos}>
            <View style={styles.inputHead}>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="add-circle-outline"
                  size={30}
                  color="#8e8e93"
                  style={styles.icon}
                  onPress={() => router.push("../createOpp")}
                />
                <Text style={{ color: "#8e8e93", fontSize: 18 }}>Add New</Text>
                {/* <TextInput
                  placeholder="Add new todo"
                  value={""}
                  placeholderTextColor="#8e8e93"
                  style={styles.input}
                /> */}
              </View>
            </View>

            {/* Opportunity List */}
            <ScrollView style={{ flex: 1 }}>
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
                      <View style={styles.todoItem}>
                        <TouchableOpacity
                        // onPress={() => toggleDone(item.id)}
                        >
                          {/* {item.done ? (
                          <Ionicons
                            name="checkmark-circle"
                            size={24}
                            color="#007aff"
                          />
                        ) : (
                          <Entypo name="circle" size={24} color="#007aff" />
                        )} */}
                          <TouchableOpacity>
                            <Text style={styles.todoText}>{item.title}</Text>
                          </TouchableOpacity>
                        </TouchableOpacity>

                        <Text>{item.datePosted}</Text>
                      </View>
                      <View style={styles.todoItem}>
                        <View style={{ flexDirection: "row", gap: 5 }}>
                          <EvilIcons
                            name="pencil"
                            size={24}
                            color="#8e8e93"
                            onPress={() => handleOpenModal(item)}
                          />
                          <Text>|</Text>
                          <AntDesign name="delete" size={20} color="#8e8e93" />
                        </View>

                        <Text style={{ color: "#8e8e93" }}>
                          Status:Approved
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        </View>

        {selectedOpp && (
          <Detail
            visible={modalVisible}
            onClose={handleCloseModal}
            opp={selectedOpp}
          />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
  },
  todoText: {
    fontSize: 16,
    color: "#333",
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
});
