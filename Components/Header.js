import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React from 'react';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Header({ name }) {
  const { width, height } = useWindowDimensions();
  // console.log(`Window width: ${width}, height: ${height}`);
  return (
    <View>
      <Text style={styles.text}> Welcome to { name } </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text : {
    fontSize: 20,
    color: 'green',
    borderColor: 'black',
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
  }
});