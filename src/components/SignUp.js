import React, { useState, useEffect } from 'react';
import { Button, TextInput, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../../firebaseConfig';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { Platform } from 'react-native';


WebBrowser.maybeCompleteAuthSession();

const androidClientId= '430745767784-t64kc6kefpn1dg3o0fg237u4ha3pdl9g.apps.googleusercontent.com';
const iosClientId= '430745767784-01bn2q0sqk1cfdc1eqijlk8cr83ar4sf.apps.googleusercontent.com';
const webClientId = '430745767784-ncuevmhicrk4lhpb9fcn138ghhe0r30g.apps.googleusercontent.com';


// Use the useProxy option to automatically handle the proxy
const useProxy = Platform.select({ web: false, default: true });
const redirectUri = makeRedirectUri({ useProxy });

function SignUp() {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [googleRequest, googleResponse, googlePromptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: webClientId,
      androidClientId: androidClientId,
      iosClientId: iosClientId,
      redirectUri,
    },
    {
      selectAccount: true,
    }
  );

  useEffect(() => {
    if (selectedProvider === 'google' && googleResponse?.type === 'success') {
      const { id_token } = googleResponse.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => alert('User signed up with Google!'))
        .catch((error) => alert(error));
    }
  }, [googleResponse]);

  async function onSignUp() {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      alert('User signed up!');
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
      <Button title="Sign Up" onPress={onSignUp} />
      <Button
        disabled={!googleRequest}
        title="Login with Google"
        onPress={() => {
          setSelectedProvider('google');
          googlePromptAsync();
        }}
      />
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

export default SignUp;
