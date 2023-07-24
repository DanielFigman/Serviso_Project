import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import { CheckCircleIcon } from "react-native-heroicons/outline";
import ScreenComponent from "../../FCComponents/ScreenComponent";
import ButtonMain from "../../FCComponents/Buttons";
import Languages from "../../Json_files/Languages";
import { HotelsAppContext } from "../../Context/HotelsAppContext";

const PaymentConfirmation = () => {
  const { language } = useContext(HotelsAppContext);
  const screenContent = Languages.PaymentConfirmation;
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
          <Text style={styles.text}>{screenContent.ThankYou[language]}</Text>
          <Text style={styles.text}>
            {screenContent.ThePaymentWasSuccessfullyReceived[language]}
          </Text>
          <View style={{ marginTop: 100 }}>
            <ButtonMain text={screenContent.Continue[language]} navigate={"PersonalPageScreen"} />
          </View>
        </View>
      }
    />
  );
};

export default PaymentConfirmation;

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
