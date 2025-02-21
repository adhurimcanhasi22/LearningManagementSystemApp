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
      <View style={styles.infoContainer}>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.room}>{room}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f6fc",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginVertical: 4,
    height: 60,
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  course: {
    fontWeight: "600",
    fontSize: 15,
    color: "#333",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time: {
    fontSize: 12,
    color: "#555",
  },
  room: {
    fontSize: 12,
    color: "#777",
  },
});
