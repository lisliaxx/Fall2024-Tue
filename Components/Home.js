import { StatusBar } from "expo-status-bar";
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, View, FlatList, Alert,} from "react-native";
import Header from "./Header";
import { useEffect, useState } from "react";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
import { database } from "../Firebase/firebaseSetup";
import { writeToDB, deleteFromDB, deleteAllFromDB} from "../Firebase/firestoreHelper";
import { collection, onSnapshot } from "firebase/firestore";

export default function Home({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My app!";

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, "goals"),
      (querySnapshot) => {
        let newArray = [];
        querySnapshot.forEach((docSnapshot) => {
          newArray.push({ ...docSnapshot.data(), id: docSnapshot.id });
        });
        setGoals(newArray);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleAddGoal = () => {
    console.log("Opening modal");  
    setModalVisible(true);
  };

  function handleInputData(data) {
    console.log("App.js ", data);
    let newGoal = { text: data };
    writeToDB(newGoal, "goals");
    setModalVisible(false);
  }

  function handleGoalDelete(deletedId) {
    deleteFromDB(deletedId, "goals");
  }

  function deleteAll() {
    Alert.alert("Delete All", "Are you sure you want to delete all goals?", [
      {
        text: "Yes",
        onPress: () => {
          deleteAllFromDB("goals");
        },
      },
      { text: "No", style: "cancel" },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName} />
        {/* PressableButton implementation */}
        <PressableButton
          pressedHandler={handleAddGoal}
          componentStyle={styles.addButton}
          pressedStyle={styles.pressedButton}
        >
          <Text style={styles.buttonText}>Add a Goal</Text>
        </PressableButton>
      </View>

      {modalVisible && (  
        <Input
          autoFocus={true}
          inputHandler={handleInputData}
          modalVisible={modalVisible}
          dismissModal={() => setModalVisible(false)}
        />
      )}

      <View style={styles.bottomView}>
        <FlatList
          ItemSeparatorComponent={({ highlighted }) => (
            <View
              style={[
                styles.separator,
                highlighted && { backgroundColor: "purple" }
              ]}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.noGoalsText}>No goals to show</Text>
          }
          ListHeaderComponent={
            goals.length > 0 ? (
              <Text style={styles.headerText}>My Goals List</Text>
            ) : null
          }
          ListFooterComponent={
            goals.length > 0 ? (
              <Button title="Delete all" onPress={deleteAll} />
            ) : null
          }
          contentContainerStyle={styles.scrollViewContainer}
          data={goals}
          renderItem={({ item, separators }) => (
            <GoalItem
              separators={separators}
              deleteHandler={handleGoalDelete}
              goalObj={item}
            />
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
    justifyContent: 'center',
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
  addButton: {  
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
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
    height: 5,
    width: "100%",
    backgroundColor: "gray",
    marginVertical: 5,
  },
  scrollViewContainer: {
    padding: 15,
    width: '100%',
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});