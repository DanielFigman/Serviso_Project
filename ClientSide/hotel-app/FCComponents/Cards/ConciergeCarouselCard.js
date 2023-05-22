import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { HeartIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import LoadingImage from "../LoadingImage";

const ConciergeCarouselCard = ({ item, id}) => {
  const [favorite, setFavorite] = useState(item.favorite);
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("CardScreen", {
      id,
      name: item.name,
      description: item.description,
      openingHours: item.openingHours,
      imageURL: item.imageURL,
      price: item.price,
      rating: item.rating,
      hallNum: item.HallNum,
      address:item.address,
    })}>
      <View
        style={{
          margin: 5,
          borderRadius: 20,
          backgroundColor: "#EDEDED",
        }}
      >
        <LoadingImage
          style={{
            resizeMode: "cover",
            width: 180,
            height: 150,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
          imageURL={item.imageURL}
        />
        <TouchableOpacity onPress={() => setFavorite(!favorite)}>
          <HeartIcon
            size={35}
            color={"white"}
            style={{ top: -145, left: 140 }}
            fill={favorite ? "red" : "#a9a9a9"}
          />
        </TouchableOpacity>
        <View style={{ padding: 5, alignItems: "center" }}>
          <Text
            style={{
              marginVertical: 4,
              fontSize: 17,
            }}
          >
            {item.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ConciergeCarouselCard;