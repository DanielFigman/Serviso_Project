import { View, Text, StyleSheet, Image } from "react-native";
import "react-native-vector-icons/FontAwesome";
import { useContext, useState } from "react";
import ScreenComponent from "../../FCComponents/ScreenComponent";
import Languages from "../../Json_files/Languages";
import { HotelsAppContext } from "../../Context/HotelsAppContext";
import ButtonMain from "../../FCComponents/Buttons";
import { useNavigation, useRoute } from "@react-navigation/native";

const SpaConfirmationScreen = () => {
  const {
    params: { objSpa },
  } = useRoute();

  const navigation = useNavigation();

  const spaOrder = objSpa;
  console.log("spaOrder: " + JSON.stringify(spaOrder));
  const orderTime = new Date(spaOrder.dateSpa);
  let month = orderTime.getMonth() + 1;
  month.toString();
  const dateStr =
    orderTime.getFullYear().toString() +
    "-" +
    month +
    "-" +
    orderTime.getDate().toString();

  const treatmentType = objSpa?.name;

  const { language, user, order } = useContext(HotelsAppContext);
  const screenContent = Languages.SpaConfirmationScreen;
  console.log(objSpa);
  let price;
  const isDouble = spaOrder.coupleRoom ? 2 : 1;
  if (parseInt(objSpa.duration) > 45) {
    price =
      (objSpa.basePrice +
        ((objSpa.duration - 45) / 15) * objSpa.priceForAdditional15) *
      isDouble;
  } else {
    price = objSpa.basePrice;
  }

  const handleConfirm = () => {
    postAppointment();
    navigation.navigate("HomeScreen");
  };

  const postAppointment = async () => {
    try {
      const response = await fetch(
        "http://proj.ruppin.ac.il/cgroup97/test2/api/AppointSpaTreatment",
        {
          method: "POST",
          body: JSON.stringify({
            email: user.email,
            Date: objSpa.dateSpa,
            StartTime: objSpa.queue,
            EndTime: objSpa.EndTime,
            Therapy1Gender: objSpa.gender,
            Therapy2Gender: objSpa.secondaryGender,
            hotelID: order.hotelID,
            orderID: order.orderID,
            price: price,
          }),
          headers: new Headers({
            "Content-type": "application/json; charset=UTF-8",
          }),
        }
      );

      if (response.ok) {
        console.log("Spa appointment succeed");
      } else {
        const errorMessage = await response.text();
        const errorObject = JSON.parse(errorMessage);
        const errorType = errorObject.type;
        const errorMessageText = errorObject.message;

        console.log(
          `Error: ${response.status} - ${errorType} - ${errorMessageText}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              paddingBottom: 15,
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
            <Text style={styles.text}>
              {spaOrder.coupleRoom
                ? screenContent.CoupleMassage[language]
                : screenContent.SingleMassage[language]}
            </Text>
            {spaOrder.gender != null && !spaOrder.coupleRoom ? (
              <Text style={styles.text}>
                {/* {screenContent.gender[language]} */}
                {screenContent.TherapistGender[language]} {spaOrder.gender}
              </Text>
            ) : (
              <>
                <Text style={styles.text}>
                  {/* {screenContent.gender[language]} */}
                  {screenContent.Therapist1Gender[language]} {spaOrder.gender}
                </Text>
                <Text style={styles.text}>
                  {/* {screenContent.gender[language]} */}
                  {screenContent.Therapist2Gender[language]}{" "}
                  {spaOrder.secondaryGender}
                </Text>
              </>
            )}
            <Text style={styles.text}>
              {screenContent.Date[language]}
              {dateStr}
            </Text>
            <Text style={styles.text}>
              {screenContent.Hour[language]}
              {spaOrder.queue?.substring(0, 5)}
            </Text>
            <Text style={styles.text}>
              {screenContent.Price[language]}
              {price}₪
            </Text>
          </View>
          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <ButtonMain
              text={screenContent.Confirm[language]}
              onPress={handleConfirm}
              buttonStyle={{ height: 50 }}
            />
            <ButtonMain
              text={screenContent.Cancel[language]}
              navigate={"back"}
              buttonStyle={{ height: 50, color: "#CE3838" }}
            />
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
    marginBottom: 5,
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
