import React, { useState, useRef, useContext, useEffect } from "react";
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
  ScrollView,
  Dimensions,
  Animated,
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
  lightTextColor,
} from "../../../../constants";
import Logo from "../../../components/Logo";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { AuthenticationContext } from "../../../services/profile/authentication.context";

export const OnboardingScreen = ({ navigation, route }) => {
  const onboardingLength = 5;
  const { width, height } = Dimensions.get("window");
  const { user, isLoading, error, onCreate } = useContext(
    AuthenticationContext
  );

  const scrollRef = useRef();
  const [usernameText, setUsernameText] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [sliderIndex, setSliderIndex] = useState(0);

  const setSliderPage = (event) => {
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);

    if (indexOfNextScreen !== sliderIndex) {
      setSliderIndex(indexOfNextScreen);
    }
  };

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

  const introView = () => (
    <View style={{ flex: 1, marginHorizontal: horizontalMargin }}>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Ionicons name={"chevron-back-outline"} size={30} />
      </TouchableOpacity>
      <Text style={{ fontFamily: fonts[1900], fontSize: 25 }}>
        Welcome To Ourchoice
      </Text>
      <Text style={{ fontFamily: fonts[1900], fontSize: 25 }}>
        Setup Your Profile
      </Text>
      {photoAndNameRowComponent()}
    </View>
  );

  const photoAndNameRowComponent = () => (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <TouchableOpacity onPress={pickImage}>
        <View
          style={{
            marginTop: 5,
            borderRadius: borderRadius,
            width: 62,
            height: 62,
            alignSelf: "center",
            overflow: "hidden",
            borderColor: profilePhoto ? secColor : "gray",
            borderWidth: 1,
          }}
        >
          {profilePhoto ? (
            <Image
              source={{ uri: profilePhoto }}
              style={{ width: 62, height: 62 }}
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
                size={30}
                // resizeMode="conatin"
                color={"gray"}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
      <View
        style={{
          marginLeft: 16,
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{ alignSelf: "stretch" }}
          label="Username"
          mode="outlined"
          value={usernameText}
          onChangeText={(text) => setUsernameText(text)}
          theme={{ colors: { text: "black" } }}
          selectionColor={secColor}
          activeOutlineColor={secColor}
        />
      </View>
    </View>
  );

  const renderTopBar = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={() =>
          sliderIndex === 0
            ? navigation.navigate("SignUp")
            : scrollRef.current?.scrollTo({
                x: width * (sliderIndex - 1),
                animated: true,
              })
        }
      >
        <Ionicons name={"chevron-back-outline"} size={30} />
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        {Array(onboardingLength)
          .fill()
          .map((x, index) => {
            if (index === sliderIndex)
              return (
                <View
                  style={{
                    backgroundColor: secColor,
                    width: 20,
                    height: 10,
                    borderRadius: 5,
                    marginRight: 5,
                  }}
                />
              );
            return (
              <View
                style={{
                  backgroundColor: lightTextColor,
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginRight: 5,
                }}
              />
            );
          })}
      </View>

      <View />
    </View>
  );

  const renderWelcomeComponent = () => (
    <View
      style={{
        flex: 1,
        marginTop: "40%",
        alignItems: "center",
      }}
    >
      <Text style={{ fontFamily: fonts[1900], fontSize: 25 }}>
        Welcome To Our Choice
      </Text>
      <Text
        style={{
          fontFamily: fonts[1300],
          fontSize: 18,
          marginTop: 12,
          color: secTextColor,
        }}
      >
        Setup Your Profile
      </Text>
      <Image
        source={require("../../../../assets/illustrations/welcome-wave.png")}
        resizeMode="contain"
        style={{ height: 300, width: 300 }}
      />
    </View>
  );

  const renderUsernameComponent = () => (
    <View
      style={{
        flex: 1,
        marginHorizontal: horizontalMargin,
        alignItems: "center",
        marginTop: 16,
      }}
    >
      <Text style={{ fontFamily: fonts[1900], fontSize: 25 }}>
        Create a Username
      </Text>
      <TextInput
        style={{
          alignSelf: "stretch",

          marginTop: 8,
        }}
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

  const renderProfilePictureComponent = () => (
    <View
      style={{
        flex: 1,
        marginHorizontal: horizontalMargin,
        alignItems: "center",
        marginTop: 16,
      }}
    >
      <Text style={{ fontFamily: fonts[1900], fontSize: 25 }}>Add a Photo</Text>
      <TouchableOpacity onPress={pickImage}>
        <View
          style={{
            marginTop: 16,
            borderRadius: 200 / 2,
            width: 200,
            height: 200,
            alignSelf: "center",
            overflow: "hidden",
            borderColor: profilePhoto ? "black" : "gray",
            borderWidth: 1,
          }}
        >
          {profilePhoto ? (
            <Image
              source={{ uri: profilePhoto }}
              style={{ width: 200, height: 200 }}
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
                size={80}
                // resizeMode="conatin"
                color={"gray"}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );

  const locationW = useRef(new Animated.Value(100)).current;
  const locationH = useRef(new Animated.Value(100)).current;
  const locationBR = useRef(new Animated.Value(100 / 2)).current;
  const locationO = useRef(new Animated.Value(1)).current;

  useEffect(
    () =>
      Animated.loop(
        Animated.parallel([
          Animated.timing(locationW, {
            toValue: 200,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(locationH, {
            toValue: 200,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(locationBR, {
            toValue: 200,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(locationO, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
          }),
        ])
      ).start(),
    []
  );

  const renderLocationComponent = () => (
    <View
      style={{
        flex: 1,
        marginTop: "30%",
        alignItems: "center",
      }}
    >
      <Text style={{ fontFamily: fonts[1900], fontSize: 25 }}>
        Enable Location
      </Text>
      <Text
        style={{
          fontFamily: fonts[1300],
          fontSize: 18,
          marginTop: 12,
          color: secTextColor,
        }}
      >
        Let us help you find a food nearby
      </Text>
      <View
        style={{
          marginTop: "30%",
          width: 200,
          height: 200,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 100,
            width: 100,
            borderRadius: 100 / 2,
            backgroundColor: secColor,
          }}
        />
        <Animated.View
          style={{
            height: locationH,
            width: locationW,
            borderRadius: locationBR,
            backgroundColor: secColor,
            opacity: locationO,
            position: "absolute",
          }}
        />
        <Ionicons
          style={{ position: "absolute" }}
          name={"location-sharp"}
          size={40}
          // resizeMode="conatin"
          color={"#FFF"}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {renderTopBar()}
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          setSliderPage(event);
        }}
      >
        <View style={{ width, height }}>{renderWelcomeComponent()}</View>
        <View style={{ width, height }}>{renderUsernameComponent()}</View>
        <View style={{ width, height }}>{renderProfilePictureComponent()}</View>
        <View style={{ width, height }}>{renderLocationComponent()}</View>
        <View style={{ width, height }}>
          <Text>Screen 5</Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          sliderIndex == onboardingLength - 1
            ? onCreate(
                route?.params?.email.toLowerCase(),
                route?.params?.password,
                usernameText,
                profilePhoto
              )
            : scrollRef.current?.scrollTo({
                x: width * (sliderIndex + 1),
                animated: true,
              })
        }
      >
        <Text style={styles.buttonText}>
          {sliderIndex == onboardingLength - 1 ? "Create Account" : "Continue"}
        </Text>
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
