import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import { FriendScreen } from "../features/friends/screens/friends.screen";
import { PlacesScreen } from "../features/places/screens/places.screen";
import { ProfileScreen } from "../features/profile/screens/profile.screen";
import { LoginScreen } from "../features/account/screens/login.screens";
import { CreateAccountScreen } from "../features/account/screens/createAccount.screens";
import { secColor } from "../../constants";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const AccountNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={CreateAccountScreen} />
    </Stack.Navigator>
  );
};
