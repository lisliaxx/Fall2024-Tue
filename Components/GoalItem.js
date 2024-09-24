import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function GoalItem({item, deleteHandler}) {

    function handleDelete() {
        console.log("Delete button pressed", item.id);
        deleteHandler(item.id);
      }
    return (
        <View key={item.id} style={styles.textContainer}>
          <Text style={styles.text}>{item.text}</Text>
          <Button title="X" onPress={handleDelete} />
        </View>
      );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        color: 'green',
        padding: 5,
      },
      textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 50,
      },
    });
