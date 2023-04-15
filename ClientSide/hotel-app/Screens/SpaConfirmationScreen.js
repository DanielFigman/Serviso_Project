import { View, Text, StyleSheet, Image } from "react-native";
import "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import ScreenComponent from "../FCComponents/ScreenComponent";

const SpaConfirmationScreen = () => {
  const [treatmentType, setTreatmentType] = useState("Deep Tissue Massage");
  const [time, setTime] = useState("60");
  const [date, setDate] = useState("25/09/23");
  const [hour, setHour] = useState("16:00");
  const [price, setPrice] = useState("300");
  return (
    <ScreenComponent
      content={
        <View>
          <Image
            style={styles.Image}
            source={require("../assets/Spa-Treatment.png")}
          />
          <View
            style={{
              marginTop: 60,
              backgroundColor: "#EDEDED",
              height: 320,
            }}
          >
            <Text style={styles.title}>YOUR</Text>
            <Text style={styles.title}>MASSAGE</Text>
            <Text style={styles.title}>TREATMENT</Text>
            <Text style={styles.textTitle}>Order Details</Text>
            <Text style={styles.text}>{treatmentType}</Text>
            <Text style={styles.text}>Session Duration: {time} min</Text>
            <Text style={styles.text}>{date}</Text>
            <Text style={styles.text}>{hour}</Text>
            <Text style={styles.text}>{price} $</Text>
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
