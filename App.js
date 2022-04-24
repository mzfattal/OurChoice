import React from "react";
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

import { FriendsContextProvider } from "./src/services/friends/friends.context";
import { Navigation } from "./src/navigation";

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
      <FriendsContextProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </FriendsContextProvider>
      <StatusBar style="auto" />
    </>
  );
}
