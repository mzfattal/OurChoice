import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  borderRadius,
  horizontalMargin,
  mainColor,
  secColor,
  secTextColor,
  fonts,
} from "../../../../constants";

export const EmptyFriends = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../../assets/illustrations/no-friends.png")}
          resizeMode="contain"
          style={{ height: 200, width: 200 }}
        />
      </View>
      <Text style={styles.header}>Create Your Cricle</Text>
      <Text style={styles.subHeader}>Invite your friends and ...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 175,
    width: 200,
  },
  header: {
    fontFamily: fonts[900],
    fontSize: 25,
  },
  subHeader: {
    fontFamily: fonts[600],
    color: secTextColor,
    fontSize: 17,
  },
});
