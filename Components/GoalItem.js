import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PressableButton from "./PressableButton";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function GoalItem({ goalObj, deleteHandler, separators }) {
  const navigation = useNavigation();

  function handleDelete(event) {
    event.stopPropagation();
    console.log("deleted");
    Alert.alert(
      "Delete A Goal", 
      "Are you sure you want to delete this goal?", 
      [
        { text: "No" },
        { text: "Yes", onPress: () => deleteHandler(goalObj.id) },
      ]
    );
  }


  function handlePress() {
    navigation.navigate("GoalDetails", { goalItem: goalObj });
  }

  function handleLongPress() {
    Alert.alert("Delete A Goal", "Are you sure you want to delete this goal?", [
      { text: "No" },
      { text: "Yes", onPress: handleDelete },
    ]);
  }

  return (
    <View style={styles.textContainer}>
      <Pressable
        onPressIn={() => separators.highlight()}
        onPressOut={() => separators.unhighlight()}
        onLongPress={handleLongPress}
        onPress={handlePress}
        style={({ pressed }) => [
          styles.horizontalContainer,
          pressed && styles.pressedStyle
        ]}
        android_ripple={{ color: "red", radius: 25 }}
      >
        <Text style={styles.text}>{goalObj.text}</Text>
        
        <Pressable
          onPress={handleDelete}
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && styles.pressedStyle
          ]}
        >
          <AntDesign name="delete" size={24} color="white" />
        </Pressable>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: 'green',
    padding: 10,
    flex: 1, 
  },
  textContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 15,
    overflow: 'hidden', 
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  pressedStyle: {
    opacity: 0.7,
    backgroundColor: '#eee',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: 'white',
  },
});