// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC1k897TqnZ0qPOLEgF856p9OKOrBOZa0",
  authDomain: "telangana-learning-hub.firebaseapp.com",
  projectId: "telangana-learning-hub",
  storageBucket: "telangana-learning-hub.firebasestorage.app",
  messagingSenderId: "890851333613",
  appId: "1:890851333613:web:428e0e9107db4f47ccc3e4",
  measurementId: "G-XB0YXZBMSW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export  { app, auth};