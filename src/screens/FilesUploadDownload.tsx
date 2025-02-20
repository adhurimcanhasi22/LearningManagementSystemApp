import React, { useState } from "react";
import { Button, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export const FilesScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

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
    // Request permission to access the image library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // Launch the image picker
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
    <View style={{ flex: 1, padding: 10 }}>
      <Button title="Pick an Image" onPress={pickImage} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
      )}
      {uploadedImageUrl && (
        <View style={{ marginTop: 20 }}>
          <Image
            source={{ uri: uploadedImageUrl }}
            style={{ width: 200, height: 200 }}
          />
        </View>
      )}
    </View>
  );
};
