import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { CheckCircleIcon } from "react-native-heroicons/outline";
import ScreenComponent from "../../FCComponents/ScreenComponent";
import ButtonMain from "../../FCComponents/Buttons";
import { useRoute } from "@react-navigation/native";
import Languages from "../../Json_files/Languages";
import { HotelsAppContext } from "../../Context/HotelsAppContext";

const CustomOrderConfirmation = () => {
  const { language } = useContext(HotelsAppContext);
  const screenContent = Languages.CustomOrderConfirmation;

  const {
    params: { date, hour, minute, selectedTime },
  } = useRoute();

  let formattedDate = "";

  if (selectedTime) {
    const parts = date.split("/");
    formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  return (
    <ScreenComponent
      topLeftButton={"none"}
      content={
        <View style={{ paddingTop: 120 }}>
          <CheckCircleIcon
            size={180}
            color={"#D3B9B3"}
            style={{ left: 170, top: 20 }}
          />
          <Text style={styles.text}>
            {screenContent.WeRecievedYourRequest[language]}
          </Text>
          <Text style={styles.text}>
            {selectedTime
              ? `We will do our best to bring the requested items on\n${formattedDate} at ${hour}:${minute}`
              : "We will bring the requested items as soon as possible"}
          </Text>
          <View style={{ marginTop: 100 }}>
            <ButtonMain text={"Continue"} navigate={"PersonalPageScreen"} />
          </View>
        </View>
      }
    />
  );
};

export default CustomOrderConfirmation;

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    color: "#926255",
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    paddingLeft: 15,
    paddingRight: 15,
    top: -60,
  },
});
