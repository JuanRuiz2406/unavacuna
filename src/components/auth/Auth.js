import React, { useEffect } from "react";
import router from "next/router";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../../firebase/FirebaseConfig";

initFirebase();
const auth = firebase.auth();

const Auth = (Component) => (props) => {
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        router.push("/login");
      }
    });
  }, []);

  return (
    <div>
      <Component {...props} />
    </div>
  );
};

export default Auth;
