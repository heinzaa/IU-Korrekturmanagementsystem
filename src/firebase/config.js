// Import the functions you need from the SDKs you need

//import { initializeApp } from "@firebase/app";

import firebase from "firebase";

//import "firebase/firestore";
//import 'firebase/auth';

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY8bWe3TYSa4Q-mzetqGFiB9SETtNwBLM",
  authDomain: "korrekturmanagementsyste-b8cd9.firebaseapp.com",
  databaseURL: "https://korrekturmanagementsyste-b8cd9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "korrekturmanagementsyste-b8cd9",
  storageBucket: "korrekturmanagementsyste-b8cd9.appspot.com",
  messagingSenderId: "672718022970",
  appId: "1:672718022970:web:8f6631500022f7d5554803"
};

// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);

const projectAuth = firebaseApp.auth()
const projectFirestore = firebaseApp.firestore()



export { projectAuth, projectFirestore }