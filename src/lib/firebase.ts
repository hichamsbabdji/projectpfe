// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiHZ2VnxNJjlpT4XxB-e4NSHMGWKXxTUE",
  authDomain: "acess-control-24da4.firebaseapp.com",
  projectId: "acess-control-24da4",
  storageBucket: "acess-control-24da4.appspot.com",
  messagingSenderId: "527692391123",
  appId: "1:527692391123:web:bc3814443dd067bbb4ea26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)