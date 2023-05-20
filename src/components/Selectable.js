import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  fonts,
  horizontalMargin,
  lightTextColor,
  mainColor,
  marginTop,
  secColor,
  secTextColor,
} from "../../constants";
import Logo from "./Logo";

export const Selectable = ({
  data,
  none = false,
  title,
  selected,
  contianerStyle,
}) => {
  return (
    <View style={[styles.container, contianerStyle]}>
      <Text style={{ color: lightTextColor, fontFamily: fonts[1300] }}>
        {title}
      </Text>
      <View style={{ flexDirection: "row", marginTop: horizontalMargin / 2 }}>
        {data.map((item) => (
          <View
            style={[
              {
                height: 30,
                borderRadius: 30 / 2,
                borderWidth: 2,
                borderColor: secColor,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: horizontalMargin,
                marginRight: horizontalMargin / 2,
              },
              selected === item && {
                backgroundColor: secColor,
              },
            ]}
          >
            <Text
              style={[
                { color: secColor, fontFamily: fonts[1700] },
                selected === item && {
                  color: "#FFF",
                },
              ]}
            >
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    // alignItems: "center",
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
