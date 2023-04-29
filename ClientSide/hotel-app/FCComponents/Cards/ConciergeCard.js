import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/base";
import { HeartIcon } from "react-native-heroicons/outline";

const ConciergeCard = ({ item }) => {
  const [favorite, setFavorite] = useState(item.favorite);
  return (
    <TouchableOpacity>
      <View style={styles.rowView}>
        <Image
          source={{ url: item.url }}
          style={{ width: 90, height: 90, borderRadius: 20 }}
        />
        <View>
          <Text style={styles.titeltext}>{item.name}</Text>
          <Text numberOfLines={2} style={styles.text}>
            {item.Details}
          </Text>
          <Text style={styles.text}>{item.price}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => setFavorite(!favorite)}>
            <HeartIcon
              size={30}
              color={favorite ? "red" : "black"}
              style={{ top: -25, left: 30 }}
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
              position: "absolute",
              right: -45,
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
    width: 200,
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