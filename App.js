import {View, Text, Button, Alert} from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Map from './Components/Map';
import * as Notifications from 'expo-notifications';

// Configure notifications first
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();
// console.log(Stack);

const authStack = 
<>
  <Stack.Screen name="Signup" component={Signup} />
  <Stack.Screen name="Login" component={Login} />
</>

const appStack =
<>
  <Stack.Screen name="Home" component={Home} />
  <Stack.Screen name="GoalDetails" component={GoalDetails} />
  <Stack.Screen name="Profile" component={Profile} />
  <Stack.Screen 
    name="Map" 
    component={Map}
    options={{
      title: 'Interactive Map',
      headerStyle: {
        backgroundColor: 'purple',
      },
      headerTintColor: '#fff',
    }}
  />
</>

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  });
  }
  , []);

  useEffect(() => {
    async function requestPermissions() {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission Required',
            'Push notifications need to be enabled to set reminders'
          );
        }
      } catch (error) {
        console.error('Error requesting notification permissions:', error);
      }
    }

    requestPermissions();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#80d195',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        {isUserLoggedIn ? appStack : authStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}