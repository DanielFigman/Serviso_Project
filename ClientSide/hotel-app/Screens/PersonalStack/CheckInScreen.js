import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Input,
  TouchableOpacity,
} from "react-native";
import { CheckBox } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const CheckInScreen = () => {
  const [guestName, setGuestName] = useState("nofar");
  const [arrivalDate, setArrivalDate] = useState("01/03/23");
  const [departureDate, setDepartureDate] = useState("06/03/23");
  const [roomType, setRoomType] = useState("premium");
  const [numGuests, setNumGuests] = useState("4");

  const navigation = useNavigation();

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);

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
          title="Your invitation"
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
      <View style={{ top: 20 }}>
        <Text style={styles.text}>Order details:</Text>
        <Text style={styles.title}>Guest Name: {guestName}</Text>
        <Text style={styles.title}>Arrival Date: {arrivalDate}</Text>
        <Text style={styles.title}>Departure Date: {departureDate}</Text>
        <Text style={styles.title}>Room Type: {roomType}</Text>
        <Text style={styles.title}>Num of guests: {numGuests}</Text>
      </View>
      <Image
        style={styles.mainImage}
        source={require('../../assets/ServisoMain.png')}
      />
    </SafeAreaView>
  );
};

export default CheckInScreen;

const styles = StyleSheet.create({
  title: {
    left: 15,
    fontSize: 26,
    margin: 10,
    top: 30,
  },
  view1: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  text: { fontSize: 40, textAlign: "center", color: "#000000", top: 15 },
  mainImage: {
    width: 124,
    height: 141,
    top: 320,
    alignSelf: "center",
  },
});
