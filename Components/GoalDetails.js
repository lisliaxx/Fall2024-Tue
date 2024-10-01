import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function GoalDetails(route, navigation) {


    const { goalItem } = route.route.params;
    function moreDetailsHandler() {
      console.log("More details button pressed", goalItem.id);
    }
  return (
    <View>
    {route.params ? (
      <Text>This is the goal detail with id: {goalItem.id} and text: {goalItem.Text}</Text>
    ) : (
      <Text>More details</Text>
    )}
      <Button title="More Details" onPress={moreDetailsHandler} />
    </View>
  );
}