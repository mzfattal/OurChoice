import React, { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  SourceSansPro_200ExtraLight,
  SourceSansPro_300Light,
  SourceSansPro_400Regular,
  SourceSansPro_600SemiBold,
  SourceSansPro_700Bold,
  SourceSansPro_900Black,
} from "@expo-google-fonts/source-sans-pro";
import { Navigation } from "./src/navigation";
import { FriendsContextProvider } from "./src/services/friends/friends.context";
import { AuthenticationContextProvider } from "./src/services/profile/authentication.context";
import { GroupContextProvider } from "./src/services/group/group.context";

export default function App() {
  const [fontLoader] = useFonts({
    SourceSansPro_200ExtraLight,
    SourceSansPro_300Light,
    SourceSansPro_400Regular,
    SourceSansPro_600SemiBold,
    SourceSansPro_700Bold,
    SourceSansPro_900Black,
  });

  if (!fontLoader) return null;

  return (
    <>
      <AuthenticationContextProvider>
        <GroupContextProvider>
          <FriendsContextProvider>
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </FriendsContextProvider>
        </GroupContextProvider>
      </AuthenticationContextProvider>
      <StatusBar style="auto" />
    </>
  );
}
