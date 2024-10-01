import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function GoalDetails(route, navigation) {

    const { goalItem } = route.route.params;
    function moreDetailsHandler () {
      navigation.navigate("GoalDetails")
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