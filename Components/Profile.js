import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { auth } from '../Firebase/firebaseSetup';
import { signOut } from 'firebase/auth';
import { AntDesign } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import LocationManager from './LocationManager';
import NotificationManager from './NotificationManager';

export default function Profile({ navigation, route }) {
  const user = auth.currentUser;

  async function handleSignOut() {
    try {
      await signOut(auth);
      navigation.replace('Login');  
    } catch (error) {
      console.error("Error signing out: ", error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={handleSignOut}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
              marginRight: 15,
            }
          ]}
        >
          <AntDesign name="logout" size={24} color="white" />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Profile Information</Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>{user?.email || 'Not available'}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>User ID:</Text>
          <Text style={styles.info}>{user?.uid || 'Not available'}</Text>
        </View>
      </View>
      
      <View style={styles.locationContainer}>
        <LocationManager navigation={navigation} route={route} />
      </View>
      
      <NotificationManager />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  info: {
    fontSize: 18,
    color: '#333',
  },
  locationContainer: {
    flex: 1,
    marginBottom: 10,
  },
});