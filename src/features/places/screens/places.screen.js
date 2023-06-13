import React, { useEffect, useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
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

export const PlacesScreen = ({ navigation }) => {
  const { places, loading, fetchPlaces, sessionStarted } =
    useContext(PlacesContext);
  const { requestLocation, location } = useContext(AuthenticationContext);

  useEffect(() => {
    if (Object.keys(location).length === 0) {
      requestLocation();
    }
  }, []);

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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Logo size={30} color={secColor} />
        <Text
          style={{
            color: secColor,
            fontFamily: fonts[1900],
            fontSize: 16,
            marginLeft: horizontalMargin / 2,
          }}
        >
          Our Choice
        </Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Confirmed")}>
        <Ionicons name="checkmark-done" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );

  const renderFloatingChoicesButton = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Confirmed")}
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          zIndex: 5,
          height: 80,
          width: 80,
          borderRadius: 80 / 2,
          backgroundColor: secColor,
          justifyContent: "center",
          alignItems: "center",
          opacity: 1,
        }}
      >
        <Ionicons name="checkmark-done" size={30} color="#FFF" />
      </TouchableOpacity>
    );
  };

  const renderResturantAlias = () => {
    // const thsss = [1,2,3]
    const data = ["pizza", "pasta", "drink"];
    return (
      <View
        style={{ height: 100, alignSelf: "stretch", backgroundColor: "red" }}
      >
        <FlatList
          data={data}
          renderItem={(item) => (
            <View
              style={{
                height: 80,
                width: 80,
                borderRadius: 80 / 2,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: secColor,
              }}
            >
              <Text>{item}</Text>
            </View>
          )}
          keyExtractor={(item) => item}
        />
      </View>
    );
  };

  if (loading) return <View />;

  if (sessionStarted)
    return (
      <>
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: StatusBar.currentHeight,
            backgroundColor: "#FFFFFF",
          }}
        >
          {renderFloatingChoicesButton()}
          {/* {renderResturantAlias()} */}
          <FlatList
            data={places}
            renderItem={(place) => <Card place={place} swipeable={true} />}
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
