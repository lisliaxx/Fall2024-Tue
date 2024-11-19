import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function NotificationManager() {
  const [isScheduling, setIsScheduling] = useState(false);

  const scheduleNotificationHandler = async () => {
    setIsScheduling(true);
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Location Reminder",
          body: "Don't forget to update your location!",
          data: { screen: 'Profile' },
        },
        trigger: {
          seconds: 5, 
          repeats: false,
        },
      });
      
      console.log('Notification scheduled:', notificationId);
      Alert.alert('Success', 'Reminder has been set!');
    } catch (err) {
      console.error('Error scheduling notification:', err);
      Alert.alert('Error', 'Failed to set reminder');
    } finally {
      setIsScheduling(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title={isScheduling ? "Setting reminder..." : "Set Daily Reminder"}
        onPress={scheduleNotificationHandler}
        disabled={isScheduling}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 'auto',
  },
});
