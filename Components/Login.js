import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email Address</Text>
      <TextInput 
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput 
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable onPress={() => console.log('Login pressed')}>
        <Text style={styles.loginButton}>Log In</Text>
      </Pressable>

      <Pressable onPress={() => navigation.replace('Signup')}>
        <Text style={styles.createAccount}>New User? Create an account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    borderRadius: 3,
    backgroundColor: 'white',
  },
  loginButton: {
    color: '#0096FF',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  createAccount: {
    color: '#0096FF',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
  }
});