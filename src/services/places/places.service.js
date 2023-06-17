import React, { useEffect, createContext, useState, useContext } from "react";
import { Alert } from "react-native";
import axios from "axios";
import { filterListConstant } from "../../../constants";

export const PlacesContext = createContext();

export const PlacesContextProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [typeList, setTypeList] = useState([]);
  const [filterList, setFilterList] = useState(filterListConstant);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const [sessionStarted, setSessionStarted] = useState(false);

  const [confirmedPlace, setConfirmedPlace] = useState([]);
  const [deniedPlace, setDeniedPlace] = useState([]);

  const clearPlaces = () => {
    setPlaces([]);
    setFilteredPlaces([]);
  };

  const hasSelectedFilter = () => filterList.some((filter) => filter.selected);

  const addConfirmedPlace = (place) => {
    setPlaces((prev) => prev.filter((curPlace) => curPlace.id !== place.id));
    setFilteredPlaces((prev) =>
      prev.filter((curPlace) => curPlace.id !== place.id)
    );
    setConfirmedPlace((prev) => [...prev, place]);
  };

  const addDeniedPlace = (place) => {
    setPlaces((prev) => prev.filter((curPlace) => curPlace.id !== place.id));
    setFilteredPlaces((prev) =>
      prev.filter((curPlace) => curPlace.id !== place.id)
    );
    setDeniedPlace((prev) => [...prev, place]);
  };

  const filterPlace = (placesList) => {
    return filterListConstant.filter((places) =>
      places.slugs.some((slug) => placesList.includes(slug))
    );
  };

  const filterPlacesBySlugs = (places, filterList) => {
    return places.filter((place) => {
      const categories = place.categories.map((category) => category.alias);
      return filterList.some((filter) =>
        categories.some(
          (category) => filter.slugs.includes(category) && filter.selected
        )
      );
    });
  };

  useEffect(() => {
    const resultAfterFiltering = filterPlacesBySlugs(places, filterList);
    if (hasSelectedFilter()) {
      setFilteredPlaces(resultAfterFiltering);
    } else {
      setFilteredPlaces(places);
    }
  }, [filterList]);

  useEffect(() => console.log(filterList), [filterList]);

  const selectTypeFilter = (type) => {
    setFilterList((prev) =>
      prev.map(({ title, slugs, selected }) =>
        title === type
          ? { title, slugs: [...slugs], selected: !selected }
          : { title, slugs: [...slugs], selected }
      )
    );
  };

  const addToTypeList = (restaurantsList) => {
    const typeList = [...typeList];
    restaurantsList.forEach((curRes) => {
      const listOfCat = curRes?.categories;
      listOfCat.forEach((curCat) => {
        const eachCat = curCat?.alias;
        if (!typeList.includes(eachCat)) {
          typeList.push(eachCat);
        }
      });
    });

    const typesThatExist = filterPlace(typeList);
    setFilterList(typesThatExist);
  };

  const fetchPlaces = async (curProfile, location) => {
    if (places.length > 0) return;

    const radius = curProfile.radius * 1000 || 10000;
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
        setPlaces(res?.data?.businesses);
        setFilteredPlaces(res?.data?.businesses);
        addToTypeList(res?.data?.businesses);
        setSessionStarted(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        Alert.alert("Oops!", `Error getting places: ${err}`);
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
        places: filteredPlaces,
        clearPlaces,
        addConfirmedPlace,
        addDeniedPlace,
        confirmedPlace,
        deniedPlace,
        sessionStarted,
        setSessionStarted,
        filterList,
        selectTypeFilter,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
