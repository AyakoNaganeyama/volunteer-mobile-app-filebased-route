import React from "react";
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { useEnactore } from "@/userStore/enacStore";

const screenWidth = Dimensions.get("window").width - 40; // account for container padding
const chartHeight = 200;

const MonthlyVolunteerChart = () => {
  const { enac } = useEnactore();

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
});

export default MonthlyVolunteerChart;
