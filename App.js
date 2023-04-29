import React, { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts as useSSP,
  SourceSansPro_200ExtraLight,
  SourceSansPro_300Light,
  SourceSansPro_400Regular,
  SourceSansPro_600SemiBold,
  SourceSansPro_700Bold,
  SourceSansPro_900Black,
} from "@expo-google-fonts/source-sans-pro";
import {
  useFonts as useInter,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { Navigation } from "./src/navigation";
import { FriendsContextProvider } from "./src/services/friends/friends.context";
import { AuthenticationContextProvider } from "./src/services/profile/authentication.context";
import { GroupContextProvider } from "./src/services/group/group.context";
import { PlacesContextProvider } from "./src/services/places/places.service";

export default function App() {
  const [fontLoaderSSP] = useSSP({
    SourceSansPro_200ExtraLight,
    SourceSansPro_300Light,
    SourceSansPro_400Regular,
    SourceSansPro_600SemiBold,
    SourceSansPro_700Bold,
    SourceSansPro_900Black,
  });

  const [fontLoaderInter] = useInter({
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  if (!fontLoaderInter || !fontLoaderSSP) return null;

  return (
    <>
      <AuthenticationContextProvider>
        <GroupContextProvider>
          <FriendsContextProvider>
            <PlacesContextProvider>
              <NavigationContainer>
                <Navigation />
              </NavigationContainer>
            </PlacesContextProvider>
          </FriendsContextProvider>
        </GroupContextProvider>
      </AuthenticationContextProvider>
      <StatusBar style="auto" />
    </>
  );
}
