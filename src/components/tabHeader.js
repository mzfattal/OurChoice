import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { fonts, marginTop, secColor, secTextColor } from "../../constants";
import Logo from "./Logo";

export const TabHeader = ({ text, subtext, showLogo = false }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{text}</Text>
        {subtext && <Text style={styles.subtext}>{subtext}</Text>}
      </View>

      {showLogo && <Logo color={secColor} size={30} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: fonts[900],
    fontSize: 30,
  },
  subtext: {
    marginBottom: marginTop,
    color: secTextColor,
    fontWeight: "bold",
    fontSize: 12,
  },
});
