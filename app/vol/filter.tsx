import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import useFilter from "@/hooks/vol/useFilter";
import { useFilterStore } from "@/userStore/useFilterStore";
import { useSearchStore } from "@/userStore/searchStore";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

export interface Filter {
  category: string;
  commitment: string;
  location: string;
  fromDate: Date | null;
  toDate: Date | null;
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
  "Food",
  "Tech",
  "Admin",
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
  const { category, commitment, location } = useFilterStore();

  const { searchClicked } = useSearchStore();
  // useEffect(() => {
  //   if (searchClicked) {
  //     setInputs({
  //       category: category,
  //       commitment: commitment,
  //       location: location,
  //       date: new Date(),
  //     });
  //   }
  // }, []);
  // test
  const [inputs, setInputs] = useState<Filter>({
    category: category,
    commitment: commitment,
    location: location,
    fromDate: null,
    toDate: null,
  });

  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const onChangeFrom = (e: DateTimePickerEvent, date?: Date) => {
    setShowFromPicker(Platform.OS === "ios");
    if (e.type === "set" && date) {
      setInputs((prev) => ({ ...prev, fromDate: date }));
    }
  };

  const onChangeTo = (e: DateTimePickerEvent, date?: Date) => {
    setShowToPicker(Platform.OS === "ios");
    if (e.type === "set" && date) {
      setInputs((prev) => ({ ...prev, toDate: date }));
    }
  };
  useEffect(() => {
    console.log("Current inputs:", inputs);
  }, [inputs]);

  const handleDismiss = () => {
    Keyboard.dismiss();
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
          <Text style={styles.label}>What</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={inputs.category}
              onValueChange={(itemValue) =>
                setInputs((prev) => ({ ...prev, category: itemValue }))
              }
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Select a category" value="" />
              {categories.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Commitment</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={inputs.commitment}
              onValueChange={(itemValue) =>
                setInputs((prev) => ({ ...prev, commitment: itemValue }))
              }
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Select commitment" value="" />
              {commitments.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Where</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={inputs.location}
              onValueChange={(itemValue) =>
                setInputs((prev) => ({ ...prev, location: itemValue }))
              }
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Select a location" value="" />
              {locations.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          </View>

          {/* From Date */}
          <Text style={styles.label}>From</Text>
          <TouchableOpacity
            onPress={() => setShowFromPicker(true)}
            style={[styles.pickerContainer, { paddingVertical: 12 }]}
          >
            <Text>
              {inputs.fromDate
                ? inputs.fromDate.toLocaleDateString()
                : "Select start date"}
            </Text>
          </TouchableOpacity>
          {showFromPicker && (
            <DateTimePicker
              value={inputs.fromDate ?? new Date()}
              mode="date"
              display="default"
              onChange={onChangeFrom}
              maximumDate={inputs.toDate ?? undefined}
            />
          )}

          {/* To Date */}
          <Text style={styles.label}>To</Text>
          <TouchableOpacity
            onPress={() => setShowToPicker(true)}
            style={[styles.pickerContainer, { paddingVertical: 12 }]}
          >
            <Text>
              {inputs.toDate
                ? inputs.toDate.toLocaleDateString()
                : "Select end date"}
            </Text>
          </TouchableOpacity>
          {showToPicker && (
            <DateTimePicker
              value={inputs.toDate ?? new Date()}
              mode="date"
              display="default"
              onChange={onChangeTo}
              minimumDate={inputs.fromDate ?? undefined}
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
  safeArea: { flex: 1 },
  header: { padding: 10 },
  centerContainer: {
    flex: 1,
    marginTop: 10,
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
  buttonStyle: {
    backgroundColor: "#0d528f",
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
    width: "100%",
  },
  buttonText: { color: "#ffffff", fontSize: 18, fontWeight: "bold" },
});
