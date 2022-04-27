import React, { useContext } from "react";
import { AuthenticationContext } from "../services/profile/authentication.context";
import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";

export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  return isAuthenticated ? <AppNavigator /> : <AccountNavigator />;
};
