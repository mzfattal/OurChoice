import React, { useState } from "react";
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
  borderRadius,
  fonts,
  horizontalMargin,
  mainColor,
  marginTop,
  secColor,
  secTextColor,
} from "../../../../constants";
import { TabHeader } from "../../../components/tabHeader";
import { auth } from "../../../../firebase";
import { ProfileHeader } from "../components/profileHeader.component";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export const FavoritesScreen = ({ navigation }) => {
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
            text={"Favorites".toUpperCase()}
            subtext={"Save the places".toUpperCase()}
          />
          <View style={styles.innerContainer}>
            <View style={styles.imageContainer}>
              <MaterialIcons name="favorite" size={100} color={secColor} />
            </View>
            <Text style={styles.header}>No Favorites</Text>
            <Text style={styles.subHeader}>
              Heart restaurants to save a list of your favorites
            </Text>
          </View>
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
  signOutButtonContainer: {
    marginTop: marginTop,
    backgroundColor: secColor,
    height: 45,
    marginHorizontal: "25%",
    borderRadius: 45 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  signOutButtonText: {
    fontSize: 20,
    fontFamily: fonts[700],
    color: "#FFFFFF",
  },
  settingsListItemContainer: {
    height: 65,
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: marginTop,
    justifyContent: "space-between",
    borderBottomColor: mainColor,
    borderBottomWidth: 1,
    borderRadius: 10,
  },
  giveFeedbackContainer: {
    backgroundColor: mainColor,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: horizontalMargin,
    marginHorizontal: horizontalMargin,
    marginBottom: horizontalMargin,
    borderRadius: borderRadius,
    height: 100,
  },

  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
  },
  header: {
    fontFamily: fonts[900],
    fontSize: 25,
  },
  subHeader: {
    width: "70%",
    textAlign: "center",
    fontFamily: fonts[600],
    color: secTextColor,
    fontSize: 17,
  },
  button: {
    marginTop: marginTop,
    height: 50,
    backgroundColor: secColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50 / 2,
    paddingHorizontal: 50,
  },
  secButton: {
    marginTop: marginTop,
    height: 50,
    borderColor: secColor,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50 / 2,
    paddingHorizontal: 50,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: fonts[1600],
  },
  secButtonText: {
    color: secColor,
    fontSize: 15,
    fontFamily: fonts[1600],
  },
});
