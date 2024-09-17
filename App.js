import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import Header from './Components/Header';
import Input from './Components/Input'; 

export default function App() {
  const [text , setText] = useState('');
  const appName = "My App!";
function handleInputData (data) {
  console.log("App.js", data);
  setText(data);
}

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName} />
      <Input autoFocus={true} inputHandler={handleInputData}/>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
