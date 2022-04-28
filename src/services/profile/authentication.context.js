import React, { useEffect, createContext, useState } from "react";
import { createAccountRequest, loginRequest } from "./authentication.service";
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
      setUser(null);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e);
      });
  };

  const onCreate = (email, password, username) => {
    setIsLoading(true);
    createAccountRequest(email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e);
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onCreate,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
