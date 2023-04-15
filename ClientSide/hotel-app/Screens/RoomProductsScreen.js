import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import Products from "../Json_files/Products";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import "react-native-vector-icons/FontAwesome";
import ScreenComponent from "../FCComponents/ScreenComponent";
import { ButtonArrow, ButtonText } from "../FCComponents/Buttons";
import { HotelsAppContext } from "../Context/HotelsAppContext";
import Languages from "../Json_files/Languages";

// const navigation = useNavigation();

const RoomProductsScreen = () => {
  return (
    <ScreenComponent
      content={
        <SafeAreaView>
          <View>
            <Text style={styles.title}>Request</Text>
            <Products />
          </View>
        </SafeAreaView>
      }
    />
  );
};

export default RoomProductsScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    flex: 1,
  },
  title: {
    fontSize: 35,
    color: "#000000",
    alignSelf: "center",
    top: 20,
  },
  Image: {
    alignSelf: "center",
    width: 124,
    height: 160,
    top: 50,
  },
  Details: {
    alignSelf: "center",
    top: 50,
  },
  arrow: {
    color: "#8E8E8E",
    fontSize: 30,
    left: 10,
    top: 5,
  },
  arrowList: {
    color: "#8E8E8E",
    left: 4,
    top: 6,
  },
  listItemView: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    marginHorizontal: 20,
  },
  rowView: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    margin: 20,
  },
});
