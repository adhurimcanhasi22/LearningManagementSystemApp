import React, { useState } from "react";
import { View, Button, Image, Text, Platform, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import storage from "@react-native-firebase/storage";
import * as FileSystem from "expo-file-system"; // Optional for downloads

export const FilesUploadDownload = () => {
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState<number>(0);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  // Select an image using Expo ImagePicker
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Upload the selected image to Firebase Storage
  const uploadImage = async () => {
    if (!image) {
      Alert.alert("No image selected", "Please select an image first.");
      return;
    }
    const filename = image.substring(image.lastIndexOf("/") + 1);
    // For iOS, remove the file:// prefix
    const uploadUri =
      Platform.OS === "ios" ? image.replace("file://", "") : image;

    setUploading(true);
    setTransferred(0);

    const task = storage().ref(filename).putFile(uploadUri);

    // Monitor upload progress
    task.on("state_changed", (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setTransferred(progress);
    });

    try {
      await task;
      const url = await storage().ref(filename).getDownloadURL();
      setDownloadURL(url);
      Alert.alert("Upload successful", "Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Upload failed", "There was an error uploading your image.");
    }
    setUploading(false);
  };

  // (Optional) Download the file using Expo FileSystem
  const downloadFile = async () => {
    if (!downloadURL) {
      Alert.alert("No file to download", "Please upload a file first.");
      return;
    }
    // Determine a local file path
    const localUri = FileSystem.documentDirectory + "downloadedFile.jpg";
    try {
      const result = await FileSystem.downloadAsync(downloadURL, localUri);
      Alert.alert("Download successful", `File saved to ${result.uri}`);
    } catch (error) {
      console.error("Error downloading file:", error);
      Alert.alert(
        "Download failed",
        "There was an error downloading your file."
      );
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Select Image" onPress={selectImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, marginVertical: 10 }}
        />
      )}
      <Button title="Upload Image" onPress={uploadImage} disabled={uploading} />
      {uploading && <Text>{transferred} % Completed</Text>}
      {downloadURL && (
        <>
          <Text style={{ marginVertical: 10 }}>Download URL:</Text>
          <Text style={{ color: "blue" }}>{downloadURL}</Text>
          <Button title="Download File" onPress={downloadFile} />
        </>
      )}
    </View>
  );
};
