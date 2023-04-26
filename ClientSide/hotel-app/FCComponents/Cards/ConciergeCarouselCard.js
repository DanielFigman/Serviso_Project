import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { HeartIcon } from "react-native-heroicons/outline";

const ConciergeCarouselCard = ({ item }) => {
  const [favorite, setFavorite] = useState(item.favorite);

  return (
    <TouchableOpacity>
      <View
        style={{
          margin: 5,
          borderRadius: 20,
          backgroundColor: "#EDEDED",
        }}
      >
        <Image
          source={{ uri: item.url }}
          style={{
            resizeMode: "cover",
            width: 180,
            height: 150,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
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