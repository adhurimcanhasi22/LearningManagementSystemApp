import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { fetchUserCourses } from "../services/courses";
import { useAuth } from "../contexts/AuthContext";
import { QuickAccessCard } from "../components/dashboard/QuickAccessCard";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { LeaveRequestCard } from "../components/leave/LeaveRequestCard";
import { useNavigation } from "@react-navigation/native";

export const DashboardScreen = () => {
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await logout();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" as never }],
      });
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserCourses(user.id)
        .then((courses) => setCourses(courses))
        .catch(console.error);

      const fetchLeaveRequests = async () => {
        try {
          const leaveRequestsSnapshot = await getDocs(
            collection(db, "leaveRequests")
          );
          const leaveRequestsData = leaveRequestsSnapshot.docs.map((doc) => {
            const data = doc.data();
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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.cardSection}>
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

      <View style={styles.cardSection}>
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

      <Text style={styles.sectionTitle}>Leave Requests</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0066ff" />
      ) : leaveRequests.length === 0 ? (
        <Text style={styles.noDataText}>No leave requests found.</Text>
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
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff", // White background for header
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 10,
    // Subtle shadow for a modern look
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0066ff",
  },
  logoutButton: {
    backgroundColor: "#0066ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 20,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  noDataText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
  cardSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
});
