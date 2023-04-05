import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import { CheckBox } from "@rneui/themed";

const CheckOutScreen = () => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);

  const [spaBill, setSpaBill] = useState("180");
  const [roomCharge, setRoomCharge] = useState("470");
  const totel = parseInt(spaBill) + parseInt(roomCharge);

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
          style={{
            flex: 1,
          }}
          center
          title="Your bill"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          uncheckedColor="#D3B9B3"
          checkedColor="#926255"
          checked={check1}
          onPress={() => setCheck1(!check1)}
        />
        <CheckBox
          style={{
            flex: 1,
          }}
          center
          title="Payment"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          uncheckedColor="#D3B9B3"
          checkedColor="#926255"
          checked={check2}
          onPress={() => setCheck2(!check2)}
        />
      </View>
      <View>
        <Text style={styles.title}>Payment details:</Text>
        <Text style={styles.text}>Your spa charge is {spaBill}$</Text>
        <Text style={styles.text}>
          The booking charge for your room is {roomCharge}$
        </Text>
        <Text style={styles.text}>Your totel bill is: {totel} $</Text>
      </View>
      <Image
        style={styles.mainImage}
        source={require("../assets/ServisoMain.png")}
      />
    </SafeAreaView>
  );
};

export default CheckOutScreen;

const styles = StyleSheet.create({
  text: {
    left: 15,
    fontSize: 26,
    margin: 10,
    top: 30,
  },
  title: { fontSize: 40, textAlign: "center", color: "#000000", top: 15 },
  mainImage: {
    width: 124,
    height: 141,
    top: 390,
    alignSelf: "center",
  },
});
