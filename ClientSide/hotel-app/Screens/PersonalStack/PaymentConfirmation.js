import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { CheckCircleIcon, CheckIcon } from "react-native-heroicons/outline";
import ScreenComponent from "../../FCComponents/ScreenComponent";

const PaymentConfirmation = () => {
  return (
    <ScreenComponent
      content={
        <View style={{ paddingTop: 120 }}>
          <CheckCircleIcon
            size={180}
            color={"#D3B9B3"}
            style={{ left: 170, top: 20 }}
          />
          {/* <CheckIcon
            size={180}
            color={"#D3B9B3"}
            style={{ left: 170, top: 20 }}
          /> */}
          <Text style={styles.text}>Thank you!</Text>
          <Text style={styles.text}>The payment was successfully received</Text>
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