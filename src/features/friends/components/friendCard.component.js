import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  borderRadius,
  lightTextColor,
  mainColor,
  secColor,
  secTextColor,
  fonts,
} from "../../../../constants";

export const FriendCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.image}></View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Invite</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lowerContainer}>
        <Text style={styles.username}>Name Surname</Text>
        <Text style={styles.userData}>Data</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "48%",
    borderRadius: borderRadius,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: mainColor,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: "black",
  },
  upperContainer: {
    alignItems: "center",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  addButton: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30 / 2,
    height: 30,
    paddingHorizontal: 10,
  },
  addButtonText: {
    fontFamily: fonts[700],
    fontSize: 16,
    fontWeight: "500",
  },
  lowerContainer: {
    marginVertical: 16,
  },
  username: {
    fontFamily: fonts[900],
    fontSize: 16,
  },
  userData: {
    marginTop: 4,
    color: lightTextColor,
    fontFamily: fonts[700],
    fontSize: 13,
  },
});
