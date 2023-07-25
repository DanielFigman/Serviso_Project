import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@rneui/base";
import { HeartIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import LoadingImage from "../LoadingImage";
import { HotelsAppContext } from "../../Context/HotelsAppContext";

const HotelActivityCard = ({ item, id }) => {
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
      <View style={styles.rowView}>
        <LoadingImage
          style={{ width: 90, height: 95, borderRadius: 20 }}
          imageURL={item.imageURL}
        />
        <View>
          <Text style={styles.titeltext}>{item.name}</Text>
          <Text numberOfLines={2} style={styles.text}>
            {item.description}
          </Text>
        </View>
        <View style={{justifyContent:"center"}}>
          <TouchableOpacity onPress={() => setFavorite(!favorite)}>
            <HeartIcon
              size={30}
              color={favorite ? "red" : "black"}
              style={{left: 12 }}
            />
          </TouchableOpacity>
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