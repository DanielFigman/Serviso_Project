import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SmallCard = ({ item, id, type}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("CardScreen", {
      id,
      name: item.name,
      description: item.description,
      openingHours: item.openingHours,
      imageURL: item.imageURL,
      phone: item.contactNumber,
      price: item.price,
      basePrice: item.basePrice,
      priceForAdditional15: item.priceForAdditional15,
      buttonType: type
    })}>
      <View
        style={{
          margin: 5,
          borderRadius: 20,
          backgroundColor: "#EDEDED",
        }}
      >
        <Image
          source={{ uri: item.imageURL }}
          style={{
            resizeMode: "cover",
            width: 180,
            height: 150,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        />
        <View style={{ padding: 5, alignItems: "center" }}>
          <Text
            style={{
              marginVertical: 4,
              fontSize: 17,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 17,
            }}
          >
            {item.price ? item.price + "₪" : ""}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};


export default SmallCard;