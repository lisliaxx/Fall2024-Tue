import { Button, StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';
import PressableButton from "./PressableButton";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function GoalItem({item, deleteHandler, onPressIn, onPressOut}) {
    const navigation = useNavigation();

    function handleDelete() {
        console.log("Delete button pressed", item.id);
        deleteHandler(item.id);
    }

    function handlePress() {
        console.log("Navigate to GoalDetails", item);
        navigation.navigate('GoalDetails', {goalItem: item});
    }

    function handleLongPress() {
      Alert.alert(
          "Delete Goal",
          "Are you sure you want to delete this goal?",
          [
              { text: "No", style: "cancel" },
              { text: "Yes", onPress: () => deleteHandler(item.id), style: "destructive" }
          ]
      );
  }

    return (
        <View key={item.id} style={styles.textContainer}>
            <Pressable 
                onPress={handlePress} 
                onLongPress={handleLongPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                delayLongPress={500}
                style={({pressed}) => [
                    styles.horizontalContainer, 
                    pressed && styles.pressableStyle
                ]} 
                android_ripple={{color:'red', radius:25}}
            >
                <Text style={styles.text}>{item.text}</Text>
                {/* <Button title="X" onPress={handleDelete} /> */}
                <PressableButton 
                  componentStyle={styles.deleteButton} 
                  pressHandler={handleDelete}
                  pressedStyle={styles.pressableStyle}
                  >
                    {/* <Text style={styles.deleteText}>X</Text> */}
                    <AntDesign name="delete" size={24} color="black" />
                </PressableButton>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        color: 'green',
        padding: 10,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 15,
    },
    horizontalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pressableStyle: {
        opacity: 0.5,
        backgroundColor: 'red',
    },
    deleteButton: {
        backgroundColor: 'red',
        color: 'white',
        padding: 10,
        borderRadius: 5,
    },
    deleteText: {
        color: 'white',
    },  
});