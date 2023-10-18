import { Ionicons } from "@expo/vector-icons";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  borderRadius,
  fonts,
  horizontalMargin,
  mainColor,
  marginTop,
  secColor,
  secTextColor,
} from "../../../../constants";

import { auth } from "../../../../firebase";
import { FriendsContext } from "../../../services/friends/friends.context";
import { GroupContext } from "../../../services/group/group.context";
import { AuthenticationContext } from "../../../services/profile/authentication.context";

export const ProfileHeader = ({email}) => {
  const { currentProfile, clearFriends } = useContext(FriendsContext);
  const { clearGroup } = useContext(GroupContext);

  const handleLougout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => {
          clearFriends();
          clearGroup();
          auth.signOut();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* <View style={{ flexDirection: "row" }}> */}
        {/* <Image
          source={{ uri: "https://picsum.photos/200" }}
          style={styles.image}
        /> */}
        <View
          style={{
            justifyContent: "space-evenly",
            marginLeft: 16,
          }}
        >
          <Text
            style={styles.mainText}
          >{`Welcome, ${currentProfile?.name}`}</Text>
          <Text style={styles.secText}>{email}</Text>
        </View>
      {/* </View> */}
      <TouchableOpacity
        style={styles.editProfileButton}
        onPress={() => handleLougout()}
      >
        <Ionicons name={"log-out-outline"} size={20} color={"#FFFFFF"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: "row",
    paddingVertical: marginTop,
    borderTopColor: mainColor,
    borderTopWidth: 1,
    borderBottomColor: mainColor,
    borderBottomWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  editProfileButton: {
    backgroundColor: secColor,
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: marginTop,
  },
  editProfileButtonText: {
    fontSize: 15,
    fontFamily: fonts[600],
    color: "#FFFFFF",
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
  },
  mainText: {
    fontSize: 12,
    color: "gray",
    fontFamily: fonts[1600],
  },
  secText: {
    marginTop: horizontalMargin /2,
    fontSize: 16,
    color: secTextColor,
    fontFamily: fonts[1700],
  },
});
