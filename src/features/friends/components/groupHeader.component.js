import React, { useContext } from "react";
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
import { GroupContext } from "../../../services/group/group.context";

export const GroupHeader = () => {
  const { group, clearGroup } = useContext(GroupContext);

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
              onPress={() => clearGroup()}
            >
              <Ionicons name={"close"} size={20} color={"#FFF"} />
            </TouchableOpacity>
            {group.length ? (
              group.map((item, i) => {
                return (
                  <Image
                    key={`${i}`}
                    source={{ uri: "https://picsum.photos/200" }}
                    style={[styles.image, { marginLeft: i === 0 ? 0 : -5 }]}
                  />
                );
              })
            ) : (
              <View style={[styles.image, styles.emptyGroupPlaceHolder]}>
                <Ionicons name={"person"} size={15} color={"#BBBBBB"} />
              </View>
            )}
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
  emptyGroupPlaceHolder: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#BBBBBB",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
});
