import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgc0F0iC2Jwk5sSDc4MRaot8zXjT0bxW0",
  authDomain: "unavacuna-database.firebaseapp.com",
  databaseURL: "https://unavacuna-database-default-rtdb.firebaseio.com",
  projectId: "unavacuna-database",
  storageBucket: "unavacuna-database.appspot.com",
  messagingSenderId: "1085610652750",
  appId: "1:1085610652750:web:d4dfb64eb29c1ce6d8ff1f",
  measurementId: "G-VSFHEFYEDZ",
};

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}