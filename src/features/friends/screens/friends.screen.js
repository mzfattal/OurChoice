import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Searchbar } from "react-native-paper";
import {
  fonts,
  horizontalMargin,
  mainColor,
  marginTop,
  secColor,
  secTextColor,
} from "../../../../constants";
import { GroupHeader } from "../components/groupHeader.component";
import { FriendCard } from "../components/friendCard.component";
import { TabHeader } from "../../../components/tabHeader";
import { FriendsContext } from "../../../services/friends/friends.context";
import { ErrorScreen } from "../../../utils/error";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../../../firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

export const FriendScreen = () => {
  const { friends, isLoading, error, addFriend } = useContext(FriendsContext);

  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  if (error) return <ErrorScreen />;

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: StatusBar.currentHeight,
          backgroundColor: "#FFFFFF",
        }}
      >
        <View style={styles.container}>
          <TabHeader
            text={"Friends".toUpperCase()}
            subtext={"Create your Circle".toUpperCase()}
            showLogo
          />
          <GroupHeader />
          <View style={styles.searchBarContainer}>
            <View style={styles.friendsHeader}>
              <Text style={styles.friendHeaderText}>
                {"Friends".toUpperCase()}
              </Text>
            </View>
            <Searchbar
              style={styles.searchBar}
              placeholder="Search..."
              onChangeText={onChangeSearch}
              value={searchQuery}
              icon={() => (
                <Ionicons name={"person-add"} size={18} color={"#000"} />
              )}
              onIconPress={() => addFriend(searchQuery)}
              inputStyle={{ fontFamily: fonts[700] }}
              theme={{ colors: { text: "black" } }}
              selectionColor={secColor}
            />
          </View>
          <View style={styles.friendsContainer}>
            {!isLoading ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.listColumnStyle}
                data={friends}
                numColumns={2}
                renderItem={(item, i) => <FriendCard key={i} />}
              />
            ) : (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size={"large"} color={secColor} />
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: horizontalMargin,
  },
  searchBarContainer: {
    marginTop: marginTop,
  },
  searchBar: {
    marginTop: marginTop,
    height: 40,
    borderRadius: 40 / 2,
  },
  friendHeaderText: {
    color: secTextColor,
    fontWeight: "bold",
    fontSize: 12,
  },
  createHeaderText: {
    marginBottom: marginTop,
    color: secTextColor,
    fontWeight: "bold",
    fontSize: 12,
  },
  friendsContainer: {
    marginTop: marginTop,
    flex: 1,
  },
  listColumnStyle: {
    justifyContent: "space-between",
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  friendsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
