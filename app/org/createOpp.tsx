import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Opportunity } from "@/constants/types";
import { useOrgStore } from "@/userStore/orgStore";
import uuid from "react-native-uuid";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import useManageOpportunities from "@/hooks/org/uesManageOpportunities";

// Option arrays for dropdowns
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
];

const commitmentsArray = [
  "One off - a few hours",
  "One off - an event",
  "Regular - less than 6 months",
  "Regular - more than 6 months",
];

const locationsArray = [
  "Auckland CBD",
  "North Shore",
  "West Auckland",
  "South Auckland",
  "East Auckland",
  "Online or Remote",
];

const CreateOpp = () => {
  const router = useRouter();
  const { org } = useOrgStore();
  const { createOpportunity } = useManageOpportunities();

  const [opportunity, setOpportunity] = useState<Opportunity>({
    id: uuid.v4() as string,
    title: "",
    companyName: org?.organisationName ?? "",
    description: "",
    isApproved: false,
    location: "",
    category: "",
    commitmentPeriod: "",
    registrationFormUrl: "",
    imageURL: "",
    date: null,
    companyId: org?.id ?? "",
    isOpen: true,
  });

  // State to control DateTimePicker visibility
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Handle changes to fields
  const handleChange = (
    field: keyof Opportunity,
    value: string | boolean | Date
  ) => {
    setOpportunity((prev) => ({ ...prev, [field]: value }));
  };

  // When the user selects a date, update the date field.
  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const dateOnlyString = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
      handleChange("date", dateOnlyString);
    }
  };

  const handleSubmit = async () => {
    try {
      await createOpportunity(opportunity); // passing the entire object
      console.log("Opportunity Submitted:", opportunity);
      router.back();
    } catch (error) {
      console.error("Error submitting opportunity:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        {/* so taps outside inputs will dismiss the keyboard,
          but won't block touches on the ScrollView */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            <Entypo
              name="cross"
              size={24}
              color="black"
              onPress={() => router.back()}
            />
            {/* Title */}
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={opportunity.title}
              onChangeText={(text) => handleChange("title", text)}
              placeholder="Enter title"
            />

            {/* Company Name */}
            <Text style={styles.label}>Company Name</Text>
            <TextInput
              style={styles.input}
              value={opportunity.companyName}
              onChangeText={(text) => handleChange("companyName", text)}
              placeholder="Enter company name"
              editable={false}
            />

            {/* Description */}
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.multiline]}
              value={opportunity.description}
              onChangeText={(text) => handleChange("description", text)}
              placeholder="Enter description"
              multiline
            />

            {/* Location */}
            <Text style={styles.label}>Location</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={opportunity.location}
                onValueChange={(itemValue) =>
                  handleChange("location", itemValue)
                }
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Select location" value="" />
                {locationsArray.map((item, index) => (
                  <Picker.Item key={index} label={item} value={item} />
                ))}
              </Picker>
            </View>

            {/* Category */}
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={opportunity.category}
                onValueChange={(itemValue) =>
                  handleChange("category", itemValue)
                }
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Select category" value="" />
                {categoriesArray.map((item, index) => (
                  <Picker.Item key={index} label={item} value={item} />
                ))}
              </Picker>
            </View>

            {/* Commitment Period */}
            <Text style={styles.label}>Commitment Period</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={opportunity.commitmentPeriod}
                onValueChange={(itemValue) =>
                  handleChange("commitmentPeriod", itemValue)
                }
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Select commitment" value="" />
                {commitmentsArray.map((item, index) => (
                  <Picker.Item key={index} label={item} value={item} />
                ))}
              </Picker>
            </View>

            {/* Registration Form URL */}
            <Text style={styles.label}>Registration Form URL</Text>
            <TextInput
              style={styles.input}
              value={opportunity.registrationFormUrl}
              onChangeText={(text) => handleChange("registrationFormUrl", text)}
              placeholder="Enter registration form URL"
            />

            {/* Image URL */}
            {/* <Text style={styles.label}>Image URL</Text>
        <TextInput
          style={styles.input}
          value={opportunity.imageURL}
          onChangeText={(text) => handleChange("imageURL", text)}
          placeholder="Enter image URL (optional)"
        /> */}

            {/* Date Picker */}
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity
              style={[styles.input, styles.dateInput]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{ color: "gray" }}>
                {opportunity.date
                  ? typeof opportunity.date === "string"
                    ? new Date(opportunity.date).toDateString()
                    : opportunity.date.toDateString()
                  : "Select a date (optional)"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={
                  opportunity.date instanceof Date
                    ? opportunity.date
                    : new Date()
                }
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}

            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit Opportunity</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateOpp;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
    fontSize: 16,
  },
  multiline: {
    height: 100,
    textAlignVertical: "top",
  },
  dateInput: {
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#0d528f",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#007aff",
    borderRadius: 12,
    marginBottom: 5,
    overflow: "hidden",
  },
  picker: {
    height: Platform.OS === "ios" ? 150 : 50,
    width: "100%",
    color: "#333", // Explicit color
  },

  pickerItem: {
    fontSize: 16,
    height: 150,
    color: "#333", // explicit color to avoid transparency
  },
});
