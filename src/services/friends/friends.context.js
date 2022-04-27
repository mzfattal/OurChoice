import React, { useEffect, createContext, useState } from "react";
import { auth } from "../../../firebase";

export const FriendsContext = createContext();

export const FriendsContextProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const retrieveFriends = () => {
    setIsLoading(true);
    setFriends([1, 2, 3]);
    setIsLoading(false);
  };

  useEffect(() => {
    retrieveFriends();
  }, []);

  return (
    <FriendsContext.Provider value={{ friends, isLoading, error }}>
      {children}
    </FriendsContext.Provider>
  );
};
