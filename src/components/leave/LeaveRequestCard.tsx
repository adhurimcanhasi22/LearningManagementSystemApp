import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const statusColors = {
  Pending: "#ffcc00", // Yellow
  Approved: "#2ecc71", // Green
  Rejected: "#e74c3c", // Red
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
      <View style={styles.header}>
        <Text style={styles.displayName}>{request.displayName}</Text>
        <View
          style={[
            styles.status,
            { backgroundColor: statusColors[request.status] },
          ]}
        >
          <Text style={styles.statusText}>{request.status}</Text>
        </View>
      </View>

      <Text style={styles.date}>
        {request.startDate} → {request.endDate}
      </Text>
      <Text style={styles.reason}>{request.reason}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderLeftWidth: 5, // Adds a left highlight
    borderColor: "#3498db",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  displayName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },
  reason: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#666",
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
    paddingVertical: 6,
    borderRadius: 6,
  },
  status: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
});
