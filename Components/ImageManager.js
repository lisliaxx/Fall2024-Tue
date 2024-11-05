import { StyleSheet, Text, Button, View, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager({ onImageTaken }) { 
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const response = await ImagePicker.requestCameraPermissionsAsync();
        setPermissionStatus(response.status);
      } catch (error) {
        console.error("Error requesting permissions:", error);
        Alert.alert("Error", "Failed to request camera permissions");
      }
    };
    getPermissions();
  }, []);

  const verifyPermissions = async () => {
    try {
      if (permissionStatus !== "granted") {
        const response = await ImagePicker.requestCameraPermissionsAsync();
        setPermissionStatus(response.status);
        if (response.status !== "granted") {
          Alert.alert(
            "Permission Required",
            "You need to grant camera permissions to use this feature"
          );
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error("Error verifying permissions:", error);
      Alert.alert("Error", "Failed to verify camera permissions");
      return false;
    }
  };

  const takeImageHandler = async () => {
    setIsLoading(true);
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) return;

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.8,
        aspect: [4, 3],
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
        if (onImageTaken && typeof onImageTaken === 'function') {
          onImageTaken(uri);
        }
      }
    } catch (error) {
      console.error("Error taking image:", error);
      Alert.alert("Error", "Failed to take photo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button 
        title={isLoading ? "Processing..." : "Take Photo"} 
        onPress={takeImageHandler}
        disabled={isLoading}
      />
      {imageUri && (
        <Image 
          source={{ uri: imageUri }} 
          style={styles.image}
          resizeMode="cover"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});
