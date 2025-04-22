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
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker"; // Import the date picker
import { Picker } from "@react-native-picker/picker";
import useFilter from "@/hooks/vol/useFilter";

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
  const { applyFilter } = useFilter();
  const [inputs, setInputs] = useState<Filter>({
    category: "",
    commitment: "",
    location: "",
    date: new Date(), // initialize with the current date
  });
  useEffect(() => {
    console.log("Current inputs:", inputs);
  }, [inputs]);
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

  const handleFilter = (
    category: string,
    commitment: string,
    location: string
  ) => {
    applyFilter(category, commitment, location);
    router.back();
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
          {/* Category Picker */}
          <Text style={styles.label}>What</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={inputs.category}
              onValueChange={(itemValue) =>
                setInputs((prev) => ({ ...prev, category: itemValue }))
              }
              style={styles.picker}
            >
              <Picker.Item label="Select a category" value="" />
              {categories.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          </View>

          {/* Commitment Picker */}
          <Text style={styles.label}>Commitment</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={inputs.commitment}
              onValueChange={(itemValue) =>
                setInputs((prev) => ({ ...prev, commitment: itemValue }))
              }
              style={styles.picker}
            >
              <Picker.Item label="Select commitment" value="" />
              {commitments.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          </View>

          {/* Location Picker */}
          <Text style={styles.label}>Where</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={inputs.location}
              onValueChange={(itemValue) =>
                setInputs((prev) => ({ ...prev, location: itemValue }))
              }
              style={styles.picker}
            >
              <Picker.Item label="Select a location" value="" />
              {locations.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          </View>

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
            onPress={() =>
              handleFilter(inputs.category, inputs.commitment, inputs.location)
            }
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
  pickerContainer: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#007aff",
    borderRadius: 12,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});
