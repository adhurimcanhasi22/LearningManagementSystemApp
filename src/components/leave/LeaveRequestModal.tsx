import { useState } from "react";
import {
  View,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { addLeaveRequest } from "../../services/leaveService";
import { db } from "../../config/firebase";

export const LeaveRequestModal = ({ visible, onClose, onSubmit }: any) => {
  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date());

  const [reason, setReason] = useState("");

  const [showDatePicker, setShowDatePicker] = useState<"start" | "end" | null>(
    null
  );

  const handleSubmit = async () => {
    if (!reason.trim()) return;

    const user = getAuth().currentUser; // Get current user
    if (!user) return;

    try {
      await addDoc(collection(db, "leaveRequests"), {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        reason,
        status: "pending",
        userId: user.uid, // Store the user's ID
        displayName: user.displayName, // Assuming the user's name is stored in displayName
      });
      console.log("Leave request submitted!");
      onClose();
    } catch (error) {
      console.error("Error submitting leave request:", error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.title}>New Leave Request</Text>

        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowDatePicker("start")}
        >
          <Text>Start Date: {startDate.toDateString()}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowDatePicker("end")}
        >
          <Text>End Date: {endDate.toDateString()}</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Reason for leave"
          value={reason}
          onChangeText={setReason}
          multiline
        />

        {showDatePicker && (
          <DateTimePicker
            value={showDatePicker === "start" ? startDate : endDate}
            mode="date"
            onChange={(event, date) => {
              setShowDatePicker(null);

              if (date) {
                showDatePicker === "start"
                  ? setStartDate(date)
                  : setEndDate(date);
              }
            }}
          />
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,

    padding: 20,
  },

  title: {
    fontSize: 24,

    fontWeight: "bold",

    marginBottom: 20,
  },

  dateInput: {
    borderWidth: 1,

    borderColor: "#ddd",

    padding: 15,

    marginBottom: 15,

    borderRadius: 8,
  },

  input: {
    borderWidth: 1,

    borderColor: "#ddd",

    padding: 15,

    marginBottom: 15,

    borderRadius: 8,

    minHeight: 100,
  },

  buttonContainer: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: 20,
  },

  cancelButton: {
    backgroundColor: "#e74c3c",

    padding: 15,

    borderRadius: 8,

    flex: 1,

    marginRight: 10,
  },

  submitButton: {
    backgroundColor: "#2ecc71",

    padding: 15,

    borderRadius: 8,

    flex: 1,

    marginLeft: 10,
  },

  buttonText: {
    color: "white",

    textAlign: "center",
  },
});
