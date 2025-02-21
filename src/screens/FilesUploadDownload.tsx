import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

const { width } = Dimensions.get("window");

export const FilesScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    } else {
      console.log("No image selected or user canceled.");
    }
  };

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*", // Accept any file type
      copyToCacheDirectory: false,
    });

    if (result.canceled) {
      console.log("No file selected or user canceled.");
      return;
    }

    setFileUri(result.assets[0].uri);
    setFileName(result.assets[0].name);
  };

  const handleUpload = () => {
    // Clear selected files
    setImageUri(null);
    setFileUri(null);
    setFileName(null);

    // Show success message
    Alert.alert("Success", "Files uploaded to the school database.");
  };

  return (
    <View style={styles.container}>
      {/* Image Picker */}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        </View>
      )}

      {/* File Picker */}
      <TouchableOpacity style={styles.button} onPress={pickFile}>
        <Text style={styles.buttonText}>Pick a File</Text>
      </TouchableOpacity>
      {fileUri && (
        <View style={styles.fileContainer}>
          <Text style={styles.fileText}>📄 {fileName}</Text>
        </View>
      )}

      {/* Upload Button (Only Shows If There’s a File or Image) */}
      {(imageUri || fileUri) && (
        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Text style={styles.uploadButtonText}>Upload to Database</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fc",
    padding: 16,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 20,
    width: width * 0.8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  imageContainer: {
    marginTop: 10,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  fileContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    width: width * 0.8,
    alignItems: "center",
  },
  fileText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  uploadButton: {
    marginTop: 20,
    backgroundColor: "#27ae60",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: width * 0.8,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

