import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Button,
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
import { auth } from "../../../../firebase";
import { ProfileHeader } from "../components/profileHeader.component";
import { Ionicons } from "@expo/vector-icons";

export const ProfileScreen = () => {
  const settingsList = [
    {
      text: "Profile",
      icon: "person-outline",
      onPress: () => console.warn("profile"),
    },
    {
      text: "Settings",
      icon: "settings-outline",
      onPress: () => console.warn("settings"),
    },
    {
      text: "Q&A",
      icon: "book-outline",
      onPress: () => console.warn("qa"),
    },
  ];

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
            text={"Profile".toUpperCase()}
            subtext={"Connect with friends".toUpperCase()}
          />
          <ProfileHeader />
          {settingsList.map((item) => (
            <TouchableOpacity
              onPress={() => item.onPress()}
              style={{
                height: 65,
                alignItems: "center",
                flexDirection: "row",
                marginHorizontal: marginTop,
                justifyContent: "space-between",
                borderBottomColor: mainColor,
                borderBottomWidth: 1,
                borderRadius: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name={item.icon} size={25} color={"#000"} />
                <Text
                  style={{ marginLeft: marginTop, fontFamily: fonts[1700] }}
                >
                  {item.text}
                </Text>
              </View>
              <Ionicons
                name={"chevron-forward-outline"}
                size={28}
                color={"#000"}
              />
            </TouchableOpacity>
          ))}
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
});
