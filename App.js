import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, SafeAreaView, ScrollView, FlatList, Alert } from 'react-native';
import React, { useState } from 'react';
import Header from './Components/Header';
import Input from './Components/Input'; 
import GoalItem from './Components/GoalItem';

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

  function handleDelete(id) {
    console.log("Delete button pressed", id);
    setGoals((prevGoals) => {
      return prevGoals.filter((goal) => goal.id !== id);
    });
  }

  function handleDeleteAll() {
    Alert.alert(
      "Delete All",
      "Are you sure you want to delete all goals?",
      [
        { text: "No", onPress: () => console.log("Cancel Pressed") },
        { text: "Yes", onPress: () => setGoals([]) }
      ]
    );
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
        {/* <ScrollView contentContainerStyle={styles.scrollView}>
          {goals.map((goalObject) => {
            return (
              <View key={goalObject.id} style={styles.textContainer}>
                <Text style={styles.text}>{goalObject.text}</Text>
              </View>
            );
          })}
        </ScrollView> */}

        <FlatList
          data={goals}
          renderItem={({ item }) => {
            return <GoalItem deleteHandler={handleDelete}item={item} />;
          }}

          ListEmptyComponent={() => <Text style={styles.noGoalsText}>No goals to show</Text>}

          ListHeaderComponent={() => goals.length > 0 && <Text style={styles.headerText}>My Goals</Text>}

          ListFooterComponent={() => goals.length > 0 && (<Button title="Delete All" onPress={handleDeleteAll} />)}

          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
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
  noGoalsText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    color: 'blue',
  },

  headerText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'blue',
  },

  separator: {
    height: 3,
    width: "100%",
    backgroundColor: "blue",
    marginVertical: 20,

  },

  topView: {
    flex: 1,
    marginTop: 50,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomView: {
    flex: 4,
    marginTop: 20,
    backgroundColor: 'pink',
    width: '100%',
    alignItems: 'center',
  },

  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
