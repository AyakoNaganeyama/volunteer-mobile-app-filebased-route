// components/EditOpportunityModal.tsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Opportunity } from "@/constants/types";
import useUpdateOpportunity from "@/hooks/org/useUpdateOpportunity";
// You can move these arrays into a shared constants file if you like
const locationsArray = [
  "Auckland CBD",
  "North Shore",
  "West Auckland",
  "South Auckland",
  "East Auckland",
  "Online or Remote",
];

const categoriesArray = [
  "Animal Welfare",
  "Arts & Culture",
  "Climate Strategy",
  "Community Services",
  "Covid-19",
  "Disability Services",
  "Disaster Relief",
  "Drug & Alcohol Services",
  "Education & Training",
  "Emergency Response",
  "Environment & Conservation",
  "Family Services",
  "Health",
  "Homeless",
  "Human Rights",
  "LGBTIQA+",
  "Mental Health",
  "Mentoring & Advocacy",
  "Museums & Heritage",
  "Recreation",
  "Refugee and Migrant Support",
  "Seniors & Aged Care",
  "Sport",
  "Tangata Whenua",
  "Veteran Services",
  "Young People",
  "Food",
  "Tech",
  "Admin",
];

const commitmentsArray = [
  "One off - a few hours",
  "One off - an event",
  "Regular - less than 6 months",
  "Regular - more than 6 months",
];

interface EditOpportunityModalProps {
  visible: boolean;
  opp: Opportunity;
  onClose: () => void;
}

export default function EditOpportunityModal({
  visible,
  opp,
  onClose,
}: EditOpportunityModalProps) {
  const [form, setForm] = useState<Opportunity>(opp);
  const { updateOpportunity } = useUpdateOpportunity();

  useEffect(() => {
    setForm(opp);
  }, [opp]);

  const handleChange = (field: keyof Opportunity, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const onSave = (from: Opportunity) => {
    console.log(
      form.id,
      form.title,
      form.companyName,
      form.description,
      form.isApproved,
      form.location,
      form.category,
      form.commitmentPeriod,
      form.registrationFormUrl,
      form.companyId,
      form.isOpen
    );
    updateOpportunity(from);
    onClose();
  };

  // const handleDelete = () => {
  //   deleteOpportunity(opp);
  //   onClose();
  // };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
        >
          <ScrollView
            contentContainerStyle={styles.modalScroll}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            <AntDesign
              name="close"
              size={24}
              color="black"
              onPress={onClose}
              style={styles.closeIcon}
            />
            <Text style={styles.title}>Edit Opportunity</Text>

            {/* Title */}
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={form.title}
              onChangeText={(t) => handleChange("title", t)}
            />

            {/* Description */}
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.multiline]}
              value={form.description}
              onChangeText={(t) => handleChange("description", t)}
              multiline
            />

            {/* Location Picker */}
            <Text style={styles.label}>Location</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={form.location}
                onValueChange={(v) => handleChange("location", v)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Select location" value="" />
                {locationsArray.map((loc) => (
                  <Picker.Item key={loc} label={loc} value={loc} />
                ))}
              </Picker>
            </View>

            {/* Category Picker */}
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={form.category}
                onValueChange={(v) => handleChange("category", v)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Select category" value="" />
                {categoriesArray.map((cat) => (
                  <Picker.Item key={cat} label={cat} value={cat} />
                ))}
              </Picker>
            </View>

            {/* Commitment Period Picker */}
            <Text style={styles.label}>Commitment Period</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={form.commitmentPeriod}
                onValueChange={(v) => handleChange("commitmentPeriod", v)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Select commitment" value="" />
                {commitmentsArray.map((com) => (
                  <Picker.Item key={com} label={com} value={com} />
                ))}
              </Picker>
            </View>

            {/* Registration Form URL */}
            <Text style={styles.label}>Registration Form URL</Text>
            <TextInput
              style={styles.input}
              value={form.registrationFormUrl}
              onChangeText={(t) => handleChange("registrationFormUrl", t)}
            />

            {/* Save */}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => onSave(form)}
            >
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalScroll: {
    flexGrow: 1, // let it expand to fill the view
    justifyContent: "center", // or top-align as you prefer
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },
  closeIcon: {
    alignSelf: "flex-end",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    marginTop: 12,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
  },
  multiline: {
    height: 80,
    textAlignVertical: "top",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginTop: 4,
    overflow: "hidden",
  },
  picker: {
    height: Platform.OS === "ios" ? 150 : 50,
    width: "100%",
    color: "#333",
  },
  pickerItem: {
    fontSize: 16,
    height: 150,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#0d528f",
    borderRadius: 6,
    paddingVertical: 12,
    marginTop: 24,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
});
