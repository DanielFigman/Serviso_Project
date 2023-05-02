import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useContext } from "react";
import ConciergeCard from "../../FCComponents/Cards/ConciergeCard";
import ScreenComponent from "../../FCComponents/ScreenComponent";
import Languages from "../../Json_files/Languages";
import { HotelsAppContext } from "../../Context/HotelsAppContext";

const ConciergeActivitiesScreen = () => {

  const { language, activities_nearBy } = useContext(HotelsAppContext);
  const screenContent = Languages.ConciergeActivitiesScreen

  return (
    <ScreenComponent
      title={
        <View style={{width:"80%"}}>
          <Text style={styles.text}>{screenContent.RecommendedActivitiesInTheArea[language]}</Text>
        </View>
      }
      content={
        <ScrollView>

          {activities_nearBy.map((item) => (
            <ConciergeCard key={item.PlaceID} item={item} id={item.placeID}/>
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
