import "../styles/globals.css";
import FirebaseInit, { FirebaseContext } from "./../firebase/Index";
import { UseAuthentication } from "../hooks/UseAuthentication";

function MyApp({ Component, pageProps }) {
  const user = UseAuthentication();

  return (
    <FirebaseContext.Provider
      value={{
        FirebaseInit,
        user,
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}

export default MyApp;
