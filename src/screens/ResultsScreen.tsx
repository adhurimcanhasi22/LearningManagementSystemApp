import React from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useAuth } from "../contexts/AuthContext";
import { SectionList } from "../components/results/SectionList";

const chartWidth = Dimensions.get("window").width - 32; // subtracting container padding

const mockResults = {
  student: [
    {
      semester: "Fall 2023",
      data: [
        { subject: "Mathematics", marks: 85 },
        { subject: "Physics", marks: 78 },
        { subject: "Chemistry", marks: 82 },
      ],
    },
  ],
  teacher: {
    overallPerformance: [85, 78, 82, 88, 90],
    averageScores: {
      Mathematics: 82,
      Physics: 75,
      Chemistry: 80,
    },
  },
};

export const ResultsScreen = () => {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.screenHeader}>Results</Text>
      {user?.role === "student" ? (
        <>
          <View style={styles.card}>
            <SectionList sections={mockResults.student} />
          </View>
          <View style={styles.card}>
            <Text style={styles.chartTitle}>Semester Performance</Text>
            <LineChart
              data={{
                labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5"],
                datasets: [
                  {
                    data: [85, 88, 82, 90, 86],
                  },
                ],
              }}
              width={chartWidth}
              height={220}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#f9f9f9",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`, // Bold blue
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              bezier
              style={styles.chart}
            />
          </View>
        </>
      ) : (
        <View style={[styles.card, styles.teacherContainer]}>
          <Text style={styles.title}>Class Performance Overview</Text>
          <LineChart
            data={{
              labels: Object.keys(mockResults.teacher.averageScores),
              datasets: [
                {
                  data: Object.values(mockResults.teacher.averageScores),
                },
              ],
            }}
            width={chartWidth}
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#f9f9f9",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(231, 76, 60, ${opacity})`, // Bold red
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            bezier
            style={styles.chart}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fc", // Soft modern background
    padding: 16,
  },
  screenHeader: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0066ff",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    // Subtle shadow for a modern card feel
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0066ff",
    marginBottom: 12,
    textAlign: "center",
  },
  chart: {
    borderRadius: 16,
  },
  teacherContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 16,
  },
});
