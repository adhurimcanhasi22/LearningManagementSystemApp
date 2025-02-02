import { View, ScrollView, StyleSheet, Text } from "react-native";

import { QuickAccessCard } from "../components/dashboard/QuickAccessCard";

export const DashboardScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.cardRow}>
        <QuickAccessCard
          title="Pending Assignments"
          count="3"
          onPress={() => console.log("Assignments pressed")}
        />

        <QuickAccessCard
          title="Unread Messages"
          count="5"
          onPress={() => console.log("Messages pressed")}
        />
      </View>

      <View style={styles.cardRow}>
        <QuickAccessCard
          title="Attendance %"
          count="85%"
          onPress={() => console.log("Attendance pressed")}
        />

        <QuickAccessCard
          title="Current GPA"
          count="3.8"
          onPress={() => console.log("GPA pressed")}
        />
      </View>

      {/* We'll add more sections later */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 16,
  },

  title: {
    fontSize: 24,

    fontWeight: "bold",

    marginBottom: 20,
  },

  cardRow: {
    flexDirection: "row",

    justifyContent: "space-around",

    marginBottom: 16,
  },
});
