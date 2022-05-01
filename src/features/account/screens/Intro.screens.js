import React, { useState, useRef } from "react";
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
import Logo from "../../../components/Logo";
import { Video } from "expo-av";

export const IntroScreen = ({ navigation }) => {
  return (
    <>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Video
          style={styles.video}
          source={require("../../../../assets/introVideo.mp4")}
          resizeMode="cover"
          isLooping
          shouldPlay={true}
        />
        <View style={styles.container}>
          <View style={styles.divider}>
            <View style={styles.lineDivider} />
            <Logo color={secColor} size={25} />
            <View style={styles.lineDivider} />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.signInButton}
          >
            <Text style={styles.signInButtonText}>Sing In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={styles.createAccountButton}
          >
            <Text style={styles.createAccountButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: "10%",
    shadowOffset: { width: 0, height: 1 },
    shadowColor: "#000",
    shadowOpacity: 0.5,
    elevation: 10,
    marginBottom: marginTop,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  video: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  divider: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  lineDivider: {
    height: 2,
    backgroundColor: secColor,
    flex: 1,
    marginHorizontal: horizontalMargin,
  },
  signInButton: {
    height: 50,
    borderRadius: 50 / 2,
    marginTop: marginTop,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderColor: mainColor,
    borderWidth: 2,
  },
  createAccountButton: {
    height: 50,
    borderRadius: 50 / 2,
    marginTop: marginTop,
    backgroundColor: secColor,
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountButtonText: {
    fontSize: 14,
    fontFamily: fonts[1600],
    color: "#FFFFFF",
  },
  signInButtonText: {
    fontSize: 14,
    fontFamily: fonts[1600],
  },
});
