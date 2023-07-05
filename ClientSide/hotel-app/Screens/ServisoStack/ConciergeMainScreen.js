import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { Button } from "@rneui/themed";
import { HeartIcon } from "react-native-heroicons/outline";
import ScreenComponent from "../../FCComponents/ScreenComponent";
import HotelActivityCarouselCard from "../../FCComponents/Cards/HotelActivityCarouselCard";
import ConciergeCarouselCard from "../../FCComponents/Cards/ConciergeCarouselCard";
import MyCarousel from "../../FCComponents/MyCarousel";
import CarouselData from '../../Json_files/CarouselData';
import { useNavigation } from "@react-navigation/native";
import Languages from "../../Json_files/Languages";
import { HotelsAppContext } from "../../Context/HotelsAppContext";




const ConciergeMainScreen = () => {
  const navigation = useNavigation();

  const { language, activities_nearBy, activities_hotel, suggestedActivities } = useContext(HotelsAppContext);
  const screenContent = Languages.ConciergeMainScreen;

  return (
    <ScreenComponent
      title={
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
            }}
            onPress={() => navigation.navigate("QuestionaireScreen")}
          >
            {screenContent.Questionnaire[language]}
          </Button>
          <TouchableOpacity onPress={() => navigation.navigate("FavoritesScreen")}>
            <HeartIcon
              size={30}
              style={{ marginHorizontal: 10, top: 5 }}
              color={"black"}
            />
          </TouchableOpacity>
        </View>
      }
      content={
        <ScrollView>
          <View style={styles.view1}>
            <Text style={styles.text}> {screenContent.QuestionnaireRecommendations[language]}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("ConciergeActivitiesScreen", {
                data: suggestedActivities
              }
              )}
            >
              <Text style={styles.button}> {screenContent.More[language]}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <MyCarousel data={suggestedActivities} type={'default'} style={{ width: "90%", alignSelf: "center", borderRadius: 20, borderWidth: 1 }} />
          </View>
          <View style={styles.view1}>
            <Text style={styles.text}> {screenContent.WithoutLeavingTheHotel[language]}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("HotelActivitiesScreen")}>
              <Text style={styles.button}> {screenContent.More[language]}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true}>
            {activities_hotel.map((item) => (
              <HotelActivityCarouselCard key={item.placeID} item={item} id={item.placeID} />
            ))}
          </ScrollView>
          <View style={styles.view1}>
            <Text style={styles.text}> {screenContent.RecommendedPlacesToVisit[language]}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("ConciergeActivitiesScreen", {
                data: activities_nearBy
              })}>
              <Text style={styles.button}>{screenContent.More[language]}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} style={{ paddingBottom: -20 }}>
            {activities_nearBy.map((item) => (
              <ConciergeCarouselCard key={item.placeID} item={item} id={item.placeID} />
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