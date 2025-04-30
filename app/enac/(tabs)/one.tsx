import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { useEnactore } from "@/userStore/enacStore";
import { useEffect } from "react";
import useFetchVol from "@/hooks/enac/useFetchVol";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import useFetchOrg from "@/hooks/enac/useFetchOrg";
import { useVolunteerListStore } from "@/userStore/volusersArrayStore";
import { useOrganisationStore } from "@/userStore/orgArrayStore";
import { useRouter } from "expo-router";
import { useOppStore } from "@/userStore/oppArrayStore";
import useFetcOpp from "@/hooks/enac/useFetcOpp";

const screenWidth = Dimensions.get("window").width - 40; // account for container padding
const chartHeight = 200;

const MonthlyVolunteerChart = () => {
  const { enac } = useEnactore();
  const { getVolList } = useFetchVol();
  const { getOrgList } = useFetchOrg();
  const { volunteerList } = useVolunteerListStore();
  const { orgList } = useOrganisationStore();
  const { opportunities } = useOppStore();
  const { getOppList } = useFetcOpp();
  useEffect(() => {
    console.log("Volunteer datas");
    getVolList();
    console.log("Volunteer datas");
    getOrgList();
    console.log("Opportunity datas");
    getOppList();
  }, []);

  useEffect(() => {
    console.log("sotre vol:", volunteerList);
    console.log("sotre org:", orgList);
    console.log("sotre opportunity:", opportunities);
  }, [volunteerList, orgList, opportunities]);

  const router = useRouter();

  // replace these with your real monthly data (or default to 0)
  const values = [
    12, // Jan
    18, // Feb
    25, // Mar
    30, // Apr
    22, // May
    40, // Jun
    50, // Jul
    85, // Aug
    60, // Sep
    70, // Oct
    55, // Nov
    65, // Dec
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // map into chart data
  const lineData = months.map((label, i) => ({
    value: values[i] ?? 0,
    label,
  }));

  return (
    <ScrollView>
      <View style={{ flex: 1, width: "90%", alignSelf: "center" }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#0d528f",
            marginTop: 20,
          }}
        >
          Welcome, {enac?.fullName}
        </Text>
      </View>

      {/* ***************************Manage******************************************* */}

      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderBottomWidth: 1,
          borderBottomColor: "gray",
          height: 100,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 2,

          // Android shadow
          elevation: 3,
          marginTop: 30,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => {
          router.push("/enac/orgListPage");
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "#fad4cd",
                height: 50,
                width: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="add-outline" size={24} color="#f07c74" />
            </View>
            <View
              style={{
                height: 50,
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Manage Opportunities
              </Text>
              <Text>Post Opportunities</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="right" size={24} color="black" />
        </View>
      </TouchableOpacity>

      {/* ***************************New******************************************* */}

      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: 10,
          paddingVertical: 4,

          height: 100,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,

          // Android shadow
          elevation: 3,

          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "#c8e8ff",
                height: 50,
                width: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialIcons name="approval" size={24} color="#0474cc" />
            </View>
            <View
              style={{
                height: 50,
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>New</Text>
              <Text>You have opportunities to approve</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "#FF3B30",
              height: 30,
              width: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white" }}>3</Text>
          </View>
          <AntDesign name="right" size={24} color="black" />
        </View>
      </TouchableOpacity>

      {/* *******************cards******************************* */}
      <View
        style={{
          marginVertical: 20,
          width: "95%",
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* First card wrapper */}
        <View
          style={{
            width: "45%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 6,
            overflow: "visible",
            borderRadius: 12,
            backgroundColor: "transparent",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: "white",
              padding: 8,
              borderRadius: 12,
              height: 150,
              borderWidth: 1,
              borderColor: "gray",
            }}
            onPress={() => {
              /* ... */
            }}
          >
            {/*  card content  */}
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign name="user" size={40} color="black" />
              <Text>Volunteers</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Second card wrapper */}
        <View
          style={{
            width: "45%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 6,
            overflow: "visible",
            borderRadius: 12,
            backgroundColor: "transparent",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: "white",
              padding: 8,
              borderRadius: 12,
              height: 150,
              borderWidth: 1,
              borderColor: "gray",
            }}
            onPress={() => {
              /* ... */
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Octicons name="organization" size={40} color="black" />
              <Text>Organisations</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, width: "90%", alignSelf: "center" }}>
        <View style={styles.container}>
          <Text style={styles.header}>Registered Volunteers (Monthly)</Text>
          <LineChart
            data={lineData}
            width={screenWidth}
            height={chartHeight}
            initialSpacing={20}
            spacing={(screenWidth - 40) / (lineData.length - 1)}
            hideDataPoints={false}
            dataPointsColor="#0d528f"
            dataPointsRadius={4}
            thickness={3}
            hideRules={false}
            rulesColor="rgba(11, 165, 164, 0.3)"
            rulesType="solid"
            hideYAxisText={false}
            yAxisTextStyle={{ color: "#555", fontSize: 12 }}
            yAxisColor="#0BA5A4"
            hideXAxisText={false}
            xAxisLabelTextStyle={{ color: "#555", fontSize: 12, marginTop: 4 }}
            showVerticalLines={true}
            verticalLinesColor="rgba(14,164,164,0.2)"
            xAxisColor="#0BA5A4"
            color="#0BA5A4"
            curved
            backgroundColor="#f8fafa"
            // tap handler
            pressEnabled
            onPress={(item) =>
              Alert.alert(item.label, `${item.value} volunteers`)
            }
            // sliding tooltip
            pointerConfig={{
              showPointerStrip: true,
              pointerStripColor: "rgba(11,165,164,0.3)",
              pointerStripHeight: chartHeight,
              pointerLabelWidth: 30,

              pointerLabelComponent: (items) => (
                <View style={styles.tooltip}>
                  <Text style={styles.tooltipText}>{items[0].value}</Text>
                </View>
              ),
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,

    elevation: 5,
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0d528f",
    marginBottom: 15,
  },
  tooltip: {
    backgroundColor: "#fff",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#0BA5A4",
  },
  tooltipText: {
    fontSize: 12,
    color: "#0d528f",
  },

  text: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 15,
    paddingBottom: 20,
  },
});

export default MonthlyVolunteerChart;
