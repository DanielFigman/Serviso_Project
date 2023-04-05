import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowDownCircleIcon } from "react-native-heroicons/mini";
import { ArrowRightCircleIcon } from "react-native-heroicons/mini";
import "react-native-vector-icons/FontAwesome";

const PersonalPageScreen = () => {
  const [name, setName] = useState("Nofar");
  const [Email, setEmail] = useState("nofar400@gmail.com");
  const [gender, setGender] = useState("women");

  const navigation = useNavigation();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>My Page:</Text>
        {gender == "women" ? (
          <Image
            style={styles.Image}
            source={require("../assets/persona.png")}
          />
        ) : (
          ""
        )}
        <Text style={styles.Details}>{name}</Text>
        <Text style={styles.Details}>{Email}</Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 100,
            alignItems: "center",
            margin: 20,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>Check In</Text>
          </View>
          <View style={{}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CheckInScreen");
              }}
            >
              <ArrowRightCircleIcon
                color={styles.leftArrow.color}
                size={styles.leftArrow.fontSize}
                style={styles.leftArrow}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            alignItems: "center",
            margin: 20,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>Check Out</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("CheckOutScreen")}
            >
              <ArrowRightCircleIcon
                color={styles.leftArrow.color}
                size={styles.leftArrow.fontSize}
                style={styles.leftArrow}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            alignItems: "center",
            margin: 20,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>Household</Text>
          </View>
          <View>
            <TouchableOpacity onPress={toggleOptions}>
              <ArrowDownCircleIcon
                color={styles.leftArrow.color}
                size={styles.leftArrow.fontSize}
                style={styles.leftArrow}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* if (isOpen)
        {
          <view>
            <Text style={styles.text}>Room cleaning schedule</Text>
            <Text style={styles.text}>New request</Text>
          </view>
        } */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            alignItems: "center",
            margin: 20,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>Room cleaning schedule</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("")}>
              <ArrowRightCircleIcon
                color={styles.leftArrow.color}
                size={styles.leftArrow.fontSize}
                style={styles.leftArrow}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            alignItems: "center",
            margin: 20,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>New request</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("")}>
              <ArrowRightCircleIcon
                color={styles.leftArrow.color}
                size={styles.leftArrow.fontSize}
                style={styles.leftArrow}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Image
          style={styles.mainImage}
          source={require("../assets/ServisoMain.png")}
        />
      </View>
    </SafeAreaView>
  );
};

export default PersonalPageScreen;
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    flex: 1,
  },
  title: { fontSize: 40, left: 35, color: "#000000" },
  mainImage: {
    width: 124,
    height: 141,
    top: 6,
    alignSelf: "center",
  },
  Image: { alignSelf: "center", width: 124, height: 160, top: 50 },
  Details: { alignSelf: "center", top: 50 },
  leftArrow: {
    color: "#8E8E8E",
    width: 2,
    fontSize: 30,
    left: 10,
    top: 5,
  },
  leftArrowView: {
    height: 60,
    width: 2,
  },
});
