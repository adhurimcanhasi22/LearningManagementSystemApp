import { View, Text, StyleSheet } from "react-native";

interface LectureCardProps {
  course: string;

  time: string;

  room: string;
}

export const LectureCard = ({ course, time, room }: LectureCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.course}>{course}</Text>

      <Text style={styles.time}>{time}</Text>

      <Text style={styles.room}>{room}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e8f4ff",

    borderRadius: 8,

    padding: 10,

    margin: 4,
  },

  course: {
    fontWeight: "bold",

    fontSize: 14,
  },

  time: {
    fontSize: 12,

    color: "#666",
  },

  room: {
    fontSize: 12,

    color: "#888",
  },
});
