import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  useFonts,
  SourceSansPro_200ExtraLight,
  SourceSansPro_300Light,
  SourceSansPro_400Regular,
  SourceSansPro_600SemiBold,
  SourceSansPro_700Bold,
  SourceSansPro_900Black,
} from "@expo-google-fonts/source-sans-pro";

import { FriendScreen } from "./src/features/friends/screens/friends.screen";
import { PlacesScreen } from "./src/features/places/screens/places.screen";
import { secColor } from "./constants";

const Tab = createBottomTabNavigator();

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
      <NavigationContainer>
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
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: secColor,
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Restaurants" component={PlacesScreen} />
          <Tab.Screen name="Friends" component={FriendScreen} />
          <Tab.Screen name="Profile" component={FriendScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
