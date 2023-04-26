import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React from "react";
import ConciergeCard from "../../FCComponents/Cards/ConciergeCard";
import ScreenComponent from "../../FCComponents/ScreenComponent";

const dataPerfactForYou = [
  {
    id: 1,
    name: "Timna Park",
    Details: "Open from 08:00 to 16:00",
    price: "32-45₪",
    url: "https://igoogledisrael.com/wp-content/uploads/2016/05/timna_bs-e1523394536900.jpg",
  },
  {
    id: 2,
    name: "Underwater park",
    Details: "Open from 09:00 to 16:00",
    price: "85-125₪",
    url: "https://i.pinimg.com/564x/b6/b8/44/b6b84498e2ccdb10173654cbe2732665.jpg",
  },
  {
    id: 3,
    name: "Dolphin Reef Beach",
    Details: "Open from 09:00 to 17:00, closed on Sunday",
    price: "48-69₪",
    url: "https://www.israelmagazin.de/wp-content/webp-express/webp-images/uploads/2020/01/dolphin_reef_trainer_100300_550.jpg.webp",
  },
  {
    id: 4,
    name: "Ice Mall",
    Details: "Open from 09:30 to 23:00",
    price: "Free entry",
    url: "https://eilat.city/images/2195-%D7%A4%D7%90%D7%A8%D7%A7-%D7%94%D7%A7%D7%A8%D7%97-%D7%90%D7%99%D7%9C%D7%AA-23.jpg",
  },
];

const ConciergeActivitiesScreen = () => {
  return (
    <ScreenComponent
      content={
        <ScrollView>
          <View>
            <Text style={styles.text}>Recommended activities in the area</Text>
          </View>
          {dataPerfactForYou.map((item) => (
            <ConciergeCard key={item.id} item={item} />
          ))}
        </ScrollView>
      }
    />
  );
};

export default ConciergeActivitiesScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 15,
    paddingTop: 10,
    textAlign: "center",
  },
});
