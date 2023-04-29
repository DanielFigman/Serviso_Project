import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Button } from "@rneui/themed";
import { HeartIcon } from "react-native-heroicons/outline";
import ScreenComponent from "../../FCComponents/ScreenComponent";
import HotelActivityCarouselCard from "../../FCComponents/Cards/HotelActivityCarouselCard";
import ConciergeCarouselCard from "../../FCComponents/Cards/ConciergeCarouselCard";
import MyCarousel from "../../FCComponents/MyCarousel";
import CarouselData from '../../Json_files/CarouselData';
import { useNavigation } from "@react-navigation/native";


const ActivitiesHotel = [
  {
    id: 1,
    name: "Yoga",
    url: "https://blog.salonbodyfitness.com/wp-content/uploads/2019/11/shutterstock_713186671-1.jpg",
  },
  {
    id: 2,
    name: "Children's playground",
    url: "https://www.delphinhotel.com/main_pics/pages/medium/1067.png",
  },
  {
    id: 3,
    name: "kayaks",
    url: "https://www.travelandleisure.com/thmb/nZgnBxJ47F7RvK3HOV_W2PGv808=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/201410-w-best-family-beach-hotels-hilton-waikoloa-village-2000-fead1d156bf842feb0d07da6c80fc330.jpg",
  },
  {
    id: 4,
    name: "Bicycle",
    url: "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/63b136b7085eb012ef91d1fd_Blog%20Graphic%20-%20web%20-%20to%20do%20for%20guests.jpg",
  },
];
const dataPerfactForYou = [
  {
    id: 1,
    name: "Timna Park",
    url: "https://igoogledisrael.com/wp-content/uploads/2016/05/timna_bs-e1523394536900.jpg",
  },
  {
    id: 2,
    name: "Underwater park",
    url: "https://i.pinimg.com/564x/b6/b8/44/b6b84498e2ccdb10173654cbe2732665.jpg",
  },
  {
    id: 3,
    name: "Dolphin Reef Beach",
    url: "https://www.israelmagazin.de/wp-content/webp-express/webp-images/uploads/2020/01/dolphin_reef_trainer_100300_550.jpg.webp",
  },
  {
    id: 4,
    name: "Ice Mall",
    url: "https://eilat.city/images/2195-%D7%A4%D7%90%D7%A8%D7%A7-%D7%94%D7%A7%D7%A8%D7%97-%D7%90%D7%99%D7%9C%D7%AA-23.jpg",
  },
];

const ConciergeMainScreen = () => {
  const navigation = useNavigation();

  return (
    <ScreenComponent
      content={
        <ScrollView>
          <View style={styles.topView}>
            <Text style={styles.titel}>Concierge</Text>
            <Button
              buttonStyle={{
                backgroundColor: "#ffffff",
                borderColor: "#000000",
                borderWidth: 1,
                borderRadius: 10,
              }}
              titleStyle={{ fontSize: 15, color: "#000000" }}
              containerStyle={{
                left: 15,
              }}
            >
              New Questionnaire
            </Button>
            <TouchableOpacity>
              <HeartIcon
                size={30}
                style={{ marginHorizontal: 10, top: 5 }}
                color={"black"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.view1}>
            <Text style={styles.text}>Questionnaire recommendations</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("ConciergeActivitiesScreen")}
            >
              <Text style={styles.button}>More</Text>
            </TouchableOpacity>
          </View>
          <View>
            <MyCarousel data={CarouselData.SpaCarousel} type={'default'} style={{width:"90%", alignSelf:"center", borderRadius:20, borderWidth:1}}/>
          </View>
          <View style={styles.view1}>
            <Text style={styles.text}>Without leaving the hotel</Text>
            <TouchableOpacity onPress={() => navigation.navigate("HotelActivitiesScreen")}>
              <Text style={styles.button}>More</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true}>
            {ActivitiesHotel.map((item) => (
              <HotelActivityCarouselCard key={item.id} item={item} />
            ))}
          </ScrollView>
          <View style={styles.view1}>
            <Text style={styles.text}>Recommended places to visit</Text>
            <TouchableOpacity onPress={() => navigation.navigate("ConciergeActivitiesScreen")}>
              <Text style={styles.button}>More</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} style={{ paddingBottom: -20 }}>
            {dataPerfactForYou.map((item) => (
              <ConciergeCarouselCard key={item.id} item={item} />
            ))}
          </ScrollView>
        </ScrollView>
      }
    />
  );
};

export default ConciergeMainScreen;

const styles = StyleSheet.create({
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titel: {
    fontSize: 30,
    fontWeight: "bold",
    marginHorizontal: 15,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 15,
    paddingTop: 10,
    flex: 1
  },
  view1: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  button: {
    fontSize: 15, fontWeight: "bold", top: 10, color: "#AEAEAE", marginHorizontal: 10
  }
});