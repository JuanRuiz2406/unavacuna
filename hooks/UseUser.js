import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/auth";
import {
  RemoveUserCookie,
  SetUserCookie,
  GetUserFromCookie,
} from "../helpers/UserCookie.js";

import { MapUserData } from "../helpers/MapUserData.js";

const UseUser = () => {
  const [user, setUser] = useState();
  const router = useRouter();

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        router.push("/");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    const cancelAuthListener = firebase
      .auth()
      .onIdTokenChanged(async (userToken) => {
        if (userToken) {
          const userData = await MapUserData(userToken);
          SetUserCookie(userData);
          setUser(userData);
        } else {
          RemoveUserCookie();
          setUser();
        }
      });

    const userFromCookie = GetUserFromCookie();
    if (!userFromCookie) {
      return;
    }
    setUser(userFromCookie);
    return () => cancelAuthListener;
  }, []);

  return { user, logout };
};

export { UseUser };
