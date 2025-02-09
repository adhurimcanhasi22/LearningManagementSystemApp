import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

const statusColors = {
  pending: "#f39c12",

  approved: "#2ecc71",

  rejected: "#e74c3c",
};

interface LeaveRequest {
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  id: string;
}

export const LeaveRequestCard = ({ request, onPress }: any) => {
  return (
    <View style={styles.card} onTouchEnd={onPress}>
      <Text>
        {request.startDate} to {request.endDate}
      </Text>
      <Text>{request.reason}</Text>
      <Text>Status: {request.status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",

    borderRadius: 8,

    padding: 16,

    marginVertical: 8,

    elevation: 2,
  },
  card: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },

  dateContainer: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 8,
  },

  date: {
    color: "#3498db",

    marginHorizontal: 4,
  },

  reason: {
    color: "#2c3e50",

    marginBottom: 8,
  },

  status: {
    alignSelf: "flex-start",

    paddingVertical: 4,

    paddingHorizontal: 8,

    borderRadius: 4,
  },

  statusText: {
    color: "#fff",

    fontSize: 12,
  },
});
