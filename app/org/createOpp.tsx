import React, { useState, useEffect } from "react";
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
import { useOrgStore } from "@/userStore/orgStore";
import uuid from "react-native-uuid";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import useManageOpportunities from "@/hooks/org/uesManageOpportunities";
const CreateOpp = () => {
  const router = useRouter();
  const { org } = useOrgStore();
  const { createOpportunity, opportunities } = useManageOpportunities();
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
  });

  // State to control DateTimePicker visibility
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    console.log("inpagelist", opportunities);
  }, []);

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

  const handleSubmit = async () => {
    try {
      await createOpportunity(opportunity); // passing the entire object
      console.log("Opportunity Submitted:", opportunity);
      // Navigate to another screen (adjust route as needed)
      router.replace("/org/(tabs)/one");
    } catch (error) {
      console.error("Error submitting opportunity:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Entypo
          name="cross"
          size={24}
          color="black"
          onPress={() => {
            router.back();
          }}
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

        {/* Is Approved */}
        {/* <Text style={styles.label}>Is Approved</Text>
        <Switch
          value={opportunity.isApproved}
          onValueChange={(value) => handleChange("isApproved", value)}
        /> */}

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
          <Text style={{ color: "gray" }}>
            {opportunity.date
              ? opportunity.date.toDateString()
              : "Select a date (optional)"}
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
        {/* <Text style={styles.label}>Company ID</Text>
        <TextInput
          style={styles.input}
          value={opportunity.companyId}
          onChangeText={(text) => handleChange("companyId", text)}
          placeholder="Enter company ID"
        /> */}

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
