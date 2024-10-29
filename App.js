import {View, Text, Button} from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const Stack = createStackNavigator();
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