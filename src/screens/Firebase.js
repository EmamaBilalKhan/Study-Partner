// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkHMreMb8LItc-ak3zmlwIGwVC-SED-vc",
  authDomain: "studypartner-1b580.firebaseapp.com",
  projectId: "studypartner-1b580",
  storageBucket: "studypartner-1b580.appspot.com",
  messagingSenderId: "545519645208",
  appId: "1:545519645208:web:07ada106eb2b825211496d",
  measurementId: "G-C23ZLBBVM5"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const my_auth=getAuth(app);