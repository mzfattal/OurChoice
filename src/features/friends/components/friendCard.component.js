import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import {
  borderRadius,
  lightTextColor,
  mainColor,
  secColor,
  secTextColor,
  fonts,
} from "../../../../constants";

export const FriendCard = () => {
  const [selected, setSelected] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Image
          source={{ uri: "https://picsum.photos/200" }}
          style={styles.image}
        />
        <TouchableOpacity
          onPress={() => setSelected((prev) => !prev)}
          style={[styles.addButton, selected && { backgroundColor: "#FFFFFF" }]}
        >
          <Text style={[styles.addButtonText, selected && { color: secColor }]}>
            Invite
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lowerContainer}>
        <Text style={styles.username}>Name Surname</Text>
        <Text style={styles.userData}>Some Data</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "48%",
    borderRadius: borderRadius,
    paddingHorizontal: 16,
    backgroundColor: mainColor,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: "black",
  },
  upperContainer: {
    alignItems: "center",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  addButton: {
    backgroundColor: secColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30 / 2,
    height: 30,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: secColor,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontFamily: fonts[700],
    fontSize: 14,
    fontWeight: "500",
  },
  lowerContainer: {
    marginVertical: 16,
  },
  username: {
    fontFamily: fonts[900],
    fontSize: 16,
  },
  userData: {
    marginTop: 4,
    color: lightTextColor,
    fontFamily: fonts[700],
    fontSize: 13,
  },
});
