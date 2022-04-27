import React, { useEffect, createContext, useState } from "react";
import { loginRequest } from "./authentication.service";
import * as firebase from "firebase";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  firebase.auth().onAuthStateChanged((userRes) => {
    if (userRes) {
      setUser(userRes);
    } else {
      console.warn("no one logged in");
      // No user is signed in.
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
        console.warn("here");
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e);
        console.warn(e.message);
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated: !!user, user, isLoading, error, onLogin }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
