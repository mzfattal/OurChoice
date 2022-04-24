import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
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
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => console.warn("remove users in group")}
            >
              <Ionicons name={"close"} size={20} color={"#FFF"} />
            </TouchableOpacity>
            {["green", "red", "yellow", "blue"].map((item, i) => (
              <Image
                source={{ uri: "https://picsum.photos/200" }}
                style={[
                  styles.image,
                  { backgroundColor: item, marginLeft: i === 0 ? 0 : -5 },
                ]}
              />
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
    backgroundColor: secColor,
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
  },
  startSessionButton: {
    height: 30,
    paddingHorizontal: 16,
    borderRadius: 30 / 2,
    backgroundColor: secColor,
    justifyContent: "center",
    alignItems: "center",
  },
  startSessionButtonText: {
    fontFamily: fonts[700],
    fontSize: 15,
    color: "white",
  },
});
