import React, { useState, useContext, useEffect } from "react";
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
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { EmptyFriends } from "../components/emptyFriends.component";

export const FriendScreen = () => {
  const {
    friends,
    friendRequests,
    isLoading,
    error,
    addFriend,
    fetchFriends,
    fetchFriendRequests,
  } = useContext(FriendsContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  const onChangeSearch = (query) => setSearchQuery(query);

  useEffect(() => {
    if (!friendRequests?.length) setTabIndex(0);
  }, [friendRequests]);

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
              inputStyle={{ fontFamily: fonts[1600] }}
              theme={{ colors: { text: "black" } }}
              selectionColor={secColor}
            />
          </View>
          {friendRequests?.length ? (
            <View style={styles.tabsContainer}>
              <SegmentedControl
                values={["Friends", "Friend Requests"]}
                selectedIndex={tabIndex}
                onChange={(event) => {
                  setTabIndex(event.nativeEvent.selectedSegmentIndex);
                }}
              />
            </View>
          ) : null}
          {tabIndex === 0 && (
            <View
              style={[
                styles.friendsContainer,
                !friendRequests?.length && { marginTop: marginTop },
              ]}
            >
              <FlatList
                keyExtractor={(item) => item?.item?.data}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.listColumnStyle}
                data={friends}
                ListEmptyComponent={EmptyFriends}
                onRefresh={() => fetchFriends()}
                refreshing={isLoading}
                numColumns={2}
                renderItem={(item, i) => (
                  <FriendCard key={i} data={item?.item} />
                )}
                contentContainerStyle={{ flexGrow: 1 }}
              />
            </View>
          )}
          {tabIndex === 1 && (
            <View
              style={[
                styles.friendsContainer,
                false && { marginTop: marginTop },
              ]}
            >
              <FlatList
                keyExtractor={(item) => item?.item?.data}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={friendRequests}
                onRefresh={() => fetchFriendRequests()}
                refreshing={isLoading}
                numColumns={1}
                renderItem={(item, i) => (
                  <FriendCard key={i} data={item?.item} />
                )}
              />
            </View>
          )}
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
    flex: 1,
  },
  tabsContainer: {
    marginTop: marginTop,
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
