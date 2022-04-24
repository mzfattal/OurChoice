import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { PlacesScreen } from "./src/features/places/screens/places.screen";
import { FriendScreen } from "./src/features/friends/screens/friends.screen";

export default function App() {
  return (
    <>
      <FriendScreen />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
