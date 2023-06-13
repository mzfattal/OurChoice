import React, { useEffect, createContext, useState, useContext } from "react";
import { Alert } from "react-native";
import axios from "axios";

export const PlacesContext = createContext();

export const PlacesContextProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [sessionStarted, setSessionStarted] = useState(false);

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

  const fetchPlaces = async (curProfile, location) => {
    if (places.length > 0) return;

    const radius = 10000;
    const openPref = curProfile?.openStatus || "All";
    const pricePref = curProfile?.price || "None";
    const longitude = location?.longitude;
    const latitude = location?.latitude;
    //businessSearch/5000/""/Open/43.233424/-79.697151
    const path = `http://mutazbackend-production.up.railway.app/businessSearch/${radius}/${pricePref}/${openPref}/${latitude}/${longitude}`;

    setIsLoading(true);
    await axios
      .get(path)
      .then((res) => {
        setIsLoading(false);
        setPlaces(res?.data?.businesses);
        setSessionStarted(true);
      })
      .catch((err) => {
        console.warn(err);
        setIsLoading(false);
        Alert.alert("Oops!", "Error getting places.");
      });
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
        sessionStarted,
        setSessionStarted,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
