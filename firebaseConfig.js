// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-UgnRHeMwKiknM24l0QptL5IMs6R0kGE",
  authDomain: "dailychecker-87d84.firebaseapp.com",
  projectId: "dailychecker-87d84",
  storageBucket: "dailychecker-87d84.appspot.com",
  messagingSenderId: "430745767784",
  appId: "1:430745767784:web:5a8feda2a96762256c10dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export default auth;