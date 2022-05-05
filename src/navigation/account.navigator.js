import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import { FriendScreen } from "../features/friends/screens/friends.screen";
import { PlacesScreen } from "../features/places/screens/places.screen";
import { ProfileScreen } from "../features/profile/screens/profile.screen";
import { LoginScreen } from "../features/account/screens/login.screens";
import { CreateAccountScreen } from "../features/account/screens/createAccount.screens";
import { IntroScreen } from "../features/account/screens/Intro.screens";
import { secColor } from "../../constants";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { OnboardingScreen } from "../features/account/screens/onboarding.screen";

const Stack = createStackNavigator();

export const AccountNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Intro"
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={CreateAccountScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    </Stack.Navigator>
  );
};
