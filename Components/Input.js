import React, { useEffect, useRef, useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

export default function Input({ autoFocus }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const updateText = (changeText) => {
    setText(changeText);
  };

  return (
      <TextInput
        placeholder='Type Something'
        autoCorrect={true}
        keyboardType='default'
        value={text}
        style={styles.input}
        onChangeText={updateText}
      />
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
