import { StyleSheet, Text, Button, View, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager() {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const getPermissions = async () => {
      const response = await ImagePicker.requestCameraPermissionsAsync();
      setPermissionStatus(response.status);
    };
    getPermissions();
  }, []);

  const verifyPermissions = async () => {
    try {
      if (permissionStatus !== "granted") {
        const response = await ImagePicker.requestCameraPermissionsAsync();
        setPermissionStatus(response.status);
        if (response.status !== "granted") {
          console.log("Permission denied");
          return false;
        }
      }
      console.log("Permission granted");
      return true;
    } catch (err) {
      console.log("Error verifying permissions ", err);
      return false;
    }
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      Alert.alert("Permission denied", "You need to grant camera permissions to use this feature", [{ text: "Okay" }]);
      return;
    }
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });

      if (!result.canceled) {
        const { assets } = result;
        if (assets && assets.length > 0) {
          setImageUri(assets[0].uri);
        }
      }
    } catch (err) {
      console.log("Error taking image ", err);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take An Image" onPress={takeImageHandler} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
