import { View, Text, StyleSheet, FlatList } from "react-native";

export const SectionList = ({ sections }: any) => {
  return (
    <FlatList
      data={sections}
      keyExtractor={(item) => item.semester}
      renderItem={({ item }) => (
        <View style={styles.section}>
          <Text style={styles.semesterTitle}>{item.semester}</Text>

          {item.data.map((subject: any) => (
            <View key={subject.subject} style={styles.subjectRow}>
              <Text style={styles.subjectName}>{subject.subject}</Text>

              <Text style={styles.subjectMarks}>{subject.marks}%</Text>
            </View>
          ))}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },

  semesterTitle: {
    fontSize: 18,

    fontWeight: "600",

    marginBottom: 10,
  },

  subjectRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    paddingVertical: 8,

    borderBottomWidth: 1,

    borderColor: "#ecf0f1",
  },

  subjectName: {
    fontSize: 16,
  },

  subjectMarks: {
    fontSize: 16,

    fontWeight: "600",

    color: "#3498db",
  },
});
