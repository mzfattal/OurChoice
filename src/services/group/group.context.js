import React, { useEffect, createContext, useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import { auth } from "../../../firebase";

export const GroupContext = createContext();

export const GroupContextProvider = ({ children }) => {
  const [group, setGroup] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearGroup = () => {
    setGroup([]);
  };

  const addToGroup = (addedUser) => {
    if (group.length === 4) {
      Alert.alert("Group Limit", "A group can consist of 4 users maximum");
      return;
    }
    setGroup((prev) => [...prev, addedUser]);
  };

  const removeFromGroup = (removedUser) => {
    setGroup((prev) =>
      prev.filter((curUser) => curUser?.email !== removedUser?.email)
    );
  };

  return (
    <GroupContext.Provider
      value={{
        group,
        isLoading,
        error,
        clearGroup,
        addToGroup,
        removeFromGroup,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};
