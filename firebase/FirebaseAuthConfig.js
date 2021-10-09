import firebase from "firebase/app";
import "firebase/auth";

import { MapUserData } from "../helpers/MapUserData";
import { SetUserCookie } from "../helpers/UserCookie";

export const FirebaseAuthConfig = ({
  signInSuccessUrl,
  disableReg = true,
}) => ({
  
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      disableSignUp: {
        status: disableReg,
        adminEmail: "soporte@unavaquita.cr",
        helpLink: "https://elvinlab.github.io/profile/",
      },
      requireDisplayName: true,
    },
  ],
  signInSuccessUrl,
  credentialHelper: "none",
  callbacks: {
    signInSuccessWithAuthResult: async ({ user }) => {
      const userData = await MapUserData(user);
      SetUserCookie(userData);
    },
  },
});
