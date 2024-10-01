import {View, Text} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';


const Stack = createStackNavigator();
console.log(Stack);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="GoalDetails" component={GoalDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}