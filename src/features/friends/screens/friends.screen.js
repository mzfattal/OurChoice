import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import {
  horizontalMargin,
  marginTop,
  secTextColor,
} from "../../../../constants";
import { GroupHeader } from "../components/groupHeader.component";
import { FriendCard } from "../components/friendCard.component";
import { TabHeader } from "../../../components/tabHeader";

export const FriendScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

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
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={styles.listColumnStyle}
              data={["", "", "", "", "", "", ""]}
              numColumns={2}
              renderItem={(item, i) => <FriendCard key={i} />}
              be
            />
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
});
