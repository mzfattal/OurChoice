import { Ionicons } from "@expo/vector-icons";
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
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: "https://picsum.photos/200" }}
          style={styles.image}
        />
        <View
          style={{
            justifyContent: "space-evenly",
            marginLeft: 16,
          }}
        >
          <Text
            style={styles.mainText}
          >{`Welcome, ${currentProfile?.name}`}</Text>
          <Text style={styles.secText}>{currentProfile?.email}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.editProfileButton}
        onPress={() => auth.signOut()}
      >
        <Ionicons name={"log-out-outline"} size={28} color={"#000"} />
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
    // marginTop: marginTop,
    // backgroundColor: secColor,
    // height: 35,
    // borderRadius: 45 / 2,
    // justifyContent: "center",
    // alignItems: "center",
    // alignSelf: "stretch",

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
    fontSize: 16,
    color: secTextColor,
    fontFamily: fonts[1700],
  },
});
