import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";

import { FriendScreen } from "../features/friends/screens/friends.screen";
import { PlacesScreen } from "../features/places/screens/places.screen";
import { ProfileScreen } from "../features/profile/screens/profile.screen";
import { ProfileEditScreen } from "../features/profile/screens/editProfile.screen";
import { secColor } from "../../constants";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();

export const AppNavigator = () => {
  const ProfileStackScreen = () => {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={ProfileScreen}
        />
        <ProfileStack.Screen
          options={{ title: "Edit Profile" }}
          name="EditProfile"
          component={ProfileEditScreen}
        />
      </ProfileStack.Navigator>
    );
  };

  const PlacesStackScreen = () => {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          name="Restaurants"
          options={{ headerShown: false }}
          component={PlacesScreen}
        />
        <ProfileStack.Screen
          // options={{ title: "Edit Profilee", tabBarStyle: { display: "none" } }}
          name="Confirmed"
          component={PlacesScreen}
        />
      </ProfileStack.Navigator>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="Friends"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Restaurants") {
            iconName = focused ? "restaurant" : "restaurant-outline";
          } else if (route.name === "Friends") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Favorites") {
            return focused ? (
              <MaterialIcons name="favorite" size={size} color={color} />
            ) : (
              <MaterialIcons
                name="favorite-outline"
                size={size}
                color={color}
              />
            );
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: secColor,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Restaurants" component={PlacesStackScreen} />
      <Tab.Screen name="Friends" component={FriendScreen} />
      <Tab.Screen name="Favorites" component={FriendScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
};
