import { View, Text, StyleSheet } from "react-native";

interface TimeSlotProps {
  time: string;
}

export const TimeSlot = ({ time }: TimeSlotProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    paddingLeft: 12,
    backgroundColor: "#f9f9f9", // Lighter background for better contrast
  },
  text: {
    color: "#444", // Darker for readability
    fontSize: 14, // Slightly larger for better visibility
    fontWeight: "500",
  },
});
