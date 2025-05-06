import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Opportunity } from "@/constants/types";
import useApproveOpportunity from "@/hooks/enac/useApproveOpportunity";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useState } from "react";

interface DetailsProps {
  visible: boolean;
  onClose: () => void;
  opp: Opportunity;
}
const Approve = ({ visible, onClose, opp }: DetailsProps) => {
  const { approveOpportunity } = useApproveOpportunity();

  const handleApprove = async () => {
    setLoading(true);
    try {
      await approveOpportunity(opp);
      onClose();
    } finally {
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);

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
            <Text style={styles.modalTitle}>Approve</Text>
          </View>

          <Text style={{ textAlign: "left" }}>
            Would you like approve an opportunity:
          </Text>
          <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
            {" "}
            {opp?.title} by {opp.companyName}
          </Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            {/* Approve Button */}
            <TouchableOpacity
              style={[styles.saveButton, loading && { opacity: 0.6 }]}
              onPress={handleApprove}
              disabled={loading}
            >
              {loading ? (
                <Text style={styles.buttonText}>Approving…</Text>
              ) : (
                <Text style={styles.buttonText}>Approve</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Approve;

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
    backgroundColor: "#ff5252",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginBottom: 15,

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
  cancelButton: {
    backgroundColor: "#ccc",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginBottom: 15,

    alignItems: "center",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
});
