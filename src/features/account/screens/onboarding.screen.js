import React, { useState, useRef, useContext } from "react";
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
import { AuthenticationContext } from "../../../services/profile/authentication.context";

export const OnboardingScreen = ({ navigation, route }) => {
  const { user, isLoading, error, onCreate } = useContext(
    AuthenticationContext
  );

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

  const introView = () => (
    <View style={{ flex: 1, marginHorizontal: horizontalMargin }}>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Ionicons name={"chevron-back-outline"} size={30} />
      </TouchableOpacity>
      <Text style={{ fontFamily: fonts[900], fontSize: 25 }}>
        Welcome To Ourchoice
      </Text>
      <Text style={{ fontFamily: fonts[900], fontSize: 25 }}>
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

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {introView()}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          onCreate(
            route?.params?.email.toLowerCase(),
            route?.params?.password,
            usernameText,
            profilePhoto
          )
        }
      >
        <Text style={styles.buttonText}>Create Account</Text>
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
