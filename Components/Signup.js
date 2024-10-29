import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signupHandler = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (email === '' || password === '' || confirmPassword === '') {
        alert('Please fill in all fields');
        return;
    }
    if (password.length < 6 && password) {
        alert('Password must be at least 6 characters');
        return;
    }
    
    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
    if (!passwordPattern.test(password)) {
        alert('Password must contain at least one capital letter, one number, and one special character');
        return;
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User created: ', user);
    } catch (error) {
      console.error(error);
    }
  }

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

      <Text style={styles.label}>Confirm password</Text>
      <TextInput 
        style={styles.input}
        placeholder="Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Pressable onPress={signupHandler}>
        <Text style={styles.registerButton}>Register</Text>
      </Pressable>

      <Pressable onPress={() => navigation.replace('Login')}>
        <Text style={styles.loginLink}>Already Registered? Login</Text>
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
  registerButton: {
    color: '#0096FF',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  loginLink: {
    color: '#0096FF',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
  }
});