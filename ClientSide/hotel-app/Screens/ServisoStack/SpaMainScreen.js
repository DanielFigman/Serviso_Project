import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
import ScreenComponent from "../../FCComponents/ScreenComponent";
import SmallCard from "../../FCComponents/Cards/SmallCard";
import { useNavigation } from "@react-navigation/native";
  
  const spaOptions = [
    {
      id: 1,
      name: "Swedish Massage",
      price: "250₪",
      url: "https://smb.ibsrv.net/imageresizer/image/article_manager/1200x1200/17220/291800/heroimage0.190644001621610009.jpg",
    },
    {
      id: 2,
      name: "Hot Stone Massage",
      price: "320₪",
      url: "https://img1.wsimg.com/isteam/stock/BNQKEo8/:/rs=w:984,h:738",
    },
    {
      id: 3,
      name: "Prenatal Massage",
      price: "340₪",
      url: "https://www.somanovo.com/wp-content/uploads/2018/11/feature_prenatal-640x380.jpg",
    },
    {
      id: 4,
      name: "Combined Massage",
      price: "250₪",
      url: "https://massageofsantafe.com/wp-content/uploads/2022/09/deep-tissue-massage.jpg",
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
    return (
      <ScreenComponent
        content={
          <ScrollView style={styles.container}>
            <Text style={styles.title}>Spa</Text>
            <Text>Put a carosel</Text>
            <View style={styles.view1}>
              <Text style={styles.text}>MASSAGE TREATMENTS</Text>
              <TouchableOpacity onPress={() => navigation.navigate("SpaTreatmenScreen")}>
                <Text style={styles.textBT}>for more treatmants</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 10 }}>
              <ScrollView horizontal={true}>
                {spaOptions.map((item) => (
                  <SmallCard key={item.id} item={item} />
                ))}
              </ScrollView>
              <Text style={styles.textC}>The spa facilities</Text>
              <ScrollView horizontal={true}>
                {SpaFacilities.map((item) => (
                  <SmallCard key={item.id} item={item} />
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
    },
    text: {
      fontSize: 17,
      fontWeight: "bold",
      left: 5,
      Top: 10,
    },
    view1: {
      flexDirection: "row",
      padding: 10,
    },
    textBT: {
      fontSize: 15,
      Top: 10,
      left: 30,
    },
    textC: {
      fontSize: 20,
      textAlign: "center",
      padding: 12,
    },
  });
  