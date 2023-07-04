import { Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@rneui/base";
import { HeartIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import LoadingImage from "../LoadingImage";
import { HotelsAppContext } from "../../Context/HotelsAppContext";

const HotelActivityCarouselCard = ({ item, id}) => {
  const [favorite, setFavorite] = useState(item.favorite);
  const navigation = useNavigation();

  const { setUpdatedActivities, updatedActivities} = useContext(HotelsAppContext)

  useEffect(() => {
      const filteredActivities = updatedActivities.filter(obj => obj.placeID === item.placeID);
      const fav = filteredActivities.length > 0 ? filteredActivities[0].favorite : null;

      if (fav === undefined || fav === null) {
          setFavorite(false);
      } else {
          setFavorite(fav);
      }
  }, [updatedActivities]);




  useEffect(() => {
      if (favorite != null) {
          if (updatedActivities.filter(obj => obj.placeID === item.placeID).length > 0) {
              const activities = updatedActivities.map(obj => {
                  if (obj.placeID === item.placeID) {
                      obj.favorite = favorite;
                  }
                  return obj;
              });
              setUpdatedActivities(activities);
          } else {
              let newActivityUpdate = {
                  placeID: item.placeID,
                  favorite: favorite
              };
              setUpdatedActivities([...updatedActivities, newActivityUpdate]);
          }
      }
  }, [favorite]);

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
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View>
              <Text
                numberOfLines={2}
                style={{
                  marginVertical: 4,
                  fontSize: 16,
                  width: 100,
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                FREE
              </Text>
            </View>
            <Button
              buttonStyle={{
                backgroundColor: "#a9a9a9",
                borderColor: "#c0c0c0",
                borderWidth: 1,
                borderRadius: 10,
              }}
              titleStyle={{ fontSize: 15, color: "#ffffff" }}
              containerStyle={{
                width: 70,
                padding: 2,
              }}
            //   onPress={""}
            >
              Sign me up
            </Button>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HotelActivityCarouselCard;