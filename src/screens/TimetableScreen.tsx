import { ScrollView, View, StyleSheet, Text } from "react-native";
import { TimeSlot } from "../components/timetable/TimeSlot";
import { LectureCard } from "../components/timetable/LectureCard";

const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const lectures = [
  {
    day: "Tuesday",
    startTime: "9:00 AM",
    endTime: "10:30 AM",
    course: "Mathematics",
    room: "Room 303",
  },
  {
    day: "Monday",
    startTime: "2:00 PM",
    endTime: "3:30 PM",
    course: "Physics Fundamentals",
    room: "Lab 205",
  },
  {
    day: "Monday",
    startTime: "12:00 PM",
    endTime: "1:30 PM",
    course: "Physics Fundamentals Ex.",
    room: "Lab 205",
  },
  {
    day: "Wednesday",
    startTime: "1:00 PM",
    endTime: "2:30 PM",
    course: "Data Structures",
    room: "Room 300",
  },
  {
    day: "Thursday",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    course: "Computer Science",
    room: "Room 301",
  },
  {
    day: "Thursday",
    startTime: "12:00 PM",
    endTime: "1:30 PM",
    course: "Computer Science Ex.",
    room: "Room 301",
  },
  {
    day: "Friday",
    startTime: "8:00 AM",
    endTime: "10:00 AM",
    course: "Algorithms",
    room: "Room 306",
  },
];

export const TimetableScreen = () => {
  const getDayColumn = (day: string) => {
    const dayLectures = lectures.filter((lecture) => lecture.day === day);
    return (
      <View style={styles.dayColumn}>
        {timeSlots.map((time) => {
          const lecture = dayLectures.find((l) => l.startTime === time);
          return lecture ? (
            <LectureCard
              key={`${day}-${time}`}
              course={lecture.course}
              time={`${lecture.startTime} - ${lecture.endTime}`}
              room={lecture.room}
            />
          ) : (
            <TimeSlot key={`${day}-${time}`} time={time} />
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView horizontal style={styles.container}>
      {/* Time Column */}
      <View style={styles.timeColumn}>
        <View style={styles.headerPlaceholder} />
        {timeSlots.map((time) => (
          <TimeSlot key={time} time={time} />
        ))}
      </View>

      {/* Day Columns */}
      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
        <View key={day} style={styles.dayContainer}>
          <Text style={styles.dayHeader}>{day}</Text>
          {getDayColumn(day)}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fc", // Modern light background
    padding: 10,
    marginTop: 40, // Pushes timetable lower
    paddingBottom: 60, // Adds bottom space
    minHeight: "100%", // Ensures the timetable extends properly
  },
  timeColumn: {
    width: 80,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 5,
    // Subtle shadow for a modern card feel
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dayContainer: {
    width: 150,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    // Subtle shadow for a card-like look
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dayHeader: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
    backgroundColor: "#e6f0ff", // Light blue accent
    color: "#0066ff", // Blue text accent
  },
  dayColumn: {
    flex: 1,
  },
  headerPlaceholder: {
    height: 40,
  },
});
