import { StyleSheet, Text, Button, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager() {
  const [permissionStatus, setPermissionStatus] = useState(null);

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
      console.log(result);
    } catch (err) {
      console.log("Error taking image ", err);
    }
  };

  return (
    <View>
      <Button title="Take An Image" onPress={takeImageHandler} />
    </View>
  );
}

const styles = StyleSheet.create({});
