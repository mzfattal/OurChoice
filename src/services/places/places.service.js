import React, { useEffect, createContext, useState, useContext } from "react";
import { Alert } from "react-native";
import axios from "axios";
import { auth } from "../../../firebase";

export const PlacesContext = createContext();

export const PlacesContextProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [confirmedPlace, setConfirmedPlace] = useState([]);
  const [deniedPlace, setDeniedPlace] = useState([]);

  const clearPlaces = () => {
    setPlaces([]);
  };

  const addConfirmedPlace = (place) => {
    setPlaces((prev) => prev.filter((curPlace) => curPlace.id !== place.id));
    setConfirmedPlace((prev) => [...prev, place]);
  };

  const addDeniedPlace = (place) => {
    setPlaces((prev) => prev.filter((curPlace) => curPlace.id !== place.id));
    setDeniedPlace((prev) => [...prev, place]);
  };

  const fetchPlaces = async () => {
    if (places.length > 0) return;
    setIsLoading(true);
    await axios
      .get(`http://192.168.2.14:3000/businessSearch`)
      .then((res) => setPlaces(res?.data?.businesses))
      .catch(() => Alert.alert("Oops!", "Error getting places."));
    setIsLoading(false);
  };

  //   useEffect(() => {
  //     fetchFriends();
  //     fetchFriendRequests();
  //   }, [user]);

  return (
    <PlacesContext.Provider
      value={{
        isLoading,
        error,
        fetchPlaces,
        places,
        clearPlaces,
        addConfirmedPlace,
        addDeniedPlace,
        confirmedPlace,
        deniedPlace,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
