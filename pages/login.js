import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../src/firebase/FirebaseConfig";
import { setUserCookie } from "../src/helpers/UserCookie";
import { mapUserData } from "../src/components/hooks/UseUser";

initFirebase();
const firebaseAuthConfig = ({ signInSuccessUrl }) => ({
  signInFlow: "popup",
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl,
  credentialHelper: "none",
  callbacks: {
    signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
      const userData = await mapUserData(user);
      setUserCookie(userData);
    },
  },
});

const FirebaseAuth = () => {
  const signInSuccessUrl = "/vaccine";
  return (
    <div>
      <StyledFirebaseAuth
        uiConfig={firebaseAuthConfig({ signInSuccessUrl })}
        firebaseAuth={firebase.auth()}
        signInSuccessUrl={signInSuccessUrl}
      />
    </div>
  );
};

export default FirebaseAuth;
