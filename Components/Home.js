import { StatusBar } from "expo-status-bar";
import {
  Button, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Alert, 
  Pressable,
  Image
} from "react-native";
import Header from "./Header";
import React, { useEffect, useState, useLayoutEffect } from "react";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
import { auth, database, storage } from "../Firebase/firebaseSetup";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { writeToDB, deleteFromDB, deleteAllFromDB } from "../Firebase/firestoreHelper";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Notifications from 'expo-notifications';


const GoalListItem = React.memo(({ item, separators, deleteHandler }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {

    async function getPushToken() {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: "719b0d7-5fe1-4409-a8d1-12578c691035",
      });
      console.log('Push Token:', token);
    }
    getPushToken();
  }, []);

  useEffect(() => {
    async function getImageUrl() {
      if (item.imageUri) {
        try {
          const imageRef = ref(storage, item.imageUri);
          const url = await getDownloadURL(imageRef);
          setImageUrl(url);
        } catch (error) {
          console.error("Error getting image URL:", error);
        }
      }
    }
    getImageUrl();
  }, [item.imageUri]);

  return (
    <View style={styles.goalContainer}>
      <GoalItem
        separators={separators}
        deleteHandler={deleteHandler}
        goalObj={item}
      />
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.goalImage}
          resizeMode="cover"
        />
      )}
    </View>
  );
});

export default function Home({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My app!";

  useEffect(() => {
    const q = query(
      collection(database, "goals"),
      where("owner", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        let newArray = [];
        querySnapshot.forEach((docSnapshot) => {
          newArray.push({ ...docSnapshot.data(), id: docSnapshot.id });
        });
        setGoals(newArray);
      },
      (error) => {
        if (error.code === "permission-denied") {
          Alert.alert(
            "Permission Error",
            "You do not have permission to access this data."
          );
        } else {
          Alert.alert("Error", "An unexpected error occurred.");
          console.error("Firestore error:", error);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const handleAddGoal = () => {
    console.log("Opening modal");  
    setModalVisible(true);
  };

  async function fetchAndUploadImage(imageUri) {
    try {
      const response = await fetch(imageUri);
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const blob = await response.blob();
      const imageName = `${auth.currentUser.uid}_${Date.now()}.jpg`;
      const imageRef = ref(storage, `goals/${imageName}`);
      
      await uploadBytesResumable(imageRef, blob);
      const url = await getDownloadURL(imageRef);
      return url;
    } catch (error) {
      console.error("Error fetching and uploading image:", error);
      throw error;
    }
  }

  async function handleInputData(data) {
    try {
      console.log("App.js ", data);
      let imageUrl = null;
      let storagePath = null;
      
      if (data.imageUri) {
        const imageName = `goals/${auth.currentUser.uid}_${Date.now()}.jpg`;
        storagePath = imageName;
        const imageRef = ref(storage, imageName);
        
        const response = await fetch(data.imageUri);
        const blob = await response.blob();
        await uploadBytesResumable(imageRef, blob);
        imageUrl = await getDownloadURL(imageRef);
      }
      
      let newGoal = { 
        text: data.text,
        imageUri: storagePath,
        owner: auth.currentUser.uid,
        createdAt: new Date().toISOString()
      };
      
      await writeToDB(newGoal, "goals");
      setModalVisible(false);
    } catch (error) {
      console.error("Error adding goal:", error);
      Alert.alert("Error", "Failed to add goal. Please try again.");
    }
  }

  function handleGoalDelete(deletedId) {
    Alert.alert(
      "Delete Goal",
      "Are you sure you want to delete this goal?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteFromDB(deletedId, "goals");
            } catch (error) {
              console.error("Error deleting goal:", error);
              Alert.alert("Error", "Failed to delete goal. Please try again.");
            }
          },
          style: "destructive"
        }
      ]
    );
  }

  function dismissModal() {
    setModalVisible(false);
  }

  function deleteAll() {
    Alert.alert("Delete All", "Are you sure you want to delete all goals?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Delete All",
        onPress: async () => {
          try {
            await deleteAllFromDB("goals");
          } catch (error) {
            console.error("Error deleting all goals:", error);
            Alert.alert("Error", "Failed to delete all goals. Please try again.");
          }
        },
        style: "destructive"
      },
    ]);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate('Profile')}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
              marginRight: 15,
            }
          ]}
        >
          <AntDesign name="user" size={24} color="white" />
        </Pressable>
      ),
    });
  }, [navigation]);

  const renderGoalItem = ({ item, separators }) => (
    <GoalListItem 
      item={item} 
      separators={separators} 
      deleteHandler={handleGoalDelete}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName} />
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
          dismissModal={dismissModal}
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
              <Button 
                title="Delete all" 
                onPress={deleteAll}
                color="red" 
              />
            ) : null
          }
          contentContainerStyle={styles.scrollViewContainer}
          data={goals}
          renderItem={renderGoalItem}
          keyExtractor={(item) => item.id}
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
  goalContainer: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  goalImage: {
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  }
});