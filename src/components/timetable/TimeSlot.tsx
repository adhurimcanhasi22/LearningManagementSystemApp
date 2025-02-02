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

    borderColor: "#ddd",

    justifyContent: "center",

    paddingLeft: 8,
  },

  text: {
    color: "#666",

    fontSize: 12,
  },
});
