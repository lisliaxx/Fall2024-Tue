import React, { useEffect, useRef, useState } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

export default function Input({ autoFocus }) {
  const [text, setText] = useState('');
  const [isBlurred, setIsBlurred] = useState(false);
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
    <View>
      <TextInput
        ref={inputRef}
        placeholder='Type Something'
        autoCorrect={true}
        keyboardType='default'
        value={text}
        style={styles.input}
        onChangeText={updateText}
        onBlur={handleBlur}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    width: '80%',
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
});
