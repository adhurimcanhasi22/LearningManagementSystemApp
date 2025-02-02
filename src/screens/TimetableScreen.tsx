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
    day: "Monday",

    startTime: "9:00 AM",

    endTime: "10:30 AM",

    course: "Mathematics",

    room: "Room 301",
  },

  {
    day: "Monday",

    startTime: "2:00 PM",

    endTime: "3:30 PM",

    course: "Physics",

    room: "Lab 205",
  },

  // Add more sample lectures...
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
      <View style={styles.timeColumn}>
        {timeSlots.map((time) => (
          <TimeSlot key={time} time={time} />
        ))}
      </View>

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

    backgroundColor: "#fff",
  },

  timeColumn: {
    width: 80,

    marginRight: 10,
  },

  dayContainer: {
    width: 150,

    marginRight: 10,
  },

  dayHeader: {
    fontWeight: "bold",

    textAlign: "center",

    paddingVertical: 8,

    backgroundColor: "#f0f0f0",
  },

  dayColumn: {
    flex: 1,
  },
});
