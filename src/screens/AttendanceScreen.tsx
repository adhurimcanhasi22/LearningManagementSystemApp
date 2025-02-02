import { useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Calendar } from "react-native-calendars";

// Removed incorrect import

import { useAuth } from "../contexts/AuthContext";

type AttendanceRecord = {
  [date: string]: {
    marked: boolean;
    dotColor: string;
    selected?: boolean;
    selectedColor?: string;
  };
};

const mockAttendance: AttendanceRecord = {
  "2023-08-15": {
    marked: true,
    dotColor: "#2ecc71",
    selected: true,
    selectedColor: "#2ecc71",
  },

  "2023-08-16": { marked: true, dotColor: "#e74c3c" },

  "2023-08-17": { marked: true, dotColor: "#f1c40f" },
};

const calendarTheme: any = {
  backgroundColor: "#ffffff",

  calendarBackground: "#ffffff",

  selectedDayBackgroundColor: "#3498db",

  todayTextColor: "#3498db",

  dayTextColor: "#2d3436",

  textDisabledColor: "#d9e1e8",

  monthTextColor: "#2d3436",

  arrowColor: "#3498db",
};
// Removed incorrect line
export const AttendanceScreen = () => {
  const { user } = useAuth();

  const [selectedDate, setSelectedDate] = useState("");

  const getAttendanceStatus = (date: string) => {
    const status = mockAttendance[date];

    if (!status) return "No record";

    if (status.dotColor === "#2ecc71") return "Present";

    if (status.dotColor === "#e74c3c") return "Absent";

    return "Late";
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={new Date().toISOString().split("T")[0]}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          ...mockAttendance,

          [selectedDate]: { selected: true, selectedColor: "#3498db" },
        }}
        theme={calendarTheme}
      />

      <View style={styles.statusContainer}>
        <Text style={styles.selectedDate}>
          {selectedDate || "Select a date"}
        </Text>

        <Text style={styles.statusText}>
          Status: {getAttendanceStatus(selectedDate)}
        </Text>
      </View>

      {user?.role === "teacher" && (
        <View style={styles.teacherActions}>
          <Text style={styles.teacherText}>Teacher Actions:</Text>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Mark Attendance</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 16,
  },

  statusContainer: {
    marginTop: 20,

    padding: 16,

    backgroundColor: "#fff",

    borderRadius: 8,

    elevation: 2,
  },

  selectedDate: {
    fontSize: 18,

    fontWeight: "600",

    marginBottom: 8,
  },

  statusText: {
    fontSize: 16,

    color: "#7f8c8d",
  },

  teacherActions: {
    marginTop: 20,

    padding: 16,

    backgroundColor: "#fff",

    borderRadius: 8,

    elevation: 2,
  },

  teacherText: {
    fontSize: 16,

    fontWeight: "600",

    marginBottom: 12,
  },

  actionButton: {
    backgroundColor: "#3498db",

    padding: 12,

    borderRadius: 8,

    alignItems: "center",
  },

  actionText: {
    color: "#fff",

    fontWeight: "500",
  },
});
