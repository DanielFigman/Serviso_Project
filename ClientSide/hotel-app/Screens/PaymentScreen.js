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

const PaymentScreen = () => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);

  const handleCheck1 = () => {
    setCheck1(true);
    setCheck2(false);
  };

  const handleCheck2 = () => {
    setCheck1(false);
    setCheck2(true);
  };

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: "#fff",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <CheckBox
          center
          title="Your invitation"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          uncheckedColor="#D3B9B3"
          checkedColor="#926255"
          checked={check1}
          onPress={() => setCheck1(!check1)}
          onValueChange={handleCheck1}
        />
        <CheckBox
          center
          title="Payment"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          uncheckedColor="#D3B9B3"
          checkedColor="#926255"
          checked={check2}
          onPress={() => setCheck2(!check2)}
          onValueChange={handleCheck2}
        />
      </View>
      <View>
        <Text style={styles.text}>Choose a payment method</Text>
        <Text style={styles.title}>
          You won't be charged until you click the payment button
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
            checked={check3}
            onPress={() => setCheck3(!check3)}
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
            checked={check4}
            onPress={() => setCheck4(!check4)}
          />
        </View>
        <View style={{ top: 35 }}>
          <Button
            title="For payment"
            // loading={false}
            // loadingProps={{ size: "small", color: "white" }}
            // buttonStyle={{
            //   width: 281,
            //   height: 62,
            //   top: 300,
            //   alignSelf: "center",
            //   borderRadius: 30,
            //   backgroundColor: "black",
            //   display: "flex",
            //   alignItems: "center",
            //   justifyContent: "center",
            // }}
            onPress={() =>
              Alert.alert("Payment", "Do you want to continue to pay?", [
                { text: "Yes", onPress: () => console.log("Yes") },
                { text: "No", onPress: () => console.log("No") },
              ])
            }
          />
        </View>
        <Image
          style={styles.mainImage}
          source={require("../assets/ServisoMain.png")}
        />
      </View>
    </SafeAreaView>
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
