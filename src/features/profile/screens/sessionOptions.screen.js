import React, { useState, useContext, useEffect } from "react";
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
  borderRadius,
  fonts,
  horizontalMargin,
  mainColor,
  marginTop,
  secColor,
  secTextColor,
} from "../../../../constants";
import { TextInput } from "react-native-paper";
import { FriendsContext } from "../../../services/friends/friends.context";
import { Selectable } from "../../../components/Selectable";

const optionsList = [
  {
    title: "Open Status",
    selected: "Open",
    options: ["Open", "None"],
  },
  {
    title: "headersss",
    selected: "thaat",
    options: ["thiaaas", "thaat"],
  },
  {
    title: "ff",
    selected: "asdfmas",
    options: ["asdfmas", "asdf"],
  },
];

export const sessionOptions = ({ navigation }) => {
  const { currentProfile } = useContext(FriendsContext);

  const [profile, setProfile] = useState({});

  useEffect(
    () =>
      setProfile({
        name: currentProfile?.name,
        email: currentProfile?.email,
        picture: "",
      }),
    []
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
          <Text style={styles.sectionHeader}>Location</Text>
          {optionsList.map((item) => (
            <Selectable
              data={item.options}
              title={item.title}
              selected={item.selected}
              contianerStyle={styles.selectableContainerStyle}
            />
          ))}
          <Text style={styles.sectionHeader}>Preferences</Text>
          {optionsList.map((item) => (
            <Selectable
              data={item.options}
              title={item.title}
              selected={item.selected}
              contianerStyle={styles.selectableContainerStyle}
            />
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
  sectionHeader: {
    fontFamily: fonts[1700],
    fontSize: 20,
    marginTop: horizontalMargin,
  },
  selectableContainerStyle: {
    marginTop: horizontalMargin / 2,
    borderBottomWidth: 1,
    borderBottomColor: mainColor,
    paddingBottom: horizontalMargin,
    borderRadius: 10,
  },
});
