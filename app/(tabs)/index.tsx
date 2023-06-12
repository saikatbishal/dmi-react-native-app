import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert,Text } from 'react-native';
import axios from 'axios';
import Products from './products';
interface User {
  id: number;
  email: string;
  username: string;
  city:string
}
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [showNotLoggedIn, setShowNotLoggedIn] = useState(false);

  const handleLogin = async () => {
    console.log("HandleLogin")
    try {
      const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
      const users = response.data;

      const authenticatedUser = users.find(
        (user: User) => user.email === email && user.username === password
      );
      

      if (authenticatedUser) {
        setAuthenticated(true);
        sessionStorage.setItem('authenticatedUser', 'true');
        sessionStorage.setItem('username',password)
      } else {
        setShowNotLoggedIn(true)
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Error', 'An error occurred');
    }
  };

  const handleGoBack = () => {
    setShowNotLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  if (authenticated) {
    return <h1>You Are Authenticated</h1>
  }

  return (
    <View style={styles.container}>
      {!showNotLoggedIn && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <Button title="Login" onPress={handleLogin} />
        </>
      )}

      {showNotLoggedIn && (
        <View style={styles.errorText}>
          <Text>Invalid email or password. Please try again.</Text>
          <Button title="Go Back" onPress={handleGoBack} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  errorText: {
    marginBottom: 12,
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
