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

  const addFriend = (email) => {
    let validEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (validEmail.test(email)) {
      alert("added");
      // make request
    } else {
      alert("not valid email");
    }
  };

  useEffect(() => {
    retrieveFriends();
  }, []);

  return (
    <FriendsContext.Provider value={{ friends, isLoading, error, addFriend }}>
      {children}
    </FriendsContext.Provider>
  );
};
