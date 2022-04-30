import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import {
  borderRadius,
  lightTextColor,
  mainColor,
  secColor,
  secTextColor,
  fonts,
  marginTop,
} from "../../../../constants";
import { FriendsContext } from "../../../services/friends/friends.context";
import { GroupContext } from "../../../services/group/group.context";

export const FriendCard = ({ data }) => {
  const { addUser, denyUser } = useContext(FriendsContext);
  const { group, addToGroup, removeFromGroup } = useContext(GroupContext);

  const [selected, setSelected] = useState(false);

  const handleInvite = () => {
    if (selected) {
      removeFromGroup(data);
      setSelected(false);
    } else {
      addToGroup(data);
      setSelected(true);
    }
  };

  useEffect(() => {
    if (!group.length) setSelected(false);
  }, [group]);

  if (!data) return null;

  if (!!data?.requester)
    return (
      <View style={styles.requestContainer}>
        <View style={styles.requestUpperContainer}>
          <Text style={styles.userData}>Friend Request from</Text>
          <Text style={styles.username}>{data?.requester}</Text>
        </View>
        <View style={styles.requestLowerContainer}>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Deny Request?",
                "Would you like to deny the request",
                [
                  {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel",
                  },
                  { text: "Deny", onPress: () => denyUser(data?.requester) },
                ]
              )
            }
            style={styles.addButtonRequest}
          >
            <Text style={styles.addButtonText}>Deny</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Accept Request?",
                "Would you like to accept the request",
                [
                  {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel",
                  },
                  { text: "Accept", onPress: () => addUser(data?.requester) },
                ]
              )
            }
            style={styles.addButtonRequest}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Image
          source={{ uri: "https://picsum.photos/200" }}
          style={styles.image}
        />
        <TouchableOpacity
          onPress={() => handleInvite()}
          style={[styles.addButton, selected && { backgroundColor: "#FFFFFF" }]}
        >
          <Text style={[styles.addButtonText, selected && { color: secColor }]}>
            Invite
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lowerContainer}>
        <Text style={styles.username}>{data?.name}</Text>
        <Text style={styles.userData}>{data?.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "48%",
    borderRadius: borderRadius,
    paddingHorizontal: 16,
    backgroundColor: mainColor,
  },
  requestContainer: {
    borderRadius: borderRadius,
    paddingHorizontal: 16,
    backgroundColor: mainColor,
    marginTop: marginTop,
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
    backgroundColor: secColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30 / 2,
    height: 30,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: secColor,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontFamily: fonts[700],
    fontSize: 14,
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
  requestUpperContainer: {
    marginTop: 16,
  },
  requestLowerContainer: {
    alignItems: "center",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  addButtonRequest: {
    backgroundColor: secColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30 / 2,
    height: 30,
    borderWidth: 2,
    borderColor: secColor,
    width: "48%",
  },
});
