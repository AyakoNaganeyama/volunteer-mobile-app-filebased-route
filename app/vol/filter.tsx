import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker"; // Import the date picker

export interface Filter {
  category: string;
  commitment: string;
  location: string;
  date: Date; // new date field in the filter
}

export const categories: string[] = [
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

export const commitments: string[] = [
  "One off - a few hours",
  "One off - an event",
  "Regular - less than 6 months",
  "Regular - more than 6 months",
];

export const locations: string[] = [
  "Auckland CBD",
  "North Shore",
  "West Auckland",
  "South Auckland",
  "East Auckland",
  "Online or Remote",
];

const FilterScreen = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState<Filter>({
    category: "",
    commitment: "",
    location: "",
    date: new Date(), // initialize with the current date
  });
  // State to track which input is focused
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // State for date picker visibility
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Dismiss keyboard and suggestions when tapping on the header area
  const handleDismiss = () => {
    Keyboard.dismiss();
    setFocusedInput(null);
  };

  // Date picker change handler
  const onChangeDate = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setInputs((prev) => ({ ...prev, date: selectedDate }));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header with a back arrow */}
        <TouchableWithoutFeedback onPress={handleDismiss}>
          <View style={styles.header}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="black"
              onPress={() => router.back()}
            />
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.centerContainer}>
          {/* Category Field */}
          <Text style={styles.label}>What</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="What are you interested in?"
              value={inputs.category}
              onFocus={() => setFocusedInput("category")}
              onChangeText={(text) =>
                setInputs((prev) => ({ ...prev, category: text }))
              }
              style={styles.input}
              placeholderTextColor="#8e8e93"
            />
          </View>
          {focusedInput === "category" && (
            <ScrollView style={styles.suggestionContainer}>
              {categories.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setInputs((prev) => ({ ...prev, category: item }));
                    setFocusedInput(null);
                  }}
                >
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {/* Commitment Field */}
          <Text style={styles.label}>Commitment</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Any Commitment"
              value={inputs.commitment}
              onFocus={() => setFocusedInput("commitment")}
              onChangeText={(text) =>
                setInputs((prev) => ({ ...prev, commitment: text }))
              }
              style={styles.input}
              placeholderTextColor="#8e8e93"
            />
          </View>
          {focusedInput === "commitment" && (
            <ScrollView style={styles.suggestionContainer}>
              {commitments.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setInputs((prev) => ({ ...prev, commitment: item }));
                    setFocusedInput(null);
                  }}
                >
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {/* Location Field */}
          <Text style={styles.label}>Where</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter town or city"
              value={inputs.location}
              onFocus={() => setFocusedInput("location")}
              onChangeText={(text) =>
                setInputs((prev) => ({ ...prev, location: text }))
              }
              style={styles.input}
              placeholderTextColor="#8e8e93"
            />
          </View>
          {focusedInput === "location" && (
            <ScrollView style={styles.suggestionContainer}>
              {locations.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setInputs((prev) => ({ ...prev, location: item }));
                    setFocusedInput(null);
                  }}
                >
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {/* Date Picker Field */}
          <Text style={styles.label}>When</Text>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={[styles.input, { paddingVertical: 12 }]}>
              {inputs.date.toDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={inputs.date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}

          <TouchableOpacity
            onPress={() => {
              // Pass the filter values (including date) as query parameters in the URL
              router.push({
                pathname: "./(group)/one",
                params: {
                  category: inputs.category,
                  commitment: inputs.commitment,
                  location: inputs.location,
                  // You can format the date if needed, e.g., toISOString or a custom format:
                  date: inputs.date.toISOString(),
                },
              });
            }}
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonText}>Discover</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 10,
  },
  centerContainer: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
    marginHorizontal: 30,
  },
  label: {
    fontWeight: "bold",
    color: "#0d528f",
    fontSize: 16,
    alignSelf: "flex-start",
    padding: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderColor: "#007aff",
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    marginBottom: 5,
    width: "100%",
  },
  input: {
    flex: 1,
    color: "#333333",
    fontSize: 16,
  },
  suggestionContainer: {
    width: "100%",
    maxHeight: 150,
    backgroundColor: "#f5f5f5",
    borderColor: "#007aff",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  suggestionText: {
    padding: 10,
    fontSize: 16,
    color: "#333333",
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
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
