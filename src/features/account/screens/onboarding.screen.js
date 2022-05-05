import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { TextInput } from "react-native-paper";
import {
  borderRadius,
  fonts,
  horizontalMargin,
  mainColor,
  marginTop,
  secColor,
  secTextColor,
} from "../../../../constants";
import Logo from "../../../components/Logo";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export const OnboardingScreen = ({ navigation }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [usernameText, setUsernameText] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setProfilePhoto(result.uri);
    }
  };

  const introStep = () => (
    <View
      style={{
        flex: 1,
        marginHorizontal: horizontalMargin,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignSelf: "stretch",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.headerText}>Welcome to Our Choice</Text>
        {/* <Logo size={50} color={secColor} /> */}
      </View>
      <Image
        source={require("../../../../assets/illustrations/no-friends.png")}
        resizeMode="contain"
        style={{ height: 200, width: 200 }}
      />
      <Text style={{}}>Welcome to Our Choice</Text>
    </View>
  );

  const usernameStep = () => (
    <View style={{ flex: 1, marginHorizontal: horizontalMargin * 2 }}>
      <Text style={styles.headerText}>Choose a Name</Text>
      <TextInput
        style={{ marginTop: marginTop }}
        label="Username"
        mode="outlined"
        value={usernameText}
        onChangeText={(text) => setUsernameText(text)}
        theme={{ colors: { text: "black" } }}
        selectionColor={secColor}
        activeOutlineColor={secColor}
      />
    </View>
  );

  const photoStep = () => (
    <View style={{ flex: 1, marginHorizontal: horizontalMargin * 2 }}>
      <Text style={styles.headerText}>Profile Photo</Text>
      <TouchableOpacity onPress={pickImage}>
        <View
          style={{
            marginTop: marginTop,
            borderRadius: borderRadius,
            width: 300,
            height: 300,
            alignSelf: "center",
            overflow: "hidden",
            borderColor: !profilePhoto ? secColor : "gray",
            borderWidth: 2,
          }}
        >
          {profilePhoto ? (
            <Image
              source={{ uri: profilePhoto }}
              style={{ width: 300, height: 300 }}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name={"person"}
                size={100}
                // resizeMode="conatin"
                color={"gray"}
              />
            </View>
          )}
        </View>
        {!profilePhoto && (
          <Ionicons
            name={"add-circle"}
            size={45}
            color={secColor}
            style={{
              position: "absolute",
              right: 10,
              bottom: -2,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );

  const locationStep = () => (
    <View style={{ flex: 1, marginHorizontal: horizontalMargin * 2 }}>
      <Text style={styles.headerText}>Enable Location</Text>
      <Image
        source={require("../../../../assets/illustrations/location.png")}
        resizeMode="contain"
        style={{
          height: 300,
          width: 300,
          alignSelf: "center",
          marginTop: "25%",
        }}
      />
      <Text
        style={{
          textAlign: "center",
          fontFamily: fonts[1400],
          width: "70%",
          alignSelf: "center",
        }}
      >
        Users must enable their location so Our Choice can find resturants near
        them!
      </Text>
    </View>
  );

  const slideMap = {
    0: introStep(),
    1: usernameStep(),
    2: photoStep(),
    3: locationStep(),
  };

  const progressBar = () => (
    <View style={styles.progressBarContainer}>
      {Object.keys(slideMap).map((item) =>
        item == slideIndex ? (
          <View
            style={{
              height: 10,
              width: 20,
              borderRadius: 10 / 2,
              backgroundColor: secColor,
              marginHorizontal: 4,
            }}
          />
        ) : (
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 10 / 2,
              backgroundColor: "gray",
              marginHorizontal: 4,
            }}
          />
        )
      )}
      <TouchableOpacity
        onPress={() => setSlideIndex((prev) => (prev > 0 ? prev - 1 : 0))}
        style={{ position: "absolute", left: 10 }}
      >
        <Ionicons name={"chevron-back"} size={28} color={"#000"} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {progressBar()}
      {slideMap[slideIndex]}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          setSlideIndex((prev) =>
            prev < Object.keys(slideMap).length - 1
              ? prev + 1
              : Object.keys(slideMap).length - 1
          )
        }
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  button: {
    marginHorizontal: horizontalMargin * 2,
    marginTop: marginTop,
    height: 50,
    backgroundColor: secColor,
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
  headerText: {
    fontFamily: fonts[1600],
    fontSize: 25,
  },
  progressBarContainer: {
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
