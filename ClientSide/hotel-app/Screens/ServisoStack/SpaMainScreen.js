import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useContext } from "react";
import ScreenComponent from "../../FCComponents/ScreenComponent";
import SmallCard from "../../FCComponents/Cards/SmallCard";
import { useNavigation } from "@react-navigation/native";
import MyCarousel from "../../FCComponents/MyCarousel";
import Languages from "../../Json_files/Languages";
import { HotelsAppContext } from "../../Context/HotelsAppContext";

const { height } = Dimensions.get("window");

const SpaMainScreen = () => {
  const navigation = useNavigation();

  const upperViewHeight = height * 0.4; // the height of the image
  const lowerViewMarginTop = upperViewHeight - 250; // 50px margin

  const { language, facilities, therapies } = useContext(HotelsAppContext);
  const screenContent = Languages.SpaMainScreen;

  return (
    <ScreenComponent
      title={
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            width: "80%",
          }}
        ></View>
      }
      content={
        <View style={{ height: "100%" }}>
          <Image
            style={{ width: "100%", height: "35%", top: -height * 0.12 }}
            source={{
              uri: "https://media.istockphoto.com/id/1286682876/photo/beauty-treatment-items-for-spa-procedures-on-white-wooden-table-massage-stones-essential-oils.jpg?s=170667a&w=0&k=20&c=NtUpn6FnnwpwtUzNfl0rpd1bFs6B30sBQGsOMlOnX_I=",
            }}
          />
          <View style={[styles.container, { top: -lowerViewMarginTop - 10 }]}>
            <View style={styles.view1}>
              <Text style={styles.text}>
                {screenContent.MassageTreatments[language]}
              </Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              <ScrollView horizontal={true}>
                {therapies.map((item) => (
                  <SmallCard
                    key={item.therapyID}
                    item={item}
                    id={item.therapyID}
                    type={"SPA"}
                  />
                ))}
              </ScrollView>
              <View style={styles.view1}>
                <Text style={styles.text}>
                  {screenContent.TheSpaFacilities[language]}
                </Text>
              </View>
              <ScrollView horizontal={true}>
                {facilities.map(
                  (item) =>
                    item.type === "SPA" && (
                      <SmallCard
                        key={item.facilityID}
                        item={item}
                        id={item.facilityID}
                      />
                    )
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      }
    />
  );
};

export default SpaMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    left: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
    left: 5,
    top: 10,
  },
  view1: {
    flexDirection: "row",
    padding: 10,
  },
  textBT: {
    fontSize: 15,
    top: 10,
    left: 30,
  },
  textC: {
    fontSize: 20,
    textAlign: "center",
    padding: 12,
  },
});
