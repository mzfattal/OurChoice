import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { Searchbar } from "react-native-paper";
import {
  fonts,
  mainColor,
  marginTop,
  secColor,
  secTextColor,
} from "../../../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthenticationContext } from "../../../services/profile/authentication.context";
import { PlacesContext } from "../../../services/places/places.service";

export const NoSession = ({ navigation }) => {
  const { requestLocation, location } = useContext(AuthenticationContext);
  const { places, loading, fetchPlaces, sessionStarted, setSessionStarted } =
    useContext(PlacesContext);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../../assets/illustrations/no-friends.png")}
          resizeMode="contain"
          style={{ height: 200, width: 200 }}
        />
      </View>
      <Text style={styles.header}>Create Your Circle</Text>
      <Text style={styles.subHeader}>
        Invite your friends and choose a restaurant you're all craving
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Friends")}
      >
        <Text style={styles.buttonText}>Invite Your Friends</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secButton}
        onPress={() => setSessionStarted(true)}
      >
        <Text style={styles.secButtonText}>Start Alone</Text>
      </TouchableOpacity>
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
    width: "80%",
    textAlign: "center",
    fontFamily: fonts[600],
    color: secTextColor,
    fontSize: 17,
  },
  button: {
    marginTop: marginTop,
    height: 50,
    backgroundColor: secColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50 / 2,
    paddingHorizontal: 50,
  },
  secButton: {
    marginTop: marginTop,
    height: 50,
    borderColor: secColor,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50 / 2,
    paddingHorizontal: 50,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: fonts[1600],
  },
  secButtonText: {
    color: secColor,
    fontSize: 15,
    fontFamily: fonts[1600],
  },
});
