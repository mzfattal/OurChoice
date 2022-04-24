import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { borderRadius, mainColor } from "../../../../constants";

export const FriendCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.image}></View>
        <TouchableOpacity style={styles.addButton}>
          <Text>ADD</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lowerContainer}>
        <Text>Username</Text>
        <Text>Data</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "48%",
    borderRadius: borderRadius,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: mainColor,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: "orange",
  },
  upperContainer: {
    alignItems: "center",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    height: 30,
  },
  lowerContainer: {
    marginVertical: 10,
  },
});
