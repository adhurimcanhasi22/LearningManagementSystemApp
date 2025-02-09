import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const statusColors = {
  Pending: "#fff700",
  Approved: "#2ecc71",
  Rejected: "#e74c3c",
};

interface LeaveRequest {
  startDate: string;
  endDate: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  id: string;
  displayName: string;
}

export const LeaveRequestCard = ({
  request,
  onPress,
}: {
  request: LeaveRequest;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{request.displayName}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>
          {request.startDate} to {request.endDate}
        </Text>
      </View>

      <Text style={styles.reason}>{request.reason}</Text>

      <View
        style={[
          styles.status,
          { backgroundColor: statusColors[request.status] },
        ]}
      >
        <Text style={styles.statusText}>{request.status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "#3498db",
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },

  date: {
    color: "#fff", // Blue for the dates
    fontWeight: "bold",
  },

  reason: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "#59ff00",
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontWeight: "bold",
    fontSize: 14,
  },

  status: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },

  statusText: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "bold",
  },
});
