import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Searchbar } from "react-native-paper";
import {
  borderRadius,
  horizontalMargin,
  mainColor,
  secColor,
  secTextColor,
  fonts,
} from "../../../../constants";

export const GroupHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.groupHeader}> {"Name:".toUpperCase()}</Text>
          <Text style={styles.groupName}>4D1S8O</Text>
        </View>

        <View style={styles.groupContainer}>
          <View style={styles.imageContainer}>
            <TouchableOpacity style={styles.emptyButton}>
              <Text>X</Text>
            </TouchableOpacity>
            {["green", "red", "yellow", "blue"].map((item, i) => (
              <View
                style={[
                  styles.image,
                  { backgroundColor: item, marginLeft: i === 0 ? 0 : -5 },
                ]}
              ></View>
            ))}
          </View>

          <TouchableOpacity
            onPress={() => console.warn("start session")}
            style={styles.startSessionButton}
          >
            <Text style={styles.startSessionButtonText}>Start Session</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius,
    backgroundColor: mainColor,
  },
  innerContainer: {
    marginHorizontal: horizontalMargin,
  },
  headerContainer: {
    alignItems: "center",
    height: 25,
    marginTop: 15,
    flexDirection: "row",
  },
  groupHeader: {
    fontWeight: "bold",
    color: secTextColor,
    fontSize: 12,
  },
  groupName: {
    fontWeight: "800",
    fontSize: 18,
    marginLeft: 8,
  },
  groupContainer: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    height: 30,
    width: 30,
    flex: 1,
    flexDirection: "row",
  },
  emptyButton: {
    marginRight: 14,
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
  },
  startSessionButton: {
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 30 / 4,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  startSessionButtonText: {
    fontFamily: fonts[700],
    fontSize: 15,
  },
});
