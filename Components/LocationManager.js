import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Alert, Image } from "react-native";
import * as Location from 'expo-location';
import { GOOGLE_MAPS_API_KEY } from '@env';

export default function LocationManager({ navigation }) {
  const [location, setLocation] = useState(null);

  async function getLocation() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Permission to access location was denied'
        );
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude
      });
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert('Error', 'Failed to get location');
    }
  }

  const getMapUrl = () => {
    if (!location) return null;
    
    return `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${GOOGLE_MAPS_API_KEY}`;
  };

  return (
    <View style={styles.container}>
      <Button title="Find My Location" onPress={getLocation} />
      {location && (
        <View style={styles.mapContainer}>
          <Image
            source={{ uri: getMapUrl() }}
            style={styles.map}
            resizeMode="cover"
          />
          <Text style={styles.coordinates}>
            Lat: {location.latitude.toFixed(4)}, Long: {location.longitude.toFixed(4)}
          </Text>
          <Button 
            title="Open Interactive Map"
            onPress={() => navigation.navigate('Map', { location })}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  mapContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  map: {
    width: 400,
    height: 200,
    borderRadius: 10,
  },
  coordinates: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  }
});