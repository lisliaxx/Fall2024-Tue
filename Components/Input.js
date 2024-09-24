import React, { useEffect, useRef, useState } from 'react';
import { TextInput, StyleSheet, View, Text, Button, Modal, Alert, Image } from 'react-native';

export default function Input({ autoFocus, inputHandler, modalVisible, cancelHandler }) {
  const [text, setText] = useState('');
  const [isBlurred, setIsBlurred] = useState(false);
  const inputRef = useRef(null);

  const handleConfirm = () => {
    // console.log("User input: ", text);
    inputHandler(text);
    setText('');
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Input',
      'Are you sure you want to cancel?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: ()  => {
          cancelHandler();
          setText('');
        }},
      ]
    )
  };


  useEffect(() => {
    if (autoFocus && inputRef.current && modalVisible) {
      inputRef.current.focus();
    }
  }, [autoFocus, modalVisible]);

  const updateText = (changeText) => {
    setText(changeText);
    setIsBlurred(false);
  };

  const handleBlur = () => {
    setIsBlurred(true);
  }

  const isConfirmedDisabled = text.trim().length < 3;

  return (
    <Modal 
      visible={modalVisible}
      animationType='slide'>

      <View style={styles.container}>
        <Image 
          source={{uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png'}}
          style={styles.image}
          alt="Network image"
        />

        <Image 
          source={require('../Images/Image.png')}
          style={styles.image}
          alt="Local image"
        />

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


        <View style={styles.buttonContainer}>
          <Button title='Confirm' onPress={handleConfirm} disabled={isConfirmedDisabled} />
          <Button title='Cancel' onPress={handleCancel}/>
        </View>
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
  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },

  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  }
});
