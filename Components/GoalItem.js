import { Button, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';
import PressableButton from "./PressableButton";

export default function GoalItem({item, deleteHandler}) {
    const navigation = useNavigation();

    function handleDelete() {
        console.log("Delete button pressed", item.id);
        deleteHandler(item.id);
    }

    function handlePress() {
        console.log("Navigate to GoalDetails", item);
        navigation.navigate('GoalDetails', {goalItem: item});
    }

    return (
        <View key={item.id} style={styles.textContainer}>
            <Pressable 
                onPress={handlePress} 
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
                    <Text style={styles.deleteText}>X</Text>
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