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
  horizontalMargin,
  marginTop,
  secColor,
  secTextColor,
} from "../../../../constants";
import { GroupHeader } from "../components/groupHeader.component";
import { FriendCard } from "../components/friendCard.component";
import { TabHeader } from "../../../components/tabHeader";
import { FriendsContext } from "../../../services/friends/friends.context";
import { ErrorScreen } from "../../../utils/error";

import { auth } from "../../../../firebase";

export const FriendScreen = () => {
  const { friends, isLoading, error } = useContext(FriendsContext);

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
            <Text style={styles.friendHeaderText}>
              {"Friends".toUpperCase()}
            </Text>
            <Searchbar
              style={styles.searchBar}
              placeholder="Search..."
              onChangeText={onChangeSearch}
              value={searchQuery}
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
                be
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
});
