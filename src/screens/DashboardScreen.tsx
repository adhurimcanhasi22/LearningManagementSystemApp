import { View, ScrollView, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { fetchCourses } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { QuickAccessCard } from "../components/dashboard/QuickAccessCard";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { fetchUserCourses } from "../services/courses";

export const DashboardScreen = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);

  //test test
  const testFirestore = async () => {
    try {
      const docRef = doc(db, "test", "message");
      const docSnap = await getDoc(docRef);
      console.log("Firestore test data:", docSnap.data());
    } catch (error) {
      console.error("Firestore error:", error);
    }
  };
  //test test

  // DashboardScreen.tsx
  useEffect(() => {
    if (user) {
      fetchUserCourses(user.id)
        .then((courses) => setCourses(courses))
        .catch(console.error);
    }
  }, [user]);
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
