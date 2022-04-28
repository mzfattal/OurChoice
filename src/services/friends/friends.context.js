import React, { useEffect, createContext, useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import { auth } from "../../../firebase";

export const FriendsContext = createContext();

export const FriendsContextProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFriendRequests = async () => {
    setIsLoading(true);
    await axios
      .get(
        `http://192.168.1.121:3000/friendRequest/${auth?.currentUser?.email}`
      )
      .then((res) => setFriendRequests(res?.data))
      .catch(() => Alert.alert("Oops!", "Error getting friends."));
    setIsLoading(false);
  };

  const fetchFriends = async () => {
    setIsLoading(true);
    await axios
      .get(`http://192.168.1.121:3000/user/email/${auth?.currentUser?.email}`)
      .then((res) => setFriends(res?.data?.[0]?.friends))
      .catch(() => Alert.alert("Oops!", "Error getting friends."));
    setIsLoading(false);
  };

  const addFriend = async (email) => {
    let validEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (validEmail.test(email)) {
      await axios
        .post(`http://192.168.1.121:3000/friendRequest`, {
          requester: auth?.currentUser?.email,
          recipient: email,
        })
        .then(() => {
          Alert.alert("Added", "Friend request sent!");
        })
        .catch((err) => {
          Alert.alert(
            "Oops!",
            err.response.status === 404
              ? `${err.response.data}: ${email}`
              : err.response.data
          );
        });
    } else if (email === "") {
      Alert.alert("Oops!", `Add a user by their Email`);
    } else {
      Alert.alert("Oops!", `trying to add ${email}? Try using their Email`);
    }
  };

  useEffect(() => {
    fetchFriends();
    fetchFriendRequests();
  }, []);

  return (
    <FriendsContext.Provider
      value={{
        friends,
        friendRequests,
        isLoading,
        error,
        addFriend,
        fetchFriendRequests,
        fetchFriends,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};
