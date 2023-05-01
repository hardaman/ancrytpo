import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  FlatList,
  ImageBackground,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import SlidingUpPanel from "rn-sliding-up-panel";

import { TransactionList, Card } from "./TransactionList";

const { width: screenWidth } = Dimensions.get("window");
const carouselItemWidth = screenWidth * 0.63;

const ITEM_WIDTH = Dimensions.get("window").width * 0.8;
const ITEM_HEIGHT = Dimensions.get("window").height * 0.6;

const NFTComponent = ({ nftCount }) => {
  return (
    <View style={styles.nftContainer}>
      <View style={styles.nftIconContainer}>
        <Ionicons name="ios-cube-outline" size={20} color="white" />
      </View>
      <View style={styles.nftTextContainer}>
        <Text style={styles.nftCount}>{nftCount}</Text>
        <Text style={styles.nftLabel}>Total NFTs</Text>
      </View>
    </View>
  );
};

const MyScreen = () => {
  const transMaxNft = 1

  const [nftcount, setNFTCount] = useState(0);

  const updateNFTCount = () => {
    if(nftcount < transMaxNft) {
    setNFTCount((prevCount) => prevCount + 1);
    }
  };

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      name: "Chat",
      completed: 2,
      total: 5,
    },
    {
      id: 2,
      name: "Pay Transaction",
      completed: 1,
      total: 4,
    },
    {
      id: 3,
      name: "Gift",
      completed: 0,
      total: 2,
    },
  ]);
  const [hiddenImageHeight, setHiddenImageHeight] = useState("0%");
  const [imageOpacity, setImageOpacity] = useState(1);

  const onPressCard = () => {
    setHiddenImageHeight((prevHeight) => {
      if (prevHeight === "0%") {
        setImageOpacity(imageOpacity - 0.33);
        return "33.33%";
      } else if (prevHeight === "33.33%") {
        setImageOpacity(imageOpacity - 0.33);
        return "66.66%";
      } else if (prevHeight === "66.66%") {
        setImageOpacity(imageOpacity - 0.33);
        return "100%";
      } else {
        return prevHeight;
      }
    });
  };

  const carouselData = [
    {
      title: "Card 1",
      description: "Complete your 30 transactions for reveal 1st NFT",
      image: require("./assets/card1.jpg"),
     
      messageIcon: "md-chatbubbles-outline",
      shareIcon: "md-share-outline",
      lockedIcon: "md-lock-closed",
      isLocked: true,
    },
    {
      title: "Card 2",
      description: "Complete your 30 transactions for reveal 1st NFT",
      image: require("./assets/card1.jpg"),
      hiddenImage: require("./assets/nft.jpg"),
      messageIcon: "md-chatbubbles-outline",
      shareIcon: "md-share-outline",
      lockedIcon: "md-lock-closed",
      isLocked: false,
    },
    {
      title: "Card 3",
      description: "Complete your 30 transactions for reveal 1st NFT",
      image: require("./assets/card1.jpg"),
     
      messageIcon: "md-chatbubbles-outline",
      shareIcon: "md-share-outline",
      lockedIcon: "md-lock-closed",
      isLocked: true,
    },
  ];

  const renderCard = ({ item }) => (
    <Card
      title={item.title}
      description={item.description}
      image={item.image}
      hiddenImage={item.hiddenImage}
      messageIcon={item.messageIcon}
      shareIcon={item.shareIcon}
      lockedIcon={item.lockedIcon}
      isLocked={item.isLocked}
      transactions={transactions}
      setTransactions={setTransactions}
      onPressCard={onPressCard}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2b2d3b" />
      <View style={styles.blackContainer}>
        <View style={styles.topBar}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <NFTComponent nftCount={nftcount} />
          <View style={styles.icons}>
            <Ionicons name="md-chatbubbles-outline" size={24} color="white" />
            <Ionicons
              name="md-information-circle-outline"
              size={24}
              color="white"
            />
          </View>
        </View>
        <View style={{ display: "flex", alignItems: "center" }}>
          <Text style={styles.text}>3D Architectural Walkthrough</Text>
        </View>
      </View>

      <View style={styles.redContainer}></View>
      <View style={styles.carouselContainer}>
        <Carousel
          data={carouselData}
          renderItem={renderCard}
          sliderWidth={screenWidth}
          itemWidth={carouselItemWidth}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          backgroundColor="transparent"
          lockScrollWhileSnapping={true}
        />
      </View>
      <View style={styles.listContainer}>
        <TransactionList
          transactions={transactions}
          onPressCard={onPressCard}
          Card={Card} updateNFTCount={updateNFTCount}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    opacity: 0.81,
    lineHeight: 68,
    fontWeight: "normal",
    fontFamily: "Helvetica Neue",
  },
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  nftContainer: {
    marginLeft: 24,
    flexDirection: "row",
    backgroundColor: "#373948",
    borderRadius: 45,
    paddingHorizontal: 28,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  nftIconContainer: {
    backgroundColor: "#5c5e6e",
    borderRadius: 40,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    marginLeft: -12,
  },
  nftTextContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  nftCount: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "left",
    color: "white",
  },
  nftLabel: {
    color: "grey",
    fontWeight: "500",
    fontSize: 12,
    textAlign: "left",
  },
  icons: {
    flexDirection: "row",
    gap: 12,
  },
  blackContainer: {
    flex: 4.5,
    backgroundColor: "#2b2d3b",
  },
  redContainer: {
    flex: 6,
    backgroundColor: "#181920",
  },
  carouselContainer: {
    position: "absolute",
    bottom: 250,
    left: 0,
    right: 0,
    paddingBottom: 20,
    paddingHorizontal: 0,
    backgroundColor: "transparent",
    zIndex: 999,
  },
  carouselItemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  carouselItemBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    resizeMode: "cover",
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 10,
    overflow: "hidden",
  },
  carouselItemBottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT / 3,
    backgroundColor: "black",
    opacity: 0.7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  carouselItemIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  listContainer: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    paddingBottom: 20,
    paddingHorizontal: 0,
    backgroundColor: "transparent",
    zIndex: 999,
  },
});

export default MyScreen;
