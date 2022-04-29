import React, { useEffect, createContext, useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import { auth } from "../../../firebase";

export const GroupContext = createContext();

export const GroupContextProvider = ({ children }) => {
  const [group, setGroup] = useState(["", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToGroup = (addedUser) => {
    setGroup((prev) => [...prev, addedUser]);
  };
  const clearGroup = () => {
    setGroup([]);
  };

  return (
    <GroupContext.Provider
      value={{
        group,
        isLoading,
        error,
        clearGroup,
        addToGroup,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};
