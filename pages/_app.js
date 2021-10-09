import "../styles/globals.css";

import { UseUser } from "../hooks/UseUser";

import initFirebase from "../firebase/FirebaseConfig";
import FirebaseContext from "../firebase/FirebaseContext";
import firebase from "firebase/app";
import "firebase/auth";

initFirebase();

function MyApp({ Component, pageProps }) {
  const { user, logout } = UseUser();
  const auth = firebase.auth();
  return (
    <FirebaseContext.Provider
      value={{
        user,
        auth,
        logout,
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}

export default MyApp;
