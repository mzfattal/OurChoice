import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  fonts,
  horizontalMargin,
  marginTop,
  secTextColor,
} from "../../../../constants";
import {
  Ionicons,
  AntDesign,
  FontAwesome,
  Feather,
  Entypo,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Swipeable from "react-native-gesture-handler/Swipeable";

const deviceWidth = Dimensions.get("window").width;
const smallCardHeight = 84;
const bigCardHeight = 500;

const Card = ({ place }) => {
  const _place = place.item;

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

  const renderOpenStatus = (isOpen) => {
    if (isOpen)
      return (
        <View
          style={[
            {
              backgroundColor: "#03C04A",
              height: 20,
              borderRadius: 10,
              paddingHorizontal: 8,
              marginLeft: 8,
            },
          ]}
        >
          <Text style={{ fontFamily: fonts[1700], color: "#FFFFFF" }}>
            {"open"}
          </Text>
        </View>
      );

    return (
      <View
        style={[
          {
            backgroundColor: "#FF5C5C",
            height: 20,
            borderRadius: 10,
            paddingHorizontal: 8,
            marginLeft: 8,
          },
        ]}
      >
        <Text style={{ fontFamily: fonts[1700], color: "#FFFFFF" }}>
          {"closed"}
        </Text>
      </View>
    );
  };

  const renderPrice = (price) => {
    if (!price) return <View />;
    return (
      <View
        style={{
          backgroundColor: "#CCCCCC",
          height: 18,
          borderRadius: 10,
          paddingHorizontal: 8,
        }}
      >
        <Text style={{ fontFamily: fonts[1700], color: "#000000" }}>
          {price}
        </Text>
      </View>
    );
  };

  const renderDistance = (distance) => {
    const filteredDistance = distance * 0.001;
    return (
      <Text style={{ fontFamily: fonts[1700], color: "#000000" }}>
        {filteredDistance.toFixed(2)} {"km"}
      </Text>
    );
  };

  const renderRating = (rating) => {
    return (
      <View style={{ flexDirection: "row", marginTop: 6 }}>
        {Array(Math.floor(rating))
          .fill()
          .map(() => (
            <AntDesign name="star" size={14} color={"#FFD924"} />
          ))}
        {Array(Math.ceil(5 - rating))
          .fill()
          .map(() => (
            <AntDesign name="star" size={14} color={"#9E9E9E"} />
          ))}
        <Text
          style={{
            fontFamily: expand ? fonts[1700] : fonts[1300],
            fontSize: expand ? 14 : 12,
            color: expand ? "#FFFFFF" : secTextColor,
            marginLeft: 4,
          }}
        >
          {`(${_place.review_count})`}
        </Text>
      </View>
    );
  };

  const renderBigCardImageWithOverlay = () => {
    return (
      <View>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={{
            width: deviceWidth - 16 * 2,
            height: 160,
            position: "absolute",
            zIndex: 5,
            bottom: 0,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            marginHorizontal: 16,
            marginBottom: 10,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: fonts[1900],
                color: "#FFFFFF",
                fontSize: 24,
              }}
            >
              {_place.name}
            </Text>
            {renderRating(_place.rating)}
          </View>
          {renderOpenStatus(!_place.is_closed)}
        </View>
        <Image
          source={{ uri: _place.image_url }}
          resizeMode="cover"
          style={{
            width: deviceWidth - 16 * 2,
            height: 250,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />
      </View>
    );
  };

  const renderBigCardAction = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 150,
            marginTop: 36,
          }}
        >
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
              backgroundColor: "#FF5C5C",
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome name="close" size={26} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
              backgroundColor: "#98FF98",
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome name="check" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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
        <Text style={{ fontFamily: fonts[1900], fontSize: 18 }}>
          {_place.name.length < 20
            ? _place.name
            : _place.name.substring(0, 20) + "..."}
        </Text>
        <Text
          style={{
            fontFamily: fonts[1300],
            color: secTextColor,
            fontSize: 12,
            marginTop: 4,
          }}
        >
          {_place.location.display_address[0]}
        </Text>
        {renderRating(_place.rating)}
      </View>
      <View style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {renderPrice(_place.price)}
          {renderOpenStatus(!_place.is_closed)}
        </View>
        {renderDistance(_place.distance)}
      </View>
    </Animated.View>
  );

  const bigCardView = () => (
    <Animated.View
      style={{
        opacity: bigCardOpacity,
      }}
    >
      {renderBigCardImageWithOverlay()}
      <View style={{ marginTop: 8, marginHorizontal: 16 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 0.9 }}>
            <Text
              style={{
                fontFamily: fonts[1300],
                color: secTextColor,
                fontSize: 12,
                marginTop: 6,
              }}
            >
              {"Address:"}
            </Text>
            <Text
              style={{
                fontFamily: fonts[1700],
                fontSize: 14,
                marginTop: 2,
              }}
            >
              {_place.location.display_address.join(", ")}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              flex: 0.1,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Ionicons name="navigate-circle" size={32} color="#2C6ACC" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ flex: 0.5 }}>
            <Text
              style={{
                fontFamily: fonts[1300],
                color: secTextColor,
                fontSize: 12,
                marginTop: 6,
              }}
            >
              {"Phone Number:"}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome name="phone-square" size={20} color="#03C04A" />
              <Text
                style={{
                  fontFamily: fonts[1700],
                  fontSize: 14,
                  marginLeft: 4,
                  marginTop: 2,
                }}
              >
                {_place.display_phone}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ flex: 0.2, alignItems: "flex-end" }}>
            <Text
              style={{
                fontFamily: fonts[1300],
                color: secTextColor,
                fontSize: 12,
                marginTop: 6,
              }}
            >
              {"Price:"}
            </Text>
            <Text
              style={{
                fontFamily: fonts[1700],
                fontSize: 14,
                marginTop: 2,
              }}
            >
              {renderPrice(_place.price)}
            </Text>
          </View>
          <View style={{ flex: 0.3, alignItems: "flex-end" }}>
            <Text
              style={{
                fontFamily: fonts[1300],
                color: secTextColor,
                fontSize: 12,
                marginTop: 6,
              }}
            >
              {"Distance:"}
            </Text>
            <Text
              style={{
                fontFamily: fonts[1700],
                fontSize: 14,
                marginTop: 2,
              }}
            >
              {renderDistance(_place.distance)}
            </Text>
          </View>
        </View>

        {renderBigCardAction()}
      </View>
    </Animated.View>
  );

  const renderLeftActions = () => (
    <View style={{ width: 50, height: 50, backgroundColor: "green" }} />
  );

  return (
    <Pressable
      onPress={() => setExpand((prev) => !prev)}
      style={styles.container}
    >
      <Swipeable renderLeftActions={renderLeftActions}>
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
          {smallCardView()}
          {bigCardView()}
        </Animated.View>
      </Swipeable>
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
