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
  
  const ActivitiesHotel = [
    {
      id: 1,
      name: "Yoga",
      Description: "All day at 6:00",
      url: "https://blog.salonbodyfitness.com/wp-content/uploads/2019/11/shutterstock_713186671-1.jpg",
    },
    {
      id: 2,
      name: "Children's playground",
      Description: "Open every day from 08:30 to 17:30",
      url: "https://www.delphinhotel.com/main_pics/pages/medium/1067.png",
    },
    {
      id: 3,
      name: "kayaks",
      Description: "Open every day from 07:30 to 18:00",
      url: "https://www.travelandleisure.com/thmb/nZgnBxJ47F7RvK3HOV_W2PGv808=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/201410-w-best-family-beach-hotels-hilton-waikoloa-village-2000-fead1d156bf842feb0d07da6c80fc330.jpg",
    },
    {
      id: 4,
      name: "Bicycle",
      Description: "Open every day and every hour",
      url: "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/63b136b7085eb012ef91d1fd_Blog%20Graphic%20-%20web%20-%20to%20do%20for%20guests.jpg",
    },
  ];
  
  const HotelActivitieScreen = () => {

    const {language} = useContext(HotelsAppContext);
    const screenContent = Languages.HotelActivitieScreen;

    return (
      <ScreenComponent
        content={
          <ScrollView>
            <View>
              <Text style={styles.text}>{screenContent.WithoutLeavingTheHotel[language]}</Text>
            </View>
            {ActivitiesHotel.map((item) => (
              <HotelActivityCard key={item.id} item={item} />
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