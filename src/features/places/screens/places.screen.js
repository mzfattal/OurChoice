import React, { useEffect, useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import { Searchbar } from "react-native-paper";
import {
  fonts,
  horizontalMargin,
  mainColor,
  marginTop,
  secColor,
  secTextColor,
} from "../../../../constants";
import { TabHeader } from "../../../components/tabHeader";
import { NoSession } from "../components/noSession.component";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";

import { PlacesContext } from "../../../services/places/places.service";
import { AuthenticationContext } from "../../../services/profile/authentication.context";
import Logo from "../../../components/Logo";

const Dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const PlacesScreen = ({ navigation }) => {
  const { places, loading, fetchPlaces } = useContext(PlacesContext);
  const { requestLocation, location } = useContext(AuthenticationContext);

  const topBar = () => (
    <View
      style={{
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: horizontalMargin,
        borderBottomColor: mainColor,
        borderBottomWidth: 1,
      }}
    >
      <Ionicons name="options-outline" size={30} color="black" />
      <Logo size={30} color={secColor} />
      <Ionicons
        name="checkmark-done"
        size={30}
        color="black"
        onPress={() => navigation.navigate("Confirmed")}
      />
    </View>
  );

  useEffect(() => {
    fetchPlaces();
  }, []);
  const sessionStarted = false;

  if (loading) return <View />;

  if (!sessionStarted)
    return (
      <>
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: StatusBar.currentHeight,
            backgroundColor: "#FFFFFF",
          }}
        >
          {topBar()}
          <FlatList
            data={places}
            renderItem={(place) => <Card place={place} />}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </>
    );

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: StatusBar.currentHeight,
          backgroundColor: "#FFFFFF",
        }}
      >
        <View style={styles.container}>
          <TabHeader
            text={"Restaurants".toUpperCase()}
            subtext={"Choose Your Craving".toUpperCase()}
          />
          <NoSession navigation={navigation} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: horizontalMargin,
  },
  searchBarContainer: {
    marginTop: marginTop,
  },
  searchBar: {
    marginTop: marginTop,
    height: 40,
    borderRadius: 40 / 2,
  },
  friendHeaderText: {
    color: secTextColor,
    fontWeight: "bold",
    fontSize: 12,
  },
  createHeaderText: {
    marginBottom: marginTop,
    color: secTextColor,
    fontWeight: "bold",
    fontSize: 12,
  },
  friendsContainer: {
    marginTop: marginTop,
    flex: 1,
  },
  listColumnStyle: {
    justifyContent: "space-between",
    marginTop: 10,
  },
});
