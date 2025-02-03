// src/services/courses.ts
import { db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const fetchUserCourses = async (userId: string) => {
  try {
    const q = query(
      collection(db, "courses"),
      where("students", "array-contains", userId)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};
