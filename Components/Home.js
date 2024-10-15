import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, SafeAreaView, ScrollView, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Input from './Input';
import GoalItem from './GoalItem';
import PressableButton from './PressableButton';
import {database} from '../Firebase/firebaseSetup'; 
import { writeToDB } from '../Firebase/firestoreHelper';
import { onSnapshot, collection } from 'firebase/firestore';


export default function Home( {navigation}) {
  // console.log(database);
  const [text , setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My App!";

  useEffect(() => {
  onSnapshot(collection(database, 'goals'), (querySnapshot) => {
    let newArray = [];
    querySnapshot.forEach((docSnapshot) => {
      console.log(docSnapshot.id);
      newArray.push({...docSnapshot.data(), id: docSnapshot.id});
    });
    console.log(newArray);
    setGoals(newArray);
  });
 }, []);

  function handleInputData(data) {
    console.log("App.js", data);
    let newGoal = {
      text: data
    };
    const newGoals = [...goals, newGoal];
    console.log(newGoals);
    writeToDB(newGoal, 'goals');
    // setText(data);
    // setGoals((prevGoals) => {
    //   return [...prevGoals, newGoal]});
    // setModalVisible(false); 
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

  function handleGoalPress(goalItem) {
    console.log("Details button pressed", goalItem.id);
    navigation.navigate('GoalDetails', {goalItem});
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
        <PressableButton pressHandler={function () {
          setModalVisible(true);
        }}
        componentStyle={{backgroundColor: 'purple', padding: 10, borderRadius: 5}}
        >
          <Text style={styles.buttonText}>Add a Goal</Text>
        </PressableButton>
        {/* <Button
          style={styles.button}
          title='Add a Goal'
          onPress={() => setModalVisible(true)} 
        /> */}
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
          renderItem={({ item, index, separators }) => {
            return (
            <GoalItem 
              deleteHandler={handleDelete}
              item={item}
              onPressIn= {() => separators.highlight()}
              onPressOut= {() => separators.unhighlight()}
               />

            )

          }}

          ListEmptyComponent={() => <Text style={styles.noGoalsText}>No goals to show</Text>}

          ListHeaderComponent={() => goals.length > 0 && <Text style={styles.headerText}>My Goals</Text>}

          ListFooterComponent={() => goals.length > 0 && (<Button title="Delete All" onPress={handleDeleteAll} />)}

          ItemSeparatorComponent={({highlighted}) => (
            <View style={[
              styles.separator, 
              highlighted && { backgroundColor:'#2d95fc' }
              ]} />
              )}
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
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
