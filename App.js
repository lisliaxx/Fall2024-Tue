import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './Components/Header';
import { useState } from 'react';

export default function App() {
  const [text, setText] = useState('');
  const appName = "My App!";
  function updateText(changeText){
    // console.log(changeText);
    setText(changeText);
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName} />
      <TextInput 
        placeholder='Type Something'
        autoCorrect={true}
        keyboardType='default'
        value = {text}
        style ={{borderBottomColor: 'black', borderBottomWidth: 2}}
        onChangeText={updateText}
      />
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
