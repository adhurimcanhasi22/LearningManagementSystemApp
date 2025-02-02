import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const QuickAccessCard = ({ title, count, onPress }: any) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardTitle}>{title}</Text>

      <Text style={styles.cardCount}>{count}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",

    borderRadius: 8,

    padding: 16,

    margin: 8,

    width: 150,

    elevation: 2,
  },

  cardTitle: {
    fontSize: 16,

    color: "#666",
  },

  cardCount: {
    fontSize: 24,

    fontWeight: "bold",

    marginTop: 8,
  },
});
