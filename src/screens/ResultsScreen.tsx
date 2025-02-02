import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";

import { LineChart } from "react-native-chart-kit";

import { useAuth } from "../contexts/AuthContext";

import { SectionList } from "../components/results/SectionList";

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
      {user?.role === "student" ? (
        <>
          <SectionList sections={mockResults.student} />

          <LineChart
            data={{
              labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5"],

              datasets: [
                {
                  data: [85, 88, 82, 90, 86],
                },
              ],
            }}
            width={300}
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",

              backgroundGradientFrom: "#ffffff",

              backgroundGradientTo: "#ffffff",

              decimalPlaces: 0,

              color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,

              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            bezier
            style={styles.chart}
          />
        </>
      ) : (
        <View style={styles.teacherContainer}>
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
            width={300}
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",

              backgroundGradientFrom: "#ffffff",

              backgroundGradientTo: "#ffffff",

              decimalPlaces: 0,

              color: (opacity = 1) => `rgba(231, 76, 60, ${opacity})`,

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

    padding: 16,
  },

  chart: {
    marginVertical: 20,

    borderRadius: 16,
  },

  teacherContainer: {
    alignItems: "center",
  },

  title: {
    fontSize: 20,

    fontWeight: "bold",

    marginVertical: 16,
  },
});
