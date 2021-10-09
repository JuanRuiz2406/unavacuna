import firebase from "firebase/app";
import "firebase/auth";

const FirebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID,
};

export default function InitFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseConfig);
  }
}
