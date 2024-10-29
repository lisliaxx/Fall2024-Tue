import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { auth } from '../Firebase/firebaseSetup';

export default function Profile() {
  const user = auth.currentUser;

  return (
    <View style={styles.container}>
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
    marginBottom: 30,
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
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
  }
});