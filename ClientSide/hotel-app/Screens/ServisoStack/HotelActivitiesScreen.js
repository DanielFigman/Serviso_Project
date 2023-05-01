import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Image,
} from "react-native";
import React, { useContext } from "react";
import ScreenComponent from "../../FCComponents/ScreenComponent";
import HotelActivityCard from "../../FCComponents/Cards/HotelActivityCard";
import { HotelsAppContext } from "../../Context/HotelsAppContext";
import Languages from "../../Json_files/Languages";

const HotelActivitieScreen = () => {

  const { language, activities_hotel } = useContext(HotelsAppContext);
  const screenContent = Languages.HotelActivitieScreen;

  return (
    <ScreenComponent
      title={
        <View style={{width:"80%"}}>
          <Text style={styles.text}>{screenContent.WithoutLeavingTheHotel[language]}</Text>
        </View>
      }
      content={
        <ScrollView>

          {activities_hotel.map((item) => (
            <HotelActivityCard key={item.placeID} item={item} id={item.placeID}/>
          ))}
        </ScrollView>
      }
    />
  );
};

export default HotelActivitieScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 15,
    paddingTop: 10,
    textAlign: "center",
  },
});