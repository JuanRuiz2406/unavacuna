import { useContext } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import FirebaseContext from "../firebase/FirebaseContext";
import { FirebaseAuthConfig } from "../firebase/FirebaseAuthConfig";
import { Layout } from "./../components/layout/Layout";

import { css } from "@emotion/react";

const FirebaseAuth = () => {
  const { user, auth } = useContext(FirebaseContext);
  const signInSuccessUrl = "/";
  return (
    <Layout>
      <div
        css={css`
          margin: 4rem;
        `}
      >
        <StyledFirebaseAuth
          uiConfig={FirebaseAuthConfig({
            signInSuccessUrl,
            disableReg: user ? false : true,
          })}
          firebaseAuth={auth}
          signInSuccessUrl={signInSuccessUrl}
        />
      </div>
    </Layout>
  );
};

export default FirebaseAuth;
