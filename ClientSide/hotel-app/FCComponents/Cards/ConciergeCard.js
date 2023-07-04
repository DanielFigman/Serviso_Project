import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@rneui/base";
import { HeartIcon } from "react-native-heroicons/outline";
import LoadingImage from "../LoadingImage";
import { HotelsAppContext } from "../../Context/HotelsAppContext";

const ConciergeCard = ({ item, id }) => {
  const [favorite, setFavorite] = useState(item.favorite);


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
    <TouchableOpacity>
      <View style={[styles.rowView, { width: "100%" }]}>
        <View style={{ width: "20%" }}>
          <LoadingImage
            style={{ height: 90, borderRadius: 20 }}
            imageURL={item.imageURL}
          />
        </View>
        <View style={{ width: "60%" }}>
          <Text style={styles.titeltext}>{item.name}</Text>
          <Text numberOfLines={2} style={styles.text}>
            {item.description}
          </Text>
          <Text style={styles.text}>{item.price}</Text>
        </View>
        <View style={{ width: "20%" }}>
          <TouchableOpacity onPress={() => setFavorite(!favorite)}>
            <HeartIcon
              size={30}
              color={favorite ? "red" : "black"}
              style={{ top: -25, left: 20 }}
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
              position: "absolute",
              right: 20,
              top: 10,
            }}
          //   onPress={""}
          >
            Call
          </Button>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ConciergeCard;

const styles = StyleSheet.create({
  titeltext: {
    fontSize: 20,
    padding: 5,
  },
  text: {
    fontSize: 15,
    flex: 1,
    paddingLeft: 8,
  },
  rowView: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
    backgroundColor: "#EDEDED",
    marginLeft: 10,
    marginRight: 10,
  },
});