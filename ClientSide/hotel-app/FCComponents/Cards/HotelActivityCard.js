import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/base";
import { HeartIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const HotelActivityCard = ({ item, id }) => {
  const [favorite, setFavorite] = useState(item.favorite);
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("CardScreen", {
      id,
      name: item.name,
      description: item.description,
      openingHours: item.openingHours,
      imageURL: item.imageURL,
      price: "FREE",
      rating: item.rating,
      hallNum: item.HallNum,
    })}>
      <View style={styles.rowView}>
        <Image
          source={{ url: item.imageURL }}
          style={{ width: 90, height: 95, borderRadius: 20 }}
        />
        <View>
          <Text style={styles.titeltext}>{item.name}</Text>
          <Text numberOfLines={2} style={styles.text}>
            {item.description}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => setFavorite(!favorite)}>
            <HeartIcon
              size={30}
              color={favorite ? "red" : "black"}
              style={{ top: -2, left: 12 }}
            />
          </TouchableOpacity>
          <Button
            buttonStyle={{
              backgroundColor: "#a9a9a9",
              borderColor: "#c0c0c0",
              borderWidth: 1,
              borderRadius: 10,
            }}
            titleStyle={{ fontSize: 15, color: "#ffffff" }}
            containerStyle={{
              width: 65,
              right: 5,
            }}
            //   onPress={""}
          >
            Sing me up
          </Button>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HotelActivityCard;

const styles = StyleSheet.create({
  titeltext: {
    fontSize: 20,
    padding: 10,
    width: 220,
  },
  text: {
    fontSize: 15,
    flex: 1,
    paddingLeft: 8,
    width: 180,
  },
  rowView: {
    flexDirection: "row",
    marginTop: 15,
    backgroundColor: "#EDEDED",
    marginLeft: 10,
    marginRight: 10,
  },
});