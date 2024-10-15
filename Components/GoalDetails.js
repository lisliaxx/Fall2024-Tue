import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PressableButton from './PressableButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import { updateWarningStatus } from '../Firebase/firestoreHelper';

export default function GoalDetails({ route, navigation }) {
  const { goalItem, isMoreDetails } = route.params || {};
  const [isWarning, setIsWarning] = useState(goalItem?.warning || false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          componentStyle={styles.button}
          pressHandler={handleWarningToggle}
          pressedStyle={styles.buttonPressed}
        >
          <AntDesign name="warning" size={16} color={isWarning ? "red" : "black"} />
        </PressableButton>
      ),
    });
  }, [navigation, isWarning, goalItem]);

  useEffect(() => {
    navigation.setOptions({
      title: isWarning ? "Warning!" : (isMoreDetails ? "More details" : "Goal Details"),
    });
  }, [navigation, isWarning, isMoreDetails]);

  async function handleWarningToggle() {
    try {
      const newWarningStatus = !isWarning;
      await updateWarningStatus(goalItem.id, 'goals', newWarningStatus);
      setIsWarning(newWarningStatus);
    } catch (error) {
      console.error("Failed to update warning status:", error);
    }
  }

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