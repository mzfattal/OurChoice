import React, { useEffect, createContext, useState, useContext } from "react";
import { createAccountRequest, loginRequest } from "./authentication.service";
import * as firebase from "firebase";
import { Alert } from "react-native";
import axios from "axios";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [onboardingDone, setOnboardingDone] = useState(false);

  firebase.auth().onAuthStateChanged((resUser) => {
    if (resUser) {
      setUser(resUser);
    } else {
      setUser(null);
    }
  });

  const finishOnboarding = (profileData) => {
    setOnboardingDone(true);
  };

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((resUser) => {
        setUser(resUser);
        setIsLoading(false);
      })
      .catch((resError) => {
        setIsLoading(false);
        Alert.alert("Oops!", "Login failed");
        setError(resError);
      });
  };

  const onCreate = async (email, password, username, picture) => {
    setIsLoading(true);
    createAccountRequest(email, password)
      .then(async (userCredential) => {
        await axios
          .post("http://192.168.2.14:3000/register", {
            uid: userCredential.uid,
            name: username,
            email: email,
          })
          .then(() => setUser(userCredential.user))
          .catch(() =>
            Alert.alert(
              "Oops!",
              "Profile Created, but had issue settings profile attributes"
            )
          );
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        Alert.alert(
          "Oops!",
          "Error occured trying to create your account. Try again later."
        );
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
        onboardingDone,
        finishOnboarding,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
