import { View, Text, StyleSheet } from "react-native";

export const ResultsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back, Student!</Text>

      {/* We'll add more components here later */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
  },

  title: {
    fontSize: 24,

    fontWeight: "bold",

    marginBottom: 20,
  },
});
