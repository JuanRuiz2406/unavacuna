import { initializeApp, getApps } from "firebase/app";
//import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import FirebaseConfig from "./Config";

class Firebase {
  constructor() {
    let app;

    if (!getApps().length) {
      app = initializeApp(FirebaseConfig);
    }
    this.auth = getAuth(app);
  }

  async adminRegister(name, email, password) {
    await createUserWithEmailAndPassword(this.auth, email, password);

    await updateProfile(this.auth.currentUser, {
      displayName: name,
    });
  }

  async login(email, password) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout() {
    await signOut(this.auth);
  }
}

const FirebaseInit = new Firebase();

export default FirebaseInit;
