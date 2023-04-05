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
import ScreenComponent from "../FCComponents/ScreenComponent";
import { ListItemAccordion } from "@rneui/base/dist/ListItem/ListItem.Accordion";
import { ListItem } from "@rneui/base";
import { ButtonArrow, ButtonText } from "../FCComponents/Buttons";

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
    <ScreenComponent
      content={
        <View>
          <View style={{ marginBottom: 80 }}>
            <Text style={styles.title}>My Page</Text>
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
          </View>
          <View style={styles.rowView}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Check In</Text>
            </View>
            <ButtonArrow navigate={"CheckInScreen"} />
          </View>
          <View style={styles.rowView}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Check Out</Text>
            </View>
            <ButtonArrow navigate={"CheckOutScreen"} />
          </View>

          <View>
            <ListItemAccordion
              containerStyle={{ backgroundColor: "#F2F2F2" }}
              icon={<ArrowRightCircleIcon style={styles.arrowList} size={30} />}
              expandIcon={<ArrowDownCircleIcon style={styles.arrowList} size={30} />}
              noRotation={true}
              content={<Text style={StyleSheet.flatten([styles.text, { left: 7 }])}>Household</Text>}
              isExpanded={isOpen}
              onPress={() => setIsOpen(!isOpen)}
            >

              <ListItem key={1} containerStyle={{ backgroundColor: "#F2F2F2", marginTop: 0 }}>
                <ListItem.Content>
                  <View style={styles.listItemView}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.text}>Room cleaning schedule</Text>
                    </View>
                    <View>
                      <TouchableOpacity onPress={() => navigation.navigate("")}>
                        <ArrowRightCircleIcon color={styles.arrow.color} size={styles.arrow.fontSize} style={styles.arrow} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </ListItem.Content>
              </ListItem>


              <ListItem key={2} containerStyle={{ backgroundColor: "#F2F2F2" }}>
                <ListItem.Content>
                  <View style={styles.listItemView}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.text}>New request</Text>
                    </View>
                    <View>
                      <TouchableOpacity onPress={() => navigation.navigate("")}>
                        <ArrowRightCircleIcon
                          color={styles.arrow.color}
                          size={styles.arrow.fontSize}
                          style={styles.arrow}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </ListItem.Content>
              </ListItem>
            </ListItemAccordion>
          </View>
        </View>
      }
    />
  );
};

export default PersonalPageScreen;
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    flex: 1,
  },
  title: {
    fontSize: 40, color: "#000000", alignSelf:"center"
  },
  Image: {
    alignSelf: "center", width: 124, height: 160, top: 50
  },
  Details: {
    alignSelf: "center", top: 50
  },
  arrow: {
    color: "#8E8E8E",
    fontSize: 30,
    left: 10,
    top: 5,
  },
  arrowList: {
    color: "#8E8E8E",
    left: 4,
    top: 6,
  },
  listItemView: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    marginHorizontal: 20,
  },
  rowView: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    margin: 20,
  }
});
