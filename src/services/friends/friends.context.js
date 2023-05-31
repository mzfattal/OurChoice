import React, { useEffect, createContext, useState, useContext } from "react";
import { Alert } from "react-native";
import axios from "axios";
import { auth } from "../../../firebase";
import { AuthenticationContext } from "../profile/authentication.context";

export const FriendsContext = createContext();

export const FriendsContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);

  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentProfile, setCurrentProfile] = useState({});
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [favorites, setFavorites] = useState([]);

  const clearFriends = () => {
    setFriends([]);
    setFriendRequests([]);
    setCurrentProfile({});
    setUpdatedProfile({});
  };

  const updateProfile = (updateAttribute, data) => {
    setUpdatedProfile((prev) => ({
      ...prev,
      [updateAttribute]: data,
    }));
  };

  const submitUpdateProfile = async () => {
    setCurrentProfile(updatedProfile);
    await axios
      .post(
        `http://192.168.2.14:3000/updateProfile/${auth?.currentUser?.email}`,
        {
          update: updatedProfile,
        }
      )
      .then((res) => console.warn(res?.data))
      .catch(() => Alert.alert("Oops!", "Couldnt Update Profile"));
  };

  const handleLikePlace = async (liked, place) => {
    console.warn("place", liked);
    if (liked) {
      setFavorites((prev) => [...prev, place]);
    } else {
      setFavorites((prev) => prev.filter((curPlace) => curPlace !== place));
    }
    await axios
      .post(`http://192.168.2.14:3000/favorite/${liked}`, {
        place: place,
        email: currentProfile?.email,
      })
      .then((res) => console.warn(res?.data))
      .catch(() => Alert.alert("Oops!", "Couldnt Update Favorites"));
  };

  const fetchFriendRequests = async () => {
    setIsLoading(true);
    await axios
      .get(`http://192.168.2.14:3000/friendRequest/${auth?.currentUser?.email}`)
      .then((res) => setFriendRequests(res?.data))
      .catch(() => Alert.alert("Oops!", "Error getting friends."));
    setIsLoading(false);
  };

  const fetchFriends = async () => {
    setIsLoading(true);
    await axios
      .get(`http://192.168.2.14:3000/user/email/${auth?.currentUser?.email}`)
      .then((res) => {
        console.warn("here", res?.data?.[0]);
        setCurrentProfile(res?.data?.[0]);
        setUpdatedProfile(res?.data?.[0]);
        return res;
      })
      .then((res) => {
        setFriends(res?.data?.[0]?.friends);
      })
      .catch(() => Alert.alert("Oops!", "Error getting friends."));
    setIsLoading(false);
  };

  const addUser = async (email) => {
    const tempUser = friendRequests.filter((curUser) => {
      return curUser?.requester === email;
    });
    setFriendRequests((prev) =>
      prev.filter((curUser) => curUser?.requester !== email)
    );

    await axios
      .post(`http://192.168.2.14:3000/friendRequest/yes`, {
        recipient: auth?.currentUser?.email,
        requester: email,
      })
      .then(() => {
        fetchFriends();
      })
      .catch(() => {
        setFriendRequests((prev) => [tempUser[0], ...prev]);
        Alert.alert("Oops!", "Error accepting request");
      });
  };

  const denyUser = async (email) => {
    const tempUser = friendRequests.filter((curUser) => {
      return curUser?.requester === email;
    });
    setFriendRequests((prev) =>
      prev.filter((curUser) => curUser?.requester !== email)
    );

    await axios
      .post(`http://192.168.2.14:3000/friendRequest/no`, {
        recipient: auth?.currentUser?.email,
        requester: email,
      })

      .then(() => {
        fetchFriends();
      })
      .catch(() => {
        setFriendRequests((prev) => [tempUser[0], ...prev]);
        Alert.alert("Oops!", "Error Denying request");
      });
  };

  const addFriend = async (email) => {
    let validEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (validEmail.test(email)) {
      await axios
        .post(`http://192.168.2.14:3000/friendRequest`, {
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

  const resetUpdateProfile = () => setUpdatedProfile(currentProfile);

  useEffect(() => {
    fetchFriends();
    fetchFriendRequests();
  }, [user]);

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
        addUser,
        denyUser,
        currentProfile,
        clearFriends,
        updateProfile,
        submitUpdateProfile,
        updatedProfile,
        resetUpdateProfile,
        handleLikePlace,
        favorites,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};
