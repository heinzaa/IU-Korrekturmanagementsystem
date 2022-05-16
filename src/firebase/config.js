// Import the functions you need from the SDKs you need

import firebase from "firebase/app";
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY8bWe3TYSa4Q-mzetqGFiB9SETtNwBLM",
  authDomain: "korrekturmanagementsyste-b8cd9.firebaseapp.com",
  projectId: "korrekturmanagementsyste-b8cd9",
  storageBucket: "korrekturmanagementsyste-b8cd9.appspot.com",
  messagingSenderId: "672718022970",
  appId: "1:672718022970:web:8f6631500022f7d5554803"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// init firestore  

const projectFirestore = firebase.firestore();

export { projectFirestore }