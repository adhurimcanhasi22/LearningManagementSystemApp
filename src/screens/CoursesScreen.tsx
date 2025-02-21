import { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialItem } from "../components/courses/MaterialItem";
import { FloatingActionButton } from "../components/common/FloatingActionButton";
import { useAuth } from "../contexts/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";

const mockCourses = [
  {
    id: "1",
    name: "Mathematics 101",
    materials: [
      { id: "1", type: "pdf", title: "Algebra Basics", date: "2023-08-15" },
      {
        id: "2",
        type: "video",
        title: "Lecture 1: Introduction",
        date: "2023-08-16",
      },
    ],
  },
  {
    id: "2",
    name: "Physics Fundamentals",
    materials: [
      { id: "3", type: "pdf", title: "Kinematics Notes", date: "2023-08-14" },
    ],
  },
  {
    id: "3",
    name: "Computer Science 101",
    materials: [
      {
        id: "4",
        type: "pdf",
        title: "Intro to Programming",
        date: "2023-08-17",
      },
      {
        id: "5",
        type: "video",
        title: "Lecture 1: Basics",
        date: "2023-08-18",
      },
    ],
  },
  {
    id: "4",
    name: "Data Structures",
    materials: [
      { id: "6", type: "pdf", title: "Arrays & Lists", date: "2023-08-19" },
      { id: "7", type: "video", title: "Lecture 2: Trees", date: "2023-08-20" },
    ],
  },
  {
    id: "5",
    name: "Algorithms",
    materials: [
      {
        id: "8",
        type: "pdf",
        title: "Sorting Algorithms",
        date: "2023-08-21",
      },
      {
        id: "9",
        type: "video",
        title: "Lecture 3: Graph Algorithms",
        date: "2023-08-22",
      },
    ],
  },
];

export const CoursesScreen = () => {
  const { user } = useAuth();
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const handleUpload = () => {
    // Implement upload logic
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {mockCourses.map((course) => (
          <View key={course.id} style={styles.courseCard}>
            <TouchableOpacity
              onPress={() =>
                setExpandedCourse(
                  expandedCourse === course.id ? null : course.id
                )
              }
              style={styles.courseHeader}
            >
              <Text style={styles.courseTitle}>{course.name}</Text>
              <MaterialIcons
                name={
                  expandedCourse === course.id ? "expand-less" : "expand-more"
                }
                size={24}
                color="#2c3e50"
              />
            </TouchableOpacity>

            {expandedCourse === course.id && (
              <View style={styles.materialsContainer}>
                {course.materials.map((material) => (
                  <MaterialItem
                    key={material.id}
                    type={material.type}
                    title={material.title}
                    date={material.date}
                  />
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      {user?.role === "teacher" && (
        <FloatingActionButton onPress={handleUpload} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fc", // Soft, modern background
    padding: 16,
  },
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    // Subtle shadow for a modern card look
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  materialsContainer: {
    padding: 16,
  },
});
