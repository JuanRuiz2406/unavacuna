import firebase from 'firebase/app'
// the below imports are option - comment out what you don't need
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/analytics'
import 'firebase/performance'

const clientCredentials = {
    apiKey: "AIzaSyDgc0F0iC2Jwk5sSDc4MRaot8zXjT0bxW0",
    authDomain: "unavacuna-database.firebaseapp.com",
    databaseURL: "https://unavacuna-database-default-rtdb.firebaseio.com",
    projectId: "unavacuna-database",
    storageBucket: "unavacuna-database.appspot.com",
    messagingSenderId: "1085610652750",
    appId: "1:1085610652750:web:d4dfb64eb29c1ce6d8ff1f",
    measurementId: "G-VSFHEFYEDZ"
}

export default function initFirebase() {
    if (!firebase.apps.length) {
        firebase.initializeApp(clientCredentials)
        // Check that `window` is in scope for the analytics module!
        if (typeof window !== 'undefined') {
            // Enable analytics. https://firebase.google.com/docs/analytics/get-started
            if ('measurementId' in clientCredentials) {
                firebase.analytics()
                firebase.performance()
            }
        }
        console.log('Firebase was successfully init.')
    }
}