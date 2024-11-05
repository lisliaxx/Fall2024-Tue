import React, { useEffect, useRef, useState } from 'react';
import { TextInput, StyleSheet, View, Text, Button, Modal, Alert, Image, ActivityIndicator } from 'react-native';
import ImageManager from './ImageManager';

export default function Input({ autoFocus, inputHandler, modalVisible, dismissModal }) {
  const [text, setText] = useState('');
  const [isBlurred, setIsBlurred] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await inputHandler({ text, imageUri });
      setText('');
      setImageUri('');
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert("Error", "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      "Cancel",
      "Are you sure you want to cancel?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            setText("");
            setImageUri("");
            dismissModal();
          },
        },
      ]
    );
  };

  const handleImageTaken = (uri) => {
    console.log("Received image uri:", uri);
    setImageUri(uri);
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
  };

  const isConfirmDisabled = text.trim().length < 3 || isSubmitting;

  return (
    <Modal 
      visible={modalVisible}
      transparent={true}
      animationType='slide'>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Image 
            source={{uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png'}}
            style={styles.image}
            accessibilityLabel="Network image"
          />

          <Image 
            source={require('../Images/Image.png')}
            style={styles.image}
            accessibilityLabel="Local image"
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
            onFocus={() => setIsBlurred(false)}
          />

          {!isBlurred && text.length > 0 && (
            <Text style={styles.helperText}>
              Character Count: {text.length}
            </Text>
          )}

          {isBlurred && (
            <Text style={styles.helperText}>
              {text.length >= 3 ? 'Thank you' : 'Please type more than 3 characters'}
            </Text>
          )}

          <ImageManager onImageTaken={handleImageTaken} />

          <View style={styles.buttonContainer}>
            <Button 
              title={isSubmitting ? 'Submitting...' : 'Confirm'} 
              onPress={handleConfirm} 
              disabled={isConfirmDisabled} 
            />
            <Button 
              title='Cancel' 
              onPress={handleCancel}
              disabled={isSubmitting}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 192, 203, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 20,
    borderRadius: 8,
  },
  helperText: {
    fontSize: 14,
    marginBottom: 10,
    color: '#666',
  }
});
