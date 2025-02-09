import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase"; // Ensure the correct path to firebaseConfig

export const addLeaveRequest = async (leaveRequest: any) => {
  try {
    await addDoc(collection(db, "leaveRequests"), leaveRequest);
    console.log("Leave request added!");
  } catch (error) {
    console.error("Error adding leave request:", error);
  }
};
