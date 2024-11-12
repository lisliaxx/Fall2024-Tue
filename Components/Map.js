import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map({ route, navigation }) {
  const { location } = route.params;
  const [selectedLocation, setSelectedLocation] = useState(null);

  const initialRegion = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
  };

  const handleSelectLocation = () => {
    navigation.navigate('Profile', { selectedLocation });
  };

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        initialRegion={initialRegion}
        onPress={handleMapPress}
      >
        {/* Current location marker */}
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="You are here"
          pinColor="blue"
        />
        
        {/* Selected location marker */}
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Selected location"
            pinColor="red"
          />
        )}
      </MapView>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Select This Location"
          onPress={handleSelectLocation}
          disabled={!selectedLocation}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  }
});