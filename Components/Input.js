import React, { useEffect, useRef, useState } from 'react';
import { TextInput, StyleSheet, View, Text, Button, Modal } from 'react-native';

export default function Input({ autoFocus, onFocus, inputHandler, modleVisible }) {
  const [text, setText] = useState('');
  const [isBlurred, setIsBlurred] = useState(false);
  const handleConfirm = () => {
    // console.log("User input: ", text);
    inputHandler(text);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const updateText = (changeText) => {
    setText(changeText);
    setIsBlurred(false);
  };

  const handleBlur = () => {
    setIsBlurred(true);
  }

  return (
  <Modal 
  visible={modleVisible}
  animationType='slide'>
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        placeholder='Type Something'
        autoCorrect={true}
        keyboardType='default'
        value={text}
        style={styles.input}
        onChangeText={updateText}
        onBlur={handleBlur}
        // changed for week3 onfocus
        onFocus={() => setIsBlurred(false)}
      />

      {!isBlurred && text.length > 0 && 
      <Text>
        Character Count: {text.length}
      </Text>}

      {isBlurred && (
        <Text>
        {text.length >= 3 ? 'Thank you' : 'Please type more than 3 characters'}
        </Text>
      )}

      <Button title='Confirm' onPress={handleConfirm} />
    </View>
  </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: 15,
    borderBottomColor: 'black',
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
  },
});
