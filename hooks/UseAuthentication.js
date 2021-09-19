import React, { useEffect, useState } from "react";
import FirebaseInit from "./../firebase/Index";
import { onAuthStateChanged } from "firebase/auth";

export const UseAuthentication = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FirebaseInit.auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  });

  return user;
};
