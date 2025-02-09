import { db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const fetchCourses = async (userId: string) => {
  try {
    const q = query(
      collection(db, "courses"),
      where("students", "array-contains", userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const markAttendance = async (userId: string, courseId: string) => {
  // Implement attendance marking logic
};
