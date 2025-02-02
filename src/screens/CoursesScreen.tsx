import { View, Text, StyleSheet } from "react-native";

export const CoursesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Courses, Student!</Text>

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
