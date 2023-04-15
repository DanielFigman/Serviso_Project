import * as React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import CarouselComponent from "../../Features/Carousal";
import CarouselData from "../../Json_files/CarouselData";
import ScreenComponent from "../../FCComponents/ScreenComponent";
import  { ButtonText } from '../../FCComponents/Buttons';
import {ViewPropTypes} from 'deprecated-react-native-prop-types'; 


export default function MainScreen() {
/*
 * This file contains the Main Screen for the serviso component.
 * It displays several carousels with different items, as well as two buttons to navigate to other screens.
 */

  console.log("Success! :)");

  const renderItem = ({ item, index }) => {
    const textHeight = item.title.length > 15 ? 50 : 30; // adjust text height based on title length
    if (item.id != 1)
      return (
        <View style={[styles.item, { height: 120 + textHeight }]}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <Text style={styles.itemText}>{item.title}</Text>
          <Text style={[styles.itemText, { height: textHeight }]}>
            {item.text}
          </Text>
          <Text style={styles.itemText}>{item.price}</Text>
        </View>
      );
    else
      return (
        <View style={[styles.item2, { height: 120 + textHeight }]}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        </View>
      );
  };

  return (
    <ScreenComponent bottomMenu={true} topLeftButton={"none"}
      content={
        <>
        <View>
          <Text className="text-center siz">Serviso</Text>
        </View>
          <View style={{flexDirection: "row",justifyContent: "space-between",alignItems: "center",}}>
            {/* style is not renderind correctly with button integration */}
            <ButtonText text={"Perfect for you"} buttonStyle={{ paddingLeft: 50, fontWeight: "bold", fontSize: 30 }} navigate={"CreateUserScreen"}/>
            <ButtonText text={"To the concierge!"} buttonStyle={{ paddingRight: 40, fontSize: 12,fontWeight: "bold",color: "rgba(128, 128, 128, 1.0)" }} navigate={"CreateUserScreen"}/>
           
          </View>

          <View style={[styles.container, styles.carouselContainer]}>
            <CarouselComponent
              carouselItems={CarouselData.SpaCarousel}
              renderItem={renderItem}
              sliderWidth={300}
              itemWidth={180}
            />
          </View>

          <View style={[styles.container, styles.carouselContainer]}>
            <Text style={styles.titleText}>Something to snack on</Text>
            <CarouselComponent
              carouselItems={CarouselData.Food}
              renderItem={renderItem}
              sliderWidth={300}
              itemWidth={180}
            />
          </View>

          <View style={[styles.container, styles.carouselContainer]}>
            <CarouselComponent
              carouselItems={CarouselData.Food}
              renderItem={renderItem}
              sliderWidth={300}
              itemWidth={180}
            />
          </View>
        </>
      }
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start", // changed from 'center'
    backgroundColor: "#fff",
    paddingVertical: 20, // add padding to reduce space between carousels
    minHeight: 120,
  },

  item: {
    width: 170,
    height: 170,
    borderRadius: 20, // add borderRadius to make edges curved
    overflow: "hidden", // add overflow:hidden to hide the parts of the image outside the borderRadius
  },
  item2: {
    width: 190,
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  carouselContainer: {
    marginVertical: 10, // add margin between carousels
    marginLeft: -25,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 35,
    marginTop: -20,
  },
  itemText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
  },
});
