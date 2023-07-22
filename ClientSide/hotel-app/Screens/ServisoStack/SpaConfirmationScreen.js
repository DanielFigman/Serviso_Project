import { View, Text, StyleSheet, Image } from "react-native";
import "react-native-vector-icons/FontAwesome";
import { useContext, useState } from "react";
import ScreenComponent from "../../FCComponents/ScreenComponent";
import Languages from "../../Json_files/Languages";
import { HotelsAppContext } from "../../Context/HotelsAppContext";
import ButtonMain from "../../FCComponents/Buttons";
import { useRoute } from "@react-navigation/native";

const SpaConfirmationScreen = () => {

  const { params: {
    objSpa,
  } } = useRoute();

  const spaOrder = objSpa;
  console.log("spaOrder: " + JSON.stringify(spaOrder))
  const orderTime = new Date(spaOrder.dateSpa);
  let month = orderTime.getMonth() + 1;
  month.toString();
  const dateStr =
    orderTime.getFullYear().toString() +
    "-" +
    month +
    "-" +
    orderTime.getDate().toString();

  const treatmentType = objSpa?.name

  const { language } = useContext(HotelsAppContext);
  const screenContent = Languages.SpaConfirmationScreen;
  console.log(objSpa)
  let price;
  if (parseInt(objSpa.duration) > 45) {
    price = objSpa.basePrice + ((objSpa.duration - 45) / 15 * objSpa.priceForAdditional15);
  } else {
    price = objSpa.basePrice;
  }

  return (
    <ScreenComponent
      topLeftButton={"none"}
      content={
        <View>
          <Image
            style={styles.Image}
            source={require("../../assets/Spa-Treatment.png")}
          />
          <View
            style={{
              marginTop: 60,
              backgroundColor: "#EDEDED",
              paddingBottom:15,
            }}
          >
            <Text style={styles.title}>{screenContent.YOUR[language]}</Text>
            <Text style={styles.title}>{screenContent.MASSAGE[language]}</Text>
            <Text style={styles.title}>
              {screenContent.TREATMENT[language]}
            </Text>
            <Text style={styles.textTitle}>
              {screenContent.OrderDetails[language]}:
            </Text>
            <Text style={styles.text}>{treatmentType}</Text>
            {spaOrder.duration != null && (
              <Text style={styles.text}>
                {screenContent.Duration[language]} {spaOrder.duration}{" "}
                {screenContent.minutes[language]}
              </Text>
            )}
            <Text style={styles.text}>{spaOrder.coupleRoom ? "Couple massage" : "Single massage"}</Text>
            {spaOrder.gender != null && !spaOrder.coupleRoom ?
              <Text style={styles.text}>
                {/* {screenContent.gender[language]} */}
                {"Therapist gender: "} {spaOrder.gender}
              </Text>
              :
              <>
                <Text style={styles.text}>
                  {/* {screenContent.gender[language]} */}
                  {"Therapist 1 gender: "} {spaOrder.gender}
                </Text>
                <Text style={styles.text}>
                  {/* {screenContent.gender[language]} */}
                  {"Therapist 2 gender: "} {spaOrder.secondaryGender}
                </Text>
              </>
            }
            <Text style={styles.text}>{dateStr}</Text>
            <Text style={styles.text}>{spaOrder.queue?.substring(0, 5)}</Text>
            <Text style={styles.text}>{price}₪</Text>
          </View>
          <View style={{ marginTop: 5, flexDirection:"row", justifyContent:"space-around"}}>
            <ButtonMain text={"Confirm"} navigate={"HomeScreen"} buttonStyle={{height:50}} />
            <ButtonMain text={"Cancel"} navigate={"back"} buttonStyle={{height:50, color:"#CE3838"}} />
          </View>
        </View>
      }
    />
  );
};

export default SpaConfirmationScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: "center",
    marginBottom:5
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
  },
  title: {
    fontSize: 40,
    color: "#000000",
    marginLeft: 25,
  },
  Image: {
    alignSelf: "center",
    width: 390,
    height: 160,
    top: 50,
  },
});