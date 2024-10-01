import {View, Text, Button} from 'react-native';
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
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ 
            title : "My Goals",
            headerStyle: {
              backgroundColor: '#80d195',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen 
          name="GoalDetails" 
          component={GoalDetails} 
          options={({route}) => {return {
            title: route.params ? route.params.goalItem.text : "More Details",
            headerRight: () => {
              return <Button title="Warning"
              onPress ={() => {console.log("Warning");}}  
              />
            },
          };
          }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}