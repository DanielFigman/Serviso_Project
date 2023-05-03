import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import ScreenComponent from "../../FCComponents/ScreenComponent";
import SmallCard from "../../FCComponents/Cards/SmallCard";
import { useNavigation } from "@react-navigation/native";
import MyCarousel from "../../FCComponents/MyCarousel";
import Languages from "../../Json_files/Languages";
import { HotelsAppContext } from "../../Context/HotelsAppContext";

const spaOptions = [
  {
    id: 1,
    name: "Swedish Massage",
    price: "250₪",
    url: "https://smb.ibsrv.net/imageresizer/image/article_manager/1200x1200/17220/291800/heroimage0.190644001621610009.jpg",
    imageUrl: "https://smb.ibsrv.net/imageresizer/image/article_manager/1200x1200/17220/291800/heroimage0.190644001621610009.jpg"
  },
  {
    id: 2,
    name: "Hot Stone Massage",
    price: "320₪",
    url: "https://img1.wsimg.com/isteam/stock/BNQKEo8/:/rs=w:984,h:738",
    imageUrl: "https://img1.wsimg.com/isteam/stock/BNQKEo8/:/rs=w:984,h:738"

  },
  {
    id: 3,
    name: "Prenatal Massage",
    price: "340₪",
    url: "https://www.somanovo.com/wp-content/uploads/2018/11/feature_prenatal-640x380.jpg",
    imageUrl: "https://www.somanovo.com/wp-content/uploads/2018/11/feature_prenatal-640x380.jpg"

  },
  {
    id: 4,
    name: "Combined Massage",
    price: "250₪",
    url: "https://massageofsantafe.com/wp-content/uploads/2022/09/deep-tissue-massage.jpg",
    imageUrl: "https://massageofsantafe.com/wp-content/uploads/2022/09/deep-tissue-massage.jpg"

  },
];

const SpaFacilities = [
  {
    id: 1,
    name: "Dry sauna",
    url: "https://img-aws.ehowcdn.com/640x425/photos.demandstudios.com/getty/article/240/146/178560558.jpg?type=webp",
  },
  {
    id: 2,
    name: "Turkish Hammam",
    url: "https://cdn.shopify.com/s/files/1/0013/5603/8193/files/turkish-bath-1.jpg?v=1548915220",
  },
  {
    id: 3,
    name: "Jacuzzi",
    url: "https://images.squarespace-cdn.com/content/v1/58a215afe58c62800b04d4f7/1524079127047-RT0EHGPAVYDQ0EDC9UUV/IMGP3128-650px.jpg?format=750w",
  },
  {
    id: 4,
    name: "Indoor swimming pool",
    url: "https://www.rismedia.com/wp-content/uploads/2022/01/render-of-a-luxury-hotel-swimming-pool-picture-id1331465591-1024x594.jpg",
  },
];

const SpaMainScreen = () => {
  const navigation = useNavigation();

  const { language, facilities, therapies } = useContext(HotelsAppContext);
  const screenContent = Languages.SpaMainScreen;

  return (
    <ScreenComponent
      title={<View style={{flexDirection:"column", justifyContent:"center", width:"80%"}}><Text style={styles.title}>{screenContent.Spa[language]}</Text></View>}
      content={
        <ScrollView style={styles.container}>
          {/* <Text style={styles.title}>{screenContent.Spa[language]}</Text> */}
          <View><MyCarousel data={facilities.filter(x => x.type === "SPA")} /></View>
          <View style={styles.view1}>
            <Text style={styles.text}>{screenContent.MassageTreatments[language]}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SpaTreatmenScreen")}>
              <Text style={styles.textBT}>{screenContent.ForMoreTreatments[language]}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginVertical: 10 }}>
            <ScrollView horizontal={true}>
              {therapies.map((item) => (
                <SmallCard key={item.therapyID} item={item} id={item.therapyID} type={"SPA"}/>
              ))}
            </ScrollView>
            <Text style={styles.textC}>{screenContent.TheSpaFacilities[language]}</Text>
            <ScrollView horizontal={true}>
              {facilities.map((item) => item.type === "SPA" && (
                <SmallCard key={item.facilityID} item={item} id={item.facilityID} />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
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
