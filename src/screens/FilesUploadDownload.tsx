import React, { useState } from "react";
import { Button, Image, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
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

  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo" }, async (response) => {
      if (response.didCancel) {
        console.log("User canceled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorCode);
      } else {
        if (response.assets && response.assets.length > 0) {
          const { uri } = response.assets[0];
          if (uri) {
            setImageUri(uri);
            await uploadImageToCloudinary(uri);
          } else {
            console.log("URI is undefined");
          }
        } else {
          console.log("No assets found in the response");
        }
      }
    });
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
