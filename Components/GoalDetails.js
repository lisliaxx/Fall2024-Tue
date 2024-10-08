import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PressableButton from './PressableButton';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function GoalDetails({ route, navigation }) {
  const { goalItem, isMoreDetails } = route.params || {};
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          componentStyle={styles.button}
          pressHandler={() => setIsWarning(!isWarning)}
          pressedStyle={styles.buttonPressed}
        >
          <AntDesign name="warning" size={16} color="black" />
        </PressableButton>
        // <Button
        //   onPress={() => setIsWarning(!isWarning)}
        //   title={isWarning ? "Reset" : "Warning"}
        //   color={isWarning ? "red" : "black"}
        // />
      ),
    });
  }, [navigation, isWarning]);

  useEffect(() => {
    navigation.setOptions({
      title: isWarning ? "Warning!" : (isMoreDetails ? "More details" : "Goal Details"),
    });
  }, [navigation, isWarning, isMoreDetails]);

  function handleMoreDetails() {
    navigation.push('GoalDetails', { 
      goalItem: { ...goalItem, text: "More details" },
      isMoreDetails: true
    });
  }

  return (
    <View style={styles.container}>
      {isMoreDetails ? (
        <Text style={[styles.text, isWarning && styles.warningText]}>More details</Text>
      ) : goalItem ? (
        <View>
          <Text style={[styles.title, isWarning && styles.warningText]}>Goal Details</Text>
          <Text style={[styles.text, isWarning && styles.warningText]}>ID: {goalItem.id}</Text>
          <Text style={[styles.text, isWarning && styles.warningText]}>Text: {goalItem.text}</Text>
        </View>
      ) : (
        <Text style={[styles.text, isWarning && styles.warningText]}>No goal details available</Text>
      )}
      {!isMoreDetails && <Button title="More Details" onPress={handleMoreDetails} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  warningText: {
    color: 'red',
  },
});