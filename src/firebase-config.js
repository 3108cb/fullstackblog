// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCkPcFemRf8OtK37GqEVluYi-JSS4jFdYc",

  authDomain: "blog-react-42d94.firebaseapp.com",

  projectId: "blog-react-42d94",

  storageBucket: "blog-react-42d94.appspot.com",

  messagingSenderId: "404178902760",

  appId: "1:404178902760:web:fc80b4b94545cc858d735d"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();