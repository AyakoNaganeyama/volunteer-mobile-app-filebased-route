import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Opportunity } from "@/constants/mockListing";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

interface DetailsProps {
  visible: boolean;
  onClose: () => void;
  opp: Opportunity | null;
}

const Detail = ({ visible, onClose, opp }: DetailsProps) => {
  //import update function here later

  const [edit, setEdit] = useState<Opportunity | null>(opp || null);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <AntDesign name="close" size={24} color="black" onPress={onClose} />
            <Text style={styles.modalTitle}>Edit Opportunity</Text>
          </View>

          <Text style={{ textAlign: "left" }}>Title</Text>
          <TextInput style={styles.input} value={edit?.title} />

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={() => {}}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Detail;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0d528f",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f5f5f5",
    borderColor: "#007aff",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#0d528f",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#ff5252",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 25,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
