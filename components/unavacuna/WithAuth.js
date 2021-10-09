import React, { useContext, useEffect } from "react";

import FirebaseContext from "../../firebase/FirebaseContext";
import router from "next/router";

const WithAuth = (Component) => (props) => {
  const { auth } = useContext(FirebaseContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        router.push("/signin");
      }
    });
  }, []);

  return (
    <div>
      <Component {...props} />
    </div>
  );
};

export default WithAuth;
