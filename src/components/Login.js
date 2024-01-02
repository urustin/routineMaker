import React, { useState } from 'react';
import { Button, TextInput, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../../firebaseConfig';

// console.log(auth);

function Login() {
  // State to store the email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSignIn() {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      alert('User signed in!');
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        placeholderTextColor={"rgba(0,0,0,0.2)"}
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        placeholderTextColor={"rgba(0,0,0,0.2)"}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Sign In" onPress={onSignIn} />
    </>
  );
}

const styles = StyleSheet.create({
    textInput: {
    

      marginLeft:"auto",
      marginRight:"auto",
        marginVertical :20,
        fontSize:20,
      width:"60%",
      height: 60,
        backgroundColor: 'white',
        color:"rgb(0,0,0)",

    },
    
});


export default Login;
