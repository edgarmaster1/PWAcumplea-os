import firebase from "firebase/compat/app";


import 'firebase/compat/firestore' 

const firebaseConfig = {
  apiKey: "AIzaSyBc1DI2koL5QJ0eTyPSrRnyPgqA9Sx6rDk",
  authDomain: "appwpa-aa5f2.firebaseapp.com",
  projectId: "appwpa-aa5f2",
  storageBucket: "appwpa-aa5f2.appspot.com",
  messagingSenderId: "152187376102",
  appId: "1:152187376102:web:9b773303248d9624fb4627"
};


const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore()