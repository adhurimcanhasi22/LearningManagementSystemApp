import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { fetchCourses } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { QuickAccessCard } from "../components/dashboard/QuickAccessCard";
import { db } from "../config/firebase";
import { doc, getDocs, collection } from "firebase/firestore";
import { fetchUserCourses } from "../services/courses";
import { useNavigation } from "@react-navigation/native";
import firestore from "firebase/firestore";
import { LeaveRequestCard } from "../components/leave/LeaveRequestCard";
export const DashboardScreen = () => {
  const [leaveRequests, setLeaveRequests] = useState<
    { id: string; [key: string]: any }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const { user, logout } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);

  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await logout();
      // Reset navigation so that the user is taken to the login screen:
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" as never }],
      });
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  // DashboardScreen.tsx
  useEffect(() => {
    if (user) {
      fetchUserCourses(user.id)
        .then((courses) => setCourses(courses))
        .catch(console.error);

      // Fetch leave requests from Firestore
      const fetchLeaveRequests = async () => {
        try {
          const leaveRequestsSnapshot = await getDocs(
            collection(db, "leaveRequests")
          );
          const leaveRequestsData = leaveRequestsSnapshot.docs.map((doc) => {
            const data = doc.data();
            console.log("Fetched leave request:", data); // Add this line to log data
            return {
              id: doc.id,
              startDate: data.startDate,
              endDate: data.endDate,
              reason: data.reason,
              status: data.status,
              displayName: data.displayName,
            };
          });
          setLeaveRequests(leaveRequestsData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching leave requests:", error);
          setLoading(false);
        }
      };

      fetchLeaveRequests();
    }
  }, [user]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Dashboard</Text>
        <Button title="Log Out" onPress={handleLogout} />
      </View>

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

      {/* Display Leave Requests */}
      <Text style={styles.sectionTitle}>Leave Requests</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : leaveRequests.length === 0 ? (
        <Text>No leave requests found.</Text>
      ) : (
        leaveRequests.map((request) => (
          <LeaveRequestCard
            key={request.id}
            request={{
              id: request.id,
              startDate: request.startDate,
              endDate: request.endDate,
              reason: request.reason,
              status: request.status,
              displayName: request.displayName,
            }}
            onPress={() => console.log("Leave request pressed")}
          />
        ))
      )}
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
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  cardRow: {
    flexDirection: "row",

    justifyContent: "space-around",

    marginBottom: 16,
  },
});
