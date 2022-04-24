import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { fonts, marginTop, secColor, secTextColor } from "../../constants";
import { StatusBar } from "expo-status-bar";

export const ErrorScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: "#FFFFFF",
      }}
    >
      <View style={styles.container}>
        <Text>ERROR</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
