import React from "react";
import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { CheckBox } from "@rneui/themed";
import ScreenComponent from "../../FCComponents/ScreenComponent";
import ButtonMain from "../../FCComponents/Buttons";
import { useNavigation } from "@react-navigation/native";
import Languages from "../../Json_files/Languages";
import { HotelsAppContext } from "../../Context/HotelsAppContext";

const PaymentScreen = () => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);

  const { language } = useContext(HotelsAppContext);
  const screenContent = Languages.PaymentScreen;

  const handleCheck = (from) => {
    switch (from) {
      case "check1":
        setCheck1(true);
        setCheck2(false);
        break;
      case "check2":
        setCheck1(false);
        setCheck2(true);
        break;
    }
  };

  const navigation = useNavigation();

  return (
    <ScreenComponent
      content={
        <>
          <View>
            <Text style={styles.text}>
              {screenContent.ChooseAPaymentMethod[language]}
            </Text>
            <Text style={styles.title}>
              {
                screenContent.YouWontBeChargedUntilYouClickThePaymentButton[
                  language
                ]
              }
            </Text>
            <View style={{ top: 30 }}>
              <CheckBox
                style={{
                  flex: 1,
                  borderWidth: 4,
                  borderColor: "#926255",
                  borderRadius: 6,
                }}
                center
                title="Credit Card"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                uncheckedColor="#D3B9B3"
                checkedColor="#926255"
                checked={check1}
                onPress={() => handleCheck("check1")}
              />
              <CheckBox
                style={{
                  flex: 1,
                }}
                center
                title="Apple Pay"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                uncheckedColor="#D3B9B3"
                checkedColor="#926255"
                checked={check2}
                onPress={() => handleCheck("check2")}
              />
            </View>
            <View style={{ marginTop: 35 }}>
              <ButtonMain
                text="Pay"
                onPress={() =>
                  Alert.alert("Payment", "Continue with the payment?", [
                    {
                      text: "Yes",
                      onPress: () => navigation.navigate("PaymentConfirmation"),
                    },
                    { text: "No" },
                  ])
                }
              />
            </View>
          </View>
        </>
      }
    />
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  title: {
    left: 15,
    fontSize: 15,
    margin: 10,
    top: 30,
  },
  text: { fontSize: 25, left: 15, color: "#000000", top: 15 },
  checkBox: {
    borderColor: "#20232a",
    borderRadius: 6,
  },
  mainImage: {
    width: 124,
    height: 141,
    top: 265,
    alignSelf: "center",
  },
  border: {
    borderColor: "#926255",
    borderRadius: 6,
  },
});
