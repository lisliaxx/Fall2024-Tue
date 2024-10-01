import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';

export default function GoalItem({item, deleteHandler, pressHandler}) {
    const navigation = useNavigation();

    function handleDelete() {
        console.log("Delete button pressed", item.id);
        deleteHandler(item.id);
      }

    function handlePress() {
      navigation.navigate('GoalDetails', {goalItem: item});
    }

    return (
        <View key={item.id} style={styles.textContainer}>
          <Text style={styles.text}>{item.text}</Text>
          <Button title="X" onPress={handleDelete} />
          <Button title="i" onPress={handlePress} />
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
    });
