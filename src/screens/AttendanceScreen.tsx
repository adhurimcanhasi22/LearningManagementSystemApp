import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { useAuth } from "../contexts/AuthContext";

type AttendanceRecord = {
  [date: string]: {
    marked: boolean;
    dotColor: string;
    selected?: boolean;
    selectedColor?: string;
    event?: string;
  };
};

const mockAttendance: AttendanceRecord = {
  "2025-02-27": {
    marked: true,
    dotColor: "#2ecc71",
    selected: true,
    selectedColor: "#2ecc71",
  },
  "2025-02-14": {
    marked: true,
    dotColor: "#2ecc71",
    selected: true,
    selectedColor: "#2ecc71",
  },
  "2025-02-26": {
    marked: true,
    dotColor: "#2ecc71",
    selected: true,
    selectedColor: "#2ecc71",
  },
  "2025-02-19": {
    marked: true,
    dotColor: "#e74c3c",
    selected: true,
    selectedColor: "#e74c3c",
  },
  "2025-02-18": {
    marked: true,
    dotColor: "#2ecc71",
    selected: true,
    selectedColor: "#2ecc71",
  },
  "2025-02-10": {
    marked: true,
    dotColor: "#e74c3c",
    selected: true,
    selectedColor: "#e74c3c",
  },
  "2025-01-16": {
    marked: true,
    selected: true,
    selectedColor: "#e74c3c",
    dotColor: "#e74c3c",
  },
  "2025-0-01": { marked: true, dotColor: "#f1c40f" },
  "2025-02-04": { marked: true, dotColor: "#f39c12", event: "Lecture" },
  "2025-02-28": { marked: true, dotColor: "#9b59b6", event: "Exam" },
};

const calendarTheme: any = {
  backgroundColor: "#ffffff",
  calendarBackground: "#ffffff",
  selectedDayBackgroundColor: "#0066ff",
  todayTextColor: "#0066ff",
  dayTextColor: "#2d3436",
  textDisabledColor: "#d9e1e8",
  monthTextColor: "#0066ff",
  arrowColor: "#0066ff",
};

export const AttendanceScreen = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState("");

  const getAttendanceStatus = (date: string) => {
    const status = mockAttendance[date];
    if (!status) return "No record";
    if (status.event) return status.event;
    if (status.dotColor === "#2ecc71") return "Present";
    if (status.dotColor === "#e74c3c") return "Absent";
    return "Late";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Attendance</Text>
      <Calendar
        current={new Date().toISOString().split("T")[0]}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          ...mockAttendance,
          [selectedDate]: { selected: true, selectedColor: "#0066ff" },
        }}
        theme={calendarTheme}
        style={styles.calendar}
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
    backgroundColor: "#eef3f9", // Slightly different soft background
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0066ff",
    textAlign: "center",
    marginBottom: 16,
  },
  calendar: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 3,
  },
  statusContainer: {
    marginTop: 10,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#0066ff",
    elevation: 3,
  },
  selectedDate: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#2c3e50",
  },
  statusText: {
    fontSize: 18,
    color: "#0066ff",
  },
  teacherActions: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#e74c3c",
    elevation: 3,
  },
  teacherText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#2c3e50",
  },
  actionButton: {
    backgroundColor: "#e74c3c",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
