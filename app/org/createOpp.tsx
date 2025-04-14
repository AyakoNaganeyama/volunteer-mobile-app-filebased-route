import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Opportunity } from "@/constants/types";

const CreateOpp = () => {
  const [opportunity, setOpportunity] = useState<Opportunity>({
    id: "",
    title: "",
    companyName: "",
    description: "",
    isApproved: false,
    location: "",
    category: "",
    commitmentPeriod: "",
    registrationFormUrl: "",
    imageURL: "",
    date: null,
    companyId: "",
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
      handleChange("date", selectedDate);
    }
  };

  const handleSubmit = () => {
    // For now, we log the opportunity data.
    console.log("Opportunity Submitted:", opportunity);
    // Later, you could send this data to an API or perform further actions.
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
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

        {/* Is Approved */}
        <Text style={styles.label}>Is Approved</Text>
        <Switch
          value={opportunity.isApproved}
          onValueChange={(value) => handleChange("isApproved", value)}
        />

        {/* Location */}
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={opportunity.location}
          onChangeText={(text) => handleChange("location", text)}
          placeholder="Enter location"
        />

        {/* Category */}
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={opportunity.category}
          onChangeText={(text) => handleChange("category", text)}
          placeholder="Enter category"
        />

        {/* Commitment Period */}
        <Text style={styles.label}>Commitment Period</Text>
        <TextInput
          style={styles.input}
          value={opportunity.commitmentPeriod}
          onChangeText={(text) => handleChange("commitmentPeriod", text)}
          placeholder="Enter commitment period"
        />

        {/* Registration Form URL */}
        <Text style={styles.label}>Registration Form URL</Text>
        <TextInput
          style={styles.input}
          value={opportunity.registrationFormUrl}
          onChangeText={(text) => handleChange("registrationFormUrl", text)}
          placeholder="Enter registration form URL"
        />

        {/* Image URL */}
        <Text style={styles.label}>Image URL</Text>
        <TextInput
          style={styles.input}
          value={opportunity.imageURL}
          onChangeText={(text) => handleChange("imageURL", text)}
          placeholder="Enter image URL (optional)"
        />

        {/* Date Picker */}
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={[styles.input, styles.dateInput]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>
            {opportunity.date
              ? opportunity.date.toDateString()
              : "Select a date"}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={opportunity.date || new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        {/* Company ID */}
        <Text style={styles.label}>Company ID</Text>
        <TextInput
          style={styles.input}
          value={opportunity.companyId}
          onChangeText={(text) => handleChange("companyId", text)}
          placeholder="Enter company ID"
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Opportunity</Text>
        </TouchableOpacity>
      </ScrollView>
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
});
