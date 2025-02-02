import { useState } from "react";

import { View, ScrollView, StyleSheet } from "react-native";

import { LeaveRequestCard } from "../components/leave/LeaveRequestCard";

import { FloatingActionButton } from "../components/common/FloatingActionButton";

import { LeaveRequestModal } from "../components/leave/LeaveRequestModal";

import { useAuth } from "../contexts/AuthContext";

type LeaveRequest = {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
};

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "1",

    startDate: "2023-08-20",

    endDate: "2023-08-21",

    reason: "Family function",

    status: "pending",
  },

  {
    id: "2",

    startDate: "2023-08-15",

    endDate: "2023-08-15",

    reason: "Medical appointment",

    status: "approved",
  },
];

export const LeaveManagementScreen = () => {
  const { user } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);

  const [requests, setRequests] = useState(mockLeaveRequests);

  const handleSubmit = (newRequest: any) => {
    setRequests([{ ...newRequest, id: Date.now().toString() }, ...requests]);

    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {requests.map((request) => (
          <LeaveRequestCard
            key={request.id}
            request={request}
            onPress={() =>
              user?.role === "teacher" && console.log("Show details")
            }
          />
        ))}
      </ScrollView>

      {user?.role === "student" && (
        <FloatingActionButton onPress={() => setModalVisible(true)} />
      )}

      <LeaveRequestModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 16,
  },
});
