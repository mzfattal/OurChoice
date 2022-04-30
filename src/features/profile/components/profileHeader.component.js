import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
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

export const ProfileHeader = () => {
  const { currentProfile } = useContext(FriendsContext);
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://picsum.photos/200" }}
        style={styles.image}
      />
      <Text style={styles.mainText}>{currentProfile?.name}</Text>
      <Text style={styles.secText}>{currentProfile?.email}</Text>
      <TouchableOpacity
        style={styles.editProfileButton}
        onPress={() => auth.signOut()}
      >
        <Text style={styles.editProfileButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColor,
    marginHorizontal: horizontalMargin,
    padding: horizontalMargin,
    borderRadius: borderRadius,
    justifyContent: "center",
    alignItems: "center",
  },
  editProfileButton: {
    marginTop: marginTop,
    backgroundColor: secColor,
    height: 35,
    borderRadius: 45 / 2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  editProfileButtonText: {
    fontSize: 15,
    fontFamily: fonts[600],
    color: "#FFFFFF",
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
  },
  mainText: {
    marginTop: marginTop,
    fontSize: 18,
    fontFamily: fonts[600],
  },
  secText: {
    fontSize: 15,
    color: secTextColor,
    fontFamily: fonts[600],
  },
});
