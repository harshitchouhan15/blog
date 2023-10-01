// Import the functions you need from the SDKs you need

import 'firebase/storage';

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-5nC-JZSJ9cPSkX3Tbe9EsBHU-PFcvoc",
  authDomain: "newest-c502e.firebaseapp.com",
  projectId: "newest-c502e",
  storageBucket: "newest-c502e.appspot.com",
  messagingSenderId: "344039944753",
  appId: "1:344039944753:web:e6889f2775de4e6176db10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app