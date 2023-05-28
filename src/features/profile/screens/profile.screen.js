import React, { useEffect, useState, useRef, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Button,
  TouchableOpacity,
  Pressable,
  Animated,
  ScrollView,
  Alert,
} from "react-native";
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
import { TabHeader } from "../../../components/tabHeader";
import { ProfileHeader } from "../components/profileHeader.component";
import { Ionicons } from "@expo/vector-icons";
import { Selectable } from "../../../components/Selectable";
import Slider from "@react-native-community/slider";
import { FriendsContext } from "../../../services/friends/friends.context";
import { auth } from "../../../../firebase";
import { TextInput } from "react-native-paper";

export const ProfileScreen = ({ navigation }) => {
  const {
    currentProfile,
    updatedProfile,
    updateProfile,
    submitUpdateProfile,
    resetUpdateProfile,
  } = useContext(FriendsContext);

  const settingsNotExpandedHeight = 0;
  const settingsExpandedHeight = 334;
  const settingsHeight = useRef(
    new Animated.Value(settingsNotExpandedHeight)
  ).current;
  const settingsOpacity = useRef(new Animated.Value(0)).current;

  const profileNotExpandedHeight = 0;
  const profileExpandedHeight = 150;
  const profileHeight = useRef(
    new Animated.Value(profileNotExpandedHeight)
  ).current;
  const profileOpacity = useRef(new Animated.Value(0)).current;

  const [expandProfile, setExpandProfile] = useState(false);
  const [expandSettings, setExpandSettings] = useState(false);

  const handleExpand = (sec) => {
    if (sec === "Profile") {
      if (!expandProfile) {
        setExpandProfile(true);
        return;
      }
      if (currentProfile === updatedProfile) {
        setExpandProfile(false);
        return;
      }
    }

    if (sec === "Settings") {
      if (!expandSettings) {
        setExpandSettings(true);
        return;
      }
      if (currentProfile === updatedProfile) {
        setExpandSettings(false);
        return;
      }
    }

    Alert.alert(
      "Discard Changes",
      "You have made changes to your profile, would you like to discard these changes?",
      [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Discard",
          onPress: () => {
            if (sec === "Profile") {
              setExpandProfile(false);
            } else {
              setExpandSettings(false);
            }
            resetUpdateProfile();
          },
          style: "destructive",
        },
      ]
    );
  };

  useEffect(() => {
    if (expandProfile) {
      Animated.parallel([
        Animated.timing(profileHeight, {
          toValue: profileExpandedHeight,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(profileOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(profileHeight, {
          toValue: profileNotExpandedHeight,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(profileOpacity, {
          delay: 50,
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [expandProfile]);

  const profileHeader = () => (
    <View
      style={[
        styles.settingsListItemContainer,
        {
          flexDirection: "row",
        },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name={"person-outline"} size={25} color={"#000"} />
        <Text style={{ marginLeft: marginTop, fontFamily: fonts[1700] }}>
          {"Edit Profile"}
        </Text>
      </View>
      {expandProfile ? (
        <TouchableOpacity
          onPress={() => submitUpdateProfile()}
          style={{
            height: 30,
            borderRadius: 30 / 2,
            borderWidth: 2,
            borderColor: secColor,
            backgroundColor: secColor,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: horizontalMargin,
          }}
        >
          <Text style={{ fontFamily: fonts[1700], color: "#FFF" }}>Save</Text>
        </TouchableOpacity>
      ) : (
        <Ionicons name={"chevron-forward-outline"} size={28} color={"#000"} />
      )}
    </View>
  );

  const profileBody = () => (
    <View
      style={{ marginHorizontal: horizontalMargin / 2, alignSelf: "stretch" }}
    >
      <Text style={styles.sectionHeader}>Email</Text>
      <View
        style={[
          styles.selectableContainerStyle,
          { paddingBottom: horizontalMargin / 2 },
        ]}
      >
        <Text style={{ color: lightTextColor, fontFamily: fonts[1300] }}>
          {auth?.currentUser?.email}
        </Text>
      </View>
      <TextInput
        mode="outlined"
        label="Username"
        value={updatedProfile?.name}
        onChangeText={(text) => updateProfile("name", text)}
        theme={{ colors: { text: "black" } }}
        style={{
          backgroundColor: "white",
          marginTop: horizontalMargin / 2,
        }}
        selectionColor={secColor}
        activeOutlineColor={secColor}
        activeUnderlineColor={secColor}
      />
    </View>
  );

  useEffect(() => {
    if (expandSettings) {
      Animated.parallel([
        Animated.timing(settingsHeight, {
          toValue: settingsExpandedHeight,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(settingsOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(settingsHeight, {
          toValue: settingsNotExpandedHeight,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(settingsOpacity, {
          delay: 50,
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [expandSettings]);

  const settingsHeader = () => (
    <View
      style={[
        styles.settingsListItemContainer,
        {
          flexDirection: "row",
        },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name={"settings-outline"} size={25} color={"#000"} />
        <Text style={{ marginLeft: marginTop, fontFamily: fonts[1700] }}>
          {"Settings"}
        </Text>
      </View>
      {expandSettings ? (
        <TouchableOpacity
          onPress={() => submitUpdateProfile()}
          style={{
            height: 30,
            borderRadius: 30 / 2,
            borderWidth: 2,
            borderColor: secColor,
            backgroundColor: secColor,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: horizontalMargin,
          }}
        >
          <Text style={{ fontFamily: fonts[1700], color: "#FFF" }}>Save</Text>
        </TouchableOpacity>
      ) : (
        <Ionicons name={"chevron-forward-outline"} size={28} color={"#000"} />
      )}
    </View>
  );

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

  const settingsBody = () => (
    <View>
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
            {currentProfile?.radius || 5.0}
            {" km"}
          </Text>
        </View>
        <Slider
          style={{ height: 40, color: secColor }}
          onValueChange={(val) =>
            updateProfile("radius", (val * 0.001).toFixed(1))
          }
          minimumTrackTintColor={secColor}
          tapToSeek={true}
          // thumbTintColor={secColor} // if wanted thumb tint
          minimumValue={5000}
          maximumValue={40000}
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
    </View>
  );

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: StatusBar.currentHeight,
          backgroundColor: "#FFFFFF",
        }}
      >
        <View style={styles.container}>
          <TabHeader
            text={"Profile".toUpperCase()}
            subtext={"Connect with friends".toUpperCase()}
          />
          <ProfileHeader />
          <ScrollView>
            <Pressable onPress={() => handleExpand("Profile")}>
              {profileHeader()}
            </Pressable>
            <Animated.View
              style={[
                styles.settingsListItemContainer,
                { height: profileHeight, opacity: profileOpacity },
              ]}
            >
              {profileBody()}
            </Animated.View>

            <Pressable onPress={() => handleExpand("Settings")}>
              {settingsHeader()}
            </Pressable>
            <Animated.View
              style={[
                styles.settingsListItemContainer,
                { height: settingsHeight, opacity: settingsOpacity },
              ]}
            >
              {settingsBody()}
            </Animated.View>
          </ScrollView>
        </View>

        <TouchableOpacity
          style={styles.giveFeedbackContainer}
          onPress={() => console.warn("feedback")}
        >
          <View style={{ flex: 0.8 }}>
            <Text
              style={{ fontFamily: fonts[1700], color: secColor, fontSize: 15 }}
            >
              Give Feedback
            </Text>
            <Text style={{ fontFamily: fonts[1500], fontSize: 12 }}>
              Our Choice is a new and improving app. Any feedback would be
              greatly appreciated!
            </Text>
          </View>
          <Ionicons name={"chatbox-outline"} size={50} color={secColor} />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: horizontalMargin,
  },
  searchBarContainer: {
    marginTop: marginTop,
  },
  searchBar: {
    marginTop: marginTop,
    height: 40,
    borderRadius: 40 / 2,
  },
  friendHeaderText: {
    color: secTextColor,
    fontWeight: "bold",
    fontSize: 12,
  },
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
