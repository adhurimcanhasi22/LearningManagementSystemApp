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
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../config/firebase";

export const LeaveRequestModal = ({ visible, onClose }: any) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reason, setReason] = useState("");
  const [showDatePicker, setShowDatePicker] = useState<"start" | "end" | null>(
    null
  );

  const handleSubmit = async () => {
    if (!reason.trim()) return;
    const user = getAuth().currentUser;
    if (!user) return;

    try {
      await addDoc(collection(db, "leaveRequests"), {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        reason,
        status: "Pending",
        userId: user.uid,
        displayName: user.displayName,
      });
      console.log("Leave request submitted!");
      onClose();
    } catch (error) {
      console.error("Error submitting leave request:", error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>New Leave Request</Text>

          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker("start")}
          >
            <Text>📅 Start Date: {startDate.toDateString()}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker("end")}
          >
            <Text>📅 End Date: {endDate.toDateString()}</Text>
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

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    minHeight: 80,
    backgroundColor: "#f8f9fa",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: "#e74c3c",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#2ecc71",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
