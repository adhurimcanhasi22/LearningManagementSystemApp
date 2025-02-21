import React, { useState } from "react";
import { TouchableOpacity, Text, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export const FilesScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const cloudinaryUrl =
    "CLOUDINARY_URL=cloudinary://469518284842138:flSfmzAYC4Ydz_OaDCGdMz94mUo@dvuso9vhe"; // Replace with your cloud name

  const uploadImageToCloudinary = async (uri: string) => {
    const data = new FormData();
    const file = {
      uri: uri,
      type: "image/png", // Adjust depending on your image type
      name: "image.png", // You can use dynamic names as needed
    };
    data.append("file", {
      uri: file.uri,
      type: file.type,
      name: file.name,
    } as any);
    data.append("upload_preset", "ml_default"); // Replace with your upload preset

    try {
      const response = await axios.post(cloudinaryUrl, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setUploadedImageUrl(response.data.secure_url); // URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image to Cloudinary", error);
    }
  };

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
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const { uri } = result.assets[0];
      if (uri) {
        setImageUri(uri);
        await uploadImageToCloudinary(uri);
      }
    } else {
      console.log("No image selected or the user canceled.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        </View>
      )}
      {uploadedImageUrl && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: uploadedImageUrl }}
            style={styles.imagePreview}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fc", // Soft modern background
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  imageContainer: {
    marginTop: 20,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
});
