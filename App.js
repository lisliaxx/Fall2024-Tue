import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import Header from './Components/Header';
import Input from './Components/Input'; 

export default function App() {
  const [text , setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My App!";

  function handleInputData(data) {
    console.log("App.js", data);
    let newGoal = {
      text: data, id:Math.random()
    };
    const newGoals = [...goals, newGoal];
    console.log(newGoals);
    // setText(data);
    setGoals((prevGoals) => {
      return [...prevGoals, newGoal]});
    setModalVisible(false); 
  }

  function handleCancel() {
    console.log("User cancelled input");
    setModalVisible(false); 
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.topView}>
        <Header name={appName} />
        <Button
          style={styles.button}
          title='Add a Goal'
          onPress={() => setModalVisible(true)} 
        />
      </View>

      <Input 
        autoFocus={true} 
        inputHandler={handleInputData} 
        cancelHandler={handleCancel}  
        modalVisible={modalVisible} 
      />
      
      <View style={styles.bottomView}>
      {goals.map((goalObject) => {
        return (
          <View key={goalObject.id} style={styles.textContainer}>
            <Text style={styles.text}>{goalObject.text}</Text>
          </View>
        );
      })}
      </View>
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 15,
    color: 'green',
    padding: 5,
    borderRadius: 5,
  },

  topView: {
    flex: 1,
    marginTop: 50,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomView: {
    alignItems: 'center',
    flex: 4,
    marginTop: 20,
    padding: 20,
    backgroundColor: 'pink',
  },

  textContainer: {
    backgroundColor: 'pink',
    borderRadius: 5,
    marginTop: 5,
  },
});
