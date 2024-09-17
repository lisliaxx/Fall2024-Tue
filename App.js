import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';
import React, { useState } from 'react';
import Header from './Components/Header';
import Input from './Components/Input'; 

export default function App() {
  const [text , setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const appName = "My App!";
function handleInputData (data) {
  console.log("App.js", data);
  setText(data);
  setModalVisible(false);
}

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName} />
      <Button title='Add a Goal' onPress={() => setModalVisible(true)} />
      <Input 
      autoFocus={true} 
      inputHandler={handleInputData} 
      modleVisible={modalVisible}/>
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
