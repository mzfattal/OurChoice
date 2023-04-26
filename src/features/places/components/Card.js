import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Animated, Pressable } from "react-native";
import {
  fonts,
  horizontalMargin,
  marginTop,
  secTextColor,
} from "../../../../constants";
import { Ionicons } from "@expo/vector-icons";

const dummyData = {
  id: "Eu-M3y8a5bIxIRXlCj9yHA",
  alias: "watan-kabob-mississauga",
  name: "Watan Kabob",
  image_url:
    "https://s3-media3.fl.yelpcdn.com/bphoto/2zSSlLBTbvBRF2FTt9gkpw/o.jpg",
  is_closed: false,
  url: "https://www.yelp.com/biz/watan-kabob-mississauga?adjust_creative=RJs2badp5_j-yUvsJHbFZg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=RJs2badp5_j-yUvsJHbFZg",
  review_count: 218,
  categories: [{ alias: "afghani", title: "Afghan" }],
  rating: 4.0,
  coordinates: { latitude: 43.6199294, longitude: -79.6692718 },
  transactions: [],
  price: "$$",
  location: {
    address1: "55 Matheson Boulevard E",
    address2: "Unit 2",
    address3: "",
    city: "Mississauga",
    zip_code: "L4Z 1X8",
    country: "CA",
    state: "ON",
    display_address: [
      "55 Matheson Boulevard E",
      "Unit 2",
      "Mississauga, ON L4Z 1X8",
      "Canada",
    ],
  },
  phone: "+19057122221",
  display_phone: "+1 905-712-2221",
  distance: 1193.440021503136,
};

const smallCardHeight = 100;
const bigCardHeight = 500;

const Card = ({}) => {
  const cardHeight = useRef(new Animated.Value(smallCardHeight)).current;
  const smallCardOpacity = useRef(new Animated.Value(1)).current;
  const bigCardOpacity = useRef(new Animated.Value(0)).current;

  const [expand, setExpand] = useState(false);

  useEffect(() => {
    if (expand) {
      Animated.parallel([
        Animated.timing(cardHeight, {
          toValue: bigCardHeight,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(smallCardOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(bigCardOpacity, {
          delay: 200,
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(cardHeight, {
          toValue: smallCardHeight,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(smallCardOpacity, {
          delay: 200,
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(bigCardOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [expand]);

  const smallCardView = () => (
    <Animated.View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        top: 10,
        left: 10,
        right: 10,
        opacity: smallCardOpacity,
      }}
    >
      <View style={{ marginLeft: 8 }}>
        <Text style={{ fontFamily: fonts[1700] }}>{dummyData.name}</Text>
        <Text
          style={{
            fontFamily: fonts[1300],
            color: secTextColor,
            fontSize: 12,
            marginTop: 6,
          }}
        >
          {dummyData.location.display_address[0]}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 6 }}>
          {Array(Math.floor(dummyData.rating))
            .fill()
            .map(() => (
              <Ionicons name={"star"} size={14} color={"#FFD924"} />
            ))}
          {Array(Math.floor(5 - dummyData.rating))
            .fill()
            .map(() => (
              <Ionicons name={"star"} size={14} color={"#9E9E9E"} />
            ))}
        </View>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: fonts[1300] }}>
          {"open: "}
          <View
            style={[
              {
                height: 8,
                width: 8,
                borderRadius: 8 / 2,
                backgroundColor: "#D0312D",
              },
              !dummyData.is_closed && { backgroundColor: "#028A0F" },
            ]}
          />
        </Text>
        <Text
          style={{
            fontFamily: fonts[1700],
            color: secTextColor,
            fontSize: 12,
          }}
        >
          {dummyData.price}
        </Text>
      </View>
    </Animated.View>
  );

  const bigCardView = () => (
    <Animated.View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        top: 10,
        left: 10,
        right: 10,
        opacity: bigCardOpacity,
      }}
    >
      <View style={{ marginLeft: 8 }}>
        <Text style={{ fontFamily: fonts[1700], fontSize: 25 }}>
          {dummyData.name}
        </Text>
        <Text
          style={{
            fontFamily: fonts[1300],
            color: secTextColor,
            fontSize: 12,
            marginTop: 6,
          }}
        >
          {dummyData.location.display_address[0]}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 6 }}>
          {Array(Math.floor(dummyData.rating))
            .fill()
            .map(() => (
              <Ionicons name={"star"} size={14} color={"#FFD924"} />
            ))}
          {Array(Math.floor(5 - dummyData.rating))
            .fill()
            .map(() => (
              <Ionicons name={"star"} size={14} color={"#9E9E9E"} />
            ))}
        </View>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: fonts[1300] }}>
          {"open: "}
          <View
            style={[
              {
                height: 8,
                width: 8,
                borderRadius: 8 / 2,
                backgroundColor: "#D0312D",
              },
              !dummyData.is_closed && { backgroundColor: "#028A0F" },
            ]}
          />
        </Text>
        <Text
          style={{
            fontFamily: fonts[1700],
            color: secTextColor,
            fontSize: 12,
          }}
        >
          {dummyData.price}
        </Text>
      </View>
    </Animated.View>
  );

  return (
    <Pressable
      onPress={() => setExpand((prev) => !prev)}
      style={styles.container}
    >
      <Animated.View
        style={{
          backgroundColor: "#FFF",
          shadowColor: "#171717",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
          borderRadius: 12,
          height: cardHeight,
        }}
      >
        {/* <Image
        source={{ uri: dummyData.image_url }}
        style={{
          height: 60,
          width: 60,
          backgroundColor: "red",
          borderRadius: 8,
        }}
      /> */}
        {smallCardView()}
        {bigCardView()}
      </Animated.View>
    </Pressable>
  );
};

export default Card;

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
