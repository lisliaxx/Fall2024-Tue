import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function GoalItem({item}) {
    return (
        <View key={item.id} style={styles.textContainer}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        color: 'green',
        padding: 5,
        margin: 5,
      },
      textContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 50,
      },
    });
