import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { Searchbar } from "react-native-paper";
import {
  borderRadius,
  fonts,
  horizontalMargin,
  lightTextColor,
  mainColor,
  marginTop,
  secColor,
  secTextColor,
} from "../../../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthenticationContext } from "../../../services/profile/authentication.context";
import { PlacesContext } from "../../../services/places/places.service";
import { FriendsContext } from "../../../services/friends/friends.context";
import { Selectable } from "../../../components/Selectable";
import Slider from "@react-native-community/slider";

const settingsOptionList = [
  {
    title: "Open Status",
    selected: "Open",
    options: ["None", "Open"],
  },
  {
    title: "Price",
    selected: "All",
    options: ["All", "$", "$$", "$$$", "$$$$"],
  },
];

export const NoSession = ({ navigation }) => {
  const { requestLocation, location } = useContext(AuthenticationContext);
  const {
    places,
    loading,
    fetchPlaces,
    sessionStarted,
    setSessionStarted,
    isLoading,
  } = useContext(PlacesContext);
  const { currentProfile, updatedProfile, updateProfile } =
    useContext(FriendsContext);

  const [showPrefrences, setShowPrefrences] = useState(false);

  const handleFetchReq = () => {
    if (Object.keys(location).length === 0) {
      requestLocation();
      return;
    }
    fetchPlaces(updatedProfile, location);
  };

  const settingsBody = () => (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.sectionHeader}>Location</Text>
      <View
        style={[
          styles.selectableContainerStyle,
          { paddingBottom: horizontalMargin / 2 },
        ]}
      >
        <Text style={{ color: lightTextColor, fontFamily: fonts[1300] }}>
          We are using your current location
        </Text>
      </View>
      <View
        style={[
          styles.selectableContainerStyle,
          { paddingBottom: horizontalMargin / 2 },
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: lightTextColor, fontFamily: fonts[1300] }}>
            {`Search Radius - `}
          </Text>
          <Text style={{ fontFamily: fonts[1500] }}>
            {updatedProfile?.radius}
            {" km"}
          </Text>
        </View>
        <Slider
          style={{ height: 40, color: secColor, width: 300 }}
          value={updatedProfile?.radius}
          onValueChange={(val) => updateProfile("radius", val.toFixed(1))}
          minimumTrackTintColor={secColor}
          tapToSeek={true}
          // thumbTintColor={secColor} // if wanted thumb tint
          minimumValue={5}
          maximumValue={40}
        />
      </View>
      <Text style={styles.sectionHeader}>Preferences</Text>
      {settingsOptionList.map((item) => (
        <Selectable
          data={item.options}
          title={item.title}
          selected={
            item.title === "Price"
              ? updatedProfile?.price || "All"
              : updatedProfile?.openStatus || "None"
          }
          setSelected={updateProfile}
          contianerStyle={styles.selectableContainerStyle}
        />
      ))}
      <TouchableOpacity style={styles.button} onPress={handleFetchReq}>
        <Text style={styles.buttonText}>Start Session</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
        <Text
          style={{
            marginTop: 24,
            fontFamily: fonts[1700],
            color: secTextColor,
          }}
        >
          Getting Things Ready...
        </Text>
      </View>
    );

  if (showPrefrences)
    return <View style={styles.container}>{settingsBody()}</View>;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../../assets/illustrations/no-friends.png")}
          resizeMode="contain"
          style={{ height: 200, width: 200 }}
        />
      </View>
      <Text style={styles.header}>Choose Your Craving</Text>
      <Text style={styles.subHeader}>Swipe on restaurant near you</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowPrefrences(true)}
      >
        <Text style={styles.buttonText}>Find Your Craving</Text>
      </TouchableOpacity>
    </View>
  );

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

  // button: {
  //   marginHorizontal: horizontalMargin * 2,
  //   marginBottom: marginTop,
  //   height: 50,
  //   backgroundColor: secColor,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 50 / 2,
  //   paddingHorizontal: 50,
  // },
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
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: fonts[1600],
  },
  settingsListItemContainer: {
    height: 65,
    alignItems: "center",
    flexDirection: "column",
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
    fontSize: 14,
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
